import { motion } from "framer-motion";

export function CallToActionSection() {
  return (
    <section className="relative bg-[#1E40AF] py-24 px-6 md:px-16 text-center text-white overflow-hidden">
      <motion.h2
        className="text-xl md:text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Inscrivez-vous dès maintenant !
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex items-center"
      ></motion.div>

      <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-[#FACC15]/30 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#10B981]/20 rounded-full translate-x-1/2 translate-y-1/2 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-[#FACC15]/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-[#10B981]/30 rounded-full animate-pulse"></div>
    </section>
  );
}