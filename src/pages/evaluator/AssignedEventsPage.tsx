import DashboardLayout from "@/components/layout/DashboardLayout";
import { EvaluatorSidebar } from "@/components/sidebars/EvaluatorSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, FileText, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AssignedEventsPage = () => {
  const navigate = useNavigate();
  
  const [assignedEvents] = useState([
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      description: "Annual technology innovation competition",
      startDate: "2024-12-15",
      endDate: "2024-12-17",
      category: "Technology",
      status: "Active",
      submissionsCount: 15,
      pendingReviews: 8,
      location: "Mumbai Campus"
    },
    {
      id: 2,
      title: "AI Research Conference",
      description: "Artificial Intelligence research presentations",
      startDate: "2024-12-20",
      endDate: "2024-12-22",
      category: "Research",
      status: "Active",
      submissionsCount: 12,
      pendingReviews: 5,
      location: "Delhi Campus"
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      description: "Entrepreneurship and business plan presentations",
      startDate: "2024-11-25",
      endDate: "2024-11-27",
      category: "Business",
      status: "Completed",
      submissionsCount: 18,
      pendingReviews: 0,
      location: "Bangalore Campus"
    },
    {
      id: 4,
      title: "Green Energy Workshop",
      description: "Sustainable energy solutions and innovations",
      startDate: "2024-12-30",
      endDate: "2025-01-02",
      category: "Sustainability",
      status: "Upcoming",
      submissionsCount: 0,
      pendingReviews: 0,
      location: "Chennai Campus"
    }
  ]);

  const handleViewSubmissions = (eventId: number, eventTitle: string) => {
    navigate(`/dashboard/evaluator/submissions?eventId=${eventId}&eventTitle=${encodeURIComponent(eventTitle)}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="default">Active</Badge>;
      case "Completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "Upcoming":
        return <Badge variant="outline">Upcoming</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Technology": "text-blue-600 bg-blue-50",
      "Research": "text-purple-600 bg-purple-50",
      "Business": "text-green-600 bg-green-50",
      "Sustainability": "text-emerald-600 bg-emerald-50"
    };
    return colors[category as keyof typeof colors] || "text-gray-600 bg-gray-50";
  };

  return (
    <DashboardLayout
      sidebar={<EvaluatorSidebar />}
      title="Assigned Events"
      userRole="evaluator"
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
          <h2 className="text-2xl font-bold mb-2">Your Assigned Events</h2>
          <p className="text-primary-foreground/80">
            Review and evaluate submissions for the events assigned to you.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{assignedEvents.length}</div>
              <p className="text-xs text-muted-foreground">Assigned to you</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Events</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {assignedEvents.filter(e => e.status === "Active").length}
              </div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <FileText className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {assignedEvents.reduce((sum, event) => sum + event.submissionsCount, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Across all events</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Users className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {assignedEvents.reduce((sum, event) => sum + event.pendingReviews, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting evaluation</p>
            </CardContent>
          </Card>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {assignedEvents.map((event) => (
            <Card key={event.id} className="shadow-card border-0 bg-card/80 backdrop-blur-sm hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </div>
                  {getStatusBadge(event.status)}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{event.submissionsCount}</div>
                    <div className="text-xs text-muted-foreground">Total Submissions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-warning">{event.pendingReviews}</div>
                    <div className="text-xs text-muted-foreground">Pending Reviews</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleViewSubmissions(event.id, event.title)}
                    className="flex-1"
                    variant={event.submissionsCount > 0 ? "default" : "outline"}
                    disabled={event.submissionsCount === 0}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Submissions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AssignedEventsPage;