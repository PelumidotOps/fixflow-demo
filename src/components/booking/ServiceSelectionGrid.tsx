"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Wrench, 
  Flame, 
  Settings2, 
  CheckCircle2, 
  Wind, 
  ThermometerSun,
  ArrowRight
} from "lucide-react";
import { useBooking } from "./BookingContext";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    id: "ac-repair",
    title: "AC Repair & Fix",
    description: "We diagnose and repair all makes and models of air conditioning units quickly and efficiently.",
    icon: Wrench,
    duration: "1-2 hours",
    price: "From $89"
  },
  {
    id: "heater-repair",
    title: "Heater Repair",
    description: "From faulty thermostats to full heating system failures, our technicians fix it right the first time.",
    icon: Flame,
    duration: "1-2 hours",
    price: "From $89"
  },
  {
    id: "new-installation",
    title: "New Installation",
    description: "Installing a new AC or heating system? We handle everything from sizing to setup.",
    icon: Settings2,
    duration: "4-6 hours",
    price: "Custom Quote"
  },
  {
    id: "regular-tuneups",
    title: "Regular Tune-Ups",
    description: "Keep your system running efficiently with scheduled maintenance visits.",
    icon: CheckCircle2,
    duration: "1 hour",
    price: "From $69"
  },
  {
    id: "air-duct",
    title: "Air Duct Cleaning",
    description: "Improve air quality and system performance with professional duct cleaning.",
    icon: Wind,
    duration: "2-4 hours",
    price: "From $149"
  },
  {
    id: "heat-pump",
    title: "Heat Pump Service",
    description: "Expert installation, repair, and maintenance for all heat pump systems.",
    icon: ThermometerSun,
    duration: "2-3 hours",
    price: "From $99"
  }
];

export function ServiceSelectionGrid() {
  const router = useRouter();
  const { data, updateData } = useBooking();
  const [selectedId, setSelectedId] = useState<string | null>(data.serviceId || null);

  useEffect(()=>{const service=new URLSearchParams(window.location.search).get("service");if(service&&SERVICES.some(s=>s.id===service))setSelectedId(service);},[]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleNext = () => {
    if (selectedId) {
      updateData({ serviceId: selectedId });
      router.push(`/book/${selectedId}`);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {SERVICES.map((service, index) => {
          const Icon = service.icon;
          const isSelected = selectedId === service.id;
          
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => handleSelect(service.id)}
              className={cn(
                "group cursor-pointer flex flex-col justify-between bg-white p-8 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] transition-all duration-300 min-h-[260px] relative border-2",
                isSelected 
                  ? "border-brand-primary bg-brand-primary/[0.02] shadow-xl scale-[1.02]" 
                  : "border-transparent hover:border-gray-200 hover:shadow-xl hover:-translate-y-1"
              )}
            >
              {/* Icon top right */}
              <div className={cn(
                "absolute top-8 right-8 flex items-center justify-center h-12 w-12 rounded-full transition-colors duration-300",
                isSelected 
                  ? "bg-brand-primary text-white" 
                  : "bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white"
              )}>
                <Icon className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-brand-black mb-3 pr-14 leading-tight">
                  {service.title}
                </h3>
                {/* Duration and Price Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                   <span className="inline-flex items-center text-[11px] font-bold tracking-wide bg-gray-100 text-gray-500 px-2.5 py-1 rounded-md uppercase">
                     {service.duration}
                   </span>
                   <span className="inline-flex items-center text-[11px] font-bold tracking-wide bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded-md uppercase">
                     {service.price}
                   </span>
                </div>
                <p className="text-brand-text-secondary leading-relaxed text-[14.5px]">
                  {service.description}
                </p>
              </div>
              
              {/* Selection Indicator inside Card */}
              <div className="mt-8 flex justify-end">
                <div className={cn(
                  "flex items-center justify-center h-7 w-7 rounded-full border transition-all duration-300",
                  isSelected
                    ? "bg-brand-primary border-brand-primary text-white scale-110"
                    : "border-gray-300 text-transparent group-hover:border-brand-primary/50"
                )}>
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex justify-center border-t border-gray-200 pt-10 pb-16">
        <button
          onClick={handleNext}
          disabled={!selectedId}
          className={cn(
            "flex h-14 items-center justify-center rounded-full px-12 text-[15px] font-extrabold transition-all gap-2 w-full max-w-[340px] tracking-wide uppercase",
            selectedId 
              ? "bg-brand-primary text-white hover:bg-brand-primary-dark hover:scale-105 shadow-lg shadow-brand-primary/30 cursor-pointer" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          )}
        >
          Continue to Schedule
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
