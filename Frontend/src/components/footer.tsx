import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";
import { ROUTES } from "@/utils/constants";
import { Facebook, GitHubLight, LinkedIn } from "developer-icons";

export function Footer() {
  return (
    <footer className="w-full bg-[#0F172A] px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <section aria-labelledby="footer-brand">
            <h3 id="footer-brand" className="mb-4 text-xl font-semibold text-[#FACC15]">
              Omega School
            </h3>
            <p className="text-sm text-gray-300">
              Former des esprits curieux, responsables et engagés avec une pédagogie moderne,
              bienveillante et ambitieuse.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link to="https://facebook.com/groups/1405028994020652/" className="hover:text-[#10B981]" aria-label="Facebook">
                <Facebook size={28} />
              </Link>
              <Link to="mailto:opendevalpha@gmail.com" className="hover:text-[#10B981]" aria-label="LinkedIn">
                <LinkedIn size={32} />
              </Link>
              <Link to="https://github.com/OpenDevMada/" className="hover:text-[#10B981]" aria-label="GitHub">
                <GitHubLight size={28} />
              </Link>
            </div>
          </section>

          <nav aria-labelledby="footer-links" className="grid grid-cols-2 gap-6 sm:grid-cols-2">
            <div>
              <h4 id="footer-links" className="mb-4 text-lg font-semibold">
                Liens rapides
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-[#10B981]">Accueil</Link>
                </li>
                <li>
                  <Link to={ROUTES.WEBSITE.ANNOUNCEMENT} className="hover:text-[#10B981]">Annonces</Link>
                </li>
                <li>
                  <Link to={ROUTES.WEBSITE.COURSES} className="hover:text-[#10B981]">Nos cours</Link>
                </li>
                <li>
                  <Link to={ROUTES.WEBSITE.CONTACT} className="hover:text-[#10B981]">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Ressources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/register" className="hover:text-[#10B981]">Admissions</Link>
                </li>
                <li>
                  <Link to="/programmes" className="hover:text-[#10B981]">Programmes</Link>
                </li>
                <li>
                  <Link to="/reglement" className="hover:text-[#10B981]">Règlement intérieur</Link>
                </li>
                <li>
                  <Link to="/parents" className="hover:text-[#10B981]">Espace parents</Link>
                </li>
              </ul>
            </div>
          </nav>

          <section aria-labelledby="footer-contact" className="space-y-4">
            <h4 id="footer-contact" className="text-lg font-semibold">Nous contacter</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-[#FACC15]" />
                <span>Campus Omega, Lot 100, Antananarivo, Madagascar</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#10B981]" />
                <a href="tel:+261341047894" className="hover:text-white">
                  +261 34 10 478 94
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#38BDF8]" />
                <a href="mailto:opendevalpha@gmail.com" className="hover:text-white">
                  opendevalpha@gmail.com
                </a>
              </li>
            </ul>
          </section>

          <section aria-labelledby="footer-newsletter">
            <h4 id="footer-newsletter" className="mb-4 text-lg font-semibold">
              Newsletter
            </h4>
            <p className="mb-3 text-sm text-gray-300">
              Recevez les actualités, événements et inscriptions à venir.
            </p>
            <form
              className="flex w-full max-w-md items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="Votre email"
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none transition focus:border-[#10B981]"
              />
              <button
                type="submit"
                className="rounded-lg bg-[#10B981] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0EA972]"
                aria-label="S'inscrire à la newsletter"
              >
                S'inscrire
              </button>
            </form>
          </section>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-700 pt-6 text-xs text-gray-400 md:flex-row">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} <span className="text-[#FACC15]">Omega School</span> — OpenDev Mada. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-white transition hover:bg-white/10"
              aria-label="Retour en haut de page"
            >
              <ArrowUp className="h-4 w-4" />
              Haut de page
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}