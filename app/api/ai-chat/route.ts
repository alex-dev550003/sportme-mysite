import { NextResponse } from "next/server";
import { buildSportMeSystemPrompt, getSportMeDirectResponse, sanitizeChatMessages } from "@/lib/sportme-ai";

export const runtime = "nodejs";

const MAX_BODY_CHARS = 14_000;
const MAX_MESSAGES = 8;
const MAX_MESSAGE_CHARS = 1_200;
const OPENAI_TIMEOUT_MS = 18_000;
const ALLOWED_PRODUCTION_ORIGINS = new Set(["https://sportme.ro", "https://www.sportme.ro"]);

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

type OpenAIErrorResponse = {
  error?: {
    type?: unknown;
    code?: unknown;
    message?: unknown;
  };
};

function extractResponseText(data: OpenAIResponse) {
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const text = data.output
    ?.flatMap((item) => item.content ?? [])
    .map((content) => content.text)
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    .join("\n")
    .trim();

  return text || null;
}

function isAllowedOrigin(request: Request) {
  if (process.env.NODE_ENV !== "production") return true;

  const origin = request.headers.get("origin");
  if (origin) return ALLOWED_PRODUCTION_ORIGINS.has(origin);

  const referer = request.headers.get("referer");
  if (!referer) return false;

  try {
    return ALLOWED_PRODUCTION_ORIGINS.has(new URL(referer).origin);
  } catch {
    return false;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype;
}

async function readJsonBody(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_CHARS) {
    return { error: "Request body is too large." as const };
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_CHARS) {
    return { error: "Request body is too large." as const };
  }

  try {
    return { body: JSON.parse(raw) as unknown };
  } catch {
    return { error: "Invalid JSON body." as const };
  }
}

function validateMessages(body: unknown) {
  if (!isPlainObject(body) || !Array.isArray(body.messages)) {
    return { error: "Messages must be an array." as const };
  }

  if (body.messages.length === 0 || body.messages.length > MAX_MESSAGES) {
    return { error: "Invalid message count." as const };
  }

  for (const message of body.messages) {
    if (!isPlainObject(message)) {
      return { error: "Invalid message." as const };
    }
    const keys = Object.keys(message);
    if (keys.some((key) => key !== "role" && key !== "content")) {
      return { error: "Invalid message fields." as const };
    }
    if (message.role !== "user" && message.role !== "assistant") {
      return { error: "Invalid message role." as const };
    }
    if (typeof message.content !== "string") {
      return { error: "Invalid message content." as const };
    }
    const content = message.content.trim();
    if (!content || content.length > MAX_MESSAGE_CHARS) {
      return { error: "Invalid message content length." as const };
    }
  }

  return { messages: sanitizeChatMessages(body.messages) };
}

function sanitizeLogText(value: unknown) {
  return String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, 160);
}

async function parseOpenAIError(response: Response) {
  const fallback = { type: "unknown", code: "unknown", message: "" };
  try {
    const data = (await response.json()) as OpenAIErrorResponse;
    return {
      type: sanitizeLogText(data?.error?.type) || fallback.type,
      code: sanitizeLogText(data?.error?.code) || fallback.code,
      message: sanitizeLogText(data?.error?.message),
    };
  } catch {
    return fallback;
  }
}

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const parsedBody = await readJsonBody(request);
    if ("error" in parsedBody) {
      return NextResponse.json({ error: parsedBody.error }, { status: 400 });
    }

    const validated = validateMessages(parsedBody.body);
    if ("error" in validated) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const messages = validated.messages;
    const lastUserMessage = [...messages].reverse().find((message) => message.role === "user");

    if (!lastUserMessage) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const directReply = getSportMeDirectResponse(lastUserMessage.content);
    if (directReply) {
      return NextResponse.json({ reply: directReply });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply:
          "Chat-ul AI este pregatit, dar mai trebuie configurata cheia OpenAI pe server. Echipa SportMe poate prelua mesajul tau manual.",
      });
    }

    let response: Response;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);
    try {
      response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
          temperature: 0.2,
          max_output_tokens: 180,
          input: [
            {
              role: "system",
              content: buildSportMeSystemPrompt("site"),
            },
            ...messages.map((message) => ({
              role: message.role,
              content: message.content,
            })),
          ],
        }),
        signal: controller.signal,
      });
    } catch (error) {
      const isTimeout = error instanceof Error && error.name === "AbortError";
      console.error("SportMe AI chat provider request failed", {
        type: isTimeout ? "timeout" : "network",
        message: error instanceof Error ? sanitizeLogText(error.message) : "",
      });
      return NextResponse.json({
        reply: "Nu pot genera raspunsul acum. Trimite mesajul, iar echipa SportMe il verifica manual.",
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      const errorDetail = await parseOpenAIError(response);
      console.error("SportMe AI chat provider error", {
        status: response.status,
        type: errorDetail.type,
        code: errorDetail.code,
        message: errorDetail.message,
      });
      return NextResponse.json(
        { reply: "Nu pot genera raspunsul acum. Trimite mesajul, iar echipa SportMe il verifica manual." },
        { status: 502 },
      );
    }

    const data = (await response.json()) as OpenAIResponse;
    const reply = extractResponseText(data);

    return NextResponse.json({
      reply: reply || "Nu sunt sigur de raspuns. Echipa SportMe trebuie sa verifice acest mesaj.",
    });
  } catch (error) {
    console.error("SportMe AI chat route failed", {
      type: error instanceof Error ? error.name : "unknown",
      message: error instanceof Error ? sanitizeLogText(error.message) : "",
    });
    return NextResponse.json(
      { reply: "A aparut o eroare. Echipa SportMe poate prelua conversatia manual." },
      { status: 500 },
    );
  }
}
