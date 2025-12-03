import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleAlert, Home } from "lucide-react";
import { Link } from "react-router-dom";

export function Error() {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen w-full text-red-700">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <CircleAlert size={24} color="red" />
            Oops — une erreur est survenue
          </CardTitle>
          <Separator className="mt-2 mb-0" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="">
            Essayez de recharger la page ou contactez un administrateur.
          </p>
          <Link to={"/"} className={buttonVariants({ variant: "outline" })}>
            <Home />
            Retour a la page d'accueil
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
