import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperList,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"
import { EmailStep } from "./email-step"
import { OtpStep } from "./otp-step"
import { PasswordStep } from "./password-step"
import { SuccessStep } from "./sucess-step"
import { Separator } from "../ui/separator"
import { authService } from "@/services/auth"

type StepValue = "email" | "otp" | "password" | "success"

interface Step {
  value: StepValue
  title: string
  description: string
}

export function ForgetAndResetPassword() {
  const steps: Step[] = [
    { value: "email", title: "Adresse Email", description: "Entrez votre email" },
    { value: "otp", title: "Vérifier le code", description: "Entrez le code OTP" },
    { value: "password", title: "Mot de passe", description: "Créez un nouveau mot de passe" },
    { value: "success", title: "Succès", description: "Mot de passe réinitialisé" },
  ]

  const [_, setOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<StepValue>("email")
  const [email, setEmail] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleEmailSubmit = async (emailInput: string) => {
    setIsLoading(true)
    try {
      const res = await authService.sendEmailForResetingPassword({ email: emailInput });
      console.log("Response", res)
      setEmail(emailInput)
      setCurrentStep("otp")
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (otp: string) => {
    setIsLoading(true)
    try {
      const res = await authService.verifyEmailOtp(otp);
      console.log("Response", res)
      if (res.data)
        setCurrentStep("password")
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (password: string) => {
    setIsLoading(true)
    try {
      const res = await authService.resetPassword({ newPassword: password });
      console.log("Response", res)
      setCurrentStep("success")
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    const currentIndex = steps.findIndex((s) => s.value === currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].value)
    }
  }

  const handleClose = () => {
    setOpen(false)
    // Reset state after dialog closes
    setTimeout(() => {
      setCurrentStep("email")
      setEmail("")
    }, 200)
  }

  return (
    <Card className="overflow-hidden border-0">
      <CardHeader>
        <CardTitle className="text-(--blue) tracking-tight text-2xl">Réinitialiser votre mot de passe</CardTitle>
        <CardDescription>
          Suivez les étapes pour réinitialiser votre mot de passe de manière sécurisée
        </CardDescription>
        <Separator />
      </CardHeader>

      <CardContent className="px-6 py-0">
        <Stepper defaultValue={currentStep} orientation="horizontal">
          <StepperList>
            {steps.map((step) => (
              <StepperItem key={step.value} value={step.value}>
                <StepperTrigger>
                  <StepperIndicator />
                  <div className="flex flex-col gap-1">
                    <StepperTitle>{step.title}</StepperTitle>
                    <StepperDescription>{step.description}</StepperDescription>
                  </div>
                </StepperTrigger>
                <StepperSeparator />
              </StepperItem>
            ))}
          </StepperList>
          <Separator />
          <StepperContent value="email" className="flex flex-col gap-4">
            <EmailStep onNext={handleEmailSubmit} isLoading={isLoading} />
          </StepperContent>

          <StepperContent value="otp" className="flex flex-col gap-4">
            <OtpStep email={email} onNext={handleOtpSubmit} onBack={handleBack} isLoading={isLoading} />
          </StepperContent>

          <StepperContent value="password" className="flex flex-col gap-4">
            <PasswordStep onNext={handlePasswordSubmit} onBack={handleBack} isLoading={isLoading} />
          </StepperContent>

          <StepperContent value="success" className="flex flex-col gap-4">
            <SuccessStep onClose={handleClose} />
          </StepperContent>
        </Stepper>
      </CardContent>
    </Card>
  )
}
