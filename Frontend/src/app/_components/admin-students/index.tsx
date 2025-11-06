import { useState } from "react";
import { students } from "@/seeders/users";
import { StudentsHeader } from "./students-header";
import { StudentsTable } from "./students-table";

export default function StudentsListPageOnAdminBoard() {
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 7;
  const [search, setSearch] = useState<string>("");

  const filtered = students.filter(
    (s) =>
      s.firstName.toLowerCase().includes(search.toLowerCase()) ||
      s.lastName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = filtered.slice(startIndex, startIndex + studentsPerPage);

  return (
    <div className="min-h-screen flex flex-col gap-6 p-6">
      <StudentsHeader />
      <StudentsTable
        students={currentStudents}
        search={search}
        setSearch={setSearch}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}