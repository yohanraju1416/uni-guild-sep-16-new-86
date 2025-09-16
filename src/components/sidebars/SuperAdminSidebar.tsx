import { 
  LayoutDashboard,
  Users,
  Calendar,
  Shield,
  Settings as SettingsIcon,
  User
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

const superAdminMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard/super-admin",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Students",
    url: "/dashboard/super-admin/students",
    icon: Users,
  },
  {
    title: "Manage Admins",
    url: "/dashboard/super-admin/admins",
    icon: Users,
  },
  {
    title: "Manage Evaluators",
    url: "/dashboard/super-admin/evaluators",
    icon: Users,
  },
  {
    title: "Event Management",
    url: "/dashboard/super-admin/events",
    icon: Calendar,
  },
  {
    title: "System Settings",
    url: "/dashboard/super-admin/system",
    icon: SettingsIcon,
  },
  {
    title: "Reports & Analytics",
    url: "/dashboard/super-admin/reports",
    icon: Shield,
  },
];

const accountItems = [
  {
    title: "Profile",
    url: "/dashboard/super-admin/profile",
    icon: User,
  },
];

export function SuperAdminSidebar() {
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
            Super Admin Portal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {superAdminMenuItems.map((item) => (
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