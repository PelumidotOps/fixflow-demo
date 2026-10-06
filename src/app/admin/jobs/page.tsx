"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Eye, 
  X, 
  List,
  Columns,
  Plus,
  RefreshCw,
  Clock,
  User,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_JOBS, STATUS_STYLES, JobStatus, Job } from "./mockData";

// ─── Animations ───────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function JobsPage() {
  const [view, setView] = useState<"table" | "kanban">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [techFilter, setTechFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter Logic
  const filteredJobs = MOCK_JOBS.filter((job) => {
    const matchesSearch = 
      job.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    const matchesTech = techFilter === "All" || job.assignedTechnician === techFilter || (!job.assignedTechnician && techFilter === "Unassigned");
    const matchesService = serviceFilter === "All" || job.service === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesTech && matchesService;
  });

  const kanbanColumns: JobStatus[] = ["Pending", "Assigned", "In Progress", "Completed"];

  return (
    <div className="flex flex-col gap-6 min-h-full">
      
      {/* ─── Header & Filters ─── */}
      <motion.div initial="hidden" animate="visible" variants={itemVariants} className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-black text-brand-black tracking-tight">Jobs</h1>
            
            <div className="bg-gray-100 p-1 rounded-xl flex items-center shadow-inner">
              <button 
                onClick={() => setView("table")}
                className={cn("flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all", view === "table" ? "bg-white text-brand-black shadow-sm" : "text-gray-500 hover:text-gray-700")}
              >
                <List className="h-4 w-4" /> Table
              </button>
              <button 
                onClick={() => setView("kanban")}
                className={cn("flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all", view === "kanban" ? "bg-white text-brand-black shadow-sm" : "text-gray-500 hover:text-gray-700")}
              >
                <Columns className="h-4 w-4" /> Kanban
              </button>
            </div>
          </div>
          
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white px-5 py-2.5 rounded-xl font-bold text-[14px] transition-colors shadow-sm shadow-brand-primary/20"
          >
            <Plus className="h-4 w-4" /> Create Job
          </button>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)]">
          
          <div className="relative w-full lg:w-[250px] shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="h-[18px] w-[18px]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-transparent text-brand-black rounded-xl pl-10 pr-4 py-2 text-[13px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-medium placeholder:text-gray-400"
              placeholder="Search jobs..."
            />
          </div>

          <div className="h-8 w-px bg-gray-100 hidden lg:block" />

          <div className="flex flex-wrap flex-1 gap-3 w-full">
            <div className="relative flex-1 min-w-[130px]">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full appearance-none bg-gray-50/50 hover:bg-gray-50 border border-transparent hover:border-gray-200 text-brand-black rounded-xl pl-4 pr-10 py-2 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all cursor-pointer">
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative flex-1 min-w-[130px]">
              <select value={techFilter} onChange={(e) => setTechFilter(e.target.value)} className="w-full appearance-none bg-gray-50/50 hover:bg-gray-50 border border-transparent hover:border-gray-200 text-brand-black rounded-xl pl-4 pr-10 py-2 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all cursor-pointer">
                <option value="All">All Technicians</option>
                <option value="Unassigned">Unassigned</option>
                <option value="Tom Harris">Tom Harris</option>
                <option value="Sara King">Sara King</option>
                <option value="Leo Martinez">Leo Martinez</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative flex-1 min-w-[130px]">
              <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)} className="w-full appearance-none bg-gray-50/50 hover:bg-gray-50 border border-transparent hover:border-gray-200 text-brand-black rounded-xl pl-4 pr-10 py-2 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all cursor-pointer">
                <option value="All">All Services</option>
                <option value="AC Repair and Fix">AC Repair and Fix</option>
                <option value="Heater Repair">Heater Repair</option>
                <option value="New Installation">New Installation</option>
                <option value="Regular Tune-Up">Regular Tune-Up</option>
                <option value="Air Duct Cleaning">Air Duct Cleaning</option>
                <option value="Heat Pump Service">Heat Pump Service</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative flex-1 min-w-[130px]">
              <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="w-full appearance-none bg-gray-50/50 hover:bg-gray-50 border border-transparent hover:border-gray-200 text-brand-black rounded-xl pl-4 pr-10 py-2 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all cursor-pointer">
                <option value="All">All Dates</option>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="Custom">Custom Range...</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Views ─── */}
      {view === "table" ? (
        <motion.div 
          key="table-view"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-hidden flex-1"
        >
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-[13px] whitespace-nowrap">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Job ID</th>
                  <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Customer Name</th>
                  <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Service</th>
                  <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Assigned Tech</th>
                  <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Date & Time</th>
                  <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400 font-medium">
                      No jobs found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <motion.tr variants={itemVariants} key={job.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4.5 font-bold text-brand-primary">{job.id}</td>
                      <td className="px-6 py-4.5 font-bold text-brand-black">{job.customerName}</td>
                      <td className="px-6 py-4.5 text-brand-text-secondary font-medium">
                        <div className="bg-gray-50 border border-gray-100 inline-block px-2.5 py-1 rounded-md text-[12px]">
                          {job.service}
                        </div>
                      </td>
                      <td className="px-6 py-4.5">
                        {job.assignedTechnician ? (
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-[10px] font-bold border border-brand-primary/20">
                              {job.assignedTechnician.charAt(0)}
                            </div>
                            <span className="font-semibold text-brand-black">{job.assignedTechnician}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 font-medium italic">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4.5 text-brand-text-secondary font-semibold">
                        {job.scheduledDate} <span className="text-gray-400 mx-1">•</span> {job.scheduledTime}
                      </td>
                      <td className="px-6 py-4.5">
                        <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border", STATUS_STYLES[job.status])}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/admin/jobs/${job.id}`} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-brand-primary/10 text-gray-400 hover:text-brand-primary transition-colors" title="View Job">
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-500 transition-colors" title="Reassign">
                            <RefreshCw className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          key="kanban-view"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 overflow-x-auto custom-scrollbar pb-4"
        >
          <div className="flex gap-5 min-w-[1000px] h-full items-start">
            {kanbanColumns.map((status) => {
              const columnJobs = filteredJobs.filter(j => j.status === status);
              return (
                <div key={status} className="flex-1 bg-gray-50/80 rounded-3xl border border-gray-200/60 p-4 flex flex-col gap-4 min-h-[500px]">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[13px] font-extrabold text-brand-black uppercase tracking-wide">{status}</span>
                    <span className="text-[12px] font-bold text-gray-500 bg-white shadow-sm border border-gray-100 rounded-full px-2.5 py-0.5">
                      {columnJobs.length}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 flex-1">
                    {columnJobs.length === 0 ? (
                      <div className="flex-1 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-[12px] font-medium text-gray-400 bg-white/40">
                        Drop jobs here
                      </div>
                    ) : (
                      columnJobs.map((job) => (
                        <div 
                          key={job.id} 
                          draggable 
                          className="bg-white rounded-2xl p-4 border border-gray-100/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all cursor-grab active:cursor-grabbing relative group"
                        >
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <Link href={`/admin/jobs/${job.id}`} className="font-bold text-[14px] text-brand-black leading-tight group-hover:text-brand-primary transition-colors">
                              {job.customerName}
                            </Link>
                            <Link href={`/admin/jobs/${job.id}`} className="text-gray-300 hover:text-brand-primary bg-gray-50 hover:bg-brand-primary/10 rounded-full p-1 transition-colors shrink-0">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </div>
                          
                          <div className="bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5 inline-block mb-4">
                            <p className="text-[12px] text-brand-text-secondary font-semibold">{job.service}</p>
                          </div>
                          
                          <div className="flex items-center justify-between text-[11px] text-gray-500 font-bold border-t border-gray-50 pt-3 mb-3">
                            <span className="flex items-center gap-1 text-gray-500">
                              <Clock className="h-3.5 w-3.5" />
                              {job.scheduledDate}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            {job.assignedTechnician ? (
                              <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-[10px] font-bold border border-brand-primary/20">
                                  {job.assignedTechnician.charAt(0)}
                                </div>
                                <span className="font-semibold text-brand-black text-[11px]">{job.assignedTechnician}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400 font-medium italic text-[11px]">Unassigned</span>
                            )}
                            <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border", STATUS_STYLES[job.status])}>
                              {job.status}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ─── Create Job Modal ─── */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute inset-0 bg-brand-navy/30 backdrop-blur-sm"
            />
            
            <motion.div 
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50 shrink-0">
                <h2 className="text-lg font-black text-brand-black">Create New Job</h2>
                <button onClick={() => setIsCreateModalOpen(false)} className="h-8 w-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-brand-black hover:bg-gray-50 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Service Type</label>
                    <select className="w-full bg-gray-50 border border-gray-200 text-brand-black rounded-xl px-4 py-2.5 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all">
                      <option value="">Select service...</option>
                      <option>AC Repair and Fix</option>
                      <option>Heater Repair</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Assigned Technician</label>
                    <select className="w-full bg-gray-50 border border-gray-200 text-brand-black rounded-xl px-4 py-2.5 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all">
                      <option value="">Unassigned (Leave open)</option>
                      <option>Tom Harris</option>
                      <option>Sara King</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Date</label>
                    <input type="date" className="w-full bg-gray-50 border border-gray-200 text-brand-black rounded-xl px-4 py-2.5 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Time</label>
                    <input type="time" className="w-full bg-gray-50 border border-gray-200 text-brand-black rounded-xl px-4 py-2.5 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all" />
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Customer Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-200 text-brand-black rounded-xl px-4 py-2.5 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Phone Number</label>
                    <input type="tel" placeholder="(555) 000-0000" className="w-full bg-gray-50 border border-gray-200 text-brand-black rounded-xl px-4 py-2.5 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Service Address</label>
                  <input type="text" placeholder="123 Main St, City, State ZIP" className="w-full bg-gray-50 border border-gray-200 text-brand-black rounded-xl px-4 py-2.5 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Admin Notes</label>
                  <textarea rows={3} placeholder="Any internal notes or special instructions..." className="w-full bg-gray-50 border border-gray-200 text-brand-black rounded-xl px-4 py-2.5 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none" />
                </div>

              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50/50 shrink-0 flex justify-end gap-3">
                <button onClick={() => setIsCreateModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-[14px] text-gray-500 hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button onClick={() => setIsCreateModalOpen(false)} className="px-6 py-2.5 rounded-xl font-bold text-[14px] bg-brand-primary hover:bg-brand-primary-dark text-white shadow-sm shadow-brand-primary/20 transition-colors">
                  Create Job
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
