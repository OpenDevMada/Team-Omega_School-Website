import { TeachersList } from "./_components/admin-teachers";
import { TeachersListOnStudentBoard } from "./_components/student-teachers";
import { getAuthentifiedUser } from "@/services/auth";

export default function TeachersPage() {
  const user = getAuthentifiedUser();

  return (
    <div>
      {user?.role === "ADMIN" && <TeachersList />}
      {user?.role === "STUDENT" && <TeachersListOnStudentBoard />}
    </div>
  );
}