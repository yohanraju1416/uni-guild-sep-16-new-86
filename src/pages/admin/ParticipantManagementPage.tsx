import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { AdminSidebar } from "@/components/sidebars/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Edit, Trash2, UserPlus, Users, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ParticipantManagementPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<any>(null);

  const [newParticipant, setNewParticipant] = useState({
    name: "",
    email: "",
    rollNumber: "",
    course: "",
    year: "",
    phoneNumber: "",
    eventId: ""
  });

  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@university.edu",
      rollNumber: "CS2023001",
      course: "Computer Science",
      year: "3rd Year",
      phoneNumber: "+1234567890",
      eventTitle: "Tech Innovation Summit 2024",
      eventId: 1,
      registrationDate: "2024-11-01",
      status: "Active"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@university.edu",
      rollNumber: "IT2023002",
      course: "Information Technology",
      year: "2nd Year",
      phoneNumber: "+1234567891",
      eventTitle: "AI & Machine Learning Conference",
      eventId: 2,
      registrationDate: "2024-10-28",
      status: "Active"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@university.edu",
      rollNumber: "ECE2023003",
      course: "Electronics & Communication",
      year: "4th Year",
      phoneNumber: "+1234567892",
      eventTitle: "Digital Marketing Workshop",
      eventId: 3,
      registrationDate: "2024-11-02",
      status: "Inactive"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@university.edu",
      rollNumber: "BBA2023004",
      course: "Business Administration",
      year: "1st Year",
      phoneNumber: "+1234567893",
      eventTitle: "Tech Innovation Summit 2024",
      eventId: 1,
      registrationDate: "2024-11-03",
      status: "Active"
    }
  ]);

  const events = [
    { id: 1, title: "Tech Innovation Summit 2024" },
    { id: 2, title: "AI & Machine Learning Conference" },
    { id: 3, title: "Digital Marketing Workshop" },
    { id: 4, title: "Cybersecurity Bootcamp" }
  ];

  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.eventTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = eventFilter === "all" || participant.eventId.toString() === eventFilter;
    
    return matchesSearch && matchesEvent;
  });

  const handleAddParticipant = () => {
    if (!newParticipant.name || !newParticipant.email || !newParticipant.eventId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const selectedEvent = events.find(e => e.id.toString() === newParticipant.eventId);
    
    const participant = {
      id: participants.length + 1,
      ...newParticipant,
      eventTitle: selectedEvent?.title || "",
      eventId: parseInt(newParticipant.eventId),
      registrationDate: new Date().toISOString().split('T')[0],
      status: "Active"
    };

    setParticipants(prev => [...prev, participant]);
    setNewParticipant({
      name: "",
      email: "",
      rollNumber: "",
      course: "",
      year: "",
      phoneNumber: "",
      eventId: ""
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Participant Added",
      description: `${participant.name} has been successfully added to ${selectedEvent?.title}.`,
    });
  };

  const handleEditParticipant = (participant: any) => {
    setEditingParticipant({ ...participant });
    setIsEditDialogOpen(true);
  };

  const handleUpdateParticipant = () => {
    if (!editingParticipant) return;

    setParticipants(prev => 
      prev.map(p => 
        p.id === editingParticipant.id 
          ? { ...editingParticipant }
          : p
      )
    );

    setEditingParticipant(null);
    setIsEditDialogOpen(false);

    toast({
      title: "Participant Updated",
      description: `${editingParticipant.name}'s information has been updated.`,
    });
  };

  const handleRemoveParticipant = (participantId: number, participantName: string) => {
    setParticipants(prev => prev.filter(p => p.id !== participantId));
    
    toast({
      title: "Participant Removed",
      description: `${participantName} has been removed from the system.`,
      variant: "destructive",
    });
  };

  const stats = {
    total: participants.length,
    active: participants.filter(p => p.status === 'Active').length,
    inactive: participants.filter(p => p.status === 'Inactive').length
  };

  return (
    <DashboardLayout
      sidebar={<AdminSidebar />}
      title="Participant Management"
      userRole="admin"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Participant Management</h2>
            <p className="text-muted-foreground">Add, edit, and manage event participants</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Participant
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Participant</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="event">Event</Label>
                  <Select 
                    value={newParticipant.eventId} 
                    onValueChange={(value) => setNewParticipant(prev => ({ ...prev, eventId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event" />
                    </SelectTrigger>
                    <SelectContent>
                      {events.map((event) => (
                        <SelectItem key={event.id} value={event.id.toString()}>
                          {event.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newParticipant.name}
                      onChange={(e) => setNewParticipant(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rollNumber">Roll Number</Label>
                    <Input
                      id="rollNumber"
                      value={newParticipant.rollNumber}
                      onChange={(e) => setNewParticipant(prev => ({ ...prev, rollNumber: e.target.value }))}
                      placeholder="Roll number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newParticipant.email}
                    onChange={(e) => setNewParticipant(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@university.edu"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Input
                      id="course"
                      value={newParticipant.course}
                      onChange={(e) => setNewParticipant(prev => ({ ...prev, course: e.target.value }))}
                      placeholder="Course name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Select 
                      value={newParticipant.year} 
                      onValueChange={(value) => setNewParticipant(prev => ({ ...prev, year: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st Year">1st Year</SelectItem>
                        <SelectItem value="2nd Year">2nd Year</SelectItem>
                        <SelectItem value="3rd Year">3rd Year</SelectItem>
                        <SelectItem value="4th Year">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={newParticipant.phoneNumber}
                    onChange={(e) => setNewParticipant(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    placeholder="+1234567890"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAddParticipant} className="flex-1">
                    Add Participant
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Total Participants</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Active</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.active}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Inactive</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.inactive}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Participants</CardTitle>
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

        {/* Participants Table */}
        <Card>
          <CardHeader>
            <CardTitle>Participants ({filteredParticipants.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Details</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Academic Info</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredParticipants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{participant.name}</p>
                          <p className="text-sm text-muted-foreground">{participant.rollNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{participant.email}</p>
                          <p className="text-sm text-muted-foreground">{participant.phoneNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{participant.course}</p>
                          <p className="text-sm text-muted-foreground">{participant.year}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{participant.eventTitle}</p>
                      </TableCell>
                      <TableCell>
                        {new Date(participant.registrationDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={participant.status === 'Active' ? 'default' : 'secondary'}>
                          {participant.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditParticipant(participant)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveParticipant(participant.id, participant.name)}
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

        {/* Edit Participant Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Participant</DialogTitle>
            </DialogHeader>
            {editingParticipant && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editName">Full Name</Label>
                    <Input
                      id="editName"
                      value={editingParticipant.name}
                      onChange={(e) => setEditingParticipant(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editRollNumber">Roll Number</Label>
                    <Input
                      id="editRollNumber"
                      value={editingParticipant.rollNumber}
                      onChange={(e) => setEditingParticipant(prev => ({ ...prev, rollNumber: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="editEmail">Email</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    value={editingParticipant.email}
                    onChange={(e) => setEditingParticipant(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editCourse">Course</Label>
                    <Input
                      id="editCourse"
                      value={editingParticipant.course}
                      onChange={(e) => setEditingParticipant(prev => ({ ...prev, course: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editYear">Year</Label>
                    <Select 
                      value={editingParticipant.year} 
                      onValueChange={(value) => setEditingParticipant(prev => ({ ...prev, year: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st Year">1st Year</SelectItem>
                        <SelectItem value="2nd Year">2nd Year</SelectItem>
                        <SelectItem value="3rd Year">3rd Year</SelectItem>
                        <SelectItem value="4th Year">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="editPhoneNumber">Phone Number</Label>
                  <Input
                    id="editPhoneNumber"
                    value={editingParticipant.phoneNumber}
                    onChange={(e) => setEditingParticipant(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleUpdateParticipant} className="flex-1">
                    Update Participant
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ParticipantManagementPage;