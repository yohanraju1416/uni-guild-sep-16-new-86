import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { AdminSidebar } from "@/components/sidebars/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Check, Download, Eye, DollarSign, CreditCard, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentsPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");

  const [payments, setPayments] = useState([
    {
      id: 1,
      studentName: "John Doe",
      email: "john.doe@university.edu",
      eventTitle: "Tech Innovation Summit 2024",
      eventId: 1,
      amount: 150,
      paymentDate: "2024-11-01",
      paymentMethod: "Credit Card",
      transactionId: "TXN001",
      status: "Paid"
    },
    {
      id: 2,
      studentName: "Jane Smith",
      email: "jane.smith@university.edu",
      eventTitle: "AI & Machine Learning Conference",
      eventId: 2,
      amount: 200,
      paymentDate: "2024-10-28",
      paymentMethod: "Bank Transfer",
      transactionId: "TXN002",
      status: "Paid"
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      email: "mike.johnson@university.edu",
      eventTitle: "Digital Marketing Workshop",
      eventId: 3,
      amount: 75,
      paymentDate: "2024-11-02",
      paymentMethod: "PayPal",
      transactionId: "TXN003",
      status: "Pending"
    },
    {
      id: 4,
      studentName: "Sarah Wilson",
      email: "sarah.wilson@university.edu",
      eventTitle: "Tech Innovation Summit 2024",
      eventId: 1,
      amount: 150,
      paymentDate: "2024-11-03",
      paymentMethod: "Credit Card",
      transactionId: "TXN004",
      status: "Failed"
    },
    {
      id: 5,
      studentName: "Alex Brown",
      email: "alex.brown@university.edu",
      eventTitle: "Cybersecurity Bootcamp",
      eventId: 4,
      amount: 300,
      paymentDate: "2024-10-15",
      paymentMethod: "Bank Transfer",
      transactionId: "TXN005",
      status: "Paid"
    },
    {
      id: 6,
      studentName: "Emma Davis",
      email: "emma.davis@university.edu",
      eventTitle: "AI & Machine Learning Conference",
      eventId: 2,
      amount: 200,
      paymentDate: "2024-11-04",
      paymentMethod: "UPI",
      transactionId: "TXN006",
      status: "Pending"
    }
  ]);

  const events = [
    { id: 1, title: "Tech Innovation Summit 2024" },
    { id: 2, title: "AI & Machine Learning Conference" },
    { id: 3, title: "Digital Marketing Workshop" },
    { id: 4, title: "Cybersecurity Bootcamp" }
  ];

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesEvent = eventFilter === "all" || payment.eventId.toString() === eventFilter;
    
    return matchesSearch && matchesStatus && matchesEvent;
  });

  const handleApprovePayment = (paymentId: number, studentName: string) => {
    setPayments(prev => 
      prev.map(payment => 
        payment.id === paymentId 
          ? { ...payment, status: "Paid" }
          : payment
      )
    );
    
    toast({
      title: "Payment Approved",
      description: `Payment from ${studentName} has been confirmed.`,
    });
  };

  const handleExportPayments = () => {
    toast({
      title: "Export Started",
      description: "Payment report is being generated and will be downloaded shortly.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const stats = {
    totalRevenue: payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0),
    pendingAmount: payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0),
    totalTransactions: payments.length,
    successfulPayments: payments.filter(p => p.status === 'Paid').length,
    pendingPayments: payments.filter(p => p.status === 'Pending').length,
    failedPayments: payments.filter(p => p.status === 'Failed').length
  };

  return (
    <DashboardLayout
      sidebar={<AdminSidebar />}
      title="Payments"
      userRole="admin"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Payment Management</h2>
            <p className="text-muted-foreground">Monitor and manage all payment transactions</p>
          </div>
          <Button onClick={handleExportPayments}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Total Revenue</span>
              </div>
              <p className="text-2xl font-bold mt-2">${stats.totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{stats.successfulPayments} successful payments</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">Pending Amount</span>
              </div>
              <p className="text-2xl font-bold mt-2">${stats.pendingAmount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{stats.pendingPayments} pending payments</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Total Transactions</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.totalTransactions}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Success Rate</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {((stats.successfulPayments / stats.totalTransactions) * 100).toFixed(1)}%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, event, or transaction ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger className="w-full md:w-60">
                  <SelectValue placeholder="Event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  {events.map((event) => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Transactions ({filteredPayments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Details</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{payment.studentName}</p>
                          <p className="text-sm text-muted-foreground">{payment.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{payment.eventTitle}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">${payment.amount}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{payment.paymentMethod}</Badge>
                      </TableCell>
                      <TableCell>
                        <code className="bg-muted px-2 py-1 rounded text-sm">
                          {payment.transactionId}
                        </code>
                      </TableCell>
                      <TableCell>
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {payment.status === 'Pending' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprovePayment(payment.id, payment.studentName)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PaymentsPage;