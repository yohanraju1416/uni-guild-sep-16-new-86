import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { AdminSidebar } from "@/components/sidebars/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Megaphone, Send, Bell, Calendar, Users, MessageSquare, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EventUpdatesPage = () => {
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateType, setUpdateType] = useState("");

  const [updates, setUpdates] = useState([
    {
      id: 1,
      eventTitle: "Tech Innovation Summit 2024",
      eventId: 1,
      title: "Venue Change Notification",
      message: "Important update: The venue has been changed to Main Auditorium due to increased registrations. Please note the new location for the event.",
      type: "Important",
      datePosted: "2024-11-01",
      recipients: 145
    },
    {
      id: 2,
      eventTitle: "AI & Machine Learning Conference",
      eventId: 2,
      title: "Guest Speaker Announcement",
      message: "We're excited to announce Dr. Sarah Johnson, AI Research Lead at Google, will be our keynote speaker. Don't miss this incredible opportunity!",
      type: "Announcement",
      datePosted: "2024-10-30",
      recipients: 28
    },
    {
      id: 3,
      eventTitle: "Digital Marketing Workshop",
      eventId: 3,
      title: "Workshop Materials Available",
      message: "All workshop materials and resources are now available in the participants' portal. Please download them before the session begins.",
      type: "Info",
      datePosted: "2024-11-02",
      recipients: 67
    }
  ]);

  const events = [
    { id: 1, title: "Tech Innovation Summit 2024", participants: 145 },
    { id: 2, title: "AI & Machine Learning Conference", participants: 28 },
    { id: 3, title: "Digital Marketing Workshop", participants: 67 },
    { id: 4, title: "Cybersecurity Bootcamp", participants: 50 }
  ];

  const updateTypes = [
    { value: "important", label: "Important", color: "destructive" },
    { value: "announcement", label: "Announcement", color: "default" },
    { value: "info", label: "Information", color: "secondary" },
    { value: "reminder", label: "Reminder", color: "outline" }
  ];

  const handlePostUpdate = () => {
    if (!selectedEvent || !updateTitle || !updateMessage || !updateType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before posting the update.",
        variant: "destructive",
      });
      return;
    }

    const selectedEventData = events.find(e => e.id.toString() === selectedEvent);
    
    const newUpdate = {
      id: updates.length + 1,
      eventTitle: selectedEventData?.title || "",
      eventId: parseInt(selectedEvent),
      title: updateTitle,
      message: updateMessage,
      type: updateType,
      datePosted: new Date().toISOString().split('T')[0],
      recipients: selectedEventData?.participants || 0
    };

    setUpdates(prev => [newUpdate, ...prev]);

    // Reset form
    setSelectedEvent("");
    setUpdateTitle("");
    setUpdateMessage("");
    setUpdateType("");

    toast({
      title: "Update Posted Successfully",
      description: `Update sent to ${selectedEventData?.participants} registered participants.`,
    });
  };

  const handleDeleteUpdate = (updateId: number, updateTitle: string) => {
    setUpdates(prev => prev.filter(update => update.id !== updateId));
    
    toast({
      title: "Update Deleted",
      description: `"${updateTitle}" has been removed.`,
      variant: "destructive",
    });
  };

  const getTypeColor = (type: string): "default" | "outline" | "destructive" | "secondary" => {
    const typeObj = updateTypes.find(t => t.value === type.toLowerCase());
    return (typeObj?.color as "default" | "outline" | "destructive" | "secondary") || "secondary";
  };

  return (
    <DashboardLayout
      sidebar={<AdminSidebar />}
      title="Event Updates"
      userRole="admin"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Event Updates & Announcements</h2>
            <p className="text-muted-foreground">Post updates and notify registered participants</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Post New Update */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-primary" />
                Post New Update
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event">Select Event</Label>
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id.toString()}>
                        <div className="flex items-center justify-between w-full">
                          <span>{event.title}</span>
                          <Badge variant="outline" className="ml-2">
                            {event.participants} participants
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="updateType">Update Type</Label>
                <Select value={updateType} onValueChange={setUpdateType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select update type" />
                  </SelectTrigger>
                  <SelectContent>
                    {updateTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Update Title</Label>
                <Input
                  id="title"
                  placeholder="Enter update title"
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message here..."
                  value={updateMessage}
                  onChange={(e) => setUpdateMessage(e.target.value)}
                  rows={5}
                />
              </div>

              <Button onClick={handlePostUpdate} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Post Update & Notify Participants
              </Button>
            </CardContent>
          </Card>

          {/* Recent Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent" />
                Recent Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {updates.slice(0, 3).map((update) => (
                  <div key={update.id} className="border border-border/50 rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">{update.title}</h4>
                          <Badge variant={getTypeColor(update.type)} className="text-xs">
                            {update.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{update.eventTitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{update.message}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{new Date(update.datePosted).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {update.recipients}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              All Updates ({updates.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {updates.map((update) => (
                <div key={update.id} className="border border-border/50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{update.title}</h3>
                        <Badge variant={getTypeColor(update.type)}>
                          {update.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{update.eventTitle}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUpdate(update.id, update.title)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{update.message}</p>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Posted: {new Date(update.datePosted).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Sent to: {update.recipients} participants
                    </div>
                    <div className="flex items-center gap-1">
                      <Bell className="h-4 w-4" />
                      Status: Delivered
                    </div>
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

export default EventUpdatesPage;