import { Spinner } from "@/components/ui/spinner";
import { useAuthUser  } from "@/services/auth";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { user, loading } = useAuthUser();

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );

  return user ? <Outlet /> : <Navigate to="/login?err=brut-force" />;
}