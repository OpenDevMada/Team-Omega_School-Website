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
    SETTINGS: "/settings",
  },
} as const;

export const ENDPOINTS = {
  AUTH: {
    SIGN_IN: "/auth/login",
    SIGN_UP: "/auth/register",
    SIGN_OUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh",
    REQUEST_SEND_EMAIL: "/auth/request-reset",
    VERIFY_EMAIL_OTP: "/auth/verify-otp",
    RESET_PASSWORD: "/auth/reset-password",
  },
  RELATIONS: {
    STUDENTS_TEACHER: (matricule: string) => `/relations/teacher/${matricule}/students`,
    TEACHERS_STUDENT: (registrationNumber: string) => `/relations/student/${registrationNumber}/teachers`,
  }
} as const;
