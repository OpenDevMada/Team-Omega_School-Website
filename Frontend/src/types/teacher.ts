import type { Course } from "./course";
import type { User } from "./user";

export interface Teacher extends User {
  matriculeNumber: string;
  bio: string;
  courses: Course[];
}
