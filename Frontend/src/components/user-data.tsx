import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { JSX } from "react"

type UserDataType = {
  label: string,
  data: JSX.Element[]
}

export const UserData = ({ label, data }: UserDataType) => {
  return (
    <Card className="rounded-lg shadow w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-(--yellow) text-xl">{label}</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">{data}</CardContent>
    </Card>
  )
}