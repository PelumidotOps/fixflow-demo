"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Search, 
  Plus,
  Briefcase,
  UserPlus,
  X,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  CalendarDays
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_TECHNICIANS, STATUS_STYLES, Technician } from "./mockData";

// ─── Animations ───────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function TechniciansPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter Logic
  const filteredTechs = MOCK_TECHNICIANS.filter((tech) => {
    const term = searchTerm.toLowerCase();
    const matchesName = tech.name.toLowerCase().includes(term);
    const matchesSpecialty = tech.specialties.some(s => s.toLowerCase().includes(term));
    return matchesName || matchesSpecialty;
  });

  return (
    <div className="flex flex-col gap-6 min-h-full pb-10">
      
      {/* ─── Header & Search ─── */}
      <motion.div initial="hidden" animate="visible" variants={itemVariants} className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-black text-brand-black tracking-tight">Technicians</h1>
          
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white px-5 py-2.5 rounded-xl font-bold text-[14px] transition-colors shadow-sm shadow-brand-primary/20 w-full md:w-auto"
          >
            <UserPlus className="h-4 w-4" /> Add Technician
          </button>
        </div>

        <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] flex">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-none text-brand-black rounded-xl pl-12 pr-4 py-3 text-[14px] focus:outline-none focus:ring-0 font-medium placeholder:text-gray-400"
              placeholder="Search by technician name or specialty..."
            />
          </div>
        </div>
      </motion.div>

      {/* ─── Grid View ─── */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredTechs.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-400 font-medium bg-white rounded-3xl border border-gray-100 shadow-sm">
            No technicians found matching your search.
          </div>
        ) : (
          filteredTechs.map((tech) => (
            <motion.div 
              variants={itemVariants} 
              key={tech.id} 
              className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Card Top / Avatar */}
              <div className="p-6 flex flex-col items-center text-center gap-4 relative">
                <div className="absolute top-4 right-4">
                  <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase border", STATUS_STYLES[tech.status])}>
                    {tech.status}
                  </span>
                </div>

                <div className="h-20 w-20 rounded-full bg-brand-primary/10 flex items-center justify-center border-2 border-white shadow-md relative mt-4">
                  {tech.avatarUrl ? (
                    <img src={tech.avatarUrl} alt={tech.name} className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-brand-primary">{tech.name.split(' ').map(n => n[0]).join('')}</span>
                  )}
                  {tech.status === "Available" && (
                    <div className="absolute bottom-0 right-0 h-4 w-4 bg-emerald-500 rounded-full border-2 border-white" />
                  )}
                </div>

                <div>
                  <h3 className="text-[17px] font-black text-brand-black">{tech.name}</h3>
                  <p className="text-[12px] text-gray-500 font-medium mt-1 flex items-center justify-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-brand-primary" />
                    {tech.activeJobsCount} Active {tech.activeJobsCount === 1 ? 'Job' : 'Jobs'}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                  {tech.specialties.slice(0, 3).map((spec, i) => (
                    <span key={i} className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap">
                      {spec}
                    </span>
                  ))}
                  {tech.specialties.length > 3 && (
                    <span className="bg-gray-100 text-gray-500 border border-gray-200 px-2.5 py-1 rounded-full text-[10px] font-bold">
                      +{tech.specialties.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Bottom / Actions */}
              <div className="p-4 bg-gray-50/50 border-t border-gray-100 mt-auto flex gap-3">
                <Link 
                  href={`/admin/technicians/${tech.id}`}
                  className="flex-1 bg-white border border-gray-200 hover:border-brand-primary hover:text-brand-primary text-gray-700 font-bold py-2.5 rounded-xl text-[13px] text-center transition-all shadow-sm"
                >
                  View Profile
                </Link>
                <button className="flex-1 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-2.5 rounded-xl text-[13px] transition-colors shadow-sm shadow-brand-primary/20">
                  Assign Job
                </button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* ─── Add Technician Modal ─── */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-brand-navy/30 backdrop-blur-sm"
            />
            
            <motion.div 
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                    <UserPlus className="h-5 w-5 text-brand-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-brand-black leading-tight">Add Technician</h2>
                    <p className="text-[12px] text-gray-500 font-medium mt-0.5">Invite a new technician to the portal.</p>
                  </div>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="h-8 w-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-brand-black hover:bg-gray-50 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-8">
                
                {/* Personal Info */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-[12px] font-extrabold text-gray-400 uppercase tracking-wider">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-brand-black">Full Name</label>
                      <input type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-200 text-brand-black rounded-xl px-4 py-3 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-brand-black">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input type="email" placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-200 text-brand-black rounded-xl pl-11 pr-4 py-3 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-[13px] font-bold text-brand-black">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input type="tel" placeholder="(555) 000-0000" className="w-full bg-gray-50 border border-gray-200 text-brand-black rounded-xl pl-11 pr-4 py-3 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-[12px] font-extrabold text-gray-400 uppercase tracking-wider">Specialties</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["AC Repair", "Heating Repair", "New Installation", "Regular Tune-Up", "Air Duct Cleaning", "Heat Pump Service"].map(spec => (
                      <label key={spec} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <input type="checkbox" className="h-4 w-4 text-brand-primary rounded border-gray-300 focus:ring-brand-primary" />
                        <span className="text-[13px] font-semibold text-brand-black">{spec}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[12px] font-extrabold text-gray-400 uppercase tracking-wider">Working Hours</h3>
                    <button className="text-[12px] font-bold text-brand-primary hover:underline">Apply 9-5 to All</button>
                  </div>
                  <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, i) => (
                      <div key={day} className={cn("flex items-center justify-between p-3.5", i !== 6 && "border-b border-gray-100")}>
                        <div className="flex items-center gap-3 w-32 shrink-0">
                          <input type="checkbox" defaultChecked={i < 5} className="h-4 w-4 text-brand-primary rounded border-gray-300 focus:ring-brand-primary" />
                          <span className="text-[13px] font-bold text-brand-black">{day}</span>
                        </div>
                        <div className="flex items-center gap-3 flex-1">
                          <input type="time" defaultValue="09:00" disabled={i >= 5} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-brand-black disabled:opacity-50" />
                          <span className="text-gray-400 font-medium text-[12px]">to</span>
                          <input type="time" defaultValue="17:00" disabled={i >= 5} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-brand-black disabled:opacity-50" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50/50 shrink-0 flex justify-end gap-3">
                <button onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-[14px] text-gray-500 hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 rounded-xl font-bold text-[14px] bg-brand-primary hover:bg-brand-primary-dark text-white shadow-sm shadow-brand-primary/20 transition-colors flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Send Invite
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
