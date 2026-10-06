export type DemoBooking={id:string;customerName:string;email:string;phone:string;address:string;service:string;preferredDate:string;preferredTime:string;status:"Pending"|"Confirmed"|"Cancelled"|"Rescheduled";notes:string};
export function serviceName(id:string){const names:Record<string,string>={"ac repair":"AC Repair and Fix","heater repair":"Heater Repair","new installation":"New Installation","regular tuneups":"Regular Tune-Up","air duct":"Air Duct Cleaning","heat pump":"Heat Pump Service"};return names[id.replaceAll("-"," ").toLowerCase()]||id;}
export const BOOKING_KEY="fixflow-demo-bookings-v1";
export function readBookings():DemoBooking[]{try{const value=JSON.parse(localStorage.getItem(BOOKING_KEY)||"[]");return Array.isArray(value)?value.map(b=>({...b,service:serviceName(b.service||"")})):[]}catch{return []}}
export function saveBookings(value:DemoBooking[]){localStorage.setItem(BOOKING_KEY,JSON.stringify(value));window.dispatchEvent(new Event("fixflow-bookings"))}
