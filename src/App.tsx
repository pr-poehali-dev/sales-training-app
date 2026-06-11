import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import HomePage from "@/pages/HomePage";
import SimulatorPage from "@/pages/SimulatorPage";
import ChatPage from "@/pages/ChatPage";
import CatalogPage from "@/pages/CatalogPage";
import TrainingPage from "@/pages/TrainingPage";
import ProfilePage from "@/pages/ProfilePage";

const DEFAULT_SELLER = {
  name: "Алексей",
  department: "Сантехника",
  level: 2,
  sessions: 7,
};

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [seller, setSeller] = useState(DEFAULT_SELLER);

  const updateSeller = (updates: Partial<typeof DEFAULT_SELLER>) => {
    setSeller((s) => ({ ...s, ...updates }));
  };

  const renderPage = () => {
    switch (activeTab) {
      case "home": return <HomePage onNavigate={setActiveTab} seller={seller} />;
      case "simulator": return <SimulatorPage />;
      case "chat": return <ChatPage />;
      case "catalog": return <CatalogPage />;
      case "training": return <TrainingPage />;
      case "profile": return <ProfilePage seller={seller} onUpdateSeller={updateSeller} />;
      default: return <HomePage onNavigate={setActiveTab} seller={seller} />;
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen max-w-md mx-auto bg-background">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-white flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">🦫</span>
            <span className="font-bold text-sm text-beaver-text tracking-tight">Бобёр Строй</span>
            <span className="text-xs text-beaver-muted font-normal">· помощник продавца</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-beaver-muted">AI онлайн</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto" key={activeTab}>
          {renderPage()}
        </div>

        <div className="flex-shrink-0">
          <BottomNav active={activeTab} onNavigate={setActiveTab} />
        </div>
      </div>
    </TooltipProvider>
  );
}
