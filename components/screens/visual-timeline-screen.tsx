"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Minus, ZoomIn, ZoomOut, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface VisualTimelineScreenProps {
  onBack: () => void
}

export function VisualTimelineScreen({ onBack }: VisualTimelineScreenProps) {
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null)
  const [zoomLevel, setZoomLevel] = useState(1)

  // Mock timeline data
  const timelineData = [
    {
      date: "Dec 2024",
      cholesterol: { value: 210, trend: "up", status: "elevated" },
      glucose: { value: 95, trend: "stable", status: "normal" },
      hdl: { value: 55, trend: "up", status: "good" },
      milestone: "Started new diet plan",
    },
    {
      date: "Sep 2024",
      cholesterol: { value: 205, trend: "stable", status: "elevated" },
      glucose: { value: 92, trend: "stable", status: "normal" },
      hdl: { value: 52, trend: "up", status: "good" },
      milestone: null,
    },
    {
      date: "Jun 2024",
      cholesterol: { value: 215, trend: "down", status: "elevated" },
      glucose: { value: 98, trend: "down", status: "normal" },
      hdl: { value: 48, trend: "stable", status: "borderline" },
      milestone: "Annual checkup",
    },
    {
      date: "Mar 2024",
      cholesterol: { value: 220, trend: "up", status: "high" },
      glucose: { value: 102, trend: "up", status: "borderline" },
      hdl: { value: 47, trend: "stable", status: "borderline" },
      milestone: null,
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
      case "good":
        return "bg-green-100 text-green-800"
      case "borderline":
      case "elevated":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Timeline Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-serif font-bold text-lg">Interactive Timeline</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground font-sans">{Math.round(zoomLevel * 100)}%</span>
              <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription className="font-sans">
            Tap any data point to see detailed information. Swipe to navigate through time.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Visual Timeline */}
      <div className="space-y-4" style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}>
        {timelineData.map((dataPoint, index) => (
          <Card key={index} className="relative">
            {dataPoint.milestone && (
              <div className="absolute -top-2 left-4 bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-sans">
                🎯 {dataPoint.milestone}
              </div>
            )}
            <CardHeader className="pb-3">
              <CardTitle className="font-serif font-bold text-lg">{dataPoint.date}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {/* Cholesterol */}
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full" />
                          <div>
                            <p className="font-serif font-medium text-foreground">Total Cholesterol</p>
                            <p className="text-sm text-muted-foreground font-sans">
                              {dataPoint.cholesterol.value} mg/dL
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(dataPoint.cholesterol.trend)}
                          <Badge className={`text-xs font-sans ${getStatusColor(dataPoint.cholesterol.status)}`}>
                            {dataPoint.cholesterol.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="font-serif font-bold">Cholesterol - {dataPoint.date}</DialogTitle>
                      <DialogDescription className="font-sans">
                        Detailed information about this measurement
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <p className="text-2xl font-serif font-bold text-primary">{dataPoint.cholesterol.value}</p>
                          <p className="text-sm text-muted-foreground font-sans">mg/dL</p>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <p className="text-sm font-serif font-medium text-foreground">Status</p>
                          <Badge className={`text-xs font-sans ${getStatusColor(dataPoint.cholesterol.status)}`}>
                            {dataPoint.cholesterol.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-primary/5 rounded-lg">
                        <p className="text-sm font-sans text-foreground">
                          {dataPoint.cholesterol.status === "elevated"
                            ? "Your cholesterol is slightly above the recommended level. Consider dietary changes and regular exercise."
                            : "Your cholesterol levels are within the healthy range. Keep up the good work!"}
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Glucose */}
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                          <div>
                            <p className="font-serif font-medium text-foreground">Blood Glucose</p>
                            <p className="text-sm text-muted-foreground font-sans">{dataPoint.glucose.value} mg/dL</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(dataPoint.glucose.trend)}
                          <Badge className={`text-xs font-sans ${getStatusColor(dataPoint.glucose.status)}`}>
                            {dataPoint.glucose.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="font-serif font-bold">Blood Glucose - {dataPoint.date}</DialogTitle>
                      <DialogDescription className="font-sans">Your blood sugar levels over time</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <p className="text-2xl font-serif font-bold text-primary">{dataPoint.glucose.value}</p>
                          <p className="text-sm text-muted-foreground font-sans">mg/dL</p>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <p className="text-sm font-serif font-medium text-foreground">Status</p>
                          <Badge className={`text-xs font-sans ${getStatusColor(dataPoint.glucose.status)}`}>
                            {dataPoint.glucose.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-secondary/10 rounded-lg">
                        <p className="text-sm font-sans text-foreground">
                          Excellent blood sugar control! Your glucose levels are consistently in the healthy range.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* HDL */}
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-purple-500 rounded-full" />
                          <div>
                            <p className="font-serif font-medium text-foreground">HDL (Good) Cholesterol</p>
                            <p className="text-sm text-muted-foreground font-sans">{dataPoint.hdl.value} mg/dL</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(dataPoint.hdl.trend)}
                          <Badge className={`text-xs font-sans ${getStatusColor(dataPoint.hdl.status)}`}>
                            {dataPoint.hdl.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="font-serif font-bold">HDL Cholesterol - {dataPoint.date}</DialogTitle>
                      <DialogDescription className="font-sans">Your "good" cholesterol levels</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <p className="text-2xl font-serif font-bold text-primary">{dataPoint.hdl.value}</p>
                          <p className="text-sm text-muted-foreground font-sans">mg/dL</p>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <p className="text-sm font-serif font-medium text-foreground">Status</p>
                          <Badge className={`text-xs font-sans ${getStatusColor(dataPoint.hdl.status)}`}>
                            {dataPoint.hdl.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-secondary/10 rounded-lg">
                        <p className="text-sm font-sans text-foreground">
                          {dataPoint.hdl.status === "good"
                            ? "Great job! Your HDL cholesterol is at a healthy level and trending upward."
                            : "Your HDL could be higher. Regular exercise can help boost your good cholesterol."}
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Summary */}
      <Card className="bg-gradient-to-r from-secondary/10 to-primary/10 border-secondary/30">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <TrendingUp className="h-12 w-12 text-primary mx-auto" />
            <div>
              <h4 className="font-serif font-bold text-lg text-foreground">You're making progress, Alice!</h4>
              <p className="text-sm text-muted-foreground font-sans mt-1">
                Your HDL cholesterol has improved by 15% over the past year
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
