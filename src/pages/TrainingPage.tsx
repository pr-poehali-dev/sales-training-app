import { useState } from "react";
import Icon from "@/components/ui/icon";

const steps = [
  {
    n: 1,
    title: "Приветствие и установление контакта",
    emoji: "🤝",
    goal: "Создать первое положительное впечатление и расположить клиента к общению",
    rules: [
      "Поздоровайтесь первым, улыбнитесь",
      "Дайте клиенту 30–60 секунд осмотреться",
      "Используйте открытый язык тела",
      "Назовите себя по имени",
    ],
    phrases: [
      "«Добрый день! Я Алексей, ваш консультант. Если будут вопросы — обращайтесь»",
      "«Здравствуйте! Впервые у нас или уже бывали?»",
      "«Добро пожаловать! Вы пришли по конкретному вопросу или просто смотрите?»",
    ],
    mistakes: [
      "Набрасываться с вопросами сразу при входе",
      "Говорить «Чем могу помочь?» — заезженная фраза",
      "Не отрываться от телефона / другого занятия",
    ],
  },
  {
    n: 2,
    title: "Выявление потребности",
    emoji: "🎯",
    goal: "Понять, что на самом деле нужно клиенту — не товар, а решение задачи",
    rules: [
      "Задавайте открытые вопросы (Что? Как? Для чего?)",
      "Активно слушайте, не перебивайте",
      "Уточняйте детали через «правильно ли я понимаю...»",
      "Выясняйте бюджет мягко и косвенно",
    ],
    phrases: [
      "«Расскажите, что планируете сделать?»",
      "«Для какого помещения подбираете?»",
      "«Что для вас важнее — цена или долговечность?»",
      "«Уже смотрели что-то конкретное или только начинаете?»",
    ],
    mistakes: [
      "Задавать закрытые вопросы (Вам нужно?)",
      "Сразу предлагать товар не зная задачи",
      "Не слушать ответы клиента",
    ],
  },
  {
    n: 3,
    title: "Презентация товара",
    emoji: "✨",
    goal: "Показать, как конкретный товар решает задачу клиента",
    rules: [
      "Говорите языком выгод, а не характеристик",
      "Давайте потрогать, открыть, попробовать",
      "Предлагайте 2–3 варианта (не больше)",
      "Ссылайтесь на личный опыт или отзывы",
    ],
    phrases: [
      "«Этот смеситель — немецкий механизм, клиенты берут уже 5 лет без проблем»",
      "«Вот возьмите в руки — чувствуете, насколько качественная фурнитура?»",
      "«За эту цену вы получаете: [выгода 1], [выгода 2] и [выгода 3]»",
    ],
    mistakes: [
      "Говорить только технические характеристики",
      "Предлагать сразу 10 вариантов",
      "Не давать клиенту «пощупать» товар",
    ],
  },
  {
    n: 4,
    title: "Работа с возражениями",
    emoji: "🛡️",
    goal: "Превратить сомнения клиента в уверенность в покупке",
    rules: [
      "Выслушайте возражение полностью, не перебивайте",
      "Согласитесь с чувством, но не с возражением",
      "Задайте уточняющий вопрос",
      "Приведите конкретный аргумент или факт",
    ],
    phrases: [
      "«Понимаю, цена важна. Давайте посчитаем: за 5 лет это [сумма/месяц]»",
      "«Согласен, выбор непростой. А что именно вас смущает?»",
      "«Многие так думают сначала, но после использования [факт]»",
      "«Если бы вопрос цены не стоял — этот вариант вам подходит?»",
    ],
    mistakes: [
      "Спорить с клиентом",
      "Говорить «Но...» в ответ на возражение",
      "Снижать цену без уточнения реального возражения",
    ],
  },
  {
    n: 5,
    title: "Допродажа и завершение сделки",
    emoji: "🎁",
    goal: "Увеличить чек и завершить продажу с позитивным впечатлением",
    rules: [
      "Предложите сопутствующие товары органично",
      "Используйте технику «вместе с этим берут...»",
      "Не давите — мягко подведите к решению",
      "Завершите позитивно, предложите помощь в будущем",
    ],
    phrases: [
      "«К этому смесителю обычно берут герметик — хотите покажу?»",
      "«Вы не пожалеете! Звоните если что — всегда помогу»",
      "«Хотите, оформим сейчас, пока есть в наличии?»",
      "«Могу помочь с доставкой или установкой — у нас есть такая услуга»",
    ],
    mistakes: [
      "Не предлагать сопутствующие товары совсем",
      "Давить: «Ну что, берёте?»",
      "Отпустить клиента без финального позитива",
    ],
  },
];

