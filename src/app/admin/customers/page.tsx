"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Search, 
  Download,
  Filter,
  ChevronDown,
  Eye,
  X,
  Mail,
  Phone,
  MapPin,
  ArrowUpDown,
  Calendar,
  Briefcase,
  DollarSign,
  Users,
  UserPlus,
  Repeat
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types & Mock Data ────────────────────────────────────────────────────────

type SortConfig = { key: "totalBookings" | "lastBookingDate" | "totalSpent", direction: "asc" | "desc" } | null;

interface CustomerBooking {
  id: string;
  service: string;
  date: string;
  status: "Completed" | "Pending" | "Cancelled" | "In Progress";
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalBookings: number;
  lastBookingDate: string;
  lastBookingTimestamp: number; // for sorting
  totalSpent: number;
  bookingsHistory: CustomerBooking[];
}

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "C-1001",
    name: "Sarah Connor",
    email: "s.connor@cyber.net",
    phone: "(555) 555-0199",
    address: "321 Cyber Blvd, Tech City, CA 94016",
    totalBookings: 6,
    lastBookingDate: "Apr 21, 2026",
    lastBookingTimestamp: new Date("2026-04-21").getTime(),
    totalSpent: 4250,
    bookingsHistory: [
      { id: "JOB-2051", service: "New Installation", date: "Apr 21, 2026", status: "Completed" },
      { id: "JOB-1902", service: "Regular Tune-Up", date: "Oct 15, 2025", status: "Completed" },
      { id: "JOB-1504", service: "AC Repair", date: "Jun 10, 2025", status: "Completed" },
    ]
  },
  {
    id: "C-1002",
    name: "Marcus Reid",
    email: "m.reid88@example.com",
    phone: "(555) 987-6543",
    address: "742 Evergreen Terrace, Springfield, IL 62704",
    totalBookings: 1,
    lastBookingDate: "Apr 20, 2026",
    lastBookingTimestamp: new Date("2026-04-20").getTime(),
    totalSpent: 150,
    bookingsHistory: [
      { id: "JOB-2052", service: "Regular Tune-Up", date: "Apr 20, 2026", status: "Pending" },
    ]
  },
  {
    id: "C-1003",
    name: "Bruce Wayne",
    email: "bwayne@wayneenterprises.com",
    phone: "(555) 193-9000",
    address: "1007 Mountain Drive, Gotham, NJ 07001",
    totalBookings: 12,
    lastBookingDate: "Apr 23, 2026",
    lastBookingTimestamp: new Date("2026-04-23").getTime(),
    totalSpent: 12400,
    bookingsHistory: [
      { id: "JOB-2053", service: "AC Repair and Fix", date: "Apr 23, 2026", status: "In Progress" },
      { id: "JOB-1801", service: "Air Duct Cleaning", date: "Jan 12, 2026", status: "Completed" },
    ]
  },
  {
    id: "C-1004",
    name: "Diana Prince",
    email: "diana@themyscira.gov",
    phone: "(555) 777-1941",
    address: "1200 Embassy Row, Washington, DC 20008",
    totalBookings: 3,
    lastBookingDate: "Apr 24, 2026",
    lastBookingTimestamp: new Date("2026-04-24").getTime(),
    totalSpent: 850,
    bookingsHistory: [
      { id: "JOB-2054", service: "Heater Repair", date: "Apr 24, 2026", status: "Pending" },
      { id: "JOB-1605", service: "Regular Tune-Up", date: "Nov 05, 2025", status: "Completed" },
    ]
  },
  {
    id: "C-1005",
    name: "Tony Stark",
    email: "t.stark@starkindustries.com",
    phone: "(555) 300-2000",
    address: "10880 Malibu Point, Malibu, CA 90265",
    totalBookings: 8,
    lastBookingDate: "Apr 22, 2026",
    lastBookingTimestamp: new Date("2026-04-22").getTime(),
    totalSpent: 8900,
    bookingsHistory: [
      { id: "JOB-2055", service: "Heat Pump Service", date: "Apr 22, 2026", status: "Cancelled" },
      { id: "JOB-1420", service: "New Installation", date: "Mar 15, 2025", status: "Completed" },
    ]
  },
  {
    id: "C-1006",
    name: "Eleanor Vance",
    email: "eleanor.v@example.com",
    phone: "(555) 123-4567",
    address: "1428 Elm Street, Springfield, IL 62701",
    totalBookings: 4,
    lastBookingDate: "Apr 20, 2026",
    lastBookingTimestamp: new Date("2026-04-20").getTime(),
    totalSpent: 1200,
    bookingsHistory: [
      { id: "JOB-2056", service: "AC Repair and Fix", date: "Apr 20, 2026", status: "Completed" },
      { id: "JOB-1750", service: "Air Duct Cleaning", date: "Dec 01, 2025", status: "Completed" },
    ]
  },
  {
    id: "C-1007",
    name: "David Bowman",
    email: "d.bowman@discovery.org",
    phone: "(555) 201-1992",
    address: "2001 Space Way, Suite 400, Houston, TX 77058",
    totalBookings: 2,
    lastBookingDate: "Apr 21, 2026",
    lastBookingTimestamp: new Date("2026-04-21").getTime(),
    totalSpent: 450,
    bookingsHistory: [
      { id: "JOB-2057", service: "Air Duct Cleaning", date: "Apr 21, 2026", status: "In Progress" },
      { id: "JOB-1901", service: "Regular Tune-Up", date: "Feb 10, 2026", status: "Completed" },
    ]
  },
  {
    id: "C-1008",
    name: "Ellen Ripley",
    email: "eripley@weyland.corp",
    phone: "(555) 426-0815",
    address: "LV-426 Colony Drive, Hadley's Hope, NV 89012",
    totalBookings: 5,
    lastBookingDate: "Apr 22, 2026",
    lastBookingTimestamp: new Date("2026-04-22").getTime(),
    totalSpent: 3100,
    bookingsHistory: [
      { id: "JOB-2058", service: "Heater Repair", date: "Apr 22, 2026", status: "Pending" },
      { id: "JOB-1820", service: "Heat Pump Service", date: "Jan 20, 2026", status: "Completed" },
    ]
  },
  {
    id: "C-1009",
    name: "Peter Parker",
    email: "peter@dailybugle.com",
    phone: "(555) 111-2222",
    address: "20 Ingram Street, Queens, NY 11375",
    totalBookings: 1,
    lastBookingDate: "Mar 10, 2026",
    lastBookingTimestamp: new Date("2026-03-10").getTime(),
    totalSpent: 120,
    bookingsHistory: [
      { id: "JOB-1930", service: "Regular Tune-Up", date: "Mar 10, 2026", status: "Completed" },
    ]
  },
  {
    id: "C-1010",
    name: "Clark Kent",
    email: "ckent@dailyplanet.com",
    phone: "(555) 333-4444",
    address: "344 Clinton St, Apt 3D, Metropolis, NY 10011",
    totalBookings: 2,
    lastBookingDate: "Apr 15, 2026",
    lastBookingTimestamp: new Date("2026-04-15").getTime(),
    totalSpent: 550,
    bookingsHistory: [
      { id: "JOB-2010", service: "Heater Repair", date: "Apr 15, 2026", status: "Completed" },
      { id: "JOB-1845", service: "Regular Tune-Up", date: "Nov 20, 2025", status: "Completed" },
    ]
  }
];

