import DashboardLayout from "@/components/layout/DashboardLayout";
import { StudentSidebar } from "@/components/sidebars/StudentSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, CreditCard, Clock, CheckCircle } from "lucide-react";

const MyRegistrationsPage = () => {
  const registrations = [
    {
      id: 1,
      eventTitle: "Tech Innovation Summit 2024",
      registrationDate: "November 15, 2024",
      eventDate: "December 15, 2024",
      status: "Confirmed",
      paymentStatus: "Paid",
      paymentAmount: "$50",
      submissionDeadline: "December 10, 2024",
      submissionStatus: "Not Started",
      category: "Technology",
      location: "University Auditorium",
      requiresDocuments: true
    },
    {
      id: 2,
      eventTitle: "AI & Machine Learning Conference",
      registrationDate: "November 10, 2024",
      eventDate: "January 20, 2025",
      status: "Pending Approval",
      paymentStatus: "Pending",
      paymentAmount: "$75",
      submissionDeadline: "January 15, 2025",
      submissionStatus: "Not Required",
      category: "Research",
      location: "Computer Science Building",
      requiresDocuments: false
    },
    {
      id: 3,
      eventTitle: "Digital Marketing Workshop",
      registrationDate: "October 25, 2024",
      eventDate: "November 20, 2024",
      status: "Confirmed",
      paymentStatus: "Paid",
      paymentAmount: "$30",
      submissionDeadline: "December 3, 2024",
      submissionStatus: "In Progress",
      category: "Business",
      location: "Business School",
      requiresDocuments: true
    },
    {
      id: 4,
      eventTitle: "Web Development Bootcamp",
      registrationDate: "October 20, 2024",
      eventDate: "November 15, 2024",
      status: "Confirmed",
      paymentStatus: "Paid",
      paymentAmount: "$100",
      submissionDeadline: "December 8, 2024",
      submissionStatus: "Completed",
      category: "Technology",
      location: "IT Lab",
      requiresDocuments: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "success";
      case "Pending Approval": return "warning";
      case "Cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case "Paid": return "success";
      case "Pending": return "warning";
      case "Failed": return "destructive";
      default: return "secondary";
    }
  };

  const getSubmissionColor = (status: string) => {
    switch (status) {
      case "Completed": return "success";
      case "In Progress": return "warning";
      case "Not Started": return "destructive";
      case "Not Required": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <DashboardLayout
      sidebar={<StudentSidebar />}
      title="My Registrations"
      userRole="student"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-accent rounded-xl p-6 text-accent-foreground">
          <h2 className="text-2xl font-bold mb-2">My Registrations</h2>
          <p className="text-accent-foreground/80">
            Track all your event registrations, payment status, and submission requirements.
          </p>
        </div>

        {/* Registration Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">4</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed Events</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">3</div>
              <p className="text-xs text-muted-foreground">Ready to participate</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Submissions</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">2</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
              <CreditCard className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">$255</div>
              <p className="text-xs text-muted-foreground">Registration fees</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Filter Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">All Status</Button>
              <Button variant="outline" size="sm">Confirmed</Button>
              <Button variant="outline" size="sm">Pending</Button>
              <Button variant="outline" size="sm">Payment Due</Button>
            </div>
          </CardContent>
        </Card>

        {/* Registrations List */}
        <div className="space-y-6">
          {registrations.map((registration) => (
            <Card key={registration.id} className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{registration.eventTitle}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline">
                        {registration.category}
                      </Badge>
                      <Badge variant={getStatusColor(registration.status) as any}>
                        {registration.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm text-muted-foreground">Registration ID</div>
                    <div className="font-mono text-sm">REG-{registration.id.toString().padStart(4, '0')}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Registration Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Registration Date:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      {registration.registrationDate}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Event Date:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      {registration.eventDate}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Location:</span>
                    <div className="mt-1">{registration.location}</div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Payment Information
                      </h4>
                      <Badge variant={getPaymentColor(registration.paymentStatus) as any}>
                        {registration.paymentStatus}
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-bold">{registration.paymentAmount}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Submission Status
                      </h4>
                      <Badge variant={getSubmissionColor(registration.submissionStatus) as any}>
                        {registration.submissionStatus}
                      </Badge>
                    </div>
                    <div className="text-sm">
                      {registration.requiresDocuments ? (
                        <div className="flex justify-between">
                          <span>Deadline:</span>
                          <span>{registration.submissionDeadline}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No submission required</span>
                      )}
                    </div>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button variant="default">
                    View Event Details
                  </Button>
                  
                  {registration.paymentStatus === "Pending" && (
                    <Button variant="gradient">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Complete Payment
                    </Button>
                  )}
                  
                  {registration.requiresDocuments && registration.submissionStatus !== "Completed" && (
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Submit Documents
                    </Button>
                  )}
                  
                  {registration.status === "Confirmed" && (
                    <Button variant="outline">
                      Download Confirmation
                    </Button>
                  )}
                  
                  <Button variant="outline">
                    Contact Support
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

export default MyRegistrationsPage;