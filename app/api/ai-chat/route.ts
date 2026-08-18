import { NextResponse } from "next/server";
import { buildSportMeSystemPrompt, sanitizeChatMessages } from "@/lib/sportme-ai";

export const runtime = "nodejs";

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
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

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const messages = sanitizeChatMessages(body?.messages);
    const lastUserMessage = [...messages].reverse().find((message) => message.role === "user");

    if (!lastUserMessage) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply:
          "Chat-ul AI este pregatit, dar mai trebuie configurata cheia OpenAI pe server. Echipa SportMe poate prelua mesajul tau manual.",
      });
    }

    let response: Response;
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
          max_output_tokens: 450,
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
      });
    } catch (error) {
      console.error("SportMe AI chat network error", error);
      return NextResponse.json({
        reply: "Nu pot genera raspunsul acum. Trimite mesajul, iar echipa SportMe il verifica manual.",
      });
    }

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("SportMe AI chat error", response.status, detail.slice(0, 500));
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
    console.error("SportMe AI chat route failed", error);
    return NextResponse.json(
      { reply: "A aparut o eroare. Echipa SportMe poate prelua conversatia manual." },
      { status: 500 },
    );
  }
}
