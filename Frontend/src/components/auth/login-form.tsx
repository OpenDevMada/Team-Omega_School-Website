import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState, useTransition } from "react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "../ui/separator";
import { ROUTES } from "@/utils/constants";
import { Eye, EyeOff } from "lucide-react";
import { authService } from "@/services/auth";
import Cookie from "js-cookie";

const signInSchema = z.object({
  email: z.email("Email invalide").min(1, "Email requis"),
  password: z.string().min(1, "Mot de passe requis"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [pending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    startTransition(async () => {
      try {
        const response = await authService.signIn(values);

        localStorage.setItem("access-token-frontend", response.accessToken);

        toast.success("Connexion réussie");

        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      } catch (error) {
        console.error("Login error:", error);
      }
    });
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-0.5">
        <h2 className="scroll-m-20 md:text-3xl text-2xl font-semibold tracking-tight">
          Connecte-toi à ton compte
        </h2>
        <p className="text-muted-foreground text-sm">
          Entrez vos identifiants pour continuer
        </p>
      </div>
      <Separator className="my-4" />
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="benja@gmail.com"
                  disabled={pending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center w-full justify-between">
                <FormLabel>Mot de passe</FormLabel>
                <Link
                  to={ROUTES.WEBSITE.AUTH.FORGET_PASSWORD}
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    disabled={pending}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={pending}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={pending}>
          {pending ? (
            <>
              <Spinner className="mr-2" />
              Connexion...
            </>
          ) : (
            "Se connecter"
          )}
        </Button>
      </form>
    </Form>
  );
}
