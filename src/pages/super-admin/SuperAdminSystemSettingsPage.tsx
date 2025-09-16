import { useState } from "react";
import { SuperAdminSidebar } from "@/components/sidebars/SuperAdminSidebar";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Settings, Database, Shield, Mail, Bell, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  maxFileUploadSize: number;
  defaultEventDuration: number;
  enableNotifications: boolean;
  enableEmailNotifications: boolean;
  enableSMSNotifications: boolean;
  maintenanceMode: boolean;
  allowUserRegistration: boolean;
  requireEmailVerification: boolean;
  sessionTimeout: number;
  passwordMinLength: number;
  theme: "light" | "dark" | "system";
  language: string;
  timezone: string;
}

const SuperAdminSystemSettingsPage = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: "UNI Guild Platform",
    siteDescription: "University event management and competition platform",
    contactEmail: "admin@uniguild.edu",
    maxFileUploadSize: 10,
    defaultEventDuration: 3,
    enableNotifications: true,
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    maintenanceMode: false,
    allowUserRegistration: true,
    requireEmailVerification: true,
    sessionTimeout: 30,
    passwordMinLength: 8,
    theme: "system",
    language: "en",
    timezone: "UTC"
  });

  const [permissions, setPermissions] = useState({
    students: {
      canCreateEvents: false,
      canViewAllEvents: true,
      canEditProfile: true,
      canUploadFiles: true
    },
    admins: {
      canCreateEvents: true,
      canManageUsers: true,
      canViewReports: true,
      canEditSystemSettings: false
    },
    evaluators: {
      canViewAssignedEvents: true,
      canSubmitFeedback: true,
      canViewStudentProfiles: true,
      canExportReports: false
    }
  });

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    toast({
      title: "Settings Updated",
      description: "System settings have been saved successfully.",
    });
  };

  const handleSavePermissions = () => {
    // In a real app, this would save to backend
    toast({
      title: "Permissions Updated",
      description: "Role permissions have been updated successfully.",
    });
  };

  const handleMaintenanceToggle = (enabled: boolean) => {
    setSettings({ ...settings, maintenanceMode: enabled });
    toast({
      title: enabled ? "Maintenance Mode Enabled" : "Maintenance Mode Disabled",
      description: enabled 
        ? "The system is now in maintenance mode. Users will see a maintenance message."
        : "The system is now live and accessible to all users.",
      variant: enabled ? "destructive" : "default"
    });
  };

  return (
    <DashboardLayout
      sidebar={<SuperAdminSidebar />}
      title="System Settings"
      userRole="super-admin"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
            <p className="text-muted-foreground">Configure global system settings and permissions</p>
          </div>
        </div>

        {/* General Settings */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Input
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="maxFileSize">Max File Upload (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={settings.maxFileUploadSize}
                  onChange={(e) => setSettings({ ...settings, maxFileUploadSize: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="eventDuration">Default Event Duration (days)</Label>
                <Input
                  id="eventDuration"
                  type="number"
                  value={settings.defaultEventDuration}
                  onChange={(e) => setSettings({ ...settings, defaultEventDuration: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <Button onClick={handleSaveSettings} className="w-full md:w-auto">
              Save General Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-accent" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">Allow the system to send notifications to users</p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, enableNotifications: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Send notifications via email</p>
              </div>
              <Switch
                checked={settings.enableEmailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, enableEmailNotifications: checked })}
                disabled={!settings.enableNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
              </div>
              <Switch
                checked={settings.enableSMSNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, enableSMSNotifications: checked })}
                disabled={!settings.enableNotifications}
              />
            </div>

            <Button onClick={handleSaveSettings} className="w-full md:w-auto">
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security & Authentication */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-warning" />
              Security & Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Allow User Registration</Label>
                <p className="text-sm text-muted-foreground">Allow new users to register accounts</p>
              </div>
              <Switch
                checked={settings.allowUserRegistration}
                onCheckedChange={(checked) => setSettings({ ...settings, allowUserRegistration: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Require Email Verification</Label>
                <p className="text-sm text-muted-foreground">Users must verify email before access</p>
              </div>
              <Switch
                checked={settings.requireEmailVerification}
                onCheckedChange={(checked) => setSettings({ ...settings, requireEmailVerification: checked })}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="passwordLength">Minimum Password Length</Label>
                <Input
                  id="passwordLength"
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={(e) => setSettings({ ...settings, passwordMinLength: parseInt(e.target.value) })}
                  min="6"
                  max="32"
                />
              </div>
            </div>

            <Button onClick={handleSaveSettings} className="w-full md:w-auto">
              Save Security Settings
            </Button>
          </CardContent>
        </Card>

        {/* Role Permissions */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Role Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Student Permissions */}
            <div>
              <h3 className="text-lg font-medium mb-3">Student Permissions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Can Create Events</Label>
                  <Switch
                    checked={permissions.students.canCreateEvents}
                    onCheckedChange={(checked) => 
                      setPermissions({
                        ...permissions,
                        students: { ...permissions.students, canCreateEvents: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Can View All Events</Label>
                  <Switch
                    checked={permissions.students.canViewAllEvents}
                    onCheckedChange={(checked) => 
                      setPermissions({
                        ...permissions,
                        students: { ...permissions.students, canViewAllEvents: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Can Edit Profile</Label>
                  <Switch
                    checked={permissions.students.canEditProfile}
                    onCheckedChange={(checked) => 
                      setPermissions({
                        ...permissions,
                        students: { ...permissions.students, canEditProfile: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Can Upload Files</Label>
                  <Switch
                    checked={permissions.students.canUploadFiles}
                    onCheckedChange={(checked) => 
                      setPermissions({
                        ...permissions,
                        students: { ...permissions.students, canUploadFiles: checked }
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Admin Permissions */}
            <div>
              <h3 className="text-lg font-medium mb-3">Admin Permissions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Can Create Events</Label>
                  <Switch
                    checked={permissions.admins.canCreateEvents}
                    onCheckedChange={(checked) => 
                      setPermissions({
                        ...permissions,
                        admins: { ...permissions.admins, canCreateEvents: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Can Manage Users</Label>
                  <Switch
                    checked={permissions.admins.canManageUsers}
                    onCheckedChange={(checked) => 
                      setPermissions({
                        ...permissions,
                        admins: { ...permissions.admins, canManageUsers: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Can View Reports</Label>
                  <Switch
                    checked={permissions.admins.canViewReports}
                    onCheckedChange={(checked) => 
                      setPermissions({
                        ...permissions,
                        admins: { ...permissions.admins, canViewReports: checked }
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Evaluator Permissions */}
            <div>
              <h3 className="text-lg font-medium mb-3">Evaluator Permissions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Can View Assigned Events</Label>
                  <Switch
                    checked={permissions.evaluators.canViewAssignedEvents}
                    onCheckedChange={(checked) => 
                      setPermissions({
                        ...permissions,
                        evaluators: { ...permissions.evaluators, canViewAssignedEvents: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Can Submit Feedback</Label>
                  <Switch
                    checked={permissions.evaluators.canSubmitFeedback}
                    onCheckedChange={(checked) => 
                      setPermissions({
                        ...permissions,
                        evaluators: { ...permissions.evaluators, canSubmitFeedback: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Can View Student Profiles</Label>
                  <Switch
                    checked={permissions.evaluators.canViewStudentProfiles}
                    onCheckedChange={(checked) => 
                      setPermissions({
                        ...permissions,
                        evaluators: { ...permissions.evaluators, canViewStudentProfiles: checked }
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleSavePermissions} className="w-full md:w-auto">
              Save Permission Settings
            </Button>
          </CardContent>
        </Card>

        {/* System Control */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-destructive" />
              System Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
              <div>
                <Label className="text-base font-medium text-destructive">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable maintenance mode to temporarily disable user access
                </p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={handleMaintenanceToggle}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Button variant="outline" className="w-full">
                <Database className="h-4 w-4 mr-2" />
                Backup Database
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Test Email Configuration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminSystemSettingsPage;