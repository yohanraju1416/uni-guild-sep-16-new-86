import { useState } from "react";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Calendar, Award, Download, Filter, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SuperAdminReportsPage = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState("last30days");
  const [reportType, setReportType] = useState("overview");

  // Mock data for charts
  const eventParticipationData = [
    { month: 'Jan', hackathons: 45, workshops: 32, competitions: 28, seminars: 15 },
    { month: 'Feb', hackathons: 52, workshops: 38, competitions: 35, seminars: 22 },
    { month: 'Mar', hackathons: 48, workshops: 41, competitions: 31, seminars: 18 },
    { month: 'Apr', hackathons: 61, workshops: 45, competitions: 42, seminars: 25 },
    { month: 'May', hackathons: 58, workshops: 49, competitions: 38, seminars: 28 },
    { month: 'Jun', hackathons: 65, workshops: 52, competitions: 45, seminars: 31 }
  ];

  const registrationTrendData = [
    { date: 'Week 1', registrations: 120 },
    { date: 'Week 2', registrations: 145 },
    { date: 'Week 3', registrations: 135 },
    { date: 'Week 4', registrations: 168 },
    { date: 'Week 5', registrations: 178 },
    { date: 'Week 6', registrations: 192 }
  ];

  const categoryDistribution = [
    { name: 'Hackathons', value: 35, color: '#8B5CF6' },
    { name: 'Workshops', value: 28, color: '#06B6D4' },
    { name: 'Competitions', value: 22, color: '#10B981' },
    { name: 'Seminars', value: 15, color: '#F59E0B' }
  ];

  const evaluatorPerformance = [
    { name: 'Dr. Amanda Foster', eventsAssigned: 8, reviewsCompleted: 47, avgRating: 4.8, responseTime: '2.3h' },
    { name: 'Prof. Robert Kim', eventsAssigned: 12, reviewsCompleted: 63, avgRating: 4.9, responseTime: '1.8h' },
    { name: 'Dr. Elena Vasquez', eventsAssigned: 6, reviewsCompleted: 32, avgRating: 4.7, responseTime: '3.1h' },
    { name: 'Prof. David Johnson', eventsAssigned: 9, reviewsCompleted: 45, avgRating: 4.6, responseTime: '2.7h' }
  ];

  const topEvents = [
    { name: 'AI Innovation Challenge', registrations: 198, category: 'Hackathon', satisfaction: 4.9 },
    { name: 'Web Development Workshop', registrations: 156, category: 'Workshop', satisfaction: 4.7 },
    { name: 'Data Science Competition', registrations: 143, category: 'Competition', satisfaction: 4.8 },
    { name: 'Cybersecurity Seminar', registrations: 98, category: 'Seminar', satisfaction: 4.6 }
  ];

  const systemMetrics = [
    { label: 'Active Users', value: '1,247', change: '+12%', trend: 'up' },
    { label: 'Events Created', value: '89', change: '+23%', trend: 'up' },
    { label: 'Avg. Event Rating', value: '4.7', change: '+0.2%', trend: 'up' },
    { label: 'Completion Rate', value: '85%', change: '+5%', trend: 'up' }
  ];

  const handleExportReport = () => {
    toast({
      title: "Report Exported",
      description: "The report has been exported successfully and will be downloaded shortly.",
    });
  };

  return (
    <DashboardLayout
      sidebar={<SuperAdminSidebar />}
      title="Reports & Analytics"
      userRole="super-admin"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">Comprehensive analytics and insights for the platform</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="last90days">Last 90 Days</SelectItem>
                <SelectItem value="lastyear">Last Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={handleExportReport} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {systemMetrics.map((metric, index) => (
            <Card key={index} className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                <TrendingUp className={`h-4 w-4 ${metric.trend === 'up' ? 'text-success' : 'text-destructive'}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{metric.value}</div>
                <p className={`text-xs ${metric.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                  {metric.change} from last period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Event Participation Trends */}
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Event Participation by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={eventParticipationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="hackathons" stackId="a" fill="#8B5CF6" />
                  <Bar dataKey="workshops" stackId="a" fill="#06B6D4" />
                  <Bar dataKey="competitions" stackId="a" fill="#10B981" />
                  <Bar dataKey="seminars" stackId="a" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Registration Trends */}
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Registration Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={registrationTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="registrations" stroke="#8B5CF6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Event Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Events */}
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                Top Performing Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{event.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{event.category}</Badge>
                        <span className="text-xs text-muted-foreground">{event.registrations} registrations</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">★ {event.satisfaction}</div>
                      <div className="text-xs text-muted-foreground">satisfaction</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Evaluator Performance Table */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Evaluator Performance Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-3 font-medium">Evaluator</th>
                    <th className="text-left p-3 font-medium">Events Assigned</th>
                    <th className="text-left p-3 font-medium">Reviews Completed</th>
                    <th className="text-left p-3 font-medium">Avg Rating</th>
                    <th className="text-left p-3 font-medium">Response Time</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluatorPerformance.map((evaluator, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium">{evaluator.name}</td>
                      <td className="p-3">{evaluator.eventsAssigned}</td>
                      <td className="p-3">{evaluator.reviewsCompleted}</td>
                      <td className="p-3">
                        <Badge variant="outline" className="bg-success text-success-foreground">
                          ★ {evaluator.avgRating}
                        </Badge>
                      </td>
                      <td className="p-3 text-muted-foreground">{evaluator.responseTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Report Actions */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Report Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Calendar className="h-6 w-6" />
                Schedule Report
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Filter className="h-6 w-6" />
                Custom Filter
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Download className="h-6 w-6" />
                Export All Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminReportsPage;