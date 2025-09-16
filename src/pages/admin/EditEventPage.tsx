import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { AdminSidebar } from "@/components/sidebars/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EditEventPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [editingEvent, setEditingEvent] = useState<any>(null);

  const mockEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      description: "A comprehensive summit focusing on emerging technologies and innovation strategies.",
      category: "Conference",
      startDate: "2024-12-15",
      endDate: "2024-12-17",
      deadline: "2024-12-10",
      location: "Convention Center",
      maxParticipants: 200,
      registrationFee: 150,
      status: "Active",
      guidelines: "Participants must bring their laptops and innovative project ideas."
    },
    {
      id: 2,
      title: "AI & Machine Learning Conference",
      description: "Deep dive into artificial intelligence and machine learning applications.",
      category: "Hackathon",
      startDate: "2025-01-20",
      endDate: "2025-01-22",
      deadline: "2025-01-15",
      location: "Tech Campus",
      maxParticipants: 150,
      registrationFee: 200,
      status: "Open",
      guidelines: "Teams of 2-4 members. Must submit working prototype."
    },
    {
      id: 3,
      title: "Digital Marketing Workshop",
      description: "Learn the latest digital marketing strategies and tools.",
      category: "Workshop",
      startDate: "2024-11-30",
      endDate: "2024-11-30",
      deadline: "2024-11-25",
      location: "Online",
      maxParticipants: 100,
      registrationFee: 75,
      status: "Ongoing",
      guidelines: "Basic marketing knowledge required. Laptop and stable internet connection needed."
    }
  ];

  const handleEditEvent = (event: any) => {
    setSelectedEvent(event);
    setEditingEvent({ ...event });
  };

  const handleSaveChanges = () => {
    if (!editingEvent) return;

    toast({
      title: "Event Updated Successfully",
      description: `${editingEvent.title} has been updated.`,
    });

    setSelectedEvent(null);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId: number, eventTitle: string) => {
    toast({
      title: "Event Deleted",
      description: `${eventTitle} has been removed.`,
      variant: "destructive",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, [field]: value });
    }
  };

  if (selectedEvent && editingEvent) {
    return (
      <DashboardLayout
        sidebar={<AdminSidebar />}
        title="Edit Event"
        userRole="admin"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedEvent(null);
                setEditingEvent(null);
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
            <h2 className="text-2xl font-bold">Edit: {selectedEvent.title}</h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={editingEvent.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={editingEvent.category}
                    onValueChange={(value) => handleInputChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hackathon">Hackathon</SelectItem>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                      <SelectItem value="Conference">Conference</SelectItem>
                      <SelectItem value="Seminar">Seminar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingEvent.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={editingEvent.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={editingEvent.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Registration Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={editingEvent.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={editingEvent.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={editingEvent.maxParticipants}
                    onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationFee">Registration Fee ($)</Label>
                  <Input
                    id="registrationFee"
                    type="number"
                    value={editingEvent.registrationFee}
                    onChange={(e) => handleInputChange('registrationFee', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guidelines">Event Guidelines</Label>
                <Textarea
                  id="guidelines"
                  value={editingEvent.guidelines}
                  onChange={(e) => handleInputChange('guidelines', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <Button onClick={handleSaveChanges} className="flex-1">
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedEvent(null);
                    setEditingEvent(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      sidebar={<AdminSidebar />}
      title="Edit Events"
      userRole="admin"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Event Management</h2>
          <Button onClick={() => navigate('/dashboard/admin/create')}>
            <Edit className="h-4 w-4 mr-2" />
            Create New Event
          </Button>
        </div>

        <div className="grid gap-4">
          {mockEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <Badge variant={event.status === 'Active' ? 'default' : 'secondary'}>
                        {event.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{event.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>Category: {event.category}</span>
                      <span>Location: {event.location}</span>
                      <span>Fee: ${event.registrationFee}</span>
                      <span>Max: {event.maxParticipants} participants</span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span>Start: {new Date(event.startDate).toLocaleDateString()}</span>
                      <span>End: {new Date(event.endDate).toLocaleDateString()}</span>
                      <span>Deadline: {new Date(event.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditEvent(event)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteEvent(event.id, event.title)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditEventPage;