import DashboardLayout from "@/components/layout/DashboardLayout";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Crown,
  Users, 
  Calendar, 
  Shield, 
  TrendingUp,
  Settings,
  Database,
  Activity
} from "lucide-react";

const SuperAdminDashboard = () => {
  const systemStats = [
    { label: "Total Users", value: "1,247", change: "+12%", icon: Users },
    { label: "Active Events", value: "24", change: "+8%", icon: Calendar },
    { label: "System Health", value: "99.9%", change: "Stable", icon: Activity },
    { label: "Revenue", value: "$45.2K", change: "+23%", icon: TrendingUp }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "New Admin Created",
      user: "john.admin@university.edu",
      timestamp: "2 minutes ago",
      type: "user"
    },
    {
      id: 2,
      action: "Event Policy Updated",
      user: "Super Admin",
      timestamp: "1 hour ago",
      type: "system"
    },
    {
      id: 3,
      action: "Database Backup Completed",
      user: "System",
      timestamp: "2 hours ago",
      type: "system"
    },
    {
      id: 4,
      action: "Evaluator Role Assigned",
      user: "dr.smith@university.edu",
      timestamp: "3 hours ago",
      type: "role"
    }
  ];

  const userBreakdown = [
    { role: "Students", count: 1089, color: "text-primary" },
    { role: "Admins", count: 45, color: "text-accent" },
    { role: "Evaluators", count: 78, color: "text-success" },
    { role: "Super Admins", count: 5, color: "text-warning" }
  ];

  return (
    <DashboardLayout
      sidebar={<SuperAdminSidebar />}
      title="Super Admin Dashboard"
      userRole="super-admin"
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <Crown className="h-8 w-8" />
              <h2 className="text-2xl font-bold">Super Admin Control Center</h2>
            </div>
            <p className="text-primary-foreground/80">
              Complete system oversight and administrative control over UNI Guild platform.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {systemStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Breakdown */}
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                User Distribution
              </CardTitle>
              <CardDescription>
                Current user roles across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userBreakdown.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-current ${user.color}`}></div>
                      <span className="font-medium text-sm">{user.role}</span>
                    </div>
                    <span className={`font-bold ${user.color}`}>{user.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2 shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-accent" />
                System Activity
              </CardTitle>
              <CardDescription>
                Recent administrative actions and system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">{activity.action}</h4>
                      <div className="text-xs text-muted-foreground">
                        {activity.user} • {activity.timestamp}
                      </div>
                    </div>
                    <Badge 
                      variant={
                        activity.type === "system" ? "default" :
                        activity.type === "user" ? "outline" : "secondary"
                      }
                      className="text-xs"
                    >
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Controls */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>System Controls</CardTitle>
            <CardDescription>
              Administrative tools and system management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="gradient" className="h-20 flex-col gap-2">
                <Users className="h-6 w-6" />
                Manage Users
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Calendar className="h-6 w-6" />
                Event Oversight
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Shield className="h-6 w-6" />
                Role Management
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Settings className="h-6 w-6" />
                System Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-success" />
                Database Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Connection Status</span>
                  <Badge variant="default" className="bg-success">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Backup</span>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Storage Used</span>
                  <span className="text-sm text-muted-foreground">2.3 GB / 10 GB</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Security Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Security Score</span>
                  <Badge variant="default" className="bg-success">Excellent</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Failed Login Attempts</span>
                  <span className="text-sm text-muted-foreground">3 (24h)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Sessions</span>
                  <span className="text-sm text-muted-foreground">247</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;