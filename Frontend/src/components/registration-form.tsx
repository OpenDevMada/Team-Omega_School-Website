import { CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { Spinner } from "./ui/spinner";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { studentPostDataSchema } from "@/schemas/student.schema";

export function RegistrationForm({ isStudent, props }: { isStudent: boolean, props?: object }) {
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof studentPostDataSchema>>({
    resolver: zodResolver(studentPostDataSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      email: "",
      phoneNumber: "",
      gender: "Pas specifie",
      birthDate: undefined,
      role: "STUDENT"
    },
  });

  // @ts-ignore
  const onSubmit = (values: z.infer<typeof StudentSchema>) => {
    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 3000));
      toast.success("L'élève a bien été enregistré");
    });
  };

  return (
    <CardContent className="p-2 flex flex-wrap gap-4" {...props}>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* For names */}
          <div className="flex items-center flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prenom</FormLabel>
                  <FormControl>
                    <Input placeholder="Aina Koto" {...field} />
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
                    <Input placeholder="RANDRIANARIVONY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Grade and phone number */}
          <div className="flex items-center gap-4">
            {isStudent && <FormField
              control={form.control}
              name="group.groupName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Classe</FormLabel>
                  <FormControl>
                    <div className="w-full">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Classe" />
                        </SelectTrigger>
                        {/* This should fetch to /api/grades */}
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="6">6</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />}

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+261 34 12 345 67"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Birth date */}
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de naissance</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={field}
                        className={`data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal ${field.value && "text-muted-foreground"
                          }`}
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, "PPP", { locale: fr })
                        ) : (
                          <span>Choisi ta date de naissance</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        locale={fr}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Long address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input placeholder="Lot T III Antaninandro, Antananarivo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button */}
          <Button
            type="submit"
            // this cursor doesn't work as well - to fix later
            className={`cursor-pointer w-full bg-(--blue) hover:bg-[#0d2c93f] ${cn("disabled:cursor-not-allowed")}`}
            disabled={pending}
          >
            {pending ? (
              <>
                <Spinner /> Inscription
              </>
            ) : (
              "Inscrire l'élève"
            )}
          </Button>
        </form>
      </FormProvider>
    </CardContent>
  );
}
