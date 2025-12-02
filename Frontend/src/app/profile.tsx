import { Skeleton } from "@/components/ui/skeleton";
import { mockStudent } from "@/seeders/user";
import { Suspense } from "react";
import { UserProfile } from "./_components/user-profile";

// const StudentProfile = () => <UserProfile user={mockStudent} />
const Profile = () => <UserProfile user={mockStudent} isTeacher={false} />

export default function ProfilePage() {
  return (
    <div className="min-h-screen w-full">
      <Suspense fallback={<Skeleton />}>
        {/* Fetch user and add condition */}
        {/* <StudentProfile /> */}
        <Profile />
      </Suspense>
    </div>
  );
}
