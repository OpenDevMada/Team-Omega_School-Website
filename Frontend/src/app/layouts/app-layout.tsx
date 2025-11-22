import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleThemeButton2, ThemeProvider } from "@/context/theme";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";

import { AppSidebar } from "@/components/app-sidebar";
import { getFrenchLabel, getRouteData } from "@/utils/breadcrumb";
import { Home } from "lucide-react";
import { mockStudent } from "@/seeders/user";
import type { Role } from "@/types/user";

export default function AppLayout() {
  const location = useLocation();
  const pathname = location.pathname.slice(1);

  const route = getRouteData(pathname);
  const userRole: Role = "ADMIN";

  const user = mockStudent;

  return (
    <ThemeProvider>
      <SidebarProvider>
        <Toaster position="bottom-center" richColors />

        <div className="flex min-h-screen w-full">

          <AppSidebar userRole={userRole} />

          <div className="flex-1 flex flex-col">
            <header className="flex w-full justify-between dark:border-b dark:border-gray-800 h-16 items-center bg-sidebar sticky top-0 z-5 gap-4 px-4 shadow-sm">
              <SidebarTrigger className="lg:hidden" />

              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                      <div className="flex items-center gap-1">
                        <Home size={16} /> App
                      </div>
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbSeparator>/</BreadcrumbSeparator>

                  <BreadcrumbItem className="capitalize">
                    <BreadcrumbPage>
                      <BreadcrumbPage className="flex items-center gap-1 capitalize">
                        {route?.icon && <route.icon size={16} />}
                        {getFrenchLabel(pathname)}
                      </BreadcrumbPage>
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="flex items-center gap-3">
                <ToggleThemeButton2 />

                <div className="flex items-center gap-2 hover:bg-gray-100 hover:dark:bg-gray-800 py-2 px-3 rounded">
                  <Avatar>
                    <Suspense fallback={<Skeleton />}>
                      {user.avatar && <AvatarImage src={user.avatar} alt={user.firstName} />}
                      <AvatarFallback>{user.firstName[0].toUpperCase()}</AvatarFallback>
                    </Suspense>
                  </Avatar>
                  <p className="text-sm">{user.firstName}</p>
                </div>
              </div>
            </header>

            <main className="flex-1 overflow-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Outlet />
              </motion.div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
