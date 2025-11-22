import { useTransition } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordTips } from "@/components/password-tips";
import { toast } from "sonner";
import { passwordSchema } from "@/schemas/user.schema";
import { Spinner } from "@/components/ui/spinner";

export function PasswordChangeTab() {
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof passwordSchema>) => {
    startTransition(async () => {
      await new Promise(res => setTimeout(res, 2000));
      const response = await fetch("/api/password/change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        toast.error("Une erreur est survenue");
        return;
      }

      toast.success("Mot de passe mis à jour !");
      form.reset();
    });
  };

  return (
    <CardContent className="pt-6 flex items-start justify-center gap-12 md:mb-12 sm:mb-6">
      <PasswordTips />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-md w-full"
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe actuel</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nouveau mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmer votre mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-(--yellow) hover:bg-yellow-500"
          >
            {pending ? <><Spinner /> Mise à jour en cours...</> : "Mettre à jour"}
          </Button>
        </form>
      </Form>
    </CardContent>
  );
}
