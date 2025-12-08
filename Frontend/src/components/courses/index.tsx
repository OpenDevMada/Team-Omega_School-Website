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
import { useAuthUser } from "@/services/auth";
import type { Role } from "@/types/user";
import type { Teacher } from "@/types/teacher";
import type { Student } from "@/types/student";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";

export function MainCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const filtered = courses.length > 0 ? courses.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  ) : [];
  const { user } = useAuthUser();

  const fetchCourses = async (makeLoading: boolean) => {
    if (!user) return;
    if (makeLoading) {
      setLoading(true);
    }
    try {
      switch (user.role) {
        case "ADMIN":
          setCourses(await courseService.getAll());
          break;
        case "TEACHER":
          setCourses(await courseService.getByTeacherMatricule((user as Teacher).matriculeNumber));
          break;
        case "STUDENT":
          setCourses(await courseService.getByStudentRegistrationNumber((user as Student).registrationNumber));
          break;
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (makeLoading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCourses(true);
  }, [user]);

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
    await courseService.delete(title);
    toast.success(`Le cours ${title} a été supprimé avec succes`);
    setTimeout(async () => {
      await fetchCourses(false);
    }, 500);
  };

  return (
    <div className="minw-full px-6 py-4 flex flex-col gap-6">
      <CoursesHeader query={query} setQuery={setQuery} onCourseCreated={() => fetchCourses(false)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center w-full md:grid-cols-3 gap-4">
        {!loading && user && filtered.length > 0 ? (
          filtered.map((course, idx) => (
            <CourseCard
              role={user.role as Role}
              key={course.title || idx}
              {...course}
              onEdit={handleUpdate}
              onDelete={handleDelete}
              withLabel={false}
            />
          ))
        ) : !loading && query ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <BookX className="w-12 h-12 mb-2 text-gray-400" />
            <p>Aucun cours trouvé pour votre recherche.</p>
          </div>
        ) : !loading && !query && filtered.length === 0 ? (
          <div className="col-span-full bg-card rounded">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant={"icon"}>
                  <BookX />
                </EmptyMedia>
                <EmptyContent>
                  <EmptyTitle>0 cours</EmptyTitle>
                  <EmptyDescription>
                    {user?.role === "STUDENT" ? "Vous êtes inscrit à aucun cours pour le moment" : user?.role === "TEACHER" ? "Vous êtes pris en charge d'aucun cours actuellement": ""}
                  </EmptyDescription>
                </EmptyContent>
              </EmptyHeader>
            </Empty>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full col-span-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 w-full rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
