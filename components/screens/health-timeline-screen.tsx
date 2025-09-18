"use client"

import { useState } from "react"
import { TrendingUp, Calendar, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface HealthTimelineScreenProps {
  onViewTimeline: () => void
}

export function HealthTimelineScreen({ onViewTimeline }: HealthTimelineScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")

  // Mock health data
  const healthSummary = {
    totalReports: 8,
    lastReport: "2 weeks ago",
    trendingUp: ["Blood Sugar", "HDL Cholesterol"],
    needsAttention: ["Total Cholesterol"],
  }

  const recentReports = [
    {
      date: "Dec 15, 2024",
      type: "Lipid Panel",
      status: "reviewed",
      keyFindings: ["Cholesterol slightly elevated", "HDL improved"],
      trend: "improving",
    },
    {
      date: "Sep 10, 2024",
      type: "Complete Blood Count",
      status: "reviewed",
      keyFindings: ["All values normal", "Iron levels good"],
      trend: "stable",
    },
    {
      date: "Jun 5, 2024",
      type: "Metabolic Panel",
      status: "reviewed",
      keyFindings: ["Glucose excellent", "Kidney function normal"],
      trend: "stable",
    },
  ]

  const periods = [
    { id: "3months", label: "3 Months" },
    { id: "6months", label: "6 Months" },
    { id: "1year", label: "1 Year" },
    { id: "all", label: "All Time" },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Message */}
      <div className="text-center space-y-2">
        <h2 className="font-serif font-bold text-xl text-foreground">Your Health Journey</h2>
        <p className="text-muted-foreground font-sans">Track your progress and see patterns over time</p>
      </div>

      {/* Health Summary */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-card rounded-lg">
              <p className="text-2xl font-serif font-bold text-primary">{healthSummary.totalReports}</p>
              <p className="text-sm text-muted-foreground font-sans">Total Reports</p>
            </div>
            <div className="text-center p-3 bg-card rounded-lg">
              <p className="text-sm font-serif font-medium text-foreground">Last Report</p>
              <p className="text-sm text-muted-foreground font-sans">{healthSummary.lastReport}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-serif font-medium text-foreground mb-2">Trending Up 📈</p>
              <div className="flex flex-wrap gap-2">
                {healthSummary.trendingUp.map((item, index) => (
                  <Badge key={index} className="bg-green-100 text-green-800 font-sans">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-serif font-medium text-foreground mb-2">Needs Attention ⚠️</p>
              <div className="flex flex-wrap gap-2">
                {healthSummary.needsAttention.map((item, index) => (
                  <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800 font-sans">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Period Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Time Period</CardTitle>
          <CardDescription className="font-sans">Choose how far back to view your health data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {periods.map((period) => (
              <Button
                key={period.id}
                variant={selectedPeriod === period.id ? "default" : "outline"}
                onClick={() => setSelectedPeriod(period.id)}
                className="font-sans"
              >
                {period.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Past Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Past Reports</CardTitle>
          <CardDescription className="font-sans">Your recent medical reports and key findings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentReports.map((report, index) => (
            <div key={index} className="p-4 border border-border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-serif font-medium text-foreground">{report.type}</p>
                    <p className="text-sm text-muted-foreground font-sans">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={report.trend === "improving" ? "default" : "secondary"}
                    className={`text-xs font-sans ${
                      report.trend === "improving" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {report.trend === "improving" ? "Improving" : "Stable"}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="pl-7">
                <div className="space-y-1">
                  {report.keyFindings.map((finding, findingIndex) => (
                    <p key={findingIndex} className="text-sm text-muted-foreground font-sans">
                      • {finding}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* View Trends Button */}
      <Card className="bg-gradient-to-r from-secondary/10 to-primary/10 border-secondary/30">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <TrendingUp className="h-12 w-12 text-primary mx-auto" />
            <div>
              <h4 className="font-serif font-bold text-lg text-foreground">See how far you've come, Alice!</h4>
              <p className="text-sm text-muted-foreground font-sans mt-1">
                View your interactive health timeline with detailed trends and patterns
              </p>
            </div>
            <Button
              onClick={onViewTimeline}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              View Trends
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
