import { AlertCircle, CheckCircle } from "lucide-react";

export const tips = [
  "Au moins 8 caractères",
  "Un caractère majuscule",
  "Un chiffre",
  "Un caractère spécial",
];

export function PasswordTips() {

  return (
    <div className="max-w-96 w-full dark:bg-muted/20 p-5 rounded-xl border flex flex-col gap-3">
      <h3 className="text-2xl tracking-tight font-semibold flex items-center gap-2">
        <AlertCircle size={20} color="red" />
        Conseils
      </h3>
      <p className="text-sm text-muted-foreground">
        Pour un mot de passe sécurisé, il est important de suivre les instructions suivantes.
      </p>

      {tips.map((tip, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <CheckCircle size={16} className="text-yellow-500" />
          {tip}
        </div>
      ))}
    </div>
  );
}
