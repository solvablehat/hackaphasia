"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, TrendingUp, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface InsightSummaryScreenProps {
  onViewFullReport: () => void
}

export function InsightSummaryScreen({ onViewFullReport }: InsightSummaryScreenProps) {
  const [currentInsight, setCurrentInsight] = useState(0)

  // Mock data for demonstration
  const insights = [
    {
      title: "Blood Sugar Levels",
      status: "normal",
      value: "95 mg/dL",
      interpretation: "Your glucose levels are within the healthy range",
      context: "This indicates good blood sugar control",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Cholesterol",
      status: "attention",
      value: "210 mg/dL",
      interpretation: "Your total cholesterol is slightly elevated",
      context: "Consider dietary changes and discuss with your doctor",
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Blood Pressure",
      status: "good",
      value: "118/76 mmHg",
      interpretation: "Your blood pressure is in the optimal range",
      context: "Keep up the good work with your current lifestyle",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ]

  const nextSteps = [
    "Continue your current healthy diet",
    "Schedule a follow-up in 3 months",
    "Consider adding more fiber to your meals",
    "Keep monitoring your cholesterol levels",
  ]

  const nextInsight = () => {
    setCurrentInsight((prev) => (prev + 1) % insights.length)
  }

  const prevInsight = () => {
    setCurrentInsight((prev) => (prev - 1 + insights.length) % insights.length)
  }

  const currentData = insights[currentInsight]
  const Icon = currentData.icon

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Message */}
      <div className="text-center space-y-2">
        <h2 className="font-serif font-bold text-xl text-foreground">Great news, Alice! 🎉</h2>
        <p className="text-muted-foreground font-sans">Here are your key takeaways from your latest report</p>
      </div>

      {/* Key Insights Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-lg text-foreground">Your Key Insights</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground font-sans">
              {currentInsight + 1} of {insights.length}
            </span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" onClick={prevInsight} className="p-2 bg-transparent">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={nextInsight} className="p-2 bg-transparent">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Card className="relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-1 h-full ${currentData.bgColor}`} />
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${currentData.bgColor}`}>
                  <Icon className={`h-5 w-5 ${currentData.color}`} />
                </div>
                <div>
                  <CardTitle className="font-serif font-bold text-lg">{currentData.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={
                        currentData.status === "normal" || currentData.status === "good" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {currentData.status === "normal" || currentData.status === "good" ? "Normal" : "Needs Attention"}
                    </Badge>
                    <span className="font-sans font-semibold text-primary">{currentData.value}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-sans font-medium text-foreground">{currentData.interpretation}</p>
              <p className="text-sm text-muted-foreground font-sans mt-1">{currentData.context}</p>
            </div>
          </CardContent>
        </Card>

        {/* Swipe Indicators */}
        <div className="flex justify-center gap-2">
          {insights.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentInsight(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentInsight ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Next Steps</CardTitle>
          <CardDescription className="font-sans">Recommended actions based on your results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </div>
                <p className="font-sans text-sm text-foreground">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Full Report Button */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-serif font-bold text-lg text-foreground">Want to learn more?</h4>
              <p className="text-sm text-muted-foreground font-sans mt-1">
                View your detailed report with explanations for all medical terms
              </p>
            </div>
            <Button
              onClick={onViewFullReport}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold"
            >
              View Full Report
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Celebration Animation for Normal Results */}
      <div className="text-center space-y-2">
        <div className="flex justify-center gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-secondary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground font-sans">Most of your results look great!</p>
      </div>
    </div>
  )
}
