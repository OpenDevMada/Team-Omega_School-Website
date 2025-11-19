import { sidebarLinks } from "@/config/sidebar-links";

export const getFrenchLabel = (path: string) => {
  const found = sidebarLinks.find((l) => l.id === path);
  return found ? found.title : path;
};

export const getRouteData = (pathname: string) => {
  return sidebarLinks.find((link) => link.href.slice(1) === pathname);
};
