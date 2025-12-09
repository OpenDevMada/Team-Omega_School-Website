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
  ShieldCheck,
} from "lucide-react";
import { SIDEBAR_GROUPS } from "./sidebar-groups";

export const sidebarLinks = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: ROUTES.APP.DASHBOARD,
    icon: LayoutDashboard,
  },
  { id: "profile", title: "Profil", href: ROUTES.APP.PROFILE, icon: User2 },
  { id: "courses", title: "Cours", href: ROUTES.APP.COURSES, icon: BookOpen },
  {
    id: "students",
    title: "Étudiants",
    href: ROUTES.APP.STUDENTS,
    icon: UsersRound,
  },
  {
    id: "teachers",
    title: "Professeurs",
    href: ROUTES.APP.TEACHERS,
    icon: UserCircle2,
  },
  {
    id: "admins",
    title: "Administrateurs",
    href: ROUTES.APP.ADMINS,
    icon: ShieldCheck,
  },
  { id: "grades", title: "Notes", href: ROUTES.APP.GRADES, icon: BookCheck },
  {
    id: "levels",
    title: "Groupe et niveau",
    href: ROUTES.APP.LEVELSANDGROUPS,
    icon: Layers,
  },
  { id: "settings", title: "Paramètres", href: ROUTES.APP.SETTINGS, icon: Cog },
];

const roleRules = {
  ADMIN: {
    hide: [] as string[],
    add: [],
  },
  STUDENT: {
    hide: ["dashboard", "levels", "settings", "students", "admins"],
    add: [],
  },
  TEACHER: {
    hide: ["dashboard", "levels", "settings", "teachers", "admins"],
    add: [],
  },
} as const;

export function getLinksForRole(role: Role) {
  const rules = roleRules[role] ?? roleRules["STUDENT"];
  const hidden = rules.hide;

  const grouped = Object.entries(SIDEBAR_GROUPS).map(([_, group]) => {
    const visibleItems = group.items
      // @ts-expect-error
      .filter((id) => !hidden.includes(id))
      .map((id) => sidebarLinks.find((l) => l.id === id))
      .filter(Boolean);

    return {
      group: group.label,
      items: visibleItems,
    };
  });

  return grouped.filter((g) => g.items.length > 0);
}
