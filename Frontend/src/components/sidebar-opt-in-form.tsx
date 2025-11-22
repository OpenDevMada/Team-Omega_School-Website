import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SidebarInput } from "@/components/ui/sidebar";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function SidebarOptInForm() {
  const [message, setMessage] = useState<string>("");

  const handleSend = () => {
    if (!message.trim()) return;
    toast.promise(
      new Promise((res) => setTimeout(() => res("Message envoyé !"), 1200)), 
      {
        loading: "Envoi du message...",
        success: "Message envoyé !",
        error: "Erreur lors de l'envoi",
      }
    );
    setMessage("");
  };

  return (
    <Card className="w-auto h-fit p-3 shadow-none flex flex-col gap-2">
      <div className="text-sm font-medium mb-1">Besoin d'aide ?</div>
      <div className="text-xs text-muted-foreground mb-2">
        Contactez-nous si besoin d'aide.
      </div>
      <SidebarInput
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Votre message..."
        className="text-sm h-8"
        maxLength={180}
        autoFocus={false}
      />
      <Button
        className="bg-[#10B981] hover:bg-[#05895d] text-white px-2 h-8 min-h-0 text-xs flex items-center justify-center gap-1 w-full"
        type="button"
        size="sm"
        onClick={handleSend}
        disabled={!message.trim()}
      >
        Envoyer <Send size={10} />
      </Button>
    </Card>
  );
}
