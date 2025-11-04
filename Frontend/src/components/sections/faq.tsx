import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export function FaqSection() {
  const questions = [
    {
      question: "Comment inscrire mon enfant au collège ?",
      answer:
        "Pour inscrire votre enfant, rendez-vous sur la page 'Inscription', remplissez le formulaire et nous vous contacterons pour finaliser l'inscription.",
    },
    {
      question: "Quelles sont les matières enseignées ?",
      answer:
        "Nous proposons un programme complet comprenant français, mathématiques, sciences, anglais, histoire-géographie, arts et sport.",
    },
    {
      question: "Comment puis-je contacter un professeur ?",
      answer:
        "Vous pouvez contacter les enseignants via l'espace parent ou par email en utilisant les coordonnées fournies par le collège.",
    },
    {
      question: "Y a-t-il des activités extrascolaires ?",
      answer:
        "Oui ! Nous proposons des clubs sportifs, artistiques et scientifiques pour enrichir l'expérience scolaire des élèves.",
    },
  ];

  return (
    <section className="bg-[#F8FAFC] py-20 px-6 md:px-16">
      <motion.h2
        className="text-4xl font-bold text-center text-[#1E40AF] mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Questions fréquentes
      </motion.h2>

      <div className="max-w-3xl mx-auto space-y-4">
        <Accordion type="single" collapsible className="space-y-2">
          {questions.map((q, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-[#0F172A] font-medium text-lg">
                {q.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-sm">
                {q.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}