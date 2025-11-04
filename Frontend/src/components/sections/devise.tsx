import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function DeviseSection() {
  const values = [
    { mot: "Apprendre", couleur: "#1E40AF" },
    { mot: "Partager", couleur: "#10B981" },
    { mot: "Réussir", couleur: "#FACC15" },
  ];

  return (
    <section className="bg-white py-20 text-center px-6 md:px-16 border-t border-gray-100">
      <motion.h2
        className="text-4xl font-bold text-[#1E40AF] mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Notre Devise
      </motion.h2>

      <motion.p
        className="max-w-2xl mx-auto text-lg text-[#0F172A]/80 mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Trois mots qui définissent notre identité et guident chaque élève dans
        son parcours scolaire.
      </motion.p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-12">
        {values.map((v) => (
          <motion.div
            key={v.mot}
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Star size={64} color={v.couleur} />
            <h3
              className="text-2xl font-bold mt-4"
              style={{ color: v.couleur }}
            >
              {v.mot}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}