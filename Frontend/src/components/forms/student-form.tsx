import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import type { StudentFormType, UserFormType } from "@/validation/user";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { Group, Level } from "@/types/student";

interface StudentFormFieldsProps {
  form: UseFormReturn<StudentFormType | UserFormType>;
  groups: Group[];
  levels: Level[];
  isEditing: boolean;
  isOnMainRegistration?: boolean;
}

export function StudentFormFields({ form, groups, levels, isEditing, isOnMainRegistration }: StudentFormFieldsProps) {
  return (
    <>
      {/* Registration number */}
      <FormField
        control={form.control}
        name="registrationNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro d'inscription</FormLabel>
            <FormControl>
              <Input placeholder="STU20240001" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Level */}
      <FormField
        control={form.control}
        name="level"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Niveau</FormLabel>
            <FormControl>
              {/* @ts-ignore */}
              <Select onValueChange={field.onChange} value={isEditing ? field.value?.name : field.value || ""}>
                <SelectTrigger className={`${isOnMainRegistration ? "w-[260px]" : "w-[200px]"}`}>
                  <SelectValue placeholder="Sélectionner votre niveau" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.name} value={level.name}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Group */}
      <FormField
        control={form.control}
        name="group"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Classe</FormLabel>
            <FormControl>
              {/* @ts-ignore */}
              <Select onValueChange={field.onChange} value={isEditing ? field.value?.name : field.value || ""}>
                <SelectTrigger className={`${isOnMainRegistration ? "w-[260px]" : "w-[200px]"}`}>
                  <SelectValue placeholder="Sélectionner votre classe" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.name} value={group.name}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {isOnMainRegistration && (
        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Contact d'urgence</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="034 89 765 34" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
}

