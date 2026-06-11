import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Message {
  role: "client" | "seller" | "hint";
  text: string;
  step?: number;
}

const scenarios = [
  {
    id: 1,
    title: "Клиент ищет смеситель",
    dept: "Сантехника",
    difficulty: "Начальный",
    emoji: "🚿",
    opening: "Здравствуйте... Мне нужен смеситель для кухни. Не знаю какой.",
    script: [
      {
        step: 1,
        stepName: "Приветствие",
        clientMsg: "Здравствуйте... Мне нужен смеситель для кухни. Не знаю какой.",
        hint: "Поздоровайтесь, назовите себя и дайте клиенту почувствовать комфорт. Не спешите с вопросами.",
        goodReplies: ["Добрый день! Я Алексей, помогу с выбором.", "Здравствуйте! Давайте разберёмся вместе"],
        sellerPrompt: "Ваш ответ на приветствие",
      },
      {
        step: 2,
        stepName: "Выявление потребности",
        clientMsg: "У меня мойка, хочу что-то удобное. Бюджет — до 3000 рублей.",
        hint: "Уточните детали: тип мойки, высота излива, важна ли гибкая лейка. Бюджет уже есть.",
        goodReplies: ["Мойка у вас накладная или встроенная?", "Вам важно, чтобы был переключатель на лейку?"],
        sellerPrompt: "Задайте уточняющий вопрос",
      },
      {
        step: 3,
        stepName: "Презентация",
        clientMsg: "Мойка обычная, встроенная. Лейка не нужна, просто обычный кран.",
        hint: "Предложите 2 варианта — бюджетный и немного лучше. Говорите о выгодах: долговечность, удобство.",
        goodReplies: ["У нас есть два отличных варианта до 3000..."],
        sellerPrompt: "Предложите варианты с выгодами",
      },
      {
        step: 4,
        stepName: "Возражение",
        clientMsg: "Хмм, а вот тот дешевле — 1800. Почему такая разница?",
        hint: "Не спорьте. Объясните разницу через выгоду: качество картриджа, срок службы, гарантия.",
        goodReplies: ["Разница в механизме — тот за 2700 с немецким картриджем..."],
        sellerPrompt: "Объясните разницу в цене",
      },
      {
        step: 5,
        stepName: "Допродажа",
        clientMsg: "Ладно, беру тот за 2700. Мне его установить нужно, я сам не смогу.",
        hint: "Отлично! Предложите услугу монтажа и сопутствующие товары: силикон-герметик, гибкая подводка.",
        goodReplies: ["Хорошо! К нему нужна гибкая подводка — она обычно не в комплекте..."],
        sellerPrompt: "Предложите допродажу и услугу",
      },
    ],
  },
  {
    id: 2,
    title: "Клиент выбирает краску",
    dept: "Краски",
    difficulty: "Средний",
    emoji: "🎨",
    opening: "Мне надо покрасить стены в детской. Вы мне поможете?",
    script: [
      {
        step: 1,
        stepName: "Приветствие",
        clientMsg: "Мне надо покрасить стены в детской. Вы мне поможете?",
        hint: "Установите доброжелательный контакт, дайте понять что вы эксперт и готовы помочь.",
        goodReplies: ["Конечно! Это как раз наша специализация.", "С удовольствием! Давайте подберём идеальную краску для детской."],
        sellerPrompt: "Ответьте и установите контакт",
      },
      {
        step: 2,
        stepName: "Выявление потребности",
        clientMsg: "Ребёнку 5 лет, играет активно. Стены сейчас обои старые снял.",
        hint: "Ключевое для детской: безопасность, моющаяся, без запаха. Уточните цвет, площадь.",
        goodReplies: ["Самое важное для детской — безопасный состав. Вы хотите белую или цветную?"],
        sellerPrompt: "Уточните потребности",
      },
      {
        step: 3,
        stepName: "Презентация",
        clientMsg: "Хочу светлую, голубоватую. Комната 12 кв.м.",
        hint: "Предложите латексную краску В1-базы для колеровки. Расскажите про расход — ~10 кв.м на литр в 2 слоя.",
        goodReplies: ["Для детской идеально подойдёт латексная краска — без запаха, моющаяся..."],
        sellerPrompt: "Предложите конкретный товар с выгодами",
      },
      {
        step: 4,
        stepName: "Возражение",
        clientMsg: "А вдруг запах будет? Ребёнок аллергик.",
        hint: "Это законное опасение. Расскажите про водную основу, сертификаты безопасности, проветривание.",
        goodReplies: ["Понимаю ваше беспокойство. Эта краска на водной основе — запаха практически нет..."],
        sellerPrompt: "Снимите опасение про безопасность",
      },
      {
        step: 5,
        stepName: "Допродажа",
        clientMsg: "Хорошо, уговорили. Беру 3 литра. Сколько мне надо кистей?",
        hint: "Предложите валик (быстрее чем кисть), лоток, малярный скотч, грунтовку для лучшего результата.",
        goodReplies: ["Для стен лучше валик — быстрее и ровнее. Ещё рекомендую лоток и скотч..."],
        sellerPrompt: "Предложите всё необходимое для покраски",
      },
    ],
  },
];

