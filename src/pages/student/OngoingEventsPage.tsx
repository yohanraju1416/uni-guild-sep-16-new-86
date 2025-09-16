import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { StudentSidebar } from "@/components/sidebars/StudentSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Upload, Calendar, AlertTriangle } from "lucide-react";
import { FileUploadModal } from "@/components/modals/FileUploadModal";
import { toast } from "@/hooks/use-toast";

const OngoingEventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const ongoingEvents = [
    {
      id: 1,
      title: "Digital Marketing Workshop",
      description: "Learn digital marketing strategies and create your campaign",
      startDate: "November 20, 2024",
      endDate: "December 5, 2024",
      submissionDeadline: "December 3, 2024",
      daysLeft: 8,
      isRegistered: true,
      submissionStatus: "Not Submitted",
      progress: 65,
      requirements: ["Marketing Plan Document", "Campaign Presentation", "Social Media Strategy"]
    },
    {
      id: 2,
      title: "Web Development Bootcamp",
      description: "Build a complete web application using modern technologies",
      startDate: "November 15, 2024",
      endDate: "December 10, 2024",
      submissionDeadline: "December 8, 2024",
      daysLeft: 13,
      isRegistered: true,
      submissionStatus: "Partially Submitted",
      progress: 80,
      requirements: ["Source Code Repository", "Live Demo", "Documentation"]
    },
    {
      id: 3,
      title: "Research Paper Competition",
      description: "Submit your original research in computer science",
      startDate: "October 30, 2024",
      endDate: "December 15, 2024",
      submissionDeadline: "December 12, 2024",
      daysLeft: 17,
      isRegistered: true,
      submissionStatus: "Submitted",
      progress: 100,
      requirements: ["Research Paper (PDF)", "Abstract", "Peer Reviews"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not Submitted": return "destructive";
      case "Partially Submitted": return "warning";
      case "Submitted": return "success";
      default: return "secondary";
    }
  };

  const getUrgencyColor = (daysLeft: number) => {
    if (daysLeft <= 3) return "text-destructive";
    if (daysLeft <= 7) return "text-warning";
    return "text-success";
  };

  return (
    <DashboardLayout
      sidebar={<StudentSidebar />}
      title="Ongoing Events"
      userRole="student"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-accent rounded-xl p-6 text-accent-foreground">
          <h2 className="text-2xl font-bold mb-2">Ongoing Events</h2>
          <p className="text-accent-foreground/80">
            Track your progress and manage submissions for active events you're participating in.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Events</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">3</div>
              <p className="text-xs text-muted-foreground">Currently participating</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Submissions</CardTitle>
              <Upload className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">2</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
              <Calendar className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">82%</div>
              <p className="text-xs text-muted-foreground">Across all events</p>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {ongoingEvents.map((event) => (
            <Card key={event.id} className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(event.submissionStatus) as any}>
                      {event.submissionStatus}
                    </Badge>
                    {event.daysLeft <= 7 && (
                      <AlertTriangle className="h-5 w-5 text-warning" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Event Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Start Date:</span>
                    <div>{event.startDate}</div>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">End Date:</span>
                    <div>{event.endDate}</div>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Submission Deadline:</span>
                    <div className={getUrgencyColor(event.daysLeft)}>
                      {event.submissionDeadline}
                      <span className="block text-xs">
                        ({event.daysLeft} days left)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{event.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-gradient-primary h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${event.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Requirements Checklist */}
                <div className="space-y-3">
                  <h4 className="font-medium">Submission Requirements:</h4>
                  <div className="space-y-2">
                    {event.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border border-border/50 rounded-lg">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          event.progress >= ((index + 1) / event.requirements.length) * 100
                            ? 'bg-success border-success' 
                            : 'border-muted-foreground'
                        }`}>
                          {event.progress >= ((index + 1) / event.requirements.length) * 100 && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-sm">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    variant="default"
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowUploadModal(true);
                    }}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Work
                  </Button>
                  <Button variant="outline">
                    View Details
                  </Button>
                  <Button variant="outline">
                    Download Resources
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* File Upload Modal */}
        <FileUploadModal
          open={showUploadModal}
          onOpenChange={setShowUploadModal}
          eventTitle={selectedEvent?.title || ""}
          requirements={selectedEvent?.requirements || []}
          onSuccess={() => {
            toast({
              title: "Submission Updated",
              description: "Your work has been submitted successfully.",
            });
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default OngoingEventsPage;