import { TeachersList } from "./_components/admin-teachers";
import { TeachersListOnStudentBoard } from "./_components/student-teachers";
import { useAuthUser } from "@/services/auth";

export default function TeachersPage() {
  const {user} = useAuthUser();

  return (
    <div>
      {user?.role === "ADMIN" && <TeachersList />}
      {user?.role === "STUDENT" && <TeachersListOnStudentBoard />}
    </div>
  );
}