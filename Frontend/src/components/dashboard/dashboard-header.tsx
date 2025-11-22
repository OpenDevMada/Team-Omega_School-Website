export function DashboardHeader() {
  return (
    <header>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance text-(--blue)">Dashboard</h1>
          <p className="text-muted-foreground">
            Analyser et visualiser les donnees et statistiques globales chez <strong>Omega school</strong>
          </p>
        </div>
      </div>
    </header>
  )
}
