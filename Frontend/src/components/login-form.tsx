import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useEffect,
  useRef,
  useTransition,
} from "react";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "./ui/separator";

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
        console.log(`Data: \nEmail: ${values.email}\nPassword: ${values.password}`);
        toast.success("Connection réussie");
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } catch (error: any) {
        alert(error?.message || "Unexpected error occured !");
      }
    });
  };

  useEffect(() => {
    if (error && !shown.current && error === "brut-force") {
      shown.current = true;
      toast.error("Ressource privée, connectez-vous");
    }
  }, [params]);

  return (
    <Form {...form}>
      <div className="flex flex-col gap-0.5">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          Connecte toi a ton compte
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
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="......." {...field} />
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
