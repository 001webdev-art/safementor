'use client';

import React, { useState } from "react";
import {
  MessageCircle,
  CircleHelp,
  LogOut,
  Brain,
} from "lucide-react";
import { WelcomeScreen } from "./WelcomeScreen";
import { ChatScreen } from "./ChatScreen";
import { HelpScreen } from "./HelpScreen";
import { ExitScreen } from "./ExitScreen";
import { ChatMessage } from "@/src/app/api";

type ChildScreen =
  | "welcome"
  | "chat"
  | "help"
  | "exit";

const INITIAL_MESSAGE: ChatMessage = {
  id: "1",
  sender: "ai",
  text: "I can help you dream up ideas and chat! I’m a robot, not a person. I sometimes make mistakes—stay curious!",
  timestamp: new Date().toISOString(),
};

export default function Home() {
  const [activeScreen, setActiveScreen] =
    useState<ChildScreen>("welcome");

  // Lifted state to persist chat history across navigation
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(
    [INITIAL_MESSAGE],
  );

  // Load history on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("child_chat_history");
    if (saved) {
      try {
        setChatHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse chat history");
      }
    }
  }, []);

  // Save history on change
  React.useEffect(() => {
    if (chatHistory.length > 1) { // Don't save if only initial message
      localStorage.setItem("child_chat_history", JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  const handleNavigate = (screen: string) => {
    // Determine the target screen. If the input includes "child-", strip it, 
    // but the new components might just pass "chat", "help" directly.
    // We'll support both for compatibility.
    const cleanScreen = screen.replace(
      "child-",
      "",
    ) as ChildScreen;

    // Reset chat history when starting a new session from Exit screen
    if (activeScreen === "exit" && cleanScreen === "welcome") {
      setChatHistory([INITIAL_MESSAGE]);
    }

    setActiveScreen(cleanScreen);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "welcome":
        return <WelcomeScreen onNavigate={handleNavigate} />;
      case "chat":
        return (
          <ChatScreen
            onNavigate={handleNavigate}
            messages={chatHistory}
            setMessages={setChatHistory}
          />
        );
      case "help":
        return <HelpScreen onNavigate={handleNavigate} />;
      case "exit":
        return <ExitScreen onNavigate={handleNavigate} />;
      default:
        return <WelcomeScreen onNavigate={handleNavigate} />;
    }
  };

  const showNavBar = ["chat", "help"].includes(activeScreen);

  return (
    <div className="h-full w-full bg-slate-100 flex flex-col relative overflow-hidden">
      {/* Desktop Navigation Header */}
      {showNavBar && (
        <div className="hidden md:block sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-[#889A7F] to-[#748866] rounded-lg flex items-center justify-center text-white">
                <Brain className="w-5 h-5" />
              </div>
              <span>SafeMentor</span>
            </div>
            <div className="flex items-center gap-1">
              <NavButton
                icon={MessageCircle}
                label="Chat"
                isActive={activeScreen === "chat"}
                onClick={() => handleNavigate("chat")}
                desktop
              />
              <NavButton
                icon={CircleHelp}
                label="Help"
                isActive={activeScreen === "help"}
                onClick={() => handleNavigate("help")}
                desktop
              />
              <div className="w-px h-6 bg-slate-200 mx-2" />
              <NavButton
                icon={LogOut}
                label="Exit"
                isActive={false}
                onClick={() => handleNavigate("exit")}
                desktop
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="w-full flex-1 overflow-hidden bg-white relative">
        <div className="w-full h-full">
          {renderScreen()}
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      {showNavBar && (
        <div className="md:hidden absolute bottom-0 left-0 right-0 h-[80px] bg-white/95 backdrop-blur-lg border-t border-slate-200 flex items-start justify-around pt-3 z-50 px-6 pb-6">
          <NavButton
            icon={MessageCircle}
            label="Chat"
            isActive={activeScreen === "chat"}
            onClick={() => handleNavigate("chat")}
          />
          <NavButton
            icon={CircleHelp}
            label="Help"
            isActive={activeScreen === "help"}
            onClick={() => handleNavigate("help")}
          />
          <NavButton
            icon={LogOut}
            label="Exit"
            isActive={false}
            onClick={() => handleNavigate("exit")}
          />
        </div>
      )}
    </div>
  );
}

function NavButton({
  icon: Icon,
  label,
  isActive,
  onClick,
  desktop = false,
}: {
  icon: any;
  label: string;
  isActive: boolean;
  onClick: () => void;
  desktop?: boolean;
}) {
  if (desktop) {
    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${isActive
          ? "bg-slate-100 text-slate-900"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
          }`}
      >
        <Icon className={`w-4 h-4 ${isActive ? "text-[#889A7F]" : ""}`} />
        {label}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${isActive
        ? "text-blue-600 scale-105"
        : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
        }`}
    >
      <div
        className={`p-1.5 rounded-full transition-all ${isActive ? "bg-blue-50" : "bg-transparent"}`}
      >
        <Icon
          className={`w-6 h-6 ${isActive ? "stroke-2" : "stroke-[1.5]"}`}
        />
      </div>
      <span className="text-[10px] font-medium tracking-wide">
        {label}
      </span>
    </button>
  );
}
