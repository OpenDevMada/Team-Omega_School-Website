import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Megaphone, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { useAnnouncements } from "@/hooks/use-announcement";
import type { Announcement } from "@/types/announcement";

import { AnnouncementList } from "./_components/announcement-list";
import { AnnouncementDialogForm } from "./_components/form-dialog";

export function MainAnnouncement() {
  const { announcements, loading } = useAnnouncements();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState<Announcement | null>(null);

  const openDialogForEdit = (a: Announcement) => {
    setEditing(a);
    setDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-600">Annonces</h2>
          <p className="text-sm text-muted-foreground">
            Informations importantes et communiqués
          </p>
        </div>

        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700">
              <Megaphone className="w-4 h-4" />{" "}
              {editing ? "Modifier annonce" : "Nouvelle annonce"}
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl tracking-tight">
                    {editing
                      ? "Modifier l'annonce"
                      : "Créer une nouvelle annonce"}
                  </h2>
                  <AlertDialogCancel asChild>
                    <Button variant={"ghost"} size={"icon"}>
                      <X />
                    </Button>
                  </AlertDialogCancel>
                </div>
              </AlertDialogTitle>
              <Separator className="my-2" />
            </AlertDialogHeader>

            <AnnouncementDialogForm editing={editing} setOpen={setDialogOpen} />
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <AnnouncementList
        announcements={announcements}
        loading={loading}
        onEdit={openDialogForEdit}
      />
    </div>
  );
}
