"use client"

import { useState } from "react"
import { Info, BookOpen, Lightbulb, AlertCircle, CheckCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DetailedReportScreenProps {
  onBack: () => void
}

export function DetailedReportScreen({ onBack }: DetailedReportScreenProps) {
  const [complexityLevel, setComplexityLevel] = useState([2])
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)

  // Mock medical report data
  const reportSections = [
    {
      title: "Your Results",
      items: [
        {
          test: "Glucose (Fasting)",
          value: "95 mg/dL",
          range: "70-100 mg/dL",
          status: "normal",
          explanation: "This measures the amount of sugar in your blood after not eating for at least 8 hours.",
          medicalTerm: "glucose",
          icon: CheckCircle,
          color: "text-green-600",
        },
        {
          test: "Total Cholesterol",
          value: "210 mg/dL",
          range: "<200 mg/dL",
          status: "elevated",
          explanation: "This measures all the cholesterol in your blood, including both good and bad types.",
          medicalTerm: "cholesterol",
          icon: AlertCircle,
          color: "text-yellow-600",
        },
        {
          test: "HDL Cholesterol",
          value: "55 mg/dL",
          range: ">40 mg/dL (men), >50 mg/dL (women)",
          status: "good",
          explanation: "This is the 'good' cholesterol that helps remove bad cholesterol from your arteries.",
          medicalTerm: "HDL",
          icon: TrendingUp,
          color: "text-green-600",
        },
      ],
    },
    {
      title: "Key Findings",
      items: [
        {
          finding: "Lipid Profile Assessment",
          description: "Your cholesterol levels show room for improvement through lifestyle changes.",
          recommendation: "Consider increasing fiber intake and regular exercise.",
          severity: "mild",
        },
        {
          finding: "Metabolic Health",
          description: "Your blood sugar control is excellent, indicating good metabolic function.",
          recommendation: "Continue your current healthy habits.",
          severity: "good",
        },
      ],
    },
  ]

  const medicalTerms = {
    glucose: {
      simple: "Blood sugar - the main source of energy for your body's cells",
      detailed:
        "Glucose is a simple sugar that serves as the primary source of energy for cells throughout your body. It comes from the food you eat and is regulated by hormones like insulin.",
      advanced:
        "Glucose (C₆H₁₂O₆) is a monosaccharide that plays a crucial role in cellular metabolism through glycolysis and the citric acid cycle, with regulation primarily through insulin and glucagon homeostasis.",
    },
    cholesterol: {
      simple: "A waxy substance in your blood that can build up in arteries",
      detailed:
        "Cholesterol is a lipid molecule essential for cell membrane structure and hormone production, but elevated levels can contribute to cardiovascular disease risk.",
      advanced:
        "Cholesterol is a sterol lipid biosynthesized from acetyl-CoA through the mevalonate pathway, serving as a precursor for steroid hormones and bile acids while potentially forming atherosclerotic plaques when oxidized.",
    },
    HDL: {
      simple: "Good cholesterol that helps clean your arteries",
      detailed:
        "High-density lipoprotein (HDL) transports cholesterol from peripheral tissues back to the liver for disposal or recycling, providing cardiovascular protection.",
      advanced:
        "HDL particles facilitate reverse cholesterol transport through ABCA1 and ABCG1 transporters, with apolipoprotein A-I serving as the primary structural protein enabling cholesterol efflux from macrophages.",
    },
  }

  const getComplexityLabel = (level: number) => {
    switch (level) {
      case 1:
        return "Simple"
      case 2:
        return "Detailed"
      case 3:
        return "Advanced"
      default:
        return "Detailed"
    }
  }

  const getExplanation = (term: string, level: number) => {
    const termData = medicalTerms[term as keyof typeof medicalTerms]
    if (!termData) return "Explanation not available"

    switch (level) {
      case 1:
        return termData.simple
      case 2:
        return termData.detailed
      case 3:
        return termData.advanced
      default:
        return termData.detailed
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Progressive Learning Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle className="font-serif font-bold text-lg">Learning Mode</CardTitle>
            </div>
            <Badge variant="outline" className="font-sans">
              {getComplexityLabel(complexityLevel[0])}
            </Badge>
          </div>
          <CardDescription className="font-sans">
            Adjust how detailed you want the medical explanations to be
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Slider
              value={complexityLevel}
              onValueChange={setComplexityLevel}
              max={3}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground font-sans">
              <span>Simple</span>
              <span>Detailed</span>
              <span>Advanced</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Sections */}
      {reportSections.map((section, sectionIndex) => (
        <Card key={sectionIndex}>
          <CardHeader>
            <CardTitle className="font-serif font-bold text-lg">{section.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {section.items.map((item, itemIndex) => {
              if ("test" in item) {
                const Icon = item.icon
                return (
                  <div key={itemIndex} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className={`h-5 w-5 ${item.color}`} />
                        <div>
                          <h4 className="font-serif font-medium text-foreground">{item.test}</h4>
                          <p className="text-sm text-muted-foreground font-sans">Reference: {item.range}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-sans font-semibold text-lg text-primary">{item.value}</p>
                        <Badge
                          variant={item.status === "normal" || item.status === "good" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {item.status === "normal" || item.status === "good" ? "Normal" : "Elevated"}
                        </Badge>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm font-sans text-foreground">{item.explanation}</p>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-sans bg-transparent"
                          onClick={() => setSelectedTerm(item.medicalTerm)}
                        >
                          <Info className="h-4 w-4 mr-2" />
                          Learn more about {item.medicalTerm}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="font-serif font-bold capitalize">{item.medicalTerm}</DialogTitle>
                          <DialogDescription className="font-sans">
                            {getComplexityLabel(complexityLevel[0])} explanation
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="font-sans text-foreground leading-relaxed">
                            {getExplanation(item.medicalTerm, complexityLevel[0])}
                          </p>
                          <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg">
                            <Lightbulb className="h-4 w-4 text-secondary" />
                            <p className="text-sm font-sans text-muted-foreground">
                              Tip: Use the learning mode slider above to adjust explanation complexity
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )
              } else {
                return (
                  <div key={itemIndex} className="p-4 border border-border rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.severity === "good"
                            ? "bg-green-500"
                            : item.severity === "mild"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                      <h4 className="font-serif font-medium text-foreground">{item.finding}</h4>
                    </div>
                    <p className="text-sm font-sans text-muted-foreground">{item.description}</p>
                    <div className="bg-primary/5 p-3 rounded-lg">
                      <p className="text-sm font-sans font-medium text-primary">💡 {item.recommendation}</p>
                    </div>
                  </div>
                )
              }
            })}
          </CardContent>
        </Card>
      ))}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Recommendations</CardTitle>
          <CardDescription className="font-sans">Based on your results, here's what you can do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              "Continue monitoring your blood sugar - it's in excellent range",
              "Consider adding more fiber-rich foods to help with cholesterol",
              "Regular exercise can help improve your HDL (good) cholesterol",
              "Schedule a follow-up with your doctor in 3 months",
            ].map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <p className="font-sans text-sm text-foreground">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
