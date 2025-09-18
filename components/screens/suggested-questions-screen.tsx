"use client"

import { useState } from "react"
import { Plus, Edit3, Trash2, Save, MessageSquare, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface SuggestedQuestionsScreenProps {
  onBack: () => void
  onSave: () => void
  reportId: string
}

export function SuggestedQuestionsScreen({ onBack, onSave, reportId }: SuggestedQuestionsScreenProps) {
  const [questions, setQuestions] = useState([
    {
      id: "1",
      text: "My cholesterol is at 210 mg/dL. What specific steps should I take to lower it?",
      category: "Treatment",
      priority: "high",
      isCustom: false,
    },
    {
      id: "2",
      text: "How often should I get my cholesterol checked given my current levels?",
      category: "Monitoring",
      priority: "medium",
      isCustom: false,
    },
    {
      id: "3",
      text: "Are there any medications I should consider for my cholesterol?",
      category: "Treatment",
      priority: "high",
      isCustom: false,
    },
    {
      id: "4",
      text: "What foods should I avoid or include more of in my diet?",
      category: "Lifestyle",
      priority: "medium",
      isCustom: false,
    },
    {
      id: "5",
      text: "How does my family history affect my cholesterol management?",
      category: "Risk Factors",
      priority: "low",
      isCustom: false,
    },
  ])

  const [newQuestion, setNewQuestion] = useState("")
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  const addCustomQuestion = () => {
    if (newQuestion.trim()) {
      const newQ = {
        id: Date.now().toString(),
        text: newQuestion.trim(),
        category: "Custom",
        priority: "medium" as const,
        isCustom: true,
      }
      setQuestions([...questions, newQ])
      setNewQuestion("")
    }
  }

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const startEditing = (question: any) => {
    setEditingQuestion(question.id)
    setEditText(question.text)
  }

  const saveEdit = () => {
    if (editingQuestion && editText.trim()) {
      setQuestions(questions.map((q) => (q.id === editingQuestion ? { ...q, text: editText.trim() } : q)))
      setEditingQuestion(null)
      setEditText("")
    }
  }

  const cancelEdit = () => {
    setEditingQuestion(null)
    setEditText("")
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Treatment":
        return "bg-blue-100 text-blue-800"
      case "Monitoring":
        return "bg-purple-100 text-purple-800"
      case "Lifestyle":
        return "bg-green-100 text-green-800"
      case "Risk Factors":
        return "bg-orange-100 text-orange-800"
      case "Custom":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="font-serif font-bold text-xl text-foreground">Your Questions</h2>
        <p className="text-muted-foreground font-sans">
          Here are some questions to help you, Alice. Feel free to add your own!
        </p>
      </div>

      {/* Confidence Building Message */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-serif font-medium text-foreground">You're well-prepared! 💪</p>
              <p className="text-sm text-muted-foreground font-sans mt-1">
                These questions will help you have a productive conversation with your doctor and get the answers you
                need.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggested Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Suggested Questions</CardTitle>
          <CardDescription className="font-sans">
            AI-generated questions based on your lipid panel results
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions.map((question) => (
            <div key={question.id} className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  {editingQuestion === question.id ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="min-h-[80px] font-sans"
                        placeholder="Edit your question..."
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={saveEdit} className="font-sans">
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEdit} className="font-sans bg-transparent">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="font-sans text-foreground leading-relaxed">{question.text}</p>
                  )}
                </div>

                {editingQuestion !== question.id && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => startEditing(question)}>
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deleteQuestion(question.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {editingQuestion !== question.id && (
                <div className="flex gap-2">
                  <Badge className={`text-xs font-sans ${getPriorityColor(question.priority)}`}>
                    {question.priority} priority
                  </Badge>
                  <Badge className={`text-xs font-sans ${getCategoryColor(question.category)}`}>
                    {question.category}
                  </Badge>
                  {question.isCustom && (
                    <Badge variant="outline" className="text-xs font-sans">
                      Custom
                    </Badge>
                  )}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add Custom Question */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold text-lg">Your Custom Questions</CardTitle>
          <CardDescription className="font-sans">
            Add any specific questions you want to ask your doctor
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="What would you like to ask your doctor?"
              className="flex-1 font-sans"
              onKeyPress={(e) => e.key === "Enter" && addCustomQuestion()}
            />
            <Button onClick={addCustomQuestion} disabled={!newQuestion.trim()} className="font-sans">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          <div className="text-sm text-muted-foreground font-sans">
            <p>💡 Examples of good questions:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>What are the side effects of the medications you're recommending?</li>
              <li>How will we know if the treatment is working?</li>
              <li>What should I do if my symptoms get worse?</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Save Questions */}
      <Card className="bg-gradient-to-r from-secondary/10 to-primary/10 border-secondary/30">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <MessageSquare className="h-12 w-12 text-primary mx-auto" />
            <div>
              <h4 className="font-serif font-bold text-lg text-foreground">Ready for your appointment?</h4>
              <p className="text-sm text-muted-foreground font-sans mt-1">
                Save your questions and we'll help you record your doctor's explanations afterward
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={onBack} className="font-sans bg-transparent">
                Back to Reports
              </Button>
              <Button onClick={onSave} className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans">
                <Save className="h-4 w-4 mr-2" />
                Save Questions ({questions.length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
