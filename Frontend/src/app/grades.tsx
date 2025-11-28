import { useEffect, useState } from "react";
import type { Grade, GradeResponseDto } from "@/types/grade";
import { Spinner } from "@/components/ui/spinner";
import { gradeService } from "@/services/grade";
import { GradeFormDialog } from "@/components/grades/form-dialog";
import { GradesTable } from "@/components/grades/data-table";
import { gradeColumns } from "@/components/grades/columns";
import { StudentGradesGrid } from "@/components/grades/data-grid";
import { getAuthentifiedUser } from "@/services/auth";
import { toast } from "sonner";

export default function GradesPage() {
  const user = getAuthentifiedUser();
  const role = user?.role ?? "ADMIN";

  const [grades, setGrades] = useState<GradeResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [editingGrade, setEditingGrade] = useState<boolean>(false);

  const fetch = async () => {
    setLoading(true);
    try {
      if (role === "STUDENT") {
        const registration = "STD2025-001";
        const data = await gradeService.getByStudent(registration);
        setGrades(data);
      } else {
        const data = await gradeService.getAll();
        setGrades(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (grade: Grade) => {
    try {
      await gradeService.delete(grade.id);
      toast.success("Note supprimé avec succès");
      fetch();
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer");
      console.error(`Error on deleting grade: ${error}`);
    }
  }

  useEffect(() => {
    fetch();
  }, [role]);

  return (
    <div className="md:p-6 p-3">
      <div className="flex md:flex-row flex-col md:gap-0 gap-3 items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl tracking-tight font-semibold text-(--blue)">
            {role === "STUDENT" && "Mes notes"}
            {role !== "STUDENT" && "Les notes des étudiants"}
          </h1>

          {role !== "STUDENT" && (
            <p className="text-sm text-muted-foreground">
              Attribuer et gérer les notes pour chaque étudiant
            </p>
          )}
        </div>

        {(role === "ADMIN" || role === "TEACHER") && (
          <GradeFormDialog mode="create" onSaved={() => fetch()} open={open} setOpen={setOpen} />
        )}
      </div>

      <div className="my-8 mx-4">
        {loading ? (
          <div className="flex flex-col items-center text-muted-foreground h-80 justify-center gap-3 py-8">
            <Spinner className="size-8" />
            Chargement des notes...
          </div>
        ) : role === "STUDENT" ? (
          <StudentGradesGrid grades={grades} />
        ) : (
          <GradesTable data={grades} columns={gradeColumns(editingGrade, setEditingGrade, role, handleDelete, fetch, loading)} />
        )}
      </div>
    </div>
  );
}
