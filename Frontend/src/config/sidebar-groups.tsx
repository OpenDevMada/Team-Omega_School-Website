export const SIDEBAR_GROUPS = {
  general: {
    label: "Général",
    items: ["dashboard", "profile"],
  },
  academics: {
    label: "Académique",
    items: ["courses", "grades", "levels"],
  },
  users: {
    label: "Utilisateurs",
    items: ["students", "teachers", "admins"],
  },
  settings: {
    label: "Configuration",
    items: ["settings"],
  },
} as const;
