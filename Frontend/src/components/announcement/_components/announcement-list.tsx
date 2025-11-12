import { Spinner } from "@/components/ui/spinner";
import { MegaphoneOff, Plus } from "lucide-react";
import type { Announcement } from "@/types/announcement";
import { AnnouncementCard } from "./app-announcement-card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button";

interface Props {
  announcements: Announcement[];
  loading: boolean;
  onEdit: (announcement: Announcement) => void;
}

export function AnnouncementList({ announcements, loading, onEdit }: Props) {
  if (loading)
    return (
      <div className="col-span-full flex flex-col gap-4 justify-center items-center h-48">
        <Spinner />
        Chargement des annonces...
      </div>
    );

  if (announcements.length === 0)
    return (
      <div className="col-span-full flex flex-col text-xl text-muted-foreground items-center justify-center h-72 text-center rounded-md p-4 gap-4">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant={"icon"}>
              <MegaphoneOff className="w-14 h-14 text-red-400" />
            </EmptyMedia>
            <EmptyTitle>0 annonces</EmptyTitle>
            <EmptyDescription>Pas d'annonce créée pour le moment.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button className="bg-(--yellow) hover:bg-yellow-500 text-white flex items-center gap-2">
              <Plus />
              Créer une nouvelle
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {announcements.map((a) => (
        <AnnouncementCard key={a.id} announcement={a} onEdit={onEdit} />
      ))}
    </div>
  );
}
