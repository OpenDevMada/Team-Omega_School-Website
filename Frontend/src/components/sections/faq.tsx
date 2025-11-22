import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, Mail, CalendarCheck } from "lucide-react";

const faqEntries = [
  {
    question: "Comment inscrire mon enfant au collège ?",
    answer:
      "Complétez le formulaire d'inscription en ligne ou contactez notre secrétariat. Nous vous recontactons sous 48 h pour finaliser le dossier et planifier une rencontre.",
  },
  {
    question: "Quelles sont les matières enseignées ?",
    answer:
      "Notre curriculum s'articule autour des matières fondamentales (français, mathématiques, sciences, histoire-géographie), enrichi par l'anglais intensif, les arts créatifs et l'éducation numérique.",
  },
  {
    question: "Comment puis-je contacter un professeur ?",
    answer:
      "Via l'espace famille, vous accédez aux coordonnées de chaque enseignant et pouvez prendre rendez-vous pour un échange personnalisé en présentiel ou en visioconférence.",
  },
  {
    question: "Y a-t-il des activités extrascolaires ?",
    answer:
      "Oui, nous proposons plus de 15 clubs : robotique, théâtre, débats, sports collectifs, musique et ateliers scientifiques ouverts à tous les niveaux.",
  },
  {
    question: "Quelle est la prochaine journée portes ouvertes ?",
    answer:
      "La prochaine rencontre familles se tiendra le 23 février. Les inscriptions sont obligatoires et se font directement depuis notre formulaire de pré-inscription.",
  },
];

export function FaqSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#F1F5F9] py-24"
      id="faq"
      aria-labelledby="faq-title"
    >
      <div className="absolute -left-20 top-12 h-60 w-60 rounded-full bg-[#1E40AF]/10 blur-3xl" />
      <div className="absolute -right-12 bottom-10 h-48 w-48 rounded-full bg-[#10B981]/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:flex-row md:px-10 lg:px-16">
        <motion.aside
          className="flex-1 space-y-8 text-[#0F172A]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#1E40AF]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[#1E40AF]">
            FAQ Omega School
          </span>
          <h2
            id="faq-title"
            className="text-4xl font-bold text-[#0F172A] md:text-5xl"
          >
            Réponses aux questions les plus fréquentes
          </h2>
          <p className="text-base leading-relaxed text-[#0F172A]/80">
            Retrouvez ici les informations clés sur les inscriptions, le
            programme pédagogique ou encore la vie sur le campus. Notre équipe
            reste disponible pour toute question supplémentaire.
          </p>

          <div className="grid gap-4 rounded-3xl bg-white p-6 shadow-lg">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#1E40AF]">
              Contact express
            </h3>
            <div className="flex items-center gap-3 text-sm text-[#0F172A]/75">
              <Phone className="h-5 w-5 text-[#10B981]" />
              +261 34 10 478 94 (lun.-ven. / 8h-17h)
            </div>
            <div className="flex items-center gap-3 text-sm text-[#0F172A]/75">
              <Mail className="h-5 w-5 text-[#1E40AF]" />
              contact@omegaschool.edu
            </div>
            <div className="flex items-center gap-3 text-sm text-[#0F172A]/75">
              <CalendarCheck className="h-5 w-5 text-[#FACC15]" />
              Rendez-vous individuels sur demande
            </div>
          </div>
        </motion.aside>

        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="space-y-4"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            <Accordion
              type="single"
              collapsible
              className="space-y-3 rounded-3xl bg-white p-4 shadow-lg md:p-6"
            >
              {faqEntries.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-item-${index}`}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-[#0F172A] transition hover:text-[#1E40AF]">
                    <span itemProp="name">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-sm leading-relaxed text-[#0F172A]/70"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
