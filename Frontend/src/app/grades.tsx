import { useEffect, useState } from "react";
import type { Grade, GradeResponseDto } from "@/types/grade";
import { Spinner } from "@/components/ui/spinner";
import { gradeService } from "@/services/grade";
import { courseService } from "@/services/courses";
import { GradeFormDialog } from "@/components/grades/form-dialog";
import { GradesTable } from "@/components/grades/data-table";
import { gradeColumns } from "@/components/grades/columns";
import { StudentGradesGrid } from "@/components/grades/data-grid";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useAuthUser } from "@/services/auth";
import { toast } from "sonner";
import type { Student } from "@/types/student";
import type { Role } from "@/types/user";
import { BookX } from "lucide-react";
import type { Teacher } from "@/types/teacher";

export default function GradesPage() {
  const { user } = useAuthUser();
  const role = user?.role;
  const [grades, setGrades] = useState<GradeResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [courses, setCourses] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  const loadCourses = async () => {
    try {
      if (role === "ADMIN") {
        const all = await courseService.getAll();
        const titles = all.map((c) => c.title);
        setCourses(titles);
        if (titles.length > 0) {
          setSelectedCourse(titles[0]);
        }
      } else if (role === "TEACHER") {
        const teacher = user as Teacher;
        const myCourses = await courseService.getByTeacherMatricule(teacher.matriculeNumber);
        const titles = myCourses.map((c) => c.title);
        setCourses(titles);
        if (titles.length > 0) {
          setSelectedCourse(titles[0]);
        }
      }
    } catch (error: any) {
      console.error("Error loading courses:", error);
      toast.error(error.response?.data?.details ?? "Erreur lors du chargement des cours");
    }
  };

  const fetchGrades = async () => {
    setLoading(true);
    try {
      if (role === "STUDENT") {
        const reg = (user as Student).registrationNumber;
        const data = await gradeService.getByStudent(reg);
        setGrades(data);
      } else {
        if (!selectedCourse) {
          setGrades([]);
          return;
        }
        const data = await gradeService.getByCourse(selectedCourse);
        setGrades(data);
      }
    } catch (error: any) {
      console.error("Error fetching grades:", error);
      const errorMessage = error?.response?.data?.error || "Erreur lors du chargement des notes";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role !== "STUDENT") {
      loadCourses();
    }
  }, [role]);

  useEffect(() => {
    fetchGrades();
  }, [role, selectedCourse]);

  const handleDelete = async (grade: Grade) => {
    setDeleteLoading(true);
    try {
      await gradeService.delete(grade.studentRegistration, grade.courseTitle);
      toast.success("Note supprimée avec succès");

      setGrades((prev) =>
        prev.filter(
          (g) =>
            g.studentRegistration !== grade.studentRegistration ||
            g.courseTitle !== grade.courseTitle
        )
      );
    } catch (error: any) {
      console.error("Error deleting grade:", error);
      const errorMessage = error?.response?.data?.error || "Erreur lors de la suppression";
      toast.error(errorMessage);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleUpdated = (updated: GradeResponseDto) => {
    setGrades((prev) =>
      prev.map((g) =>
        g.studentRegistration === updated.studentRegistration &&
          g.courseTitle === updated.courseTitle
          ? updated
          : g
      )
    );
    setEditingGrade(null);
  };

  return (
    <div className="md:p-6 p-3">
      <div className="flex md:flex-row flex-col md:gap-0 gap-3 items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-blue-600">
            {role === "STUDENT" ? "Mes notes" : "Gestion des notes"}
          </h1>
          {role !== "STUDENT" && (
            <p className="text-sm text-muted-foreground mt-1">
              Attribuez et gérez les notes des étudiants
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {(role === "ADMIN" || role === "TEACHER") && (
            <div title="Selectionner les notes du cours à voir">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Choisir un cours" />
                </SelectTrigger>
                <SelectContent>
                  {courses.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground">
                      Aucun cours disponible
                    </div>
                  ) : (
                    courses.map((title) => (
                      <SelectItem key={title} value={title}>
                        {title}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {(role === "ADMIN" || role === "TEACHER") && (
            <GradeFormDialog
              mode="create"
              open={createOpen}
              setOpen={setCreateOpen}
              onSaved={() => fetchGrades()}
            />
          )}
        </div>
      </div>

      {editingGrade && (
        <GradeFormDialog
          mode="update"
          open={!!editingGrade}
          setOpen={(open) => {
            if (!open) setEditingGrade(null);
          }}
          defaultValues={{
            studentRegistration: editingGrade.studentRegistration,
            courseTitle: editingGrade.courseTitle,
            value: editingGrade.value,
            comment: editingGrade.comment ?? "",
          }}
          onSaved={handleUpdated}
        />
      )}

      <div className="my-8">
        {loading ? (
          <div className="flex flex-col items-center text-muted-foreground h-80 justify-center gap-3">
            <Spinner className="size-8" />
            Chargement des notes...
          </div>
        ) : grades.length === 0 ? (
          <div className="flex flex-col items-center text-muted-foreground h-80 justify-center gap-3">
            <p className="text-lg flex flex-col items-center gap-4"><BookX size={36} /> Aucune note disponible</p>
            {role !== "STUDENT" && selectedCourse && (
              <p className="text-sm">
                Créez une nouvelle note pour le cours "{selectedCourse}"
              </p>
            )}
          </div>
        ) : role === "STUDENT" ? (
          <StudentGradesGrid grades={grades} />
        ) : (
          <GradesTable
            data={grades}
            columns={gradeColumns(
              setEditingGrade,
              role as Role,
              handleDelete,
              deleteLoading
            )}
          />
        )}
      </div>
    </div>
  );
}