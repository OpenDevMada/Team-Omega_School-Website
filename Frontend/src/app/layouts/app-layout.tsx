import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  LogOut,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SidebarOptInForm } from "@/components/sidebar-opt-in-form";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  let pathname = location.pathname.slice(1);
  let idx = -1;

  if (pathname.includes("/")) {
    idx = pathname.indexOf("/");
  }

  const isTwoPath = idx !== -1;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#F8FAFC]">
        <Sidebar className="w-64 bg-[#1E40AF] text-black">
          <SidebarHeader className="p-4">
            <span className="flex items-center gap-2">
              <img
                src="/logo_opendev.jpg"
                alt="OpenDev-logo"
                className="w-14 rounded-full"
              />
              <h1 className="text-xl font-bold tracking-tight">Omega School</h1>
            </span>
          </SidebarHeader>
          <div className="px-4">
            <Separator color="red" />
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-black mb-2 font-semibold uppercase">
                Main menu
              </SidebarGroupLabel>
              <SidebarMenu>
                {/* Sidebar links */}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 flex flex-col gap-4 border-t border-white/10">
            <SidebarOptInForm />
            <Button variant="outline" size="lg">
              <LogOut className="w-5 h-5 mr-2" /> Se déconnecter
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="flex h-16 items-center sticky top-0 z-10 gap-4 bg-white px-4 shadow-sm">
            <div className="flex items-center gap-4 flex-1">
              <SidebarTrigger className="lg:hidden" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="capitalize">
                    <BreadcrumbPage>
                      {isTwoPath
                        ? pathname.slice(0, idx).toLowerCase()
                        : pathname.toLowerCase()}
                    </BreadcrumbPage>
                    {isTwoPath && (
                      <>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbPage className="capitalize ml-2">
                          {pathname.slice(idx + 1).toLowerCase()}
                        </BreadcrumbPage>
                      </>
                    )}
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex items-center gap-2">
              {/* User image and name */}
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
