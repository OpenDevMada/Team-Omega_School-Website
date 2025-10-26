import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white py-8 px-6 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#FACC15]">
            Omega School
          </h3>
          <p className="text-sm text-gray-300">
            Une plateforme éducative dédiée à l'excellence et à la réussite des
            étudiants malagasy.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#10B981]">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/annonces" className="hover:text-[#10B981]">
                Annonces
              </Link>
            </li>
            <li>
              <Link to="/apropos" className="hover:text-[#10B981]">
                À propos
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#10B981]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-[#10B981]" aria-label="Facebook">
              <Facebook />
            </Link>
            <Link to="#" className="hover:text-[#10B981]" aria-label="Twitter">
              <Twitter />
            </Link>
            <Link to="#" className="hover:text-[#10B981]" aria-label="LinkedIn">
              <Linkedin />
            </Link>
            <Link to="#" className="hover:text-[#10B981]" aria-label="GitHub">
              <Github />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-700 pt-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-[#FACC15]">Omega School</span> — OpenDev Mada.
        Tous droits réservés.
      </div>
    </footer>
  );
}