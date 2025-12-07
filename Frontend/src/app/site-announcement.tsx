import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarDays } from "lucide-react";

type Announcement = {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
};

const announcements: Announcement[] = [
  {
    id: "1",
    title: "Réunion des enseignants",
    description:
      "Une réunion pédagogique est prévue ce vendredi. Les enseignants sont invités à préparer leurs rapports sur les activités du mois. La présence est obligatoire.",
    author: "Administration",
    createdAt: "2025-02-10",
  },
  {
    id: "2",
    title: "Semaine culturelle",
    description:
      "La semaine culturelle débutera lundi prochain. Les élèves sont encouragés à participer aux différentes activités organisées. Un planning détaillé sera communiqué.",
    author: "Direction",
    createdAt: "2025-02-09",
  },
  {
    id: "3",
    title: "Modification d'emploi du temps",
    description:
      "L'emploi du temps des classes de Terminale a été ajusté. Merci de vérifier les nouveaux horaires disponibles sur votre tableau de bord étudiant.",
    author: "Vie scolaire",
    createdAt: "2025-02-08",
  },
  {
    id: "4",
    title: "Évaluation trimestrielle",
    description:
      "Les évaluations du trimestre débuteront la semaine prochaine. Les élèves doivent vérifier les dates et se préparer en conséquence. Aucun retard ne sera accepté.",
    author: "Professeurs",
    createdAt: "2025-02-06",
  },
  {
    id: "5",
    title: "Nouvel espace bibliothèque",
    description:
      "Omega School ouvre une nouvelle bibliothèque moderne équipée d'espaces de travail collaboratif. Disponibilité dès lundi.",
    author: "Administration",
    createdAt: "2025-11-12",
  },
  {
    id: "6",
    title: "Concours de programmation",
    description:
      "Un concours de programmation inter-établissements aura lieu ce mois-ci. Inscrivez-vous dès maintenant auprès du secrétariat.",
    author: "Bureau des eleves",
    createdAt: "2025-12-1",
  },
  {
    id: "7",
    title: "Mise à jour du portail étudiant",
    description:
      "Le portail étudiant a été mis à jour avec de nouvelles fonctionnalités, dont le suivi des notes en temps réel.",
    author: "Administration",
    createdAt: "2025-12-4",
  }
];

export default function AnnouncementsPage() {
  return (
    <div className="md:p-12 p-4 space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="md:text-3xl text-2xl font-semibold text-(--blue)">
          Annonces récentes
        </h2>
        <p className="text-sm text-muted-foreground">
          Retrouvez ici les annonces importantes publiées par l'établissement.
        </p>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 md:gap-8 gap-4 md:px-12 px-4">
        {announcements.map((a) => (
          <Card
            key={a.id}
            className="flex flex-col group justify-between h-auto shadow-sm hover:shadow-md transition hover:-translate-y-1 duratin-100"
          >
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-lg group-hover:text-(--blue) font-semibold line-clamp-2 whitespace-break-spaces">
                {a.title}
              </CardTitle>
              <Badge className="w-fit bg-linear-to-r from-blue-400 to-blue-600 overflow-hidden">{a.author}</Badge>
            </CardHeader>

            <CardContent className="flex flex-col justify-between h-full">
              <p className="text-sm text-muted-foreground line-clamp-4">
                🙶 {a.description} 🙸
              </p>

              <div className="pt-3 text-xs flex items-center gap-1 justify-end text-right text-muted-foreground">
                <CalendarDays size={15} /> Publié le {format(a.createdAt, "PPP", { locale: fr })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}