import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { StudentSidebar } from "@/components/sidebars/StudentSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stepper } from "@/components/ui/stepper";
import { Calendar, Clock, MapPin, Users, FileText, Upload, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const EventPortalPage = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    course: "",
    year: "",
    email: "",
    phone: "",
    motivation: ""
  });
  const [files, setFiles] = useState<FileList | null>(null);

  const registrationSteps = [
    "Guidelines",
    "Personal Info", 
    "Upload Documents",
    "Confirmation"
  ];

  const events = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      description: "Showcase your innovative tech solutions and compete for prizes worth $10,000",
      category: "Hackathon",
      date: "December 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "University Auditorium",
      deadline: "December 10, 2024",
      registrations: 45,
      maxRegistrations: 100,
      status: "Open",
      fee: "$50",
      guidelines: "Participants must develop a working prototype. Teams of 2-4 members allowed.",
      requirements: ["PowerPoint Presentation", "Working Prototype", "Source Code", "Demo Video"]
    },
    {
      id: 2,
      title: "AI & Machine Learning Conference",
      description: "Learn from industry experts and present your AI research projects",
      category: "Research",
      date: "January 20, 2025",
      time: "10:00 AM - 6:00 PM",
      location: "Computer Science Building",
      deadline: "January 15, 2025",
      registrations: 28,
      maxRegistrations: 75,
      status: "Open",
      fee: "$75",
      guidelines: "Original research papers only. Peer review process included.",
      requirements: ["Research Paper (PDF)", "Abstract", "Presentation Slides"]
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      description: "Present your startup idea to potential investors and win funding",
      category: "Business",
      date: "February 5, 2025",
      time: "2:00 PM - 8:00 PM",
      location: "Business School Hall",
      deadline: "January 30, 2025",
      registrations: 15,
      maxRegistrations: 50,
      status: "Open",
      fee: "$30",
      guidelines: "5-minute pitch followed by Q&A. Business plan required.",
      requirements: ["Business Plan", "Pitch Deck", "Financial Projections"]
    },
    {
      id: 4,
      title: "Digital Art Exhibition",
      description: "Display your digital artwork and compete in various categories",
      category: "Arts",
      date: "March 12, 2025",
      time: "11:00 AM - 7:00 PM",
      location: "Art Gallery",
      deadline: "March 5, 2025",
      registrations: 8,
      maxRegistrations: 40,
      status: "Open",
      fee: "$25",
      guidelines: "Original digital artworks only. Multiple formats accepted.",
      requirements: ["Portfolio (5-10 pieces)", "Artist Statement", "High-res Images"]
    },
    {
      id: 5,
      title: "Web Development Bootcamp",
      description: "Intensive 3-day bootcamp to build full-stack applications",
      category: "Workshop",
      date: "December 8, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "IT Lab",
      deadline: "December 5, 2024",
      registrations: 67,
      maxRegistrations: 80,
      status: "Open",
      fee: "$100",
      guidelines: "Basic programming knowledge required. Laptop mandatory.",
      requirements: ["Final Project", "Code Repository", "Documentation"]
    },
    {
      id: 6,
      title: "Cybersecurity Workshop",
      description: "Learn ethical hacking and cybersecurity best practices",
      category: "Hackathon",
      date: "January 10, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Security Lab",
      deadline: "January 5, 2025",
      registrations: 23,
      maxRegistrations: 60,
      status: "Open",
      fee: "$60",
      guidelines: "Hands-on ethical hacking exercises. Certificate provided.",
      requirements: ["Security Assessment Report", "Vulnerability Analysis"]
    }
  ];

  const [filterCategory, setFilterCategory] = useState("All");
  const categories = ["All", "Hackathon", "Research", "Business", "Arts", "Workshop"];

  const filteredEvents = filterCategory === "All" 
    ? events 
    : events.filter(event => event.category === filterCategory);

  const handleRegistration = (event: any) => {
    setSelectedEvent(event);
    setCurrentStep(0);
    setShowRegistrationModal(true);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate form before moving to next step
      if (!formData.name || !formData.rollNo || !formData.email) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
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

  const handleFileUpload = () => {
    if (!files || files.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select at least one file to upload.",
        variant: "destructive"
      });
      return;
    }

    setCurrentStep(3); // Move to confirmation step
    toast({
      title: "Registration Complete",
      description: `Successfully registered for ${selectedEvent?.title}. Check your email for confirmation.`,
    });

    // Simulate navigation to registrations page
    setTimeout(() => {
      setShowRegistrationModal(false);
      navigate('/dashboard/student/registrations');
    }, 3000);
  };

  return (
    <DashboardLayout
      sidebar={<StudentSidebar />}
      title="Event Portal"
      userRole="student"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
          <h2 className="text-2xl font-bold mb-2">Event Portal</h2>
          <p className="text-primary-foreground/80">
            Discover amazing events and hackathons. Register now and showcase your talents!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{events.length}</div>
              <p className="text-xs text-muted-foreground">Open for registration</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hackathons</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {events.filter(e => e.category === "Hackathon").length}
              </div>
              <p className="text-xs text-muted-foreground">Competition events</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Workshops</CardTitle>
              <FileText className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {events.filter(e => e.category === "Workshop").length}
              </div>
              <p className="text-xs text-muted-foreground">Learning events</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Filter Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={filterCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="shadow-card border-0 bg-card/80 backdrop-blur-sm hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline">
                        {event.category}
                      </Badge>
                      <Badge variant="default" className="bg-success">
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-accent">{event.fee}</div>
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {event.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{event.registrations}/{event.maxRegistrations}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Registration Progress</span>
                    <span>{Math.round((event.registrations / event.maxRegistrations) * 100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(event.registrations / event.maxRegistrations) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <strong>Registration Deadline:</strong> {event.deadline}
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex-1" variant="default">
                        Register Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{event.title} - Event Guidelines</DialogTitle>
                        <DialogDescription>
                          Please read the guidelines carefully before proceeding with registration.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Event Guidelines:</h4>
                          <p className="text-sm text-muted-foreground">{event.guidelines}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Required Submissions:</h4>
                          <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                            {event.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button 
                            variant="gradient" 
                            className="flex-1"
                            onClick={() => navigate(`/dashboard/student/events/register?eventId=${event.id}&eventTitle=${encodeURIComponent(event.title)}`)}
                          >
                            Proceed to Registration
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Registration Stepper Modal */}
        <Dialog open={showRegistrationModal} onOpenChange={setShowRegistrationModal}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader className="space-y-4">
              <DialogTitle>Register for {selectedEvent?.title}</DialogTitle>
              <Stepper steps={registrationSteps} currentStep={currentStep} />
            </DialogHeader>

            <div className="mt-6">
              {/* Step 0: Guidelines */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Event Guidelines:</h4>
                    <p className="text-sm text-muted-foreground">{selectedEvent?.guidelines}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Required Submissions:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                      {selectedEvent?.requirements.map((req: string, index: number) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" onClick={() => setShowRegistrationModal(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Continue to Registration
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rollNo">Roll Number *</Label>
                      <Input
                        id="rollNo"
                        value={formData.rollNo}
                        onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                        placeholder="Enter roll number"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="course">Course</Label>
                      <Select onValueChange={(value) => setFormData({...formData, course: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="btech">B.Tech</SelectItem>
                          <SelectItem value="mtech">M.Tech</SelectItem>
                          <SelectItem value="bba">BBA</SelectItem>
                          <SelectItem value="mba">MBA</SelectItem>
                          <SelectItem value="bsc">B.Sc</SelectItem>
                          <SelectItem value="msc">M.Sc</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Select onValueChange={(value) => setFormData({...formData, year: value})}>
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

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="motivation">Why do you want to participate?</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                      placeholder="Tell us your motivation..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Next: Upload Documents
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Upload Documents */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="files">Required Files:</Label>
                    <div className="mt-2 space-y-2">
                      {selectedEvent?.requirements.map((req: string, index: number) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          • {req}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-muted rounded-lg p-6">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <div className="text-sm font-medium">Drop files here or click to browse</div>
                      <div className="text-xs text-muted-foreground">
                        Supports PDF, DOC, DOCX files up to 10MB each
                      </div>
                      <Input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => setFiles(e.target.files)}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  {files && files.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Files:</Label>
                      {Array.from(files).map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4" />
                          <span>{file.name}</span>
                          <Badge variant="outline">{(file.size / 1024 / 1024).toFixed(2)} MB</Badge>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button onClick={handleFileUpload} className="flex-1">
                      <Upload className="w-4 h-4 mr-2" />
                      Complete Registration
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <div className="space-y-6 text-center">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-success/20 p-6">
                      <CheckCircle className="h-12 w-12 text-success" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Registration Successful!</h3>
                    <p className="text-muted-foreground">
                      Your registration for <strong>{selectedEvent?.title}</strong> has been completed successfully.
                    </p>
                  </div>

                  <Card className="text-left p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Event:</span>
                        <span>{selectedEvent?.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Date:</span>
                        <span>{selectedEvent?.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Location:</span>
                        <span>{selectedEvent?.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Registration Fee:</span>
                        <span className="text-accent font-bold">{selectedEvent?.fee}</span>
                      </div>
                    </div>
                  </Card>

                  <div className="text-sm text-muted-foreground">
                    <p>A confirmation email has been sent to your registered email address.</p>
                    <p>You will be redirected to your registrations page shortly.</p>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default EventPortalPage;