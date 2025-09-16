import DashboardLayout from "@/components/layout/DashboardLayout";
import { StudentSidebar } from "@/components/sidebars/StudentSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { History, Trophy, Star, Download, Eye } from "lucide-react";

const PastEventsPage = () => {
  const pastEvents = [
    {
      id: 1,
      title: "Cybersecurity Challenge 2024",
      description: "Competed in ethical hacking and cybersecurity challenges",
      completionDate: "October 15, 2024",
      participationPeriod: "September 20 - October 15, 2024",
      result: "2nd Place",
      score: 92,
      certificate: true,
      feedback: "Excellent performance in penetration testing modules",
      category: "Technology",
      participants: 156
    },
    {
      id: 2,
      title: "Data Science Symposium",
      description: "Presented machine learning research project",
      completionDate: "September 30, 2024",
      participationPeriod: "August 15 - September 30, 2024",
      result: "Participation",
      score: 78,
      certificate: true,
      feedback: "Good understanding of ML concepts, improve visualization skills",
      category: "Research",
      participants: 89
    },
    {
      id: 3,
      title: "Innovation Workshop Series",
      description: "Completed 5-week innovation and entrepreneurship program",
      completionDate: "August 25, 2024",
      participationPeriod: "July 20 - August 25, 2024",
      result: "Completed",
      score: 85,
      certificate: true,
      feedback: "Demonstrated creative thinking and practical application",
      category: "Business",
      participants: 67
    },
    {
      id: 4,
      title: "Mobile App Development Contest",
      description: "Built and deployed a mobile application",
      completionDate: "July 10, 2024",
      participationPeriod: "May 15 - July 10, 2024",
      result: "1st Place",
      score: 96,
      certificate: true,
      feedback: "Outstanding technical implementation and user experience design",
      category: "Technology",
      participants: 234
    }
  ];

  const getResultColor = (result: string) => {
    if (result.includes("1st")) return "default";
    if (result.includes("2nd") || result.includes("3rd")) return "outline";
    return "secondary";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-accent";
    if (score >= 70) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <DashboardLayout
      sidebar={<StudentSidebar />}
      title="Past Events"
      userRole="student"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
          <h2 className="text-2xl font-bold mb-2">Past Events</h2>
          <p className="text-primary-foreground/80">
            Review your achievements, download certificates, and track your learning journey.
          </p>
        </div>

        {/* Achievement Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events Completed</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">4</div>
              <p className="text-xs text-muted-foreground">This academic year</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
              <Trophy className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">4</div>
              <p className="text-xs text-muted-foreground">100% completion rate</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Star className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">87.8</div>
              <p className="text-xs text-muted-foreground">Above average performance</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Awards Won</CardTitle>
              <Trophy className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">2</div>
              <p className="text-xs text-muted-foreground">Top 3 placements</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Filter Past Events</CardTitle>
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

        {/* Past Events List */}
        <div className="space-y-6">
          {pastEvents.map((event) => (
            <Card key={event.id} className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      {event.certificate && (
                        <Trophy className="h-5 w-5 text-accent" />
                      )}
                    </div>
                    <CardDescription>{event.description}</CardDescription>
                    <Badge variant="outline" className="w-fit">
                      {event.category}
                    </Badge>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge variant={getResultColor(event.result) as any} className="mb-2">
                      {event.result}
                    </Badge>
                    <div className={`text-2xl font-bold ${getScoreColor(event.score)}`}>
                      {event.score}%
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Completion Date:</span>
                    <div>{event.completionDate}</div>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Participation Period:</span>
                    <div>{event.participationPeriod}</div>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Total Participants:</span>
                    <div>{event.participants} students</div>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Certificate:</span>
                    <div className="flex items-center gap-1">
                      {event.certificate ? (
                        <>
                          <span className="text-success">Available</span>
                          <Trophy className="h-4 w-4 text-success" />
                        </>
                      ) : (
                        <span className="text-muted-foreground">Not Available</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Feedback Section */}
                <div className="space-y-2">
                  <h4 className="font-medium">Evaluator Feedback:</h4>
                  <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                    <p className="text-sm italic">"{event.feedback}"</p>
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Performance Score</span>
                    <span className={`text-sm font-bold ${getScoreColor(event.score)}`}>
                      {event.score}/100
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${event.score}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button variant="default">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  {event.certificate && (
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Certificate
                    </Button>
                  )}
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
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

export default PastEventsPage;