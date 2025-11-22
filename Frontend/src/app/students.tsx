import { Separator } from "@/components/ui/separator";
import StudentsListPageOnAdminBoard from "./_components/admin-students";
import StudentsListOnTeacherBoard from "./_components/teacher-students";

export default function StudentsPage() {
  /**
   * Fetch user
   * Check his role
   * Update view according to this
   */
  return (
    <div>
      <StudentsListPageOnAdminBoard />
      <Separator />
      <StudentsListOnTeacherBoard />
    </div>
  );
}