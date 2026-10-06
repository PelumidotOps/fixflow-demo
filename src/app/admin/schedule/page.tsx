"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Briefcase, 
  User, 
  Eye, 
  X,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types & Mock Data ────────────────────────────────────────────────────────

type ViewMode = "week" | "month";

interface Technician {
  id: string;
  name: string;
  colorClass: string;
  dotClass: string;
}

const TECHNICIANS: Technician[] = [
  { id: "T-1", name: "Tom Harris", colorClass: "bg-brand-primary/10 border-brand-primary/20 text-brand-primary", dotClass: "bg-brand-primary" },
  { id: "T-2", name: "Sara King", colorClass: "bg-blue-100 border-blue-200 text-blue-700", dotClass: "bg-blue-500" },
  { id: "T-3", name: "Leo Martinez", colorClass: "bg-amber-100 border-amber-200 text-amber-700", dotClass: "bg-amber-500" },
  { id: "T-4", name: "Jessica Chen", colorClass: "bg-purple-100 border-purple-200 text-purple-700", dotClass: "bg-purple-500" },
  { id: "T-5", name: "Mike Johnson", colorClass: "bg-emerald-100 border-emerald-200 text-emerald-700", dotClass: "bg-emerald-500" },
];

interface Job {
  id: string;
  customerName: string;
  service: string;
  technicianId: string;
  date: string; // YYYY-MM-DD
  startTime: number; // Hour in 24h format (e.g., 9, 14.5)
  duration: number; // Duration in hours (e.g., 2, 1.5)
  status: "Confirmed" | "Pending" | "In Progress";
  address: string;
}

const generateMockJobs = (): Job[] => {
  const today = new Date();
  const jobs: Job[] = [];
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
  
  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];
  };

  const monday = addDays(startOfWeek, 0);
  const tuesday = addDays(startOfWeek, 1);
  const wednesday = addDays(startOfWeek, 2);
  const thursday = addDays(startOfWeek, 3);
  const friday = addDays(startOfWeek, 4);

  jobs.push(
    { id: "JOB-3001", customerName: "Sarah Connor", service: "AC Repair", technicianId: "T-1", date: monday, startTime: 9, duration: 2, status: "Confirmed", address: "321 Cyber Blvd" },
    { id: "JOB-3002", customerName: "Marcus Reid", service: "Tune-Up", technicianId: "T-2", date: monday, startTime: 13, duration: 1.5, status: "Confirmed", address: "742 Evergreen Terrace" },
    { id: "JOB-3003", customerName: "Diana Prince", service: "Heater Repair", technicianId: "T-3", date: monday, startTime: 10, duration: 3, status: "Pending", address: "1200 Embassy Row" },
    
    { id: "JOB-3004", customerName: "Tony Stark", service: "Installation", technicianId: "T-1", date: tuesday, startTime: 8, duration: 4, status: "Confirmed", address: "10880 Malibu Point" },
    { id: "JOB-3005", customerName: "Bruce Wayne", service: "AC Repair", technicianId: "T-4", date: tuesday, startTime: 14, duration: 2, status: "In Progress", address: "1007 Mountain Drive" },
    { id: "JOB-3006", customerName: "Clark Kent", service: "Duct Cleaning", technicianId: "T-5", date: tuesday, startTime: 10.5, duration: 2.5, status: "Confirmed", address: "344 Clinton St" },

    { id: "JOB-3007", customerName: "Peter Parker", service: "Tune-Up", technicianId: "T-2", date: wednesday, startTime: 9, duration: 1.5, status: "Confirmed", address: "20 Ingram Street" },
    { id: "JOB-3008", customerName: "Ellen Ripley", service: "Heat Pump", technicianId: "T-3", date: wednesday, startTime: 13, duration: 3, status: "Pending", address: "LV-426 Colony" },

    { id: "JOB-3009", customerName: "David Bowman", service: "AC Repair", technicianId: "T-4", date: thursday, startTime: 8.5, duration: 2, status: "Confirmed", address: "2001 Space Way" },
    { id: "JOB-3010", customerName: "Arthur Curry", service: "Installation", technicianId: "T-5", date: thursday, startTime: 12, duration: 4, status: "Confirmed", address: "Amnesty Bay Lighthouse" },
    { id: "JOB-3011", customerName: "Barry Allen", service: "Tune-Up", technicianId: "T-1", date: thursday, startTime: 16, duration: 1, status: "Confirmed", address: "Central City" },

    { id: "JOB-3012", customerName: "Hal Jordan", service: "Heater Repair", technicianId: "T-2", date: friday, startTime: 9, duration: 2.5, status: "Pending", address: "Coast City" }
  );

  return jobs;
};

