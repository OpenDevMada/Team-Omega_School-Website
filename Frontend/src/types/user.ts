export type Role = "ADMIN" | "TEACHER" | "STUDENT";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: "Masculin" | "Féminin";
  birthDate: Date;
  email: string;
  phone: string;
  password: string;
  address: string;
  phoneNumber: string;
  avatar: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
