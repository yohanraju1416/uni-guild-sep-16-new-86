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
import { Search, Plus, Edit, Trash2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: number;
  name: string;
  rollNo: string;
  course: string;
  email: string;
  status: "Active" | "Inactive" | "Graduated";
  registeredEvents: number;
}

const mockStudents: Student[] = [
  {
    id: 1,
    name: "Alice Johnson",
    rollNo: "CS2023001",
    course: "Computer Science",
    email: "alice.johnson@university.edu",
    status: "Active",
    registeredEvents: 5
  },
  {
    id: 2,
    name: "Bob Smith",
    rollNo: "EE2023002",
    course: "Electrical Engineering",
    email: "bob.smith@university.edu",
    status: "Active",
    registeredEvents: 3
  },
  {
    id: 3,
    name: "Carol Davis",
    rollNo: "ME2022001",
    course: "Mechanical Engineering",
    email: "carol.davis@university.edu",
    status: "Graduated",
    registeredEvents: 8
  },
  {
    id: 4,
    name: "David Wilson",
    rollNo: "CS2023003",
    course: "Computer Science",
    email: "david.wilson@university.edu",
    status: "Inactive",
    registeredEvents: 1
  }
];

const ManageStudentsPage = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  
  const [newStudent, setNewStudent] = useState({
    name: "",
    rollNo: "",
    course: "",
    email: "",
    status: "Active" as const
  });

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddStudent = () => {
    const student: Student = {
      id: Date.now(),
      ...newStudent,
      registeredEvents: 0
    };
    setStudents([...students, student]);
    setNewStudent({ name: "", rollNo: "", course: "", email: "", status: "Active" });
    setIsAddDialogOpen(false);
    toast({
      title: "Student Added",
      description: `${student.name} has been added successfully.`,
    });
  };

  const handleEditStudent = (student: Student) => {
    setStudents(students.map(s => s.id === student.id ? student : s));
    setEditingStudent(null);
    toast({
      title: "Student Updated",
      description: `${student.name}'s information has been updated.`,
    });
  };

  const handleRemoveStudent = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    setStudents(students.filter(s => s.id !== studentId));
    toast({
      title: "Student Removed",
      description: `${student?.name} has been removed from the system.`,
      variant: "destructive"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success";
      case "Inactive": return "bg-warning";
      case "Graduated": return "bg-primary";
      default: return "bg-muted";
    }
  };

  return (
    <DashboardLayout
      sidebar={<SuperAdminSidebar />}
      title="Manage Students"
      userRole="super-admin"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Student Management</h1>
            <p className="text-muted-foreground">Manage all registered students in the system</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    placeholder="Enter student name"
                  />
                </div>
                <div>
                  <Label htmlFor="rollNo">Roll Number</Label>
                  <Input
                    id="rollNo"
                    value={newStudent.rollNo}
                    onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                    placeholder="Enter roll number"
                  />
                </div>
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    value={newStudent.course}
                    onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                    placeholder="Enter course"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={newStudent.status} onValueChange={(value: any) => setNewStudent({ ...newStudent, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Graduated">Graduated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddStudent} className="w-full">
                  Add Student
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{students.length}</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">{students.filter(s => s.status === "Active").length}</div>
              <p className="text-xs text-muted-foreground">Active Students</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-warning">{students.filter(s => s.status === "Inactive").length}</div>
              <p className="text-xs text-muted-foreground">Inactive Students</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{students.filter(s => s.status === "Graduated").length}</div>
              <p className="text-xs text-muted-foreground">Graduated</p>
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
                    placeholder="Search by name, roll number, or email..."
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
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Graduated">Graduated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Students ({filteredStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="space-y-1">
                    <h4 className="font-medium">{student.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Roll: {student.rollNo}</span>
                      <span>Course: {student.course}</span>
                      <span>Email: {student.email}</span>
                      <span>Events: {student.registeredEvents}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(student.status)}>
                      {student.status}
                    </Badge>
                    
                    <Dialog open={editingStudent?.id === student.id} onOpenChange={(open) => !open && setEditingStudent(null)}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingStudent(student)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Student</DialogTitle>
                        </DialogHeader>
                        {editingStudent && (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="edit-name">Name</Label>
                              <Input
                                id="edit-name"
                                value={editingStudent.name}
                                onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-rollNo">Roll Number</Label>
                              <Input
                                id="edit-rollNo"
                                value={editingStudent.rollNo}
                                onChange={(e) => setEditingStudent({ ...editingStudent, rollNo: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-course">Course</Label>
                              <Input
                                id="edit-course"
                                value={editingStudent.course}
                                onChange={(e) => setEditingStudent({ ...editingStudent, course: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-email">Email</Label>
                              <Input
                                id="edit-email"
                                value={editingStudent.email}
                                onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-status">Status</Label>
                              <Select 
                                value={editingStudent.status} 
                                onValueChange={(value: any) => setEditingStudent({ ...editingStudent, status: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Active">Active</SelectItem>
                                  <SelectItem value="Inactive">Inactive</SelectItem>
                                  <SelectItem value="Graduated">Graduated</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button onClick={() => handleEditStudent(editingStudent)} className="w-full">
                              Update Student
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
                          <AlertDialogTitle>Remove Student</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove {student.name} from the system? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleRemoveStudent(student.id)}>
                            Remove Student
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

export default ManageStudentsPage;