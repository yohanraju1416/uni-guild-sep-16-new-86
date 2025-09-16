import DashboardLayout from "@/components/layout/DashboardLayout";
import { EvaluatorSidebar } from "@/components/sidebars/EvaluatorSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, FileText, Eye, MessageSquare, Download, User, Calendar, Clock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const SubmissionsReviewPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const eventId = searchParams.get('eventId');
  const eventTitle = searchParams.get('eventTitle') || 'Unknown Event';
  
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      studentName: "Alice Johnson",
      studentEmail: "alice.johnson@university.edu",
      submissionTitle: "AI-Powered Healthcare Assistant",
      fileName: "AI_Healthcare_Presentation.pptx",
      fileType: "PowerPoint",
      submissionDate: "2024-12-01T14:30:00",
      status: "Pending Review",
      priority: "High",
      description: "An innovative AI solution for healthcare diagnostics and patient management.",
      feedback: "",
      evaluationStatus: "pending"
    },
    {
      id: 2,
      studentName: "Bob Wilson",
      studentEmail: "bob.wilson@university.edu",
      submissionTitle: "Blockchain Supply Chain Solution",
      fileName: "Blockchain_Research_Paper.pdf",
      fileType: "PDF Document",
      submissionDate: "2024-11-28T09:15:00",
      status: "In Review",
      priority: "Medium",
      description: "A comprehensive research on implementing blockchain in supply chain management.",
      feedback: "Initial review shows promising approach. Need more technical details.",
      evaluationStatus: "in_review"
    },
    {
      id: 3,
      studentName: "Carol Davis",
      studentEmail: "carol.davis@university.edu",
      submissionTitle: "Sustainable Energy Management System",
      fileName: "Energy_Management_Plan.docx",
      fileType: "Word Document",
      submissionDate: "2024-11-25T16:45:00",
      status: "Completed",
      priority: "Low",
      description: "A business plan for implementing sustainable energy solutions in urban areas.",
      feedback: "Excellent presentation with well-researched market analysis. Approved for next round.",
      evaluationStatus: "selected"
    }
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewSubmission = (submission: any) => {
    setSelectedSubmission(submission);
    setFeedbackText(submission.feedback);
    setFeedbackStatus(submission.evaluationStatus);
    setIsDialogOpen(true);
  };

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim() || !feedbackStatus) {
      toast({
        title: "Incomplete Feedback",
        description: "Please provide feedback and select a status.",
        variant: "destructive"
      });
      return;
    }

    // Update the submission
    setSubmissions(prev => prev.map(sub => 
      sub.id === selectedSubmission.id 
        ? { 
            ...sub, 
            feedback: feedbackText,
            evaluationStatus: feedbackStatus,
            status: feedbackStatus === "selected" ? "Selected" : 
                   feedbackStatus === "rejected" ? "Rejected" : "Needs Revision"
          }
        : sub
    ));

    toast({
      title: "Feedback Submitted",
      description: `Feedback for ${selectedSubmission.studentName}'s submission has been saved.`,
    });

    setIsDialogOpen(false);
    setSelectedSubmission(null);
    setFeedbackText("");
    setFeedbackStatus("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending Review":
        return <Badge variant="outline" className="text-warning border-warning">Pending Review</Badge>;
      case "In Review":
        return <Badge variant="outline" className="text-accent border-accent">In Review</Badge>;
      case "Completed":
      case "Selected":
        return <Badge variant="default">Selected</Badge>;
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "Needs Revision":
        return <Badge variant="secondary">Needs Revision</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive" className="text-xs">High</Badge>;
      case "Medium":
        return <Badge variant="outline" className="text-xs">Medium</Badge>;
      case "Low":
        return <Badge variant="secondary" className="text-xs">Low</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{priority}</Badge>;
    }
  };

  const getFileIcon = (fileType: string) => {
    return <FileText className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <DashboardLayout
      sidebar={<EvaluatorSidebar />}
      title="Submissions Review"
      userRole="evaluator"
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/evaluator/events')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </div>

        <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
          <h2 className="text-2xl font-bold mb-2">Submissions Review</h2>
          <p className="text-primary-foreground/80">
            Event: <span className="font-semibold">{decodeURIComponent(eventTitle)}</span>
          </p>
          <p className="text-primary-foreground/60 text-sm mt-1">
            Review and evaluate student submissions for this event.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{submissions.length}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {submissions.filter(s => s.status === "Pending Review").length}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Review</CardTitle>
              <Eye className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {submissions.filter(s => s.status === "In Review").length}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <MessageSquare className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {submissions.filter(s => s.status === "Completed" || s.status === "Selected").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {submissions.map((submission) => (
            <Card key={submission.id} className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-semibold text-lg">{submission.studentName}</h3>
                      </div>
                      {getPriorityBadge(submission.priority)}
                      {getStatusBadge(submission.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-primary">{submission.submissionTitle}</h4>
                        <p className="text-sm text-muted-foreground">{submission.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Submitted: {new Date(submission.submissionDate).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                          {getFileIcon(submission.fileType)}
                          <div>
                            <div className="font-medium text-sm">{submission.fileName}</div>
                            <div className="text-xs text-muted-foreground">{submission.fileType}</div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">{submission.studentEmail}</div>
                      </div>
                    </div>
                    
                    {submission.feedback && (
                      <div className="mt-3 p-3 bg-muted/20 rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground mb-1">Current Feedback:</div>
                        <div className="text-sm">{submission.feedback}</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Dialog open={isDialogOpen && selectedSubmission?.id === submission.id} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" onClick={() => handleViewSubmission(submission)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Review Submission</DialogTitle>
                          <DialogDescription>
                            Provide feedback for {selectedSubmission?.studentName}'s submission
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div className="p-4 bg-muted/20 rounded-lg">
                            <h4 className="font-medium mb-2">{selectedSubmission?.submissionTitle}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{selectedSubmission?.description}</p>
                            <div className="flex items-center gap-2 text-sm">
                              {getFileIcon(selectedSubmission?.fileType)}
                              <span>{selectedSubmission?.fileName}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Feedback</label>
                            <Textarea
                              placeholder="Provide detailed feedback on the submission..."
                              value={feedbackText}
                              onChange={(e) => setFeedbackText(e.target.value)}
                              rows={4}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Evaluation Status</label>
                            <Select value={feedbackStatus} onValueChange={setFeedbackStatus}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select evaluation status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="selected">Selected</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                                <SelectItem value="needs_revision">Needs Revision</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleSubmitFeedback}>
                              Submit Feedback
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubmissionsReviewPage;