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

import type { Student } from "@/types/student"
import type { Teacher } from "@/types/teacher"
import { useState, useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

type Props = {
  users: (Teacher | Student)[]
  label: string
}

export function Combobox({ users, label }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")

  const userRole = useMemo(() => {
    const role = users[0]?.role;
    return role === "STUDENT" ? "etudiant" : role === "TEACHER" ? "enseignant" : "admin"
  }, [users])

  const selectedUser = useMemo(
    () => users.find((user) => user.firstName === value),
    [value, users]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : `Selectionner un ${label}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Recherchez un ${label.toLowerCase()}`} className="h-9" />
          <CommandList>
            <CommandEmpty>Pas de {label} trouve.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.userId}
                  value={user.firstName}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Avatar>
                      {user.avatar && <AvatarImage src={user.avatar} alt={user.firstName} />}
                      <AvatarFallback>{user.firstName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {user.firstName} {user.lastName}
                  </div>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === user.firstName ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}