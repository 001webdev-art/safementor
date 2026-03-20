import React from "react";
import {
  Heart,
  Users,
  Phone,
  ChevronLeft,
  MessageSquare,
  Shield,
  Brain,
  Sparkles,
} from "lucide-react";

interface HelpScreenProps {
  onNavigate: (screen: string) => void;
}

export function HelpScreen({
  onNavigate,
}: HelpScreenProps) {
  return (
    <div className="flex flex-col h-full bg-[#F5F7F4] font-sans relative w-full">
      {/* Header */}
      <div className="p-4 bg-white border-b border-[#D4DDD0] flex items-center gap-3 shadow-sm sticky top-0 z-20 justify-center pt-8">
        <div className="w-full max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={() => onNavigate("chat")}
            className="p-1.5 -ml-1.5 hover:bg-[#F5F7F4] rounded-full transition-colors text-[#4A5445]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-[#2F3A2A]">
            Help & Support
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-8 flex flex-col items-center w-full">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          {/* Intro */}
          <div className="bg-gradient-to-br from-[#889A7F] to-[#748866] rounded-2xl p-5 text-white shadow-lg shadow-[#D4DDD0]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-base">
                How I can help
              </h3>
            </div>
            <p className="text-[#E8EDE6] text-xs leading-relaxed font-medium">
              I'm here to help you think through problems and chat. Remember, I'm a computer program, not a person.
            </p>
          </div>

          {/* When to talk to a human */}
          <div className="animate-in slide-in-from-bottom-4 duration-500 delay-100">
            <h3 className="font-bold text-[#2F3A2A] mb-3 flex items-center gap-2 text-xs uppercase tracking-wide">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              Talk to a trusted adult when..
            </h3>
            <div className="bg-white border border-[#D4DDD0] rounded-xl overflow-hidden shadow-sm divide-y divide-[#F5F7F4]">
              <ListItem text="You feel scared or unsafe" />
              <ListItem text="Someone is hurting you" />
              <ListItem text="You feel very sad or confused" />
              <div className="p-3 bg-[#F5F7F4]/50">
                <p className="text-[10px] text-[#4A5445] font-medium leading-tight">
                  I can't truly understand these feelings, but adults can.
                </p>
              </div>
            </div>
          </div>

          {/* Trusted Adults */}
          <div className="animate-in slide-in-from-bottom-4 duration-500 delay-200">
            <h3 className="font-bold text-[#2F3A2A] mb-3 flex items-center gap-2 text-xs uppercase tracking-wide">
              <Users className="w-3.5 h-3.5 text-[#889A7F]" />
              Trusted Adults
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <Tag text="Parent" />
              <Tag text="Teacher" />
              <Tag text="Coach" />
              <Tag text="Relative" />
            </div>
          </div>

          {/* Crisis Line */}
          <div className="animate-in slide-in-from-bottom-4 duration-500 delay-300">
            <button className="group w-full py-3 border-2 border-rose-100 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-100 hover:border-rose-200 transition-all flex items-center justify-center gap-2 text-sm">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Phone className="w-3 h-3" />
              </div>
              Call Kids Helpline: 116 111
            </button>
          </div>

          {/* Key Reminders */}
          <div className="animate-in slide-in-from-bottom-4 duration-500 delay-400 pt-2 border-t border-[#D4DDD0]">
            <h3 className="font-bold text-[#2F3A2A] mb-3 flex items-center gap-2 text-xs uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#889A7F]" />
              Things to Remember
            </h3>
            <div className="bg-white border border-[#D4DDD0] rounded-xl overflow-hidden shadow-sm divide-y divide-[#F5F7F4]">
              <InfoItem
                emoji="🛡️"
                title="Stay Safe"
                text="I must tell your parents if things get dangerous."
              />
              <InfoItem
                emoji="🧠"
                title="Learn Together"
                text="I help you think, but I won't do your homework!"
              />
              <InfoItem
                emoji="🤫"
                title="Privacy"
                text="Our chats stay private unless you are in danger."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  emoji,
  title,
  text,
}: {
  emoji: string;
  title: string;
  text: string;
}) {
  return (
    <div className="p-3 hover:bg-[#F5F7F4] transition-colors">
      <div className="flex gap-2.5">
        <div className="flex-shrink-0 mt-0.5">
          <span className="text-lg" role="img" aria-label={title}>
            {emoji}
          </span>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-[#2F3A2A] mb-0.5 text-xs">{title}:</h4>
          <p className="text-xs text-[#4A5445] leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <div className="p-3 hover:bg-[#F5F7F4] transition-colors">
      <p className="font-medium text-[#2F3A2A] text-xs">{text}</p>
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="px-3 py-1.5 bg-white border border-[#D4DDD0] rounded-lg text-xs font-semibold text-[#4A5445] shadow-sm hover:border-[#889A7F] hover:text-[#889A7F] transition-colors cursor-default">
      {text}
    </span>
  );
}