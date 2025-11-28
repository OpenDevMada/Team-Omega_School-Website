import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { gradeService } from "@/services/grade";
import type { GradeRequestDto, GradeResponseDto } from "@/types/grade";
import { toast } from "sonner";
import { gradeSchema } from "@/schemas/grade.schema";
import { Separator } from "../ui/separator";
import { useTransition, type Dispatch, type SetStateAction } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { BookPlus, Edit } from "lucide-react";

type GradeForm = z.infer<typeof gradeSchema>;
type Props = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  mode?: "create" | "update";
  defaultValues?: Partial<GradeForm>;
  onSaved?: (saved: GradeResponseDto) => void;
}

export function GradeFormDialog({
  open,
  setOpen,
  mode = "create",
  defaultValues,
  onSaved,
}: Props) {
  const form = useForm<GradeForm>({
    resolver: zodResolver(gradeSchema),
    defaultValues: {
      studentRegistration: defaultValues?.studentRegistration ?? "",
      courseTitle: defaultValues?.courseTitle ?? "",
      value: defaultValues?.value ?? 0,
      comment: defaultValues?.comment ?? "",
    },
  });

  const [pending, startTransition] = useTransition();

  const submit = form.handleSubmit(async (values) => {
    startTransition(async () => {
      await new Promise(r => setTimeout(r, 2000));
      try {
        const payload: GradeRequestDto = {
          studentRegistration: values.studentRegistration,
          courseTitle: values.courseTitle,
          value: values.value,
          comment: values.comment ?? "",
        };

        if (mode === "create") {
          const created = await gradeService.create(payload);
          toast.success("Note créée");
          onSaved?.(created);
        } else {
          const updated = await gradeService.update(values.studentRegistration, payload);
          toast.success("Note mise à jour");
          onSaved?.(updated);
        }
        setOpen(false);
        form.reset();
      } catch (err) {
        console.error(err);
        toast.error("Une erreur est survenue. Veuillez reessayer");
      }
    });
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {mode === "create" ? <Button className="bg-(--blue) w-auto md:w-auto hover:bg-blue-900 text-white"><BookPlus /> Créer une note</Button> : <Tooltip>
          <TooltipTrigger asChild>
            <Button className="bg-(--yellow) hover:bg-yellow-500 text-white" size={"icon-sm"}><Edit /></Button>
          </TooltipTrigger>
          <TooltipContent>
            Modifier
          </TooltipContent>
        </Tooltip>}
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-(--yellow) text-xl tracking-tight">{mode === "create" ? "Créer une note" : "Modifier la note"}</AlertDialogTitle>
        </AlertDialogHeader>
        <Separator />

        <Form {...form}>
          <form onSubmit={submit} className="space-y-4 py-2">
            <FormField
              control={form.control}
              name="studentRegistration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro d'inscription</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="S-2025-001" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre du cours</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Mathématiques" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note (0 - 20)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.5"
                      min={0}
                      max={20}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commentaire (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter className="flex justify-end gap-2">
              <AlertDialogCancel asChild>
                <Button variant="outline">Annuler</Button>
              </AlertDialogCancel>
              <Button type="submit" disabled={pending}>
                {pending ? "En cours..." : mode === "create" ? "Créer" : "Enregistrer"}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
