import { Separator } from "@/components/ui/separator";
import { TeachersList } from "./_components/admin-teachers";
import { TeachersListOnStudentBoard } from "./_components/student-teachers";

export default function TeachersPage() {
  /**
   * Fetch user
   * Check his role
   * Update view according to this
   */
  return (
    <div>
      <TeachersList />
      <Separator />
      <TeachersListOnStudentBoard />
    </div>
  );
}