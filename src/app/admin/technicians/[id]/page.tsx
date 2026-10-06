"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft,
  Edit2,
  Mail,
  Phone,
  CalendarDays,
  Star,
  CheckCircle2,
  Clock,
  DollarSign,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_TECHNICIANS, STATUS_STYLES } from "../mockData";

// ─── Animations ───────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function TechnicianDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const tech = MOCK_TECHNICIANS.find((t) => t.id === id);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (!tech) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-brand-black">
        <h2 className="text-xl font-bold">Technician Not Found</h2>
        <button onClick={() => router.back()} className="text-brand-primary font-semibold hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  // Pagination Logic
  const totalPages = Math.ceil(tech.jobHistory.length / rowsPerPage);
  const paginatedHistory = tech.jobHistory.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6 max-w-6xl mx-auto w-full pb-10"
    >
      
      {/* ─── Top Section ─── */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] relative overflow-hidden">
        
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

        <div className="flex items-center gap-5 z-10">
          <button 
            onClick={() => router.push("/admin/technicians")}
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-brand-black hover:bg-gray-50 transition-colors shadow-sm shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <div className="h-20 w-20 rounded-full bg-brand-primary/10 flex items-center justify-center border-4 border-white shadow-md shrink-0">
            {tech.avatarUrl ? (
              <img src={tech.avatarUrl} alt={tech.name} className="h-full w-full rounded-full object-cover" />
            ) : (
              <span className="text-2xl font-bold text-brand-primary">{tech.name.split(' ').map(n => n[0]).join('')}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-brand-black tracking-tight">{tech.name}</h1>
              <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border", STATUS_STYLES[tech.status])}>
                {tech.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-0.5">
              {tech.specialties.map((spec, i) => (
                <span key={i} className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-brand-black px-5 py-2.5 rounded-xl font-bold text-[13px] transition-colors shadow-sm z-10 w-full md:w-auto justify-center">
          <Edit2 className="h-4 w-4" /> Edit Profile
        </button>
      </motion.div>

      {/* ─── Performance Stats Row ─── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col gap-3 group relative overflow-hidden">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-inner mb-1">
            <CheckCircle2 className="h-5 w-5 text-white drop-shadow-sm" />
          </div>
          <div>
            <p className="text-[12px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Jobs Completed</p>
            <h3 className="text-3xl font-black text-brand-black">{tech.stats.jobsCompletedMonth}</h3>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col gap-3 group relative overflow-hidden">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-inner mb-1">
            <Star className="h-5 w-5 text-white drop-shadow-sm fill-white/20" />
          </div>
          <div>
            <p className="text-[12px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Avg Rating</p>
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-black text-brand-black">{tech.stats.avgRating}</h3>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className={cn("h-3 w-3", star <= tech.stats.avgRating ? "text-amber-400 fill-amber-400" : "text-gray-200")} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col gap-3 group relative overflow-hidden">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center shadow-inner mb-1">
            <Clock className="h-5 w-5 text-white drop-shadow-sm" />
          </div>
          <div>
            <p className="text-[12px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">On Time %</p>
            <h3 className="text-3xl font-black text-brand-black">{tech.stats.onTimePercentage}%</h3>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col gap-3 group relative overflow-hidden">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-inner mb-1">
            <DollarSign className="h-5 w-5 text-white drop-shadow-sm" />
          </div>
          <div>
            <p className="text-[12px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Revenue Generated</p>
            <h3 className="text-3xl font-black text-brand-black tracking-tight">{tech.stats.revenueMonth}</h3>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ─── Left Column ─── */}
        <div className="flex flex-col gap-6">
          
          {/* Personal Info */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col gap-5">
            <h2 className="text-[14px] font-extrabold text-brand-black flex items-center gap-2">
              <User className="h-4 w-4 text-brand-primary" /> Contact & Details
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[14px] font-semibold text-brand-black">
                <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <Mail className="h-4 w-4" />
                </div>
                {tech.email}
              </div>
              <div className="flex items-center gap-3 text-[14px] font-semibold text-brand-black">
                <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <Phone className="h-4 w-4" />
                </div>
                {tech.phone}
              </div>
              <div className="flex items-center gap-3 text-[14px] font-semibold text-brand-black">
                <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <CalendarDays className="h-4 w-4" />
                </div>
                Joined {tech.dateJoined}
              </div>
            </div>
          </motion.div>

          {/* Working Hours */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-extrabold text-brand-black flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-primary" /> Working Hours
              </h2>
              <button className="text-[12px] font-bold text-brand-primary hover:underline">Edit</button>
            </div>
            
            <div className="flex flex-col gap-2">
              {tech.workingHours.map((wh, i) => (
                <div key={i} className={cn("flex items-center justify-between p-2.5 rounded-xl text-[13px] font-medium transition-colors", wh.isAvailable ? "bg-white border border-gray-100" : "bg-gray-50/50 text-gray-400 border border-transparent")}>
                  <div className="flex items-center gap-2 w-28">
                    <div className={cn("h-1.5 w-1.5 rounded-full", wh.isAvailable ? "bg-emerald-400" : "bg-gray-300")} />
                    <span className="font-bold">{wh.day.slice(0, 3)}</span>
                  </div>
                  {wh.isAvailable ? (
                    <div className="flex items-center gap-2 text-brand-black font-semibold">
                      <span>{wh.start}</span>
                      <span className="text-gray-300">-</span>
                      <span>{wh.end}</span>
                    </div>
                  ) : (
                    <span className="font-bold italic">Not Available</span>
                  )}
                  {/* Toggle UI (visual only) */}
                  <div className={cn("h-5 w-9 rounded-full relative transition-colors cursor-pointer", wh.isAvailable ? "bg-brand-primary" : "bg-gray-200")}>
                    <div className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all shadow-sm", wh.isAvailable ? "left-4.5" : "left-0.5")} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ─── Right Column ─── */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Current Week Schedule */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col gap-5">
            <h2 className="text-[14px] font-extrabold text-brand-black flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-brand-primary" /> Current Week Schedule
            </h2>
            
            <div className="overflow-x-auto custom-scrollbar pb-2">
              <div className="flex gap-2 min-w-[600px]">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((dayLabel, i) => {
                  const fullDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][i];
                  const dayJobs = tech.weeklySchedule.filter(j => j.day === fullDay);
                  const isOff = !tech.workingHours.find(wh => wh.day === fullDay)?.isAvailable;

                  return (
                    <div key={dayLabel} className="flex-1 flex flex-col gap-3">
                      <div className="text-center pb-2 border-b border-gray-100">
                        <span className="text-[12px] font-extrabold text-brand-black uppercase">{dayLabel}</span>
                        <div className="text-[11px] text-gray-400 font-bold mt-0.5">Apr {13 + i}</div>
                      </div>
                      
                      <div className="flex flex-col gap-2 min-h-[120px] bg-gray-50/50 rounded-xl p-2 border border-gray-100/50 relative">
                        {isOff ? (
                          <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-300">
                            <div className="h-px w-8 bg-gray-300 mb-1" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Off</span>
                          </div>
                        ) : (
                          dayJobs.map(job => (
                            <Link key={job.id} href={`/admin/jobs/${job.id}`} className={cn("rounded-lg p-2.5 border transition-all hover:shadow-md cursor-pointer group block", job.colorClass)}>
                              <div className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-80">{job.time}</div>
                              <div className="text-[12px] font-black leading-tight group-hover:underline">{job.customerName}</div>
                            </Link>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Job History */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-hidden flex-1 flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-[14px] font-extrabold text-brand-black flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-brand-primary" /> Job History
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="text-left px-6 py-3.5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100">Job ID</th>
                    <th className="text-left px-6 py-3.5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100">Service</th>
                    <th className="text-left px-6 py-3.5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100">Customer</th>
                    <th className="text-left px-6 py-3.5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100">Date</th>
                    <th className="text-left px-6 py-3.5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100">Status</th>
                    <th className="text-right px-6 py-3.5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider border-b border-gray-100">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginatedHistory.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium">No job history found.</td>
                    </tr>
                  ) : (
                    paginatedHistory.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-brand-primary">{job.id}</td>
                        <td className="px-6 py-4 font-semibold text-brand-black">{job.service}</td>
                        <td className="px-6 py-4 font-semibold text-brand-text-secondary">{job.customerName}</td>
                        <td className="px-6 py-4 font-semibold text-brand-text-secondary">{job.date}</td>
                        <td className="px-6 py-4">
                          <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border", 
                            job.status === "Completed" ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                            job.status === "In Progress" ? "bg-orange-50 text-orange-600 border-orange-200" :
                            "bg-red-50 text-red-500 border-red-200"
                          )}>
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/admin/jobs/${job.id}`} className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-brand-primary/10 text-gray-400 hover:text-brand-primary transition-colors">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between mt-auto">
                <span className="text-[12px] font-bold text-gray-500">
                  Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, tech.jobHistory.length)} of {tech.jobHistory.length}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-brand-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-brand-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </div>

    </motion.div>
  );
}

// Simple internal icon for User
function User(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
