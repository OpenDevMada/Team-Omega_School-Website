import { Skeleton } from "@/components/ui/skeleton";
import { mockTeacher } from "@/seeders/user";
import { Suspense } from "react";
import { UserProfile } from "./_components/user-profile";

// const StudentProfile = () => <UserProfile user={mockStudent} />
const TeacherProfile = () => <UserProfile user={mockTeacher} isTeacher={true} />

export default function ProfilePage() {
  return (
    <div className="min-h-screen w-full">
      <Suspense fallback={<Skeleton />}>
        {/* Fetch user and add condition */}
        {/* <StudentProfile /> */}
        <TeacherProfile />
      </Suspense>
    </div>
  );
}
