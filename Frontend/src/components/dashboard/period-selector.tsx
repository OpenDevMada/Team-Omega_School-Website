import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

export function PeriodSelector() {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)

  const periods = [
    { value: 'Actuelle', label: 'Actuelle' },
    { value: '2025-11', label: 'Novembre 2025' },
  ];

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <CardTitle>Selectionner une periode</CardTitle>
          <CardDescription>Choisisser une periode pour voir les statistiques</CardDescription>
          <div className="flex flex-wrap gap-2">
            {periods.map((period) => (
              <Button
                key={period.value}
                variant={selectedPeriod === period.value ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod(period.value)}
              >
                {period.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
