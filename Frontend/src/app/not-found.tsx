import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Home } from "lucide-react"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Alert className="max-w-md text-center border border-red-200 dark:border-red-800 bg-white dark:bg-gray-800 shadow-lg p-6 rounded-2xl">
        <AlertTitle className="text-3xl font-bold text-red-600 mb-2">
          404 - Page non trouvée
        </AlertTitle>
        <AlertDescription className="text-gray-700 dark:text-gray-300 mb-6 flex flex-col items-center justify-center">
          Oups. La page que vous recherchez semble ne pas exister ou a été déplacée.
          <Link to={"/"} className={cn(buttonVariants({ variant: "link" }), "flex items-center justify-center gap-2")}>
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>
        </AlertDescription>
      </Alert>
    </div>
  )
}