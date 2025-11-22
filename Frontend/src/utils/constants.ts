import type { Student } from "@/types/student";
import type { Teacher } from "@/types/teacher";

// export const API_BASE_URL = process.env.BASE_URL || "http://localhost:5000/api";

export const ROUTES = {
  WEBSITE: {
    AUTH: {
      SIGN_IN: "/login",
      FORGET_PASSWORD: "/forget-password",
      RESET_PASSWORD: "/reset-password",
    },
    ENROLLMENT: "/register",
    COURSES: "/all-courses",
    ANNOUNCEMENT: "/announcement",
  },
  APP: {
    PROFILE: "/profile",
    TEACHERS: "/teachers",
    STUDENTS: "/students",
    COURSES: "/courses",
    ANNOUNCEMENT: "/announcement",
  },
};

export const TEACHERS_ENDPOINTS = {
  ALL: "/teachers",
  GET_BY_ID: (teacher: Teacher) => `/teachers/${teacher.id}`,
  UPDATE_TEACHER: (teacher: Teacher) => `/teachers/put/${teacher.id}`,
  DELETE_TEACHER: (teacher: Teacher) => `/teachers/delete/${teacher.id}`,
};

export const STUDENTS_ENDPOINTS = {
  ALL: "/students",
  GET_BY_REGISTRATION_NUMBER: (student: Student) =>
    `/students/${student.registrationNumber}`,
  UPDATE_STUDENT: (student: Student) =>
    `/students/put/${student.registrationNumber}`,
  DELETE_STUDENT: (student: Student) =>
    `/students/delete/${student.registrationNumber}`,
};

export const ADMIN_ENDPOINTS = {
  STAT: "/stat",
};
