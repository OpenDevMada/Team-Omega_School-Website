import { useState } from "react";
import { CourseCard } from "./app-course-card";
import { teachers } from "@/seeders/users";
import { CoursesHeader } from "./courses-header";
import { BookX, Search } from "lucide-react";
import { Input } from "../ui/input";

export function MainCourses() {
  const courses = [
    {
      id: 1,
      title: "Programmation Orientée Objet",
      teacher: teachers[0],
      createdAt: new Date("2025-09-01"),
      updatedAt: new Date("2025-10-12"),
    },
    {
      id: 2,
      title: "Base de Données Avancée",
      teacher: teachers[1],
      createdAt: new Date("2025-09-15"),
      updatedAt: new Date("2025-10-05"),
    },
  ];
  const [query, setQuery] = useState<string>("");
  const filtered = courses.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="minw-full px-6 py-4 flex flex-col gap-6">
      <CoursesHeader />
      <div className="relative w-full md:w-1/2">
        <Search className="absolute left-2 top-2.5 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Recherche par nom ou prenom"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center w-full lg:grid-cols-3 gap-4">
        {filtered.length > 0 ? filtered.map((course) => (
          <CourseCard key={course.id} {...course} />
        )) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <BookX className="w-12 h-12 mb-2 text-gray-400" />
            <p>Aucun cours trouvé pour votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  )
}
