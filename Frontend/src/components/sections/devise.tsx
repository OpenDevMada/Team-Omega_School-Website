import { motion } from "framer-motion";
import { Star, Sparkle, Quote } from "lucide-react";

export function DeviseSection() {
  const values = [
    {
      title: "Apprendre",
      color: "#1E40AF",
      description:
        "Cultiver la curiosité et encourager la découverte quotidienne.",
    },
    {
      title: "Partager",
      color: "#10B981",
      description:
        "Créer des liens solides par la collaboration et la solidarité.",
    },
    {
      title: "Réussir",
      color: "#FACC15",
      description:
        "Valoriser les progrès individuels et les réussites collectives.",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-gray-100 bg-white py-24" id="devise">
      <div className="absolute inset-x-0 top-10 flex justify-center">
        <div className="h-24 w-24 rounded-full bg-[#FACC15]/10 blur-3xl" />
      </div>
      <div className="absolute inset-x-0 bottom-10 flex justify-center">
        <div className="h-32 w-32 rounded-full bg-[#10B981]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-14 px-6 text-center md:px-10 lg:px-16">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#1E40AF]/10 px-4 py-2 text-sm font-semibold text-[#1E40AF]">
            <Sparkle className="h-4 w-4" />
            Devise fondatrice
          </span>
          <h2 className="text-4xl font-bold text-[#0F172A] md:text-5xl">
            Trois piliers pour guider nos élèves
          </h2>
          <p className="max-w-2xl text-lg text-[#0F172A]/75">
            Chaque journée à Omega School s'appuie sur des valeurs simples et
            puissantes qui font grandir, fédèrent et inspirent toute notre
            communauté éducative.
          </p>
        </motion.div>

        <div className="grid w-full gap-8 md:grid-cols-3">
          {values.map((value, index) => (
            <motion.article
              key={value.title}
              className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <div
                className="absolute inset-x-6 top-6 h-28 rounded-3xl opacity-20 blur-2xl"
                style={{ backgroundColor: value.color }}
                aria-hidden="true"
              />
              <div className="relative flex flex-col items-center gap-4">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${value.color}1A` }}
                >
                  <Star size={32} color={value.color} />
                </div>
                <h3
                  className="text-2xl font-bold uppercase tracking-wide"
                  style={{ color: value.color }}
                >
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#0F172A]/70">
                  {value.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.blockquote
          className="relative max-w-3xl rounded-3xl border border-[#1E40AF]/10 bg-[#F8FAFC] px-8 py-6 text-left text-[#0F172A]/80 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Quote className="absolute -left-6 -top-6 h-12 w-12 text-[#1E40AF]/20" />
          “Apprendre, partager et réussir ne sont pas que des mots. Ce sont des
          promesses quotidiennes faites à nos élèves et à leurs familles.”
        </motion.blockquote>
      </div>
    </section>
  );
}