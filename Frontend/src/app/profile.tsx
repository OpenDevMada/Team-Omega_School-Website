import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { UserProfile } from "./_components/user-profile";
import type { Student } from "@/types/student";
import type { Teacher } from "@/types/teacher";
import { useAuthUser } from "@/services/auth";
import { Spinner } from "@/components/ui/spinner";
import type { User } from "@/types/user";

export default function ProfilePage() {
  const Profile = () => {
    const { user, loading } = useAuthUser();

    if (loading) {
      return <div className="flex flex-col items-center justify-center min-h-[70vh] w-full gap-4">
        <Spinner className="size-8" />
        Chargement des donnees
      </div>
    }

    return <UserProfile user={user as Student | Teacher | User} loading={loading} />
  }

  return (
    <div className="min-h-screen w-full">
      <Suspense fallback={<Skeleton />}>
        <Profile />
      </Suspense>
    </div>
  );
}
