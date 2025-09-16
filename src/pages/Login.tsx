import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, Shield, Crown } from "lucide-react";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: ""
  });
  const navigate = useNavigate();

  const roles = [
    { value: "student", label: "Student", icon: GraduationCap },
    { value: "admin", label: "Admin", icon: Users },
    { value: "evaluator", label: "Event Evaluator", icon: Shield },
    { value: "super-admin", label: "Super Admin", icon: Crown }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.email && credentials.password && credentials.role) {
      // Navigate to appropriate dashboard based on role
      navigate(`/dashboard/${credentials.role}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-elegant">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                UNI Guild
              </h1>
              <p className="text-sm text-muted-foreground">University Event Management</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                  className="h-11 border-border/50 focus:border-primary"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="h-11 border-border/50 focus:border-primary"
                  required
                />
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">Select Your Role</Label>
                <Select value={credentials.role} onValueChange={(value) => setCredentials(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger className="h-11 border-border/50 focus:border-primary">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover/95 backdrop-blur-sm border border-border/50">
                    {roles.map((role) => {
                      const Icon = role.icon;
                      return (
                        <SelectItem key={role.value} value={role.value} className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {role.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full h-11 mt-6"
                variant="default"
              >
                Sign In to Dashboard
              </Button>

              {/* Demo Info */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground text-center">
                  Demo: Use any email/password with your selected role
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;