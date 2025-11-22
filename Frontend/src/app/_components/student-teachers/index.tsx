import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { SeeProfileCard } from "../see-profile-card";
import type { Teacher } from "@/types/teacher";
import { teacherService } from "../admin-teachers/update-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { UserMinus2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TeachersListOnStudentBoard() {
  const [search, setSearch] = useState<string>("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    teacherService.getAll().then((teachers) => {
      setLoading(false);
      setTeachers(teachers);
    });
  }, []);

  return (
    <div className="md:p-6 p-4 space-y-6">
      <div className="flex md:items-center justify-between md:gap-0 gap-2 flex-col md:flex-row">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-(--blue)">Professeurs</h2>
          <p className="text-sm text-muted-foreground">
            Rencontrez vos enseignants pour chaque matiere.
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un enseignant..."
            className="md:w-92 w-full"
          />
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4"
      >
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full col-span-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : teachers.length > 1 ?
          teachers.map((teacher) => (
            <Card
              key={teacher.userId}
              className="hover:shadow-lg transition md:max-w-sm w-full"
            >
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar>
                    {teacher.avatar && <AvatarImage src={teacher.avatar} alt={teacher.firstName} />}
                    <AvatarFallback>{teacher.firstName[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">
                      {teacher.firstName} {teacher.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-1 whitespace-break-spaces">
                      {teacher.bio}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {teacher.courses?.length ?? 0} cours
                  </div>
                  <div className="flex md:flex-col items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Voir profil
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <SeeProfileCard user={teacher} />
                      </DialogContent>
                    </Dialog>
                    <Button
                      size="sm"
                      className="bg-(--blue) hover:bg-blue-900 text-white"
                    >
                      Contacter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <UserMinus2 className="w-12 h-12 mb-2 text-gray-400" />
              <p>Aucun professeur trouvé.</p>
            </div>
          )}
      </div>
    </div>
  );
}
