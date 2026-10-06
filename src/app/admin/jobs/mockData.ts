export type JobStatus = "Pending" | "Assigned" | "In Progress" | "Completed" | "Cancelled";

export interface JobTimelineEvent {
  status: JobStatus;
  updatedBy: string;
  timestamp: string;
}

export interface Job {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  assignedTechnician: string | null;
  scheduledDate: string;
  scheduledTime: string;
  status: JobStatus;
  adminNotes: string;
  technicianNotes?: string;
  photos?: string[];
  timeline: JobTimelineEvent[];
}

export const MOCK_JOBS: Job[] = [
  {
    id: "JOB-2051",
    customerName: "Sarah Connor",
    email: "s.connor@cyber.net",
    phone: "(555) 555-0199",
    address: "321 Cyber Blvd, Tech City, CA 94016",
    service: "New Installation",
    assignedTechnician: "Tom Harris",
    scheduledDate: "Apr 21, 2026",
    scheduledTime: "08:00 AM",
    status: "Completed",
    adminNotes: "VIP customer, ensure smooth installation.",
    technicianNotes: "Installation completed successfully. Customer was very happy with the quick service. Tested unit and it blows ice cold air.",
    photos: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400&h=300",
      "https://images.unsplash.com/photo-1590496739668-3e47d2f9281a?auto=format&fit=crop&q=80&w=400&h=300"
    ],
    timeline: [
      { status: "Pending", updatedBy: "System", timestamp: "Apr 18, 2026 09:12 AM" },
      { status: "Assigned", updatedBy: "Admin", timestamp: "Apr 18, 2026 10:30 AM" },
      { status: "In Progress", updatedBy: "Tom Harris", timestamp: "Apr 21, 2026 08:05 AM" },
      { status: "Completed", updatedBy: "Tom Harris", timestamp: "Apr 21, 2026 02:30 PM" }
    ]
  },
  {
    id: "JOB-2052",
    customerName: "Marcus Reid",
    email: "m.reid88@example.com",
    phone: "(555) 987-6543",
    address: "742 Evergreen Terrace, Springfield, IL 62704",
    service: "Regular Tune-Up",
    assignedTechnician: "Sara King",
    scheduledDate: "Apr 20, 2026",
    scheduledTime: "11:30 AM",
    status: "In Progress",
    adminNotes: "Customer requested a call 30 mins before arrival.",
    timeline: [
      { status: "Pending", updatedBy: "System", timestamp: "Apr 19, 2026 08:00 AM" },
      { status: "Assigned", updatedBy: "Admin", timestamp: "Apr 19, 2026 09:15 AM" },
      { status: "In Progress", updatedBy: "Sara King", timestamp: "Apr 20, 2026 11:45 AM" }
    ]
  },
  {
    id: "JOB-2053",
    customerName: "Bruce Wayne",
    email: "bwayne@wayneenterprises.com",
    phone: "(555) 193-9000",
    address: "1007 Mountain Drive, Gotham, NJ 07001",
    service: "AC Repair and Fix",
    assignedTechnician: "Leo Martinez",
    scheduledDate: "Apr 23, 2026",
    scheduledTime: "09:00 AM",
    status: "Assigned",
    adminNotes: "",
    timeline: [
      { status: "Pending", updatedBy: "System", timestamp: "Apr 20, 2026 10:00 AM" },
      { status: "Assigned", updatedBy: "Admin", timestamp: "Apr 20, 2026 02:00 PM" }
    ]
  },
  {
    id: "JOB-2054",
    customerName: "Diana Prince",
    email: "diana@themyscira.gov",
    phone: "(555) 777-1941",
    address: "1200 Embassy Row, Washington, DC 20008",
    service: "Heater Repair",
    assignedTechnician: null,
    scheduledDate: "Apr 24, 2026",
    scheduledTime: "03:30 PM",
    status: "Pending",
    adminNotes: "Needs immediate attention as weather is dropping.",
    timeline: [
      { status: "Pending", updatedBy: "System", timestamp: "Apr 21, 2026 08:30 AM" }
    ]
  },
  {
    id: "JOB-2055",
    customerName: "Tony Stark",
    email: "t.stark@starkindustries.com",
    phone: "(555) 300-2000",
    address: "10880 Malibu Point, Malibu, CA 90265",
    service: "Heat Pump Service",
    assignedTechnician: "Tom Harris",
    scheduledDate: "Apr 22, 2026",
    scheduledTime: "01:00 PM",
    status: "Cancelled",
    adminNotes: "Customer cancelled. Found alternative solution.",
    timeline: [
      { status: "Pending", updatedBy: "System", timestamp: "Apr 20, 2026 11:00 AM" },
      { status: "Assigned", updatedBy: "Admin", timestamp: "Apr 20, 2026 01:00 PM" },
      { status: "Cancelled", updatedBy: "Admin", timestamp: "Apr 21, 2026 09:00 AM" }
    ]
  },
  {
    id: "JOB-2056",
    customerName: "Eleanor Vance",
    email: "eleanor.v@example.com",
    phone: "(555) 123-4567",
    address: "1428 Elm Street, Springfield, IL 62701",
    service: "AC Repair and Fix",
    assignedTechnician: "Sara King",
    scheduledDate: "Apr 20, 2026",
    scheduledTime: "09:00 AM",
    status: "Completed",
    adminNotes: "",
    technicianNotes: "Replaced faulty capacitor and topped off refrigerant.",
    timeline: [
      { status: "Pending", updatedBy: "System", timestamp: "Apr 18, 2026 02:00 PM" },
      { status: "Assigned", updatedBy: "Admin", timestamp: "Apr 18, 2026 03:00 PM" },
      { status: "In Progress", updatedBy: "Sara King", timestamp: "Apr 20, 2026 09:10 AM" },
      { status: "Completed", updatedBy: "Sara King", timestamp: "Apr 20, 2026 11:00 AM" }
    ]
  },
  {
    id: "JOB-2057",
    customerName: "David Bowman",
    email: "d.bowman@discovery.org",
    phone: "(555) 201-1992",
    address: "2001 Space Way, Suite 400, Houston, TX 77058",
    service: "Air Duct Cleaning",
    assignedTechnician: "Leo Martinez",
    scheduledDate: "Apr 21, 2026",
    scheduledTime: "02:00 PM",
    status: "Assigned",
    adminNotes: "Office building. Park in rear.",
    timeline: [
      { status: "Pending", updatedBy: "System", timestamp: "Apr 19, 2026 04:00 PM" },
      { status: "Assigned", updatedBy: "Admin", timestamp: "Apr 20, 2026 10:00 AM" }
    ]
  },
  {
    id: "JOB-2058",
    customerName: "Ellen Ripley",
    email: "eripley@weyland.corp",
    phone: "(555) 426-0815",
    address: "LV-426 Colony Drive, Hadley's Hope, NV 89012",
    service: "Heater Repair",
    assignedTechnician: null,
    scheduledDate: "Apr 22, 2026",
    scheduledTime: "10:00 AM",
    status: "Pending",
    adminNotes: "Wait for customer outside gate.",
    timeline: [
      { status: "Pending", updatedBy: "System", timestamp: "Apr 20, 2026 05:00 PM" }
    ]
  }
];

export const STATUS_STYLES: Record<JobStatus, string> = {
  "Pending":     "bg-blue-50 text-blue-700 border-blue-200",
  "Assigned":    "bg-amber-50 text-amber-700 border-amber-200",
  "In Progress": "bg-orange-50 text-orange-700 border-orange-200",
  "Completed":   "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Cancelled":   "bg-red-50 text-red-600 border-red-200",
};
