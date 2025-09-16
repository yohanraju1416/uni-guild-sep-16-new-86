import { useState } from "react";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Crown, Shield, Settings, Key, Bell, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SuperAdminProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
  organization: string;
  department: string;
  joinDate: string;
  lastLogin: string;
  role: string;
  permissions: string[];
}

interface NotificationSettings {
  emailNotifications: boolean;
  systemAlerts: boolean;
  securityAlerts: boolean;
  maintenanceUpdates: boolean;
  userRegistrations: boolean;
  eventCreations: boolean;
}

const SuperAdminProfilePage = () => {
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<SuperAdminProfile>({
    name: "Dr. Alexandra Mitchell",
    email: "alexandra.mitchell@uniguild.edu",
    phone: "+1 (555) 123-4567",
    bio: "Experienced system administrator with over 10 years in educational technology management. Leading digital transformation initiatives for university events and student engagement platforms.",
    organization: "University of Technology",
    department: "Information Technology Services",
    joinDate: "2020-03-15",
    lastLogin: "2024-01-20 09:30 AM",
    role: "Super Administrator",
    permissions: ["FULL_SYSTEM_ACCESS", "USER_MANAGEMENT", "SYSTEM_CONFIGURATION", "SECURITY_OVERSIGHT", "REPORTS_ACCESS"]
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    systemAlerts: true,
    securityAlerts: true,
    maintenanceUpdates: true,
    userRegistrations: false,
    eventCreations: false
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation password do not match.",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    
    toast({
      title: "Password Changed",
      description: "Your password has been changed successfully.",
    });
  };

  const handleNotificationUpdate = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const recentActivity = [
    { action: "Updated system settings", timestamp: "2 hours ago", type: "system" },
    { action: "Created new admin account", timestamp: "5 hours ago", type: "user" },
    { action: "Generated system report", timestamp: "1 day ago", type: "report" },
    { action: "Updated role permissions", timestamp: "2 days ago", type: "security" },
    { action: "Performed database backup", timestamp: "3 days ago", type: "system" }
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case "system": return <Settings className="h-3 w-3" />;
      case "user": return <User className="h-3 w-3" />;
      case "security": return <Shield className="h-3 w-3" />;
      case "report": return <Globe className="h-3 w-3" />;
      default: return <Settings className="h-3 w-3" />;
    }
  };

  return (
    <DashboardLayout
      sidebar={<SuperAdminSidebar />}
      title="Profile & Settings"
      userRole="super-admin"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Profile & Settings</h1>
            <p className="text-muted-foreground">Manage your personal information and account preferences</p>
          </div>
        </div>

        {/* Profile Overview Card */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">AM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <Badge className="bg-gradient-primary">
                    <Crown className="h-3 w-3 mr-1" />
                    Super Admin
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-1">{profile.email}</p>
                <p className="text-sm text-muted-foreground">
                  {profile.organization} • {profile.department}
                </p>
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(profile.joinDate).toLocaleDateString()} • Last login: {profile.lastLogin}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      value={profile.organization}
                      onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <Button onClick={handleProfileUpdate} className="w-full md:w-auto">
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-warning" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <Button onClick={handlePasswordChange} className="w-full md:w-auto">
                  Change Password
                </Button>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-accent" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email notifications for important events</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, emailNotifications: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">System Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified about system status changes</p>
                  </div>
                  <Switch
                    checked={notifications.systemAlerts}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, systemAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">Important security-related notifications</p>
                  </div>
                  <Switch
                    checked={notifications.securityAlerts}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, securityAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Maintenance Updates</Label>
                    <p className="text-sm text-muted-foreground">Notifications about system maintenance</p>
                  </div>
                  <Switch
                    checked={notifications.maintenanceUpdates}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, maintenanceUpdates: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">User Registrations</Label>
                    <p className="text-sm text-muted-foreground">New user registration notifications</p>
                  </div>
                  <Switch
                    checked={notifications.userRegistrations}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, userRegistrations: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Event Creations</Label>
                    <p className="text-sm text-muted-foreground">Notifications when new events are created</p>
                  </div>
                  <Switch
                    checked={notifications.eventCreations}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, eventCreations: checked })
                    }
                  />
                </div>

                <Button onClick={handleNotificationUpdate} className="w-full md:w-auto">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Permissions */}
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Permissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {profile.permissions.map((permission, index) => (
                    <Badge key={index} variant="outline" className="w-full justify-start text-xs">
                      {permission.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="mt-1">
                        {getActionIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminProfilePage;