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
import { Search, Plus, Edit, Trash2, Shield, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Admin {
  id: number;
  name: string;
  email: string;
  department: string;
  assignedEvents: number;
  status: "Active" | "Inactive" | "Pending";
  joinDate: string;
  permissions: string[];
}

const mockAdmins: Admin[] = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@university.edu",
    department: "Computer Science",
    assignedEvents: 8,
    status: "Active",
    joinDate: "2023-01-15",
    permissions: ["CREATE_EVENTS", "MANAGE_REGISTRATIONS", "VIEW_REPORTS"]
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    email: "michael.chen@university.edu",
    department: "Engineering",
    assignedEvents: 12,
    status: "Active",
    joinDate: "2022-09-20",
    permissions: ["CREATE_EVENTS", "MANAGE_REGISTRATIONS", "ASSIGN_EVALUATORS"]
  },
  {
    id: 3,
    name: "Dr. Lisa Rodriguez",
    email: "lisa.rodriguez@university.edu",
    department: "Mathematics",
    assignedEvents: 3,
    status: "Pending",
    joinDate: "2024-01-10",
    permissions: ["CREATE_EVENTS"]
  },
  {
    id: 4,
    name: "Prof. James Thompson",
    email: "james.thompson@university.edu",
    department: "Physics",
    assignedEvents: 6,
    status: "Inactive",
    joinDate: "2023-06-12",
    permissions: ["CREATE_EVENTS", "MANAGE_REGISTRATIONS"]
  }
];

const ManageAdminsPage = () => {
  const { toast } = useToast();
  const [admins, setAdmins] = useState<Admin[]>(mockAdmins);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    department: "",
    status: "Active" as const,
    permissions: ["CREATE_EVENTS"] as string[]
  });

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || admin.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddAdmin = () => {
    const admin: Admin = {
      id: Date.now(),
      ...newAdmin,
      assignedEvents: 0,
      joinDate: new Date().toISOString().split('T')[0]
    };
    setAdmins([...admins, admin]);
    setNewAdmin({ name: "", email: "", department: "", status: "Active", permissions: ["CREATE_EVENTS"] });
    setIsAddDialogOpen(false);
    toast({
      title: "Admin Added",
      description: `${admin.name} has been added as an admin.`,
    });
  };

  const handleEditAdmin = (admin: Admin) => {
    setAdmins(admins.map(a => a.id === admin.id ? admin : a));
    setEditingAdmin(null);
    toast({
      title: "Admin Updated",
      description: `${admin.name}'s information has been updated.`,
    });
  };

  const handleRemoveAdmin = (adminId: number) => {
    const admin = admins.find(a => a.id === adminId);
    setAdmins(admins.filter(a => a.id !== adminId));
    toast({
      title: "Admin Removed",
      description: `${admin?.name} has been removed from admin role.`,
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

  const availablePermissions = [
    "CREATE_EVENTS",
    "MANAGE_REGISTRATIONS", 
    "ASSIGN_EVALUATORS",
    "VIEW_REPORTS",
    "MANAGE_PAYMENTS",
    "SYSTEM_SETTINGS"
  ];

  return (
    <DashboardLayout
      sidebar={<SuperAdminSidebar />}
      title="Manage Admins"
      userRole="super-admin"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Management</h1>
            <p className="text-muted-foreground">Manage administrative users and their permissions</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Admin</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                    placeholder="Enter admin name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={newAdmin.department}
                    onChange={(e) => setNewAdmin({ ...newAdmin, department: e.target.value })}
                    placeholder="Enter department"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={newAdmin.status} onValueChange={(value: any) => setNewAdmin({ ...newAdmin, status: value })}>
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
                <Button onClick={handleAddAdmin} className="w-full">
                  Add Admin
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{admins.length}</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">{admins.filter(a => a.status === "Active").length}</div>
              <p className="text-xs text-muted-foreground">Active Admins</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">{admins.filter(a => a.status === "Pending").length}</div>
              <p className="text-xs text-muted-foreground">Pending Approval</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{admins.reduce((sum, a) => sum + a.assignedEvents, 0)}</div>
              <p className="text-xs text-muted-foreground">Total Events Managed</p>
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
                    placeholder="Search by name, email, or department..."
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
            </div>
          </CardContent>
        </Card>

        {/* Admins Table */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Admins ({filteredAdmins.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAdmins.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <h4 className="font-medium">{admin.name}</h4>
                      <Badge className={getStatusColor(admin.status)}>
                        {admin.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{admin.email}</span>
                      <span>Department: {admin.department}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {admin.assignedEvents} events
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {admin.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Dialog open={editingAdmin?.id === admin.id} onOpenChange={(open) => !open && setEditingAdmin(null)}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingAdmin(admin)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Admin</DialogTitle>
                        </DialogHeader>
                        {editingAdmin && (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="edit-name">Name</Label>
                              <Input
                                id="edit-name"
                                value={editingAdmin.name}
                                onChange={(e) => setEditingAdmin({ ...editingAdmin, name: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-email">Email</Label>
                              <Input
                                id="edit-email"
                                value={editingAdmin.email}
                                onChange={(e) => setEditingAdmin({ ...editingAdmin, email: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-department">Department</Label>
                              <Input
                                id="edit-department"
                                value={editingAdmin.department}
                                onChange={(e) => setEditingAdmin({ ...editingAdmin, department: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-status">Status</Label>
                              <Select 
                                value={editingAdmin.status} 
                                onValueChange={(value: any) => setEditingAdmin({ ...editingAdmin, status: value })}
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
                            <Button onClick={() => handleEditAdmin(editingAdmin)} className="w-full">
                              Update Admin
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
                          <AlertDialogTitle>Remove Admin</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove {admin.name} from admin role? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleRemoveAdmin(admin.id)}>
                            Remove Admin
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

export default ManageAdminsPage;