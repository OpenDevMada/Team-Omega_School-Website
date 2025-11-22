import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CreateAdmin } from "./_components/private/create-admin";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { DeleteAdmin } from "./_components/private/admin-dialog";

export default function AdvancedSettingsPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full py-8">
      <div className="flex text-left w-full px-12 mb-8 flex-col gap-2">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight text-(--blue)">
          Paramètres avancés
        </h1>
        <p className="text-sm text-muted-foreground">
          Gérez les paramètres sensibles de votre compte administrateur
        </p>
      </div>

      <Tabs
        defaultValue="create-admin"
        className="flex flex-col px-12 gap-6 w-full"
      >
        <TabsList className="flex h-fit ">
          <TabsTrigger value="create-admin">Créer un nouvel admin</TabsTrigger>
          <TabsTrigger value="delete-account">
            Supprimer mon compte admin
          </TabsTrigger>
        </TabsList>

        <div className="flex-1">
          <TabsContent value="create-admin">
            <div className="p-6 border rounded-xl">
              <CardHeader className="mb-1">
                <CardTitle className="tracking-tight text-3xl text-(--blue)">
                  Créer un nouveau compte administrateur
                </CardTitle>
                <CardDescription>
                  Renseigner les informations du nouveau membre admin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CreateAdmin />
              </CardContent>
            </div>
          </TabsContent>

          <TabsContent value="delete-account">
            <DeleteAdmin id={"ADM-2930"} /> {/* use admin id here */}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
