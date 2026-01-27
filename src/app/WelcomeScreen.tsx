import React from "react";
import {
  Brain,
  Sparkles,
  BookOpen,
  Info,
  ArrowRight,
  PartyPopper,
} from "lucide-react";

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function WelcomeScreen({
  onNavigate,
}: WelcomeScreenProps) {
  return (
    <div className="flex flex-col h-full bg-white font-sans relative overflow-hidden w-full">
      {/* Background Gradients - Optimized for mobile frame */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#F5F7F4] rounded-full blur-[60px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-10%] w-56 h-56 bg-[#E8EDE6] rounded-full blur-[60px] opacity-60 pointer-events-none" />

      {/* Main Content Area */}
      <div className="flex-1 px-5 pt-16 pb-6 flex flex-col overflow-y-auto z-10 no-scrollbar items-center w-full">
        <div className="w-full max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#889A7F] to-[#748866] rounded-2xl flex items-center justify-center shadow-lg shadow-[#D4DDD0] mb-6 mx-auto shrink-0 transform rotate-3">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-[#2F3A2A] tracking-tight mb-2 leading-tight">
                Hi, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#889A7F] to-[#748866]">
                  SafeMentor.
                </span>
              </h1>
              <p className="text-base text-[#4A5445] font-medium leading-relaxed px-2">
                I help you think, learn, and stay safe online.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-3 mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            <div className="bg-white/80 backdrop-blur-sm border border-[#D4DDD0] rounded-xl p-4 shadow-sm">
              <h3 className="text-xs font-bold text-[#889A7F] uppercase tracking-wider mb-3">
                What we can do
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                <FeatureItem
                  icon={
                    <BookOpen className="w-4 h-4 text-orange-600" />
                  }
                  color="bg-orange-100"
                  text="Tackle homework"
                />
                <FeatureItem
                  icon={
                    <Sparkles className="w-4 h-4 text-purple-600" />
                  }
                  color="bg-purple-100"
                  text="Plan fun projects"
                />
                <FeatureItem
                  icon={
                    <PartyPopper className="w-4 h-4 text-green-600" />
                  }
                  color="bg-green-100"
                  text="Explore cool ideas"
                />
              </div>
            </div>

            {/* Transparency Card */}
            <div className="bg-gradient-to-br from-[#F5F7F4] to-[#E8EDE6] border border-[#D4DDD0] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-[#889A7F]" />
                <h3 className="font-bold text-[#4A5445] text-sm">
                  Good to know
                </h3>
              </div>
              <ul className="space-y-2">
                <TransparencyItem text="I'm a computer brain, not a real person." />
                <TransparencyItem text="I tell your parents if things get dangerous." />
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / CTA */}
      <div className="p-5 bg-white/80 backdrop-blur-md border-t border-[#D4DDD0] z-20 pb-8 flex justify-center w-full">
        <div className="w-full max-w-2xl mx-auto">
          <button
            onClick={() => onNavigate("chat")}
            className="group w-full bg-[#889A7F] text-white font-bold text-base py-3.5 rounded-xl shadow-lg shadow-[#D4DDD0] hover:bg-[#748866] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Start Chatting
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({
  icon,
  color,
  text,
}: {
  icon: React.ReactNode;
  color: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#F5F7F4] transition-colors cursor-default">
      <div
        className={`w-8 h-8 ${color} rounded-full flex items-center justify-center shrink-0`}
      >
        {icon}
      </div>
      <span className="font-semibold text-[#4A5445] text-sm">
        {text}
      </span>
    </div>
  );
}

function TransparencyItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-xs text-[#4A5445]/80 leading-relaxed">
      <span className="mt-1 w-1 h-1 bg-[#889A7F] rounded-full shrink-0" />
      <span className="font-medium">{text}</span>
    </li>
  );
}