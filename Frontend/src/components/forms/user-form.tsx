import type { UseFormReturn } from "react-hook-form";
import type { StudentFormType, TeacherFormType, UserFormType } from "@/validation/user";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BirthDateField } from "./birth-date-field";

interface UserFieldsProps {
  form: UseFormReturn<UserFormType | TeacherFormType | StudentFormType>;
}

export function UserFields({ form }: UserFieldsProps) {
  return (
    <>
      {/* First name */}
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prénom</FormLabel>
            <FormControl>
              <Input placeholder="Aina" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Last name */}
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
              <Input placeholder="Rasolo" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Email */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="exemple@ecole.edu" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Phone number */}
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro de téléphone</FormLabel>
            <FormControl>
              <Input type="tel" placeholder="034 12 345 67" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Address */}
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Lot T II 10 Ter Antaninandro"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Sex */}
      <FormField
        control={form.control}
        name="sex"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sexe</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className={`w-full`}>
                  <SelectValue placeholder="Sélectionne ton sexe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MASCULIN">Masculin</SelectItem>
                  <SelectItem value="FEMININ">Féminin</SelectItem>
                  <SelectItem value="PAS_SPECIFIE">Pas spécifié</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Birth Date */}
      <BirthDateField />
    </>
  );
}
