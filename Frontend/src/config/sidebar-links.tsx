import type { Role } from "@/types/user";
import {
  LayoutDashboard,
  User2,
  BookOpen,
  UsersRound,
  UserCircle2,
  Megaphone,
  Layers,
  Cog,
  BookCheck,
} from "lucide-react";

export const sidebarLinks = [
  { id: "dashboard", title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { id: "profile", title: "Profil", href: "/profile", icon: User2 },
  { id: "courses", title: "Cours", href: "/courses", icon: BookOpen },
  { id: "students", title: "Étudiants", href: "/students", icon: UsersRound },
  { id: "teachers", title: "Professeurs", href: "/teachers", icon: UserCircle2 },
  { id: "announcement", title: "Annonces", href: "/announcement", icon: Megaphone },
  { id: "levels", title: "Groupe et niveau", href: "/levels", icon: Layers },
  { id: "settings", title: "Parametre", href: "/settings", icon: Cog },
];

const roleRules = {
  ADMIN: {
    hide: [],
    add: [],
  },
  STUDENT: {
    hide: ["dashboard", "levels", "settings", "students"],
    add: [
      {
        id: "grades",
        title: "Mes notes",
        href: "/grades",
        icon: BookCheck,
      },
    ],
  },
  TEACHER: {
    hide: ["dashboard", "levels", "settings", "teachers"],
    add: [
      {
        id: "grades",
        title: "Attribution de notes",
        href: "/grades",
        icon: BookCheck,
      },
    ],
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
