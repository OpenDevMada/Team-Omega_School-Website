import { useState, useTransition } from "react";
import { CoursesFormDialog } from "./form-dialog";
import * as z from "zod";
import { courseSchema } from "@/schemas/course.schema";
import { toast } from "sonner";

export function CoursesHeader() {
  const [open, setOpen] = useState<boolean>(false);
  const [pending, startTransition] = useTransition();
  const onSubmit = async (values: z.infer<typeof courseSchema>) => {
    startTransition(async () => {
      // Add service later...
      await new Promise(res => setTimeout(res, 1500));
      toast.info("Traitement des donnees effectue");
      setOpen(false);
      const valide = z.safeParse(courseSchema, values);
      console.log(valide);
    });
  };
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-(--blue) dark:text-(--dark-blue)">
          Les cours
        </h1>
        <p className="text-sm text-muted-foreground">Gérez les cours</p>
      </div>

      <CoursesFormDialog
        open={open}
        setOpen={setOpen}
        mode="create"
        onSubmitAction={onSubmit}
        pending={pending}
      />
    </div>
  );
}
