import { Mail, Phone, MapPin, Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Facebook, GitHubDark, LinkedIn } from "developer-icons";
import { toast } from "sonner";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-(--blue)">
            Nous contacter
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Une question ? Une demande d'information ? L'équipe d'Omega School
            vous répond rapidement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 md:gap-10 gap-4">
          <div className="space-y-2">
            <Card className="p-6 space-y-2">
              <h2 className="text-xl font-semibold">Informations de contact</h2>

              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-yellow-400" />
                <p className="text-sm text-gray-700">
                  Campus Omega, Lot 100, Antananarivo, Madagascar
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-500" />
                <a
                  href="tel:+261341047894"
                  className="text-sm hover:text-green-600"
                >
                  +261 34 10 478 94
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-sky-400" />
                <a
                  href="mailto:opendevalpha@gmail.com"
                  className="text-sm hover:text-sky-600"
                >
                  opendevalpha@gmail.com
                </a>
              </div>

              <div className="pt-2">
                <h3 className="text-sm font-semibold mb-3">Nos réseaux</h3>
                <div className="flex items-center gap-4">
                  <a
                    href="https://facebook.com/groups/1405028994020652/"
                    className="hover:text-blue-500"
                  >
                    <Facebook size={28} />
                  </a>
                  <a
                    href="mailto:opendevalpha@gmail.com"
                    className="hover:text-blue-400"
                  >
                    <LinkedIn size={32} />
                  </a>
                  <a
                    href="https://github.com/OpenDevMada/"
                    className="hover:text-gray-300"
                  >
                    <GitHubDark size={28} />
                  </a>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Envoyer un message
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Utilisez ce formulaire pour nous écrire rapidement.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Votre nom</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Nom complet"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email">Votre email</Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    placeholder="exemple@gmail.com"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    required
                    placeholder="Votre message..."
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    if (!name || !email || !message) {
                      toast.error("Veuillez remplir tous les champs");
                      return;
                    }
                    toast.promise(
                      new Promise((res) =>
                        setTimeout(() => res("Message envoyé !"), 1500)
                      ),
                      {
                        loading: "Envoi du message...",
                        success: "Message envoyé !",
                        error: "Erreur lors de l'envoi",
                      }
                    );
                    setName("");
                    setEmail("");
                    setMessage("");
                  }}
                >
                  Envoyer <Send />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
