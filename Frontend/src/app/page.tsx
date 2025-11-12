// pages-ui-mocks.tsx
// Single file containing 7 UI-only page components (React + TSX + Tailwind + Shadcn UI)
// Each section is separated by a clear comment block.
// Fake data included. No network calls. Copy into your project and import the components you need.

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Plus,
  Users,
  BookOpen,
  Megaphone,
  SlidersHorizontal,
} from "lucide-react";

/* ===============================
   Mock data (shared)
   =============================== */
type TeacherMock = {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  gender?: "Masculin" | "Féminin";
  avatar?: string | null;
  bio?: string;
  courses?: { id: string; title: string }[];
};

type StudentMock = {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  level?: string;
  group?: string;
  avatar?: string | null;
};

type CourseMock = {
  id: string;
  title: string;
  code?: string;
  level?: string;
  teacher?: string;
};

export type AnnouncementMock = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date
};

export const mockTeachers: TeacherMock[] = [
  { id: "t1", firstName: "Aina", lastName: "R", email: "aina@mail.com", gender: "Féminin", bio: "Maths & Physics", courses: [{ id: "c1", title: "Math 2" }] },
  { id: "t2", firstName: "Hery", email: "hery@mail.com", gender: "Masculin", bio: "Computer Science", courses: [{ id: "c2", title: "Intro to CS" }] },
  { id: "t3", firstName: "Sara", email: "sara@mail.com", gender: "Féminin", bio: "Biology", courses: [{ id: "c3", title: "Biology 101" }] },
];

export const mockStudents: StudentMock[] = [
  { id: "s1", firstName: "Rija", lastName: "A", email: "rija@mail.com", level: "L1", group: "G1" },
  { id: "s2", firstName: "Miora", lastName: "B", email: "miora@mail.com", level: "L2", group: "G3" },
  { id: "s3", firstName: "Tojo", email: "tojo@mail.com", level: "L1", group: "G1" },
];

export const mockCourses: CourseMock[] = [
  { id: "c1", title: "Mathématiques générales", code: "MATH101", level: "L1", teacher: "Aina" },
  { id: "c2", title: "Programmation 1", code: "CS101", level: "L1", teacher: "Hery" },
  { id: "c3", title: "Biologie des organismes", code: "BIO201", level: "L2", teacher: "Sara" },
];

export const mockAnnouncements: AnnouncementMock[] = [
  { id: "a1", title: "Rentrée officielle", description: "La rentrée aura lieu le 1er septembre à 8h.", createdAt: new Date(2025, 9, 1), updatedAt: new Date(2025, 9, 1) },
  { id: "a2", title: "Examens blancs", description: "Les examens blancs se tiendront la semaine prochaine.", createdAt: new Date(2025, 9, 2), updatedAt: new Date(2025, 10, 2) },
];

/* ===============================
   Helper small UI pieces
   =============================== */

export function Avatar({ name, src }: { name: string; src?: string | null }) {
  if (src) {
    return <img src={src} alt={name} className="w-10 h-10 rounded-full object-cover" />;
  }
  return (
    <div className="w-10 h-10 rounded-full bg-(--green) flex items-center justify-center text-white font-semibold">
      {name?.[0]?.toUpperCase() ?? "U"}
    </div>
  );
}

/* =================================================
   1) Admin Profile Page (UI only)
   ================================================= */

export function AdminProfilePage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-(--blue)">Profil Administrateur</h2>
          <p className="text-sm text-muted-foreground">Informations du compte et paramètres globaux</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Plus className="w-4 h-4" /> Modifier</Button>
          <Button>Voir tableau de bord</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Identité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar name="Admin" />
              <div>
                <div className="font-semibold">Admin Omega</div>
                <div className="text-sm text-muted-foreground">admin@omega.school</div>
                <div className="text-sm text-muted-foreground mt-2">Rôle : Super Administrateur</div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div><strong>Établissement :</strong> Omega School</div>
              <div><strong>Téléphone :</strong> +261 34 00 000</div>
              <div><strong>Adresse :</strong> Antananarivo</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paramètres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between"><span>Notifications</span><Button variant="ghost" size="sm">Modifier</Button></div>
              <div className="flex justify-between"><span>Gestion des utilisateurs</span><Button variant="ghost" size="sm">Ouvrir</Button></div>
              <div className="flex justify-between"><span>Backups</span><Button variant="ghost" size="sm">Historique</Button></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-gray-50 text-center">
                <div className="text-2xl font-bold">124</div>
                <div className="text-sm text-muted-foreground">Étudiants</div>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 text-center">
                <div className="text-2xl font-bold">16</div>
                <div className="text-sm text-muted-foreground">Enseignants</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* =================================================
   2) Courses page on Home (catalog / cards)
   ================================================= */

