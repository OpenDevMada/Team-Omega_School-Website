import type { ColumnDef } from "@tanstack/react-table";
import type { Admin } from "@/types/admin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const adminColumns: ColumnDef<Admin>[] = [
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => {
      const admin = row.original;
      const initials = `${admin.firstName[0]}${admin.lastName[0]}`.toUpperCase();
      
      return (
        <Avatar className="h-10 w-10">
          <AvatarImage src={admin.avatar || undefined} alt={`${admin.firstName} ${admin.lastName}`} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "adminId",
    header: "ID Admin",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {row.getValue("adminId")}
      </span>
    ),
  },
  {
    id: "fullName",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: "Nom complet",
    cell: ({ row }) => {
      const admin = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">
            {admin.firstName} {admin.lastName}
          </span>
          <span className="text-xs text-muted-foreground">{admin.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "sex",
    header: "Sexe",
    cell: ({ row }) => {
      const sex = row.getValue("sex") as string;
      return (
        <Badge variant="outline" className="capitalize">
          {sex === "MASCULIN" ? "Masculin" : "Féminin"}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Téléphone",
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.getValue("phoneNumber")}</span>
    ),
  },
  {
    accessorKey: "address",
    header: "Adresse",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground max-w-[200px] truncate block">
        {row.getValue("address")}
      </span>
    ),
  },
  {
    accessorKey: "permission",
    header: "Permission",
    cell: ({ row }) => {
      const permission = row.getValue("permission") as string;
      const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
        FULL: "default",
        READ: "secondary",
        WRITE: "outline",
        DELETE: "destructive",
      };
      
      return (
        <Badge variant={variants[permission] || "secondary"} className="text-white">
          {permission}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "mustChangePassword",
    header: "Status",
    cell: ({ row }) => {
      const mustChange = row.getValue("mustChangePassword") as boolean;
      return mustChange ? (
        <Badge variant="destructive" className="text-xs">
          Changer le mot de passe
        </Badge>
      ) : (
        <Badge variant="secondary" className="text-xs">
          Actif
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: "Créé le",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <span className="text-sm text-muted-foreground">
          {format(date, "PPP", { locale: fr })}
        </span>
      );
    },
  },
];
