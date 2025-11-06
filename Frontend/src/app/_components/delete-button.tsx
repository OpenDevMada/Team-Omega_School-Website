import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { Student } from "@/types/student";
import type { Teacher } from "@/types/teacher";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export const DeleteUserButton = ({ user, withLabel = false }: { user: Teacher | Student, withLabel: boolean }) => {
  const [pending, startTransition] = useTransition();
  const handleDelete = () => {
    startTransition(async () => {
      await new Promise(res => setTimeout(res, 1500));
      toast.success(`${user.firstName} supprime avec success`);
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          title={`Supprimer ${user.firstName}`}
          variant={withLabel ? "destructive" : "ghost"}
          size={withLabel ? "default" : "icon-sm"}
          className="flex items-center gap-2"
        >
          {withLabel && "Supprimer"}
          <Trash2 color={withLabel ? "white" : "red"} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer {`${user.firstName} ${user.lastName}`}</AlertDialogTitle>
          <AlertDialogDescription>Etes-vous sure ? Cette action est irreversible.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center gap-4">
          <Button variant={"destructive"} size={"default"} disabled={pending} onClick={handleDelete}>
            {pending ? <Spinner /> : "Continer"}
          </Button>
          <AlertDialogCancel asChild>
            <Button variant={"outline"} size={"default"}>Annuler</Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}