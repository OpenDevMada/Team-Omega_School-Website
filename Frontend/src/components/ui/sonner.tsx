import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: `
            group toast border shadow-lg rounded-lg p-4 transition-all duration-300
            group-[.toaster]:bg-background group-[.toaster]:text-foreground
          `,
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",

          success:
            "bg-green-100 text-green-900 border-green-300 dark:bg-green-900 dark:text-green-100 dark:border-green-700",
          error:
            "bg-red-100 text-red-900 border-red-300 dark:bg-red-900 dark:text-red-100 dark:border-red-700",
          info:
            "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700",
          warning:
            "bg-yellow-100 text-yellow-900 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700",
          loading:
            "bg-gray-100 text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700",
          default:
            "bg-background text-foreground border-border dark:bg-neutral-900 dark:text-neutral-100",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
