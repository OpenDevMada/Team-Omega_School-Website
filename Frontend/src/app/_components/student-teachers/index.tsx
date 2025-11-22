import { Avatar, mockTeachers } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { teachers } from "@/seeders/users";
import { useState } from "react";

export function TeachersListOnStudentBoard() {
  const [search, setSearch] = useState<string>("");

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

      <div className="grid md:grid-cols-3 gap-4 px-4">
        {mockTeachers.map((t) => (
          <Card key={t.id} className="hover:shadow-lg transition md:max-w-sm w-full">
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar name={t.firstName} src={t.avatar ?? null} />
                <div>
                  <div className="font-semibold">
                    {t.firstName} {t.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground line-clamp-1 whitespace-break-spaces">{t.bio}</div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {t.courses?.length ?? 0} cours
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Voir profil
                  </Button>
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
        ))}
      </div>
    </div>
  );
}
