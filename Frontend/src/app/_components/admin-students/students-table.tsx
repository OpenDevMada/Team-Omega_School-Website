import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, ChevronLeft, ChevronRight, UserX2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { DeleteUserButton } from "../delete-button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Student } from "@/types/student";
import { ButtonGroup } from "@/components/ui/button-group";
import type { Dispatch, SetStateAction } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

type Props = {
  students: Student[];
  totalPages: number;
  currentPage: number;
  loading: boolean;
  onPageChange: Dispatch<SetStateAction<number>>;
};

export function StudentsTable({
  students,
  totalPages,
  currentPage,
  onPageChange,
  loading,
}: Props) {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-700 dark:text-(--blue)">
          Informations des élèves
        </CardTitle>
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
              {loading ? (
                Array.from({ length: students.length }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-5 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-28" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-20" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="h-6 w-12 mx-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : students.length > 0 ? (
                students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <span className="font-medium">
                        {student.firstName} {student.lastName}
                      </span>
                    </TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>{student.address}</TableCell>
                    <TableCell>{student.group.groupName}</TableCell>
                    <TableCell>
                      {format(student.birthDate, "PPP", { locale: fr })}
                    </TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-(--green) dark:hover:text-green-300"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <DeleteUserButton user={student} withLabel={false} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground py-6"
                  >
                    <Empty>
                      <EmptyHeader>
                        <EmptyMedia variant={"icon"}>
                          <UserX2 />
                        </EmptyMedia>
                        <EmptyContent>
                          <EmptyTitle>Aucun élève trouvé</EmptyTitle>
                          <EmptyDescription>
                            Effectuez une autre recherche
                          </EmptyDescription>
                        </EmptyContent>
                      </EmptyHeader>
                    </Empty>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {students.length > 0 && (
          <div className="flex justify-center mt-4 gap-2">
            <ButtonGroup orientation={"horizontal"}>
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
            </ButtonGroup>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
