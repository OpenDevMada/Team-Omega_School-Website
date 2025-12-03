import type { ColumnDef } from "@tanstack/react-table";
import type { Grade } from "@/types/grade";
import type { Role } from "@/types/user";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { GradeFormDialog } from "./form-dialog";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Spinner } from "../ui/spinner";
import type { Dispatch, SetStateAction } from "react";

export const gradeColumns = (
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  role: Role,
  onDelete?: (g: Grade) => void,
  onRefresh?: () => void,
  loading?: boolean,
): ColumnDef<Grade>[] => {
  const canEdit = role === "ADMIN" || role === "TEACHER";
  const canDelete = role === "ADMIN";

  return [
    {
      id: "select",
      header: ({ table }) => (
        role === "STUDENT" ? null : (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          />
        )
      ),
      cell: ({ row }) =>
        role === "STUDENT" ? null : (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
          />
        ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "studentRegistration",
      header: "Étudiant"
    },
    {
      accessorKey: "courseTitle",
      header: "Cours"
    },
    {
      accessorKey: "value",
      header: "Note"
    },
    {
      accessorKey: "comment",
      header: "Commentaire",
      cell: ({ row }) => <span>{row.original.comment || "Aucun"}</span>
    },
    {
      accessorKey: "createdAt",
      header: "Créé le",
      cell: ({ row }) => (
        <span>{format(row.original.createdAt, "PPP", { locale: fr })}</span>
      )
    },
    {
      accessorKey: "updatedAt",
      header: "Mis à jour",
      cell: ({ row }) => (
        <span>{format(row.original.updatedAt, "PPP", { locale: fr })}</span>
      )
    },

    (canEdit || canDelete
      ? {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const g = row.original;
          return (
            <div className="flex gap-2">
              {canEdit && (
                <GradeFormDialog
                  open={open}
                  setOpen={(value) => !value && setOpen(!value)}
                  mode="update"
                  defaultValues={{
                    studentRegistration: g.studentRegistration,
                    courseTitle: g.courseTitle,
                    value: g.value,
                    comment: g.comment ?? "",
                  }}
                  onSaved={() => onRefresh?.()}
                />
              )}

              {canDelete && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant={"destructive"}
                          size={"icon-sm"}
                          className="flex items-center gap-2"
                        >
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Supprimer cette note de {row.original.studentRegistration}</AlertDialogTitle>
                          <AlertDialogDescription>Etes-vous sure ? Cette action est irreversible.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex items-center gap-4">
                          <Button variant={"destructive"} size={"default"} disabled={loading} onClick={() => onDelete}>
                            {loading ? <Spinner /> : "Continer"}
                          </Button>
                          <AlertDialogCancel asChild>
                            <Button variant={"outline"} size={"default"}>Annuler</Button>
                          </AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TooltipTrigger>
                  <TooltipContent>Supprimer</TooltipContent>
                </Tooltip>
              )}
            </div>
          );
        },
      } : {
        accessorKey: "",
        header: ""
      })
  ];
};