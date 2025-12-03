import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { statisticService } from '@/services/statistic'
import type { Stat } from '@/types/statistic'
import { DashboardBarChart } from './charts/bar-chart'
import { DashboardPieChart } from './charts/pie-chart'

export function ChartsSection() {
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const data = await statisticService.getGlobalStat()
        setStats(data)
        
        await new Promise(resolve => setTimeout(resolve, 800))
      } catch (err) {
        console.error('Failed to load chart data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    // found other chart to analyze data later...
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Croissance de la plateforme</CardTitle>
          <CardDescription>Comparaison des statistiques du mois</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="w-full h-[300px]" />
          ) : (
            <DashboardBarChart data={stats} />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribution actuelle</CardTitle>
          <CardDescription>Dernieres statistiques marquants</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="w-full h-[300px]" />
          ) : (
            <DashboardPieChart data={stats[stats.length - 1]} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
