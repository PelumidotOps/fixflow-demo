"use client";

import { motion } from "framer-motion";
import {
  CalendarPlus,
  Briefcase,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const METRICS = [
  {
    label: "New Bookings Today",
    value: "12",
    change: +18.5,
    icon: CalendarPlus,
    iconGradient: "from-sky-400 to-brand-primary",
    iconColor: "text-white",
  },
  {
    label: "Active Jobs",
    value: "7",
    change: -4.2,
    icon: Briefcase,
    iconGradient: "from-amber-400 to-orange-500",
    iconColor: "text-white",
  },
  {
    label: "Completed This Month",
    value: "134",
    change: +22.1,
    icon: CheckCircle2,
    iconGradient: "from-emerald-400 to-teal-500",
    iconColor: "text-white",
  },
  {
    label: "Revenue This Month",
    value: "$18,240",
    change: +9.7,
    icon: DollarSign,
    iconGradient: "from-indigo-400 to-purple-500",
    iconColor: "text-white",
  },
];

type KanbanStatus = "Pending" | "Confirmed" | "Assigned" | "In Progress" | "Completed";

interface Job {
  id: string;
  customer: string;
  service: string;
  technician: string;
  time: string;
  status: KanbanStatus;
}

const KANBAN_COLUMNS: { label: KanbanStatus; color: string; dot: string; bg: string }[] = [
  { label: "Pending",     color: "border-blue-200/50",   dot: "bg-blue-400", bg: "bg-blue-50/30" },
  { label: "Confirmed",   color: "border-sky-200/50",    dot: "bg-sky-400", bg: "bg-sky-50/30" },
  { label: "Assigned",    color: "border-amber-200/50",  dot: "bg-amber-400", bg: "bg-amber-50/30" },
  { label: "In Progress", color: "border-orange-200/50", dot: "bg-orange-400", bg: "bg-orange-50/30" },
  { label: "Completed",   color: "border-emerald-200/50", dot: "bg-emerald-400", bg: "bg-emerald-50/30" },
];

const JOBS: Job[] = [
  { id: "J-001", customer: "Marcus Reid",     service: "AC Repair",        technician: "Tom H.",  time: "9:00 AM",  status: "Pending" },
  { id: "J-002", customer: "Aisha Brown",     service: "Heater Repair",    technician: "Sara K.", time: "10:30 AM", status: "Confirmed" },
  { id: "J-003", customer: "James O.",        service: "Air Duct Cleaning",technician: "Leo M.",  time: "11:00 AM", status: "Assigned" },
  { id: "J-004", customer: "Priya Nair",      service: "New Installation", technician: "Tom H.",  time: "1:00 PM",  status: "In Progress" },
  { id: "J-005", customer: "Daniel Carr",     service: "Heat Pump Service",technician: "Sara K.", time: "2:00 PM",  status: "Completed" },
  { id: "J-006", customer: "Fatima Al-Said",  service: "AC Repair",        technician: "Leo M.",  time: "3:30 PM",  status: "Pending" },
  { id: "J-007", customer: "Chris Okafor",    service: "Regular Tune-Up",  technician: "Tom H.",  time: "4:00 PM",  status: "Confirmed" },
  { id: "J-008", customer: "Nina Shaw",       service: "Heater Repair",    technician: "Sara K.", time: "9:30 AM",  status: "Completed" },
];

type BookingStatus = "Pending" | "Confirmed" | "In Progress" | "Completed" | "Cancelled";

interface Booking {
  id: string;
  customer: string;
  service: string;
  date: string;
  status: BookingStatus;
}

const BOOKINGS: Booking[] = [
  { id: "BK-1041", customer: "Marcus Reid",    service: "AC Repair",         date: "Apr 19, 2026", status: "Pending" },
  { id: "BK-1040", customer: "Aisha Brown",    service: "Heater Repair",     date: "Apr 19, 2026", status: "Confirmed" },
  { id: "BK-1039", customer: "James Okonkwo",  service: "Air Duct Cleaning", date: "Apr 18, 2026", status: "In Progress" },
  { id: "BK-1038", customer: "Priya Nair",     service: "New Installation",  date: "Apr 18, 2026", status: "In Progress" },
  { id: "BK-1037", customer: "Daniel Carr",    service: "Heat Pump Service", date: "Apr 17, 2026", status: "Completed" },
];

// ─── Status Badge ──────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<BookingStatus, string> = {
  "Pending":     "bg-blue-50 text-blue-700 border-blue-200",
  "Confirmed":   "bg-sky-50 text-sky-700 border-sky-200",
  "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
  "Completed":   "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Cancelled":   "bg-red-50 text-red-600 border-red-200",
};

function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border", STATUS_STYLES[status])}>
      {status}
    </span>
  );
}

// ─── Animations ───────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

// ─── Metric Card ──────────────────────────────────────────────────────────────

