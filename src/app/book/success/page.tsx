"use client";

import { motion } from "framer-motion";
import { Check, Calendar, Clock, MapPin, Bookmark } from "lucide-react";
import { useBooking } from "@/components/booking/BookingContext";
import { useEffect, useState } from "react";

export default function BookingSuccess() {
  const { data } = useBooking();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!sessionStorage.getItem("fixflow-last-booking")) return <div className="container mx-auto px-4 py-24 text-center"><h1 className="text-3xl font-bold mb-6">Start with a sample request</h1><a href="/book" className="text-sky-800 underline">Explore booking</a></div>;

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[85vh]">
       <motion.div
         initial={{ scale: 0, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ type: "spring" as const, stiffness: 200, damping: 20 }}
         className="w-28 h-28 bg-[#d1fae5] rounded-full flex items-center justify-center mb-10 shadow-xl shadow-[#d1fae5]/50 relative"
       >
         <motion.div 
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ delay: 0.2, type: "spring" as const, stiffness: 250 }}
           className="w-[72px] h-[72px] bg-[#10b981] rounded-full flex items-center justify-center"
         >
           <Check className="h-10 w-10 text-white stroke-[3.5]" />
         </motion.div>
         {/* Decorative rings */}
         <div className="absolute inset-0 border-2 border-[#10b981]/20 rounded-full animate-ping opacity-75" />
       </motion.div>

       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.3 }}
         className="text-center mb-12"
       >
         <h1 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-brand-black tracking-tight mb-5 leading-tight">
           Your demo request is ready.
         </h1>
         <p className="text-gray-500 text-[17px] max-w-xl mx-auto font-medium">
           Your sample request is saved in this browser. Open the admin demo to review it. No messages have been sent.
         </p>
       </motion.div>

       {/* Summary Card */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.4 }}
         className="w-full max-w-[550px] bg-white rounded-3xl p-8 lg:p-10 border-2 border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12"
       >
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
             <div className="h-14 w-14 rounded-full bg-brand-primary/10 flex items-center justify-center">
                <Bookmark className="h-7 w-7 text-brand-primary" />
             </div>
             <div>
               <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">Service</p>
               <p className="text-[20px] font-extrabold text-brand-black capitalize leading-tight">
                 {data.serviceId ? data.serviceId.replace("-", " ") : "Standard HVAC Service"}
               </p>
             </div>
          </div>

          <div className="flex flex-col gap-6">
             <div className="flex gap-4">
               <div className="w-10 flex justify-center mt-0.5">
                 <Calendar className="h-[22px] w-[22px] text-gray-400" />
               </div>
               <div>
                 <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wide">Date</p>
                 <p className="text-brand-black text-[16px] font-bold mt-1">
                   {data.date ? new Date(data.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Date pending"}
                 </p>
               </div>
             </div>

             <div className="flex gap-4">
               <div className="w-10 flex justify-center mt-0.5">
                 <Clock className="h-[22px] w-[22px] text-gray-400" />
               </div>
               <div>
                 <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wide">Time Window</p>
                 <p className="text-brand-black text-[16px] font-bold mt-1">{data.timeSlot || "Time pending"}</p>
               </div>
             </div>

             <div className="flex gap-4">
               <div className="w-10 flex justify-center mt-0.5">
                 <MapPin className="h-[22px] w-[22px] text-gray-400" />
               </div>
               <div>
                 <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wide">Address</p>
                 <p className="text-brand-black text-[16px] font-bold mt-1 leading-snug">{data.serviceAddress || "Address pending validation"}</p>
               </div>
             </div>
          </div>
       </motion.div>

       {/* Actions */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.5 }}
         className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center max-w-[550px]"
       >
          <button onClick={() => window.location.assign("/admin/bookings")} className="flex h-14 items-center justify-center rounded-full border-2 border-gray-200 bg-white px-8 text-[15px] font-bold text-brand-black transition-all hover:border-gray-300 hover:bg-gray-50 w-full sm:flex-1">
            View in admin
          </button>
          
          <button onClick={() => { if(!data.date)return; const start=new Date(data.date); const match=(data.timeSlot||"09:00 AM").match(/(\d+):(\d+)\s*(AM|PM)/); if(match)start.setHours(Number(match[1])%12+(match[3]==="PM"?12:0),Number(match[2]),0,0); const fmt=(d:Date)=>d.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,""); const content=["BEGIN:VCALENDAR","VERSION:2.0","BEGIN:VEVENT","UID:"+Date.now()+"@fixflow.demo","DTSTAMP:"+fmt(new Date()),"DTSTART:"+fmt(start),"DTEND:"+fmt(new Date(start.getTime()+3600000)),"SUMMARY:FixFlow demo service visit","END:VEVENT","END:VCALENDAR"].join("\r\n"); const url=URL.createObjectURL(new Blob([content],{type:"text/calendar"})); const a=document.createElement("a");a.href=url;a.download="fixflow-demo-visit.ics";a.click();URL.revokeObjectURL(url); }} disabled={!data.date} className="flex h-14 items-center justify-center rounded-full bg-brand-primary px-8 text-[15px] font-extrabold text-white transition-all hover:bg-brand-primary-dark hover:scale-[1.02] gap-2 shadow-lg shadow-brand-primary/25 w-full sm:flex-1">
            <Calendar className="h-[18px] w-[18px]" />
            Add to Calendar
          </button>
       </motion.div>
    </div>
  );
}
