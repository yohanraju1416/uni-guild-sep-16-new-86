import { 
  LayoutDashboard,
  Plus,
  Edit,
  Users,
  CreditCard,
  List,
  Megaphone,
  UserCheck,
  User,
  Settings,
  UserPlus,
  UserCog,
  Link
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const adminMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Create Event",
    url: "/dashboard/admin/create",
    icon: Plus,
  },
  {
    title: "Edit Event",
    url: "/dashboard/admin/edit",
    icon: Edit,
  },
  {
    title: "Event List",
    url: "/dashboard/admin/events",
    icon: List,
  },
  {
    title: "Registrations",
    url: "/dashboard/admin/registrations",
    icon: Users,
  },
  {
    title: "Payments",
    url: "/dashboard/admin/payments",
    icon: CreditCard,
  },
  {
    title: "Event Updates",
    url: "/dashboard/admin/updates",
    icon: Megaphone,
  },
  {
    title: "Participant Management",
    url: "/dashboard/admin/participants",
    icon: UserPlus,
  },
  {
    title: "Evaluator Management",
    url: "/dashboard/admin/evaluator-management",
    icon: UserCog,
  },
  {
    title: "Assign Participants to Evaluators",
    url: "/dashboard/admin/assign-evaluators",
    icon: Link,
  },
];

const accountItems = [
  {
    title: "Profile",
    url: "/dashboard/admin/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/dashboard/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar collapsible="icon"
    >
      <SidebarContent className="bg-card/50 backdrop-blur-sm border-r border-border/50">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Admin Portal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="mr-3 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="mr-3 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}