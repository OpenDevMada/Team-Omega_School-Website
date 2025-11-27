import { z } from "zod"

export const emailSchema = z.object({
  email: z.string().min(1, "L'email est requis").email("Veuillez entrer une adresse email valide"),
})

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "Le code OTP doit contenir 6 chiffres")
    .regex(/^\d+$/, "Le code OTP ne doit contenir que des chiffres"),
})

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
      .regex(/[!@#$%^&*]/, "Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*)"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

export type EmailInput = z.infer<typeof emailSchema>
export type OtpInput = z.infer<typeof otpSchema>
export type PasswordInput = z.infer<typeof passwordSchema>
