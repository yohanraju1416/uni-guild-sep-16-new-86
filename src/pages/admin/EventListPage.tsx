import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { AdminSidebar } from "@/components/sidebars/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Users, Calendar, MapPin, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EventListPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const mockEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      category: "Conference",
      startDate: "2024-12-15",
      endDate: "2024-12-17",
      location: "Convention Center",
      maxParticipants: 200,
      registeredCount: 145,
      registrationFee: 150,
      status: "Active"
    },
    {
      id: 2,
      title: "AI & Machine Learning Conference",
      category: "Hackathon",
      startDate: "2025-01-20",
      endDate: "2025-01-22",
      location: "Tech Campus",
      maxParticipants: 150,
      registeredCount: 28,
      registrationFee: 200,
      status: "Open"
    },
    {
      id: 3,
      title: "Digital Marketing Workshop",
      category: "Workshop",
      startDate: "2024-11-30",
      endDate: "2024-11-30",
      location: "Online",
      maxParticipants: 100,
      registeredCount: 67,
      registrationFee: 75,
      status: "Ongoing"
    },
    {
      id: 4,
      title: "Cybersecurity Bootcamp",
      category: "Workshop",
      startDate: "2024-10-15",
      endDate: "2024-10-20",
      location: "Security Lab",
      maxParticipants: 50,
      registeredCount: 50,
      registrationFee: 300,
      status: "Completed"
    },
    {
      id: 5,
      title: "Blockchain Developer Summit",
      category: "Conference",
      startDate: "2025-02-10",
      endDate: "2025-02-12",
      location: "Blockchain Hub",
      maxParticipants: 180,
      registeredCount: 12,
      registrationFee: 250,
      status: "Draft"
    }
  ];

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || event.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCategory = categoryFilter === "all" || event.category.toLowerCase() === categoryFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleDeleteEvent = (eventId: number, eventTitle: string) => {
    toast({
      title: "Event Deleted",
      description: `${eventTitle} has been removed from the system.`,
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'default';
      case 'open': return 'secondary';
      case 'ongoing': return 'outline';
      case 'completed': return 'secondary';
      case 'draft': return 'outline';
      default: return 'secondary';
    }
  };

  const totalRevenue = mockEvents.reduce((sum, event) => sum + (event.registeredCount * event.registrationFee), 0);
  const totalRegistrations = mockEvents.reduce((sum, event) => sum + event.registeredCount, 0);

  return (
    <DashboardLayout
      sidebar={<AdminSidebar />}
      title="Event List"
      userRole="admin"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Event Management</h2>
            <p className="text-muted-foreground">Manage all your events in one place</p>
          </div>
          <Button onClick={() => navigate('/dashboard/admin/create')}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Event
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Total Events</span>
              </div>
              <p className="text-2xl font-bold mt-2">{mockEvents.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Total Registrations</span>
              </div>
              <p className="text-2xl font-bold mt-2">{totalRegistrations}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Total Revenue</span>
              </div>
              <p className="text-2xl font-bold mt-2">${totalRevenue.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">Active Events</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {mockEvents.filter(e => e.status === 'Active' || e.status === 'Open' || e.status === 'Ongoing').length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="hackathon">Hackathon</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Events Table */}
        <Card>
          <CardHeader>
            <CardTitle>Events ({filteredEvents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Registrations</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{event.title}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{event.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{new Date(event.startDate).toLocaleDateString()}</p>
                          <p className="text-muted-foreground">to {new Date(event.endDate).toLocaleDateString()}</p>
                        </div>
                      </TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{event.registeredCount}/{event.maxParticipants}</p>
                          <div className="w-full bg-muted rounded-full h-2 mt-1">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${(event.registeredCount / event.maxParticipants) * 100}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>${event.registrationFee}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate('/dashboard/admin/edit')}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteEvent(event.id, event.title)}
                          >
                            <Trash2 className="h-4 w-4" />
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

export default EventListPage;