import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { mockCourses } from "./page";
import { Button } from "@/components/ui/button";

export default function CoursesPage() {
  const [query, setQuery] = useState("");
  const filtered = mockCourses.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()) || (c.code ?? "").toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="py-6 px-6 space-y-6">
      <div className="flex flex-start md:items-center md:gap-0 gap-3 justify-between flex-col md:flex-row">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-(--blue)">Cours disponibles</h2>
          <p className="text-sm text-muted-foreground">Parcourez les cours proposés cette année</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" placeholder="Rechercher un cours..." />
          </div>
          <Button variant="outline"><SlidersHorizontal className="w-4 h-4" /> Trier</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 items-center gap-4">
        {filtered.map((c) => (
          <Card key={c.id} className="hover:shadow-lg transition max-w-lg">
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-lg font-semibold">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.code} — {c.level}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Enseignant</div>
                  <div className="font-medium">{c.teacher}</div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="secondary" size="sm">Voir</Button>
                <Button size="sm">S'inscrire</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}