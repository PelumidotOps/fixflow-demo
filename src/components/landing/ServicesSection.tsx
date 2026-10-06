"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Wrench, 
  Flame, 
  Settings2, 
  CheckCircle2, 
  Wind, 
  ThermometerSun,
  ArrowRight
} from "lucide-react";

const SERVICES = [
  {
    id: "ac-repair",
    title: "AC Repair & Fix",
    description: "We diagnose and repair all makes and models of air conditioning units quickly and efficiently.",
    icon: Wrench,
  },
  {
    id: "heater-repair",
    title: "Heater Repair",
    description: "From faulty thermostats to full heating system failures, our technicians fix it right the first time.",
    icon: Flame,
  },
  {
    id: "new-installation",
    title: "New Installation",
    description: "Installing a new AC or heating system? We handle everything from sizing to setup.",
    icon: Settings2,
  },
  {
    id: "regular-tuneups",
    title: "Regular Tune-Ups",
    description: "Keep your system running efficiently with scheduled maintenance visits.",
    icon: CheckCircle2,
  },
  {
    id: "air-duct",
    title: "Air Duct Cleaning",
    description: "Improve air quality and system performance with professional duct cleaning.",
    icon: Wind,
  },
  {
    id: "heat-pump",
    title: "Heat Pump Service",
    description: "Expert installation, repair, and maintenance for all heat pump systems.",
    icon: ThermometerSun,
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-brand-surface relative">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header Split Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            {/* Pill Label */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 text-brand-primary px-4 py-2 mb-6">
              <Settings2 className="h-4 w-4" />
              <span className="text-sm font-medium tracking-wide">Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black leading-tight max-w-[600px]">
              Comprehensive Air Conditioning & Heating Care
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 lg:max-w-[450px]"
          >
            <p className="text-brand-text-secondary text-[16px] leading-relaxed mt-2 lg:mt-12">
              We offer a full range of HVAC services to keep your home and business comfortable year round. From immediate fixes to long-term maintenance, our team is equipped.
            </p>
          </motion.div>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col justify-between bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 min-h-[260px] relative"
              >
                {/* Icon top right */}
                <div className="absolute top-8 right-8 flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary/10 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-brand-black mb-4 pr-14 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-brand-text-secondary leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Link 
                    href={`/book?service=${service.id}`}
                    className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-200 text-brand-black transition-all group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:text-white"
                  >
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
