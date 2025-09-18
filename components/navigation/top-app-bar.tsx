"use client"

import type React from "react"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TopAppBarProps {
  title: string
  showBack?: boolean
  onBack?: () => void
  actions?: Array<{
    icon: React.ComponentType<{ className?: string }>
    label: string
    onClick: () => void
  }>
}

export function TopAppBar({ title, showBack, onBack, actions }: TopAppBarProps) {
  return (
    <div className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {showBack && (
            <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="font-serif font-bold text-lg text-primary">{title}</h1>
        </div>

        {actions && (
          <div className="flex items-center gap-2">
            {actions.map((action, index) => {
              const Icon = action.icon
              return (
                <Button key={index} variant="ghost" size="sm" onClick={action.onClick} className="p-2">
                  <Icon className="h-5 w-5" />
                </Button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
