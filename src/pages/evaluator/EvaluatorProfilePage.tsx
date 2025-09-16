import DashboardLayout from "@/components/layout/DashboardLayout";
import { EvaluatorSidebar } from "@/components/sidebars/EvaluatorSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Calendar, Award, Edit3, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const EvaluatorProfilePage = () => {
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Dr. Sarah Mitchell",
    email: "sarah.mitchell@university.edu",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Technology Evaluator",
    department: "Computer Science Department",
    joinDate: "2022-03-15",
    bio: "Experienced technology evaluator with over 8 years in academic assessment and research validation. Specialized in AI, machine learning, and software engineering projects.",
    expertise: ["Artificial Intelligence", "Machine Learning", "Software Engineering", "Data Science", "Blockchain Technology"],
    education: [
      {
        degree: "Ph.D. in Computer Science",
        institution: "Stanford University",
        year: "2015"
      },
      {
        degree: "M.S. in Software Engineering",
        institution: "MIT",
        year: "2011"
      }
    ],
    certifications: [
      "Certified AI Specialist",
      "Advanced Machine Learning Certificate",
      "Academic Assessment Certification"
    ]
  });

  const [editData, setEditData] = useState({ ...profileData });
  
  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...profileData });
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const stats = {
    totalEvaluations: 127,
    activeEvents: 3,
    avgRating: 4.6,
    completionRate: 98
  };

  return (
    <DashboardLayout
      sidebar={<EvaluatorSidebar />}
      title="Evaluator Profile"
      userRole="evaluator"
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Evaluator Profile</h2>
              <p className="text-primary-foreground/80">
                Manage your professional information and evaluation preferences.
              </p>
            </div>
            {!isEditing ? (
              <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" onClick={handleEdit}>
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-lg">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{profileData.name}</h3>
                    <p className="text-muted-foreground">{profileData.title}</p>
                    <p className="text-sm text-muted-foreground">{profileData.department}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    {isEditing ? (
                      <Input 
                        value={editData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{profileData.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    {isEditing ? (
                      <Input 
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        type="email"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{profileData.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    {isEditing ? (
                      <Input 
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{profileData.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    {isEditing ? (
                      <Input 
                        value={editData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{profileData.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  {isEditing ? (
                    <Textarea 
                      value={editData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <p className="p-3 bg-muted/30 rounded text-sm">{profileData.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Education</h4>
                  <div className="space-y-2">
                    {profileData.education.map((edu, index) => (
                      <div key={index} className="p-3 bg-muted/30 rounded">
                        <div className="font-medium">{edu.degree}</div>
                        <div className="text-sm text-muted-foreground">{edu.institution} • {edu.year}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Certifications</h4>
                  <div className="space-y-2">
                    {profileData.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Evaluation Statistics</CardTitle>
                <CardDescription>Your performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-primary rounded-lg text-primary-foreground">
                  <div className="text-2xl font-bold">{stats.totalEvaluations}</div>
                  <div className="text-sm opacity-80">Total Evaluations</div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="text-center p-3 bg-muted/30 rounded">
                    <div className="text-lg font-bold text-accent">{stats.activeEvents}</div>
                    <div className="text-xs text-muted-foreground">Active Events</div>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/30 rounded">
                    <div className="text-lg font-bold text-success">{stats.avgRating}</div>
                    <div className="text-xs text-muted-foreground">Avg Rating</div>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/30 rounded">
                    <div className="text-lg font-bold text-primary">{stats.completionRate}%</div>
                    <div className="text-xs text-muted-foreground">Completion Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Member since:</span>
                  <span>{new Date(profileData.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Role:</span>
                  <Badge variant="outline">Evaluator</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EvaluatorProfilePage;