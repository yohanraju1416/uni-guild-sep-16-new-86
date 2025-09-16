import { useState } from "react";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Search, Plus, Edit, Trash2, Calendar, Users, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: number;
  title: string;
  category: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "Ongoing" | "Completed" | "Upcoming" | "Cancelled";
  registrations: number;
  maxParticipants: number;
  organizer: string;
  prize: string;
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "AI Innovation Challenge",
    category: "Hackathon",
    description: "Build innovative AI solutions for real-world problems.",
    startDate: "2024-02-15",
    endDate: "2024-02-17",
    status: "Ongoing",
    registrations: 45,
    maxParticipants: 50,
    organizer: "Dr. Sarah Wilson",
    prize: "$5,000"
  },
  {
    id: 2,
    title: "Web Development Workshop",
    category: "Workshop",
    description: "Learn modern web development with React and Node.js.",
    startDate: "2024-03-01",
    endDate: "2024-03-01",
    status: "Upcoming",
    registrations: 32,
    maxParticipants: 40,
    organizer: "Prof. Michael Chen",
    prize: "Certificates"
  },
  {
    id: 3,
    title: "Data Science Competition",
    category: "Competition",
    description: "Analyze and visualize complex datasets.",
    startDate: "2024-01-20",
    endDate: "2024-01-22",
    status: "Completed",
    registrations: 67,
    maxParticipants: 80,
    organizer: "Dr. Lisa Rodriguez",
    prize: "$3,000"
  },
  {
    id: 4,
    title: "Blockchain Security Seminar",
    category: "Seminar",
    description: "Understanding security aspects of blockchain technology.",
    startDate: "2024-01-10",
    endDate: "2024-01-10",
    status: "Cancelled",
    registrations: 15,
    maxParticipants: 30,
    organizer: "Prof. James Thompson",
    prize: "N/A"
  }
];

