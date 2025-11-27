import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { emailSchema, type EmailInput } from "@/schemas/reset-password"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Mail, Send } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

interface EmailStepProps {
  onNext: (email: string) => Promise<void>
  isLoading?: boolean
}

export function EmailStep({ onNext, isLoading = false }: EmailStepProps) {
  const [error, setError] = useState<string>("")
  const [localLoading, setLocalLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  })

  const email = watch("email")

  const onSubmit = async (data: EmailInput) => {
    try {
      setError("")
      setLocalLoading(true)
      await onNext(data.email)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi du code")
    } finally {
      setLocalLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Adresse Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="noreply@email.com"
          disabled={isLoading || localLoading}
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={!isValid || isLoading || localLoading}>
        {localLoading || isLoading ? (
          <>
            <Spinner className="mr-2" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send /> Envoyer le code
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">Vous recevrez un code de vérification à 6 chiffres</p>
    </form>
  )
}
