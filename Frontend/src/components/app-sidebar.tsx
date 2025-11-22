import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { getLinksForRole } from "@/config/sidebar-links";
import { SidebarOptInForm } from "@/components/sidebar-opt-in-form";
import { useMemo } from "react";
import type { Role } from "@/types/user";

export function AppSidebar({ userRole }: { userRole: Role }) {
  const location = useLocation();

  const filteredLinks = useMemo(
    () => getLinksForRole(userRole),
    [userRole]
  );

  return (
    <Sidebar className="w-64 text-black dark:text-white">
      <SidebarHeader className="p-4">
        <span className="flex items-center gap-2">
          <img
            src="/images/logo_opendev.jpg"
            alt="OpenDev-logo"
            className="w-14 rounded-xl border dark:border-gray-700"
          />
          <span className="flex flex-col gap-2">
            <h1 className="text-xl font-bold dark:text-white tracking-tight">Omega School</h1>
            <p className="text-xs text-muted-foreground">Gestion scolaire</p>
          </span>
        </span>
      </SidebarHeader>

      <div className="px-4"><Separator /></div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-black dark:text-white mb-2 font-semibold uppercase">
            Menu principal
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              {filteredLinks.map((link) => (
                <SidebarMenuButton
                  key={link.id}
                  className={`py-2 mb-2 h-10 ${location.pathname === link.href ? "bg-(--blue) text-white" : ""
                    } hover:bg-[#3f67ec] hover:text-white dark:text-white transition`}
                  size="lg"
                  asChild
                >
                  <Link to={link.href}>
                    <link.icon className="size-4" />
                    <span className="truncate font-medium">{link.title}</span>
                  </Link>
                </SidebarMenuButton>
              ))}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 flex flex-col gap-4 border-t border-gray-500/20 dark:border-white/20">
        <SidebarOptInForm />
        <Button variant="outline" className="cursor-pointer" size="lg">
          <LogOut className="w-5 h-5 mr-2" /> Se déconnecter
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
