import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { Laptop, Moon, Sun } from "lucide-react";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";

export type ThemeEnum = "light" | "dark" | "system";
export type ThemeContextType = {
  theme: ThemeEnum;
  toggleTheme: (theme: ThemeEnum) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeEnum>("light");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as ThemeEnum) || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = (newTheme?: ThemeEnum) => {
    const nextTheme = newTheme || (theme === "light" ? "dark" : "light");

    if (pending) return <Spinner />

    startTransition(async () => {
      await new Promise(res => setTimeout(res, 2000));
      setTheme(nextTheme);
      localStorage.setItem("theme", nextTheme);
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-sm" title="Changer le thème">
          {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => toggleTheme("light")} className="flex items-center gap-2">
          <Sun className="h-4 w-4" /> Clair
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleTheme("dark")} className="flex items-center gap-2">
          <Moon className="h-4 w-4" /> Sombre
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleTheme("system")} className="flex items-center gap-2">
          <Laptop className="h-4 w-4" /> Système
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}