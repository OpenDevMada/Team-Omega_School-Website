import { Link } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";
import { Menu, GraduationCap } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ROUTES } from "@/utils/constants";

export function Header() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="sticky w-full top-0 z-30 bg-white/40 backdrop-blur-3xl border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="text-[#1E40AF]" size={28} />
          <span className="text-2xl font-bold text-[#1E40AF]">
            Omega School
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 ml-8 text-[#0F172A] font-medium">
          <Link to="/" className="hover:text-[#1E40AF] transition">
            Accueil
          </Link>
          <Link to={ROUTES.WEBSITE.COURSES} className="hover:text-[#1E40AF] transition">
            Nos cours
          </Link>
          <Link to={ROUTES.WEBSITE.ANNOUNCEMENT} className="hover:text-[#1E40AF] transition">
            Annonces
          </Link>
          <Link to="/contact" className="hover:text-[#1E40AF] transition">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to={ROUTES.WEBSITE.AUTH.SIGN_IN}
            className={buttonVariants({
              variant: null,
              className:
                "border border-(--blue) text-(--blue) hover:text-white hover:bg-(--blue) transition",
            })}
          >
            Connexion
          </Link>
          <Link
            to={ROUTES.WEBSITE.AUTH.SIGN_UP}
            className={buttonVariants({
              variant: null,
              className:
                "bg-[#10B981] hover:bg-[#0EA972] text-white transition",
            })}
          >
            S'inscrire
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px]">
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold">
                  Menu principal
                </SheetTitle>
              </SheetHeader>
              <div className="md:hidden w-full border-t flex flex-col items-start gap-4 p-4 text-[#0F172A] font-medium">
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="hover:text-[#1E40AF]"
                >
                  Accueil
                </Link>
                <Link
                  to={ROUTES.WEBSITE.ANNOUNCEMENT}
                  onClick={() => setOpen(false)}
                  className="hover:text-[#1E40AF]"
                >
                  Annonces
                </Link>
                <Link
                  to={ROUTES.WEBSITE.COURSES}
                  onClick={() => setOpen(false)}
                  className="hover:text-[#1E40AF]"
                >
                  Nos cours
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="hover:text-[#1E40AF]"
                >
                  Contact
                </Link>
                <div className="flex w-full gap-3 items-center">
                  <Link
                    to={ROUTES.WEBSITE.AUTH.SIGN_IN}
                    className={buttonVariants({
                      variant: "outline",
                      className: "border-[#1E40AF] text-[#1E40AF]",
                    })}
                    onClick={() => setOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    to={ROUTES.WEBSITE.AUTH.SIGN_UP}
                    className={buttonVariants({
                      className: "bg-[#10B981] text-white hover:bg-[#0EA972]",
                    })}
                    onClick={() => setOpen(false)}
                  >
                    S'inscrire
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}