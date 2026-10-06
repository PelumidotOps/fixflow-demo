export type TechStatus = "Available" | "Busy" | "Off Today";

export interface WorkingHour {
  day: string;
  start: string;
  end: string;
  isAvailable: boolean;
}

export interface WeeklyJob {
  id: string;
  day: string;
  time: string;
  customerName: string;
  duration: number; // in hours for width calculation
  colorClass: string;
}

export interface JobHistoryRecord {
  id: string;
  service: string;
  customerName: string;
  date: string;
  status: "Completed" | "Cancelled" | "In Progress";
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: TechStatus;
  specialties: string[];
  activeJobsCount: number;
  avatarUrl?: string;
  stats: {
    jobsCompletedMonth: number;
    avgRating: number;
    onTimePercentage: number;
    revenueMonth: string;
  };
  workingHours: WorkingHour[];
  weeklySchedule: WeeklyJob[];
  jobHistory: JobHistoryRecord[];
}

const defaultWorkingHours: WorkingHour[] = [
  { day: "Monday", start: "08:00 AM", end: "05:00 PM", isAvailable: true },
  { day: "Tuesday", start: "08:00 AM", end: "05:00 PM", isAvailable: true },
  { day: "Wednesday", start: "08:00 AM", end: "05:00 PM", isAvailable: true },
  { day: "Thursday", start: "08:00 AM", end: "05:00 PM", isAvailable: true },
  { day: "Friday", start: "08:00 AM", end: "05:00 PM", isAvailable: true },
  { day: "Saturday", start: "09:00 AM", end: "01:00 PM", isAvailable: false },
  { day: "Sunday", start: "Off", end: "Off", isAvailable: false },
];

export const MOCK_TECHNICIANS: Technician[] = [
  {
    id: "TECH-001",
    name: "Tom Harris",
    email: "t.harris@fixflow.com",
    phone: "(555) 123-4567",
    dateJoined: "Jan 12, 2024",
    status: "Busy",
    specialties: ["AC Repair", "New Installation", "Heat Pump Service"],
    activeJobsCount: 3,
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
    stats: { jobsCompletedMonth: 42, avgRating: 4.8, onTimePercentage: 96, revenueMonth: "$12,450" },
    workingHours: [...defaultWorkingHours],
    weeklySchedule: [
      { id: "J-101", day: "Monday", time: "09:00 AM", customerName: "Sarah Connor", duration: 2, colorClass: "bg-emerald-100 border-emerald-200 text-emerald-700" },
      { id: "J-102", day: "Tuesday", time: "01:00 PM", customerName: "Tony Stark", duration: 3, colorClass: "bg-blue-100 border-blue-200 text-blue-700" },
      { id: "J-103", day: "Thursday", time: "10:00 AM", customerName: "Bruce Wayne", duration: 1.5, colorClass: "bg-amber-100 border-amber-200 text-amber-700" }
    ],
    jobHistory: [
      { id: "JOB-1901", service: "AC Repair", customerName: "John Doe", date: "Apr 15, 2026", status: "Completed" },
      { id: "JOB-1902", service: "New Installation", customerName: "Jane Smith", date: "Apr 16, 2026", status: "Completed" },
      { id: "JOB-1903", service: "Heat Pump Service", customerName: "Bob Johnson", date: "Apr 17, 2026", status: "Completed" },
      { id: "JOB-1904", service: "AC Repair", customerName: "Alice Williams", date: "Apr 18, 2026", status: "Cancelled" },
    ]
  },
  {
    id: "TECH-002",
    name: "Sara King",
    email: "s.king@fixflow.com",
    phone: "(555) 987-6543",
    dateJoined: "Mar 05, 2024",
    status: "Available",
    specialties: ["Heater Repair", "Regular Tune-Up", "AC Repair"],
    activeJobsCount: 1,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    stats: { jobsCompletedMonth: 38, avgRating: 4.9, onTimePercentage: 98, revenueMonth: "$9,820" },
    workingHours: [...defaultWorkingHours],
    weeklySchedule: [
      { id: "J-201", day: "Wednesday", time: "11:30 AM", customerName: "Marcus Reid", duration: 1.5, colorClass: "bg-emerald-100 border-emerald-200 text-emerald-700" },
    ],
    jobHistory: [
      { id: "JOB-1850", service: "Regular Tune-Up", customerName: "Peter Parker", date: "Apr 14, 2026", status: "Completed" },
      { id: "JOB-1851", service: "Heater Repair", customerName: "Clark Kent", date: "Apr 15, 2026", status: "Completed" },
    ]
  },
  {
    id: "TECH-003",
    name: "Leo Martinez",
    email: "l.martinez@fixflow.com",
    phone: "(555) 456-7890",
    dateJoined: "Jun 20, 2025",
    status: "Busy",
    specialties: ["Air Duct Cleaning", "AC Repair"],
    activeJobsCount: 4,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    stats: { jobsCompletedMonth: 45, avgRating: 4.7, onTimePercentage: 92, revenueMonth: "$10,100" },
    workingHours: [...defaultWorkingHours],
    weeklySchedule: [
      { id: "J-301", day: "Monday", time: "08:00 AM", customerName: "David Bowman", duration: 4, colorClass: "bg-blue-100 border-blue-200 text-blue-700" },
      { id: "J-302", day: "Wednesday", time: "02:00 PM", customerName: "Diana Prince", duration: 2, colorClass: "bg-amber-100 border-amber-200 text-amber-700" }
    ],
    jobHistory: [
      { id: "JOB-1820", service: "Air Duct Cleaning", customerName: "Barry Allen", date: "Apr 10, 2026", status: "Completed" },
    ]
  },
  {
    id: "TECH-004",
    name: "Jessica Chen",
    email: "j.chen@fixflow.com",
    phone: "(555) 777-8888",
    dateJoined: "Nov 15, 2025",
    status: "Available",
    specialties: ["Heat Pump Service", "Heater Repair", "New Installation"],
    activeJobsCount: 0,
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
    stats: { jobsCompletedMonth: 28, avgRating: 5.0, onTimePercentage: 100, revenueMonth: "$15,200" },
    workingHours: [...defaultWorkingHours],
    weeklySchedule: [],
    jobHistory: [
      { id: "JOB-1790", service: "New Installation", customerName: "Hal Jordan", date: "Apr 05, 2026", status: "Completed" },
    ]
  },
  {
    id: "TECH-005",
    name: "Mike Johnson",
    email: "m.johnson@fixflow.com",
    phone: "(555) 222-3333",
    dateJoined: "Feb 01, 2026",
    status: "Off Today",
    specialties: ["AC Repair", "Regular Tune-Up"],
    activeJobsCount: 0,
    stats: { jobsCompletedMonth: 12, avgRating: 4.5, onTimePercentage: 90, revenueMonth: "$3,400" },
    workingHours: [...defaultWorkingHours],
    weeklySchedule: [
      { id: "J-501", day: "Friday", time: "10:00 AM", customerName: "Arthur Curry", duration: 2, colorClass: "bg-emerald-100 border-emerald-200 text-emerald-700" },
    ],
    jobHistory: [
      { id: "JOB-1750", service: "Regular Tune-Up", customerName: "Victor Stone", date: "Apr 02, 2026", status: "Completed" },
    ]
  }
];

export const STATUS_STYLES: Record<TechStatus, string> = {
  "Available": "bg-emerald-50 text-emerald-600 border-emerald-200",
  "Busy": "bg-amber-50 text-amber-600 border-amber-200",
  "Off Today": "bg-red-50 text-red-500 border-red-200",
};
