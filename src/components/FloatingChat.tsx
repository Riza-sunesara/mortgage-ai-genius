import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FloatingChat = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <Card className="mb-4 w-80 shadow-2xl animate-in slide-in-from-bottom-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Need Help?</CardTitle>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
              <p className="text-sm text-muted-foreground">FAQ Chatbot Placeholder</p>
            </div>
          </CardContent>
        </Card>
      )}
      <Button
        id="chatbot-open-btn"
        onClick={() => setOpen(!open)}
        className="h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90"
        size="icon"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
    </div>
  );
};

export default FloatingChat;