export default function SimulatorPage() {
  const [phase, setPhase] = useState<"select" | "sim" | "result">("select");
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);

  const scenario = scenarios[scenarioIdx];

  const startSimulator = (idx: number) => {
    setScenarioIdx(idx);
    setStepIdx(0);
    setMessages([
      { role: "client", text: scenarios[idx].script[0].clientMsg, step: 1 },
    ]);
    setInput("");
    setShowHint(false);
    setScore(0);
    setPhase("sim");
  };

  const sendReply = () => {
    if (!input.trim()) return;
    const currentStep = scenario.script[stepIdx];

    const newMessages: Message[] = [
      ...messages,
      { role: "seller", text: input, step: currentStep.step },
    ];

    const isGood = currentStep.goodReplies.some((r) =>
      input.toLowerCase().includes(r.toLowerCase().split(" ")[2] ?? r.toLowerCase().slice(0, 8))
    );

    if (isGood) setScore((s) => s + 1);

    const next = stepIdx + 1;
    if (next < scenario.script.length) {
      newMessages.push({
        role: "client",
        text: scenario.script[next].clientMsg,
        step: next + 1,
      });
      setMessages(newMessages);
      setStepIdx(next);
    } else {
      setMessages(newMessages);
      setPhase("result");
    }

    setInput("");
    setShowHint(false);
  };

  const currentStep = scenario.script[stepIdx];
  const progress = ((stepIdx) / scenario.script.length) * 100;

  if (phase === "select") {
    return (
      <div className="animate-fade-in p-4 space-y-4">
        <div className="pt-2">
          <h1 className="text-xl font-bold text-beaver-text">Симулятор продаж</h1>
          <p className="text-sm text-beaver-muted mt-0.5">Отработайте технику на реальных сценариях</p>
        </div>

        <div className="bg-beaver-green-pale border border-beaver-green/20 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">🎓</span>
            <div>
              <div className="font-semibold text-sm text-beaver-green mb-1">Как работает симулятор</div>
              <p className="text-xs text-beaver-green/80 leading-relaxed">
                Вы — продавец, клиент пишет вам вопросы. Пройдите все 5 шагов техники продаж. Используйте подсказки если нужно.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-sm font-semibold text-beaver-muted uppercase tracking-wide">
          Выберите сценарий
        </h2>

        <div className="space-y-3">
          {scenarios.map((s, i) => (
            <button
              key={s.id}
              onClick={() => startSimulator(i)}
              className="w-full bg-white border border-border rounded-2xl p-4 text-left transition-all hover:border-beaver-green hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{s.emoji}</div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-beaver-text mb-0.5">{s.title}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-100 text-beaver-muted px-2 py-0.5 rounded-full">{s.dept}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        s.difficulty === "Начальный"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {s.difficulty}
                    </span>
                  </div>
                  <div className="text-xs text-beaver-muted mt-2">5 шагов · ~5 минут</div>
                </div>
                <Icon name="ChevronRight" size={18} className="text-beaver-muted mt-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === "result") {
    const stars = score >= 4 ? 3 : score >= 2 ? 2 : 1;
    return (
      <div className="animate-fade-in p-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-6xl mb-4">
          {stars === 3 ? "🏆" : stars === 2 ? "👍" : "💪"}
        </div>
        <h2 className="text-2xl font-bold text-beaver-text mb-2">
          {stars === 3 ? "Отлично!" : stars === 2 ? "Хороший результат!" : "Продолжай тренироваться!"}
        </h2>
        <p className="text-beaver-muted text-sm mb-6">
          Правильных ответов: {score} из {scenario.script.length}
        </p>
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <span key={s} className={`text-3xl ${s <= stars ? "opacity-100" : "opacity-20"}`}>⭐</span>
          ))}
        </div>

        {/* Review */}
        <div className="w-full bg-white border border-border rounded-2xl p-4 text-left mb-4 space-y-2 max-h-48 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={`text-xs leading-relaxed ${m.role === "client" ? "text-beaver-muted" : "text-beaver-text font-medium"}`}>
              <span className="font-semibold mr-1">{m.role === "client" ? "👤 Клиент:" : "🧑 Вы:"}</span>
              {m.text}
            </div>
          ))}
        </div>

        <div className="flex gap-3 w-full">
          <button
            onClick={() => startSimulator(scenarioIdx)}
            className="flex-1 py-3 border border-border rounded-xl text-sm font-semibold text-beaver-muted hover:border-beaver-green hover:text-beaver-green transition-all"
          >
            Ещё раз
          </button>
          <button
            onClick={() => setPhase("select")}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "var(--beaver-green)" }}
          >
            Другой сценарий
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border bg-white">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-xs text-beaver-muted">{scenario.title}</div>
            <div className="text-sm font-semibold text-beaver-text">
              Шаг {stepIdx + 1} / {scenario.script.length}: {currentStep.stepName}
            </div>
          </div>
          <button onClick={() => setPhase("select")} className="text-beaver-muted hover:text-beaver-text">
            <Icon name="X" size={20} />
          </button>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "var(--beaver-green)" }}
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${
              msg.role === "client"
                ? "chat-bubble-ai"
                : msg.role === "hint"
                ? "chat-bubble-hint"
                : "chat-bubble-user"
            } animate-fade-in`}
          >
            {msg.role === "client" && (
              <div className="text-xs font-semibold mb-1 opacity-60">👤 Клиент</div>
            )}
            {msg.role === "hint" && (
              <div className="text-xs font-semibold mb-1">💡 Подсказка</div>
            )}
            {msg.text}
          </div>
        ))}

        {showHint && (
          <div className="chat-bubble-hint animate-fade-in">
            <div className="text-xs font-semibold mb-1">💡 Подсказка — Шаг «{currentStep.stepName}»</div>
            {currentStep.hint}
            <div className="mt-2 pt-2 border-t border-yellow-200">
              <div className="text-xs font-semibold mb-1">Попробуй сказать:</div>
              {currentStep.goodReplies.slice(0, 1).map((r, i) => (
                <div key={i} className="italic text-xs">{r}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-white">
        <div className="text-xs text-beaver-muted mb-2">{currentStep.sellerPrompt}</div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors"
          >
            <Icon name="Lightbulb" size={18} className="text-amber-600" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendReply()}
            placeholder="Напишите ваш ответ..."
            className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-beaver-green/20 border border-transparent focus:border-beaver-green/30 transition-all"
          />
          <button
            onClick={sendReply}
            disabled={!input.trim()}
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
            style={{ background: "var(--beaver-green)" }}
          >
            <Icon name="Send" size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
