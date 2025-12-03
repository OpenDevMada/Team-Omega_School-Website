import type { ColumnDef } from "@tanstack/react-table";
import type { Student } from "@/types/student";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, CheckCircle, Edit, XCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DeleteUserButton } from "../delete-button";

export const columns = (
  onEdit: (student: Student) => void,
): ColumnDef<Student>[] => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "registrationNumber",
      header: "Reference"
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nom et prenoms
            <ArrowUpDown size={16} />
          </Button>
        )
      },
      cell: ({ row }) => {
        const s = row.original;
        return (
          <span className="font-medium">{s.firstName} {s.lastName}</span>
        );
      },
    },
    {
      accessorKey: "sex",
      header: "Sexe",
      meta: {
        label: "Status",
        variant: "multiSelect",
        options: [
          { label: "Active", value: "active", icon: CheckCircle },
          { label: "Inactive", value: "inactive", icon: XCircle },
        ],
      },
      enableColumnFilter: true,
      // @ts-expect-error
      cell: ({ row }) => <Badge variant={"outline"} className="capitalize">{row.getValue("sex").toLowerCase()}</Badge>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "address",
      header: "Adresse",
    },
    {
      accessorKey: "phoneNumber",
      header: "Téléphone",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" onClick={() => onEdit(student)}>
                  <Edit className="w-4 h-4 text-(--yellow)" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Modifier
              </TooltipContent>
            </Tooltip>

            <DeleteUserButton user={student} withLabel={false} onSuccess={() => toast.info("Etudiant mis a jour")} />
          </div>
        );
      },
    },
  ];
