import type { GradeResponseDto } from "@/types/grade";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarDays, MessageSquareText } from "lucide-react";

export function StudentGradesGrid({ grades }: { grades: GradeResponseDto[] }) {
  const getGradeColor = (value: number) => {
    if (value <= 10) return "text-red-600";
    if (value <= 14) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {grades.map((g) => (
        <Card
          key={`${g.studentRegistration}-${g.courseTitle}`}
          className="border rounded-xl shadow-sm border-t-4 hover:-translate-y-1 transition-all duration-75 border-blue-200 dark:border-blue-950"
        >
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold border-b border-border tracking-normal">{g.courseTitle}</CardTitle>
            <p>
              <span className="font-semibold text-muted-foreground">Note :</span>{" "}
              <span className={`font-bold ${getGradeColor(g.value)}`}>{g.value}</span>
            </p>
          </CardHeader>

          <CardContent className="space-y-2">
            <p className="flex items-center gap-2">
              <span className="font-semibold flex items-center gap-1"><MessageSquareText size={16} className="text-(--yellow)" /> Commentaire :</span>{" "}
              {g.comment !== "" ? `🙶 ${g.comment} 🙸` : "Aucun"}
            </p>

            <p className="text-sm flex items-center gap-2 text-muted-foreground mt-2">
              <CalendarDays size={18} className="text-(--blue)" />
              Mis à jour le :{" "}
              {format(new Date(g.updatedAt), "PPP", { locale: fr })}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
