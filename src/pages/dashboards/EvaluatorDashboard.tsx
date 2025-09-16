import DashboardLayout from "@/components/layout/DashboardLayout";
import { EvaluatorSidebar } from "@/components/sidebars/EvaluatorSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Star
} from "lucide-react";

const EvaluatorDashboard = () => {
  const assignedSubmissions = [
    {
      id: 1,
      student: "Alice Johnson",
      event: "Tech Innovation Summit",
      type: "Project Presentation",
      submittedDate: "Dec 1, 2024",
      status: "Pending Review",
      priority: "High"
    },
    {
      id: 2,
      student: "Bob Wilson",
      event: "AI Conference",
      type: "Research Paper",
      submittedDate: "Nov 28, 2024",
      status: "In Review",
      priority: "Medium"
    },
    {
      id: 3,
      student: "Carol Davis",
      event: "Startup Pitch",
      type: "Business Plan",
      submittedDate: "Nov 25, 2024",
      status: "Completed",
      priority: "Low"
    }
  ];

  const recentFeedback = [
    {
      id: 1,
      student: "David Lee",
      event: "Web Development Bootcamp",
      rating: 4.5,
      date: "Dec 3, 2024",
      status: "Feedback Sent"
    },
    {
      id: 2,
      student: "Emma Brown",
      event: "Digital Marketing Workshop",
      rating: 3.8,
      date: "Dec 2, 2024",
      status: "Feedback Sent"
    }
  ];

  return (
    <DashboardLayout
      sidebar={<EvaluatorSidebar />}
      title="Evaluator Dashboard"
      userRole="evaluator"
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
          <h2 className="text-2xl font-bold mb-2">Evaluation Center</h2>
          <p className="text-primary-foreground/80">
            Review submissions, provide valuable feedback, and help students excel.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned Submissions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">15</div>
              <p className="text-xs text-muted-foreground">3 high priority</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">7</div>
              <p className="text-xs text-muted-foreground">Due this week</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">42</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">4.3</div>
              <p className="text-xs text-muted-foreground">Student feedback score</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assigned Submissions */}
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Assigned Submissions
              </CardTitle>
              <CardDescription>
                Review and evaluate student submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignedSubmissions.map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{submission.student}</h4>
                        <Badge 
                          variant={
                            submission.priority === "High" ? "default" :
                            submission.priority === "Medium" ? "outline" : "secondary"
                          }
                          className="text-xs"
                        >
                          {submission.priority}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>{submission.event} - {submission.type}</div>
                        <div>Submitted: {submission.submittedDate}</div>
                      </div>
                      <Badge 
                        variant={
                          submission.status === "Completed" ? "default" :
                          submission.status === "In Review" ? "outline" : "secondary"
                        }
                        className="text-xs"
                      >
                        {submission.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {submission.status === "Pending Review" && (
                        <AlertCircle className="h-4 w-4 text-warning" />
                      )}
                      <Button size="sm" variant="outline">
                        {submission.status === "Completed" ? "View" : "Review"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Feedback */}
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-accent" />
                Recent Feedback
              </CardTitle>
              <CardDescription>
                Your latest evaluations and ratings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFeedback.map((feedback) => (
                  <div key={feedback.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">{feedback.student}</h4>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>{feedback.event}</div>
                        <div className="flex items-center gap-2">
                          <span>Rating: {feedback.rating}/5.0</span>
                          <span>•</span>
                          <span>{feedback.date}</span>
                        </div>
                      </div>
                      <Badge variant="default" className="text-xs">
                        {feedback.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${
                            i < Math.floor(feedback.rating) 
                              ? "text-accent fill-accent" 
                              : "text-muted-foreground"
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common evaluation tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="gradient" className="h-20 flex-col gap-2">
                <FileText className="h-6 w-6" />
                Review Submissions
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <MessageSquare className="h-6 w-6" />
                Provide Feedback
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Star className="h-6 w-6" />
                View Feedback History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EvaluatorDashboard;