import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { Edit, X } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { studentPostDataSchema } from "@/schemas/student.schema";
import { studentService } from "@/services/students";
import { UserFields } from "@/components/forms/user-form";
import { StudentFormFields } from "@/components/forms/student-form";
import * as z from "zod";
import type { Group, Level } from "@/types/student";
import { BaseService } from "@/services/base";

interface StudentUpdateDialogProps {
  studentId: string;
  student: z.infer<typeof studentPostDataSchema>;
}

export const [levelService, groupService] = [new BaseService<Level, any, any>("/levels"), new BaseService<Group, any, any>("/groups")];

export function StudentUpdateDialog({ student, studentId }: StudentUpdateDialogProps) {
  const [pending, startTransition] = useTransition();
  const [groups, setGroups] = useState<Group[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);

  const form = useForm<z.infer<typeof studentPostDataSchema>>({
    resolver: zodResolver(studentPostDataSchema),
    defaultValues: {
      ...student,
    },
  });

  const onSubmit = (values: z.infer<typeof studentPostDataSchema>) => {
    startTransition(async () => {
      try {
        const updated = await studentService.update(studentId, values);
        toast.success(`${updated.firstName} ${updated.lastName} mis à jour avec succès.`);
      } catch (e) {
        console.error(e);
        toast.error("Une erreur est survenue lors de la mise à jour.");
      }
    });
  };

  useEffect(() => {
    levelService.getAll().then(levels => setLevels(levels));
    groupService.getAll().then(groups => setGroups(groups));
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-(--green) dark:hover:text-green-300">
          <Edit className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Modifier l'étudiant</h2>
          <AlertDialogCancel asChild>
            <Button variant="ghost" size="icon-sm">
              <X />
            </Button>
          </AlertDialogCancel>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <UserFields form={form} />
              <StudentFormFields form={form} groups={groups} levels={levels} />
            </div>

            <div className="flex justify-end gap-3">
              <AlertDialogCancel asChild>
                <Button variant="outline">Annuler</Button>
              </AlertDialogCancel>
              <Button type="submit" disabled={pending}>
                {pending ? <><Spinner /> &nbsp;Mise à jour...</> : "Enregistrer"}
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
