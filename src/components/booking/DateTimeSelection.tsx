"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, ArrowRight } from "lucide-react";
import { useBooking } from "./BookingContext";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM"
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function DateTimeSelection() {
  const router = useRouter();
  const params=useParams<{serviceId:string}>();
  const { data, updateData } = useBooking();
  
  // State
  const [currentDate, setCurrentDate] = useState(data.date ? new Date(data.date) : new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(data.date ? new Date(data.date) : null);
  const [selectedTime, setSelectedTime] = useState<string | null>(data.timeSlot || null);

  useEffect(()=>{if(params.serviceId)updateData({serviceId:params.serviceId});},[params.serviceId]);

  useEffect(()=>{if(data.date){const date=new Date(data.date);setSelectedDate(date);setCurrentDate(date);}if(data.timeSlot)setSelectedTime(data.timeSlot);},[data.date,data.timeSlot]);

  const isPastTime=(time:string)=>{if(!selectedDate)return true;const slot=new Date(selectedDate);const match=time.match(/(\d+):(\d+)\s*(AM|PM)/)!;slot.setHours(Number(match[1])%12+(match[3]==="PM"?12:0),Number(match[2]),0,0);return slot<=new Date();};

  // Calendar logic
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDateSelect = (day: number) => {
    const selected = new Date(year, month, day);
    // Prevent selecting past dates (simple check)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected >= today) {
      setSelectedDate(selected);
      setSelectedTime(null); // Reset time when date changes
    }
  };

  const handleNext = () => {
    if (selectedDate && selectedTime && !isPastTime(selectedTime)) {
      updateData({ 
        date: selectedDate.toISOString(),
        timeSlot: selectedTime 
      });
      router.push("/book/confirm");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12">
        
        {/* Calendar Side */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-brand-black flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-brand-primary" />
              Select Date
            </h2>
            <div className="flex items-center gap-4 bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
              <button 
                aria-label="Previous month" onClick={prevMonth} 
                disabled={year === new Date().getFullYear() && month === new Date().getMonth()}
                className="text-gray-400 hover:text-brand-primary transition-colors disabled:opacity-50 disabled:hover:text-gray-400"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="font-semibold text-[15px] min-w-[120px] text-center text-brand-black">
                {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
              </span>
              <button aria-label="Next month" onClick={nextMonth} className="text-gray-400 hover:text-brand-primary transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {DAYS_OF_WEEK.map(day => (
              <div key={day} className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 flex-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-12 w-full" />
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateObj = new Date(year, month, day);
              const today = new Date();
              today.setHours(0,0,0,0);
              
              const isPast = dateObj < today;
              const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === month && selectedDate?.getFullYear() === year;
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

              return (
                <button
                  key={day}
                  disabled={isPast}
                  onClick={() => handleDateSelect(day)}
                  className={cn(
                    "h-12 w-full rounded-xl flex items-center justify-center text-[15px] font-medium transition-all group",
                    isPast ? "text-gray-300 cursor-not-allowed bg-gray-50/50" : 
                    isSelected ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20 scale-105" : 
                    "text-brand-black hover:bg-brand-primary/10 hover:text-brand-primary cursor-pointer",
                    isToday && !isSelected && "border-2 border-brand-primary/30 text-brand-primary font-bold"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots Side */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 flex flex-col h-full min-h-[400px]">
          <h2 className="text-xl font-bold text-brand-black flex items-center gap-2 mb-8">
            <Clock className="h-5 w-5 text-brand-primary" />
            Available Times
          </h2>

          {selectedDate ? (
            <div className="grid grid-cols-2 gap-3 content-start">
              {TIME_SLOTS.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    disabled={isPastTime(time)}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "disabled:opacity-30 disabled:cursor-not-allowed px-4 py-3.5 rounded-xl text-[14px] font-bold transition-all border-2",
                      isSelected
                        ? "bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-[1.02]"
                        : "bg-transparent border-gray-100 text-brand-black hover:border-brand-primary/30 hover:bg-brand-primary/5 hover:-translate-y-0.5"
                    )}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 opacity-80">
              <div className="w-20 h-20 rounded-full bg-brand-primary/5 flex items-center justify-center mb-6">
                <CalendarIcon className="h-10 w-10 text-brand-primary/40" />
              </div>
              <p className="text-brand-text-secondary text-[15px] font-medium leading-relaxed max-w-[200px]">
                Please select a date on the calendar first to view our available time slots.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Action Footer */}
      <div className="flex justify-center border-t border-gray-200 pt-10 pb-16">
        <button
          onClick={handleNext}
          disabled={!selectedDate || !selectedTime || isPastTime(selectedTime)}
          className={cn(
            "flex h-14 items-center justify-center rounded-full px-12 text-[15px] font-extrabold transition-all gap-2 w-full max-w-[340px] tracking-wide uppercase",
            (selectedDate && selectedTime)
              ? "bg-brand-primary text-white hover:bg-brand-primary-dark hover:scale-105 shadow-lg shadow-brand-primary/30 cursor-pointer" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          )}
        >
          Confirm Date & Time
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
