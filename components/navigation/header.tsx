"use client"

import { ArrowLeft, Share, Settings, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  title: string
  breadcrumbs: Array<{ label: string; href: string }>
  currentScreen: string
  onBack?: () => void
}

export function Header({ title, breadcrumbs, currentScreen, onBack }: HeaderProps) {
  const shouldShowBack = () => {
    const noBackScreens = ["upload", "timeline-hub", "appointment-prep", "clarity-recorder"]
    return !noBackScreens.includes(currentScreen)
  }

  const getHeaderActions = () => {
    switch (currentScreen) {
      case "insights":
        return [
          {
            icon: Share,
            label: "Share Insights",
            onClick: () => console.log("Share insights clicked"),
          },
          {
            icon: Download,
            label: "Download Report",
            onClick: () => console.log("Download clicked"),
          },
          {
            icon: Settings,
            label: "Settings",
            onClick: () => console.log("Settings clicked"),
          },
        ]
      case "detailed":
        return [
          {
            icon: Share,
            label: "Share Report",
            onClick: () => console.log("Share detailed report clicked"),
          },
          {
            icon: Download,
            label: "Download",
            onClick: () => console.log("Download detailed report clicked"),
          },
        ]
      case "visual-timeline":
        return [
          {
            icon: Settings,
            label: "Filter & Compare",
            onClick: () => console.log("Filter/Compare clicked"),
          },
        ]
      default:
        return []
    }
  }

  return (
    <div className="bg-card border-b border-border">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {shouldShowBack() && onBack && (
              <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}

            <div>
              {breadcrumbs.length > 1 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  {breadcrumbs.slice(0, -1).map((crumb, index) => (
                    <span key={index}>
                      {crumb.label}
                      <span className="mx-2">/</span>
                    </span>
                  ))}
                </div>
              )}
              <h1 className="font-serif font-bold text-2xl text-primary">{title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {getHeaderActions().map((action, index) => {
              const Icon = action.icon
              return (
                <Button key={index} variant="outline" size="sm" onClick={action.onClick}>
                  <Icon className="h-4 w-4 mr-2" />
                  {action.label}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
