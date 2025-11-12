import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteAnnouncement } from "@/services/announcement";
import { toast } from "sonner";
import { useAnnouncements } from "@/hooks/use-announcement";
import type { Announcement } from "@/types/announcement";

interface Props {
  announcement: Announcement;
}

export function DeleteAnnouncementDialog({ announcement }: Props) {
  const [pending, startTransition] = useTransition();
  const { refetch } = useAnnouncements();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteAnnouncement(announcement.id);
        toast.success("Annonce supprimée avec succès");
        refetch();
      } catch {
        toast.error("Erreur lors de la suppression");
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon-sm">
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Supprimer « {announcement.title} » ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={pending}
          >
            {pending ? <Spinner className="w-4 h-4" /> : "Continuer"}
          </Button>
          <AlertDialogCancel asChild>
            <Button variant="outline">Annuler</Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
