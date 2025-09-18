"use client";

import { useState } from "react";
import { Sidebar } from "@/components/navigation/sidebar";
import { Header } from "@/components/navigation/header";
import { UploadReportScreen } from "@/components/screens/upload-report-screen";
import { ProcessingScreen } from "@/components/screens/processing-screen";
import { InsightSummaryScreen } from "@/components/screens/insight-summary-screen";
import { DetailedReportScreen } from "@/components/screens/detailed-report-screen";
import { HealthTimelineScreen } from "@/components/screens/health-timeline-screen";
import { VisualTimelineScreen } from "@/components/screens/visual-timeline-screen";
import { AppointmentPrepScreen } from "@/components/screens/appointment-prep-screen";
import { SuggestedQuestionsScreen } from "@/components/screens/suggested-questions-screen";
import { ClarityRecorderScreen } from "@/components/screens/clarity-recorder-screen";
import { getNER } from "../projectService.js";
import * as pdfjsLib from "pdfjs-dist"; // Add this import for PDF parsing

// Set the worker source for pdfjs-dist (required for client-side usage)
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function Home() {
  const [activeSection, setActiveSection] = useState("reports");
  const [currentScreen, setCurrentScreen] = useState("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);

    // Extract text from the PDF
    let extractedText = "";
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText += textContent.items.map((item: any) => item.str).join(" ") + "\n";
      }
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      // Proceed even if extraction fails, to avoid blocking the UI
    }

    // Call getNER with the extracted text and log the result
    if (extractedText.trim()) {
      try {
        const nerResult = await getNER(extractedText);
        console.log("NER Result:", nerResult); // Log the result as requested
      } catch (error) {
        console.error("Error calling getNER:", error);
      }
    } else {
      console.warn("No text extracted from PDF; skipping getNER call.");
    }

    // Proceed with the existing flow
    setCurrentScreen("processing");
  };

  const handleProcessingComplete = () => {
    setCurrentScreen("insights");
  };

  const handleViewFullReport = () => {
    setCurrentScreen("detailed");
  };

  const handleBackToInsights = () => {
    setCurrentScreen("insights");
  };

  const handleBackToUpload = () => {
    setCurrentScreen("upload");
    setUploadedFile(null);
  };

  const handleViewTimeline = () => {
    setCurrentScreen("visual-timeline");
  };

  const handleBackToTimelineHub = () => {
    setCurrentScreen("timeline-hub");
  };

  const handlePrepareQuestions = (reportId: string) => {
    setSelectedReportId(reportId);
    setCurrentScreen("suggested-questions");
  };

  const handleBackToAppointmentPrep = () => {
    setCurrentScreen("appointment-prep");
  };

  const handleSaveQuestions = () => {
    setCurrentScreen("clarity-recorder");
  };

  const handleBackToQuestions = () => {
    setCurrentScreen("suggested-questions");
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    switch (section) {
      case "reports":
        setCurrentScreen("upload");
        break;
      case "timeline":
        setCurrentScreen("timeline-hub");
        break;
      case "appointments":
        setCurrentScreen("appointment-prep");
        break;
      case "tools":
        setCurrentScreen("clarity-recorder");
        break;
    }
  };

  const handleScreenChange = (screen: string) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "upload":
        return <UploadReportScreen onFileUpload={handleFileUpload} />;
      case "processing":
        return <ProcessingScreen onComplete={handleProcessingComplete} onCancel={handleBackToUpload} />;
      case "insights":
        return <InsightSummaryScreen onViewFullReport={handleViewFullReport} />;
      case "detailed":
        return <DetailedReportScreen onBack={handleBackToInsights} />;
      case "timeline-hub":
        return <HealthTimelineScreen onViewTimeline={handleViewTimeline} />;
      case "visual-timeline":
        return <VisualTimelineScreen onBack={handleBackToTimelineHub} />;
      case "appointment-prep":
        return <AppointmentPrepScreen onPrepareQuestions={handlePrepareQuestions} />;
      case "suggested-questions":
        return (
          <SuggestedQuestionsScreen
            onBack={handleBackToAppointmentPrep}
            onSave={handleSaveQuestions}
            reportId={selectedReportId || ""}
          />
        );
      case "clarity-recorder":
        return <ClarityRecorderScreen onBack={handleBackToQuestions} />;
      default:
        return <UploadReportScreen onFileUpload={handleFileUpload} />;
    }
  };

  const getScreenTitle = () => {
    switch (currentScreen) {
      case "upload":
        return "Upload Medical Report";
      case "processing":
        return "Processing Your Report";
      case "insights":
        return "Your Report Insights";
      case "detailed":
        return "Detailed Report Analysis";
      case "timeline-hub":
        return "Health Timeline Overview";
      case "visual-timeline":
        return "Health Trends & Analytics";
      case "appointment-prep":
        return "Appointment Preparation";
      case "suggested-questions":
        return "Suggested Questions for Your Doctor";
      case "clarity-recorder":
        return "Clarity Recorder";
      default:
        return "MedClarify - AI-Powered Medical Report Simplifier";
    }
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [];

    switch (activeSection) {
      case "reports":
        breadcrumbs.push({ label: "Reports", href: "#" });
        break;
      case "timeline":
        breadcrumbs.push({ label: "Timeline", href: "#" });
        break;
      case "appointments":
        breadcrumbs.push({ label: "Appointments", href: "#" });
        break;
      case "tools":
        breadcrumbs.push({ label: "Tools", href: "#" });
        break;
    }

    if (
      currentScreen !== "upload" &&
      currentScreen !== "timeline-hub" &&
      currentScreen !== "appointment-prep" &&
      currentScreen !== "clarity-recorder"
    ) {
      breadcrumbs.push({ label: getScreenTitle(), href: "#" });
    }

    return breadcrumbs;
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        currentScreen={currentScreen}
        onScreenChange={handleScreenChange}
      />

      <div className="flex-1 flex flex-col">
        <Header
          title={getScreenTitle()}
          breadcrumbs={getBreadcrumbs()}
          currentScreen={currentScreen}
          onBack={() => {
            switch (currentScreen) {
              case "processing":
                handleBackToUpload();
                break;
              case "detailed":
                handleBackToInsights();
                break;
              case "visual-timeline":
                handleBackToTimelineHub();
                break;
              case "suggested-questions":
                handleBackToAppointmentPrep();
                break;
              default:
                break;
            }
          }}
        />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">{renderScreen()}</div>
        </main>
      </div>
    </div>
  );
}
