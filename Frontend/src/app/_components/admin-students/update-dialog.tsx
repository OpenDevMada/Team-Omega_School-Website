import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentPostDataSchema } from "@/schemas/student.schema";
import { studentService } from "@/services/students";
import { toast } from "sonner";
import * as z from "zod";
import { UserFields } from "@/components/forms/user-form";
import { StudentFormFields } from "@/components/forms/student-form";
import { useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
import type { Group, Level, Student } from "@/types/student";
import { Separator } from "@/components/ui/separator";

type Props = {
  student: Student | null;
  onClose: () => void;
  onUpdated: () => void;
  groups: Group[];
  levels: Level[];
};

export function StudentUpdateDialog({ student, onClose, onUpdated, groups, levels }: Props) {
  const form = useForm<z.infer<typeof studentPostDataSchema>>({
    resolver: zodResolver(studentPostDataSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: undefined,
      sex: "MASCULIN",
      address: "",
      phoneNumber: "",
      level: "",
      group: ""
    },
  });

  const [pending, startTransition] = useTransition();

  if (!student) return null;

  const onSubmit = (values: z.infer<typeof studentPostDataSchema>) => {
    startTransition(async () => {
      await new Promise(res => setTimeout(res, 2000));
      try {
        // @ts-expect-error
        await studentService.update(student.userId, values);
        toast.success("Étudiant mis à jour");
        onUpdated();
        onClose();
      } catch (e) {
        toast.error("Erreur lors de la mise à jour");
        throw e;
      }
    })
  };

  return (
    <Dialog open={!!student} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier l'étudiant</DialogTitle>
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">

            <div className="grid grid-cols-2 gap-4">
              {/* @ts-expect-error */}
              <UserFields form={form} />
              {/* @ts-expect-error */}
              <StudentFormFields form={form} isEditing groups={groups} levels={levels} />
            </div>

            <Button type="submit" disabled={pending}>
              {pending ? <><Spinner /> Enregistrement...</> : "Enregistrer"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
