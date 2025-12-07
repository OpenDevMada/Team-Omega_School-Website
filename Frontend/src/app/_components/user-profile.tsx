import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Cake,
  Calendar,
  Layers,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  User,
  User2Icon,
  UserCheck,
  Users,
  Lock,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InfoItem } from "@/components/info-item";
import { UserData } from "../../components/user-data";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PasswordChangeTab } from "./password-change-tab";
import type { Student } from "@/types/student";
import type { Teacher } from "@/types/teacher";
import type { User as UserType } from "@/types/user";
import { Skeleton } from "@/components/ui/skeleton";
import type { JSX } from "react";

type UserProfileProps = {
  user: Teacher | Student | UserType;
  loading: boolean;
  coursesLink?: string;
};

export function UserProfile({
  user,
  loading,
  coursesLink = "/courses",
}: UserProfileProps) {
  console.log(user)
  const isTeacher = user.role === "TEACHER";
  const isStudent = user.role === "STUDENT";
  const isAdmin = user.role === "ADMIN";

  const infos: { label: string; data: JSX.Element[] }[] = [
    {
      label: "Profil et coordonnées",
      data: [
        <InfoItem icon={<Mail />} label="Email" value={user.email} key="email" />,
        <InfoItem
          icon={<Phone />}
          label="Phone"
          value={user.phoneNumber || "Non mentionné"}
          key="phone"
        />,
        <InfoItem icon={<MapPin />} label="Adresse" value={user.address} key="address" />,
      ],
    },
    isTeacher && {
      label: "Informations scolaires",
      data: [
        <InfoItem
          icon={<Calendar />}
          label="Date d'entrée"
          value={format(user.createdAt, "PPP", { locale: fr })}
          key="entry"
        />,
        <InfoItem icon={<UserCheck />} label="Rôle" value="Enseignant" key="role" />,
        <InfoItem icon={<BookOpen />} label="Cours" value={(user as Teacher).courses} key="courses" />,
      ],
    },
    isStudent && {
      label: "Informations scolaires",
      data: [
        <div className="flex items-center justify-between" key="student-group-level">
          <InfoItem icon={<Users />} label="Group" value={(user as Student).group?.name} />
          <Separator orientation="vertical" />
          <InfoItem icon={<Layers />} label="Niveau" value={(user as Student).level?.name} />
        </div>,
        <InfoItem
          icon={<Calendar />}
          label="Date d'entrée"
          value={format(user.createdAt, "PPP", { locale: fr })}
          key="entry"
        />,
        <InfoItem icon={<UserCheck />} label="Rôle" value="Étudiant" key="role" />,
      ],
    },
    isAdmin && {
      label: "Informations administratives",
      data: [
        <InfoItem
          icon={<Calendar />}
          label="Administrateur depuis"
          value={format(user.createdAt, "PPP", { locale: fr })}
          key="entry"
        />,
        <InfoItem icon={<UserCheck />} label="Rôle" value="Administrateur" key="role" />,
      ],
    },
    {
      label: "Informations personnelles",
      data: [
        <InfoItem icon={<User />} label="Sexe" value={user.sex === "FEMININ" ? "Féminin" : "Masculin"} key="sex" />,
        <InfoItem
          icon={<Cake />}
          label="Date de naissance"
          value={format(user.birthDate, "PPP", { locale: fr })}
          key="birthdate"
        />,
        isStudent && (
          <InfoItem
            icon={<PhoneCall />}
            label="Contact d'urgence"
            value={(user as Student).emergencyContact ?? "Non mentionné"}
            key="emergencyContact"
          />
        ),
      ],
    },
  ].filter(Boolean) as any;

  const cover = "/images/profile-bg.jpeg";

  return (
    <div className="flex justify-center min-h-screen">
      <div className="relative w-full shadow-2xl border-none overflow-hidden">
        <div className="relative max-h-80 min-h-64 h-80 w-full">
          {loading ? (
            <Skeleton className="absolute inset-0 w-full h-full" />
          ) : (
            <img src={cover} alt="cover" className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="absolute inset-0" />
        </div>

        <CardHeader className="relative backdrop-blur-md px-8 pt-10 pb-2">
          <div className="absolute -top-22 left-8">
            {loading ? (
              <Skeleton className="lg:w-44 md:w-44 w-32 aspect-square rounded-full border-4 border-yellow-200" />
            ) : user.avatar ? (
              <img
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                loading="lazy"
                className="lg:w-44 md:w-44 w-32 aspect-square rounded-full border-4 border-yellow-200 shadow-xl object-cover"
              />
            ) : (
              <div className="lg:w-44 md:w-44 w-32 aspect-square rounded-full border-4 border-yellow-200 bg-yellow-50 z-5 shadow-xl flex items-center justify-center">
                <User2Icon className="w-18 h-18 text-yellow-500" />
              </div>
            )}
          </div>

          <div className="lg:ml-48 md:ml-48 mt-4 p-0 lg:-mt-6 md:mt-0 flex flex-col lg:flex-row md:flex-col lg:items-center justify-between gap-4">
            <div className="flex flex-col gap-4">
              <CardTitle className="text-3xl font-extrabold text-(--blue) tracking-tight">
                {loading ? <Skeleton className="h-6 w-48" /> : `${user.firstName} ${user.lastName}`}
              </CardTitle>
              <span className="flex items-center gap-2">
                {loading ? (
                  <Skeleton className="h-4 w-32" />
                ) : isTeacher ? (
                  <p className="text-sm text-muted-foreground">{(user as Teacher).bio}</p>
                ) : isStudent ? (
                  <>
                    <p className="text-sm text-muted-foreground">{(user as Student).level.name}</p>
                    <p className="text-sm">{(user as Student).registrationNumber}</p>
                  </>
                ) : null}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to={coursesLink}
                className={buttonVariants({ variant: "outline" })}
              >
                {loading ? <Skeleton className="h-6 w-24" /> : "Voir mes cours"}
              </Link>
            </div>
          </div>

          <Separator className="mb-2 mt-4" />
        </CardHeader>

        <CardContent className="p-0">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mx-6 max-w-sm mb-6">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Informations générales</span>
              </TabsTrigger>
              <TabsTrigger value="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>Mot de passe</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <CardContent className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 h-auto gap-4 mb-6">
                {loading
                  ? Array.from({ length: infos.length }).map((_, idx) => (
                      <div key={idx} className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-6 w-full" />
                      </div>
                    ))
                  : infos.map((info, idx) => <UserData key={idx} label={info.label} data={info.data} />)}
              </CardContent>
            </TabsContent>

            <TabsContent value="password" className="space-y-4">
              {loading ? <Skeleton className="h-40 w-full" /> : <PasswordChangeTab />}
            </TabsContent>
          </Tabs>
        </CardContent>
      </div>
    </div>
  );
}
