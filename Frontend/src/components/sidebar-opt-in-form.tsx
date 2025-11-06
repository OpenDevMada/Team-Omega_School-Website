import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarInput } from "@/components/ui/sidebar";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center text-3xl font-bold text-gray-700">
      <span className="animate-[blink_1.4s_infinite_0s] opacity-20">.</span>
      <span className="animate-[blink_1.4s_infinite_0.2s] opacity-20">.</span>
      <span className="animate-[blink_1.4s_infinite_0.4s] opacity-20">.</span>

      <style>{`
        @keyframes blink {
          0%, 80%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export function SidebarOptInForm() {
  const [message, setMessage] = useState<string>("");
  return (
    <Card className="gap-2 py-4 shadow-none flex flex-col">
      <CardHeader className="px-4">
        <CardTitle>Besoin d'aide ?</CardTitle>
        <CardDescription>
          Vous pouvez nous contacter si besoin, par email ou par telephone
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <div className="grid gap-2.5">
          <SidebarInput
            type="text"
            autoFocus={false}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
          />
          <Button
            className="bg-[#10B981] flex items-center hover:bg-[#05895d] text-white w-full shadow-none"
            type="submit"
            size="sm"
            onClick={() => {
              if (message.trim() !== "") {
                toast.promise(new Promise((res, _) => {
                  setTimeout(() => {
                    res("Message envoye !");
                  }, 2000);
                }), {
                  loading: toast.loading("Envoi du message"),
                  success: "Message envoye #2",
                  error: "Erreur lors de l'envoie"
                });
              }
            }}
          >
            Envoyer <Send />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
