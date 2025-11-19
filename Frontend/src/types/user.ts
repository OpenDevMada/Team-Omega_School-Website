export type Role = "ADMIN" | "TEACHER" | "STUDENT";
export type Sex = "MASCULIN" | "FEMININ";

export interface BaseUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  sex: Sex;
  address: string;
  password: string;
  phoneNumber: string;
  avatar: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseUser {
  passwordHash: string;
}

export type UserCredentials = Required<Pick<User, "email" | "password">>;