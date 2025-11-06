import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { DeleteUserButton } from "../delete-button";
import { StudentsFilterBar, type StudentsFilterBarProps } from "./students-filter-bar";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Student } from "@/types/student";

type Props = {
  students: Student[];
  totalPages: number;
  currentPage: number;
  onPageChange: (p: number) => void;
} & StudentsFilterBarProps;

export function StudentsTable({ students, totalPages, search, setSearch, currentPage, onPageChange }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-700 dark:text-(--blue)">
          Informations des élèves
        </CardTitle>
        <StudentsFilterBar search={search} setSearch={setSearch} />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-50 dark:bg-gray-950">
              <TableRow>
                <TableHead>Nom et prénoms</TableHead>
                <TableHead>Sexe</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Classe</TableHead>
                <TableHead>Date de naissance</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? Array.from({ length: students.length }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-6 w-12 mx-auto" />
                  </TableCell>
                </TableRow>
              )) : students.length > 0 ? (
                students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <span className="font-medium">{student.firstName} {student.lastName}</span>
                    </TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>{student.address}</TableCell>
                    <TableCell>{student.group.groupName}</TableCell>
                    <TableCell>{format(student.birthDate, "PPP", { locale: fr })}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell className="flex justify-center gap-2">
                      <Button size="icon" variant="ghost" className="text-(--green) dark:hover:text-green-300">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <DeleteUserButton user={student} withLabel={false} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-6">
                    Aucun élève trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-center mt-4 gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              size="sm"
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}