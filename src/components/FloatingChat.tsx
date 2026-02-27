import { useState } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingChat = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 w-80 glass-strong rounded-2xl shadow-2xl glow-accent animate-scale-in overflow-hidden">
          <div className="flex items-center justify-between border-b border-border/30 px-5 py-4">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-accent" />
              <span className="text-sm font-semibold text-foreground">Need Help?</span>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <X size={16} />
            </button>
          </div>
          <div className="p-5">
            <div className="flex h-52 items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/20">
              <p className="text-sm text-muted-foreground">FAQ Chatbot Placeholder</p>
            </div>
          </div>
        </div>
      )}
      <Button
        id="chatbot-open-btn"
        onClick={() => setOpen(!open)}
        className="h-14 w-14 rounded-full gradient-accent text-accent-foreground shadow-lg glow-accent hover:shadow-xl hover:scale-110 transition-all duration-300"
        size="icon"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </Button>
    </div>
  );
};

export default FloatingChat;
