import type { ColumnDef } from "@tanstack/react-table";
import type { Grade } from "@/types/grade";
import type { Role } from "@/types/user";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Spinner } from "../ui/spinner";
import type { Dispatch, SetStateAction } from "react";

export const gradeColumns = (
  setEditingGrade: Dispatch<SetStateAction<Grade | null>>,
  role: Role,
  onDelete?: (g: Grade) => void,
  loading?: boolean
): ColumnDef<Grade>[] => {
  const canEdit = role === "ADMIN" || role === "TEACHER";
  const canDelete = role === "ADMIN";

  const cols: ColumnDef<Grade>[] = [
    {
      id: "select",
      header: ({ table }) =>
        role === "STUDENT" ? null : (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          />
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
      header: "Étudiant",
    },
    {
      accessorKey: "courseTitle",
      header: "Cours",
    },
    {
      accessorKey: "value",
      header: "Note",
      cell: ({ row }) => (
        <span className="font-semibold">{row.original.value}/20</span>
      ),
    },
    {
      accessorKey: "comment",
      header: "Commentaire",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.comment || "Aucun"}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Créé le",
      cell: ({ row }) => format(row.original.createdAt, "PPP", { locale: fr }),
    },
    {
      accessorKey: "updatedAt",
      header: "Mis à jour",
      cell: ({ row }) => format(row.original.updatedAt, "PPP", { locale: fr }),
    },
  ];

  if (canEdit || canDelete) {
    cols.push({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const g = row.original;
        return (
          <div className="flex gap-2">
            {canEdit && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => {
                      setEditingGrade(g);
                    }}
                  >
                    <Edit className="w-4 h-4 text-green-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Modifier</TooltipContent>
              </Tooltip>
            )}

            {canDelete && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Supprimer la note de {g.studentRegistration} ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action est irréversible. La note pour le cours "{g.courseTitle}" sera définitivement supprimée.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                          <Button variant="outline">Annuler</Button>
                        </AlertDialogCancel>
                        <Button
                          variant="destructive"
                          disabled={loading}
                          onClick={() => onDelete?.(g)}
                        >
                          {loading ? (
                            <>
                              <Spinner className="mr-2" />
                              Suppression...
                            </>
                          ) : (
                            "Supprimer"
                          )}
                        </Button>
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
    });
  }

  return cols;
};