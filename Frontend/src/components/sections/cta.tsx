import { motion } from "framer-motion";
import { omegaFlyers } from "../flyers";

export function CallToActionSection() {
  return (
    <section className="relative overflow-hidden bg-[#1E40AF] py-28" id="cta">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-10 right-0 h-56 w-56 rounded-full bg-[#FACC15]/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#10B981]/30 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 text-center text-white md:px-10 lg:px-16">
        <motion.span
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Prochaine rentrée 2025
        </motion.span>

        <motion.h2
          className="text-3xl font-bold md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Rejoignez une école engagée pour la réussite de chaque élève
        </motion.h2>

        <motion.p
          className="max-w-2xl text-base leading-relaxed text-white/80 md:text-lg"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Les pré-inscriptions pour l'année scolaire prochaine sont ouvertes.
          Réservez votre rendez-vous d'orientation et découvrez nos programmes,
          nos activités et notre accompagnement individualisé.
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-3 md:flex-row md:gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <a
            href="#"
            onClick={() => omegaFlyers()}
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
          >
            Télécharger la brochure
          </a>
        </motion.div>

        <motion.div
          className="grid w-full gap-6 text-left text-white/75 md:grid-cols-3"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 transition-all hover:-translate-y-1 backdrop-blur">
            <p className="text-3xl font-bold text-white">+120</p>
            <p className="text-sm uppercase tracking-wider">
              nouvelles places disponibles
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur transition-all hover:-translate-y-1">
            <p className="text-3xl font-bold text-white">15 juin</p>
            <p className="text-sm uppercase tracking-wider">
              clôture des inscriptions
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur transition-all hover:-translate-y-1">
            <p className="text-3xl font-bold text-white">100%</p>
            <p className="text-sm uppercase tracking-wider">
              d'accompagnement personnalisé
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}