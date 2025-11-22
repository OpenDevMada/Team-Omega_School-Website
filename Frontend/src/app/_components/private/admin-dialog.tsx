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
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function DeleteAdmin({ id }: Readonly<{ id: string }>) {
  const [pending, startTransition] = useTransition();
  const navigate = useNavigate();
  const handleDelete = () => {
    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 4000));
      await adminService.delete(id);
      toast.info("Compte administrateur supprimé");
      navigate("/login?msg=admin+account+deleted");
    });
  };

  return (
    <div className="p-6 border rounded-xl">
      <h2 className="text-xl font-semibold tracking-tight mb-4">
        Supprimer mon compte admin
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Cette action est irréversible. Votre compte sera supprimé
        définitivement.
      </p>

      <AlertDialog>
        <AlertDialogTrigger className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
          Supprimer mon compte
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
