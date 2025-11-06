import { useState } from "react";
import { teachers } from "@/seeders/users";
import { TeachersFilterBar } from "./teachers-filter-bar";
import { TeachersGrid } from "./teachers-grid";
import { TeachersHeader } from "./teachers-header";

export function TeachersList() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tous");
  const [sort, setSort] = useState("A-Z");

  const filteredTeachers = teachers
    .filter(
      (teacher) =>
        (filter === "Tous" || teacher.gender === filter) &&
        (teacher.firstName.toLowerCase().includes(search.toLowerCase()) ||
          teacher.lastName.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sort === "A-Z") return a.firstName.localeCompare(b.firstName);
      if (sort === "Z-A") return b.firstName.localeCompare(a.firstName);
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col gap-6 p-8 dark:bg-background">
      <TeachersHeader />
      <TeachersFilterBar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />
      <TeachersGrid filteredTeachers={filteredTeachers} />
    </div>
  );
}