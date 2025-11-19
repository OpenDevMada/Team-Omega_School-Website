import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { BookX } from "lucide-react";
import { useAnnouncements } from "@/hooks/use-announcement";
import { Spinner } from "@/components/ui/spinner";

export default function SiteAnnouncementsPage() {
  const { announcements, loading } = useAnnouncements();

  return (
    <div className="p-12 space-y-6">
      <div className="flex flex-start md:items-center md:gap-0 gap-3 justify-between flex-col md:flex-row">
        <div className="space-y-2">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 text-(--blue)">Liste des annonces</h2>
          <p className="text-sm text-muted-foreground">Informations importantes et communiqués au sein d'<strong>Omega school</strong></p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 items-center gap-4">
        {loading ? (
          <div className="col-span-full flex flex-col gap-4 justify-center text-muted-foreground items-center min-h-[40vh]">
            <Spinner className="size-8" />
            Chargement des annonces. Veillez patientez un moment...
          </div>
        ) : announcements.length > 0 ? announcements.map((announcement) => (
          <Card key={announcement.id} className="hover:shadow-lg transition max-w-lg">
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="text-lg font-semibold">{announcement.title}</div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Enseignant</div>
                  <div className="font-medium">{announcement.description}</div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="secondary" size="sm">Voir</Button>
                <Button size="sm">S'inscrire</Button>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="col-span-full flex flex-col bg-gray-50/40 text-xl text-muted-foreground items-center justify-center h-48 text-center rounded-md p-4 gap-4">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant={"icon"}>
                  <BookX className="w-14 h-14 text-green-400" />
                </EmptyMedia>
                <EmptyTitle>0 annonce</EmptyTitle>
                <EmptyDescription>Pas d'annonce pour le moment.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        )}
      </div>
    </div>
  );
}
