import { TeacherCard } from "@/components/teacher-card";
import { GraduationCap } from "lucide-react";

interface TeachersGridProps {
  filteredTeachers: typeof import("@/seeders/users").teachers;
}

export function TeachersGrid({ filteredTeachers }: TeachersGridProps) {
  return (
    <div className="mt-6 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
      {filteredTeachers.map((teacher, idx) => (
        <TeacherCard key={idx} teacher={teacher} />
      ))}
      {filteredTeachers.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
          <GraduationCap className="w-12 h-12 mb-2 text-gray-400" />
          <p>Aucun professeur trouvé pour votre recherche.</p>
        </div>
      )}
    </div>
  );
}