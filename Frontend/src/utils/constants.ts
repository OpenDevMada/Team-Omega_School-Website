import type { Student } from "@/types/student";

export const ROUTES = {
  WEBSITE: {
    AUTH: {
      SIGN_IN: "/login",
      SIGN_UP: "/register",
      FORGET_PASSWORD: "/forget-password",
    },
    ENROLLMENT: "/register",
    COURSES: "/all-courses",
    ANNOUNCEMENT: "/announcements",
    CONTACT: "/contact",
  },
  APP: {
    DASHBOARD: "/dashboard",
    PROFILE: "/profile",
    TEACHERS: "/teachers",
    STUDENTS: "/students",
    GRADES: "/grades",
    COURSES: "/courses",
    LEVELSANDGROUPS: "/levels",
    ANNOUNCEMENT: "/announcement",
    SETTINGS: "/settings",
  },
} as const;

export const ENDPOINTS = {
  AUTH: {
    SIGN_IN: "/auth/login",
    SIGN_UP: "/auth/register",
    SIGN_OUT: "/auth/logout"
  },
  TEACHERS: {
    ALL: "/teachers",
    GET_BY_ID: (id: string) => `/teachers/${id}`,
    UPDATE: (id: string) => `/teachers/${id}`,
    DELETE: (id: string) => `/teachers/${id}`,
  },
  STUDENTS: {
    ALL: "/students",
    GET_BY_REGISTRATION_NUMBER: (student: Student) =>
      `/students/${student.registrationNumber}`,
    UPDATE: (student: Student) =>
      `/students/put/${student.registrationNumber}`,
    DELETE: (student: Student) =>
      `/students/delete/${student.registrationNumber}`,
  },
  STATS: {
    GLOBAL: "/dashboard/stat",
  },
  COURSES: {
    ALL: "/courses",
    UPDATE: (title: string) => `/courses/${title}`,
    DELETE: (title: string) => `/courses/${title}`,
    GET_BY_STUDENT_REGISTRATION: (registrationNumber: string) =>
      `/courses/${registrationNumber}`,
  },
  ANNOUNCEMENTS: {
    ALL: "/announcements",
    UPDATE: (title: string) => `/announcements/${title}`,
    DELETE: (title: string) => `/announcements/${title}`
  }
} as const;
