"use client";
import { DashboardNav } from "@/components/dashboard-nav/dashboard-nav";
import MobileSidebar from "@/components/dashboard-nav/mobile-nav";
import { cn } from "@/lib/utils";

export const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "User profile",
    href: "/admin/user",
    icon: "user",
    label: "user",
  },
  {
    title: "Employees",
    href: "/admin/employee",
    icon: "employee",
    label: "employee",
  },
  {
    title: "Leaves",
    href: "/admin/leaves",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: "kanban",
    label: "kanban",
  },
  {
    title: "Logout",
    href: "/",
    icon: "login",
    label: "login",
  },
];

function LayoutDashboard({ children }) {
  return (
    <>
      <MobileSidebar />
      <div className="flex h-screen overflow-hidden">
        <nav
          className={cn(
            `relative hidden h-screen border-r pt-16 lg:block w-72`
          )}
        >
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <div className="space-y-1">
                <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
                  Overview
                </h2>
                <DashboardNav items={navItems} />
              </div>
            </div>
          </div>
        </nav>
        <main className="w-full pt-16">{children}</main>
      </div>
    </>
  );
}

export default LayoutDashboard;
