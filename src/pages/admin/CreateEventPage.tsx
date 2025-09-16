import DashboardLayout from "@/components/layout/DashboardLayout";
import { AdminSidebar } from "@/components/sidebars/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, DollarSign, Save, Plus } from "lucide-react";
import { useState } from "react";

const CreateEventPage = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    location: "",
    maxParticipants: "",
    registrationFee: "",
    requirements: [""],
    prizes: [""],
    contactEmail: "",
    additionalInfo: ""
  });

  const addRequirement = () => {
    setEventData(prev => ({
      ...prev,
      requirements: [...prev.requirements, ""]
    }));
  };

  const addPrize = () => {
    setEventData(prev => ({
      ...prev,
      prizes: [...prev.prizes, ""]
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...eventData.requirements];
    newRequirements[index] = value;
    setEventData(prev => ({ ...prev, requirements: newRequirements }));
  };

  const updatePrize = (index: number, value: string) => {
    const newPrizes = [...eventData.prizes];
    newPrizes[index] = value;
    setEventData(prev => ({ ...prev, prizes: newPrizes }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Event Created:", eventData);
    // Here you would typically send the data to your backend
  };

  return (
    <DashboardLayout
      sidebar={<AdminSidebar />}
      title="Create New Event"
      userRole="admin"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-accent rounded-xl p-6 text-accent-foreground">
          <h2 className="text-2xl font-bold mb-2">Create New Event</h2>
          <p className="text-accent-foreground/80">
            Set up a new event with all necessary details, requirements, and configurations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Basic Event Information
              </CardTitle>
              <CardDescription>
                Enter the fundamental details about your event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Tech Innovation Summit 2024"
                    value={eventData.title}
                    onChange={(e) => setEventData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={eventData.category} onValueChange={(value) => setEventData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="arts">Arts & Design</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Event Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the event..."
                  value={eventData.description}
                  onChange={(e) => setEventData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Date and Location */}
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Date & Location Details
              </CardTitle>
              <CardDescription>
                Specify when and where the event will take place
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={eventData.startDate}
                    onChange={(e) => setEventData(prev => ({ ...prev, startDate: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={eventData.endDate}
                    onChange={(e) => setEventData(prev => ({ ...prev, endDate: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationDeadline">Registration Deadline *</Label>
                  <Input
                    id="registrationDeadline"
                    type="date"
                    value={eventData.registrationDeadline}
                    onChange={(e) => setEventData(prev => ({ ...prev, registrationDeadline: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Event Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., University Auditorium, Room 101"
                  value={eventData.location}
                  onChange={(e) => setEventData(prev => ({ ...prev, location: e.target.value }))}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Registration Details */}
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Registration Configuration
              </CardTitle>
              <CardDescription>
                Set up registration parameters and fees
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Maximum Participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    placeholder="e.g., 100"
                    value={eventData.maxParticipants}
                    onChange={(e) => setEventData(prev => ({ ...prev, maxParticipants: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationFee">Registration Fee ($)</Label>
                  <Input
                    id="registrationFee"
                    type="number"
                    placeholder="e.g., 50"
                    value={eventData.registrationFee}
                    onChange={(e) => setEventData(prev => ({ ...prev, registrationFee: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="contact@university.edu"
                    value={eventData.contactEmail}
                    onChange={(e) => setEventData(prev => ({ ...prev, contactEmail: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requirements and Prizes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Submission Requirements</CardTitle>
                <CardDescription>
                  List what participants need to submit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {eventData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Requirement ${index + 1}`}
                      value={requirement}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                    />
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addRequirement}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Requirement
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-accent" />
                  Prizes & Awards
                </CardTitle>
                <CardDescription>
                  Define the prizes for winners
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {eventData.prizes.map((prize, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Prize ${index + 1}`}
                      value={prize}
                      onChange={(e) => updatePrize(index, e.target.value)}
                    />
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addPrize}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Prize
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>
                Any extra details or special instructions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add any additional information, special instructions, or notes for participants..."
                value={eventData.additionalInfo}
                onChange={(e) => setEventData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1" variant="gradient">
              <Save className="w-4 h-4 mr-2" />
              Create Event
            </Button>
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="button" variant="outline">
              Preview Event
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateEventPage;