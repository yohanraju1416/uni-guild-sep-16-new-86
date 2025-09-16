import DashboardLayout from "@/components/layout/DashboardLayout";
import { EvaluatorSidebar } from "@/components/sidebars/EvaluatorSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Calendar, User, FileText, Filter, Search } from "lucide-react";
import { useState, useMemo } from "react";

const FeedbackHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");

  const [feedbackHistory] = useState([
    {
      id: 1,
      eventName: "Tech Innovation Summit 2024",
      studentName: "Alice Johnson",
      submissionTitle: "AI-Powered Healthcare Assistant",
      feedbackDate: "2024-12-03T10:30:00",
      status: "selected",
      feedback: "Excellent presentation with innovative approach to healthcare AI. The technical implementation is solid and the market research is comprehensive. Recommend for final round.",
      rating: 4.5
    },
    {
      id: 2,
      eventName: "AI Research Conference",
      studentName: "Bob Wilson",
      submissionTitle: "Blockchain Supply Chain Solution",
      feedbackDate: "2024-12-02T14:15:00",
      status: "needs_revision",
      feedback: "Good concept but needs more technical depth. The blockchain implementation details are unclear. Please provide more specific algorithms and security measures.",
      rating: 3.2
    },
    {
      id: 3,
      eventName: "Startup Pitch Competition",
      studentName: "Carol Davis",
      submissionTitle: "Sustainable Energy Management System",
      feedbackDate: "2024-11-30T16:45:00",
      status: "selected",
      feedback: "Outstanding business plan with clear market analysis and financial projections. The sustainability aspect is well-researched and the implementation timeline is realistic.",
      rating: 4.8
    },
    {
      id: 4,
      eventName: "Tech Innovation Summit 2024",
      studentName: "David Lee",
      submissionTitle: "Smart City IoT Platform",
      feedbackDate: "2024-11-28T11:20:00",
      status: "rejected",
      feedback: "While the idea has merit, the technical feasibility is questionable given current constraints. The cost analysis is insufficient and the scalability concerns are not addressed.",
      rating: 2.1
    },
    {
      id: 5,
      eventName: "AI Research Conference",
      studentName: "Emma Brown",
      submissionTitle: "Natural Language Processing for Education",
      feedbackDate: "2024-11-25T09:30:00",
      status: "selected",
      feedback: "Impressive research with practical applications in education. The NLP model shows good accuracy and the user interface is intuitive. Great potential for implementation.",
      rating: 4.3
    },
    {
      id: 6,
      eventName: "Green Energy Workshop",
      studentName: "Frank Miller",
      submissionTitle: "Solar Panel Efficiency Optimization",
      feedbackDate: "2024-11-20T13:45:00",
      status: "needs_revision",
      feedback: "Interesting approach to solar efficiency but the methodology needs refinement. Please provide more experimental data and comparison with existing solutions.",
      rating: 3.0
    }
  ]);

  const events = [...new Set(feedbackHistory.map(f => f.eventName))];

  const filteredFeedback = useMemo(() => {
    return feedbackHistory.filter(feedback => {
      const matchesSearch = searchTerm === "" || 
        feedback.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.submissionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.eventName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || feedback.status === statusFilter;
      const matchesEvent = eventFilter === "all" || feedback.eventName === eventFilter;
      
      return matchesSearch && matchesStatus && matchesEvent;
    });
  }, [feedbackHistory, searchTerm, statusFilter, eventFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "selected":
        return <Badge variant="default">Selected</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "needs_revision":
        return <Badge variant="secondary">Needs Revision</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.0) return "text-success";
    if (rating >= 3.0) return "text-accent";
    return "text-warning";
  };

  const stats = useMemo(() => {
    const total = feedbackHistory.length;
    const selected = feedbackHistory.filter(f => f.status === "selected").length;
    const rejected = feedbackHistory.filter(f => f.status === "rejected").length;
    const needsRevision = feedbackHistory.filter(f => f.status === "needs_revision").length;
    const avgRating = feedbackHistory.reduce((sum, f) => sum + f.rating, 0) / total;
    
    return { total, selected, rejected, needsRevision, avgRating };
  }, [feedbackHistory]);

  return (
    <DashboardLayout
      sidebar={<EvaluatorSidebar />}
      title="Feedback History"
      userRole="evaluator"
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
          <h2 className="text-2xl font-bold mb-2">Feedback History</h2>
          <p className="text-primary-foreground/80">
            Track all your evaluations and feedback provided to students.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Selected</CardTitle>
              <FileText className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.selected}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <FileText className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.rejected}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Needs Revision</CardTitle>
              <FileText className="h-4 w-4 text-secondary-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary-foreground">{stats.needsRevision}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <FileText className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getRatingColor(stats.avgRating)}`}>
                {stats.avgRating.toFixed(1)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by student, submission, or event..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="selected">Selected</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="needs_revision">Needs Revision</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Event</label>
                <Select value={eventFilter} onValueChange={setEventFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    {events.map(event => (
                      <SelectItem key={event} value={event}>{event}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback History List */}
        <div className="space-y-4">
          {filteredFeedback.length === 0 ? (
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-medium">No feedback found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredFeedback.map((feedback) => (
              <Card key={feedback.id} className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <h3 className="font-semibold text-lg">{feedback.studentName}</h3>
                          {getStatusBadge(feedback.status)}
                        </div>
                        <h4 className="font-medium text-primary">{feedback.submissionTitle}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(feedback.feedbackDate).toLocaleDateString()}</span>
                          </div>
                          <span>•</span>
                          <span>{feedback.eventName}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getRatingColor(feedback.rating)}`}>
                          {feedback.rating.toFixed(1)}/5.0
                        </div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <div className="text-sm font-medium text-muted-foreground mb-2">Feedback:</div>
                      <p className="text-sm leading-relaxed">{feedback.feedback}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FeedbackHistoryPage;