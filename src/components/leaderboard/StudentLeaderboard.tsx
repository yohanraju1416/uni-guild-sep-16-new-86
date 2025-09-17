import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Trophy, 
  Medal, 
  Crown, 
  Edit3, 
  Save, 
  X,
  TrendingUp,
  Star,
  ThumbsUp,
  Share2
} from "lucide-react";

interface Student {
  id: number;
  name: string;
  rollNo: string;
  course: string;
  avatar: string;
  eventCount: number;
  totalLikes: number;
  totalShares: number;
  totalSaved: number;
  totalUse: number;
  achievementScore: number;
}

interface StudentLeaderboardProps {
  canEdit?: boolean;
  title?: string;
  className?: string;
}

const mockStudents: Student[] = [
  {
    id: 1,
    name: "Allen Prohaska PhD",
    rollNo: "CS21001",
    course: "Computer Science",
    avatar: "AP",
    eventCount: 21,
    totalLikes: 4200,
    totalShares: 1100,
    totalSaved: 1100,
    totalUse: 500,
    achievementScore: 95
  },
  {
    id: 2,
    name: "Mr. Pablo Moore",
    rollNo: "EE21002",
    course: "Electrical Engineering",
    avatar: "PM",
    eventCount: 21,
    totalLikes: 4200,
    totalShares: 1100,
    totalSaved: 1100,
    totalUse: 500,
    achievementScore: 88
  },
  {
    id: 3,
    name: "Jesus Marquardt",
    rollNo: "ME21003",
    course: "Mechanical Engineering",
    avatar: "JM",
    eventCount: 21,
    totalLikes: 4200,
    totalShares: 1100,
    totalSaved: 1100,
    totalUse: 500,
    achievementScore: 82
  },
  {
    id: 4,
    name: "Eleanor Pena",
    rollNo: "IT21004",
    course: "Information Technology",
    avatar: "EP",
    eventCount: 21,
    totalLikes: 4200,
    totalShares: 1100,
    totalSaved: 1100,
    totalUse: 500,
    achievementScore: 79
  },
  {
    id: 5,
    name: "Jerome Bell",
    rollNo: "CS21005",
    course: "Computer Science",
    avatar: "JB",
    eventCount: 21,
    totalLikes: 4200,
    totalShares: 1100,
    totalSaved: 1100,
    totalUse: 500,
    achievementScore: 75
  },
  {
    id: 6,
    name: "Brooklyn Simmons",
    rollNo: "EE21006",
    course: "Electrical Engineering",
    avatar: "BS",
    eventCount: 21,
    totalLikes: 4200,
    totalShares: 1100,
    totalSaved: 1100,
    totalUse: 500,
    achievementScore: 73
  },
  {
    id: 7,
    name: "Esther Howard",
    rollNo: "ME21007",
    course: "Mechanical Engineering",
    avatar: "EH",
    eventCount: 21,
    totalLikes: 4200,
    totalShares: 1100,
    totalSaved: 1100,
    totalUse: 500,
    achievementScore: 68
  },
  {
    id: 8,
    name: "Robert Fox",
    rollNo: "IT21008",
    course: "Information Technology",
    avatar: "RF",
    eventCount: 21,
    totalLikes: 4200,
    totalShares: 1100,
    totalSaved: 1100,
    totalUse: 500,
    achievementScore: 65
  },
  {
    id: 9,
    name: "Courtney Henry",
    rollNo: "CS21009",
    course: "Computer Science",
    avatar: "CH",
    eventCount: 21,
    totalLikes: 4200,
    totalShares: 1100,
    totalSaved: 1100,
    totalUse: 500,
    achievementScore: 62
  }
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="h-6 w-6 text-warning" />;
    case 2:
      return <Medal className="h-6 w-6 text-muted-foreground" />;
    case 3:
      return <Trophy className="h-6 w-6 text-warning" />;
    default:
      return <span className="text-lg font-bold text-muted-foreground">{rank}</span>;
  }
};

const getRankBadgeColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-warning text-warning-foreground";
    case 2:
      return "bg-muted text-muted-foreground";
    case 3:
      return "bg-accent text-accent-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export function StudentLeaderboard({ canEdit = false, title = "Student Leaderboard", className = "" }: StudentLeaderboardProps) {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditStudent = (student: Student) => {
    setEditingStudent({ ...student });
    setIsEditModalOpen(true);
  };

  const handleSaveStudent = () => {
    if (!editingStudent) return;
    
    setStudents(prev => 
      prev.map(s => s.id === editingStudent.id ? editingStudent : s)
        .sort((a, b) => b.achievementScore - a.achievementScore)
    );
    setIsEditModalOpen(false);
    setEditingStudent(null);
  };

  const topThree = students.slice(0, 3);
  const remaining = students.slice(3);

  return (
    <Card className={`shadow-card border-0 bg-card/80 backdrop-blur-sm ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              {title}
            </CardTitle>
            <CardDescription>
              Top performing students based on achievement scores
            </CardDescription>
          </div>
          {canEdit && (
            <Button variant="outline" size="sm">
              <Edit3 className="h-4 w-4 mr-2" />
              Manage Leaderboard
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Top 3 Students */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topThree.map((student, index) => (
            <Card key={student.id} className="relative border border-border/50 hover:border-primary/30 transition-colors">
              <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center ${getRankBadgeColor(index + 1)}`}>
                {getRankIcon(index + 1)}
              </div>
              <CardContent className="pt-8 text-center space-y-3">
                <Avatar className="w-16 h-16 mx-auto">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {student.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{student.name}</h4>
                  <p className="text-xs text-muted-foreground">{student.eventCount} Events</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span className="font-medium">{(student.totalLikes / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="text-muted-foreground">Likes</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <Share2 className="h-3 w-3" />
                      <span className="font-medium">{(student.totalShares / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="text-muted-foreground">Shares</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-3 w-3" />
                      <span className="font-medium">{(student.totalSaved / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="text-muted-foreground">Saved</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span className="font-medium">{student.totalUse}</span>
                    </div>
                    <div className="text-muted-foreground">Use</div>
                  </div>
                </div>
                {canEdit && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => handleEditStudent(student)}
                  >
                    <Edit3 className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Remaining Students */}
        <div className="space-y-2">
          {remaining.map((student, index) => (
            <div key={student.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  {getRankIcon(index + 4)}
                </div>
                <Avatar className="w-10 h-10">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                    {student.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-sm">{student.name}</h4>
                  <p className="text-xs text-muted-foreground">{student.eventCount} Events</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs">
                <div className="text-center">
                  <div className="font-medium">{(student.totalLikes / 1000).toFixed(1)}k</div>
                  <div className="text-muted-foreground">Likes</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{(student.totalSaved / 1000).toFixed(1)}k</div>
                  <div className="text-muted-foreground">Saved</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{(student.totalShares / 1000).toFixed(1)}k</div>
                  <div className="text-muted-foreground">Shares</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{student.totalUse}</div>
                  <div className="text-muted-foreground">Use</div>
                </div>
                {canEdit && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEditStudent(student)}
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Student Data</DialogTitle>
              <DialogDescription>
                Update student leaderboard information and statistics.
              </DialogDescription>
            </DialogHeader>
            {editingStudent && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    value={editingStudent.name}
                    onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="eventCount" className="text-right">Events</Label>
                  <Input
                    id="eventCount"
                    type="number"
                    value={editingStudent.eventCount}
                    onChange={(e) => setEditingStudent({...editingStudent, eventCount: parseInt(e.target.value) || 0})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="totalLikes" className="text-right">Likes</Label>
                  <Input
                    id="totalLikes"
                    type="number"
                    value={editingStudent.totalLikes}
                    onChange={(e) => setEditingStudent({...editingStudent, totalLikes: parseInt(e.target.value) || 0})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="achievementScore" className="text-right">Score</Label>
                  <Input
                    id="achievementScore"
                    type="number"
                    value={editingStudent.achievementScore}
                    onChange={(e) => setEditingStudent({...editingStudent, achievementScore: parseInt(e.target.value) || 0})}
                    className="col-span-3"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSaveStudent}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}