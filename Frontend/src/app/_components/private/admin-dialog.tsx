import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { adminService } from "@/services/admin";
import { LucideTriangleAlert } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export function DeleteAdmin({ id }: Readonly<{ id: string }>) {
  const [pending, startTransition] = useTransition();
  const handleDelete = () => {
    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 3000));
      await adminService.delete(id);
      toast.info("Compte administrateur supprimé");
      setTimeout(() => {
        window.location.href = "/login?msg=admin+account+deleted";
      }, 2000);
    });
  };

  return (
    <div className="p-6 border rounded-xl">
      <h2 className="text-xl flex items-center gap-2 font-semibold tracking-tight mb-4">
        <LucideTriangleAlert className="text-red-500" /> Supprimer mon compte admin
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Cette action est irréversible. Votre compte sera supprimé
        définitivement.
      </p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"} className="cursor-pointer">
            Supprimer mon compte
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action supprimera définitivement votre compte admin. Vous ne
              pourrez plus annuler.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>Annuler</AlertDialogCancel>
            <Button
              variant={"destructive"}
              disabled={pending}
              onClick={handleDelete}
              className="text-white"
            >
              {pending ? (
                <>
                  <Spinner /> Suppression...
                </>
              ) : (
                "Supprimer définitivement"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
