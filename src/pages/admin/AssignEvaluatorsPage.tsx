import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { AdminSidebar } from "@/components/sidebars/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Link, Users, UserCheck, Calendar, Star, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AssignEvaluatorsPage = () => {
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
  const [selectedEvaluators, setSelectedEvaluators] = useState<number[]>([]);

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      participantName: "John Doe",
      participantId: 1,
      evaluatorName: "Dr. Sarah Johnson",
      evaluatorId: 1,
      eventTitle: "AI & Machine Learning Conference",
      eventId: 2,
      assignedDate: "2024-11-01",
      status: "Active"
    },
    {
      id: 2,
      participantName: "Jane Smith",
      participantId: 2,
      evaluatorName: "Dr. Sarah Johnson",
      evaluatorId: 1,
      eventTitle: "AI & Machine Learning Conference",
      eventId: 2,
      assignedDate: "2024-11-01",
      status: "Active"
    },
    {
      id: 3,
      participantName: "Mike Johnson",
      participantId: 3,
      evaluatorName: "Dr. Emily Rodriguez",
      evaluatorId: 3,
      eventTitle: "Digital Marketing Workshop",
      eventId: 3,
      assignedDate: "2024-10-30",
      status: "Active"
    }
  ]);

  const events = [
    { 
      id: 1, 
      title: "Tech Innovation Summit 2024", 
      participants: [
        { id: 1, name: "John Doe", rollNumber: "CS2023001", course: "Computer Science" },
        { id: 4, name: "Sarah Wilson", rollNumber: "BBA2023004", course: "Business Administration" }
      ]
    },
    { 
      id: 2, 
      title: "AI & Machine Learning Conference", 
      participants: [
        { id: 2, name: "Jane Smith", rollNumber: "IT2023002", course: "Information Technology" }
      ]
    },
    { 
      id: 3, 
      title: "Digital Marketing Workshop", 
      participants: [
        { id: 3, name: "Mike Johnson", rollNumber: "ECE2023003", course: "Electronics & Communication" }
      ]
    },
    { 
      id: 4, 
      title: "Cybersecurity Bootcamp", 
      participants: [
        { id: 5, name: "Alex Brown", rollNumber: "ME2023005", course: "Mechanical Engineering" }
      ]
    }
  ];

  const evaluators = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Artificial Intelligence",
      currentAssignments: 2,
      maxCapacity: 10,
      experience: "8 years"
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      specialization: "Cybersecurity",
      currentAssignments: 1,
      maxCapacity: 8,
      experience: "12 years"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialization: "Digital Marketing",
      currentAssignments: 1,
      maxCapacity: 12,
      experience: "6 years"
    },
    {
      id: 4,
      name: "James Wilson",
      specialization: "Blockchain",
      currentAssignments: 0,
      maxCapacity: 15,
      experience: "5 years"
    }
  ];

  const selectedEventData = events.find(e => e.id.toString() === selectedEvent);
  const participants = selectedEventData?.participants || [];

  const handleParticipantSelection = (participantId: number, checked: boolean) => {
    setSelectedParticipants(prev => 
      checked 
        ? [...prev, participantId]
        : prev.filter(id => id !== participantId)
    );
  };

  const handleEvaluatorSelection = (evaluatorId: number, checked: boolean) => {
    setSelectedEvaluators(prev => 
      checked 
        ? [...prev, evaluatorId]
        : prev.filter(id => id !== evaluatorId)
    );
  };

  const handleAssignParticipants = () => {
    if (!selectedEvent || selectedParticipants.length === 0 || selectedEvaluators.length === 0) {
      toast({
        title: "Missing Selection",
        description: "Please select an event, participants, and evaluators before assigning.",
        variant: "destructive",
      });
      return;
    }

    const eventData = events.find(e => e.id.toString() === selectedEvent);
    const selectedEvaluatorData = evaluators.filter(e => selectedEvaluators.includes(e.id));
    const selectedParticipantData = participants.filter(p => selectedParticipants.includes(p.id));

    // Create new assignments
    const newAssignments = selectedParticipantData.flatMap((participant, index) => {
      const evaluator = selectedEvaluatorData[index % selectedEvaluatorData.length]; // Round-robin assignment
      return {
        id: assignments.length + index + 1,
        participantName: participant.name,
        participantId: participant.id,
        evaluatorName: evaluator.name,
        evaluatorId: evaluator.id,
        eventTitle: eventData?.title || "",
        eventId: parseInt(selectedEvent),
        assignedDate: new Date().toISOString().split('T')[0],
        status: "Active"
      };
    });

    setAssignments(prev => [...prev, ...newAssignments]);

    // Reset selections
    setSelectedParticipants([]);
    setSelectedEvaluators([]);

    toast({
      title: "Assignment Completed",
      description: `Successfully assigned ${selectedParticipantData.length} participants to ${selectedEvaluatorData.length} evaluators.`,
    });
  };

  const handleRemoveAssignment = (assignmentId: number, participantName: string) => {
    setAssignments(prev => prev.filter(a => a.id !== assignmentId));
    
    toast({
      title: "Assignment Removed",
      description: `${participantName}'s assignment has been removed.`,
      variant: "destructive",
    });
  };

  const currentEventAssignments = assignments.filter(a => 
    selectedEvent ? a.eventId.toString() === selectedEvent : true
  );

  const stats = {
    totalAssignments: assignments.length,
    activeAssignments: assignments.filter(a => a.status === 'Active').length,
    totalEvaluators: evaluators.length,
    busyEvaluators: evaluators.filter(e => e.currentAssignments > 0).length
  };

  return (
    <DashboardLayout
      sidebar={<AdminSidebar />}
      title="Assign Participants to Evaluators"
      userRole="admin"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Participant-Evaluator Assignment</h2>
            <p className="text-muted-foreground">Assign participants to evaluators for event evaluation</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Link className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Total Assignments</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.totalAssignments}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Active Assignments</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.activeAssignments}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Available Evaluators</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.totalEvaluators}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">Active Evaluators</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.busyEvaluators}</p>
            </CardContent>
          </Card>
        </div>

        {/* Assignment Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Selection Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Create New Assignment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Event Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Event</label>
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
                            {event.participants.length} participants
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedEvent && (
                <>
                  <Separator />
                  
                  {/* Participants Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Select Participants</label>
                    <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
                      {participants.map((participant) => (
                        <div key={participant.id} className="flex items-center space-x-2 py-2">
                          <Checkbox
                            id={`participant-${participant.id}`}
                            checked={selectedParticipants.includes(participant.id)}
                            onCheckedChange={(checked) => 
                              handleParticipantSelection(participant.id, checked as boolean)
                            }
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{participant.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {participant.rollNumber} • {participant.course}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {selectedParticipants.length} of {participants.length} participants selected
                    </p>
                  </div>

                  <Separator />

                  {/* Evaluators Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Select Evaluators</label>
                    <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
                      {evaluators.map((evaluator) => (
                        <div key={evaluator.id} className="flex items-center space-x-2 py-2">
                          <Checkbox
                            id={`evaluator-${evaluator.id}`}
                            checked={selectedEvaluators.includes(evaluator.id)}
                            onCheckedChange={(checked) => 
                              handleEvaluatorSelection(evaluator.id, checked as boolean)
                            }
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{evaluator.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {evaluator.specialization} • {evaluator.currentAssignments}/{evaluator.maxCapacity} assignments
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ 
                                  width: `${(evaluator.currentAssignments / evaluator.maxCapacity) * 100}%` 
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {selectedEvaluators.length} evaluators selected
                    </p>
                  </div>

                  <Button 
                    onClick={handleAssignParticipants} 
                    className="w-full"
                    disabled={selectedParticipants.length === 0 || selectedEvaluators.length === 0}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Assign Participants to Evaluators
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Current Assignments Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-accent" />
                Current Assignments
                {selectedEvent && (
                  <Badge variant="outline">
                    {selectedEventData?.title}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {currentEventAssignments.length > 0 ? (
                  currentEventAssignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-sm">
                          <p className="font-medium">{assignment.participantName}</p>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <ArrowRight className="h-3 w-3" />
                            <span>{assignment.evaluatorName}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {assignment.status}
                        </Badge>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveAssignment(assignment.id, assignment.participantName)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <UserCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No assignments found</p>
                    <p className="text-sm">
                      {selectedEvent ? "No assignments for this event" : "Select an event to view assignments"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Assignments Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Assignments ({assignments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Participant</TableHead>
                    <TableHead>Evaluator</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Assigned Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>
                        <p className="font-medium">{assignment.participantName}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{assignment.evaluatorName}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{assignment.eventTitle}</p>
                      </TableCell>
                      <TableCell>
                        {new Date(assignment.assignedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={assignment.status === 'Active' ? 'default' : 'secondary'}>
                          {assignment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveAssignment(assignment.id, assignment.participantName)}
                        >
                          Remove
                        </Button>
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

export default AssignEvaluatorsPage;