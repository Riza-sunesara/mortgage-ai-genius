import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Sparkles, Send, LogIn } from "lucide-react";
import { MessageCircle, X, Sparkles, Send, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "@/components/AuthModal";

interface ChatMessage {
  id: number;
  text: string;
  sender: "bot" | "user";
  showSignupBtn?: boolean;
  showSignupBtn?: boolean;
}

const FloatingChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      text: "Hi! I'm your US Mortgage Education Assistant. Ask me about mortgage concepts, processes, or how to use tools on this site.",
      sender: "bot",
    },
    {
      id: 0,
      text: "Hi! I'm your US Mortgage Education Assistant. Ask me about mortgage concepts, processes, or how to use tools on this site.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
<<<<<<< HEAD
  const bottomRef = useRef<HTMLDivElement>(null);
  const [authOpen, setAuthOpen] = useState(false);
=======
  const [authOpen, setAuthOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
>>>>>>> ec57b9a (Added pre-qualification bot and Admin Dashboard logic)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = async () => {
    const handleSend = async () => {
      const trimmed = input.trim();
      if (!trimmed) return;

      // Basic client-side length guard to mirror backend validation
      if (trimmed.length > 1000) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: "Please keep your question under 1000 characters.",
            sender: "bot",
          },
        ]);
        return;
      }
      if (!trimmed) return;

      // Basic client-side length guard to mirror backend validation
      if (trimmed.length > 1000) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: "Please keep your question under 1000 characters.",
            sender: "bot",
          },
        ]);
        return;
      }

      const userMsg: ChatMessage = {
        id: Date.now(),
        text: trimmed,
        sender: "user",
      };
<<<<<<< HEAD
=======

>>>>>>> ec57b9a (Added pre-qualification bot and Admin Dashboard logic)
      const userMsg: ChatMessage = {
        id: Date.now(),
        text: trimmed,
        sender: "user",
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setTyping(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            mode: "general",
          }),
        });

        const data: { reply?: string; error?: string; requireAuth?: boolean } =
          await res.json().catch(() => ({}));

        const replyText =
          data.reply ??
          data.error ??
          "Sorry, I couldn't process that request. Please try again.";

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: replyText,
            sender: "bot",
            showSignupBtn: Boolean(data.requireAuth),
          },
        ]);
<<<<<<< HEAD
      } catch {
=======
    } catch (error) {
>>>>>>> ec57b9a (Added pre-qualification bot and Admin Dashboard logic)
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "Sorry, I couldn't reach the assistant. Please check your connection and try again.",
            sender: "bot",
          },
        ]);
      } finally {
        setTyping(false);
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: trimmed,
              mode: "general",
            }),
          });

          const data: { reply?: string; error?: string; requireAuth?: boolean } =
            await res.json().catch(() => ({}));

          const replyText =
            data.reply ??
            data.error ??
            "Sorry, I couldn't process that request. Please try again.";

          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              text: replyText,
              sender: "bot",
              showSignupBtn: Boolean(data.requireAuth),
            },
          ]);
        } catch {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              text: "Sorry, I couldn't reach the assistant. Please check your connection and try again.",
              sender: "bot",
            },
          ]);
        } finally {
          setTyping(false);
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
                          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.sender === "user"
                              ? "gradient-primary text-primary-foreground rounded-br-md"
                              : "bg-muted/60 text-foreground rounded-bl-md"
                            }`}
                        >
                          {msg.text}
                          {msg.showSignupBtn && (
                            {
                              msg.showSignupBtn && (
                                <Button
                                  id="chat-signup-btn"
                                  id="chat-signup-btn"
                                  size="sm"
                                  className="mt-3 w-full gradient-accent text-accent-foreground gap-1.5"
                                  onClick={() => {
                                    setOpen(false);
                                    setAuthOpen(true);
                                  }}
                                  onClick={() => {
                                    setOpen(false);
                                    setAuthOpen(true);
                                  }}
                                >
                                  <LogIn size={14} /> Sign Up
                                  <LogIn size={14} /> Sign Up
                                </Button>
                              )
                            }
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
                      onSubmit={(e) => {
                        e.preventDefault();
                        void handleSend();
                      }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        void handleSend();
                      }}
                      className="flex gap-2"
                    >
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a mortgage question..."
                        placeholder="Ask a mortgage question..."
                        className="flex-1 bg-muted/30 border-border/40 text-sm rounded-xl"
                      />
                      <Button
                        type="submit"
                        size="icon"
                        disabled={!input.trim()}
                        disabled={!input.trim()}
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
