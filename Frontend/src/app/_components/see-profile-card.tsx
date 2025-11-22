import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import type { Student } from "@/types/student"
import type { Teacher } from "@/types/teacher"
import { Mail } from "lucide-react"

type Props = {
  user: Teacher | Student
}

export function SeeProfileCard({ user }: Props) {
  const isTeacher = "courses" in user

  return (
    <Card className="hover:shadow-lg transition w-full">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-3">
          <Avatar>
            {user.avatar && <AvatarImage src={user.avatar} alt={user.firstName} />}
            <AvatarFallback>{user.firstName[0].toUpperCase()}</AvatarFallback>
          </Avatar>

          <div>
            <div className="font-semibold text-lg">
              {user.firstName} {user.lastName}
            </div>

            {isTeacher ? (
              <div className="text-sm text-muted-foreground line-clamp-1">
                {user.bio}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                {user?.group?.name}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {isTeacher
              ? `${user.courses?.length ?? 0} cours`
              : user.group?.name ?? "Étudiant"}
          </div>

          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm">
              Voir profil
            </Button>
            <Button size="sm" className="bg-(--blue) hover:bg-blue-900 text-white flex items-center gap-1">
              <Mail size={14} /> Contacter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
