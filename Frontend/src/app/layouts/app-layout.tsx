import { Link, Outlet, useLocation } from "react-router-dom";
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
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BookOpen,
  CircleQuestionMark,
  LayoutDashboard,
  LogOut,
  User2,
  UserCircle2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarOptInForm } from "@/components/sidebar-opt-in-form";
import { Toaster } from "sonner";

export default function AppLayout() {
  const links = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: User2,
    },
    {
      title: "Cours",
      href: "/courses",
      icon: BookOpen,
    },
    {
      title: "Professeurs",
      href: "/teachers",
      icon: UserCircle2,
    },
    {
      title: "Aide et support",
      href: "/help",
      icon: CircleQuestionMark,
    },
  ];
  const location = useLocation();
  let pathname = location.pathname.slice(1);
  let idx = -1;

  if (pathname.includes("/")) {
    idx = pathname.indexOf("/");
  }

  const isTwoPath = idx !== -1;

  return (
    <SidebarProvider>
      <Toaster />
      <div className="flex min-h-screen w-full">
        <Sidebar className="w-64 text-black">
          <SidebarHeader className="p-4">
            <span className="flex items-center gap-2">
              <img
                src="/images/logo_opendev.jpg"
                alt="OpenDev-logo"
                className="w-14 rounded-xl"
              />
              <span className="flex flex-col gap-2">
                <h1 className="text-xl font-bold tracking-tight">
                  Omega School
                </h1>
                <p className="text-xs text-muted-foreground">
                  Gestion scolaire
                </p>
              </span>
            </span>
          </SidebarHeader>
          <div className="px-4">
            <Separator />
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-black mb-2 font-semibold uppercase">
                Menu principal
              </SidebarGroupLabel>
              <SidebarMenu>
                {/* Sidebar links */}
                <SidebarMenuItem>
                  {links.map((link, idx) => (
                    <SidebarMenuButton
                      className={`py-2 mb-2 h-10 ${
                        link.title.toLowerCase() == pathname
                          ? "bg-(--blue) text-white"
                          : null
                      } hover:bg-[#3f67ec] hover:text-white transition duration-150`}
                      size={"lg"}
                      key={idx}
                      title={link.title}
                      asChild
                    >
                      <Link to={link.href}>
                        <link.icon className="size-4" />
                        <div className="grid flex-1 text-left text-md leading-tight">
                          <span className="truncate font-medium text-[15px]">
                            {link.title}
                          </span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  ))}
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 flex flex-col gap-4 border-t border-white/10">
            <SidebarOptInForm />
            <Button
              variant="outline"
              className="cursor-pointer"
              title="Se déconnecter"
              size="lg"
            >
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

            <div className="flex items-center gap-2 hover:bg-gray-100 transition duration-150 py-2 px-3 rounded">
              <Avatar>
                <Suspense fallback={<Skeleton />}>
                  <AvatarImage
                    src={"https://randomuser.me/api/portraits/men/1.jpg"}
                    alt={"student"}
                  />
                </Suspense>
              </Avatar>
              <p className="text-sm">Clerck</p>
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
  );
}
