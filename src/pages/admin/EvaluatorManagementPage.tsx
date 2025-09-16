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
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, Edit, Trash2, UserCog, Users, Star, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EvaluatorManagementPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEvaluator, setEditingEvaluator] = useState<any>(null);

  const [newEvaluator, setNewEvaluator] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: "",
    organization: "",
    phoneNumber: "",
    assignedEvents: [] as string[]
  });

  const [evaluators, setEvaluators] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@techcorp.com",
      specialization: "Artificial Intelligence",
      experience: "8 years",
      organization: "Google AI Research",
      phoneNumber: "+1234567890",
      assignedEvents: ["AI & Machine Learning Conference", "Tech Innovation Summit 2024"],
      participantsAssigned: 15,
      status: "Active",
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      email: "m.chen@university.edu",
      specialization: "Cybersecurity",
      experience: "12 years",
      organization: "Stanford University",
      phoneNumber: "+1234567891",
      assignedEvents: ["Cybersecurity Bootcamp"],
      participantsAssigned: 8,
      status: "Active",
      joinDate: "2024-02-20"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      email: "emily.r@marketing.com",
      specialization: "Digital Marketing",
      experience: "6 years",
      organization: "Marketing Pro Inc.",
      phoneNumber: "+1234567892",
      assignedEvents: ["Digital Marketing Workshop"],
      participantsAssigned: 12,
      status: "Active",
      joinDate: "2024-03-10"
    },
    {
      id: 4,
      name: "James Wilson",
      email: "j.wilson@blockchain.io",
      specialization: "Blockchain",
      experience: "5 years",
      organization: "BlockTech Solutions",
      phoneNumber: "+1234567893",
      assignedEvents: [],
      participantsAssigned: 0,
      status: "Inactive",
      joinDate: "2024-04-05"
    }
  ]);

  const events = [
    { id: 1, title: "Tech Innovation Summit 2024" },
    { id: 2, title: "AI & Machine Learning Conference" },
    { id: 3, title: "Digital Marketing Workshop" },
    { id: 4, title: "Cybersecurity Bootcamp" },
    { id: 5, title: "Blockchain Developer Summit" }
  ];

  const specializations = [
    "Artificial Intelligence",
    "Machine Learning",
    "Cybersecurity",
    "Digital Marketing",
    "Blockchain",
    "Data Science",
    "Web Development",
    "Mobile Development"
  ];

  const filteredEvaluators = evaluators.filter((evaluator) => {
    const matchesSearch = evaluator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluator.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluator.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = specializationFilter === "all" || 
                                  evaluator.specialization.toLowerCase() === specializationFilter.toLowerCase();
    
    return matchesSearch && matchesSpecialization;
  });

  const handleAddEvaluator = () => {
    if (!newEvaluator.name || !newEvaluator.email || !newEvaluator.specialization) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const evaluator = {
      id: evaluators.length + 1,
      ...newEvaluator,
      participantsAssigned: 0,
      status: "Active",
      joinDate: new Date().toISOString().split('T')[0]
    };

    setEvaluators(prev => [...prev, evaluator]);
    setNewEvaluator({
      name: "",
      email: "",
      specialization: "",
      experience: "",
      organization: "",
      phoneNumber: "",
      assignedEvents: []
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Evaluator Added",
      description: `${evaluator.name} has been successfully added to the system.`,
    });
  };

  const handleEditEvaluator = (evaluator: any) => {
    setEditingEvaluator({ ...evaluator });
    setIsEditDialogOpen(true);
  };

  const handleUpdateEvaluator = () => {
    if (!editingEvaluator) return;

    setEvaluators(prev => 
      prev.map(e => 
        e.id === editingEvaluator.id 
          ? { ...editingEvaluator }
          : e
      )
    );

    setEditingEvaluator(null);
    setIsEditDialogOpen(false);

    toast({
      title: "Evaluator Updated",
      description: `${editingEvaluator.name}'s information has been updated.`,
    });
  };

  const handleRemoveEvaluator = (evaluatorId: number, evaluatorName: string) => {
    setEvaluators(prev => prev.filter(e => e.id !== evaluatorId));
    
    toast({
      title: "Evaluator Removed",
      description: `${evaluatorName} has been removed from the system.`,
      variant: "destructive",
    });
  };

  const handleEventAssignment = (eventTitle: string, checked: boolean) => {
    if (newEvaluator.assignedEvents.includes(eventTitle)) {
      if (!checked) {
        setNewEvaluator(prev => ({
          ...prev,
          assignedEvents: prev.assignedEvents.filter(e => e !== eventTitle)
        }));
      }
    } else {
      if (checked) {
        setNewEvaluator(prev => ({
          ...prev,
          assignedEvents: [...prev.assignedEvents, eventTitle]
        }));
      }
    }
  };

  const handleEditEventAssignment = (eventTitle: string, checked: boolean) => {
    if (!editingEvaluator) return;

    if (editingEvaluator.assignedEvents.includes(eventTitle)) {
      if (!checked) {
        setEditingEvaluator(prev => ({
          ...prev,
          assignedEvents: prev.assignedEvents.filter(e => e !== eventTitle)
        }));
      }
    } else {
      if (checked) {
        setEditingEvaluator(prev => ({
          ...prev,
          assignedEvents: [...prev.assignedEvents, eventTitle]
        }));
      }
    }
  };

  const stats = {
    total: evaluators.length,
    active: evaluators.filter(e => e.status === 'Active').length,
    totalParticipants: evaluators.reduce((sum, e) => sum + e.participantsAssigned, 0),
    avgExperience: evaluators.reduce((sum, e) => sum + parseInt(e.experience), 0) / evaluators.length
  };

  return (
    <DashboardLayout
      sidebar={<AdminSidebar />}
      title="Evaluator Management"
      userRole="admin"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Evaluator Management</h2>
            <p className="text-muted-foreground">Manage evaluators and their event assignments</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Evaluator
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Evaluator</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newEvaluator.name}
                      onChange={(e) => setNewEvaluator(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Dr. John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEvaluator.email}
                      onChange={(e) => setNewEvaluator(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john.smith@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization *</Label>
                    <Select 
                      value={newEvaluator.specialization} 
                      onValueChange={(value) => setNewEvaluator(prev => ({ ...prev, specialization: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        {specializations.map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Input
                      id="experience"
                      value={newEvaluator.experience}
                      onChange={(e) => setNewEvaluator(prev => ({ ...prev, experience: e.target.value }))}
                      placeholder="5 years"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      value={newEvaluator.organization}
                      onChange={(e) => setNewEvaluator(prev => ({ ...prev, organization: e.target.value }))}
                      placeholder="Company/University"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={newEvaluator.phoneNumber}
                      onChange={(e) => setNewEvaluator(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      placeholder="+1234567890"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Assign to Events</Label>
                  <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto border rounded-md p-3">
                    {events.map((event) => (
                      <div key={event.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`event-${event.id}`}
                          checked={newEvaluator.assignedEvents.includes(event.title)}
                          onCheckedChange={(checked) => 
                            handleEventAssignment(event.title, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={`event-${event.id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {event.title}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAddEvaluator} className="flex-1">
                    Add Evaluator
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <UserCog className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Total Evaluators</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Active Evaluators</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.active}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Participants Assigned</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.totalParticipants}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">Avg Experience</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.avgExperience.toFixed(1)} years</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Evaluators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or organization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                <SelectTrigger className="w-full md:w-60">
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec.toLowerCase()}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Evaluators Table */}
        <Card>
          <CardHeader>
            <CardTitle>Evaluators ({filteredEvaluators.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evaluator Details</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Assigned Events</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvaluators.map((evaluator) => (
                    <TableRow key={evaluator.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{evaluator.name}</p>
                          <p className="text-sm text-muted-foreground">{evaluator.organization}</p>
                          <p className="text-sm text-muted-foreground">{evaluator.experience} experience</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{evaluator.email}</p>
                          <p className="text-sm text-muted-foreground">{evaluator.phoneNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{evaluator.specialization}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {evaluator.assignedEvents.length > 0 ? (
                            evaluator.assignedEvents.map((event, index) => (
                              <Badge key={index} variant="secondary" className="text-xs block w-fit">
                                {event}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">No assignments</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{evaluator.participantsAssigned}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant={evaluator.status === 'Active' ? 'default' : 'secondary'}>
                          {evaluator.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditEvaluator(evaluator)}
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
                            onClick={() => handleRemoveEvaluator(evaluator.id, evaluator.name)}
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

        {/* Edit Evaluator Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Evaluator</DialogTitle>
            </DialogHeader>
            {editingEvaluator && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editName">Full Name</Label>
                    <Input
                      id="editName"
                      value={editingEvaluator.name}
                      onChange={(e) => setEditingEvaluator(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editEmail">Email</Label>
                    <Input
                      id="editEmail"
                      type="email"
                      value={editingEvaluator.email}
                      onChange={(e) => setEditingEvaluator(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editSpecialization">Specialization</Label>
                    <Select 
                      value={editingEvaluator.specialization} 
                      onValueChange={(value) => setEditingEvaluator(prev => ({ ...prev, specialization: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {specializations.map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editExperience">Experience</Label>
                    <Input
                      id="editExperience"
                      value={editingEvaluator.experience}
                      onChange={(e) => setEditingEvaluator(prev => ({ ...prev, experience: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editOrganization">Organization</Label>
                    <Input
                      id="editOrganization"
                      value={editingEvaluator.organization}
                      onChange={(e) => setEditingEvaluator(prev => ({ ...prev, organization: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editPhoneNumber">Phone Number</Label>
                    <Input
                      id="editPhoneNumber"
                      value={editingEvaluator.phoneNumber}
                      onChange={(e) => setEditingEvaluator(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Assigned Events</Label>
                  <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto border rounded-md p-3">
                    {events.map((event) => (
                      <div key={event.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-event-${event.id}`}
                          checked={editingEvaluator.assignedEvents.includes(event.title)}
                          onCheckedChange={(checked) => 
                            handleEditEventAssignment(event.title, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={`edit-event-${event.id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {event.title}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleUpdateEvaluator} className="flex-1">
                    Update Evaluator
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

export default EvaluatorManagementPage;