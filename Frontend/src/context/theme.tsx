import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { Moon, Sun } from "lucide-react";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type ThemeEnum = "light" | "dark";
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
      await new Promise(res => setTimeout(res, 200));
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const ToggleThemeButton2 = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => theme === "dark" ? toggleTheme("light") : toggleTheme("dark")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-4.5">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
            <path d="M12 3l0 18"></path><path d="M12 9l4.65 -4.65"></path>
            <path d="M12 14.3l7.37 -7.37"></path>
            <path d="M12 19.6l8.85 -8.85"></path>
          </svg>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Changer le theme</p>
      </TooltipContent>
    </Tooltip>
  )
}
