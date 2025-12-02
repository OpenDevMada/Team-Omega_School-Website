import { motion, easeInOut } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Brain,
  Presentation,
  Users,
  Globe2,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const floating = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: easeInOut,
    },
  };

  return (
    <header className="relative overflow-hidden border-b bg-linear-to-br from-[#0F172A] via-[#1E3A8A] to-[#312E81]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-32 top-16 h-64 w-64 rounded-full bg-[#10B981]/30 blur-3xl" />
        <div className="absolute right-12 top-24 h-72 w-72 rounded-full bg-[#FACC15]/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#38BDF8]/20 blur-3xl" />
      </div>

      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-12 px-6 py-28 text-center md:px-10 lg:px-16">
        <motion.div
          animate={floating}
          className="absolute left-8 top-16 hidden text-[#FACC15] opacity-80 lg:inline-flex"
          aria-hidden="true"
        >
          <GraduationCap size={56} />
        </motion.div>

        <motion.div
          animate={{
            ...floating,
            transition: { ...floating.transition, delay: 0.6 },
          }}
          className="absolute right-8 top-10 hidden text-[#22D3EE] opacity-80 lg:inline-flex"
          aria-hidden="true"
        >
          <BookOpen size={48} />
        </motion.div>

        <motion.div
          animate={{
            ...floating,
            transition: { ...floating.transition, delay: 1.2 },
          }}
          className="absolute bottom-12 left-16 hidden text-[#F87171] opacity-80 lg:inline-flex"
          aria-hidden="true"
        >
          <Brain size={52} />
        </motion.div>

        <motion.div
          animate={{
            ...floating,
            transition: { ...floating.transition, delay: 1.8 },
          }}
          className="absolute bottom-10 right-20 hidden text-[#C084FC] opacity-80 lg:inline-flex"
          aria-hidden="true"
        >
          <Presentation size={56} />
        </motion.div>

        <div className="flex flex-col items-center gap-6">
          <motion.span
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-0.5 text-xs font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur"
          >
            Un campus tourné vers l'avenir
          </motion.span>

          <motion.h1
            className="ds-font text-4xl font-bold text-white drop-shadow-md md:text-6xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Apprenons, grandissons et construisons notre avenir
          </motion.h1>

          <motion.p
            className="max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            Le Collège Omega School accompagne chaque élève vers l'excellence
            grâce à un enseignement personnalisé, des activités innovantes et un
            environnement sécurisé où il fait bon apprendre.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex flex-col items-center gap-4 md:flex-row md:gap-6"
        >
          <Link to={ROUTES.WEBSITE.AUTH.SIGN_UP} className={cn("inline-flex items-center gap-2 rounded-full bg-[#10B981] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-[#10B981]/30 transition hover:bg-[#0EA972] hover:shadow-none md:text-lg")}>
            S'inscrire maintenant
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Button
            variant="outline"
            className="inline-flex items-center hover:text-blue-300 gap-2 rounded-full border-white/60 bg-white/10 px-8 py-6 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20 md:text-lg"
          >
            Découvrir l'école
          </Button>
        </motion.div>

        <motion.div
          className="grid w-full gap-6 text-left text-white/80 md:grid-cols-3 md:text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <Users className="h-8 w-8 text-[#FACC15]" />
            <div>
              <p className="text-lg font-semibold text-white">450+ élèves</p>
              <p className="text-sm text-white/70">
                Une communauté bienveillante et inclusive.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <Globe2 className="h-8 w-8 text-[#38BDF8]" />
            <div>
              <p className="text-lg font-semibold text-white">
                Pédagogie bilingue
              </p>
              <p className="text-sm text-white/70">
                Des cours en français et en anglais dès la 6ᵉ.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <Rocket className="h-8 w-8 text-[#10B981]" />
            <div>
              <p className="text-lg font-semibold text-white">Innovation</p>
              <p className="text-sm text-white/70">
                Laboratoires numériques et projets scientifiques.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </header>
  );
}