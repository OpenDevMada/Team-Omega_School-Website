import type { Teacher } from "./teacher";

export interface Course {
  readonly id: string;
  title: string;
  description: string;
  teacherName: Teacher["firstName"];
  teacherMatricule: Teacher["matriculeNumber"];
  createdAt: Date;
  updatedAt: Date;
}
