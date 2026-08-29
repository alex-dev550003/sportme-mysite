"use client";

import { FormEvent, KeyboardEvent, useMemo, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const initialMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: "Salut! Sunt asistentul SportMe. Te pot ajuta cu rezervari, cont de jucator sau administrarea unei baze sportive.",
};

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const apiMessages = useMemo(
    () =>
      messages
        .filter((message) => message.id !== "welcome")
        .map(({ role, content }) => ({ role, content })),
    [messages],
  );

  const submitMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = input.trim();
    if (!content || loading) return;

    const userMessage: ChatMessage = { id: makeId(), role: "user", content };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...apiMessages, { role: "user", content }],
        }),
      });
      const body = (await response.json().catch(() => null)) as { reply?: string } | null;
      setMessages((current) => [
        ...current,
        {
          id: makeId(),
          role: "assistant",
          content:
            body?.reply ||
            "Nu pot raspunde acum. Scrie-ne pe Facebook, Instagram sau WhatsApp si echipa SportMe verifica mesajul.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: makeId(),
          role: "assistant",
          content: "Conexiunea nu a functionat. Te rugam sa incerci din nou sau sa ne scrii pe WhatsApp.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) return;

    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  };

  return (
    <div className="fixed bottom-5 right-4 z-[80] sm:bottom-6 sm:right-6">
      {open ? (
        <section
          aria-label="SportMe AI chat"
          className="mb-3 flex h-[min(620px,calc(100vh-104px))] w-[calc(100vw-32px)] max-w-[380px] flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(2,8,23,0.24)]"
        >
          <div className="flex items-center justify-between border-b border-slate-200 bg-[#07101d] px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold leading-5">SportMe AI</p>
              <p className="text-xs leading-4 text-white/70">Raspunsuri rapide pentru SportMe</p>
            </div>
            <button
              type="button"
              aria-label="Inchide chat"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xl leading-none text-white/90 hover:bg-white/10"
            >
              x
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[#f7f8fa] px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[86%] rounded-[14px] px-3 py-2 text-sm leading-5 ${
                    message.role === "user"
                      ? "bg-[#2563eb] text-white"
                      : "border border-slate-200 bg-white text-slate-900"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {loading ? (
              <div className="flex justify-start">
                <div className="rounded-[14px] border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
                  Scriu raspunsul...
                </div>
              </div>
            ) : null}
          </div>

          <form onSubmit={submitMessage} className="border-t border-slate-200 bg-white p-3">
            <label className="sr-only" htmlFor="sportme-ai-chat-input">
              Mesaj pentru SportMe AI
            </label>
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                id="sportme-ai-chat-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
                rows={1}
                maxLength={600}
                placeholder="Scrie mesajul..."
                className="max-h-28 min-h-11 flex-1 resize-none rounded-[14px] border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:bg-slate-300"
                aria-label="Trimite mesaj"
              >
                &gt;
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-14 items-center gap-2 rounded-full bg-[#2563eb] px-5 text-sm font-semibold text-white shadow-[0_14px_38px_rgba(37,99,235,0.32)] hover:bg-[#1d4ed8]"
        aria-label={open ? "Inchide SportMe AI chat" : "Deschide SportMe AI chat"}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/16 text-base">AI</span>
        <span>Chat</span>
      </button>
    </div>
  );
}
