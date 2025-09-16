import { useNavigate } from "react-router-dom";
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
  Activity,
  Plus,
  ArrowRight,
  AlertTriangle,
  BarChart3,
  UserCheck,
  Clock,
  Award,
  Eye
} from "lucide-react";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  
  const systemStats = [
    { 
      label: "Total Users", 
      value: "1,247", 
      change: "+12%", 
      icon: Users, 
      description: "All system users",
      action: () => navigate('/dashboard/super-admin/students')
    },
    { 
      label: "Active Events", 
      value: "24", 
      change: "+8%", 
      icon: Calendar, 
      description: "Currently running",
      action: () => navigate('/dashboard/super-admin/events')
    },
    { 
      label: "System Health", 
      value: "99.9%", 
      change: "Stable", 
      icon: Activity, 
      description: "All systems operational",
      action: () => navigate('/dashboard/super-admin/system')
    },
    { 
      label: "Revenue", 
      value: "$45.2K", 
      change: "+23%", 
      icon: TrendingUp, 
      description: "This month",
      action: () => navigate('/dashboard/super-admin/reports')
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "New Admin Account Created",
      user: "john.admin@university.edu",
      timestamp: "2 minutes ago",
      type: "user",
      priority: "normal"
    },
    {
      id: 2,
      action: "System Security Alert",
      user: "Security System",
      timestamp: "15 minutes ago",
      type: "security",
      priority: "high"
    },
    {
      id: 3,
      action: "Event Policy Updated",
      user: "Dr. Sarah Wilson",
      timestamp: "1 hour ago",
      type: "system",
      priority: "normal"
    },
    {
      id: 4,
      action: "Database Backup Completed",
      user: "System",
      timestamp: "2 hours ago",
      type: "system",
      priority: "normal"
    },
    {
      id: 5,
      action: "New Evaluator Assigned",
      user: "dr.smith@university.edu",
      timestamp: "3 hours ago",
      type: "role",
      priority: "normal"
    },
    {
      id: 6,
      action: "Bulk User Registration",
      user: "Import System",
      timestamp: "5 hours ago",
      type: "user",
      priority: "normal"
    }
  ];

  const userBreakdown = [
    { role: "Students", count: 1089, color: "text-primary", path: "/dashboard/super-admin/students" },
    { role: "Admins", count: 45, color: "text-accent", path: "/dashboard/super-admin/admins" },
    { role: "Evaluators", count: 78, color: "text-success", path: "/dashboard/super-admin/evaluators" },
    { role: "Super Admins", count: 5, color: "text-warning", path: "/dashboard/super-admin/profile" }
  ];

  const pendingActions = [
    {
      id: 1,
      title: "Review New Admin Applications",
      count: 3,
      priority: "high",
      action: () => navigate('/dashboard/super-admin/admins')
    },
    {
      id: 2,
      title: "System Security Scan Results",
      count: 1,
      priority: "high",
      action: () => navigate('/dashboard/super-admin/system')
    },
    {
      id: 3,
      title: "Pending Event Approvals",
      count: 5,
      priority: "medium",
      action: () => navigate('/dashboard/super-admin/events')
    },
    {
      id: 4,
      title: "Evaluator Performance Reviews",
      count: 8,
      priority: "low",
      action: () => navigate('/dashboard/super-admin/evaluators')
    }
  ];

  const quickActions = [
    {
      title: "Manage Users",
      description: "Add, edit, or remove system users",
      icon: Users,
      action: () => navigate('/dashboard/super-admin/students'),
      variant: "gradient" as const
    },
    {
      title: "Event Oversight",
      description: "Monitor and manage all events",
      icon: Calendar,
      action: () => navigate('/dashboard/super-admin/events'),
      variant: "outline" as const
    },
    {
      title: "System Settings",
      description: "Configure global system preferences",
      icon: Settings,
      action: () => navigate('/dashboard/super-admin/system'),
      variant: "outline" as const
    },
    {
      title: "View Reports",
      description: "Analytics and performance insights",
      icon: BarChart3,
      action: () => navigate('/dashboard/super-admin/reports'),
      variant: "outline" as const
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "system": return <Settings className="h-3 w-3" />;
      case "user": return <Users className="h-3 w-3" />;
      case "security": return <Shield className="h-3 w-3" />;
      case "role": return <UserCheck className="h-3 w-3" />;
      default: return <Activity className="h-3 w-3" />;
    }
  };

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

        {/* Interactive System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {systemStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="shadow-card border-0 bg-card/80 backdrop-blur-sm cursor-pointer hover:bg-card/90 transition-colors"
                onClick={stat.action}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pending Actions Alert */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm border-l-4 border-l-warning">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Pending Actions ({pendingActions.reduce((sum, action) => sum + action.count, 0)})
            </CardTitle>
            <CardDescription>
              Items requiring your immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingActions.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={item.action}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)} bg-current`}></div>
                    <div>
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">Priority: {item.priority}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {item.count}
                    </Badge>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive User Breakdown */}
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
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => navigate(user.path)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-current ${user.color}`}></div>
                      <span className="font-medium text-sm">{user.role}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${user.color}`}>{user.count}</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Recent Activity */}
          <Card className="lg:col-span-2 shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-accent" />
                    System Activity
                  </CardTitle>
                  <CardDescription>
                    Recent administrative actions and system events
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/dashboard/super-admin/reports')}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">{activity.action}</h4>
                        <div className="text-xs text-muted-foreground">
                          {activity.user} • {activity.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {activity.priority === "high" && (
                        <div className="w-2 h-2 rounded-full bg-destructive"></div>
                      )}
                      <Badge 
                        variant={
                          activity.type === "system" ? "default" :
                          activity.type === "user" ? "outline" : 
                          activity.type === "security" ? "destructive" : "secondary"
                        }
                        className="text-xs"
                      >
                        {activity.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Quick Actions */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used administrative tools and system management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button 
                    key={index}
                    variant={action.variant} 
                    className="h-24 flex-col gap-2 text-left" 
                    onClick={action.action}
                  >
                    <Icon className="h-6 w-6" />
                    <div>
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs opacity-80">{action.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* System Health Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-success" />
                Database Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate('/dashboard/super-admin/system')}
                >
                  Manage Database
                </Button>
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
              <div className="space-y-4">
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate('/dashboard/super-admin/system')}
                >
                  Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;