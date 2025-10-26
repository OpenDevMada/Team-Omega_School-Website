import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { Menu, X, GraduationCap } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
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
          <Link to="/courses" className="hover:text-[#1E40AF] transition">
            Nos cours
          </Link>
          <Link to="/announcement" className="hover:text-[#1E40AF] transition">
            Annonces
          </Link>
          <Link to="/contact" className="hover:text-[#1E40AF] transition">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className={buttonVariants({
              variant: "ghost",
              className:
                "border border-[#1E40AF] text-[#1E40AF] transition",
            })}
          >
            Connexion
          </Link>
          <Link
            to="/register"
            className={buttonVariants({
              className:
                "bg-[#10B981] hover:bg-[#0EA972] text-white transition",
            })}
          >
            S'inscrire
          </Link>
        </div>

        <button
          className="md:hidden text-[#1E40AF]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t flex flex-col items-center gap-4 py-4 text-[#0F172A] font-medium">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="hover:text-[#1E40AF]"
          >
            Accueil
          </Link>
          <Link
            to="/annonces"
            onClick={() => setOpen(false)}
            className="hover:text-[#1E40AF]"
          >
            Annonces
          </Link>
          <Link
            to="#about"
            onClick={() => setOpen(false)}
            className="hover:text-[#1E40AF]"
          >
            À propos
          </Link>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="hover:text-[#1E40AF]"
          >
            Contact
          </Link>
          <div className="flex gap-3">
            <Link
              to="/login"
              className={buttonVariants({
                variant: "outline",
                className: "border-[#1E40AF] text-[#1E40AF]",
              })}
              onClick={() => setOpen(false)}
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className={buttonVariants({
                className: "bg-[#10B981] text-white hover:bg-[#0EA972]",
              })}
              onClick={() => setOpen(false)}
            >
              S'inscrire
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}