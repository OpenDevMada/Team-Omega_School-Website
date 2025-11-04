import type { Student } from "@/types/student";
import type { Teacher } from "@/types/teacher";

export const mockTeacher: Teacher = {
  id: "t1",
  firstName: "Marie",
  lastName: "Lefèvre",
  email: "marie.lefevre@gmail.com",
  password: "hashed_password",
  address: "15 Rue de l'École, Paris",
  phoneNumber: "+33 6 12 34 56 78",
  role: "TEACHER",
  createdAt: new Date("2022-01-05"),
  updatedAt: new Date("2024-04-01"),
  matriculeNumber: "TEA-2023-001",
  bio: "Professeure passionnée par les mathématiques depuis plus de 15 ans.",
  courses: [
    {
      id: "c1",
      title: "Algèbre avancée",
      teacher: {} as any,
      createdAt: new Date("2023-09-01"),
      updatedAt: new Date("2024-02-10"),
    },
    {
      id: "c2",
      title: "Analyse mathématique",
      teacher: {} as any,
      createdAt: new Date("2023-09-01"),
      updatedAt: new Date("2024-02-10"),
    },
    {
      id: "c3",
      title: "SVT",
      teacher: {} as any,
      createdAt: new Date("2023-09-01"),
      updatedAt: new Date("2024-02-10"),
    },
    {
      id: "c4",
      title: "Physique-chimie",
      teacher: {} as any,
      createdAt: new Date("2023-09-01"),
      updatedAt: new Date("2024-02-10"),
    },
  ],
  gender: "Féminin",
  birthDate: new Date(1990, 4, 12),
  phone: "+261 34 90 808 67",
  avatar: "https://randomuser.me/api/portraits/women/45.jpg"
};

export const mockStudent: Student = {
  id: "s1",
  firstName: "RANDRIANIRINA",
  lastName: "Mickael",
  email: "lucas.dupont@example.com",
  password: "hashed_password",
  address: "10 Rue des Fleurs, Lyon",
  phoneNumber: "+33 7 12 34 56 78",
  role: "STUDENT",
  createdAt: new Date("2023-09-15"),
  updatedAt: new Date(),
  registrationNumber: "STU-2023-104",
  level: { id: "l1", levelName: "Terminale S" },
  group: { id: "g1", groupName: "Groupe A" },
  gender: "Masculin",
  birthDate: new Date(2009, 10, 20),
  phone: "+261 33 90 080 30",
  avatar: "https://randomuser.me/api/portraits/men/1.jpg"
};
