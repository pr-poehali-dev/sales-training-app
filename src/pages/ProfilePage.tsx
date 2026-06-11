import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ProfilePageProps {
  seller: { name: string; department: string; level: number; sessions: number };
  onUpdateSeller: (updates: Partial<{ name: string; department: string }>) => void;
}

const departments = ["Сантехника", "Сад", "Скобяные изделия", "Краски", "Все отделы"];

const achievements = [
  { icon: "🎯", title: "Первый шаг", desc: "Прошёл первую тренировку", done: true },
  { icon: "🔥", title: "5 тренировок", desc: "Провёл 5 симуляций подряд", done: true },
  { icon: "⭐", title: "Отличный продавец", desc: "Получил 3 звезды в симуляторе", done: false },
  { icon: "🏆", title: "Мастер переговоров", desc: "Прошёл все сценарии на 3 звезды", done: false },
  { icon: "📚", title: "Теоретик", desc: "Изучил все 5 шагов курса", done: true },
  { icon: "💪", title: "Профессионал", desc: "10 тренировок завершено", done: false },
];

export default function ProfilePage({ seller, onUpdateSeller }: ProfilePageProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(seller.name);
  const [dept, setDept] = useState(seller.department);

  const saveProfile = () => {
    onUpdateSeller({ name: name.trim() || seller.name, department: dept });
    setEditing(false);
  };

  const levelPercent = ((seller.sessions % 10) / 10) * 100;

  return (
    <div className="animate-fade-in p-4 space-y-5 pb-8">
      <div className="pt-2">
        <h1 className="text-xl font-bold text-beaver-text">Профиль</h1>
        <p className="text-sm text-beaver-muted mt-0.5">Ваши успехи и настройки</p>
      </div>

      {/* Profile card */}
      <div className="bg-white border border-border rounded-2xl p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
              style={{ background: "var(--beaver-green)" }}
            >
              {seller.name.charAt(0).toUpperCase()}
            </div>
            <div>
              {editing ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-lg font-bold text-beaver-text bg-gray-100 rounded-lg px-2 py-1 outline-none w-36"
                />
              ) : (
                <div className="text-lg font-bold text-beaver-text">{seller.name}</div>
              )}
              {editing ? (
                <select
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  className="text-xs mt-1 bg-gray-100 rounded-lg px-2 py-1 outline-none text-beaver-muted w-36"
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              ) : (
                <div className="text-sm text-beaver-green font-medium">{seller.department}</div>
              )}
            </div>
          </div>
          {editing ? (
            <button
              onClick={saveProfile}
              className="text-sm font-semibold text-white px-3 py-1.5 rounded-lg"
              style={{ background: "var(--beaver-green)" }}
            >
              Сохранить
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="text-sm text-beaver-muted hover:text-beaver-text transition-colors"
            >
              <Icon name="Pencil" size={16} />
            </button>
          )}
        </div>

        {/* Level */}
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-beaver-muted uppercase tracking-wide">
              Уровень {seller.level}
            </span>
            <span className="text-xs text-beaver-muted">{seller.sessions % 10}/10 до следующего</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-700"
              style={{ width: `${levelPercent}%`, background: "var(--beaver-green)" }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: "Play", label: "Тренировок", value: seller.sessions, color: "#1d5c38" },
          { icon: "Star", label: "Лучший результат", value: "3 ⭐", color: "#e8650a" },
          { icon: "Clock", label: "Часов обучения", value: `${Math.round(seller.sessions * 0.15)}ч`, color: "#1d5c38" },
          { icon: "TrendingUp", label: "Прогресс курса", value: "60%", color: "#1d5c38" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-border rounded-2xl p-4">
            <Icon name={s.icon} size={18} className="mb-2" style={{ color: s.color }} />
            <div className="text-xl font-bold text-beaver-text">{s.value}</div>
            <div className="text-xs text-beaver-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-sm font-semibold text-beaver-muted uppercase tracking-wide mb-3">
          Достижения
        </h2>
        <div className="space-y-2">
          {achievements.map((a, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 bg-white border rounded-xl px-4 py-3 transition-all ${
                a.done ? "border-border" : "border-border opacity-40"
              }`}
            >
              <span className="text-xl">{a.icon}</span>
              <div className="flex-1">
                <div className={`text-sm font-semibold ${a.done ? "text-beaver-text" : "text-beaver-muted"}`}>
                  {a.title}
                </div>
                <div className="text-xs text-beaver-muted">{a.desc}</div>
              </div>
              {a.done && <Icon name="CheckCircle" size={18} className="text-beaver-green flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* About app */}
      <div className="bg-gray-50 border border-border rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🦫</span>
          <span className="font-bold text-sm text-beaver-text">Бобёр Строй — Помощник продавца</span>
        </div>
        <p className="text-xs text-beaver-muted leading-relaxed">
          Инструмент для обучения технике продаж и консультации покупателей в реальном времени с помощью AI.
        </p>
        <a
          href="https://www.bober-stroy.ru"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 mt-3 text-xs text-beaver-green font-medium hover:underline"
        >
          <Icon name="ExternalLink" size={12} />
          bober-stroy.ru
        </a>
      </div>
    </div>
  );
}
