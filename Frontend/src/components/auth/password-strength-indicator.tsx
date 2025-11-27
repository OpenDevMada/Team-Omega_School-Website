"use client"

import { useMemo } from "react"

interface PasswordStrengthIndicatorProps {
  password: string
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const strength = useMemo(() => {
    if (!password) return { score: 0, label: "", color: "" }

    let score = 0
    const hasLength = password.length >= 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecial = /[!@#$%^&*]/.test(password)

    if (hasLength) score++
    if (hasUpperCase) score++
    if (hasNumber) score++
    if (hasSpecial) score++

    const labels = ["", "Faible", "Moyen", "Bon", "Très fort"]
    const colors = ["", "bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]

    return { score, label: labels[score], color: colors[score] }
  }, [password])

  if (!password) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Force du mot de passe</span>
        <span className="font-medium">{strength.label}</span>
      </div>
      <div className="flex gap-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${i < strength.score ? strength.color : "bg-muted"}`}
          />
        ))}
      </div>
    </div>
  )
}
