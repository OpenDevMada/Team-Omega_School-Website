import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Cake,
  Calendar,
  Mail,
  MapPin,
  Phone,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InfoItem } from "@/components/info-item";
import type { JSX } from "react";
import { UserData } from "../../components/user-data";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import type { Teacher } from "@/types/teacher";
import type { Student } from "@/types/student";

type UserProfileProps = {
  user: Teacher | Student;
  isTeacher?: boolean;
  coursesLink?: string;
};

export function UserProfile({
  user,
  isTeacher = false,
  coursesLink = "/courses",
}: UserProfileProps) {
  const infos: { label: string; data: JSX.Element[] }[] = [
    {
      label: "Profil et coordonnées",
      data: [
        <InfoItem
          icon={<Mail />}
          label="Email"
          value={user.email}
          key={user.email}
        />,
        <InfoItem
          icon={<Phone />}
          label="Phone"
          value={user.phone}
          key={user.phone}
        />,
        <InfoItem
          icon={<MapPin />}
          label="Adresse"
          value={user.address}
          key={user.address}
        />,
      ],
    },
    {
      label: "Informations scolaires",
      data: isTeacher
        ? [
            <InfoItem
              icon={<Calendar />}
              label="Date d'entree chez Omega school"
              value={user.createdAt}
              key={format(user.createdAt, "PPPp")}
            />,
            <InfoItem
              icon={<UserCheck />}
              label="Role dans l'etablissement"
              value={
                user.role === "ADMIN"
                  ? "Admin"
                  : user.role === "STUDENT"
                  ? "Etudiant"
                  : user.gender === "Féminin"
                  ? "Enseignante"
                  : "Enseignant"
              }
              key={user.role}
            />,
            <InfoItem
              icon={<BookOpen />}
              label="Cours"
              value={(user as Teacher).courses}
              key={(user as Teacher).courses.length}
            />,
          ]
        : user && "level" in user && "group" in user
        ? [
            <InfoItem
              icon={<Users />}
              label="Group"
              value={(user as Student).group?.groupName}
            />,
            <InfoItem
              icon={<Calendar />}
              label="Date d'entree chez Omega school"
              value={user.createdAt}
            />,
            <InfoItem
              icon={<UserCheck />}
              label="Role dans l'etablissement"
              value={user.role}
            />,
          ]
        : [],
    },
    {
      label: "Informations personnelles",
      data: [
        <InfoItem
          icon={<User />}
          label="Sexe"
          value={user.gender}
          key={user.gender}
        />,
        <InfoItem
          icon={<Cake />}
          label="Date de naissance"
          value={format(user.birthDate, "PPP", { locale: fr })}
          key={format(user.birthDate, "PPPp")}
        />,
      ],
    },
  ];

  const cover = "/images/profile-bg.jpeg";

  return (
    <div className="flex justify-center min-h-screen">
      <div className="relative w-full shadow-2xl border-none overflow-hidden">
        <div className="relative max-h-80 min-h-64 h-80 w-full">
          <img
            src={cover}
            alt="cover"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" />
        </div>

        <CardHeader className="relative bg-white/80 backdrop-blur-md px-8 pt-10 pb-2">
          <div className="absolute -top-22 left-8">
            {user.avatar && (
              <img
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                loading="lazy"
                className="lg:w-44 md:w-44 w-32 aspect-square rounded-full border-4 border-white shadow-xl object-cover"
              />
            )}
          </div>

          <div className="lg:ml-48 md:ml-48 mt-4 lg:-mt-6 md:mt-0 flex flex-col lg:flex-row md:flex-col lg:items-center justify-between gap-4">
            <div className="flex flex-col gap-4">
              <CardTitle className="text-3xl font-extrabold text-[#1E3A8A] tracking-tight">
                {user.firstName} {user.lastName}
              </CardTitle>
              <span className="flex items-center gap-2">
                {isTeacher ? (
                  <p className="text-sm text-muted-foreground">
                    {(user as Teacher).bio}
                  </p>
                ) : (
                  <>
                    <p className="text sm">
                      {(user as Student).registrationNumber}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {(user as Student).level.levelName}
                    </p>
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to={coursesLink}
                className={buttonVariants({ variant: "outline" })}
              >
                Voir mes cours
              </Link>
            </div>
          </div>
          <Separator className="my-6" />
        </CardHeader>

        <CardContent className="bg-white grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 h-auto gap-4 mb-6">
          {infos.map((info, idx) => (
            <UserData key={idx} label={info.label} data={info.data} />
          ))}
        </CardContent>
      </div>
    </div>
  );
}
