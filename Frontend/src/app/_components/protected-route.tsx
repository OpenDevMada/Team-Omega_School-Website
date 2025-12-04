import { getAuthentifiedUser } from "@/services/auth";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const user = getAuthentifiedUser();

  return user ? <Outlet /> : <Navigate to={"/login?err=brut-force"} />
}