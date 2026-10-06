"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Briefcase, 
  Users, 
  Contact, 
  CalendarDays, 
  Receipt, 
  BarChart2, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Fan
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { name: "Jobs", href: "/admin/jobs", icon: Briefcase },
  { name: "Technicians", href: "/admin/technicians", icon: Users },
  { name: "Customers", href: "/admin/customers", icon: Contact },
  { name: "Schedule", href: "/admin/schedule", icon: CalendarDays },
  { name: "Invoices", href: "/admin/invoices", icon: Receipt },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart2 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-gray-100 transition-all duration-300 z-50 flex flex-col font-sans",
        isCollapsed ? "w-[64px]" : "w-[240px]"
      )}
    >
      {/* Brand Logo */}
      <div className="h-16 flex items-center justify-center lg:justify-start border-b border-gray-100 px-6 overflow-hidden shrink-0">
        <Link href="/admin/dashboard" className="flex items-center gap-2 group">
          <div className="text-brand-primary min-w-[24px] group-hover:rotate-180 transition-transform duration-700">
            <Fan className="h-6 w-6" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-extrabold text-brand-black tracking-tight whitespace-nowrap">
              FixFlow
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1.5 px-3 custom-scrollbar">
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname.startsWith(link.href);

          return (
            <Link
              key={link.name}
              href={link.href}
              title={isCollapsed ? link.name : undefined}
              className={cn(
                "flex items-center gap-3 px-3 h-11 rounded-lg transition-all whitespace-nowrap group",
                isActive 
                  ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20" 
                  : "text-gray-500 hover:bg-brand-primary/5 hover:text-brand-black",
                isCollapsed && "justify-center px-0"
              )}
            >
              <Icon className={cn("h-[18px] w-[18px] shrink-0", isActive ? "text-white" : "text-gray-400 group-hover:text-brand-primary")} />
              {!isCollapsed && <span className="font-bold text-[14px]">{link.name}</span>}
            </Link>
          );
        })}
      </div>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-gray-100 shrink-0">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
             "flex items-center gap-3 h-10 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-brand-black transition-colors w-full cursor-pointer",
             isCollapsed ? "justify-center px-0" : "px-3"
          )}
        >
          {isCollapsed ? (
             <ChevronRight className="h-[18px] w-[18px]" />
          ) : (
             <>
               <ChevronLeft className="h-[18px] w-[18px]" />
               <span className="font-bold text-[14px]">Collapse</span>
             </>
          )}
        </button>
      </div>
    </aside>
  );
}
