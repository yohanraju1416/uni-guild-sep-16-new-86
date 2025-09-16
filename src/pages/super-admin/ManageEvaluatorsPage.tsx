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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Search, Plus, Edit, Trash2, Star, Award, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Evaluator {
  id: number;
  name: string;
  email: string;
  expertise: string[];
  assignedEvents: number;
  status: "Active" | "Inactive" | "Pending";
  rating: number;
  reviewsCompleted: number;
  joinDate: string;
}

const mockEvaluators: Evaluator[] = [
  {
    id: 1,
    name: "Dr. Amanda Foster",
    email: "amanda.foster@university.edu",
    expertise: ["Machine Learning", "AI", "Data Science"],
    assignedEvents: 5,
    status: "Active",
    rating: 4.8,
    reviewsCompleted: 47,
    joinDate: "2023-02-10"
  },
  {
    id: 2,
    name: "Prof. Robert Kim",
    email: "robert.kim@university.edu",
    expertise: ["Web Development", "Software Engineering"],
    assignedEvents: 8,
    status: "Active",
    rating: 4.9,
    reviewsCompleted: 63,
    joinDate: "2022-11-15"
  },
  {
    id: 3,
    name: "Dr. Elena Vasquez",
    email: "elena.vasquez@university.edu",
    expertise: ["Cybersecurity", "Network Security"],
    assignedEvents: 3,
    status: "Pending",
    rating: 0,
    reviewsCompleted: 0,
    joinDate: "2024-01-20"
  },
  {
    id: 4,
    name: "Prof. David Johnson",
    email: "david.johnson@university.edu",
    expertise: ["Mobile Development", "UI/UX"],
    assignedEvents: 6,
    status: "Inactive",
    rating: 4.5,
    reviewsCompleted: 32,
    joinDate: "2023-08-05"
  }
];

