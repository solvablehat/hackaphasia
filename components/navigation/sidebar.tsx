"use client"

import { FileText, Clock, Calendar, Wrench, Activity, Upload, BarChart3, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  currentScreen: string
  onScreenChange: (screen: string) => void
}

export function Sidebar({ activeSection, onSectionChange, currentScreen, onScreenChange }: SidebarProps) {
  const sections = [
    {
      id: "reports",
      label: "Medical Reports",
      icon: FileText,
      screens: [
        { id: "upload", label: "Upload Report", icon: Upload },
        { id: "insights", label: "Report Insights", icon: Activity },
        { id: "detailed", label: "Detailed Analysis", icon: BarChart3 },
      ],
    },
    {
      id: "timeline",
      label: "Health Timeline",
      icon: Clock,
      screens: [
        { id: "timeline-hub", label: "Timeline Overview", icon: Clock },
        { id: "visual-timeline", label: "Trends & Analytics", icon: BarChart3 },
      ],
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      screens: [
        { id: "appointment-prep", label: "Preparation", icon: Calendar },
        { id: "suggested-questions", label: "Questions", icon: MessageSquare },
      ],
    },
    {
      id: "tools",
      label: "Tools",
      icon: Wrench,
      screens: [{ id: "clarity-recorder", label: "Clarity Recorder", icon: Wrench }],
    },
  ]

  const handleSubmenuClick = (sectionId: string, screenId: string) => {
    if (activeSection !== sectionId) {
      onSectionChange(sectionId)
    }
    onScreenChange(screenId)
  }

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="font-serif font-bold text-2xl text-primary">MedClarify</h1>
        <p className="text-sm text-muted-foreground mt-1">AI-Powered Medical Report Simplifier</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {sections.map((section) => {
          const SectionIcon = section.icon
          const isActiveSection = activeSection === section.id

          return (
            <div key={section.id} className="space-y-1">
              <Button
                variant={isActiveSection ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-3 h-12", isActiveSection && "bg-primary/10 text-primary")}
                onClick={() => onSectionChange(section.id)}
              >
                <SectionIcon className="h-5 w-5" />
                <span className="font-medium">{section.label}</span>
              </Button>

              {isActiveSection && (
                <div className="ml-8 space-y-1">
                  {section.screens.map((screen) => {
                    const ScreenIcon = screen.icon
                    const isActiveScreen = currentScreen === screen.id

                    return (
                      <Button
                        key={screen.id}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "w-full justify-start gap-2 h-9 text-sm",
                          isActiveScreen && "bg-secondary text-secondary-foreground",
                        )}
                        onClick={() => handleSubmenuClick(section.id, screen.id)}
                      >
                        <ScreenIcon className="h-4 w-4" />
                        {screen.label}
                      </Button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="bg-secondary/50 rounded-lg p-4">
          <h3 className="font-medium text-sm mb-2">Need Help?</h3>
          <p className="text-xs text-muted-foreground mb-3">Get support with understanding your medical reports</p>
          <Button size="sm" className="w-full">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  )
}
