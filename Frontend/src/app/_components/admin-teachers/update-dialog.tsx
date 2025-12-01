import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, type Dispatch, type SetStateAction } from "react";
import { Edit, X } from "lucide-react";
import { BaseService } from "@/services/base";
import type { Teacher, TeacherUpdateDto } from "@/types/teacher";
import type z from "zod";
import { TeacherFormFields } from "@/components/forms/teacher-form";
import { Spinner } from "@/components/ui/spinner";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { teacherSchemaDto } from "@/schemas/teacher.schema";
import { Form } from "@/components/ui/form";
import { UserFields } from "@/components/forms/user-form";

export const teacherService = new BaseService<Teacher, any, TeacherUpdateDto>("/teachers");

export function TeacherUpdateDialog({ teacher, id, setOpen }: { teacher: TeacherUpdateDto, id: string, setOpen: Dispatch<SetStateAction<boolean>> }) {
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof teacherSchemaDto>>({
    resolver: zodResolver(teacherSchemaDto),
    defaultValues: {
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      birthDate: teacher.birthDate,
      sex: teacher.sex,
      address: teacher.address,
      phoneNumber: teacher.phoneNumber,
      bio: teacher.bio ?? "",
      matriculeNumber: teacher.matriculeNumber,
    },
  });

  const onSubmit = (values: z.infer<typeof teacherSchemaDto>) => {
    startTransition(async () => {
      try {
        // @ts-expect-error
        const updated = await teacherService.update(id, values);
        toast.success(`${updated.firstName} ${updated.lastName} mis à jour avec succès.`);
        setOpen?.(false);
      } catch (e) {
        console.error("Update error:", e);
        toast.error("Une erreur est survenue lors de la mise à jour.");
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">
          <Edit size={16} /> Modifier
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Modifier l'enseignant</h2>
          <AlertDialogCancel asChild>
            <Button variant="ghost" size="icon-sm">
              <X />
            </Button>
          </AlertDialogCancel>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <UserFields form={form as any} />
              <TeacherFormFields form={form as any} />
            </div>

            <div className="flex justify-end">
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

