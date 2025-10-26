import { motion, easeInOut } from "framer-motion";
import { GraduationCap, BookOpen, Brain, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    <section className="relative flex flex-col items-center justify-center text-center py-24 px-4 border-b overflow-hidden bg-[#F8FAFC]">
      <motion.div
        animate={floating}
        className="absolute top-12 sm:hidden md:hidden left-16 text-[#1E40AF] opacity-70"
      >
        <GraduationCap size={48} />
      </motion.div>

      <motion.div
        animate={{
          ...floating,
          transition: { ...floating.transition, delay: 1 },
        }}
        className="absolute top-20 right-20 text-[#10B981] opacity-70"
      >
        <BookOpen size={48} />
      </motion.div>

      <motion.div
        animate={{
          ...floating,
          transition: { ...floating.transition, delay: 2 },
        }}
        className="absolute bottom-16 left-24 text-[#FACC15] opacity-70"
      >
        <Brain size={48} />
      </motion.div>

      <motion.div
        animate={{
          ...floating,
          transition: { ...floating.transition, delay: 3 },
        }}
        className="absolute bottom-20 right-24 text-[#1E40AF] opacity-70"
      >
        <Presentation size={48} />
      </motion.div>

      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4 ds-font text-[#0F172A]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Apprenons, grandissons et construisons notre avenir
      </motion.h1>

      <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mb-8">
        Le Collège Omega School : un lieu d’apprentissage, d’excellence et
        d’épanouissement pour chaque élève.
      </p>

      <div className="flex items-center gap-4">
        <Button className="bg-[#10B981] hover:bg-[#0EA972] text-white py-6 text-lg">
          S’inscrire maintenant <ArrowRight />
        </Button>
        <Button
          variant="outline"
          className="text-lg py-6 border-[#1E40AF] text-[#1E40AF]"
        >
          En savoir plus
        </Button>
      </div>
    </section>
  );
}