export default function TrainingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState<"rules" | "phrases" | "mistakes">("rules");

  const step = steps[activeStep];

  return (
    <div className="animate-fade-in flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border bg-white">
        <h1 className="text-xl font-bold text-beaver-text">Техника продаж</h1>
        <p className="text-sm text-beaver-muted mt-0.5">5 шагов к успешной сделке</p>
      </div>

      {/* Step selector */}
      <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide border-b border-border bg-white">
        {steps.map((s, i) => (
          <button
            key={s.n}
            onClick={() => { setActiveStep(i); setActiveTab("rules"); }}
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeStep === i
                ? "bg-beaver-green text-white shadow-sm"
                : "bg-gray-100 text-beaver-muted hover:bg-gray-200"
            }`}
          >
            <span>{s.emoji}</span>
            <span>Шаг {s.n}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Step header */}
        <div className="bg-white border border-border rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: "var(--beaver-green-pale)" }}
            >
              {step.emoji}
            </div>
            <div>
              <div className="text-xs text-beaver-muted font-medium uppercase tracking-wide">
                Шаг {step.n}
              </div>
              <h2 className="text-base font-bold text-beaver-text">{step.title}</h2>
            </div>
          </div>
          <div className="bg-beaver-green-pale rounded-xl p-3">
            <p className="text-sm text-beaver-green font-medium leading-relaxed">
              🎯 Цель: {step.goal}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          {(["rules", "phrases", "mistakes"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-white text-beaver-text shadow-sm"
                  : "text-beaver-muted"
              }`}
            >
              {tab === "rules" ? "Правила" : tab === "phrases" ? "Фразы" : "Ошибки"}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="animate-fade-in space-y-2">
          {activeTab === "rules" && step.rules.map((rule, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-border rounded-xl p-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
                style={{ background: "var(--beaver-green)" }}
              >
                {i + 1}
              </div>
              <p className="text-sm text-beaver-text leading-relaxed">{rule}</p>
            </div>
          ))}

          {activeTab === "phrases" && step.phrases.map((phrase, i) => (
            <div key={i} className="bg-white border border-border rounded-xl p-3">
              <div className="flex items-start gap-2">
                <span className="text-beaver-green mt-0.5">
                  <Icon name="Quote" size={14} />
                </span>
                <p className="text-sm text-beaver-text leading-relaxed italic">{phrase}</p>
              </div>
            </div>
          ))}

          {activeTab === "mistakes" && step.mistakes.map((mistake, i) => (
            <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-3">
              <Icon name="X" size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800 leading-relaxed">{mistake}</p>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 pt-2 pb-4">
          {activeStep > 0 && (
            <button
              onClick={() => setActiveStep(activeStep - 1)}
              className="flex-1 py-3 border border-border rounded-xl text-sm font-semibold text-beaver-muted hover:border-beaver-green hover:text-beaver-green transition-all"
            >
              ← Предыдущий
            </button>
          )}
          {activeStep < steps.length - 1 && (
            <button
              onClick={() => setActiveStep(activeStep + 1)}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: "var(--beaver-green)" }}
            >
              Следующий шаг →
            </button>
          )}
          {activeStep === steps.length - 1 && (
            <div className="flex-1 py-3 rounded-xl text-sm font-semibold text-center text-beaver-green bg-beaver-green-pale">
              🎉 Курс пройден!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
