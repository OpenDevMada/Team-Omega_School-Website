import { ChartsSection } from "@/components/dashboard/chart-section";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { PeriodSelector } from "@/components/dashboard/period-selector";
import { StatisticsCards } from "@/components/dashboard/statistic-card";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="flex md:flex-row flex-col items-center md:items-start justify-between p-2">
        <DashboardHeader />
        <PeriodSelector />
      </div>
      <div className="mx-12 mt-2">
        <Separator />
      </div>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <StatisticsCards />
        <ChartsSection />
      </div>
    </main>
  )
}
