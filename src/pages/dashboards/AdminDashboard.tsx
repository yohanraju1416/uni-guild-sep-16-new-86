import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { AdminSidebar } from "@/components/sidebars/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Plus, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Calendar,
  UserCheck,
  AlertTriangle
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const recentEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      registrations: 45,
      status: "Active",
      deadline: "Dec 10, 2024"
    },
    {
      id: 2,
      title: "AI & Machine Learning Conference",
      registrations: 28,
      status: "Open",
      deadline: "Jan 15, 2025"
    },
    {
      id: 3,
      title: "Digital Marketing Workshop",
      registrations: 67,
      status: "Ongoing",
      deadline: "Closed"
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      student: "John Doe",
      event: "Tech Innovation Summit",
      type: "Registration",
      date: "2 hours ago"
    },
    {
      id: 2,
      student: "Jane Smith",
      event: "AI Conference",
      type: "Payment",
      date: "5 hours ago"
    }
  ];

  return (
    <DashboardLayout
      sidebar={<AdminSidebar />}
      title="Admin Dashboard"
      userRole="admin"
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-accent rounded-xl p-6 text-accent-foreground">
          <h2 className="text-2xl font-bold mb-2">Admin Control Center</h2>
          <p className="text-accent-foreground/80">
            Manage events, monitor registrations, and oversee the entire event ecosystem.
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
              <div className="text-2xl font-bold text-primary">24</div>
              <p className="text-xs text-muted-foreground">+4 this month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">342</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">$12,450</div>
              <p className="text-xs text-muted-foreground">+25% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">8</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Events */}
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5 text-primary" />
                Recent Events
              </CardTitle>
              <CardDescription>
                Monitor your latest events and their performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{event.registrations} registrations</span>
                        <span>Deadline: {event.deadline}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={event.status === "Active" ? "default" : "outline"}
                        className="text-xs"
                      >
                        {event.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-warning" />
                Pending Approvals
              </CardTitle>
              <CardDescription>
                Review and approve pending registrations and payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">{approval.student}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{approval.event}</span>
                        <Badge variant="outline" className="text-xs">
                          {approval.type}
                        </Badge>
                        <span>{approval.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="success">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
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
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="gradient" className="h-20 flex-col gap-2" onClick={() => navigate('/dashboard/admin/create')}>
                <Plus className="h-6 w-6" />
                Create New Event
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="h-6 w-6" />
                Manage Registrations
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <CreditCard className="h-6 w-6" />
                Process Payments
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <UserCheck className="h-6 w-6" />
                Assign Evaluators
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;