export function CoursesHomePage() {
  const [query, setQuery] = useState("");
  const filtered = mockCourses.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()) || (c.code ?? "").toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-(--blue)">Cours disponibles</h2>
          <p className="text-sm text-muted-foreground">Parcourez les cours proposés cette année</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" placeholder="Rechercher un cours..." />
          </div>
          <Button variant="outline"><SlidersHorizontal className="w-4 h-4" /> Trier</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {filtered.map((c) => (
          <Card key={c.id} className="hover:shadow-lg transition">
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-lg font-semibold">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.code} — {c.level}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Enseignant</div>
                  <div className="font-medium">{c.teacher}</div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="ghost" size="sm">Voir</Button>
                <Button size="sm">S'inscrire</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* =================================================
   3) Announcement Page
   ================================================= */

export function AnnouncementsPage() {
  const [list] = useState<AnnouncementMock[]>(mockAnnouncements);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-(--blue)">Annonces</h2>
          <p className="text-sm text-muted-foreground">Information importantes et communiqués</p>
        </div>
        <Button><Megaphone className="w-4 h-4 mr-2" /> Nouvelle annonce</Button>
      </div>

      <div className="space-y-4">
        {list.map((a) => (
          <Card key={a.id}>
            <CardContent>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-lg font-semibold">{a.title}</div>
                  <div className="text-sm text-muted-foreground">{a.description}</div>
                </div>
                <div className="text-xs text-muted-foreground">{new Date(a.createdAt).toLocaleDateString()}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* =================================================
   4) Student list on Teacher (table with actions)
   ================================================= */

export function TeacherStudentListPage() {
  const [q, setQ] = useState("");
  const filtered = mockStudents.filter((s) => `${s.firstName} ${s.lastName ?? ""}`.toLowerCase().includes(q.toLowerCase()) || s.email.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Mes étudiants</h2>
          <p className="text-sm text-muted-foreground">Liste des étudiants de vos groupes</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" placeholder="Rechercher un étudiant..." />
          </div>
          <Button variant="outline"><Users className="w-4 h-4" /> Filtrer</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tableau des étudiants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="flex items-center gap-3">
                      <Avatar name={s.firstName} src={s.avatar || null} />
                      <div>
                        <div className="font-medium">{s.firstName} {s.lastName}</div>
                        <div className="text-sm text-muted-foreground">{s.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{s.level} — {s.group}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="icon-sm">Voir</Button>
                        <Button variant="outline" size="icon-sm">Message</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* =================================================
   5) Courses on Teacher (teacher manages own courses)
   ================================================= */

export function TeacherCoursesPage() {
  const myCourses = mockCourses.filter((c) => c.teacher === "Hery" || c.teacher === "Aina"); // fake
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Mes cours</h2>
          <p className="text-sm text-muted-foreground">Gérez le contenu, ressources et évaluations</p>
        </div>
        <Button><Plus className="w-4 h-4" /> Nouveau cours</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {myCourses.map((c) => (
          <Card key={c.id}>
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-lg font-semibold">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.code} • {c.level}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Button variant="outline" size="sm">Éditer</Button>
                  <Button size="sm">Voir</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* =================================================
   6) Courses on Student (student view courses + progress)
   ================================================= */

export function StudentCoursesPage() {
  const enrolled = [mockCourses[0], mockCourses[1]]; // fake enrolled
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Mes cours</h2>
          <p className="text-sm text-muted-foreground">Voir le contenu et suivre votre progression</p>
        </div>
        <Button variant="outline"><BookOpen className="w-4 h-4" /> Explorer</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {enrolled.map((c) => (
          <Card key={c.id}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.teacher} • {c.level}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Progression</div>
                  <div className="w-36 h-2 bg-gray-200 rounded mt-2">
                    <div className="h-2 bg-(--yellow) rounded" style={{ width: "45%" }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* =================================================
   7) Teacher on Student (student sees teacher profiles)
   ================================================= */

export function StudentTeacherPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Enseignants</h2>
          <p className="text-sm text-muted-foreground">Rencontrez vos enseignants</p>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Rechercher un enseignant..." className="w-72" />
          <Button variant="outline"><Users className="w-4 h-4" /> Tous</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {mockTeachers.map((t) => (
          <Card key={t.id} className="hover:shadow-lg transition">
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar name={t.firstName} src={t.avatar ?? null} />
                <div>
                  <div className="font-semibold">{t.firstName} {t.lastName}</div>
                  <div className="text-sm text-muted-foreground">{t.bio}</div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">{t.courses?.length ?? 0} cours</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Voir profil</Button>
                  <Button size="sm">Contacter</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* =================================================
   Optional: Export a single preview component that shows all pages stacked
   (helpful for quick visual QA)
   ================================================= */

export default function PagesPreviewAll() {
  return (
    <div className="space-y-10 bg-white dark:bg-background">
      <AdminProfilePage />
      <Separator />
      <CoursesHomePage />
      <Separator />
      <AnnouncementsPage />
      <Separator />
      <TeacherStudentListPage />
      <Separator />
      <TeacherCoursesPage />
      <Separator />
      <StudentCoursesPage />
      <Separator />
      <StudentTeacherPage />
    </div>
  );
}