"use client";

import { readBookings, saveBookings } from "@/lib/demo-bookings";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, MapPin, AlignLeft, CheckCircle2 } from "lucide-react";
import { useBooking } from "./BookingContext";
import { cn } from "@/lib/utils";

export function CustomerForm() {
  const router = useRouter();
  const { data, updateData } = useBooking();
  
  const [formData, setFormData] = useState({
    customerName: data.customerName || "",
    customerEmail: data.customerEmail || "",
    customerPhone: data.customerPhone || "",
    serviceAddress: data.serviceAddress || "",
    additionalNotes: data.additionalNotes || ""
  });

  useEffect(()=>{if(data.customerName)setFormData({customerName:data.customerName||"",customerEmail:data.customerEmail||"",customerPhone:data.customerPhone||"",serviceAddress:data.serviceAddress||"",additionalNotes:data.additionalNotes||""});},[data.customerName,data.customerEmail,data.customerPhone,data.serviceAddress,data.additionalNotes]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasSchedule = Boolean(data.serviceId && data.date && data.timeSlot);
  const isValid = hasSchedule && [formData.customerName,formData.customerEmail,formData.customerPhone,formData.serviceAddress].every(value=>value.trim());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && !isSubmitting) {
      setIsSubmitting(true);
      updateData(formData);
      
      const id="BK-"+Date.now().toString(36).toUpperCase();
      saveBookings([{id,customerName:formData.customerName,email:formData.customerEmail,phone:formData.customerPhone,address:formData.serviceAddress,service:(data.serviceId || "HVAC service").replaceAll("-"," "),preferredDate:data.date || "",preferredTime:data.timeSlot || "",status:"Pending",notes:formData.additionalNotes},...readBookings()]);
      sessionStorage.setItem("fixflow-last-booking",id);
      // Demo submission
      setTimeout(() => {
        router.push("/book/success");
      }, 800);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100">
      <p className="mb-6 rounded-xl bg-sky-50 p-4 text-sm text-sky-900">Use sample details. This request is saved on this device so you can review it in the admin demo.</p>
      {!hasSchedule && <a href="/book" className="block mb-6 text-sky-800 underline">Choose a service, date and time before submitting.</a>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:gap-8">
        
        {/* Name & Email */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="flex flex-col gap-3">
            <label htmlFor="customerName" className="text-[13px] font-extrabold text-brand-black tracking-wide uppercase">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-primary/60">
                <User className="h-5 w-5" />
              </div>
              <input
                id="customerName"
                name="customerName"
                type="text"
                required
                value={formData.customerName}
                onChange={handleChange}
                className="w-full h-[52px] pl-12 pr-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-0 focus:border-brand-primary transition-all text-[15px] font-medium"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="customerEmail" className="text-[13px] font-extrabold text-brand-black tracking-wide uppercase">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-primary/60">
                <Mail className="h-5 w-5" />
              </div>
              <input
                id="customerEmail"
                name="customerEmail"
                type="email"
                required
                value={formData.customerEmail}
                onChange={handleChange}
                className="w-full h-[52px] pl-12 pr-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-0 focus:border-brand-primary transition-all text-[15px] font-medium"
                placeholder="john@example.com"
              />
            </div>
          </div>
        </div>

        {/* Phone & Address */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="flex flex-col gap-3">
            <label htmlFor="customerPhone" className="text-[13px] font-extrabold text-brand-black tracking-wide uppercase">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-primary/60">
                <Phone className="h-5 w-5" />
              </div>
              <input
                id="customerPhone"
                name="customerPhone"
                type="tel"
                required
                value={formData.customerPhone}
                onChange={handleChange}
                className="w-full h-[52px] pl-12 pr-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-0 focus:border-brand-primary transition-all text-[15px] font-medium"
                placeholder="(555) 123-4567"
              />
            </div>
            <p className="text-[13px] text-gray-500 font-medium ml-1 flex items-center gap-2 mt-1">
               <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block shadow-sm" />
               Demo only: no email, WhatsApp message or technician is sent.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="serviceAddress" className="text-[13px] font-extrabold text-brand-black tracking-wide uppercase">Service Address</label>
            <div className="relative h-[80px]">
              <div className="absolute top-4 left-0 pl-4 flex pointer-events-none text-brand-primary/60">
                <MapPin className="h-5 w-5" />
              </div>
              <textarea
                id="serviceAddress"
                name="serviceAddress"
                required
                value={formData.serviceAddress}
                onChange={handleChange}
                className="w-full h-full p-4.5 pl-12 pr-4 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-0 focus:border-brand-primary transition-all text-[15px] font-medium resize-none"
                placeholder="123 Main St, City, State, ZIP"
              />
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="flex flex-col gap-3">
          <label htmlFor="additionalNotes" className="text-[13px] font-extrabold text-brand-black tracking-wide uppercase flex justify-between pr-2">
            <span>Additional Notes</span>
            <span className="text-gray-400 font-semibold normal-case tracking-normal">Optional</span>
          </label>
          <div className="relative">
            <div className="absolute top-4 left-0 pl-4 flex pointer-events-none text-brand-primary/60">
              <AlignLeft className="h-5 w-5" />
            </div>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              rows={3}
              value={formData.additionalNotes}
              onChange={handleChange}
              className="w-full p-4.5 pl-12 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-0 focus:border-brand-primary transition-all text-[15px] font-medium resize-y"
              placeholder="Any specific instructions on parking, gate codes, or issue details..."
            />
          </div>
        </div>

        {/* Submit Action */}
        <div className="flex justify-center mt-4 pt-10 border-t border-gray-100">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={cn(
              "flex h-14 items-center justify-center rounded-full px-12 text-[15px] font-extrabold transition-all gap-2 w-full max-w-[340px] tracking-wide uppercase",
              isValid 
                ? "bg-brand-primary text-white hover:bg-brand-primary-dark hover:scale-105 shadow-lg shadow-brand-primary/30 cursor-pointer" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed border-0"
            )}
          >
            {isSubmitting ? (
               <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
               <>
                 Confirm Booking
                 <CheckCircle2 className="h-5 w-5" />
               </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
