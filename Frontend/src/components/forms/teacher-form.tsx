import type { UseFormReturn } from "react-hook-form";
import type { TeacherFormType, UserFormType } from "@/validation/user";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TeacherFormFields({
  form,
}: {
  form: UseFormReturn<TeacherFormType | UserFormType>;
}) {
  const titleCourses = [
    "Mathématiques",
    "Physique",
    "SVT",
    "EPS",
    "Malagasy",
    "Anglais",
    "Francais",
  ];
  return (
    <>
      <FormField
        control={form.control}
        name="courses"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cours attribué(s)</FormLabel>
            <FormControl>
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder={"Selectionner un cours"} />
                </SelectTrigger>
                <SelectContent
                >
                  {titleCourses.map((title, idx) => (
                    <SelectItem value={title} key={idx}>{title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="matriculeNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro de matricule</FormLabel>
            <FormControl>
              <Input placeholder="TCH 24879" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
