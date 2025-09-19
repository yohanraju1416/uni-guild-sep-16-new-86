import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import EvaluatorDashboard from "./pages/dashboards/EvaluatorDashboard";
import SuperAdminDashboard from "./pages/dashboards/SuperAdminDashboard";
// Super Admin Pages
import ManageStudentsPage from "./pages/super-admin/ManageStudentsPage";
import ManageAdminsPage from "./pages/super-admin/ManageAdminsPage";
import ManageEvaluatorsPage from "./pages/super-admin/ManageEvaluatorsPage";
import SuperAdminEventManagementPage from "./pages/super-admin/SuperAdminEventManagementPage";
import SuperAdminSystemSettingsPage from "./pages/super-admin/SuperAdminSystemSettingsPage";
import SuperAdminReportsPage from "./pages/super-admin/SuperAdminReportsPage";
import SuperAdminProfilePage from "./pages/super-admin/SuperAdminProfilePage";
// Evaluator Pages
import AssignedEventsPage from "./pages/evaluator/AssignedEventsPage";
import SubmissionsReviewPage from "./pages/evaluator/SubmissionsReviewPage";
import FeedbackHistoryPage from "./pages/evaluator/FeedbackHistoryPage";
import EvaluatorProfilePage from "./pages/evaluator/EvaluatorProfilePage";
import EvaluatorSettingsPage from "./pages/evaluator/EvaluatorSettingsPage";
// Student Pages
import EventPortalPage from "./pages/student/EventPortalPage";
import EventRegistrationPage from "./pages/student/EventRegistrationPage";
import UpcomingEventsPage from "./pages/student/UpcomingEventsPage";
import OngoingEventsPage from "./pages/student/OngoingEventsPage";
import PastEventsPage from "./pages/student/PastEventsPage";
import MyRegistrationsPage from "./pages/student/MyRegistrationsPage";
import SubmissionsPage from "./pages/student/SubmissionsPage";
// Admin Pages
import CreateEventPage from "./pages/admin/CreateEventPage";
import EditEventPage from "./pages/admin/EditEventPage";
import EventListPage from "./pages/admin/EventListPage";
import RegistrationsPage from "./pages/admin/RegistrationsPage";
import PaymentsPage from "./pages/admin/PaymentsPage";
import EventUpdatesPage from "./pages/admin/EventUpdatesPage";
import ParticipantManagementPage from "./pages/admin/ParticipantManagementPage";
import EvaluatorManagementPage from "./pages/admin/EvaluatorManagementPage";
import AssignEvaluatorsPage from "./pages/admin/AssignEvaluatorsPage";
import ProfileSettingsPage from "./pages/admin/ProfileSettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Student Routes */}
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/student/events" element={<EventPortalPage />} />
          <Route path="/dashboard/student/events/register" element={<EventRegistrationPage />} />
          <Route path="/dashboard/student/upcoming" element={<UpcomingEventsPage />} />
          <Route path="/dashboard/student/ongoing" element={<OngoingEventsPage />} />
          <Route path="/dashboard/student/past" element={<PastEventsPage />} />
          <Route path="/dashboard/student/registrations" element={<MyRegistrationsPage />} />
          <Route path="/dashboard/student/submissions" element={<SubmissionsPage />} />
          
          {/* Admin Routes */}
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/create" element={<CreateEventPage />} />
          <Route path="/dashboard/admin/edit" element={<EditEventPage />} />
          <Route path="/dashboard/admin/events" element={<EventListPage />} />
          <Route path="/dashboard/admin/registrations" element={<RegistrationsPage />} />
          <Route path="/dashboard/admin/payments" element={<PaymentsPage />} />
          <Route path="/dashboard/admin/updates" element={<EventUpdatesPage />} />
          <Route path="/dashboard/admin/participants" element={<ParticipantManagementPage />} />
          <Route path="/dashboard/admin/evaluator-management" element={<EvaluatorManagementPage />} />
          <Route path="/dashboard/admin/assign-evaluators" element={<AssignEvaluatorsPage />} />
          <Route path="/dashboard/admin/profile" element={<ProfileSettingsPage />} />
          <Route path="/dashboard/admin/settings" element={<ProfileSettingsPage />} />
          
          {/* Evaluator Routes */}
          <Route path="/dashboard/evaluator" element={<EvaluatorDashboard />} />
          <Route path="/dashboard/evaluator/events" element={<AssignedEventsPage />} />
          <Route path="/dashboard/evaluator/submissions" element={<SubmissionsReviewPage />} />
          <Route path="/dashboard/evaluator/feedback" element={<FeedbackHistoryPage />} />
          <Route path="/dashboard/evaluator/profile" element={<EvaluatorProfilePage />} />
          <Route path="/dashboard/evaluator/settings" element={<EvaluatorSettingsPage />} />
          
          {/* Super Admin Routes */}
          <Route path="/dashboard/super-admin" element={<SuperAdminDashboard />} />
          <Route path="/dashboard/super-admin/students" element={<ManageStudentsPage />} />
          <Route path="/dashboard/super-admin/admins" element={<ManageAdminsPage />} />
          <Route path="/dashboard/super-admin/evaluators" element={<ManageEvaluatorsPage />} />
          <Route path="/dashboard/super-admin/events" element={<SuperAdminEventManagementPage />} />
          <Route path="/dashboard/super-admin/system" element={<SuperAdminSystemSettingsPage />} />
          <Route path="/dashboard/super-admin/reports" element={<SuperAdminReportsPage />} />
          <Route path="/dashboard/super-admin/profile" element={<SuperAdminProfilePage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
