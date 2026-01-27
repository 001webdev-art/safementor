import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Shield,
  TriangleAlert,
  Brain,
} from "lucide-react";
import { ChildService, ChatMessage } from "@/src/app/api";

interface ChatScreenProps {
  onNavigate: (screen: string) => void;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export function ChatScreen({
  onNavigate,
  messages = [],
  setMessages,
}: ChatScreenProps) {
  const [inputValue, setInputValue] = useState("");
  const [showPiiWarning, setShowPiiWarning] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const checkSafety = (text: string) => {
    const phoneRegex =
      /(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
    const emailRegex = /\S+@\S+\.\S+/;
    const addressKeywords = [
      "my address is",
      "i live at",
      "come to my house",
    ];

    if (
      phoneRegex.test(text) ||
      emailRegex.test(text) ||
      addressKeywords.some((k) =>
        text.toLowerCase().includes(k),
      )
    ) {
      setShowPiiWarning(true);
    } else {
      setShowPiiWarning(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const text = e.target.value;
    setInputValue(text);
    checkSafety(text);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setShowPiiWarning(false);
    setIsTyping(true);

    try {
      // Simulate network delay for realism
      await new Promise((resolve) => setTimeout(resolve, 800));
      const response = await ChildService.sendMessage(
        newMessage.text,
      );
      setMessages((prev) => [...prev, response]);
    } catch (error) {
      console.error("Failed to get AI response", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F7F4] font-sans w-full relative pb-[80px] md:pb-0">
      {/* Header - Fixed height */}
      <div className="flex-none bg-white/90 backdrop-blur-md border-b border-[#D4DDD0]/60 p-3 z-30 shadow-sm flex justify-center pt-8">
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-[#889A7F] to-[#748866] rounded-full flex items-center justify-center shadow-md shadow-[#D4DDD0]">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-[#2F3A2A] text-sm leading-none">
                    SafeMentor
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Badge */}
          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#E8EDE6]/50 border border-[#D4DDD0]/50 rounded-lg w-full">
            <Shield className="w-3 h-3 text-[#889A7F] flex-shrink-0" />
            <p className="text-[10px] text-[#4A5445] font-medium truncate">
              I look for unsafe language
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area - Flex Grow */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 pb-2 scroll-smooth flex flex-col items-center w-full">
        <div className="w-full max-w-2xl mx-auto space-y-4">
          {(messages || []).map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed shadow-sm ${msg.sender === "user"
                  ? "bg-[#889A7F] text-white rounded-2xl rounded-tr-sm"
                  : "bg-white text-[#2F3A2A] border border-[#D4DDD0] rounded-2xl rounded-tl-sm shadow-[#D4DDD0]/50"
                  }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] text-[#4A5445]/60 font-medium mt-1 px-1">
                {new Date(msg.timestamp).toLocaleTimeString(
                  [],
                  { hour: "2-digit", minute: "2-digit" },
                )}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-in fade-in duration-300">
              <div className="bg-white border border-[#D4DDD0] px-3 py-2 rounded-2xl rounded-tl-sm shadow-sm flex gap-1 items-center">
                <span className="w-1 h-1 bg-[#889A7F] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1 h-1 bg-[#889A7F] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1 h-1 bg-[#889A7F] rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-2" />
        </div>
      </div>

      {/* Input Area - Above Tab Bar */}
      <div className="flex-none bg-white border-t border-[#D4DDD0] p-2 z-40 w-full">
        <div className="w-full max-w-2xl mx-auto relative">
          {/* PII Warning Toast */}
          {showPiiWarning && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-3 shadow-lg shadow-amber-100/50 animate-in slide-in-from-bottom-2 mx-2">
              <TriangleAlert className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-amber-900">
                  Wait a second
                </p>
                <p className="text-[10px] text-amber-700 mt-0.5 leading-tight">
                  Please don't share personal info like address or phone.
                </p>
              </div>
            </div>
          )}

          <div className="relative flex items-end gap-2 bg-[#F5F7F4] border border-transparent focus-within:bg-white focus-within:border-[#889A7F] focus-within:ring-4 focus-within:ring-[#E8EDE6] rounded-[20px] p-1 transition-all duration-300">
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none resize-none focus:ring-0 text-sm max-h-24 py-2.5 px-3 text-[#2F3A2A] placeholder:text-[#4A5445]/50"
              rows={1}
              style={{ minHeight: "40px" }}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-8 h-8 bg-[#889A7F] text-white rounded-full flex items-center justify-center hover:bg-[#748866] active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:hover:bg-[#889A7F] transition-all shadow-md shadow-[#D4DDD0] flex-shrink-0 mb-1 mr-1"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}