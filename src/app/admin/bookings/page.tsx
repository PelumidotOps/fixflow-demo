"use client";

import { readBookings, saveBookings, type DemoBooking } from "@/lib/demo-bookings";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Eye, 
  X, 
  Ban,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  Wrench,
  AlignLeft,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types & Mock Data ────────────────────────────────────────────────────────

type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "Rescheduled";

interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  status: BookingStatus;
  notes: string;
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "BK-1050",
    customerName: "Eleanor Vance",
    email: "eleanor.v@example.com",
    phone: "(555) 123-4567",
    address: "1428 Elm Street, Springfield, IL 62701",
    service: "AC Repair and Fix",
    preferredDate: "Apr 20, 2026",
    preferredTime: "09:00 AM",
    status: "Pending",
    notes: "AC is making a loud rattling noise when it starts up."
  },
  {
    id: "BK-1049",
    customerName: "Marcus Reid",
    email: "m.reid88@example.com",
    phone: "(555) 987-6543",
    address: "742 Evergreen Terrace, Springfield, IL 62704",
    service: "Regular Tune-Up",
    preferredDate: "Apr 20, 2026",
    preferredTime: "11:30 AM",
    status: "Confirmed",
    notes: "Annual spring maintenance before the summer heat."
  },
  {
    id: "BK-1048",
    customerName: "Sarah Connor",
    email: "s.connor@cyber.net",
    phone: "(555) 555-0199",
    address: "321 Cyber Blvd, Tech City, CA 94016",
    service: "New Installation",
    preferredDate: "Apr 21, 2026",
    preferredTime: "08:00 AM",
    status: "Confirmed",
    notes: "Need a complete replacement of the old HVAC unit."
  },
  {
    id: "BK-1047",
    customerName: "David Bowman",
    email: "d.bowman@discovery.org",
    phone: "(555) 201-1992",
    address: "2001 Space Way, Suite 400, Houston, TX 77058",
    service: "Air Duct Cleaning",
    preferredDate: "Apr 21, 2026",
    preferredTime: "02:00 PM",
    status: "Rescheduled",
    notes: "Dust is accumulating rapidly in the office vents."
  },
  {
    id: "BK-1046",
    customerName: "Ellen Ripley",
    email: "eripley@weyland.corp",
    phone: "(555) 426-0815",
    address: "LV-426 Colony Drive, Hadley's Hope, NV 89012",
    service: "Heater Repair",
    preferredDate: "Apr 22, 2026",
    preferredTime: "10:00 AM",
    status: "Pending",
    notes: "Heating element completely failed last night."
  },
  {
    id: "BK-1045",
    customerName: "Tony Stark",
    email: "t.stark@starkindustries.com",
    phone: "(555) 300-2000",
    address: "10880 Malibu Point, Malibu, CA 90265",
    service: "Heat Pump Service",
    preferredDate: "Apr 22, 2026",
    preferredTime: "01:00 PM",
    status: "Cancelled",
    notes: "System upgrade. Found an alternative solution."
  },
  {
    id: "BK-1044",
    customerName: "Bruce Wayne",
    email: "bwayne@wayneenterprises.com",
    phone: "(555) 193-9000",
    address: "1007 Mountain Drive, Gotham, NJ 07001",
    service: "AC Repair and Fix",
    preferredDate: "Apr 23, 2026",
    preferredTime: "09:00 AM",
    status: "Confirmed",
    notes: "Cave temperature control is malfunctioning."
  },
  {
    id: "BK-1043",
    customerName: "Diana Prince",
    email: "diana@themyscira.gov",
    phone: "(555) 777-1941",
    address: "1200 Embassy Row, Washington, DC 20008",
    service: "Regular Tune-Up",
    preferredDate: "Apr 23, 2026",
    preferredTime: "03:30 PM",
    status: "Pending",
    notes: "Standard checkup requested."
  }
];

