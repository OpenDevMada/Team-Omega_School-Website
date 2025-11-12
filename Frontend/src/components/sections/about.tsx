import { motion } from "framer-motion";
import { BookOpen, Users, Building2, Compass, Award } from "lucide-react";

export function AboutSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#F8FAFC] py-24"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-[#1E40AF]/10 blur-3xl" />
      <div className="absolute bottom-0 right-10 h-40 w-40 rounded-full bg-[#10B981]/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 md:flex-row md:px-10 lg:px-16">
        <motion.div
          className="flex flex-1 flex-col gap-6 text-left"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium uppercase tracking-[0.3em] text-[#1E40AF]"
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Notre identité
          </motion.span>

          <h2
            id="about-title"
            className="text-4xl font-bold text-[#0F172A] md:text-5xl"
          >
            Une école qui cultive la curiosité et l’excellence
          </h2>

          <p className="text-lg leading-relaxed text-[#0F172A]/80">
            Depuis sa création,
            <span className="text-[#1E40AF] font-semibold">
              {" "}
              Omega School{" "}
            </span>
            s'engage à offrir un enseignement exigeant, créatif et bienveillant.
            Nous plaçons l'élève au centre en valorisant ses talents, en
            encourageant ses ambitions et en développant un esprit citoyen actif.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#1E40AF]/10 bg-white/90 p-6 shadow-sm backdrop-blur">
              <h3 className="text-3xl font-bold text-[#1E40AF]">15+</h3>
              <p className="text-sm uppercase tracking-wide text-[#0F172A]/60">
                années d'expérience éducative
              </p>
            </div>
            <div className="rounded-2xl border border-[#1E40AF]/10 bg-white/90 p-6 shadow-sm backdrop-blur">
              <h3 className="text-3xl font-bold text-[#10B981]">98%</h3>
              <p className="text-sm uppercase tracking-wide text-[#0F172A]/60">
                de réussite aux examens nationaux
              </p>
            </div>
          </div>

          <motion.ul
            className="space-y-3 text-sm text-[#0F172A]/70"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <li className="flex items-start gap-3">
              <Compass className="mt-1 h-5 w-5 text-[#1E40AF]" />
              Un parcours éducatif structuré, de la 6ᵉ à la 3ᵉ.
            </li>
            <li className="flex items-start gap-3">
              <Award className="mt-1 h-5 w-5 text-[#10B981]" />
              Des équipes pédagogiques certifiées et passionnées.
            </li>
            <li className="flex items-start gap-3">
              <Users className="mt-1 h-5 w-5 text-[#FACC15]" />
              Un accompagnement individuel pour chaque famille.
            </li>
          </motion.ul>
        </motion.div>

        <motion.div
          className="flex flex-1 flex-col gap-6"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <motion.article
              className="group rounded-2xl border border-transparent bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:border-[#1E40AF]/20 hover:shadow-xl"
              whileHover={{ y: -4 }}
            >
              <BookOpen className="mb-4 h-10 w-10 text-[#1E40AF]" />
              <h3 className="text-xl font-semibold text-[#0F172A]">
                Excellence Académique
              </h3>
              <p className="mt-3 text-sm text-[#0F172A]/70">
                Des programmes enrichis, des options renforcées et un suivi
                attentif pour révéler le potentiel de chaque élève.
              </p>
            </motion.article>

            <motion.article
              className="group rounded-2xl border border-transparent bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:border-[#10B981]/20 hover:shadow-xl"
              whileHover={{ y: -4 }}
            >
              <Users className="mb-4 h-10 w-10 text-[#10B981]" />
              <h3 className="text-xl font-semibold text-[#0F172A]">
                Esprit de Communauté
              </h3>
              <p className="mt-3 text-sm text-[#0F172A]/70">
                Un cadre familial et solidaire où la coopération, le respect et
                l’entraide sont encouragés au quotidien.
              </p>
            </motion.article>

            <motion.article
              className="group rounded-2xl border border-transparent bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:border-[#FACC15]/20 hover:shadow-xl sm:col-span-2"
              whileHover={{ y: -4 }}
            >
              <Building2 className="mb-4 h-10 w-10 text-[#FACC15]" />
              <h3 className="text-xl font-semibold text-[#0F172A]">
                Environnement Moderne
              </h3>
              <p className="mt-3 text-sm text-[#0F172A]/70">
                Des infrastructures adaptées, des salles connectées et des
                espaces verts pour favoriser l'apprentissage actif et la
                créativité.
              </p>
            </motion.article>
          </div>
        </motion.div>
      </div>
    </section>
  );
}