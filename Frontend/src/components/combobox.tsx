import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export type BaseUser = {
  id: string;
  label: string;
  number?: string;
  avatar?: string | null;
};

type Props = {
  items: BaseUser[];
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function Combobox({ items, placeholder, value, onChange }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const selected = items.find((i) => i.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selected ? selected.label : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>Aucun élément trouvé.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={(currentValue) => {
                    onChange?.(currentValue);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    {item.avatar ? (
                      <Avatar>
                        <AvatarImage src={item.avatar} />
                        <AvatarFallback>
                          {item.label[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ) : null}

                    <div className="flex flex-col">
                      <span>{item.label}</span>
                      {item.number && (
                        <span className="text-xs text-muted-foreground">
                          {item.number}
                        </span>
                      )}
                    </div>
                  </div>

                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}