import { useState, useTransition, type Dispatch, type SetStateAction } from "react";
import { CoursesFormDialog } from "./form-dialog";
import * as z from "zod";
import { courseSchema } from "@/schemas/course.schema";
import { toast } from "sonner";
import { courseService } from "@/services/courses";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { getAuthentifiedUser } from "@/services/auth";

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export function CoursesHeader({ query, setQuery }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof courseSchema>) => {
    startTransition(async () => {
      await new Promise(res => setTimeout(res, 1500));
      const createdCourse = await courseService.create(values);
      if (createdCourse) {
        toast.success(`Cours crée avec succes`);
        setOpen(false);
      }
    });
  };
  const user = getAuthentifiedUser();
  const descriptionAccordingToUserRole = user?.role === "ADMIN" ? "Gérez les cours" : user?.role === "STUDENT" ? "Découvrez vos cours au sein d'Omega school" : "Voyez les cours auquel vous etes pris en charge"

  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="sm:text-left md:mb-0 mb-8 w-full">
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-(--blue)">
          Les cours
        </h1>
        <p className="text-sm text-muted-foreground">{descriptionAccordingToUserRole}</p>
      </div>

      <div className="flex items-center gap-2 md:max-w-1/2 w-full">
        <div className="relative w-full">
          <Search className="absolute left-2 top-2.5 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Recherche par nom ou prenom"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        {user?.role === "ADMIN" && (
          <CoursesFormDialog
            open={open}
            setOpen={setOpen}
            mode="create"
            onSubmitAction={onSubmit}
            pending={pending}
            withLabel
          />
        )}
      </div>
    </div>
  );
}
