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
import { Textarea } from "@/components/ui/textarea";
import type z from "zod";
import type { teacherSchemaDto } from "@/schemas/teacher.schema";

interface TeacherFormFieldsProps {
  form: UseFormReturn<TeacherFormType | UserFormType | z.infer<typeof teacherSchemaDto>>;
}

export function TeacherFormFields({ form }: TeacherFormFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="matriculeNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro de matricule</FormLabel>
            <FormControl>
              <Input placeholder="TCH 2025" type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Bio (optionnel)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Brève description de l'enseignant..."
                className="resize-none"
                rows={3}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
