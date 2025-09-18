"use client"

import { useState } from "react"
import { Mic, MicOff, RotateCcw, Volume2, VolumeX, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"

interface ClarityRecorderScreenProps {
  onBack: () => void
}

export function ClarityRecorderScreen({ onBack }: ClarityRecorderScreenProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecording, setHasRecording] = useState(false)
  const [showSimplified, setShowSimplified] = useState(true)
  const [recordingTime, setRecordingTime] = useState(0)
  const [confidenceScore, setConfidenceScore] = useState(92)

  // Mock recorded content
  const originalText = `The patient's lipid profile shows hypercholesterolemia with total cholesterol at 210 mg/dL, which is above the recommended threshold of <200 mg/dL. The HDL cholesterol at 55 mg/dL is within acceptable parameters for cardiovascular protection. I recommend initiating lifestyle modifications including dietary changes with reduced saturated fat intake and increased physical activity. We should consider statin therapy if levels don't improve in 3 months.`

  const simplifiedText = `Your cholesterol test shows that your total cholesterol is a bit high at 210 - we like to see it under 200. The good news is your "good cholesterol" (HDL) at 55 is fine and helps protect your heart. Here's what we'll do: First, let's try changing your diet by eating less saturated fat and exercising more. If your cholesterol doesn't come down in 3 months, we might need to consider cholesterol medication.`

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    // Simulate recording timer
    const timer = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)

    // Auto-stop after demo period
    setTimeout(() => {
      setIsRecording(false)
      setHasRecording(true)
      clearInterval(timer)
    }, 5000)
  }

  const stopRecording = () => {
    setIsRecording(false)
    setHasRecording(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="font-serif font-bold text-xl text-foreground">Clarity Recorder</h2>
        <p className="text-muted-foreground font-sans">
          Record your doctor's explanation, Alice, and we'll help you understand every word
        </p>
      </div>

      {/* Privacy Notice */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-serif font-medium text-foreground">Recording Consent & Privacy</p>
              <p className="text-sm text-muted-foreground font-sans mt-1">
                Make sure you have your doctor's permission to record. All recordings are processed securely and deleted
                after 24 hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recording Section */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Record Explanation</CardTitle>
          <CardDescription className="font-sans">
            Tap the microphone to start recording your doctor's explanation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recording Controls */}
          <div className="text-center space-y-4">
            <div className="relative">
              <Button
                size="lg"
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-20 h-20 rounded-full ${
                  isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-primary hover:bg-primary/90"
                } text-white`}
              >
                {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
              </Button>
              {isRecording && <div className="absolute -inset-2 border-2 border-red-500 rounded-full animate-ping" />}
            </div>

            <div className="space-y-2">
              {isRecording ? (
                <>
                  <p className="font-serif font-medium text-foreground">Recording...</p>
                  <p className="text-lg font-mono text-primary">{formatTime(recordingTime)}</p>
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-red-500 rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 20 + 10}px`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </>
              ) : hasRecording ? (
                <>
                  <p className="font-serif font-medium text-foreground">Recording Complete</p>
                  <p className="text-sm text-muted-foreground font-sans">Tap to record again</p>
                </>
              ) : (
                <>
                  <p className="font-serif font-medium text-foreground">Ready to Record</p>
                  <p className="text-sm text-muted-foreground font-sans">Tap the microphone to start</p>
                </>
              )}
            </div>
          </div>

          {/* Recording Tips */}
          {!hasRecording && (
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm font-serif font-medium text-foreground mb-2">Recording Tips:</p>
              <ul className="text-sm text-muted-foreground font-sans space-y-1">
                <li>• Hold your phone close to your doctor</li>
                <li>• Ask your doctor to speak clearly</li>
                <li>• Record in a quiet environment</li>
                <li>• Get permission before recording</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Doctor's Explanation */}
      {hasRecording && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-serif font-bold text-lg">Your Doctor's Explanation</CardTitle>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-100 text-green-800 font-sans">{confidenceScore}% Confidence</Badge>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-sans text-muted-foreground">
                    {showSimplified ? "Simplified" : "Original"}
                  </span>
                  <Switch checked={showSimplified} onCheckedChange={setShowSimplified} />
                </div>
              </div>
            </div>
            <CardDescription className="font-sans">
              Toggle between original and simplified versions of your doctor's explanation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="font-sans text-foreground leading-relaxed">
                {showSimplified ? simplifiedText : originalText}
              </p>
            </div>

            {/* Translation Confidence */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-sans font-medium text-foreground">Translation Accuracy</span>
                <span className="text-sm font-sans text-muted-foreground">{confidenceScore}%</span>
              </div>
              <Progress value={confidenceScore} className="h-2" />
              <p className="text-xs text-muted-foreground font-sans">
                High confidence - the simplified version accurately represents your doctor's explanation
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setHasRecording(false)} className="font-sans">
                <RotateCcw className="h-4 w-4 mr-2" />
                Record Again
              </Button>
              <Button variant="outline" className="font-sans bg-transparent">
                {showSimplified ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
                Play Audio
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Takeaways */}
      {hasRecording && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif font-bold text-lg">Key Takeaways</CardTitle>
            <CardDescription className="font-sans">Important points from your doctor's explanation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                "Your total cholesterol is slightly high at 210 mg/dL",
                "Your HDL (good cholesterol) is at a healthy level",
                "Try diet and exercise changes first",
                "Follow up in 3 months to check progress",
                "Medication may be needed if lifestyle changes don't help",
              ].map((takeaway, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-secondary/10 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-semibold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="font-sans text-sm text-foreground">{takeaway}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
