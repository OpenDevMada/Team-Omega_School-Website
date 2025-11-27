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

export function StudentsHeader() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0 text-(--blue)">
          Liste des étudiants
        </h1>
        <p className="text-sm text-muted-foreground">Gérez les élèves inscrits</p>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button className="bg-(--yellow) hover:bg-yellow-500 text-white shadow-sm">
            <UserPlus2 className="w-4 h-4" /> Ajouter un élève
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-between items-start w-full">
              <div>
                <AlertDialogTitle>Créer un nouvel élève</AlertDialogTitle>
                <AlertDialogDescription>
                  Renseignez les informations de l'élève en question.
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
          <RegistrationForm isStudent={true} setOpen={setOpen} />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}