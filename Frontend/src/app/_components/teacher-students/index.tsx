import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { useState } from "react";

export default function StudentsListOnTeacherBoard() {
  const [q, setQ] = useState("");
  // const filtered = mockStudents.filter((s) => `${s.firstName} ${s.lastName ?? ""}`.toLowerCase().includes(q.toLowerCase()) || s.email.toLowerCase().includes(q.toLowerCase()));

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
                {/* {filtered.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={s.avatar} alt={s.firstName}/>
                        <AvatarFallback>{s.firstName[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{s.firstName} {s.lastName}</div>
                        <div className="text-sm text-muted-foreground">{s.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{s.level} — {s.group}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="default">Voir</Button>
                        <Button variant="outline" size="default">Message</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}