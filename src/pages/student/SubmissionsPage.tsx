import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { StudentSidebar } from "@/components/sidebars/StudentSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Download, Eye, Calendar } from "lucide-react";
import { FileUploadModal } from "@/components/modals/FileUploadModal";
import { toast } from "@/hooks/use-toast";

const SubmissionsPage = () => {
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const submissions = [
    {
      id: 1,
      eventTitle: "Tech Innovation Summit 2024",
      submissionType: "Project Presentation",
      fileName: "AI_Shopping_Assistant.pptx",
      fileSize: "15.2 MB",
      submittedDate: "November 28, 2024",
      deadline: "December 10, 2024",
      status: "Submitted",
      feedback: null,
      score: null,
      evaluator: "Dr. Sarah Johnson",
      requirements: ["PowerPoint Presentation", "Demo Video", "Source Code"]
    },
    {
      id: 2,
      eventTitle: "Web Development Bootcamp",
      submissionType: "Final Project",
      fileName: "ecommerce_webapp.zip",
      fileSize: "45.8 MB",
      submittedDate: "November 20, 2024",
      deadline: "December 8, 2024",
      status: "Under Review",
      feedback: "Initial review shows good code structure. Awaiting final evaluation.",
      score: null,
      evaluator: "Prof. Michael Chen",
      requirements: ["Source Code", "Documentation", "Live Demo Link"]
    },
    {
      id: 3,
      eventTitle: "Digital Marketing Workshop",
      submissionType: "Marketing Campaign",
      fileName: "social_media_strategy.pdf",
      fileSize: "8.3 MB",
      submittedDate: "November 25, 2024",
      deadline: "December 3, 2024",
      status: "Evaluated",
      feedback: "Creative approach to target audience engagement. Consider adding more data-driven insights.",
      score: 87,
      evaluator: "Ms. Emily Rodriguez",
      requirements: ["Campaign Strategy Document", "Creative Assets", "Budget Plan"]
    },
    {
      id: 4,
      eventTitle: "AI & Machine Learning Conference",
      submissionType: "Research Paper",
      fileName: null,
      fileSize: null,
      submittedDate: null,
      deadline: "January 15, 2025",
      status: "Not Submitted",
      feedback: null,
      score: null,
      evaluator: "Dr. Robert Kim",
      requirements: ["Research Paper (PDF)", "Abstract", "Code Repository"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted": return "default";
      case "Under Review": return "warning";
      case "Evaluated": return "success";
      case "Not Submitted": return "destructive";
      default: return "secondary";
    }
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return "text-muted-foreground";
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-accent";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <DashboardLayout
      sidebar={<StudentSidebar />}
      title="Submissions"
      userRole="student"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
          <h2 className="text-2xl font-bold mb-2">My Submissions</h2>
          <p className="text-primary-foreground/80">
            Track your submitted work, view feedback, and manage upcoming submission deadlines.
          </p>
        </div>

        {/* Submission Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">4</div>
              <p className="text-xs text-muted-foreground">Active submissions</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Upload className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">1</div>
              <p className="text-xs text-muted-foreground">Due soon</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <Eye className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">2</div>
              <p className="text-xs text-muted-foreground">Being evaluated</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <FileText className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">87</div>
              <p className="text-xs text-muted-foreground">From completed evaluations</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Filter Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">All Status</Button>
              <Button variant="outline" size="sm">Not Submitted</Button>
              <Button variant="outline" size="sm">Under Review</Button>
              <Button variant="outline" size="sm">Evaluated</Button>
            </div>
          </CardContent>
        </Card>

        {/* Submissions List */}
        <div className="space-y-6">
          {submissions.map((submission) => (
            <Card key={submission.id} className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{submission.eventTitle}</CardTitle>
                    <CardDescription>{submission.submissionType}</CardDescription>
                    <div className="flex gap-2 items-center">
                      <Badge variant={getStatusColor(submission.status) as any}>
                        {submission.status}
                      </Badge>
                      {submission.score && (
                        <Badge variant="outline" className={getScoreColor(submission.score)}>
                          Score: {submission.score}/100
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm text-muted-foreground">Evaluator</div>
                    <div className="font-medium text-sm">{submission.evaluator}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Submission Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Deadline:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{submission.deadline}</span>
                      {submission.status === "Not Submitted" && (
                        <Badge variant="outline" className={
                          getDaysUntilDeadline(submission.deadline) <= 3 ? "text-destructive border-destructive" :
                          getDaysUntilDeadline(submission.deadline) <= 7 ? "text-warning border-warning" :
                          "text-success border-success"
                        }>
                          {getDaysUntilDeadline(submission.deadline)} days left
                        </Badge>
                      )}
                    </div>
                  </div>
                  {submission.submittedDate && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Submitted:</span>
                      <div className="mt-1">{submission.submittedDate}</div>
                    </div>
                  )}
                  {submission.fileName && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">File:</span>
                      <div className="mt-1">
                        <div className="text-sm">{submission.fileName}</div>
                        <div className="text-xs text-muted-foreground">{submission.fileSize}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Requirements Checklist */}
                <div className="space-y-3">
                  <h4 className="font-medium">Submission Requirements:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {submission.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border border-border/50 rounded">
                        <div className={`w-3 h-3 rounded-full ${
                          submission.status !== "Not Submitted" ? 'bg-success' : 'bg-muted-foreground'
                        }`}></div>
                        <span className="text-sm">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feedback Section */}
                {submission.feedback && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Evaluator Feedback:</h4>
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                      <p className="text-sm italic">"{submission.feedback}"</p>
                    </div>
                  </div>
                )}

                {/* Score Display */}
                {submission.score && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Final Score</span>
                      <span className={`text-xl font-bold ${getScoreColor(submission.score)}`}>
                        {submission.score}/100
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-gradient-primary h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${submission.score}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {submission.status === "Not Submitted" ? (
                    <Button 
                      variant="gradient" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedSubmission(submission);
                        setShowUploadModal(true);
                      }}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Submission
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Submission
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download File
                      </Button>
                    </>
                  )}
                  
                  <Button variant="outline">
                    View Event Details
                  </Button>
                  
                  {submission.status === "Evaluated" && (
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* File Upload Modal */}
        <FileUploadModal
          open={showUploadModal}
          onOpenChange={setShowUploadModal}
          eventTitle={selectedSubmission?.eventTitle || ""}
          requirements={selectedSubmission?.requirements || []}
          onSuccess={() => {
            toast({
              title: "Submission Uploaded",
              description: "Your submission has been uploaded successfully.",
            });
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default SubmissionsPage;