// ─── Formatting & Colors ───────────────────────────────────────────────────────

const STATUS_STYLES = {
  "Pending":     "bg-blue-50 text-blue-700 border-blue-200",
  "In Progress": "bg-orange-50 text-orange-700 border-orange-200",
  "Completed":   "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Cancelled":   "bg-red-50 text-red-600 border-red-200",
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
};

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
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

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingsFilter, setBookingsFilter] = useState("Any");
  const [dateFilter, setDateFilter] = useState("Any time");
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Filter Logic
  const filteredCustomers = useMemo(() => {
    let result = MOCK_CUSTOMERS.filter((customer) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch = 
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term) ||
        customer.phone.includes(term);

      let matchesBookings = true;
      if (bookingsFilter === "1 booking") matchesBookings = customer.totalBookings === 1;
      else if (bookingsFilter === "2 to 5 bookings") matchesBookings = customer.totalBookings >= 2 && customer.totalBookings <= 5;
      else if (bookingsFilter === "5 plus bookings") matchesBookings = customer.totalBookings > 5;

      // Note: Date filtering mock logic is omitted for brevity since placeholder data spans similar dates,
      // but in reality we would check lastBookingTimestamp against ranges.

      return matchesSearch && matchesBookings;
    });

    if (sortConfig !== null) {
      result.sort((a, b) => {
        let aValue, bValue;
        if (sortConfig.key === "totalBookings") { aValue = a.totalBookings; bValue = b.totalBookings; }
        else if (sortConfig.key === "totalSpent") { aValue = a.totalSpent; bValue = b.totalSpent; }
        else { aValue = a.lastBookingTimestamp; bValue = b.lastBookingTimestamp; }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [searchTerm, bookingsFilter, dateFilter, sortConfig]);

  const requestSort = (key: NonNullable<SortConfig>["key"]) => {
    let direction: "asc" | "desc" = "desc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIconClass = (key: string) => {
    if (sortConfig?.key !== key) return "text-gray-300";
    return "text-brand-primary";
  };

  return (
    <div className="flex flex-col gap-6 relative min-h-full pb-10">
      
      {/* ─── Header & Filters ─── */}
      <motion.div initial="hidden" animate="visible" variants={itemVariants} className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-black text-brand-black tracking-tight">Customers</h1>
          
          <button className="flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white px-5 py-2.5 rounded-xl font-bold text-[14px] transition-colors shadow-sm shadow-brand-primary/20 w-full md:w-auto">
            <Download className="h-4 w-4" /> Export to CSV
          </button>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)]">
          
          <div className="relative w-full lg:w-[320px] shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="h-[18px] w-[18px]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-transparent text-brand-black rounded-xl pl-10 pr-4 py-2.5 text-[13px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-medium placeholder:text-gray-400"
              placeholder="Search by name, email, or phone..."
            />
          </div>

          <div className="h-8 w-px bg-gray-100 hidden lg:block mx-1" />

          <div className="flex flex-wrap flex-1 gap-3 w-full">
            <div className="relative flex-1 min-w-[160px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-400 uppercase tracking-wide">Total Bookings:</span>
              <select value={bookingsFilter} onChange={(e) => setBookingsFilter(e.target.value)} className="w-full appearance-none bg-gray-50/50 hover:bg-gray-50 border border-transparent hover:border-gray-200 text-brand-black rounded-xl pl-[110px] pr-10 py-2.5 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all cursor-pointer">
                <option>Any</option>
                <option>1 booking</option>
                <option>2 to 5 bookings</option>
                <option>5 plus bookings</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative flex-1 min-w-[160px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-400 uppercase tracking-wide">Last Booking:</span>
              <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="w-full appearance-none bg-gray-50/50 hover:bg-gray-50 border border-transparent hover:border-gray-200 text-brand-black rounded-xl pl-[95px] pr-10 py-2.5 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all cursor-pointer">
                <option>Any time</option>
                <option>This week</option>
                <option>This month</option>
                <option>Last 3 months</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Summary Stats Row ─── */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div variants={itemVariants} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col gap-2">
          <p className="text-[12px] font-extrabold text-gray-400 uppercase tracking-wider">Total Customers</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black text-brand-black">{MOCK_CUSTOMERS.length + 842}</h3>
            <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col gap-2">
          <p className="text-[12px] font-extrabold text-gray-400 uppercase tracking-wider">New Customers This Month</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black text-brand-black">124</h3>
            <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col gap-2">
          <p className="text-[12px] font-extrabold text-gray-400 uppercase tracking-wider">Returning Customers</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black text-brand-black">718</h3>
            <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center">
              <Repeat className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </motion.div>
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
                <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Phone</th>
                <th className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Address</th>
                <th 
                  className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none group"
                  onClick={() => requestSort("totalBookings")}
                >
                  <div className="flex items-center gap-1.5">
                    Total Bookings
                    <ArrowUpDown className={cn("h-3 w-3", getSortIconClass("totalBookings"))} />
                  </div>
                </th>
                <th 
                  className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none group"
                  onClick={() => requestSort("lastBookingDate")}
                >
                  <div className="flex items-center gap-1.5">
                    Last Booking Date
                    <ArrowUpDown className={cn("h-3 w-3", getSortIconClass("lastBookingDate"))} />
                  </div>
                </th>
                <th 
                  className="text-left px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none group"
                  onClick={() => requestSort("totalSpent")}
                >
                  <div className="flex items-center gap-1.5">
                    Total Spent
                    <ArrowUpDown className={cn("h-3 w-3", getSortIconClass("totalSpent"))} />
                  </div>
                </th>
                <th className="text-right px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center text-gray-400 font-medium">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                        <Users className="h-8 w-8" />
                      </div>
                      <p>No customers yet. Customers will appear here automatically after their first booking.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <motion.tr 
                    variants={itemVariants}
                    key={customer.id} 
                    onClick={() => setSelectedCustomer(customer)}
                    className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-[11px] font-extrabold border border-brand-primary/20 shrink-0">
                          {getInitials(customer.name)}
                        </div>
                        <span className="font-bold text-brand-black">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-brand-text-secondary font-medium">{customer.email}</td>
                    <td className="px-6 py-4.5 text-brand-text-secondary font-medium">{customer.phone}</td>
                    <td className="px-6 py-4.5 text-brand-text-secondary font-medium truncate max-w-[200px]" title={customer.address}>
                      {customer.address}
                    </td>
                    <td className="px-6 py-4.5 font-bold text-brand-black">
                      <div className="bg-gray-50 border border-gray-100 inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-md text-[12px]">
                        {customer.totalBookings}
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-brand-text-secondary font-semibold">{customer.lastBookingDate}</td>
                    <td className="px-6 py-4.5 font-black text-brand-black">{formatCurrency(customer.totalSpent)}</td>
                    <td className="px-6 py-4.5 text-right">
                      <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedCustomer(customer); }}
                          className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-brand-primary/10 text-gray-400 hover:text-brand-primary transition-colors"
                          title="View Profile"
                        >
                          <Eye className="h-4 w-4" />
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
        {selectedCustomer && (
          <>
            {/* Backdrop */}
            <motion.div 
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setSelectedCustomer(null)}
              className="fixed inset-0 bg-brand-navy/30 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div 
              variants={slideInVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 w-full max-w-[500px] bg-white shadow-2xl z-50 flex flex-col border-l border-gray-100 overflow-y-auto"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-20">
                <h2 className="text-lg font-black text-brand-black">Customer Profile</h2>
                <button 
                  onClick={() => setSelectedCustomer(null)}
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-brand-black hover:bg-gray-50 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1 p-6 flex flex-col gap-8 relative overflow-hidden">
                
                {/* Decorative background circle */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

                {/* Profile Header */}
                <div className="flex flex-col items-center text-center gap-4 z-10 relative">
                  <div className="h-24 w-24 rounded-full bg-brand-primary/10 flex items-center justify-center border-4 border-white shadow-md">
                    <span className="text-3xl font-black text-brand-primary">{getInitials(selectedCustomer.name)}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-brand-black tracking-tight">{selectedCustomer.name}</h3>
                    <p className="text-[13px] text-gray-500 font-medium mt-1">Customer ID: {selectedCustomer.id}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 z-10">
                  <div className="flex items-center gap-3 text-[13px] text-brand-text-secondary font-semibold">
                    <Mail className="h-4 w-4 text-brand-primary shrink-0" />
                    {selectedCustomer.email}
                  </div>
                  <div className="flex items-center gap-3 text-[13px] text-brand-text-secondary font-semibold">
                    <Phone className="h-4 w-4 text-brand-primary shrink-0" />
                    {selectedCustomer.phone}
                  </div>
                  <div className="flex items-start gap-3 text-[13px] text-brand-text-secondary font-semibold">
                    <MapPin className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{selectedCustomer.address}</span>
                  </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-3 gap-3 z-10">
                  <div className="bg-white border border-gray-100 shadow-sm p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-1">
                    <Briefcase className="h-5 w-5 text-gray-400 mb-1" />
                    <span className="text-2xl font-black text-brand-black">{selectedCustomer.totalBookings}</span>
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide">Total Bookings</span>
                  </div>
                  <div className="bg-white border border-gray-100 shadow-sm p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-1">
                    <DollarSign className="h-5 w-5 text-gray-400 mb-1" />
                    <span className="text-xl font-black text-brand-black">{formatCurrency(selectedCustomer.totalSpent)}</span>
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide">Total Spent</span>
                  </div>
                  <div className="bg-white border border-gray-100 shadow-sm p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-1">
                    <Calendar className="h-5 w-5 text-gray-400 mb-1" />
                    <span className="text-[13px] font-bold text-brand-black mt-2 leading-tight">{selectedCustomer.lastBookingDate}</span>
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide mt-1">Last Booking</span>
                  </div>
                </div>

                {/* Booking History */}
                <div className="flex flex-col gap-4 z-10">
                  <h3 className="text-[12px] font-extrabold text-gray-400 uppercase tracking-wider">Booking History</h3>
                  <div className="flex flex-col gap-3">
                    {selectedCustomer.bookingsHistory.map((booking) => (
                      <div key={booking.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-[14px] text-brand-black group-hover:text-brand-primary transition-colors">{booking.service}</h4>
                          <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border shrink-0 ml-2", STATUS_STYLES[booking.status])}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[12px] text-gray-500 font-semibold mt-3 pt-3 border-t border-gray-50">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {booking.date}</span>
                          <Link href={`/admin/jobs/${booking.id}`} className="text-brand-primary hover:underline font-bold flex items-center gap-1">
                            View Job <Eye className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Panel Footer */}
              <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-20">
                <a 
                  href={`mailto:${selectedCustomer.email}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-full bg-white border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5 font-bold py-3 rounded-xl transition-colors"
                >
                  Send Email
                </a>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
