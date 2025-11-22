import type { User } from "./user";

export interface Level {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Group {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface Student extends User {
  registrationNumber: string;
  level: Level;
  group: Group;
}

export type StudentPostData = Required<
  Omit<Student, "id" | "createdAt" | "updatedAt" | "avatar">
>;
