import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Sparkles, Send, ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

interface ChatMessage {
  id: number;
  text: string;
  sender: "bot" | "user";
  showAssessmentBtn?: boolean;
  showLoginBtn?: boolean;
}

const PERSONAL_KEYWORDS = [
  "my application", "my status", "show my data", "my mortgage",
  "my profile", "my account", "application status", "my documents",
];

const FloatingChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, text: "Hi! I'm your MortgageAI Assistant. How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [hasReplied, setHasReplied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const isPersonalQuery = (text: string) =>
    PERSONAL_KEYWORDS.some((kw) => text.toLowerCase().includes(kw));

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || hasReplied) return;

    const userMsg: ChatMessage = { id: Date.now(), text: trimmed, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const personal = isPersonalQuery(trimmed);

    setTimeout(() => {
      setTyping(false);
      setHasReplied(true);

      if (personal && !user) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "Please login to view your personal application details.",
            sender: "bot",
            showLoginBtn: true,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "That's a great question! Our specialists can certainly help with that. Would you like to start a full pre-qualification assessment now?",
            sender: "bot",
            showAssessmentBtn: true,
          },
        ]);
      }
    }, 1500);
  };

  const handleStartAssessment = () => {
    setOpen(false);
    if (!user) {
      setAuthOpen(true);
    } else {
      navigate("/pre-qualification");
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="mb-4 w-[340px] glass-strong rounded-2xl shadow-2xl glow-accent overflow-hidden flex flex-col"
              style={{ maxHeight: "480px" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/30 px-5 py-4 shrink-0">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-accent" />
                  <span className="text-sm font-semibold text-foreground">MortgageAI Assistant</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0" style={{ maxHeight: "320px" }}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "gradient-primary text-primary-foreground rounded-br-md"
                          : "bg-muted/60 text-foreground rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                      {msg.showAssessmentBtn && (
                        <Button
                          id="chat-start-assessment-btn"
                          size="sm"
                          className="mt-3 w-full gradient-accent text-accent-foreground gap-1.5"
                          onClick={handleStartAssessment}
                        >
                          Start Assessment <ArrowRight size={14} />
                        </Button>
                      )}
                      {msg.showLoginBtn && (
                        <Button
                          id="chat-login-btn"
                          size="sm"
                          className="mt-3 w-full gradient-accent text-accent-foreground gap-1.5"
                          onClick={() => { setOpen(false); setAuthOpen(true); }}
                        >
                          <LogIn size={14} /> Sign In
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}

                {typing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-muted/60 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5 items-center">
                      <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="border-t border-border/30 p-3 shrink-0">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={hasReplied ? "Use the button above..." : "Type a message..."}
                    disabled={hasReplied}
                    className="flex-1 bg-muted/30 border-border/40 text-sm rounded-xl"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || hasReplied}
                    className="rounded-xl gradient-accent text-accent-foreground shrink-0"
                  >
                    <Send size={16} />
                  </Button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          id="chatbot-open-btn"
          onClick={() => setOpen(!open)}
          className="h-14 w-14 rounded-full gradient-accent text-accent-foreground shadow-lg glow-accent hover:shadow-xl hover:scale-110 transition-all duration-300"
          size="icon"
        >
          {open ? <X size={22} /> : <MessageCircle size={22} />}
        </Button>
      </div>
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};

export default FloatingChat;
