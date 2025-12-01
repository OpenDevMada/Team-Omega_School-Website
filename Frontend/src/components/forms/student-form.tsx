import { FormMessage, FormControl } from "@/components/ui/form"
import type { UseFormReturn } from "react-hook-form"
import { FormLabel } from "@/components/ui/form"
import { FormItem } from "@/components/ui/form"
import { FormField } from "@/components/ui/form"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import type { Group, Level } from "@/types/student"
import type { StudentFormType, UserFormType } from "@/validation/user"

interface StudentFormFieldsProps {
  form: UseFormReturn<StudentFormType | UserFormType>
  groups: Group[]
  levels: Level[]
}

export function StudentFormFields({ form, groups, levels }: StudentFormFieldsProps) {
  return (
    <>
      {/* Level */}
      <FormField
        control={form.control}
        name="level"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Niveau {field.value}</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <SelectTrigger className="w-full max-w-full">
                  <SelectValue placeholder="Sélectionner votre niveau" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.id} value={level.name}>
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
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner votre classe" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.name}>
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

      {/* Emergency contact */}
      {/* {isOnMainRegistration && ( */}
        <FormField
          control={form.control}
          name="emergencyContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact d'urgence</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="034 89 765 34" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      {/* )} */}
    </>
  )
}
