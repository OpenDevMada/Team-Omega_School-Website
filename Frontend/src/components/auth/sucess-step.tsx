import { buttonVariants } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"

interface SuccessStepProps {
  onClose: () => void
}

export function SuccessStep({ onClose }: SuccessStepProps) {
  return (
    <div className="space-y-4 text-center">
      <div className="flex justify-center mb-4">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <Alert className="bg-green-50 flex items-center text-left border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-900">
          Votre mot de passe a été réinitialisé avec succès ! <br/>
          Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
        </AlertDescription>
      </Alert>

      <Link to={"/login"} onClick={onClose} className={buttonVariants({variant: "default", className: "w-full"})}>
        Aller se connecter
        <ArrowRight />
      </Link>
    </div>
  )
}
