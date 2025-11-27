import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { statisticService } from '@/services/statistic'
import type { Stat } from '@/types/statistic'
import { BookA, GraduationCap, Users2, UsersRound } from 'lucide-react'
import { groupService } from '@/services/students'

export function StatisticsCards() {
  const [stats, setStats] = useState<Stat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groupLength, setGroupLength] = useState<number>();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const data = await statisticService.getCurrent();
        console.log(data)
        setStats(data)

        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (err) {
        setError('Failed to load statistics')
      } finally {
        setLoading(false)
      }
    }

    fetchStats();
    groupService.getAll().then(data => setGroupLength(data.length));
  }, [])

  const statCards = [
    {
      title: 'Total des etudiants',
      value: stats?.totalStudents ?? 0,
      description: 'Les etudiants actives sur la plateforme',
      icon: <Users2 className={`text-(--blue)`} />,
    },
    {
      title: 'Total des enseignants',
      value: stats?.totalTeachers ?? 0,
      description: 'Encadreurs et instructeurs',
      icon: <GraduationCap className={`text-(--green)`} />,
    },
    {
      title: 'Total des cours',
      value: stats?.totalCourses ?? 0,
      description: 'Cours disponibles',
      icon: <BookA className={`text-(--yellow)`} />,
    },
    {
      title: 'Total des groupes',
      value: groupLength ?? 0,
      description: 'Groupes du lycee',
      icon: <UsersRound className={`text-(--blue)`} />,
    },
  ];

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      {statCards.map((stat) => (
        <Card key={stat.title} className="overflow-hidden">
          <CardHeader className="space-y-0 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 bg-gray-50/70 dark:bg-gray-800/70 rounded-lg`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            ) : (
              <div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}