function MetricCard({ metric }: { metric: typeof METRICS[number] }) {
  const Icon = metric.icon;
  const isPositive = metric.change >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <motion.div 
      variants={itemVariants}
      className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col gap-5 hover:-translate-y-1 relative overflow-hidden group"
    >
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br opacity-5 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br shadow-inner", metric.iconGradient)}>
          <Icon className={cn("h-6 w-6", metric.iconColor)} />
        </div>
        <div className={cn(
          "flex items-center gap-1.5 text-[12px] font-bold px-2.5 py-1 rounded-full border",
          isPositive ? "bg-emerald-50/50 text-emerald-600 border-emerald-100" : "bg-red-50/50 text-red-500 border-red-100"
        )}>
          <TrendIcon className="h-3.5 w-3.5" />
          {isPositive ? "+" : ""}{metric.change}%
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-4xl font-black text-brand-black tracking-tight">{metric.value}</p>
        <p className="text-[13px] text-brand-text-secondary font-semibold mt-1">{metric.label}</p>
      </div>
    </motion.div>
  );
}

// ─── Job Card (Kanban) ─────────────────────────────────────────────────────────

function JobCard({ job }: { job: Job }) {
  return (
    <motion.div 
      layoutId={job.id}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white rounded-2xl p-4 border border-gray-100/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all cursor-grab active:cursor-grabbing relative group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <p className="font-bold text-[14px] text-brand-black leading-tight group-hover:text-brand-primary transition-colors">{job.customer}</p>
        <button className="text-gray-300 hover:text-brand-primary bg-gray-50 hover:bg-brand-primary/10 rounded-full p-1 transition-colors shrink-0">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <div className="bg-gray-50/80 rounded-lg px-2.5 py-1.5 inline-block mb-4 border border-gray-100/50">
        <p className="text-[12px] text-brand-text-secondary font-semibold">{job.service}</p>
      </div>
      <div className="flex items-center justify-between text-[11px] text-gray-500 font-bold border-t border-gray-50 pt-3">
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
            {job.technician.charAt(0)}
          </div>
          <span>{job.technician}</span>
        </div>
        <span className="flex items-center gap-1 text-gray-400 bg-white shadow-sm border border-gray-100 px-2 py-0.5 rounded-full">
          <Clock className="h-3 w-3" />
          {job.time}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-10"
    >

      {/* Metric Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {METRICS.map((m) => <MetricCard key={m.label} metric={m} />)}
      </motion.div>

      {/* Live Job Board (Kanban) */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[19px] font-extrabold text-brand-black tracking-tight">Live Job Board</h2>
            <p className="text-[13px] text-brand-text-secondary font-medium mt-1">Real-time status of today's scheduled jobs.</p>
          </div>
          <div className="bg-white border border-gray-100 shadow-sm rounded-full px-4 py-1.5 flex items-center gap-2 text-[12px] font-bold text-gray-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Updates
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5 overflow-x-auto pb-4 custom-scrollbar">
          {KANBAN_COLUMNS.map((col) => {
            const colJobs = JOBS.filter((j) => j.status === col.label);
            return (
              <div key={col.label} className={cn("rounded-3xl border p-4 flex flex-col gap-4 min-w-[280px] xl:min-w-0", col.color, col.bg)}>
                {/* Column Header */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2.5 w-2.5 rounded-full shrink-0 shadow-sm", col.dot)} />
                    <span className="text-[13px] font-bold text-brand-black">{col.label}</span>
                  </div>
                  <span className="text-[12px] font-bold text-gray-500 bg-white shadow-sm border border-gray-100 rounded-full h-6 w-6 flex items-center justify-center">
                    {colJobs.length}
                  </span>
                </div>

                {/* Job Cards */}
                <div className="flex flex-col gap-3 min-h-[150px]">
                  {colJobs.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-[12px] text-gray-400 font-medium bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-gray-200/60 p-4 text-center">
                      <Briefcase className="h-6 w-6 mb-2 opacity-20" />
                      No jobs in this stage
                    </div>
                  ) : (
                    colJobs.map((job) => <JobCard key={job.id} job={job} />)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Recent Bookings Table */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[19px] font-extrabold text-brand-black tracking-tight">Recent Bookings</h2>
          <a href="/admin/bookings" className="group flex items-center gap-1.5 text-[13px] font-bold text-brand-primary hover:text-brand-primary-dark transition-colors bg-brand-primary/5 hover:bg-brand-primary/10 px-4 py-2 rounded-full">
            View all bookings
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-hidden relative">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] whitespace-nowrap">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Booking ID</th>
                  <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Service</th>
                  <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {BOOKINGS.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4.5 font-bold text-brand-primary">{booking.id}</td>
                    <td className="px-6 py-4.5 font-bold text-brand-black">{booking.customer}</td>
                    <td className="px-6 py-4.5 text-brand-text-secondary font-medium">
                      <div className="bg-gray-50 border border-gray-100 inline-block px-2.5 py-1 rounded-md text-[12px]">
                        {booking.service}
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-brand-text-secondary font-medium">{booking.date}</td>
                    <td className="px-6 py-4.5">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-4.5 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-brand-primary/10 text-gray-400 hover:text-brand-primary transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-500 transition-colors">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

    </motion.div>
  );
}
