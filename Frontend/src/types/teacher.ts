import type { Course } from "./course";
import type { User } from "./user";

export interface Teacher extends User {
  matriculeNumber: string;
  bio: string;
  courses: Course[];
}

export type TeacherUpdateDto = Required<
  Pick<
    Teacher,
    | "firstName"
    | "lastName"
    | "email"
    | "birthDate"
    | "sex"
    | "address"
    | "phoneNumber"
    | "bio"
    | "matriculeNumber"
  >
>;
