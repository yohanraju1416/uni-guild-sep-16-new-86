import DashboardLayout from "@/components/layout/DashboardLayout";
import { EvaluatorSidebar } from "@/components/sidebars/EvaluatorSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Shield, Eye, Save, Key } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const EvaluatorSettingsPage = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    assignmentAlerts: true,
    submissionAlerts: true,
    deadlineReminders: true,
    weeklyReports: false,
    
    // Privacy Settings
    profileVisibility: "evaluators", // public, evaluators, private
    showEvaluationHistory: true,
    showContactInfo: false,
    
    // Evaluation Preferences
    autoAssignEvents: true,
    maxConcurrentEvaluations: "5",
    preferredCategories: ["Technology", "AI/ML"],
    evaluationDeadlineBuffer: "2", // days
    
    // Security Settings
    twoFactorEnabled: false,
    sessionTimeout: "60", // minutes
    passwordChangeRequired: false
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePasswordChange = (key: string, value: string) => {
    setPasswords(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    // Simulate saving settings
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const changePassword = () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all password fields.",
        variant: "destructive"
      });
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive"
      });
      return;
    }

    if (passwords.newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }

    // Simulate password change
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const categories = [
    "Technology", "AI/ML", "Business", "Research", "Sustainability", 
    "Healthcare", "Education", "Finance", "Engineering"
  ];

  return (
    <DashboardLayout
      sidebar={<EvaluatorSidebar />}
      title="Settings"
      userRole="evaluator"
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
          <h2 className="text-2xl font-bold mb-2">Settings & Preferences</h2>
          <p className="text-primary-foreground/80">
            Customize your evaluation experience and manage your account settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Notification Settings */}
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Email Notifications</div>
                    <div className="text-xs text-muted-foreground">Receive updates via email</div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Push Notifications</div>
                    <div className="text-xs text-muted-foreground">Browser push notifications</div>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Assignment Alerts</div>
                    <div className="text-xs text-muted-foreground">New evaluation assignments</div>
                  </div>
                  <Switch
                    checked={settings.assignmentAlerts}
                    onCheckedChange={(checked) => handleSettingChange('assignmentAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Submission Alerts</div>
                    <div className="text-xs text-muted-foreground">New student submissions</div>
                  </div>
                  <Switch
                    checked={settings.submissionAlerts}
                    onCheckedChange={(checked) => handleSettingChange('submissionAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Deadline Reminders</div>
                    <div className="text-xs text-muted-foreground">Evaluation deadline alerts</div>
                  </div>
                  <Switch
                    checked={settings.deadlineReminders}
                    onCheckedChange={(checked) => handleSettingChange('deadlineReminders', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Weekly Reports</div>
                    <div className="text-xs text-muted-foreground">Weekly evaluation summary</div>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control your profile visibility and data sharing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Profile Visibility</label>
                  <Select value={settings.profileVisibility} onValueChange={(value) => handleSettingChange('profileVisibility', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="evaluators">Evaluators Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Show Evaluation History</div>
                    <div className="text-xs text-muted-foreground">Display past evaluations</div>
                  </div>
                  <Switch
                    checked={settings.showEvaluationHistory}
                    onCheckedChange={(checked) => handleSettingChange('showEvaluationHistory', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Show Contact Information</div>
                    <div className="text-xs text-muted-foreground">Display email and phone</div>
                  </div>
                  <Switch
                    checked={settings.showContactInfo}
                    onCheckedChange={(checked) => handleSettingChange('showContactInfo', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Evaluation Preferences */}
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Evaluation Preferences
                </CardTitle>
                <CardDescription>
                  Customize your evaluation workflow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Auto-assign Events</div>
                    <div className="text-xs text-muted-foreground">Automatically accept suitable events</div>
                  </div>
                  <Switch
                    checked={settings.autoAssignEvents}
                    onCheckedChange={(checked) => handleSettingChange('autoAssignEvents', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Concurrent Evaluations</label>
                  <Select value={settings.maxConcurrentEvaluations} onValueChange={(value) => handleSettingChange('maxConcurrentEvaluations', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 evaluations</SelectItem>
                      <SelectItem value="5">5 evaluations</SelectItem>
                      <SelectItem value="10">10 evaluations</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Evaluation Deadline Buffer</label>
                  <Select value={settings.evaluationDeadlineBuffer} onValueChange={(value) => handleSettingChange('evaluationDeadlineBuffer', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 day before</SelectItem>
                      <SelectItem value="2">2 days before</SelectItem>
                      <SelectItem value="3">3 days before</SelectItem>
                      <SelectItem value="7">1 week before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Preferred Categories</label>
                  <div className="text-xs text-muted-foreground mb-2">Select categories you prefer to evaluate</div>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={category}
                          checked={settings.preferredCategories.includes(category)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleSettingChange('preferredCategories', [...settings.preferredCategories, category]);
                            } else {
                              handleSettingChange('preferredCategories', settings.preferredCategories.filter(c => c !== category));
                            }
                          }}
                          className="rounded"
                        />
                        <label htmlFor={category} className="text-xs">{category}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Two-Factor Authentication</div>
                    <div className="text-xs text-muted-foreground">Add an extra layer of security</div>
                  </div>
                  <Switch
                    checked={settings.twoFactorEnabled}
                    onCheckedChange={(checked) => handleSettingChange('twoFactorEnabled', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Timeout</label>
                  <Select value={settings.sessionTimeout} onValueChange={(value) => handleSettingChange('sessionTimeout', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    Change Password
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground">Current Password</label>
                      <Input
                        type="password"
                        value={passwords.currentPassword}
                        onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground">New Password</label>
                      <Input
                        type="password"
                        value={passwords.newPassword}
                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground">Confirm New Password</label>
                      <Input
                        type="password"
                        value={passwords.confirmPassword}
                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      />
                    </div>
                    
                    <Button size="sm" onClick={changePassword} className="w-full">
                      Change Password
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Save Settings Button */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Save Changes</h3>
                <p className="text-sm text-muted-foreground">
                  Don't forget to save your preferences
                </p>
              </div>
              <Button onClick={saveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save All Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EvaluatorSettingsPage;