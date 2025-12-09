import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { RefreshCw, UserCog, Users, Shield } from "lucide-react";
import { toast } from "sonner";
import type { Admin } from "@/types/admin";
import { adminService } from "@/services/admin";
import { AdminDataTable } from "./_components/private/admin-data-table";
import { adminColumns } from "./_components/private/admin-columns";

export default function AdminPanelPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState({
    total: 0,
    fullPermission: 0,
    active: 0,
  });

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllPaginated(0, 100);
      
      const adminsData = Array.isArray(response) ? response : response.content;
      setAdmins(adminsData);

      setStats({
        total: Array.isArray(response) ? response.length : response.totalElements,
        fullPermission: adminsData.filter((a) => a.permission === "FULL").length,
        active: adminsData.filter((a) => !a.mustChangePassword).length,
      });
    } catch (error: any) {
      console.error("Error fetching admins:", error);
      const errorMessage = error?.response?.data?.error || "Erreur lors du chargement";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <UserCog className="h-10 w-10 text-blue-600" />
            Panel Administrateurs
          </h1>
          <p className="text-muted-foreground mt-2">
            Consultez la liste des administrateurs du système
          </p>
        </div>

        <Button
          variant="outline"
          onClick={fetchAdmins}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Actualiser
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Administrateurs enregistrés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permissions Complètes</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.fullPermission}</div>
            <p className="text-xs text-muted-foreground">
              Accès complet au système
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comptes Actifs</CardTitle>
            <UserCog className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-xs text-muted-foreground">
              {stats.total > 0 ? `${Math.round((stats.active / stats.total) * 100)}%` : "0%"} des admins
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Administrateurs</CardTitle>
          <CardDescription>
            Consultez les informations des administrateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <Spinner className="h-8 w-8" />
              <p className="text-muted-foreground">Chargement des administrateurs...</p>
            </div>
          ) : (
            <AdminDataTable columns={adminColumns} data={admins} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
