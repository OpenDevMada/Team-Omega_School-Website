import StudentsListPageOnAdminBoard from "./_components/admin-students";
import StudentsListOnTeacherBoard from "./_components/teacher-students";
import { getAuthentifiedUser } from "@/services/auth";

export default function StudentsPage() {
  const user = getAuthentifiedUser();

  return (
    <div>
      {user?.role === "ADMIN" && <StudentsListPageOnAdminBoard />}
      {user?.role === "TEACHER" && <StudentsListOnTeacherBoard />}
    </div>
  );
}
