import DashboardLayout from "@/components/layout/DashboardLayout";
import { StudentSidebar } from "@/components/sidebars/StudentSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const UpcomingEventsPage = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      description: "Showcase your innovative tech solutions and compete for prizes worth $10,000",
      date: "December 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "University Auditorium",
      deadline: "December 10, 2024",
      registrations: 45,
      maxRegistrations: 100,
      category: "Technology",
      status: "Open"
    },
    {
      id: 2,
      title: "AI & Machine Learning Conference",
      description: "Learn from industry experts and present your AI research projects",
      date: "January 20, 2025",
      time: "10:00 AM - 6:00 PM",
      location: "Computer Science Building",
      deadline: "January 15, 2025",
      registrations: 28,
      maxRegistrations: 75,
      category: "Research",
      status: "Open"
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      description: "Present your startup idea to potential investors and win funding",
      date: "February 5, 2025",
      time: "2:00 PM - 8:00 PM",
      location: "Business School Hall",
      deadline: "January 30, 2025",
      registrations: 15,
      maxRegistrations: 50,
      category: "Business",
      status: "Open"
    },
    {
      id: 4,
      title: "Digital Art Exhibition",
      description: "Display your digital artwork and compete in various categories",
      date: "March 12, 2025",
      time: "11:00 AM - 7:00 PM",
      location: "Art Gallery",
      deadline: "March 5, 2025",
      registrations: 8,
      maxRegistrations: 40,
      category: "Arts",
      status: "Open"
    }
  ];

  return (
    <DashboardLayout
      sidebar={<StudentSidebar />}
      title="Upcoming Events"
      userRole="student"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
          <h2 className="text-2xl font-bold mb-2">Upcoming Events</h2>
          <p className="text-primary-foreground/80">
            Discover and register for exciting upcoming events. Don't miss out on amazing opportunities!
          </p>
        </div>

        {/* Filter Section */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Filter Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">All Categories</Button>
              <Button variant="outline" size="sm">Technology</Button>
              <Button variant="outline" size="sm">Research</Button>
              <Button variant="outline" size="sm">Business</Button>
              <Button variant="outline" size="sm">Arts</Button>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="shadow-card border-0 bg-card/80 backdrop-blur-sm hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <Badge variant="outline" className="w-fit">
                      {event.category}
                    </Badge>
                  </div>
                  <Badge variant="default" className="bg-success">
                    {event.status}
                  </Badge>
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
                  <Button className="flex-1" variant="default">
                    Register Now
                  </Button>
                  <Button variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UpcomingEventsPage;