import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const shown = useRef(false);
  const params = new URLSearchParams(location.search);
  const error = params.get("err");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((res) => setTimeout(res, 2000)); // for UX, improve loader
    try {
      console.log(`Data: \nEmail: ${email}\nPassword: ${password}`)
      toast.success("Authentified dude XD");
    } catch (error: any) {
      alert(error?.message || "Unexpected error occured !");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error && !shown.current && error === "brut-force") {
      shown.current = true;
      toast.error("Ressource privée, connectez-vous");
    }
  }, [params]);

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Connecte toi a ton compte</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Entrer vos identifiants afin de vous connecter.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="nom@example.com"
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
            <Link
              to="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Mot de passe oublie?
            </Link>
          </div>
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </Field>
        <Field>
          <Button type="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? <>
              <Spinner /> Connection...
            </> : "Se connecter"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}