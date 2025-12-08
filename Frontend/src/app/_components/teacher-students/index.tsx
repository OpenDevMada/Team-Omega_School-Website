import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/lib/api";
import { useAuthUser } from "@/services/auth";
import type { Student } from "@/types/student";
import type { Teacher } from "@/types/teacher";
import { ENDPOINTS } from "@/utils/constants";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function StudentsListOnTeacherBoard() {
  const [q, setQ] = useState<string>("");
  const { user } = useAuthUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [students, setStudents] = useState<Student[]>([]);
  const filtered = q ? students.filter((s) => `${s.firstName} ${s.lastName ?? ""}`.toLowerCase().includes(q.toLowerCase()) || s.email.toLowerCase().includes(q.toLowerCase())) : students;

  const fetchStudents = async () => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 2000));
      const res = await api.get(ENDPOINTS.RELATIONS.STUDENTS_TEACHER((user as Teacher).matriculeNumber));
      setStudents(res.data as Student[]);
    } catch (error) {
      console.log("Erreur", error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Mes étudiants</h2>
          <p className="text-sm text-muted-foreground">Liste des étudiants de vos groupes</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" placeholder="Rechercher un étudiant..." />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tableau des étudiants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-5 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16" />
                    </TableCell>
                  </TableRow>
                )) : filtered.length > 0 ? filtered.map((s) => (
                  <TableRow key={s.userId}>
                    <TableCell className="flex items-center gap-3">
                      <Avatar>
                        {s.avatar && <AvatarImage src={s.avatar} alt={s.firstName} />}
                        <AvatarFallback>{s.firstName[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{s.firstName} {s.lastName}</div>
                        <div className="text-sm text-muted-foreground">{s.registrationNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>{s.level.name} — {s.group.name}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="default">Voir</Button>
                        <Button variant="outline" size="default">Message</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6">
                      Aucun élève trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}