import type { Teacher } from "./teacher";

export interface Course {
  id: string;
  title: string;
  teacher: Teacher;
  createdAt: Date;
  updatedAt: Date;
}
