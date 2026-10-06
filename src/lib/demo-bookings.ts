export type DemoBooking={id:string;customerName:string;email:string;phone:string;address:string;service:string;preferredDate:string;preferredTime:string;status:"Pending"|"Confirmed"|"Cancelled"|"Rescheduled";notes:string};
export const BOOKING_KEY="fixflow-demo-bookings-v1";
export function readBookings():DemoBooking[]{try{const value=JSON.parse(localStorage.getItem(BOOKING_KEY)||"[]");return Array.isArray(value)?value:[]}catch{return []}}
export function saveBookings(value:DemoBooking[]){localStorage.setItem(BOOKING_KEY,JSON.stringify(value));window.dispatchEvent(new Event("fixflow-bookings"))}
