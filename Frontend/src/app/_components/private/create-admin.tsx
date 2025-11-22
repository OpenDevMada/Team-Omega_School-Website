import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { adminSchema, type AdminForm } from "@/schemas/admin.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Stepper,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperDescription,
  StepperSeparator,
  StepperContent,
  StepperTitle,
  StepperNext,
  StepperPrev,
} from "@/components/ui/stepper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useTransition } from "react";
import { BirthDateField } from "@/components/forms/birth-date-field";
import { steps } from "../steps";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { adminService } from "@/services/admin";

export function CreateAdmin() {
  const [step, setStep] = useState<string>("personal");
  const [pending, startTransition] = useTransition();

  const form = useForm<AdminForm>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: undefined,
      sex: "FEMININ",
      email: "",
      address: "",
      phoneNumber: "",
      password: "",
      role: "ADMIN",
    },
  });

  const stepIndex = steps.findIndex((s) => s.value === step);

  const onValidate = async (_value: string, direction: "next" | "prev") => {
    if (direction === "prev") return true;
    const stepData = steps.find((s) => s.value === step);
    if (!stepData) return true;
    const isValid = await form.trigger(stepData.fields);
    if (!isValid)
      toast.error("Complète les champs obligatoires avant de continuer");
    return isValid;
  };

  const onSubmit = (data: AdminForm) => {
    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 3000));
      const created = await adminService.create(data);
      if (created) {
        console.log(data);
        toast.success("Admin créé !");
      } else {
        toast.error("Une erreur est survenue.");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Stepper value={step} onValueChange={setStep} onValidate={onValidate}>
          <StepperList>
            {steps.map((s) => (
              <StepperItem key={s.value} value={s.value}>
                <StepperTrigger>
                  <StepperIndicator />
                  <div className="flex flex-col">
                    <StepperTitle>{s.title}</StepperTitle>
                    <StepperDescription>{s.description}</StepperDescription>
                  </div>
                </StepperTrigger>
                <StepperSeparator className="mx-4" />
              </StepperItem>
            ))}
          </StepperList>

          <StepperContent value="personal">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Tokiniaina" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Nomenjanahary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <BirthDateField />

              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sexe</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MASCULIN">Masculin</SelectItem>
                          <SelectItem value="FEMININ">Féminin</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </StepperContent>

          {/* Contact setup */}
          <StepperContent value="contact">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        placeholder="tokiniaina@gmail.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        {...field}
                        placeholder="034 45 789 24"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Adresse</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Ambohibao, Tananarivo"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </StepperContent>

          {/* Security setup */}
          <StepperContent value="security">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </StepperContent>

          <div className="mt-6 flex justify-between items-center">
            <StepperPrev asChild>
              <Button variant="outline">
                {" "}
                <ArrowLeft size={16} /> Précédent
              </Button>
            </StepperPrev>

            <p className="text-sm text-muted-foreground">
              Étape {stepIndex + 1} / {steps.length}
            </p>

            {stepIndex === steps.length - 1 ? (
              <Button type="submit" disabled={pending}>
                {pending ? (
                  <>
                    <Spinner /> Création du compte...
                  </>
                ) : (
                  "Finir la création du compte"
                )}
              </Button>
            ) : (
              <StepperNext asChild>
                <Button className="bg-(--blue) hover:bg-blue-900 hover:cursor-pointer text-white">
                  Suivant <ArrowRight size={16} />
                </Button>
              </StepperNext>
            )}
          </div>
        </Stepper>
      </form>
    </Form>
  );
}
