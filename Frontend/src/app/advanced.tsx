import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CreateAdmin } from "./_components/private/create-admin";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";
import { DeleteAdmin } from "./_components/private/admin-dialog";
import { Separator } from "@/components/ui/separator";

export default function AdvancedSettingsPage() {
  return (
    <div className="flex flex-col items-center md:items-start justify-start min-h-screen w-full md:py-8 py-2">
      <div className="flex text-left w-full md:px-12 px-6 mb-8 flex-col gap-2">
        <h1 className="scroll-m-20 md:text-3xl text-xl font-semibold tracking-tight text-(--blue)">
          Paramètres avancés
        </h1>
        <p className="text-sm text-muted-foreground">
          Gérez les paramètres sensibles de votre compte administrateur
        </p>
      </div>

      <Tabs
        defaultValue="create-admin"
        className="flex flex-col md:px-12 px-2 gap-6 items-center md:items-start"
      >
        <TabsList className="flex h-fit md:flex-row flex-col gap-2 w-full md:w-auto">
          <TabsTrigger value="create-admin">Créer un nouvel admin</TabsTrigger>
          <TabsTrigger value="delete-account">
            Supprimer mon compte admin
          </TabsTrigger>
        </TabsList>

        <div className="flex-1">
          <TabsContent value="create-admin">
            <Card>
              <CardHeader className="mb-1">
                <CardTitle className="tracking-tight md:text-3xl text-xl text-(--blue)">
                  Créer un nouveau compte administrateur
                </CardTitle>
                <CardDescription>
                  Renseigner les informations du nouveau membre admin
                </CardDescription>
              </CardHeader>
              <Separator className="my-2 md:hidden" />
              <CardContent>
                <CreateAdmin />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delete-account">
            <DeleteAdmin id={"ADM-2930"} /> {/* use admin id here */}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
