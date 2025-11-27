import { useEffect, useState } from "react";
import { StudentUpdateDialog } from "./update-dialog";
import { groupService, levelService, studentService } from "@/services/students";
import type { Group, Level, Student } from "@/types/student";
import { columns } from "./tables/columns";
import { DataTable } from "./tables/data-table";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [pending, setPending] = useState<boolean>(true);

  const load = async () => {
    const data = await studentService.getAll();
    setStudents(data);
  };

  useEffect(() => {
    load();
    groupService.getAll().then(setGroups);
    levelService.getAll().then(setLevels);
    const timer = setTimeout(() => setPending(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="overflow-x-auto">
        <DataTable
          loading={pending}
          columns={columns(
            (student: Student) => setSelectedStudent(student),
          )}
          data={students}
        />
      </div>

      <StudentUpdateDialog
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onUpdated={load}
        groups={groups}
        levels={levels}
      />
    </div>
  );
}
