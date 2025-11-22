import { useEffect, useState } from "react";
import { TeachersGrid } from "./teachers-grid";
import { TeachersHeader } from "./teachers-header";
import type { UserSearchType } from "../user-search.type";
import { FilterBar } from "../filter-bar";
import type { Teacher } from "@/types/teacher";
import { teacherService } from "./update-dialog";

export function TeachersList() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState<UserSearchType["genderFilter"]>("Tous");
  const [sort, setSort] =
    useState<UserSearchType["sort"]>("A-Z");
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const refreshList = () => {
    teacherService.getAll().then(setTeachers);
  }

  const filteredTeachers = teachers
    .filter(
      (teacher) =>
        (filter === "Tous" || teacher.sex === filter) &&
        (teacher.firstName.toLowerCase().includes(search.toLowerCase()) ||
          teacher.lastName.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sort === "A-Z") return a.firstName.localeCompare(b.firstName);
      if (sort === "Z-A") return b.firstName.localeCompare(a.firstName);
      return 0;
    });

  useEffect(() => {
    teacherService.getAll().then(setTeachers);
    refreshList();
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-2 p-8 dark:bg-background">
      <TeachersHeader onCreated={refreshList} />
      <FilterBar
        search={search}
        setSearch={setSearch}
        genderFilter={filter}
        setGenderFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />
      <TeachersGrid filteredTeachers={filteredTeachers} />
    </div>
  );
}
