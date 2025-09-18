"use client"

import { useEffect, useState } from "react"
import { Loader2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProcessingScreenProps {
  onComplete: () => void
  onCancel: () => void
}

export function ProcessingScreen({ onComplete, onCancel }: ProcessingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [breathingScale, setBreathingScale] = useState(1)

  const steps = [
    "Analyzing your report...",
    "Identifying key medical terms...",
    "Translating complex language...",
    "Generating insights...",
    "Almost ready!",
  ]

  useEffect(() => {
    // Simulate processing with progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => onComplete(), 500)
          return 100
        }
        return newProgress
      })
    }, 800)

    // Update current step based on progress
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        const newStep = Math.floor((progress / 100) * steps.length)
        return Math.min(newStep, steps.length - 1)
      })
    }, 1000)

    // Breathing animation for calming effect
    const breathingInterval = setInterval(() => {
      setBreathingScale((prev) => (prev === 1 ? 1.1 : 1))
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
      clearInterval(breathingInterval)
    }
  }, [onComplete, progress, steps.length])

  return (
    <div className="p-4 min-h-[calc(100vh-140px)] flex flex-col items-center justify-center space-y-8">
      {/* Calming Animation */}
      <div className="relative">
        <div
          className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center transition-transform duration-2000 ease-in-out"
          style={{ transform: `scale(${breathingScale})` }}
        >
          <Heart
            className="h-12 w-12 text-primary transition-transform duration-2000 ease-in-out"
            style={{ transform: `scale(${breathingScale})` }}
          />
        </div>
        <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-primary/20 animate-pulse" />
      </div>

      {/* Processing Message */}
      <div className="text-center space-y-4 max-w-sm">
        <h2 className="font-serif font-semibold text-xl text-foreground">Your report is in safe hands, Alice</h2>
        <p className="text-muted-foreground font-sans leading-relaxed">
          We're carefully analyzing your medical report to provide you with clear, easy-to-understand insights.
        </p>
      </div>

      {/* Progress Section */}
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-sans font-medium text-foreground">Processing Progress</span>
              <span className="text-sm font-sans text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center gap-3">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="text-sm font-sans text-muted-foreground">{steps[currentStep]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Reassuring Messages */}
      <div className="text-center space-y-3 max-w-sm">
        <div className="space-y-2 text-sm text-muted-foreground font-sans">
          <p>✓ Your data is encrypted and secure</p>
          <p>✓ Processing happens in a protected environment</p>
          <p>✓ We're getting your insights ready</p>
        </div>
      </div>

      {/* Cancel Button */}
      <Button variant="outline" onClick={onCancel} className="mt-8 font-sans bg-transparent">
        Cancel Upload
      </Button>

      {/* Breathing Guide */}
      <div className="text-center space-y-2">
        <p className="text-xs text-muted-foreground font-sans">Take a deep breath while we work</p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
      </div>
    </div>
  )
}
