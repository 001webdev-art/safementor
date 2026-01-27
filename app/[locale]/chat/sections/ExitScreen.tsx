import React from "react";
import {
  RefreshCw,
  Lock,
  Sparkles,
  LogOut,
} from "lucide-react";

interface ExitScreenProps {
  onNavigate: (screen: string) => void;
}

export function ExitScreen({ onNavigate }: ExitScreenProps) {
  return (
    <div className="flex flex-col h-full bg-[#F5F7F4] font-sans items-center justify-center p-8 text-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-20%] w-96 h-96 bg-[#E8EDE6] rounded-full blur-[100px] opacity-40 pointer-events-none" />

      <div className="relative z-10 animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#D4DDD0] ring-4 ring-white">
          <Sparkles className="w-10 h-10 text-[#889A7F] animate-pulse" />
        </div>

        <h1 className="text-3xl font-extrabold text-[#2F3A2A] mb-3 tracking-tight">
          Was great to see you
        </h1>
        <p className="text-[#4A5445] text-lg font-medium mb-10">
          Now go play outside and have fun!
        </p>

        <div className="bg-white rounded-2xl p-6 mb-8 w-full shadow-lg shadow-[#D4DDD0] border border-[#D4DDD0] max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 bg-[#F5F7F4] rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#889A7F]" />
            </div>
            <div>
              <p className="font-bold text-sm text-[#2F3A2A]">
                Privacy
              </p>
              <p className="text-xs text-[#4A5445] mt-1 leading-relaxed">
                I clear our chats after each session, keeping only a short summary for 7-days.
                If I worry about your safety, I save things for 30 days to help get you support.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate("hello")}
          className="w-full max-w-lg py-4 bg-[#889A7F] text-white font-bold rounded-2xl shadow-xl hover:bg-[#748866] hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 mx-auto"
        >
          <RefreshCw className="w-5 h-5" />
          Start New Session
        </button>

        <p className="text-xs text-[#4A5445]/60 mt-8 font-medium">
          You can safely close this window now.
        </p>
      </div>
    </div>
  );
}