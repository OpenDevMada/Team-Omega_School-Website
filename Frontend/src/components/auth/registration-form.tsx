import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  useEffect,
  useState,
  useTransition,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Form } from "@/components/ui/form";
import { userSchema } from "@/validation/user";
import { z } from "zod";
import { studentService } from "@/services/students";
import { type Group, type Level } from "@/types/student";
import { BaseService } from "@/services/base";
import { teacherService } from "@/services/teacher";
import { api } from "@/lib/api";
import { ROUTES } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { UserFields } from "../forms/user-form";
import { StudentFormFields } from "../forms/student-form";
import { TeacherFormFields } from "../forms/teacher-form";

interface RegistrationFormProps {
  isStudent: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  onCreated?: () => void;
  isOnMainRegistration?: boolean;
}

export function RegistrationForm({
  isStudent,
  setOpen,
  onCreated,
  isOnMainRegistration,
}: RegistrationFormProps) {
  const [pending, startTransition] = useTransition();
  const [groups, setGroups] = useState<Group[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [levelService, groupService] = [
    new BaseService<Level, any, any>("/levels"),
    new BaseService<Group, any, any>("/groups"),
  ];
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof userSchema>>({
    defaultValues: isStudent
      ? {
        role: "STUDENT",
        firstName: "",
        lastName: "",
        birthDate: undefined,
        sex: "PAS_SPECIFIE",
        email: "",
        phoneNumber: "",
        address: "",
        level: "",
        group: "",
        emergencyContact: ""
      }
      : {
        role: "TEACHER",
        firstName: "",
        lastName: "",
        birthDate: undefined,
        sex: "PAS_SPECIFIE",
        email: "",
        phoneNumber: "",
        address: "",
        matriculeNumber: "",
        bio: "",
      },
  });

  const onSubmit = (values: z.infer<typeof userSchema>) => {
    const service = values.role === "STUDENT" ? studentService : teacherService;

    startTransition(async () => {
      await new Promise(res => setTimeout(res, 1000));
      try {
        if (isOnMainRegistration) {
          const response = await api.post(ROUTES.WEBSITE.AUTH.SIGN_UP, values);
          if (response.data || response.status in [200, 201, 204]) {
            toast.success(`${response.data.firstName} inscrit avec succès.`);
            navigate("/login");
          }
        } else {
          // @ts-expect-error
          const user = await service.create(values);
          console.log(user, "user");
          const fullName = `${user.firstName} ${user.lastName}`;
          toast.success(`${fullName} inscrit avec succès.`);
        }

        setOpen?.(false);
        onCreated?.();
        form.reset();
      } catch (e) {
        console.error("Registration error:", e);
        toast.error("Une erreur est survenue.");
        throw e;
      }
    });
  };

  useEffect(() => {
    levelService.getAll().then((levels) => setLevels(levels));
    groupService.getAll().then((groups) => setGroups(groups));
  }, []);

  return (
    <CardContent className="p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <UserFields form={form} isOnMainRegistration={isOnMainRegistration} />

          {isStudent ? (
            <StudentFormFields
              form={form}
              groups={groups}
              levels={levels}
            />
          ) : (
            // @ts-expect-error
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
              ) : isOnMainRegistration ? "S'inscrire" : isStudent ? (
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
