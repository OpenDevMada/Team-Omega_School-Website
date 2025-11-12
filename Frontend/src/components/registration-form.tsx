import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useTransition, type Dispatch, type SetStateAction } from "react";
import { Form } from "@/components/ui/form";
import { userSchema } from "@/validation/user";
import { z } from "zod";
import { StudentFormFields } from "./forms/student-form";
import { TeacherFormFields } from "./forms/teacher-form";
import { UserFields } from "./forms/user-form";

export function RegistrationForm({
  isStudent,
  setOpen,
}: {
  isStudent: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: isStudent
      ? {
          role: isStudent ? "STUDENT" : "TEACHER",
          firstName: "",
          lastName: "",
          birthDate: undefined,
          gender: "Pas spécifié",
          email: "",
          phoneNumber: "",
          address: "",
          group: { groupName: "" },
          level: { levelName: "" },
        }
      : {
          role: "TEACHER",
          firstName: "",
          lastName: "",
          birthDate: undefined,
          gender: "Pas spécifié",
          email: "",
          phoneNumber: "",
          address: "",
          courses: [],
          matriculeNumber: "",
        },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 2000));
      try {
        if (values.role === "STUDENT") {
          toast.success(
            `${values.firstName} inscrit avec succes en tant qu'éleve.`
          );
          console.log(values);
          setOpen?.(false);
        } else {
          toast.success(
            `${values.firstName} inscrit avec succes en tant qu'enseignant.`
          );
          console.log(values);
          setOpen?.(false);
        }
      } catch (error: any) {
        toast.error(error?.message);
      } finally {
        form.reset();
      }
    });
  };

  return (
    <CardContent className="p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <UserFields form={form} />

          {isStudent ? (
            <StudentFormFields form={form} />
          ) : (
            <TeacherFormFields form={form} />
          )}

          <div className="md:col-span-2">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Spinner /> &nbsp;Enregistrement...
                </>
              ) : isStudent ? (
                "Inscrire l'élève"
              ) : (
                "Inscrire l'enseignant"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  );
}
