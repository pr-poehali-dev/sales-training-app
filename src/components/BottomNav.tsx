import Icon from "@/components/ui/icon";

interface BottomNavProps {
  active: string;
  onNavigate: (tab: string) => void;
}

const tabs = [
  { id: "home", icon: "Home", label: "Главная" },
  { id: "simulator", icon: "Play", label: "Симулятор" },
  { id: "chat", icon: "MessageCircle", label: "Чат" },
  { id: "catalog", icon: "Package", label: "Каталог" },
  { id: "training", icon: "BookOpen", label: "Обучение" },
  { id: "profile", icon: "User", label: "Профиль" },
];

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="border-t border-border bg-white px-2 py-1 safe-area-bottom">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`nav-tab ${active === tab.id ? "active" : ""}`}
          >
            <Icon name={tab.icon} size={20} />
            <span className="text-[10px] font-medium leading-none">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