const ManageEvaluatorsPage = () => {
  const { toast } = useToast();
  const [evaluators, setEvaluators] = useState<Evaluator[]>(mockEvaluators);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterExpertise, setFilterExpertise] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEvaluator, setEditingEvaluator] = useState<Evaluator | null>(null);
  
  const [newEvaluator, setNewEvaluator] = useState({
    name: "",
    email: "",
    expertise: [] as string[],
    status: "Active" as const
  });

  const allExpertise = ["Machine Learning", "AI", "Data Science", "Web Development", "Software Engineering", "Cybersecurity", "Network Security", "Mobile Development", "UI/UX", "DevOps", "Database", "Blockchain"];

  const filteredEvaluators = evaluators.filter(evaluator => {
    const matchesSearch = evaluator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluator.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === "all" || evaluator.status === filterStatus;
    const matchesExpertise = filterExpertise === "all" || evaluator.expertise.includes(filterExpertise);
    return matchesSearch && matchesStatus && matchesExpertise;
  });

  const handleAddEvaluator = () => {
    const evaluator: Evaluator = {
      id: Date.now(),
      ...newEvaluator,
      assignedEvents: 0,
      rating: 0,
      reviewsCompleted: 0,
      joinDate: new Date().toISOString().split('T')[0]
    };
    setEvaluators([...evaluators, evaluator]);
    setNewEvaluator({ name: "", email: "", expertise: [], status: "Active" });
    setIsAddDialogOpen(false);
    toast({
      title: "Evaluator Added",
      description: `${evaluator.name} has been added as an evaluator.`,
    });
  };

  const handleEditEvaluator = (evaluator: Evaluator) => {
    setEvaluators(evaluators.map(e => e.id === evaluator.id ? evaluator : e));
    setEditingEvaluator(null);
    toast({
      title: "Evaluator Updated",
      description: `${evaluator.name}'s information has been updated.`,
    });
  };

  const handleRemoveEvaluator = (evaluatorId: number) => {
    const evaluator = evaluators.find(e => e.id === evaluatorId);
    setEvaluators(evaluators.filter(e => e.id !== evaluatorId));
    toast({
      title: "Evaluator Removed",
      description: `${evaluator?.name} has been removed from evaluator role.`,
      variant: "destructive"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success";
      case "Inactive": return "bg-warning";
      case "Pending": return "bg-accent";
      default: return "bg-muted";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <DashboardLayout
      sidebar={<SuperAdminSidebar />}
      title="Manage Evaluators"
      userRole="super-admin"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Evaluator Management</h1>
            <p className="text-muted-foreground">Manage evaluators and their assignments</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Evaluator
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Evaluator</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newEvaluator.name}
                    onChange={(e) => setNewEvaluator({ ...newEvaluator, name: e.target.value })}
                    placeholder="Enter evaluator name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newEvaluator.email}
                    onChange={(e) => setNewEvaluator({ ...newEvaluator, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label>Expertise Areas</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {allExpertise.map((exp) => (
                      <label key={exp} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={newEvaluator.expertise.includes(exp)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewEvaluator({
                                ...newEvaluator,
                                expertise: [...newEvaluator.expertise, exp]
                              });
                            } else {
                              setNewEvaluator({
                                ...newEvaluator,
                                expertise: newEvaluator.expertise.filter(item => item !== exp)
                              });
                            }
                          }}
                        />
                        {exp}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={newEvaluator.status} onValueChange={(value: any) => setNewEvaluator({ ...newEvaluator, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddEvaluator} className="w-full">
                  Add Evaluator
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Evaluators</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{evaluators.length}</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">{evaluators.filter(e => e.status === "Active").length}</div>
              <p className="text-xs text-muted-foreground">Active Evaluators</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{evaluators.reduce((sum, e) => sum + e.reviewsCompleted, 0)}</div>
              <p className="text-xs text-muted-foreground">Total Reviews</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">
                {evaluators.length > 0 ? (evaluators.reduce((sum, e) => sum + e.rating, 0) / evaluators.filter(e => e.rating > 0).length).toFixed(1) : "0"}
              </div>
              <p className="text-xs text-muted-foreground">Average Rating</p>
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
                    placeholder="Search by name, email, or expertise..."
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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48">
                <Select value={filterExpertise} onValueChange={setFilterExpertise}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Expertise</SelectItem>
                    {allExpertise.map((exp) => (
                      <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Evaluators Table */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Evaluators ({filteredEvaluators.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEvaluators.map((evaluator) => (
                <div key={evaluator.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <h4 className="font-medium">{evaluator.name}</h4>
                      <Badge className={getStatusColor(evaluator.status)}>
                        {evaluator.status}
                      </Badge>
                      {evaluator.rating > 0 && (
                        <div className="flex items-center gap-1">
                          {renderStars(evaluator.rating)}
                          <span className="text-sm text-muted-foreground ml-1">({evaluator.rating})</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{evaluator.email}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {evaluator.assignedEvents} events
                      </span>
                      <span>{evaluator.reviewsCompleted} reviews completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {evaluator.expertise.map((exp, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Dialog open={editingEvaluator?.id === evaluator.id} onOpenChange={(open) => !open && setEditingEvaluator(null)}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingEvaluator(evaluator)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Evaluator</DialogTitle>
                        </DialogHeader>
                        {editingEvaluator && (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="edit-name">Name</Label>
                              <Input
                                id="edit-name"
                                value={editingEvaluator.name}
                                onChange={(e) => setEditingEvaluator({ ...editingEvaluator, name: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-email">Email</Label>
                              <Input
                                id="edit-email"
                                value={editingEvaluator.email}
                                onChange={(e) => setEditingEvaluator({ ...editingEvaluator, email: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-status">Status</Label>
                              <Select 
                                value={editingEvaluator.status} 
                                onValueChange={(value: any) => setEditingEvaluator({ ...editingEvaluator, status: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Active">Active</SelectItem>
                                  <SelectItem value="Pending">Pending</SelectItem>
                                  <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button onClick={() => handleEditEvaluator(editingEvaluator)} className="w-full">
                              Update Evaluator
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
                          <AlertDialogTitle>Remove Evaluator</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove {evaluator.name} from evaluator role? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleRemoveEvaluator(evaluator.id)}>
                            Remove Evaluator
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

export default ManageEvaluatorsPage;