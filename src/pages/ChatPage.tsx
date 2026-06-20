import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Message {
  role: "user" | "assistant";
  text: string;
  loading?: boolean;
}

const quickQuestions = [
  "Какие смесители есть в наличии?",
  "Чем отличается латексная от акриловой краски?",
  "Как выбрать шланг для полива?",
  "Что посоветовать к унитазу?",
  "Какие замки самые надёжные?",
];

const AI_AGENT_URL = "https://functions.poehali.dev/bd64a75d-42ea-42e8-810b-71db8f2dc07c";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Привет! Я AI-помощник продавца Бобёр Строй. Я знаю весь ассортимент магазина и помогу вам правильно проконсультировать покупателя.\n\nСпросите меня о любом товаре или технике продаж — отвечу сразу! 🦫",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"consult" | "train">("consult");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", text: text.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages([...updatedMessages, { role: "assistant", text: "", loading: true }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(AI_AGENT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          mode,
          history: updatedMessages.slice(-8).map((m) => ({
            role: m.role,
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      const reply = data.reply || "Извините, произошла ошибка. Попробуйте ещё раз.";

      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1 ? { role: "assistant", text: reply } : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1
            ? {
                role: "assistant",
                text: "Не удалось подключиться к AI-помощнику. Проверьте соединение.",
              }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border bg-white">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
            style={{ background: "var(--beaver-green-pale)" }}
          >
            🦫
          </div>
          <div>
            <div className="font-bold text-sm text-beaver-text">AI-Консультант</div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span className="text-xs text-beaver-muted">Онлайн · знает весь ассортимент</span>
            </div>
          </div>
        </div>

        {/* Mode toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setMode("consult")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === "consult"
                ? "bg-white text-beaver-text shadow-sm"
                : "text-beaver-muted"
            }`}
          >
            💬 Консультация клиента
          </button>
          <button
            onClick={() => setMode("train")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === "train"
                ? "bg-white text-beaver-text shadow-sm"
                : "text-beaver-muted"
            }`}
          >
            🎓 Советы по продажам
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`${msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"} animate-fade-in`}>
            {msg.loading ? (
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-beaver-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-beaver-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-beaver-muted animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            ) : (
              <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
            )}
          </div>
        ))}

        {/* Quick questions (shown at start) */}
        {messages.length === 1 && (
          <div className="space-y-2 animate-fade-in">
            <div className="text-xs text-beaver-muted text-center">Быстрые вопросы:</div>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-2 bg-white border border-border rounded-full hover:border-beaver-green hover:text-beaver-green transition-all text-beaver-muted"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-white">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
            placeholder={
              mode === "consult"
                ? "Спросите про товар или ассортимент..."
                : "Задайте вопрос по технике продаж..."
            }
            className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-beaver-green/20 border border-transparent focus:border-beaver-green/30 transition-all"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
            style={{ background: "var(--beaver-green)" }}
          >
            <Icon name="Send" size={16} className="text-white" />
          </button>
        </div>
        <p className="text-xs text-beaver-muted text-center mt-2">
          AI анализирует сайт bober-stroy.ru в реальном времени
        </p>
      </div>
    </div>
  );
}