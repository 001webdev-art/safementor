import React from "react";
import { Apple, Smartphone, QrCode, Copy, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export function DownloadChildApp() {
  const [copied, setCopied] = React.useState(false);
  const link = "https://safementor.app/child/install";

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-full bg-white flex flex-col font-sans text-slate-900">
      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-xl tracking-tight">SafeMentor</span>
        </div>
        <button className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
          Need help?
        </button>
      </header>

      <main className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full">
        {/* Left Content */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 w-fit mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              Child App Only
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight">
            Download the <br />
            <span className="text-blue-600">Child App</span>
          </h1>
          
          <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
            Install SafeMentor on your child's device to enable real-time safety monitoring, secure chat, and emotional wellbeing tracking.
          </p>

          <div className="space-y-6">
            {/* Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3.5 rounded-xl hover:bg-slate-800 transition-all hover:scale-[1.02] shadow-xl shadow-slate-200">
                <Apple className="w-8 h-8" fill="currentColor" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-[10px] uppercase font-bold opacity-80 leading-none mb-0.5">Download on the</span>
                  <span className="text-lg font-bold leading-none">App Store</span>
                </div>
              </button>
              
              <button className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3.5 rounded-xl hover:bg-slate-800 transition-all hover:scale-[1.02] shadow-xl shadow-slate-200">
                <Smartphone className="w-8 h-8" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-[10px] uppercase font-bold opacity-80 leading-none mb-0.5">Get it on</span>
                  <span className="text-lg font-bold leading-none">Google Play</span>
                </div>
              </button>
            </div>

            <div className="flex items-center gap-4 py-4">
              <div className="h-px bg-slate-200 flex-1"></div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Or via Link</span>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            {/* Copy Link Section */}
            <div className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-slate-50 shadow-sm max-w-md">
              <div className="p-2 bg-white rounded-lg border border-slate-100">
                <QrCode className="w-5 h-5 text-slate-600" />
              </div>
              <input 
                type="text" 
                value={link} 
                readOnly 
                className="flex-1 bg-transparent border-none text-sm text-slate-600 focus:outline-none font-medium truncate"
              />
              <button 
                onClick={handleCopy}
                className="p-2 hover:bg-white rounded-lg transition-colors text-slate-600 border border-transparent hover:border-slate-200"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Features List */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <div className="w-1 h-full bg-blue-200 rounded-full"></div>
              <div>
                <h3 className="font-bold text-slate-900">Secure Chat</h3>
                <p className="text-sm text-slate-500">Private, AI-monitored communication.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 h-full bg-emerald-200 rounded-full"></div>
              <div>
                <h3 className="font-bold text-slate-900">Safety Alerts</h3>
                <p className="text-sm text-slate-500">Instant notifications for parents.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden md:flex flex-1 bg-slate-50 items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}></div>
          
          <div className="relative z-10 w-[300px] h-[600px] bg-slate-900 rounded-[50px] p-3 shadow-2xl rotate-[-6deg] hover:rotate-0 transition-transform duration-700">
            <div className="w-full h-full bg-white rounded-[40px] overflow-hidden relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758874961255-17604a0b6c13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHVzaW5nJTIwc21hcnRwaG9uZSUyMGhhcHB5fGVufDF8fHx8MTc2OTAxMTE4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Child App Preview"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay UI Mockup */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20 text-white">
                <p className="font-bold text-xl mb-1">Hi, Alex! 👋</p>
                <p className="text-sm opacity-90">How are you feeling today?</p>
                <div className="mt-4 flex gap-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs">Happy</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs">Calm</span>
                </div>
              </div>
            </div>
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-2xl"></div>
          </div>

          <div className="absolute bottom-10 right-10 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100 animate-bounce">
            <span className="text-sm font-bold text-slate-900">Scan to install</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </div>
        </div>
      </main>
    </div>
  );
}
