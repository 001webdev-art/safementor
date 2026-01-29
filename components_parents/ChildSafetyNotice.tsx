import React from 'react';
import { ShieldAlert, MessageCircle, ArrowLeft, X } from 'lucide-react';

interface ChildSafetyNoticeProps {
  onNavigate: (screen: any) => void;
  onNotifyParent?: () => void;
}

export function ChildSafetyNotice({ onNavigate, onNotifyParent }: ChildSafetyNoticeProps) {
  const [notified, setNotified] = React.useState(false);

  const handleNotify = () => {
    setNotified(true);
    if (onNotifyParent) {
      onNotifyParent();
    }
  };

  return (
    <div className="flex flex-col h-full bg-orange-50/30 font-sans relative overflow-hidden p-6 pb-24 items-center justify-center text-center">
      
      {/* Decorative background blob */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-orange-50 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm animate-in zoom-in-95 duration-500">
        <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(251,146,60,0.15)] border border-orange-100 p-8">
            <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-6 shadow-inner">
            <ShieldAlert className="w-10 h-10 text-orange-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">I'm a bit concerned</h2>
            
            <p className="text-slate-500 mb-8 leading-relaxed font-medium">
            This conversation is getting a bit heavy. It's best to talk to a real person who can truly help you with this.
            </p>

            <div className="space-y-3">
            <button 
                onClick={handleNotify}
                disabled={notified}
                className={`w-full py-4 px-6 font-bold rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 ${
                notified 
                    ? 'bg-emerald-500 text-white shadow-emerald-200 cursor-default' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5'
                }`}
            >
                {notified ? (
                <>
                    <MessageCircle className="w-5 h-5" />
                    Parent Notified
                </>
                ) : (
                <>
                    <MessageCircle className="w-5 h-5" />
                    Ask Parent for Help
                </>
                )}
            </button>
            
            <button 
                onClick={() => onNavigate('child-chat')}
                className="w-full py-4 px-6 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-2xl transition-colors"
            >
                Go back to chat
            </button>
            </div>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 mt-8 max-w-xs font-medium z-10">
        Your parent will receive a notification so they can support you.
      </p>
    </div>
  );
}
