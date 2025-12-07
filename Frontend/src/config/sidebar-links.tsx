import type { Role } from "@/types/user";
import { ROUTES } from "@/utils/constants";
import {
  LayoutDashboard,
  User2,
  BookOpen,
  UsersRound,
  UserCircle2,
  Layers,
  Cog,
  BookCheck,
} from "lucide-react";

export const sidebarLinks = [
  { id: "dashboard", title: "Dashboard", href: ROUTES.APP.DASHBOARD, icon: LayoutDashboard },
  { id: "profile", title: "Profil", href: ROUTES.APP.PROFILE, icon: User2 },
  { id: "courses", title: "Cours", href: ROUTES.APP.COURSES, icon: BookOpen },
  { id: "students", title: "Étudiants", href: ROUTES.APP.STUDENTS, icon: UsersRound },
  { id: "teachers", title: "Professeurs", href: ROUTES.APP.TEACHERS, icon: UserCircle2 },
  { id: "grades", title: "Notes", href: ROUTES.APP.GRADES, icon: BookCheck },
  { id: "levels", title: "Groupe et niveau", href: ROUTES.APP.LEVELSANDGROUPS, icon: Layers },
  { id: "settings", title: "Parametre", href: ROUTES.APP.SETTINGS, icon: Cog },
];

const roleRules = {
  ADMIN: {
    hide: [],
    add: [],
  },
  STUDENT: {
    hide: ["dashboard", "levels", "settings", "students"],
    add: [],
  },
  TEACHER: {
    hide: ["dashboard", "levels", "settings", "teachers"],
    add: [],
  },
} as const;

export function getLinksForRole(role: Role) {
  const rules = roleRules[role] ?? roleRules["STUDENT"];

  let baseLinks = sidebarLinks.filter(
    // @ts-expect-error
    (link) => !rules.hide.includes(link.id)
  );

  if (rules.add.length > 0) {
    baseLinks = [...baseLinks, ...rules.add];
  }

  return baseLinks;
}
