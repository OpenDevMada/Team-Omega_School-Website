import type { Teacher } from "@/types/teacher";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button, buttonVariants } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Mail, PhoneCall, User, BookOpen, X, Eye, Edit } from "lucide-react";
import { Badge } from "./ui/badge";
import { DeleteUserButton } from "@/app/_components/delete-button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function TeacherCard({
  teacher,
}: {
  teacher: Teacher;
}) {
  return (
    <Card className="md:max-w-sm w-full py-4 hover:shadow-lg transition duration-100">
      <CardContent className="flex items-center gap-2 overflow-hidden">
        {teacher.avatar ? (
          <img
            src={teacher.avatar}
            alt={teacher.firstName}
            className="rounded-full w-18 aspect-square cursor-pointer"
          />
        ) : (
          <div className="w-18 min-w-14 flex items-center transition duration-75 hover:brightness-110 justify-center rounded-full font-semibold text-white text-2xl aspect-square uppercase bg-(--green) dark:text-white">
            {teacher.firstName[0]}
          </div>
        )}

        <div className="flex flex-col space-y-1">
          <h4 className="font-semibold text-xl">
            {teacher.gender === "Féminin"
              ? `Mme ${teacher.firstName}`
              : `Mr ${teacher.firstName}`}
          </h4>
          <p className="text-sm text-muted-foreground hover:underline whitespace-break-spaces line-clamp-1">
            {teacher.email}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon-sm">
                  <Eye />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="max-w-md p-6">
                {/* Dialog header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    {teacher.avatar ? (
                      <img
                        src={teacher.avatar}
                        alt={teacher.firstName}
                        className="w-20 h-20 rounded-full object-cover border-2 border-(--green)"
                      />
                    ) : (
                      <div className="w-20 h-20 flex items-center justify-center rounded-full font-semibold text-white text-2xl uppercase bg-(--green)">
                        {teacher.firstName[0]}
                      </div>
                    )}

                    <div>
                      <h2 className="text-2xl font-bold text-(--blue)">
                        {teacher.firstName} {teacher.lastName}
                      </h2>
                      <Badge variant={"outline"} className="font-semibold">{teacher.matriculeNumber}</Badge>
                    </div>
                  </div>

                  <AlertDialogCancel asChild>
                    <Button variant="ghost" size="icon-sm">
                      <X />
                    </Button>
                  </AlertDialogCancel>
                </div>
                <Separator />
                {/* Dialog body */}
                <div className="space-y-3">
                  {teacher.bio && (
                    <p className="text-sm text-muted-foreground italic">
                      “{teacher.bio}”
                    </p>
                  )}

                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-(--yellow) dark:text-(--dark-yellow)" />
                    <span>{teacher.email}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <User className="w-4 h-4 text-(--blue)" />
                    <span>{teacher.gender}</span>
                  </p>

                  {teacher.courses && teacher.courses.length > 0 && (
                    <div className="mt-3">
                      <h3 className="font-semibold flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-(--blue)" />
                        Cours enseignés :
                      </h3>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {teacher.courses.slice(0, 3).map((c, i) => (
                          <li key={i}>{c.title}</li>
                        ))}
                        {teacher.courses.length > 3 && (
                          <li className="text-muted-foreground">
                            +{teacher.courses.length - 3} autres
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                {/* Dialog footer */}
                <AlertDialogFooter>
                  <Link to={`/teacher?edit=${teacher.id}`} className={cn(buttonVariants({ variant: "secondary" }))}><Edit size={16} /> Modifier</Link>
                  <AlertDialogAction asChild>
                    <DeleteUserButton user={teacher} withLabel={true} />
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button title="Appeler" variant="outline" size={"icon-sm"}>
              <PhoneCall />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}