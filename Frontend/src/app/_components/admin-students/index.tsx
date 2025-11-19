import { useEffect, useState } from "react";
import { StudentsHeader } from "./students-header";
import { FilterBar } from "../filter-bar";
import type { UserSearchType } from "../user-search.type";
import { StudentsTable } from "./students-table";
import type { Student } from "@/types/student";
import { studentService } from "@/services/students";

export default function StudentsListPageOnAdminBoard() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<UserSearchType["genderFilter"]>("Tous");
  const [sortOrder, setSortOrder] = useState<UserSearchType["sort"]>("A-Z");
  const [loading, setLoading] = useState<boolean>(true);
  const [students, setStudents] = useState<Student[]>([]);
  const refreshList = async () => {
    const data = await studentService.getAll();
    setStudents(data as Student[]);
  }

  const studentsPerPage = 7;

  const filtered = students
    .filter((s) => {
      const matchSearch =
        s.firstName.toLowerCase().includes(search.toLowerCase()) ||
        s.lastName.toLowerCase().includes(search.toLowerCase());
      const matchGender =
        genderFilter === "Tous" || s.sex === genderFilter;
      return matchSearch && matchGender;
    })
    .sort((a, b) =>
      sortOrder === "A-Z"
        ? a.lastName.localeCompare(b.lastName)
        : b.lastName.localeCompare(a.lastName)
    );

  const totalPages = Math.ceil(filtered.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = filtered.slice(startIndex, startIndex + studentsPerPage);

  useEffect(() => {
    studentService.getAll().then(setStudents);

    // Reset pagination if only search or gender filter change
    setCurrentPage(1);
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500);
    return () => clearTimeout(timer);
  }, [search, genderFilter, currentPage]);

  return (
    <div className="min-h-screen flex flex-col gap-6 p-6">
      <StudentsHeader />
      <FilterBar
        search={search}
        setSearch={setSearch}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        sort={sortOrder}
        setSort={setSortOrder}
      />
      <StudentsTable
        students={currentStudents}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        loading={loading}
        onDeleted={refreshList}
      />
    </div>
  );
}
