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
import { authService, useAuthUser } from "@/services/auth";

export function AppSidebar({ userRole }: { userRole: Role }) {
  const location = useLocation();

  const groupedLinks = useMemo(() => getLinksForRole(userRole), [userRole]);
  const {user} = useAuthUser();

  return (
    <Sidebar className="w-64 text-black dark:text-white">
      <SidebarHeader className="p-4">
        <span className="flex items-center gap-2">
          <img
            src="/images/logo_opendev.webp"
            alt="OpenDev-logo"
            className="w-14 rounded-xl border dark:border-gray-700"
          />
          <span>
            <h1 className="text-xl font-bold tracking-tight">Omega School</h1>
            <p className="text-xs text-muted-foreground">Gestion scolaire</p>
          </span>
        </span>
      </SidebarHeader>

      <div className="px-4"><Separator /></div>

      <SidebarContent>
        {groupedLinks.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel className="uppercase font-semibold mb-1 text-xs">
              {group.group}
            </SidebarGroupLabel>

            <SidebarMenu>
              {group.items.map((link) => (
                <SidebarMenuItem key={link?.id}>
                  <SidebarMenuButton
                    asChild
                    size="lg"
                    className={`py-2 h-10 ${
                      location.pathname === link?.href
                        ? "bg-(--blue) text-white"
                        : ""
                    } hover:bg-[#3f67ec] hover:text-white transition`}
                  >
                    <Link to={link?.href ?? "/profile"}>
                      {link?.icon && <link.icon className="size-4" />}
                      <span className="truncate font-medium">{link?.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 flex flex-col gap-4 border-t border-gray-500/20">
        {user?.role !== "ADMIN" && <SidebarOptInForm />}
        <Button variant="outline" size="lg" onClick={authService.signOut}>
          <LogOut className="w-5 h-5 mr-2" /> Se déconnecter
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}


