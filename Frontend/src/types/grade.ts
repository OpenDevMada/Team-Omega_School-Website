import type { Course } from "./course";
import type { Student } from "./student";

export interface Grade {
  id: string;
  student: Student;
  course: Course;
  value: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}