import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { passwordSchema, type PasswordInput } from "@/schemas/reset-password"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Check, Eye, EyeOff, Lock, RotateCw } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { PasswordStrengthIndicator } from "./password-strength-indicator"
import { useState as useStateLocal } from "react"
import { tips } from "./password-tips"

interface PasswordStepProps {
  onNext: (password: string) => Promise<void>
  onBack: () => void
  isLoading?: boolean
}

export function PasswordStep({ onNext, onBack, isLoading = false }: PasswordStepProps) {
  const [error, setError] = useState<string>("")
  const [localLoading, setLocalLoading] = useState(false)
  const [showPassword, setShowPassword] = useStateLocal(false)
  const [showConfirm, setShowConfirm] = useStateLocal(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<PasswordInput>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  })

  const password = watch("password")

  const onSubmit = async (data: PasswordInput) => {
    try {
      setError("")
      setLocalLoading(true)
      await onNext(data.password)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la réinitialisation du mot de passe")
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
        <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Nouveau mot de passe
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Minimum 8 caractères"
            disabled={isLoading || localLoading}
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            disabled={isLoading || localLoading}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        {password && <PasswordStrengthIndicator password={password} />}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirmer le mot de passe
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="Confirmez votre mot de passe"
            disabled={isLoading || localLoading}
            aria-invalid={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            disabled={isLoading || localLoading}
          >
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
      </div>

      <div className="space-y-2 rounded-lg bg-amber-50 border border-amber-200 p-3">
        <p className="text-xs font-medium text-amber-900">Exigences du mot de passe :</p>
        <ul className="text-xs text-amber-800 space-y-1 ml-4">
          {tips.map((pwdTips, idx) => (
            <li key={idx} className="flex items-center text-left gap-2">
              <Check size={16} /> {pwdTips}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1 bg-transparent"
          onClick={onBack}
          disabled={isLoading || localLoading}
        >
          Retour
        </Button>
        <Button type="submit" className="flex-1" disabled={!isValid || isLoading || localLoading}>
          {localLoading || isLoading ? (
            <>
              <Spinner className="mr-2" />
              Réinitialisation...
            </>
          ) : (
            <>
              <RotateCw /> Réinitialiser le mot de passe
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