const SuperAdminEventManagementPage = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "Hackathon",
    description: "",
    startDate: "",
    endDate: "",
    status: "Upcoming" as const,
    maxParticipants: 50,
    organizer: "",
    prize: ""
  });

  const categories = ["Hackathon", "Workshop", "Competition", "Seminar", "Conference"];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || event.status === filterStatus;
    const matchesCategory = filterCategory === "all" || event.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleAddEvent = () => {
    const event: Event = {
      id: Date.now(),
      ...newEvent,
      registrations: 0
    };
    setEvents([...events, event]);
    setNewEvent({
      title: "",
      category: "Hackathon",
      description: "",
      startDate: "",
      endDate: "",
      status: "Upcoming",
      maxParticipants: 50,
      organizer: "",
      prize: ""
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Event Created",
      description: `${event.title} has been created successfully.`,
    });
  };

  const handleEditEvent = (event: Event) => {
    setEvents(events.map(e => e.id === event.id ? event : e));
    setEditingEvent(null);
    toast({
      title: "Event Updated",
      description: `${event.title} has been updated successfully.`,
    });
  };

  const handleDeleteEvent = (eventId: number) => {
    const event = events.find(e => e.id === eventId);
    setEvents(events.filter(e => e.id !== eventId));
    toast({
      title: "Event Deleted",
      description: `${event?.title} has been deleted.`,
      variant: "destructive"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ongoing": return "bg-success";
      case "Upcoming": return "bg-primary";
      case "Completed": return "bg-accent";
      case "Cancelled": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Hackathon": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Workshop": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Competition": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Seminar": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <DashboardLayout
      sidebar={<SuperAdminSidebar />}
      title="Event Management"
      userRole="super-admin"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Event Management</h1>
            <p className="text-muted-foreground">Oversee all events across the platform</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient" className="gap-2">
                <Plus className="h-4 w-4" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Enter event title"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newEvent.category} onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="maxParticipants">Max Participants</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      value={newEvent.maxParticipants}
                      onChange={(e) => setNewEvent({ ...newEvent, maxParticipants: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Event description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newEvent.startDate}
                      onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newEvent.endDate}
                      onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="organizer">Organizer</Label>
                    <Input
                      id="organizer"
                      value={newEvent.organizer}
                      onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
                      placeholder="Event organizer"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prize">Prize/Reward</Label>
                    <Input
                      id="prize"
                      value={newEvent.prize}
                      onChange={(e) => setNewEvent({ ...newEvent, prize: e.target.value })}
                      placeholder="Prize or reward"
                    />
                  </div>
                </div>
                <Button onClick={handleAddEvent} className="w-full">
                  Create Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{events.length}</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">{events.filter(e => e.status === "Ongoing").length}</div>
              <p className="text-xs text-muted-foreground">Ongoing Events</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{events.filter(e => e.status === "Upcoming").length}</div>
              <p className="text-xs text-muted-foreground">Upcoming Events</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">{events.reduce((sum, e) => sum + e.registrations, 0)}</div>
              <p className="text-xs text-muted-foreground">Total Registrations</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title, category, or organizer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Table */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Events ({filteredEvents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-4">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                      <Badge variant="outline" className={getCategoryColor(event.category)}>
                        {event.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Organizer: {event.organizer}</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.registrations}/{event.maxParticipants}
                      </span>
                      <span>{event.startDate} to {event.endDate}</span>
                      <span>Prize: {event.prize}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Dialog open={viewingEvent?.id === event.id} onOpenChange={(open) => !open && setViewingEvent(null)}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setViewingEvent(event)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{viewingEvent?.title}</DialogTitle>
                        </DialogHeader>
                        {viewingEvent && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-medium">Category</Label>
                                <p className="text-sm text-muted-foreground">{viewingEvent.category}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Status</Label>
                                <Badge className={`${getStatusColor(viewingEvent.status)} ml-2`}>
                                  {viewingEvent.status}
                                </Badge>
                              </div>
                            </div>
                            <div>
                              <Label className="font-medium">Description</Label>
                              <p className="text-sm text-muted-foreground mt-1">{viewingEvent.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-medium">Start Date</Label>
                                <p className="text-sm text-muted-foreground">{viewingEvent.startDate}</p>
                              </div>
                              <div>
                                <Label className="font-medium">End Date</Label>
                                <p className="text-sm text-muted-foreground">{viewingEvent.endDate}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-medium">Organizer</Label>
                                <p className="text-sm text-muted-foreground">{viewingEvent.organizer}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Prize/Reward</Label>
                                <p className="text-sm text-muted-foreground">{viewingEvent.prize}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-medium">Registrations</Label>
                                <p className="text-sm text-muted-foreground">{viewingEvent.registrations}/{viewingEvent.maxParticipants}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Dialog open={editingEvent?.id === event.id} onOpenChange={(open) => !open && setEditingEvent(null)}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingEvent(event)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Event</DialogTitle>
                        </DialogHeader>
                        {editingEvent && (
                          <div className="space-y-4 max-h-96 overflow-y-auto">
                            <div>
                              <Label htmlFor="edit-title">Event Title</Label>
                              <Input
                                id="edit-title"
                                value={editingEvent.title}
                                onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-description">Description</Label>
                              <Textarea
                                id="edit-description"
                                value={editingEvent.description}
                                onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                                rows={3}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="edit-status">Status</Label>
                                <Select 
                                  value={editingEvent.status} 
                                  onValueChange={(value: any) => setEditingEvent({ ...editingEvent, status: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="edit-organizer">Organizer</Label>
                                <Input
                                  id="edit-organizer"
                                  value={editingEvent.organizer}
                                  onChange={(e) => setEditingEvent({ ...editingEvent, organizer: e.target.value })}
                                />
                              </div>
                            </div>
                            <Button onClick={() => handleEditEvent(editingEvent)} className="w-full">
                              Update Event
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Event</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {event.title}? This action cannot be undone and will remove all associated data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteEvent(event.id)}>
                            Delete Event
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminEventManagementPage;