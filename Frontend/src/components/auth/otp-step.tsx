import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { otpSchema, type OtpInput } from "@/schemas/reset-password"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Shield } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Label } from "../ui/label"

interface OtpStepProps {
  value: string
  email: string
  onNext: (otp: string) => Promise<void>
  onBack: () => void
  isLoading?: boolean
}

export function OtpStep({ value, email, onNext, onBack, isLoading = false }: OtpStepProps) {
  const [error, setError] = useState<string>("")
  const [localLoading, setLocalLoading] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
    defaultValues: {
      otp: value ?? "",
    },
  });

  const onSubmit = async (data: OtpInput) => {
    try {
      setError("")
      setLocalLoading(true)
      await onNext(data.otp)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Code OTP invalide")
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

      <Alert className="bg-blue-50 border-blue-200">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-900">
          Un code de vérification a été envoyé à <strong>{email}</strong>
        </AlertDescription>
      </Alert>

      <div className="space-y-4 flex flex-col items-center justify-center">
        <Label htmlFor="otp" className="text-lg font-medium">
          Code de vérification (6 chiffres)
        </Label>

        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={field.value}
              onChange={field.onChange}
              aria-invalid={!!errors.otp}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
                <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        {errors.otp && (
          <p className="text-xs text-destructive">{errors.otp.message}</p>
        )}
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

        <Button
          type="submit"
          className="flex-1"
          disabled={!isValid || isLoading || localLoading}
        >
          {localLoading || isLoading ? (
            <>
              <Spinner className="mr-2" />
              Vérification...
            </>
          ) : (
            "Vérifier le code"
          )}
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Vous n'avez pas reçu le code ?{" "}
        <button
          type="button"
          onClick={onBack}
          className="text-primary hover:underline font-medium"
        >
          Renvoyer
        </button>
      </p>
    </form>
  )
}
