import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Shield,
  TriangleAlert,
  Brain,
  Smile,
  ChevronLeft,
  Search,
  MoreVertical,
  Download,
  HelpCircle,
  LogOut,
  History,
  Users,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Card,
  CardBody,
  Spinner,
  User as NextUIUser,
  Avatar,
} from "@nextui-org/react";
import ChatEmojiPicker from "../components/ChatEmojiPicker";
import { EmojiClickData } from "emoji-picker-react";
import { ChildService, ChatMessage } from "@/src/app/api";
import { usePWA } from "../hooks/usePWA";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useChatStore } from "../hooks/useChatStore";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "../hooks/useAuth";
import { useChildContext } from "../contexts/ChildContext";
import ChildSelector from "../components/ChildSelector";

interface Child {
  id: string;
  nickname: string;
}

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
  const { isInstallable, installApp } = usePWA();
  const router = useRouter();
  const currentLocale = useLocale();

  const { user, loading: authLoading } = useAuth();
  const { selectedChildId, setSelectedChildId, isLoading: contextLoading } = useChildContext();
  const { setActiveChildId, activeChildNickname } = useChatStore();
  const [children, setChildren] = useState<Child[]>([]);
  const [isLoadingChildren, setIsLoadingChildren] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndValidate = async () => {
      if (authLoading || !user) return;

      setIsLoadingChildren(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("children")
          .select("id, nickname")
          .eq("parent_id", user.id);

        if (error) throw error;
        setChildren(data || []);

        // Requirements Walkthrough:
        // 1. Initialization Check
        const storedId = localStorage.getItem('chat_selected_child');
        if (storedId) {
          const isValid = data?.some(c => c.id === storedId);
          if (isValid) {
            // If exists AND valid, use it immediately
            setSelectedChildId(storedId);
            setActiveChildId(storedId);
          } else {
            // If invalid, clear it
            localStorage.removeItem('chat_selected_child');
            setSelectedChildId(null);
            setActiveChildId(null);
          }
        }
      } catch (err) {
        console.error("Failed to load children", err);
        setErrorMsg("Failed to load children");
      } finally {
        setIsLoadingChildren(false);
      }
    };

    fetchAndValidate();
  }, [authLoading, user, setSelectedChildId, setActiveChildId]);

  const handleMenuAction = (key: string) => {
    if (key === "install") {
      if (confirm("Would you like to install this app?")) {
        installApp();
      }
    } else if (key === "help") {
      router.push(`/${currentLocale}/dashboard?section=help`);
    } else if (key === "history") {
      router.push(`/${currentLocale}/chat/history`);
    } else if (key === "change_child") {
      setSelectedChildId(null);
      setActiveChildId(null);
    } else if (key === "exit") {
      router.push("/");
    }
  };

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

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInputValue((prev) => prev + emojiData.emoji);
  };

  const handleProceed = (childId: string) => {
    setSelectedChildId(childId);
    setActiveChildId(childId);
  };

  if (authLoading || isLoadingChildren || contextLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#f0f2f5] dark:bg-[#111b21]">
        <Spinner size="lg" color="primary" label="Readying Chat..." />
      </div>
    );
  }

  // Requirements Walkthrough:
  // 2. Selection Flow (Fullscreen Overlay)
  if (!selectedChildId) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
        {errorMsg && (
          <div className="absolute top-10 left-0 right-0 px-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-bounce">
              {errorMsg}
            </div>
          </div>
        )}

        {/* 3. Empty State Logic */}
        {children.length === 0 ? (
          <Card className="max-w-md w-full border-none shadow-xl bg-white/80 backdrop-blur-md">
            <CardBody className="p-8 flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-[#FBCFE8] rounded-full flex items-center justify-center text-[#DB2777]">
                <Shield className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#2F3A2A]">
                  Account Initialization Required
                </h3>
                <p className="text-sm text-[#4A5445]">
                  Please Add the Childrens that would use the chat app in your Dashboard
                </p>
              </div>
              <Button
                color="secondary"
                radius="full"
                className="w-full font-bold h-12 text-md shadow-lg"
                onPress={() => router.push(`/${currentLocale}/dashboard`)}
              >
                Go to Dashboard
              </Button>
            </CardBody>
          </Card>
        ) : (
          <div className="w-full max-w-2xl mx-auto space-y-8">
            <div className="space-y-2">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-[#E8EDE6] rounded-full flex items-center justify-center text-[#889A7F] shadow-sm">
                  <Brain className="w-10 h-10" />
                </div>
              </div>
              <h1 className="text-3xl font-extrabold text-[#2F3A2A] tracking-tight">
                Welcome back!
              </h1>
              <p className="text-[#4A5445] text-lg">
                Please select the children that will use the chat app today
              </p>
            </div>

            <ChildSelector
              mode="mandatory"
              onSelect={handleProceed}
            />

            <button
              onClick={() => router.push('/')}
              className="text-[#889A7F] font-bold text-sm hover:underline transition-all"
            >
              Cancel and Exit
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F7F4] font-sans w-full relative">
      {/* Header - Fixed height */}
      <div className="flex-none bg-white/90 backdrop-blur-md border-b border-[#D4DDD0]/60 p-3 z-30 shadow-sm flex justify-center pt-8">
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("hello")}
              className="p-1.5 -ml-1.5 hover:bg-[#F5F7F4] rounded-full transition-colors text-[#4A5445]"
              title="Back to Welcome"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center justify-between flex-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#889A7F] to-[#748866] rounded-full flex items-center justify-center shadow-md shadow-[#D4DDD0]">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-[#2F3A2A] text-lg leading-none">
                      SafeMentor
                    </h2>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button isIconOnly variant="light" radius="full" size="sm">
                  <Search size={20} className="text-default-500" />
                </Button>
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button isIconOnly variant="light" radius="full" size="sm">
                      <MoreVertical size={20} className="text-default-500" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Menu"
                    onAction={(key) => handleMenuAction(key as string)}
                  >
                    <DropdownItem
                      key="install"
                      startContent={<Download size={18} />}
                    >
                      {isInstallable
                        ? "Install this APP"
                        : "PWA Status (Debug)"}
                    </DropdownItem>
                    <DropdownItem
                      key="change_child"
                      startContent={<Users size={18} />}
                    >
                      Change children
                    </DropdownItem>
                    <DropdownItem
                      key="history"
                      startContent={<History size={18} />}
                    >
                      Messages Stored
                    </DropdownItem>
                    <DropdownItem
                      key="help"
                      startContent={<HelpCircle size={18} />}
                    >
                      Help
                    </DropdownItem>
                    <DropdownItem
                      key="exit"
                      className="text-danger"
                      color="danger"
                      startContent={<LogOut size={18} />}
                    >
                      Exit
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>

          {/* Safety Badge */}
          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#E8EDE6]/50 border border-[#D4DDD0]/50 rounded-lg w-full">
            <Shield className="w-3 h-3 text-[#889A7F] flex-shrink-0" />
            <p className="text-[12px] text-[#4A5445] font-medium truncate">
              Hi {activeChildNickname}, I look for unsafe language to make you safe
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
            <div className="flex items-center pl-2 mb-1">
              <Popover placement="top-start" offset={10}>
                <PopoverTrigger>
                  <Button isIconOnly variant="light" radius="full" size="sm">
                    <Smile size={20} className="text-[#889A7F]" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 border-none shadow-none bg-transparent">
                  <ChatEmojiPicker onEmojiClick={handleEmojiClick} />
                </PopoverContent>
              </Popover>
            </div>
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