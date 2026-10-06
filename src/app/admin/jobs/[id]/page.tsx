"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  Wrench,
  RefreshCw,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  FileBadge,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_JOBS, STATUS_STYLES, Job } from "../mockData";

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

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  // Find the job
  const job = MOCK_JOBS.find((j) => j.id === id);
  const [adminNotes, setAdminNotes] = useState(job?.adminNotes || "");

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-brand-black">
        <h2 className="text-xl font-bold">Job Not Found</h2>
        <button onClick={() => router.back()} className="text-brand-primary font-semibold hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-20"
    >
      
      {/* ─── Top Section ─── */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push("/admin/jobs")}
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-brand-black hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-brand-black tracking-tight">{job.id}</h1>
              <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border", STATUS_STYLES[job.status])}>
                {job.status}
              </span>
            </div>
            <p className="text-[13px] text-brand-text-secondary font-medium mt-0.5">Created on Apr 18, 2026</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ─── Left Column (Main Details) ─── */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Customer Info Card */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-6 flex flex-col gap-5">
            <h2 className="text-[14px] font-extrabold text-brand-black flex items-center gap-2">
              <User className="h-4 w-4 text-brand-primary" /> Customer Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Full Name</span>
                <span className="text-[14px] font-semibold text-brand-black">{job.customerName}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Phone Number</span>
                <span className="text-[14px] font-semibold text-brand-black">{job.phone}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Email Address</span>
                <span className="text-[14px] font-semibold text-brand-black">{job.email}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Service Address</span>
                <div className="flex items-start gap-1">
                  <span className="text-[14px] font-semibold text-brand-black leading-snug">{job.address}</span>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(job.address)}`} target="_blank" rel="noreferrer" className="text-brand-primary hover:text-brand-primary-dark mt-0.5" title="View on Google Maps">
                    <MapPin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Job Info Card */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-6 flex flex-col gap-5">
            <h2 className="text-[14px] font-extrabold text-brand-black flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-brand-primary" /> Job Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Service Type</span>
                <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-brand-primary" />
                  <span className="text-[13px] font-semibold text-brand-black">{job.service}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Assigned Technician</span>
                <div className="flex items-center gap-2">
                  {job.assignedTechnician ? (
                    <>
                      <div className="h-10 w-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold border border-brand-primary/20">
                        {job.assignedTechnician.charAt(0)}
                      </div>
                      <span className="text-[14px] font-semibold text-brand-black flex-1">{job.assignedTechnician}</span>
                    </>
                  ) : (
                    <span className="text-[14px] font-semibold text-gray-400 italic flex-1">Unassigned</span>
                  )}
                  <button className="h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-brand-primary hover:bg-brand-primary/5 transition-colors" title="Reassign Technician">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Scheduled Date</span>
                <div className="flex items-center gap-2 text-[14px] font-semibold text-brand-black">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {job.scheduledDate}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Scheduled Time</span>
                <div className="flex items-center gap-2 text-[14px] font-semibold text-brand-black">
                  <Clock className="h-4 w-4 text-gray-400" />
                  {job.scheduledTime}
                </div>
              </div>
              
            </div>
          </motion.div>

          {/* Admin Notes Section */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-6 flex flex-col gap-4">
            <h2 className="text-[14px] font-extrabold text-brand-black flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand-primary" /> Admin Notes
            </h2>
            <textarea 
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add internal notes about this job..."
              className="w-full bg-gray-50 border border-gray-200 text-brand-black rounded-xl p-4 text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none min-h-[100px]"
            />
            <div className="flex justify-end">
              <button className="bg-white border border-gray-200 hover:bg-gray-50 text-brand-black px-4 py-2 rounded-xl text-[13px] font-bold transition-colors shadow-sm">
                Save Note
              </button>
            </div>
          </motion.div>

        </div>

        {/* ─── Right Column (Timeline & Tech Notes) ─── */}
        <div className="flex flex-col gap-6">
          
          {/* Timeline */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-6 flex flex-col gap-5">
            <h2 className="text-[14px] font-extrabold text-brand-black flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-primary" /> Status Timeline
            </h2>
            
            <div className="relative pl-3 space-y-6 before:absolute before:inset-y-2 before:left-[15px] before:w-0.5 before:bg-gray-100">
              {job.timeline.map((event, index) => (
                <div key={index} className="relative flex gap-4">
                  <div className={cn("h-2.5 w-2.5 rounded-full mt-1.5 shrink-0 z-10", 
                    event.status === "Pending" ? "bg-blue-400 ring-4 ring-white" :
                    event.status === "Assigned" ? "bg-amber-400 ring-4 ring-white" :
                    event.status === "In Progress" ? "bg-orange-400 ring-4 ring-white" :
                    event.status === "Completed" ? "bg-emerald-400 ring-4 ring-white" :
                    "bg-red-400 ring-4 ring-white"
                  )} />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-bold text-brand-black">{event.status}</span>
                    <span className="text-[11px] text-gray-400 font-medium">{event.updatedBy} • {event.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Technician Notes (Read Only) */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-6 flex flex-col gap-4">
            <h2 className="text-[14px] font-extrabold text-brand-black flex items-center gap-2">
              <FileBadge className="h-4 w-4 text-brand-primary" /> Technician Notes
            </h2>
            {job.technicianNotes ? (
              <p className="text-[13px] leading-relaxed text-gray-600 bg-gray-50 border border-gray-100 rounded-xl p-4 font-medium italic">
                "{job.technicianNotes}"
              </p>
            ) : (
              <div className="text-[12px] text-gray-400 font-medium text-center py-6 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                No notes submitted yet.
              </div>
            )}
          </motion.div>

          {/* Job Photos */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-6 flex flex-col gap-4">
            <h2 className="text-[14px] font-extrabold text-brand-black flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-brand-primary" /> Job Photos
            </h2>
            {job.photos && job.photos.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {job.photos.map((photo, i) => (
                  <div key={i} className="aspect-square rounded-xl bg-gray-100 overflow-hidden border border-gray-200 relative group">
                    <img src={photo} alt={`Job photo ${i+1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-brand-navy/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[12px] text-gray-400 font-medium text-center py-6 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                No photos uploaded.
              </div>
            )}
          </motion.div>

        </div>
      </div>

      {/* ─── Fixed Bottom Actions ─── */}
      <motion.div variants={itemVariants} className="fixed bottom-0 left-0 right-0 lg:left-[64px] bg-white border-t border-gray-100 p-4 px-6 lg:px-8 flex justify-end z-40 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300">
        <Link 
          href="/admin/invoices"
          className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white px-6 py-3 rounded-xl font-bold text-[14px] transition-colors shadow-sm shadow-brand-primary/20"
        >
          <CheckCircle2 className="h-4 w-4" />
          Generate Invoice
        </Link>
      </motion.div>

    </motion.div>
  );
}
