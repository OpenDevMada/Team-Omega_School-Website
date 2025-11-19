import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import * as React from "react";

export function BirthDateField() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="birthDate"
      render={({ field }) => {
        const [open, setOpen] = React.useState(false);

        const initialDate =
          field.value && !isNaN(new Date(field.value).getTime())
            ? new Date(field.value)
            : undefined;

        const [month, setMonth] = React.useState<Date | undefined>(initialDate);

        const selectedDate = initialDate;

        return (
          <FormItem className="flex flex-col">
            <FormLabel>Date de naissance</FormLabel>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                      "pr-10"
                    )}
                  >
                    {selectedDate
                      ? format(selectedDate, "PPP", { locale: fr })
                      : "Sélectionner une date"}

                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  month={month}
                  onMonthChange={setMonth}
                  onSelect={(date) => {
                    field.onChange(date);
                    setMonth(date || undefined);
                    setOpen(false);
                  }}
                  captionLayout="dropdown"
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                />
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
