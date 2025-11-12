import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { CalendarDays, Clock, BookOpen } from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import type { FC } from "react"
import type { Teacher } from "@/types/teacher"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CourseCardProps {
  id: string | number
  title: string
  teacher: Teacher
  createdAt: Date
  updatedAt: Date
}

export const CourseCard: FC<CourseCardProps> = ({
  title,
  teacher,
  createdAt,
  updatedAt,
}) => {
  const initials = `${teacher.firstName?.[0] ?? ""}${teacher.lastName?.[0] ?? ""}`.toUpperCase()

  return (
    <Card className="relative flex flex-col justify-between overflow-hidden transition-all duration-300 border border-border hover:shadow-md hover:-translate-y-1 rounded-2xl bg-card">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl border border-(--yellow) bg-white dark:bg-gray-900">
              <BookOpen className="w-5 h-5 text-(--yellow)" />
            </div>
            <h3 className="text-lg font-semibold text-(--yellow)">{title}</h3>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-3 mt-2">
          <Avatar className="h-10 w-10 border border-border">
            {teacher.avatar ? (
              <AvatarImage src={teacher.avatar} alt={`${teacher.firstName} ${teacher.lastName}`} />
            ) : (
              <AvatarFallback className="bg-(--yellow)/10 text-(--yellow) font-medium">
                {initials}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {teacher.firstName} {teacher.lastName}
            </span>
            <span className="text-xs text-muted-foreground">
              Enseignant
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between text-xs text-slate-500 border-t border-border pt-3 mt-2">
        <div className="flex items-center gap-1">
          <CalendarDays className="w-4 h-4" />
          <span>
            Créé le {format(new Date(createdAt), "PPP", { locale: fr })}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>
            {formatDistanceToNow(new Date(updatedAt), {
              addSuffix: true,
              locale: fr,
            })}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}