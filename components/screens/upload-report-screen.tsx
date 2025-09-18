"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileText, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface UploadReportScreenProps {
  onFileUpload: (file: File) => void
}

export function UploadReportScreen({ onFileUpload }: UploadReportScreenProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (isValidFileType(file)) {
        setSelectedFile(file)
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (isValidFileType(file)) {
        setSelectedFile(file)
      }
    }
  }

  const isValidFileType = (file: File) => {
    const validTypes = ["application/pdf", "text/plain", "image/jpeg", "image/png"]
    return validTypes.includes(file.type)
  }

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile)
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Message */}
      <div className="text-center space-y-2">
        <h2 className="font-serif font-bold text-xl text-foreground">Welcome, Alice! 👋</h2>
        <p className="text-muted-foreground font-sans">
          Upload your medical report and we'll help you understand it clearly
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Your Medical Report
          </CardTitle>
          <CardDescription className="font-sans">
            Select your medical report file to get started with AI-powered insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-3">
                <CheckCircle className="h-12 w-12 text-secondary mx-auto" />
                <div>
                  <p className="font-serif font-medium text-foreground">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Button onClick={() => setSelectedFile(null)} variant="outline" size="sm">
                  Choose Different File
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <p className="font-serif font-medium text-foreground">Drop your file here or click to browse</p>
                  <p className="text-sm text-muted-foreground">Drag and drop your medical report</p>
                </div>
                <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                  Choose File
                </Button>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            className="hidden"
          />

          {selectedFile && (
            <Button
              onClick={handleUpload}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold"
              size="lg"
            >
              Upload File
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Supported Formats */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Supported Formats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {[
              { format: "PDF", desc: "Lab reports, test results" },
              { format: "Text", desc: "Typed reports, notes" },
              { format: "JPEG/PNG", desc: "Scanned documents" },
              { format: "All formats", desc: "Up to 10MB file size" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <div>
                  <p className="font-sans font-medium text-sm">{item.format}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Consent */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-secondary" />
            Privacy & Consent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription className="font-sans">
              Your health data is secure with us, Alice. We use end-to-end encryption and never store your personal
              medical information.
            </AlertDescription>
          </Alert>

          <div className="space-y-2 text-sm text-muted-foreground font-sans">
            <p>✓ Data processed locally when possible</p>
            <p>✓ No personal information shared with third parties</p>
            <p>✓ Reports automatically deleted after 24 hours</p>
          </div>

          <Button variant="link" className="p-0 h-auto text-primary font-sans">
            Read our Privacy Policy
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