const STATUS_STYLES: Record<BookingStatus, string> = {
  "Pending":     "bg-blue-50 text-blue-700 border-blue-200",
  "Confirmed":   "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Cancelled":   "bg-red-50 text-red-600 border-red-200",
  "Rescheduled": "bg-amber-50 text-amber-700 border-amber-200",
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function BookingsPage() {
  const [assignment,setAssignment]=useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [bookings,setBookings]=useState<Booking[]>(MOCK_BOOKINGS);
  useEffect(()=>{setBookings([...readBookings(),...MOCK_BOOKINGS]);},[]);
  const changeStatus=(id:string,status:BookingStatus)=>{setBookings(prev=>prev.map(b=>b.id===id?{...b,status}:b));saveBookings(readBookings().map(b=>b.id===id?{...b,status}:b));setSelectedBooking(prev=>prev?.id===id?{...prev,status}:prev);};

  // Filter Logic
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
    const matchesService = serviceFilter === "All" || booking.service === serviceFilter;
    const date=new Date(booking.preferredDate),now=new Date(); now.setHours(0,0,0,0);
    const weekEnd=new Date(now); weekEnd.setDate(now.getDate()+7);
    const matchesDate=dateFilter==="All" || (dateFilter==="Today"&&date.toDateString()===now.toDateString()) || (dateFilter==="This Week"&&date>=now&&date<weekEnd) || (dateFilter==="This Month"&&date.getMonth()===now.getMonth()&&date.getFullYear()===now.getFullYear());
    
    return matchesSearch && matchesStatus && matchesService && matchesDate;
  });

  return (
    <div className="flex flex-col gap-6 relative min-h-full">

      
      <p className="rounded-xl bg-sky-50 border border-sky-100 p-4 text-sm text-sky-900">Requests created in the customer demo appear here on this device. Other records are examples.</p>
      {/* ─── Header & Filters ─── */}
      <motion.div initial="hidden" animate="visible" variants={itemVariants} className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-black text-brand-black tracking-tight">Bookings</h1>
          
          <div className="relative w-full md:w-[320px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="h-[18px] w-[18px]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 shadow-sm text-brand-black rounded-xl pl-10 pr-4 py-2.5 text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-medium placeholder:text-gray-400"
              placeholder="Search by name or Booking ID..."
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 px-2 text-gray-400 border-r border-gray-100 hidden sm:flex">
            <Filter className="h-4 w-4" />
            <span className="text-[13px] font-bold uppercase tracking-wider">Filters</span>
          </div>

          <div className="relative flex-1 min-w-[150px]">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-gray-50/50 border border-transparent hover:border-gray-200 text-brand-black rounded-xl pl-4 pr-10 py-2 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Rescheduled">Rescheduled</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative flex-1 min-w-[150px]">
            <select 
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full appearance-none bg-gray-50/50 border border-transparent hover:border-gray-200 text-brand-black rounded-xl pl-4 pr-10 py-2 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all cursor-pointer"
            >
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

          <div className="relative flex-1 min-w-[150px]">
            <select 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full appearance-none bg-gray-50/50 border border-transparent hover:border-gray-200 text-brand-black rounded-xl pl-4 pr-10 py-2 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all cursor-pointer"
            >
              <option value="All">All Dates</option>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>

            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* ─── Data Table ─── */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-hidden flex-1"
      >
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-[13px] whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Booking ID</th>
                <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Customer Name</th>
                <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Service</th>
                <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Preferred Date</th>
                <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Preferred Time</th>
                <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 font-medium">
                    No bookings found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <motion.tr 
                    variants={itemVariants}
                    key={booking.id} 
                    onClick={() => setSelectedBooking(booking)}
                    className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4.5 font-bold text-brand-primary">{booking.id}</td>
                    <td className="px-6 py-4.5 font-bold text-brand-black">{booking.customerName}</td>
                    <td className="px-6 py-4.5 text-brand-text-secondary font-medium">
                      <div className="bg-gray-50 border border-gray-100 inline-block px-2.5 py-1 rounded-md text-[12px]">
                        {booking.service}
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-brand-text-secondary font-semibold">{new Date(booking.preferredDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</td>
                    <td className="px-6 py-4.5 text-brand-text-secondary font-semibold">{booking.preferredTime}</td>
                    <td className="px-6 py-4.5">
                      <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border", STATUS_STYLES[booking.status])}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedBooking(booking); }}
                          className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-brand-primary/10 text-gray-400 hover:text-brand-primary transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); changeStatus(booking.id,"Cancelled"); }}
                          className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                          title="Cancel Booking"
                        >
                          <Ban className="h-4 w-4" />
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

      {/* ─── Slide-in Detail Panel ─── */}
      <AnimatePresence>
        {selectedBooking && (
          <>
            {/* Backdrop */}
            <motion.div 
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setSelectedBooking(null)}
              className="fixed inset-0 bg-brand-navy/20 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div 
              variants={slideInVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 w-full max-w-[480px] bg-white shadow-2xl z-50 flex flex-col border-l border-gray-100 overflow-y-auto"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10">
                <div>
                  <h2 className="text-lg font-black text-brand-black">Booking Details</h2>
                  <p className="text-[13px] font-bold text-brand-primary mt-0.5">{selectedBooking.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-brand-black hover:bg-gray-50 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1 p-6 flex flex-col gap-8">
                
                {/* Customer Info */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Customer Information</h3>
                  <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-[14px] text-brand-black">{selectedBooking.customerName}</p>
                        <p className="text-[12px] font-medium text-gray-500">New Customer</p>
                      </div>
                    </div>
                    <div className="h-px w-full bg-gray-100 my-1" />
                    <div className="flex items-center gap-3 text-[13px] text-brand-text-secondary font-medium">
                      <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                      {selectedBooking.email}
                    </div>
                    <div className="flex items-center gap-3 text-[13px] text-brand-text-secondary font-medium">
                      <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                      {selectedBooking.phone}
                    </div>
                    <div className="flex items-start gap-3 text-[13px] text-brand-text-secondary font-medium">
                      <MapPin className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{selectedBooking.address}</span>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Service Request</h3>
                  <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 flex flex-col gap-4">
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Wrench className="h-4 w-4 text-brand-primary" />
                        <span className="font-bold text-[13px] text-brand-black">{selectedBooking.service}</span>
                      </div>
                      <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border", STATUS_STYLES[selectedBooking.status])}>
                        {selectedBooking.status}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2.5 text-[13px] font-semibold text-gray-600 bg-white border border-gray-100 py-2 px-3 rounded-xl">
                        <Calendar className="h-4 w-4 text-brand-primary" />
                        {new Date(selectedBooking.preferredDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
                      </div>
                      <div className="flex items-center gap-2.5 text-[13px] font-semibold text-gray-600 bg-white border border-gray-100 py-2 px-3 rounded-xl">
                        <Clock className="h-4 w-4 text-brand-primary" />
                        {selectedBooking.preferredTime}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-1">
                      <div className="flex items-center gap-2 text-[12px] font-bold text-brand-black">
                        <AlignLeft className="h-3.5 w-3.5 text-gray-400" />
                        Customer Notes
                      </div>
                      <p className="text-[13px] text-gray-600 font-medium leading-relaxed bg-white border border-gray-100 p-3 rounded-xl">
                        {selectedBooking.notes || "No additional notes provided."}
                      </p>
                    </div>

                  </div>
                </div>

              </div>

              {/* Panel Footer / Actions */}
              {assignment && <p role="status" className="px-6 text-sm text-sky-900">Demo assignment: {assignment}. No technician is notified.</p>}
              <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 flex flex-col gap-3">
                <button onClick={()=>changeStatus(selectedBooking.id,"Confirmed")} className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 rounded-xl transition-colors shadow-sm shadow-brand-primary/20">
                  Confirm Booking
                </button>
                
                <div className="relative">
                  <select aria-label="Assign technician" defaultValue="" onChange={e=>{setAssignment(e.target.value)}} className="w-full appearance-none bg-white border border-gray-200 hover:border-gray-300 text-brand-black font-bold py-3 pl-4 pr-10 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/20 cursor-pointer">
                    <option value="" disabled>Assign Technician...</option>
                    <option value="Tom Harris">Tom Harris</option>
                    <option value="Sara King">Sara King</option>
                    <option value="Leo Martinez">Leo Martinez</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                <a href="/book" className="text-center w-full bg-white border border-gray-200 hover:bg-gray-50 text-brand-black font-bold py-3 rounded-xl transition-colors">
                  Create a replacement request
                </a>
                
                <button onClick={()=>changeStatus(selectedBooking.id,"Cancelled")} className="w-full bg-white border border-red-200 hover:bg-red-50 text-red-600 font-bold py-3 rounded-xl transition-colors">
                  Cancel Booking
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
