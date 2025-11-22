import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import type { Announcement } from "@/types/announcement";
import { DeleteAnnouncementDialog } from "./delete-announcement-dialog";

interface Props {
  announcement: Announcement;
  onEdit: (announcement: Announcement) => void;
}

export function AnnouncementCard({ announcement, onEdit }: Props) {
  return (
    <Card className="max-w-lg flex flex-col h-full">
      <CardContent className="grow">
        <div className="flex flex-col justify-between items-start space-y-2">
          <div className="text-lg font-semibold">{announcement.title}</div>
          <div className="text-sm text-muted-foreground line-clamp-2 whitespace-pre-wrap">
            {announcement.description}
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto border-t border-gray-200 px-4">
        <div className="flex items-center justify-between w-full">
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNow(announcement.createdAt, {
              addSuffix: true,
              locale: fr,
            })}
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => onEdit(announcement)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <DeleteAnnouncementDialog announcement={announcement} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
