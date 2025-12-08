import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, BookPlus, Edit } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { courseSchema } from "@/schemas/course.schema";
import { Spinner } from "../ui/spinner";
import { Combobox, type BaseUser } from "../combobox";
import type { Teacher } from "@/types/teacher";
import { teacherService } from "@/services/teacher";
import { toast } from "sonner";

interface CoursesFormDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mode?: "create" | "update";
  pending: boolean;
  defaultValues?: Partial<z.infer<typeof courseSchema>>;
  onSubmitAction: (
    values: z.infer<typeof courseSchema>
  ) => Promise<void> | void;
  withLabel: boolean
}

export function CoursesFormDialog({
  open,
  setOpen,
  mode = "create",
  pending,
  defaultValues,
  onSubmitAction,
  withLabel
}: CoursesFormDialogProps) {
  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      teacherMatricule: defaultValues?.teacherMatricule || "",
    },
  });

  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const onSubmit = async (values: z.infer<typeof courseSchema>) => {
    await onSubmitAction(values);
    form.reset(values);
  };

  const teacherOptions: BaseUser[] = teachers.map((t) => ({
    id: t.matriculeNumber,
    label: `${t.firstName} ${t.lastName}`,
    number: t.matriculeNumber,
    avatar: t.avatar,
  }));
  

  useEffect(() => {
    teacherService.getAll().then(setTeachers).catch((e: any) => {
      toast.error("Erreur lors du chargement des enseignants");
      console.log("Erreur", e);
    })
  }, []);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {mode === "create" ? (
          <Button size={withLabel ? "default" : "icon-sm"} className="bg-(--yellow) hover:bg-yellow-500 text-white shadow-sm">
            <BookPlus className="w-4 h-4" /> {withLabel ? "Ajouter un cours" : ""}
          </Button>
        ) : (
          <Button variant="outline" size={withLabel ? "default" : "icon-sm"} onClick={() => setOpen(true)} className="text-(--yellow) hover:text-yellow-300">
            <Edit className="w-4 h-4" /> {withLabel ? "Modifier" : ""}
          </Button>
        )}
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <div className="flex justify-between items-start w-full">
            <div>
              <AlertDialogTitle>
                {mode === "create" ? "Créer un nouveau cours" : "Modifier le cours"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {mode === "create" ? "Renseignez les informations du cours." : "Mettez à jour les informations du cours."}
              </AlertDialogDescription>
            </div>
            <AlertDialogCancel asChild>
              <Button variant="ghost" size="icon-sm"><X /></Button>
            </AlertDialogCancel>
          </div>
        </AlertDialogHeader>

        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel>Titre du cours</FormLabel>
                <FormControl><Input placeholder="Ex : Programmation Web" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea placeholder="Ajoutez une description (facultatif)" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField
              control={form.control}
              name="teacherMatricule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matricule du professeur</FormLabel>
                  <Combobox
                    items={teacherOptions}
                    placeholder="Selectionner un professeur"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-2">
              <AlertDialogCancel asChild>
                <Button variant="outline">Annuler</Button>
              </AlertDialogCancel>
              <Button type="submit" disabled={pending} className={`bg-(--yellow) hover:bg-yellow-500 text-white`}>
                {pending ? (mode === "create" ? <><Spinner /> Enregistrement</> : <><Spinner /> Mise à jour</>) : (mode === "create" ? "Créer le cours" : "Mettre à jour")}
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
