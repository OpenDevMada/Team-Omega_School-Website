import {
  LayoutDashboard,
  User2,
  BookOpen,
  UsersRound,
  UserCircle2,
  Megaphone,
  Layers,
  Cog,
} from "lucide-react";

export const sidebarLinks = [
  { id: "dashboard", title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { id: "profile", title: "Profil", href: "/profile", icon: User2 },
  { id: "courses", title: "Cours", href: "/courses", icon: BookOpen },
  { id: "students", title: "Étudiants", href: "/students", icon: UsersRound },
  { id: "teachers", title: "Professeurs", href: "/teachers", icon: UserCircle2 },
  { id: "announcement", title: "Annonces", href: "/announcement", icon: Megaphone },
  { id: "levels", title: "Groupe et niveau", href: "/levels", icon: Layers },
  { id: "advanced", title: "Parametre avancée", href: "/advanced", icon: Cog },
];
