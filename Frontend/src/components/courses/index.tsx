import { useEffect, useState } from "react";
import { CourseCard } from "./app-course-card";
import { CoursesHeader } from "./courses-header";
import { BookX } from "lucide-react";
import type { Course } from "@/types/course";
import { courseService } from "@/services/courses";
import * as z from "zod";
import type { courseSchema } from "@/schemas/course.schema";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { getAuthentifiedUser } from "@/services/auth";

export function MainCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );
  const user = getAuthentifiedUser();
  useEffect(() => {
    courseService.getAll().then((courses) => {
      setCourses(courses);
      setLoading(false);
    });
  }, []);

  const handleUpdate = async (data: z.infer<typeof courseSchema>) => {
    const updated = await courseService.update(data.title, data);
    if (updated) {
      courseService.getAll().then(setCourses);
      toast.success(`Cours mis a jour avec succes`);
    } else {
      toast.error(`Une erreur inattendue est survenue. Réessayer plus tard.`);
    }
  };

  const handleDelete = async (title: string) => {
    await courseService.delete(`/${title}`);
    toast.success(`Le cours ${title} a été supprimé avec succes`);
    courses.filter(course => course.title.trim() == title.trim());
  };

  return (
    <div className="minw-full px-6 py-4 flex flex-col gap-6">
      <CoursesHeader query={query} setQuery={setQuery} />
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center w-full md:grid-cols-3 gap-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full col-span-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 w-full rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          filtered.map((course) => (
            <CourseCard
              role={user?.role ?? "STUDENT"}
              key={course.title}
              {...course}
              onEdit={handleUpdate}
              onDelete={handleDelete}
              withLabel={false}

            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <BookX className="w-12 h-12 mb-2 text-gray-400" />
            <p>Aucun cours trouvé pour votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
}