const BLOCKED_DATES = ["2026-05-10"]; // Example format, handled dynamically below.

const formatTime = (hour: number) => {
  const h = Math.floor(hour);
  const m = (hour % 1) * 60;
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h > 12 ? h - 12 : (h === 0 ? 12 : h);
  return `${displayH}:${m === 0 ? '00' : m} ${period}`;
};

// ─── Animations ───────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const slideInVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.2 } }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function SchedulePage() {
  const [view, setView] = useState<ViewMode>("week");
  const [currentDate, setCurrentDate] = useState(new Date()); // Represents the week/month being viewed
  const [jobs, setJobs] = useState<Job[]>(generateMockJobs());
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [rescheduleConfirmData, setRescheduleConfirmData] = useState<{jobId: string, newDate: string, newStartTime: number} | null>(null);

  // Time slots for week view (7am to 7pm)
  const HOURS = Array.from({ length: 13 }, (_, i) => i + 7);

  // Generate Week Days
  const weekDays = useMemo(() => {
    const days = [];
    const curr = new Date(currentDate);
    const first = curr.getDate() - curr.getDay() + 1; // Start on Monday
    for (let i = 0; i < 7; i++) {
      const day = new Date(curr.getFullYear(), curr.getMonth(), first + i);
      days.push(day);
    }
    return days;
  }, [currentDate]);

  // Generate Month Days
  const monthDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Add previous month padding
    let firstDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Make Monday start
    for (let i = firstDayOfWeek; i > 0; i--) {
      days.push(new Date(year, month, 1 - i));
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    // Next month padding
    const remaining = 42 - days.length; // 6 rows of 7
    for (let i = 1; i <= remaining; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  }, [currentDate]);

  const navPrev = () => {
    const newDate = new Date(currentDate);
    if (view === "week") newDate.setDate(newDate.getDate() - 7);
    else newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const navNext = () => {
    const newDate = new Date(currentDate);
    if (view === "week") newDate.setDate(newDate.getDate() + 7);
    else newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const navToday = () => {
    setCurrentDate(new Date());
  };

  const getDateRangeLabel = () => {
    if (view === "week") {
      const start = weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const end = weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return `${start} - ${end}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  const getTech = (id: string) => TECHNICIANS.find(t => t.id === id)!;

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  const isBlocked = (date: Date) => {
    // Mocking Sunday as blocked/Closed
    return date.getDay() === 0;
  };

  const handleDragStart = (e: React.DragEvent, job: Job) => {
    e.dataTransfer.setData("jobId", job.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dateString: string, hour: number) => {
    e.preventDefault();
    const jobId = e.dataTransfer.getData("jobId");
    if (jobId) {
      setRescheduleConfirmData({ jobId, newDate: dateString, newStartTime: hour });
    }
  };

  const confirmReschedule = () => {
    if (rescheduleConfirmData) {
      setJobs(jobs.map(j => 
        j.id === rescheduleConfirmData.jobId 
          ? { ...j, date: rescheduleConfirmData.newDate, startTime: rescheduleConfirmData.newStartTime }
          : j
      ));
      setRescheduleConfirmData(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 relative min-h-full pb-10">
      
      {/* ─── Header & Navigation ─── */}
      <motion.div initial="hidden" animate="visible" variants={itemVariants} className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-black text-brand-black tracking-tight">Schedule</h1>
          
          <div className="bg-gray-100 p-1 rounded-xl flex items-center shadow-inner self-start md:self-auto">
            <button 
              onClick={() => setView("week")}
              className={cn("px-4 py-1.5 rounded-lg text-[13px] font-bold transition-all", view === "week" ? "bg-white text-brand-black shadow-sm" : "text-gray-500 hover:text-gray-700")}
            >
              Week
            </button>
            <button 
              onClick={() => setView("month")}
              className={cn("px-4 py-1.5 rounded-lg text-[13px] font-bold transition-all", view === "month" ? "bg-white text-brand-black shadow-sm" : "text-gray-500 hover:text-gray-700")}
            >
              Month
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] relative">
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl overflow-hidden">
              <button onClick={navPrev} className="p-2 text-gray-500 hover:bg-gray-100 hover:text-brand-black transition-colors"><ChevronLeft className="h-5 w-5" /></button>
              <div className="w-px h-5 bg-gray-200" />
              <button onClick={navNext} className="p-2 text-gray-500 hover:bg-gray-100 hover:text-brand-black transition-colors"><ChevronRight className="h-5 w-5" /></button>
            </div>
            <button onClick={navToday} className="bg-white border border-gray-200 hover:bg-gray-50 text-brand-black px-4 py-2 rounded-xl text-[13px] font-bold transition-colors shadow-sm">
              Today
            </button>
          </div>

          <div className="text-[15px] font-black text-brand-black md:absolute md:left-1/2 md:-translate-x-1/2 mt-3 md:mt-0">
            {getDateRangeLabel()}
          </div>
        </div>

        {/* Technician Legend */}
        <div className="flex flex-wrap items-center gap-4 bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wide mr-2">Technicians:</span>
          {TECHNICIANS.map(tech => (
            <div key={tech.id} className="flex items-center gap-2 text-[12px] font-bold text-brand-black">
              <div className={cn("h-3 w-3 rounded-full shadow-sm", tech.dotClass)} />
              {tech.name}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── Calendar Views ─── */}
      <motion.div 
        key={view}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-hidden flex-1 flex flex-col"
      >
        {view === "week" ? (
          <div className="flex flex-col flex-1 overflow-x-auto min-w-[800px]">
            {/* Week Header */}
            <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-gray-100 bg-gray-50/50">
              <div className="border-r border-gray-100 p-3" /> {/* Time column header */}
              {weekDays.map((day, i) => {
                const today = isToday(day);
                return (
                  <div key={i} className={cn("p-3 text-center border-r border-gray-100 last:border-r-0", today && "bg-brand-primary/5")}>
                    <div className={cn("text-[11px] font-extrabold uppercase tracking-wide", today ? "text-brand-primary" : "text-gray-400")}>
                      {day.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className={cn("text-[18px] font-black mt-0.5", today ? "text-brand-primary" : "text-brand-black")}>
                      {day.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Week Grid */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative h-[600px]">
              {HOURS.map(hour => (
                <div key={hour} className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-gray-100 h-16 group relative">
                  {/* Time Label */}
                  <div className="border-r border-gray-100 relative">
                    <span className="absolute -top-3 right-3 text-[11px] font-bold text-gray-400 bg-white px-1">
                      {hour === 12 ? '12 PM' : hour > 12 ? `${hour-12} PM` : `${hour} AM`}
                    </span>
                  </div>
                  
                  {/* Day Slots */}
                  {weekDays.map((day, i) => {
                    const dateStr = day.toISOString().split('T')[0];
                    const blocked = isBlocked(day);
                    const today = isToday(day);
                    return (
                      <div 
                        key={i} 
                        className={cn("border-r border-gray-100 last:border-r-0 relative transition-colors", 
                          blocked ? "bg-gray-50/80" : today ? "bg-brand-primary/[0.02] group-hover:bg-brand-primary/5" : "group-hover:bg-gray-50/50"
                        )}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, dateStr, hour)}
                      >
                        {blocked && hour === 12 && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="bg-gray-200 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">Closed</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Render Jobs as Absolute Blocks */}
              {jobs.map(job => {
                const jobDate = new Date(job.date);
                const dayIndex = weekDays.findIndex(d => d.toISOString().split('T')[0] === job.date);
                if (dayIndex === -1) return null; // Not in current week

                const tech = getTech(job.technicianId);
                const top = (job.startTime - 7) * 64; // 64px per hour (h-16)
                const height = job.duration * 64;

                return (
                  <div 
                    key={job.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, job)}
                    onClick={() => setSelectedJob(job)}
                    style={{ 
                      top: `${top}px`, 
                      height: `${height - 4}px`, // -4 for padding
                      left: `calc(80px + ${dayIndex} * ((100% - 80px) / 7) + 4px)`,
                      width: `calc(((100% - 80px) / 7) - 8px)` 
                    }}
                    className={cn(
                      "absolute rounded-xl border p-2 cursor-pointer shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col gap-1 z-10",
                      tech.colorClass
                    )}
                  >
                    <div className="text-[10px] font-extrabold uppercase tracking-wide opacity-80">{formatTime(job.startTime)}</div>
                    <div className="text-[12px] font-black leading-tight truncate">{job.customerName}</div>
                    {height > 60 && (
                      <div className="text-[11px] font-semibold opacity-90 truncate mt-auto">{job.service}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 min-h-[600px]">
            {/* Month Header */}
            <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                <div key={day} className="p-3 text-center border-r border-gray-100 last:border-r-0 text-[11px] font-extrabold uppercase tracking-wide text-gray-400">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Month Grid */}
            <div className="grid grid-cols-7 flex-1">
              {monthDays.map((day, i) => {
                const dateStr = day.toISOString().split('T')[0];
                const dayJobs = jobs.filter(j => j.date === dateStr).sort((a,b) => a.startTime - b.startTime);
                const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                const today = isToday(day);
                const blocked = isBlocked(day);

                return (
                  <div 
                    key={i} 
                    className={cn(
                      "border-r border-b border-gray-100 last:border-r-0 p-2 min-h-[120px] flex flex-col gap-1 transition-colors hover:bg-gray-50/50",
                      !isCurrentMonth && "bg-gray-50/50 text-gray-400",
                      today && "bg-brand-primary/[0.02]",
                      blocked && "bg-gray-50/80"
                    )}
                  >
                    <div className={cn("text-[12px] font-bold p-1 w-7 h-7 flex items-center justify-center rounded-full mb-1", today ? "bg-brand-primary text-white" : "")}>
                      {day.getDate()}
                    </div>
                    
                    {blocked && (
                      <div className="text-[10px] font-bold text-gray-400 bg-gray-200/50 rounded px-1.5 py-0.5 self-start uppercase tracking-wider mt-1">Closed</div>
                    )}

                    {!blocked && dayJobs.slice(0, 3).map(job => {
                      const tech = getTech(job.technicianId);
                      return (
                        <div 
                          key={job.id} 
                          onClick={() => setSelectedJob(job)}
                          className={cn("text-[10px] font-bold truncate px-2 py-1 rounded-md cursor-pointer border", tech.colorClass)}
                        >
                          {formatTime(job.startTime)} {job.customerName}
                        </div>
                      )
                    })}
                    {!blocked && dayJobs.length > 3 && (
                      <div className="text-[10px] font-bold text-gray-500 mt-1 cursor-pointer hover:text-brand-primary">
                        + {dayJobs.length - 3} more
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>

      {/* ─── Reschedule Confirmation Dialog ─── */}
      <AnimatePresence>
        {rescheduleConfirmData && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-brand-navy/30 backdrop-blur-sm" />
            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" className="bg-white rounded-3xl shadow-2xl w-full max-w-sm z-10 p-6 flex flex-col gap-5 text-center">
              <div className="h-12 w-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mx-auto mb-2">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-brand-black">Confirm Reschedule</h3>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                Are you sure you want to reschedule this job to <strong>{rescheduleConfirmData.newDate}</strong> at <strong>{formatTime(rescheduleConfirmData.newStartTime)}</strong>? A notification will be sent to the customer automatically.
              </p>
              <div className="flex gap-3 mt-2">
                <button onClick={() => setRescheduleConfirmData(null)} className="flex-1 px-4 py-2.5 rounded-xl font-bold text-[13px] text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors">
                  Cancel
                </button>
                <button onClick={confirmReschedule} className="flex-1 px-4 py-2.5 rounded-xl font-bold text-[13px] bg-brand-primary hover:bg-brand-primary-dark text-white shadow-sm shadow-brand-primary/20 transition-colors">
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Slide-in Detail Panel ─── */}
      <AnimatePresence>
        {selectedJob && (
          <>
            <motion.div variants={overlayVariants} initial="hidden" animate="visible" exit="hidden" onClick={() => setSelectedJob(null)} className="fixed inset-0 bg-brand-navy/30 backdrop-blur-sm z-50" />
            <motion.div variants={slideInVariants} initial="hidden" animate="visible" exit="exit" className="fixed top-0 right-0 bottom-0 w-full max-w-[400px] bg-white shadow-2xl z-50 flex flex-col border-l border-gray-100 overflow-y-auto">
              
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-20">
                <h2 className="text-lg font-black text-brand-black">Job Overview</h2>
                <button onClick={() => setSelectedJob(null)} className="h-8 w-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-brand-black hover:bg-gray-50 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 p-6 flex flex-col gap-6 relative">
                <div className="flex flex-col gap-1">
                  <span className="inline-flex self-start items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border bg-brand-primary/10 text-brand-primary border-brand-primary/20 mb-2">
                    {selectedJob.status}
                  </span>
                  <h3 className="text-2xl font-black text-brand-black tracking-tight">{selectedJob.customerName}</h3>
                  <p className="text-[14px] text-brand-primary font-bold">{selectedJob.id}</p>
                </div>

                <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-[13px] font-semibold text-brand-black">
                    <Briefcase className="h-4 w-4 text-brand-primary" />
                    {selectedJob.service}
                  </div>
                  <div className="flex items-center gap-3 text-[13px] font-semibold text-brand-black">
                    <User className="h-4 w-4 text-brand-primary" />
                    Technician: {getTech(selectedJob.technicianId).name}
                  </div>
                  <div className="flex items-center gap-3 text-[13px] font-semibold text-brand-black">
                    <CalendarIcon className="h-4 w-4 text-brand-primary" />
                    {selectedJob.date}
                  </div>
                  <div className="flex items-center gap-3 text-[13px] font-semibold text-brand-black">
                    <Clock className="h-4 w-4 text-brand-primary" />
                    {formatTime(selectedJob.startTime)} - {formatTime(selectedJob.startTime + selectedJob.duration)}
                  </div>
                  <div className="flex items-start gap-3 text-[13px] font-semibold text-brand-black">
                    <MapPin className="h-4 w-4 text-brand-primary mt-0.5 shrink-0" />
                    {selectedJob.address}
                  </div>
                </div>

              </div>

              <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-20 flex flex-col gap-3">
                <Link href={`/admin/jobs/${selectedJob.id}`} className="flex items-center justify-center w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 rounded-xl transition-colors shadow-sm shadow-brand-primary/20">
                  View Full Job
                </Link>
                <button className="flex items-center justify-center w-full bg-white border border-gray-200 hover:bg-gray-50 text-brand-black font-bold py-3 rounded-xl transition-colors">
                  Reschedule
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
