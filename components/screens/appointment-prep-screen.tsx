"use client"

import { useState } from "react"
import { Calendar, FileText, MessageSquare, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AppointmentPrepScreenProps {
  onPrepareQuestions: (reportId: string) => void
}

export function AppointmentPrepScreen({ onPrepareQuestions }: AppointmentPrepScreenProps) {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  // Mock reports data
  const reports = [
    {
      id: "report-1",
      date: "Dec 15, 2024",
      type: "Lipid Panel",
      status: "recent",
      keyFindings: ["Cholesterol elevated", "HDL improved"],
      concernLevel: "moderate",
    },
    {
      id: "report-2",
      date: "Sep 10, 2024",
      type: "Complete Blood Count",
      status: "normal",
      keyFindings: ["All values normal", "Iron levels good"],
      concernLevel: "low",
    },
    {
      id: "report-3",
      date: "Jun 5, 2024",
      type: "Metabolic Panel",
      status: "normal",
      keyFindings: ["Glucose excellent", "Kidney function normal"],
      concernLevel: "low",
    },
  ]

  const pastPrepLists = [
    {
      date: "Nov 20, 2024",
      appointmentType: "Cardiology Follow-up",
      questionsCount: 8,
      status: "completed",
    },
    {
      date: "Aug 15, 2024",
      appointmentType: "Annual Physical",
      questionsCount: 12,
      status: "completed",
    },
  ]

  const getConcernColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Message */}
      <div className="text-center space-y-2">
        <h2 className="font-serif font-bold text-xl text-foreground">Appointment Prep</h2>
        <p className="text-muted-foreground font-sans">
          Select a report to get ready for your next doctor's visit, Alice
        </p>
      </div>

      {/* Quick Tip */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <MessageSquare className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-serif font-medium text-foreground">💡 Pro Tip</p>
              <p className="text-sm text-muted-foreground font-sans mt-1">
                Focus on your most recent or concerning reports for the best appointment preparation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Your Reports</CardTitle>
          <CardDescription className="font-sans">Choose a report to generate questions for your doctor</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                selectedReport === report.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
              }`}
              onClick={() => setSelectedReport(report.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-serif font-medium text-foreground">{report.type}</p>
                      {report.status === "recent" && (
                        <Badge className="bg-primary/10 text-primary text-xs font-sans">Recent</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground font-sans">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`text-xs font-sans ${getConcernColor(report.concernLevel)}`}>
                    {report.concernLevel === "moderate" ? "Needs Discussion" : "Normal"}
                  </Badge>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onPrepareQuestions(report.id)
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans"
                  >
                    Prepare Questions
                  </Button>
                </div>
              </div>

              <div className="mt-3 pl-8">
                <div className="space-y-1">
                  <p className="text-sm font-serif font-medium text-foreground">Key Findings:</p>
                  {report.keyFindings.map((finding, index) => (
                    <p key={index} className="text-sm text-muted-foreground font-sans">
                      • {finding}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Past Prep Lists */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Past Prep Lists</CardTitle>
          <CardDescription className="font-sans">Your previous appointment preparation sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {pastPrepLists.map((prep, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-serif font-medium text-foreground">{prep.appointmentType}</p>
                    <p className="text-sm text-muted-foreground font-sans">{prep.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-serif font-medium text-foreground">{prep.questionsCount} questions</p>
                    <Badge variant="outline" className="text-xs font-sans">
                      {prep.status}
                    </Badge>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          ))}

          {pastPrepLists.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-sans">No previous preparation sessions yet</p>
              <p className="text-sm text-muted-foreground font-sans mt-1">
                Start by preparing questions for your next appointment
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-secondary/10 to-primary/10 border-secondary/30">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <MessageSquare className="h-12 w-12 text-primary mx-auto" />
            <div>
              <h4 className="font-serif font-bold text-lg text-foreground">Ready to prepare?</h4>
              <p className="text-sm text-muted-foreground font-sans mt-1">
                Select a report above to generate personalized questions for your doctor
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <Button variant="outline" className="font-sans bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add Custom Question
              </Button>
              <Button
                disabled={!selectedReport}
                onClick={() => selectedReport && onPrepareQuestions(selectedReport)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans"
              >
                Generate Questions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
