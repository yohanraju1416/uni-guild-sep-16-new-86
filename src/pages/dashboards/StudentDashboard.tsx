import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { StudentSidebar } from "@/components/sidebars/StudentSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, FileText, TrendingUp } from "lucide-react";
import { StudentLeaderboard } from "@/components/leaderboard/StudentLeaderboard";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      date: "Dec 15, 2024",
      deadline: "Dec 10, 2024",
      status: "Open"
    },
    {
      id: 2,
      title: "AI & Machine Learning Conference",
      date: "Jan 20, 2025",
      deadline: "Jan 15, 2025",
      status: "Open"
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      date: "Feb 5, 2025",
      deadline: "Jan 30, 2025",
      status: "Open"
    }
  ];

  const myRegistrations = [
    {
      id: 1,
      event: "Digital Marketing Workshop",
      status: "Registered",
      submissionStatus: "Pending"
    },
    {
      id: 2,
      event: "Web Development Bootcamp",
      status: "Confirmed",
      submissionStatus: "Submitted"
    }
  ];

  return (
    <DashboardLayout
      sidebar={<StudentSidebar />}
      title="Events Portal"
      userRole="student"
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
          <h2 className="text-2xl font-bold mb-2">Welcome Back, Student!</h2>
          <p className="text-primary-foreground/80">
            Discover amazing events, register for competitions, and showcase your talents.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">12</div>
              <p className="text-xs text-muted-foreground">+3 new this week</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Registrations</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">5</div>
              <p className="text-xs text-muted-foreground">2 pending submission</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ongoing Events</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">3</div>
              <p className="text-xs text-muted-foreground">Submission deadline approaching</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievement Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">85</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Events
              </CardTitle>
              <CardDescription>
                Register for these exciting upcoming events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Event: {event.date}</span>
                        <span>Deadline: {event.deadline}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-success border-success/20">
                        {event.status}
                      </Badge>
                      <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/student/events')}>
                        Register
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* My Registrations */}
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                My Registrations
              </CardTitle>
              <CardDescription>
                Track your registered events and submission status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myRegistrations.map((reg) => (
                  <div key={reg.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">{reg.event}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {reg.status}
                        </Badge>
                        <Badge 
                          variant={reg.submissionStatus === "Submitted" ? "default" : "outline"}
                          className="text-xs"
                        >
                          {reg.submissionStatus}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="gradient" onClick={() => navigate('/dashboard/student/registrations')}>
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Leaderboard */}
        <StudentLeaderboard />

        {/* Quick Actions */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with these common tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/dashboard/student/events')}>
                <Calendar className="h-6 w-6" />
                Browse All Events
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/dashboard/student/submissions')}>
                <FileText className="h-6 w-6" />
                Submit Documents
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/dashboard/student/registrations')}>
                <Users className="h-6 w-6" />
                Check Registration Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;