import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
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
import type { Role } from "@/types/user";
import { setAccessToken } from "@/lib/api";

interface ApiLoginResponse {
  token: string
  role: Role
  email: string
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const location = useLocation();
  const shown = useRef(false);
  const params = new URLSearchParams(location.search);
  const error = params.get("err");
  const [pending, startTransition] = useTransition();
  const navigate = useNavigate();

  const signInSchema = z.object({
    email: z.email("Email invalide").nonempty("Email requis"),
    password: z.string().nonempty("Mot de passe requis"),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 2000));
      try {
        const response: ApiLoginResponse = await authService.signIn(values) as { token: string, email: string, role: Role };

        setAccessToken(response.token);
        // Add to header or localStorage user's role

        toast.success("Connection réussie");
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } catch (error) {
        console.log(`Login error: ${error instanceof Error && error.message}`);
        toast.error("Email ou mot de passe invalide");
      }
    });
  };

  useEffect(() => {
    if (error && !shown.current && error === "brut-force") {
      shown.current = true;
      toast.error("Ressource privée, connectez-vous");
    }
    authService.getUser().then(r => console.log(r)).catch(e => console.error(e));
  }, [params]);

  return (
    <Form {...form}>
      <div className="flex flex-col gap-0.5">
        <h2 className="scroll-m-20 md:text-3xl text-2xl font-semibold tracking-tight first:mt-0">
          Connecte toi à ton compte
        </h2>
        <p className="text-muted-foreground text-sm">Entrez vous identifiants pour pouvoir continuer</p>
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
                <Input type="email" placeholder="benja@gmail.com" {...field} />
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
                <Link to={ROUTES.WEBSITE.AUTH.FORGET_PASSWORD} className="text-sm text-muted-foreground">Mot de passe oublie ?</Link>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-(--blue) hover:bg-blue-900"
          disabled={pending}
        >
          {pending ? (
            <>
              <Spinner /> Connection...
            </>
          ) : (
            "Se connecter"
          )}
        </Button>
      </form>
    </Form>
  );
}
