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

export function SidebarOptInForm() {
  return (
    <Card className="gap-2 py-4 shadow-none flex flex-col">
      <CardHeader className="px-4">
        <CardTitle>Besoin d'aide ?</CardTitle>
        <CardDescription>
          Vous pouvez nous contacter si besoin, par email ou par telephone
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <form>
          <div className="grid gap-2.5">
            <SidebarInput type="email" autoFocus={false} placeholder="Message" />
            <Button
              className="bg-[#10B981] hover:bg-[#05895d] text-white w-full shadow-none"
              size="sm"
            >
              Envoyer <Send />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}