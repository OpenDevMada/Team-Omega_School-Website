import { Button } from "@/components/ui/button";
import { UserPlus2, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RegistrationForm } from "@/components/auth/registration-form";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export function TeachersHeader({onCreated}: {onCreated: () => void}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0 text-(--blue)">
          Liste des professeurs
        </h1>
        <p className="text-muted-foreground text-sm">
          Gérez et explorez la liste des enseignants de <strong>Omega School</strong>.
        </p>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-white cursor-pointer shadow-sm">
            <UserPlus2 className="w-4 h-4 mr-2" /> Ajouter un nouveau
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-between items-start w-full">
              <div className="flex items-start flex-col">
                <AlertDialogTitle>Créer un nouvel élève</AlertDialogTitle>
                <AlertDialogDescription>
                  Renseignez les informations de l'élève.
                </AlertDialogDescription>
              </div>
              <AlertDialogCancel asChild>
                <Button variant="ghost" size="icon-sm">
                  <X />
                </Button>
              </AlertDialogCancel>
            </div>
          </AlertDialogHeader>
          <Separator />
          <RegistrationForm isStudent={false} setOpen={setOpen} onCreated={onCreated} />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}