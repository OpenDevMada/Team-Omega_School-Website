import { motion } from "framer-motion";
import { BookOpen, Users, Building2 } from "lucide-react";

export function AboutSection() {
  return (
    <section className="bg-[#F8FAFC] py-20 px-6 md:px-16 text-center" id="about">
      <motion.h2
        className="text-4xl font-bold text-[#1E40AF] mb-6"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        À propos
      </motion.h2>

      <motion.p
        className="max-w-3xl mx-auto text-lg text-[#0F172A]/80 leading-relaxed mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Fondé avec la vision de former des élèves curieux, responsables et
        engagés,
        <span className="text-[#1E40AF] font-semibold"> Omega School </span>
        offre un environnement d’apprentissage moderne et épanouissant. Notre
        mission est de favoriser la réussite académique tout en cultivant les
        valeurs humaines et citoyennes.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-8 mt-10">
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          whileHover={{ y: -5 }}
        >
          <BookOpen className="mx-auto mb-4 text-[#1E40AF]" size={40} />
          <h3 className="text-xl font-semibold text-[#0F172A] mb-2">
            Excellence Académique
          </h3>
          <p className="text-[#0F172A]/70 text-sm">
            Des programmes d’études solides et innovants pour former les
            citoyens de demain.
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          whileHover={{ y: -5 }}
        >
          <Users className="mx-auto mb-4 text-[#10B981]" size={40} />
          <h3 className="text-xl font-semibold text-[#0F172A] mb-2">
            Esprit de Communauté
          </h3>
          <p className="text-[#0F172A]/70 text-sm">
            Une école à taille humaine où entraide, respect et inclusion sont au
            cœur de la vie scolaire.
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          whileHover={{ y: -5 }}
        >
          <Building2 className="mx-auto mb-4 text-[#FACC15]" size={40} />
          <h3 className="text-xl font-semibold text-[#0F172A] mb-2">
            Environnement Moderne
          </h3>
          <p className="text-[#0F172A]/70 text-sm">
            Des salles de classe équipées et un cadre propice à l’apprentissage
            et à la créativité.
          </p>
        </motion.div>
      </div>
    </section>
  );
}