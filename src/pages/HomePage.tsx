import Icon from "@/components/ui/icon";

interface HomePageProps {
  onNavigate: (tab: string) => void;
  seller: { name: string; department: string; level: number; sessions: number };
}

const quickActions = [
  {
    id: "chat",
    icon: "MessageCircle",
    title: "Консультировать",
    desc: "AI-помощник для клиента прямо сейчас",
    color: "#1d5c38",
    bg: "#e8f5ee",
  },
  {
    id: "simulator",
    icon: "Play",
    title: "Тренировка",
    desc: "Отработать технику продаж",
    color: "#1d5c38",
    bg: "#e8f5ee",
  },
  {
    id: "catalog",
    icon: "Package",
    title: "Каталог",
    desc: "Найти товар и характеристики",
    color: "#1d5c38",
    bg: "#e8f5ee",
  },
  {
    id: "training",
    icon: "BookOpen",
    title: "Обучение",
    desc: "5 шагов техники продаж",
    color: "#1d5c38",
    bg: "#e8f5ee",
  },
];

const tips = [
  "Начни разговор с искреннего приветствия — клиент это чувствует",
  "Задавай открытые вопросы: «Что вы хотите сделать?» вместо «Что ищете?»",
  "Называй преимущества через выгоду: не «5 лет гарантии», а «вы забудете про замену на 5 лет»",
  "После решения проблемы всегда предложи сопутствующий товар",
];

export default function HomePage({ onNavigate, seller }: HomePageProps) {
  const todayTip = tips[new Date().getDay() % tips.length];

  return (
    <div className="animate-fade-in p-4 space-y-5 pb-6">
      {/* Header */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-sm text-beaver-muted">Добрый день,</p>
            <h1 className="text-2xl font-bold text-beaver-text tracking-tight">
              {seller.name} 👋
            </h1>
          </div>
          <div className="text-right">
            <div className="text-xs text-beaver-muted mb-0.5">Отдел</div>
            <div className="text-sm font-semibold text-beaver-green bg-beaver-green-pale px-3 py-1 rounded-full">
              {seller.department}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Тренировок", value: seller.sessions, icon: "Target" },
          { label: "Уровень", value: seller.level, icon: "Star" },
          { label: "Шагов пройдено", value: "5/5", icon: "CheckCircle" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-border rounded-2xl p-3 text-center"
          >
            <Icon
              name={stat.icon}
              size={18}
              className="text-beaver-green mx-auto mb-1"
            />
            <div className="text-xl font-bold text-beaver-text">
              {stat.value}
            </div>
            <div className="text-xs text-beaver-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tip of the day */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="text-xl mt-0.5">💡</div>
          <div>
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">
              Совет дня
            </div>
            <p className="text-sm text-amber-900 leading-relaxed">{todayTip}</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold text-beaver-muted uppercase tracking-wide mb-3">
          Быстрый доступ
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onNavigate(action.id)}
              className="bg-white border border-border rounded-2xl p-4 text-left transition-all duration-200 hover:border-beaver-green hover:shadow-md hover:-translate-y-0.5 active:scale-95"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: action.bg }}
              >
                <Icon
                  name={action.icon}
                  size={20}
                  style={{ color: action.color }}
                />
              </div>
              <div className="font-semibold text-sm text-beaver-text mb-0.5">
                {action.title}
              </div>
              <div className="text-xs text-beaver-muted leading-snug">
                {action.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 5 Steps mini preview */}
      <div>
        <h2 className="text-sm font-semibold text-beaver-muted uppercase tracking-wide mb-3">
          Техника продаж — 5 шагов
        </h2>
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          {[
            { n: 1, title: "Приветствие и контакт", done: true },
            { n: 2, title: "Выявление потребности", done: true },
            { n: 3, title: "Презентация товара", done: true },
            { n: 4, title: "Работа с возражениями", done: false },
            { n: 5, title: "Допродажа и завершение", done: false },
          ].map((step, i) => (
            <div
              key={step.n}
              className={`flex items-center gap-3 px-4 py-3 ${i < 4 ? "border-b border-border" : ""}`}
            >
              <div
                className={`step-dot text-xs ${step.done ? "text-white" : "bg-gray-100 text-beaver-muted"}`}
                style={
                  step.done
                    ? { background: "var(--beaver-green)" }
                    : {}
                }
              >
                {step.done ? (
                  <Icon name="Check" size={14} className="text-white" />
                ) : (
                  step.n
                )}
              </div>
              <span
                className={`text-sm font-medium ${step.done ? "text-beaver-text" : "text-beaver-muted"}`}
              >
                {step.title}
              </span>
              {step.done && (
                <span className="ml-auto text-xs text-beaver-green font-medium">
                  Изучен
                </span>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => onNavigate("training")}
          className="w-full mt-2 text-sm text-beaver-green font-medium py-2 hover:underline"
        >
          Открыть полный курс →
        </button>
      </div>
    </div>
  );
}