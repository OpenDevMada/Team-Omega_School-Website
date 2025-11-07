import { useUser } from "@/context/user";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { user } = useUser();

  return user ? <Outlet /> : <Navigate to={"/login?err=brut-force"} />
}