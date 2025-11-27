import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CalendarDays, Clock, BookOpen, Eye, Trash2 } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { useState, type FC } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types/course";
import { CoursesFormDialog } from "./form-dialog";
import type z from "zod";
import type { courseSchema } from "@/schemas/course.schema";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Spinner } from "../ui/spinner";

interface CourseCardProps extends Course {
  role: "admin" | "teacher" | "student";
  onView?: (course: Course) => void;
  onEdit?: (course: z.infer<typeof courseSchema>) => void | Promise<void>;
  onDelete?: (title: string) => void | Promise<void>;
  withLabel: boolean;
}

export const CourseCard: FC<CourseCardProps> = ({
  id,
  title,
  description,
  teacherName,
  createdAt,
  updatedAt,
  teacherMatricule,
  role,
  onView,
  onEdit,
  onDelete,
  withLabel
}) => {
  const showActions = role === "admin";
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);

  const colorMap = {
    admin: "--yellow",
    teacher: "--blue",
    student: "--green",
  } as const;

  const handleEdit = async (values: z.infer<typeof courseSchema>) => {
    if (!onEdit) return;
    setPending(true);
    try {
      await onEdit(values);
      setOpenEdit(false);
    } finally {
      setPending(false);
    }
  };

  const handleDelete = async (title: string) => {
    if (!onDelete) return;
    setPending(true);
    try {
      await onDelete(title);
      setOpenDelete(false);
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="relative flex flex-col h-80 justify-between overflow-hidden transition-all duration-300 border border-border rounded-2xl bg-card hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-0 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl border border(${colorMap[role]}) bg-white dark:bg-gray-900`}>
            <BookOpen className={`w-5 h-5 text-(${colorMap[role]})`} />
          </div>
          <h3 className={`text-lg font-semibold text-(${colorMap[role]})`}>
            {title}
          </h3>
        </div>

        {showActions && (
          <div className="flex gap-2">
            <CoursesFormDialog
              open={openEdit}
              setOpen={setOpenEdit}
              mode="update"
              pending={pending}
              defaultValues={{ title, description, teacherMatricule }}
              withLabel={false}
              onSubmitAction={handleEdit}
            />

            <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
              <AlertDialogTrigger asChild>
                <Button
                  title={`Supprimer`}
                  variant={withLabel ? "destructive" : "ghost"}
                  size={withLabel ? "default" : "icon-sm"}
                  className={`flex items-center gap-2 ${!withLabel && "border border-border"}`}
                >
                  {withLabel && "Supprimer"}
                  <Trash2 color={withLabel ? "white" : "red"} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Supprimer le cours {title}</AlertDialogTitle>
                  <AlertDialogDescription>Etes-vous sure ? Cette action est irreversible.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex items-center gap-4">
                  <Button variant={"destructive"} size={"default"} disabled={pending} onClick={() => handleDelete(title)}>
                    {pending ? <Spinner /> : "Continer"}
                  </Button>
                  <AlertDialogCancel asChild>
                    <Button variant={"outline"} size={"default"}>Annuler</Button>
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}

        {role === "teacher" && onView && (
          <Button size="icon-sm" variant="outline" onClick={() => onView({
            id, title, description, teacherName, teacherMatricule, createdAt, updatedAt
          })}>
            <Eye className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground line-clamp-3 grow">
          {description}
        </p>
        {(showActions || role === "teacher") && (
          <div className="flex items-center gap-3 mt-2">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarFallback className={`bg-(${colorMap[role]})/10 text-(${colorMap[role]}) font-medium`}>
                {teacherName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{teacherName}</span>
              <span className="text-xs text-muted-foreground">Enseignant</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between text-xs text-slate-500 border-t border-border pt-3 mt-2">
        <div className="flex items-center gap-1">
          <CalendarDays className="w-4 h-4" />
          <span>Créé le {format(createdAt, "PPP", { locale: fr })}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatDistanceToNow(updatedAt, { addSuffix: true, locale: fr })}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
