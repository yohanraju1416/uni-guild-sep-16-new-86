import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { StudentSidebar } from "@/components/sidebars/StudentSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stepper } from "@/components/ui/stepper";
import { ArrowLeft, ArrowRight, Upload, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const EventRegistrationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");
  const eventTitle = searchParams.get("eventTitle");
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Team Lead Details
    teamLeadName: "",
    teamLeadEmail: "",
    teamLeadRegistrationNumber: "",
    teamLeadCourse: "",
    teamLeadYear: "",
    teamLeadPhone: "",
    
    // Team Members (5 members)
    teamMembers: Array(5).fill(null).map(() => ({
      name: "",
      email: "",
      registrationNumber: ""
    })),
    
    motivation: ""
  });
  const [files, setFiles] = useState<FileList | null>(null);

  const registrationSteps = [
    "Guidelines",
    "Team Lead Information", 
    "Team Members Information",
    "Upload Documents",
    "Confirmation"
  ];

  // Mock event data - in real app, fetch based on eventId
  const selectedEvent = {
    id: eventId,
    title: eventTitle || "Tech Innovation Summit 2024",
    guidelines: "Participants must develop a working prototype. Teams of 2-4 members allowed.",
    requirements: ["PowerPoint Presentation", "Working Prototype", "Source Code", "Demo Video"]
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate team lead information
      if (!formData.teamLeadName || !formData.teamLeadEmail || !formData.teamLeadRegistrationNumber) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required team lead fields.",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (currentStep === 2) {
      // Validate at least one team member
      const hasValidMembers = formData.teamMembers.some(member => 
        member.name && member.email && member.registrationNumber
      );
      if (!hasValidMembers) {
        toast({
          title: "Missing Information", 
          description: "Please add at least one team member with complete details.",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (currentStep < registrationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTeamMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormData({ ...formData, teamMembers: updatedMembers });
  };

  const handleFileUpload = () => {
    if (!files || files.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select at least one file to upload.",
        variant: "destructive"
      });
      return;
    }

    setCurrentStep(4); // Move to confirmation step
    toast({
      title: "Registration Complete",
      description: `Successfully registered for ${selectedEvent?.title}. Check your email for confirmation.`,
    });

    // Navigate to registrations page after completion
    setTimeout(() => {
      navigate('/dashboard/student/registrations');
    }, 3000);
  };

  return (
    <DashboardLayout
      sidebar={<StudentSidebar />}
      title="Event Registration"
      userRole="student"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/dashboard/student/events')}
              className="text-primary-foreground hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </div>
          <h2 className="text-2xl font-bold mb-2 mt-4">Register for {selectedEvent.title}</h2>
          <p className="text-primary-foreground/80">
            Complete the registration process to participate in this event
          </p>
        </div>

        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Registration Progress</CardTitle>
            <Stepper steps={registrationSteps} currentStep={currentStep} />
          </CardHeader>

          <CardContent className="mt-6">
            {/* Step 0: Guidelines */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3 text-lg">Event Guidelines:</h4>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-muted-foreground">{selectedEvent.guidelines}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3 text-lg">Required Submissions:</h4>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {selectedEvent.requirements.map((req: string, index: number) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => navigate('/dashboard/student/events')}>
                    Cancel Registration
                  </Button>
                  <Button onClick={handleNextStep} className="flex-1">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Continue to Team Lead Information
                  </Button>
                </div>
              </div>
            )}

            {/* Step 1: Team Lead Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4 text-lg">Team Lead Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="teamLeadName">Full Name *</Label>
                      <Input
                        id="teamLeadName"
                        value={formData.teamLeadName}
                        onChange={(e) => setFormData({...formData, teamLeadName: e.target.value})}
                        placeholder="Enter team lead full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="teamLeadEmail">Email Address *</Label>
                      <Input
                        id="teamLeadEmail"
                        type="email"
                        value={formData.teamLeadEmail}
                        onChange={(e) => setFormData({...formData, teamLeadEmail: e.target.value})}
                        placeholder="Enter team lead email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="teamLeadRegistrationNumber">Registration Number *</Label>
                      <Input
                        id="teamLeadRegistrationNumber"
                        value={formData.teamLeadRegistrationNumber}
                        onChange={(e) => setFormData({...formData, teamLeadRegistrationNumber: e.target.value})}
                        placeholder="Enter registration number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="teamLeadPhone">Phone Number</Label>
                      <Input
                        id="teamLeadPhone"
                        value={formData.teamLeadPhone}
                        onChange={(e) => setFormData({...formData, teamLeadPhone: e.target.value})}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="teamLeadCourse">Course</Label>
                      <Select value={formData.teamLeadCourse} onValueChange={(value) => setFormData({...formData, teamLeadCourse: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="btech">B.Tech</SelectItem>
                          <SelectItem value="mtech">M.Tech</SelectItem>
                          <SelectItem value="bca">BCA</SelectItem>
                          <SelectItem value="mca">MCA</SelectItem>
                          <SelectItem value="bsc">B.Sc</SelectItem>
                          <SelectItem value="msc">M.Sc</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="teamLeadYear">Year of Study</Label>
                      <Select value={formData.teamLeadYear} onValueChange={(value) => setFormData({...formData, teamLeadYear: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1st Year</SelectItem>
                          <SelectItem value="2">2nd Year</SelectItem>
                          <SelectItem value="3">3rd Year</SelectItem>
                          <SelectItem value="4">4th Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  <Button onClick={handleNextStep} className="flex-1">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Continue to Team Members
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Team Members Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4 text-lg">Team Members Information</h4>
                  <p className="text-sm text-muted-foreground mb-6">
                    Add your team members below. At least one team member is required.
                  </p>
                  
                  <div className="space-y-6">
                    {formData.teamMembers.map((member, index) => (
                      <Card key={index} className="border-2 border-dashed border-muted">
                        <CardHeader>
                          <CardTitle className="text-base">Team Member {index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor={`member-${index}-name`}>Full Name</Label>
                              <Input
                                id={`member-${index}-name`}
                                value={member.name}
                                onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                                placeholder="Enter member name"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`member-${index}-email`}>Email Address</Label>
                              <Input
                                id={`member-${index}-email`}
                                type="email"
                                value={member.email}
                                onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                                placeholder="Enter member email"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`member-${index}-registration`}>Registration Number</Label>
                              <Input
                                id={`member-${index}-registration`}
                                value={member.registrationNumber}
                                onChange={(e) => handleTeamMemberChange(index, 'registrationNumber', e.target.value)}
                                placeholder="Enter registration number"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="motivation">Team Motivation (Optional)</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                      placeholder="Why does your team want to participate in this event?"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  <Button onClick={handleNextStep} className="flex-1">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Continue to Document Upload
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Upload Documents */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4 text-lg">Upload Required Documents</h4>
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <Label htmlFor="fileUpload" className="cursor-pointer">
                      <div className="text-sm font-medium mb-2">Click to upload files</div>
                      <div className="text-xs text-muted-foreground mb-4">
                        Upload all required documents as per event guidelines
                      </div>
                      <Button variant="outline" size="sm">
                        Choose Files
                      </Button>
                    </Label>
                    <input
                      id="fileUpload"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => setFiles(e.target.files)}
                    />
                  </div>
                  
                  {files && files.length > 0 && (
                    <div className="mt-4">
                      <h5 className="font-medium mb-2">Selected Files:</h5>
                      <ul className="text-sm space-y-1">
                        {Array.from(files).map((file, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  <Button onClick={handleFileUpload} className="flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Registration
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="text-center space-y-6 py-8">
                <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Registration Successful!</h3>
                  <p className="text-muted-foreground">
                    Your registration for {selectedEvent.title} has been submitted successfully.
                    You will receive a confirmation email shortly.
                  </p>
                </div>
                <Button onClick={() => navigate('/dashboard/student/registrations')}>
                  View My Registrations
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EventRegistrationPage;