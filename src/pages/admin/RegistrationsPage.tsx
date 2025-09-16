import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { AdminSidebar } from "@/components/sidebars/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Check, X, Eye, Filter, Users, Clock, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RegistrationsPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");

  const [registrations, setRegistrations] = useState([
    {
      id: 1,
      studentName: "John Doe",
      email: "john.doe@university.edu",
      rollNumber: "CS2023001",
      course: "Computer Science",
      year: "3rd Year",
      eventTitle: "Tech Innovation Summit 2024",
      eventId: 1,
      registrationDate: "2024-11-01",
      status: "Pending",
      phoneNumber: "+1234567890",
      paymentStatus: "Paid"
    },
    {
      id: 2,
      studentName: "Jane Smith",
      email: "jane.smith@university.edu",
      rollNumber: "IT2023002",
      course: "Information Technology",
      year: "2nd Year",
      eventTitle: "AI & Machine Learning Conference",
      eventId: 2,
      registrationDate: "2024-10-28",
      status: "Approved",
      phoneNumber: "+1234567891",
      paymentStatus: "Paid"
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      email: "mike.johnson@university.edu",
      rollNumber: "ECE2023003",
      course: "Electronics & Communication",
      year: "4th Year",
      eventTitle: "Digital Marketing Workshop",
      eventId: 3,
      registrationDate: "2024-11-02",
      status: "Rejected",
      phoneNumber: "+1234567892",
      paymentStatus: "Pending"
    },
    {
      id: 4,
      studentName: "Sarah Wilson",
      email: "sarah.wilson@university.edu",
      rollNumber: "BBA2023004",
      course: "Business Administration",
      year: "1st Year",
      eventTitle: "Tech Innovation Summit 2024",
      eventId: 1,
      registrationDate: "2024-11-03",
      status: "Pending",
      phoneNumber: "+1234567893",
      paymentStatus: "Failed"
    },
    {
      id: 5,
      studentName: "Alex Brown",
      email: "alex.brown@university.edu",
      rollNumber: "ME2023005",
      course: "Mechanical Engineering",
      year: "3rd Year",
      eventTitle: "Cybersecurity Bootcamp",
      eventId: 4,
      registrationDate: "2024-10-15",
      status: "Approved",
      phoneNumber: "+1234567894",
      paymentStatus: "Paid"
    }
  ]);

  const events = [
    { id: 1, title: "Tech Innovation Summit 2024" },
    { id: 2, title: "AI & Machine Learning Conference" },
    { id: 3, title: "Digital Marketing Workshop" },
    { id: 4, title: "Cybersecurity Bootcamp" }
  ];

  const filteredRegistrations = registrations.filter((registration) => {
    const matchesSearch = registration.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registration.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registration.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registration.eventTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || registration.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesEvent = eventFilter === "all" || registration.eventId.toString() === eventFilter;
    
    return matchesSearch && matchesStatus && matchesEvent;
  });

  const handleApprove = (registrationId: number, studentName: string) => {
    setRegistrations(prev => 
      prev.map(reg => 
        reg.id === registrationId 
          ? { ...reg, status: "Approved" }
          : reg
      )
    );
    
    toast({
      title: "Registration Approved",
      description: `${studentName}'s registration has been approved.`,
    });
  };

  const handleReject = (registrationId: number, studentName: string) => {
    setRegistrations(prev => 
      prev.map(reg => 
        reg.id === registrationId 
          ? { ...reg, status: "Rejected" }
          : reg
      )
    );
    
    toast({
      title: "Registration Rejected",
      description: `${studentName}'s registration has been rejected.`,
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const stats = {
    total: registrations.length,
    pending: registrations.filter(r => r.status === 'Pending').length,
    approved: registrations.filter(r => r.status === 'Approved').length,
    rejected: registrations.filter(r => r.status === 'Rejected').length
  };

  return (
    <DashboardLayout
      sidebar={<AdminSidebar />}
      title="Registrations"
      userRole="admin"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Registration Management</h2>
            <p className="text-muted-foreground">Review and manage student registrations</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Total Registrations</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">Pending Review</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.pending}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Approved</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.approved}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium">Rejected</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.rejected}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, roll number, or event..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger className="w-full md:w-60">
                  <SelectValue placeholder="Event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  {events.map((event) => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Registrations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Registrations ({filteredRegistrations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Details</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{registration.studentName}</p>
                          <p className="text-sm text-muted-foreground">{registration.email}</p>
                          <p className="text-sm text-muted-foreground">
                            {registration.rollNumber} • {registration.course} • {registration.year}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{registration.eventTitle}</p>
                      </TableCell>
                      <TableCell>
                        {new Date(registration.registrationDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPaymentStatusColor(registration.paymentStatus)}>
                          {registration.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(registration.status)}>
                          {registration.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {registration.status === 'Pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApprove(registration.id, registration.studentName)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleReject(registration.id, registration.studentName)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RegistrationsPage;