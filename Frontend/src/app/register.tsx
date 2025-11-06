import { PencilIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { RegistrationForm } from "@/components/registration-form";

export default function RegistrationPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="flex flex-col justify-center items-center py-10 px-4">
        <Card className="w-full max-w-xl shadow-lg border-0 rounded-xl">
          <CardHeader className="rounded-t-xl">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <PencilIcon color="green" /> Rejoignez-nous
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Inscrivez-vous dès maintenant pour une aventure pleine chez Omega
              School
            </CardDescription>
          </CardHeader>
          <RegistrationForm />
        </Card>
      </div>
    </div>
  );
}
