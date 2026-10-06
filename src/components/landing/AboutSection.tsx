"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Info, Clock, Calendar, BadgeCheck, ShieldCheck } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
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
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary-light/10 text-brand-primary px-4 py-2 mb-6">
              <Info className="h-4 w-4" />
              <span className="text-sm font-medium tracking-wide">About Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black leading-tight max-w-[600px]">
              Professional HVAC Experts You Can Depend On
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 lg:max-w-[500px]"
          >
            <p className="text-brand-text-secondary text-[16px] leading-relaxed mt-2 lg:mt-12">
              With over 15 years of industry experience, we understand that heating and cooling emergencies do not wait for business hours. We are committed to providing top-tier service across our community, treating every home with absolute respect and delivering lasting solutions.
            </p>
          </motion.div>
        </div>

        {/* Cards Below */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-stretch">
          
          {/* Left Card - White with Technician image */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden"
          >
            <div className="relative w-full sm:w-[45%] h-[250px] sm:h-auto shrink-0 bg-gray-50">
               <Image 
                  src="/images/about-tech.png"
                  alt="HVAC Technician"
                  fill
                  className="object-cover"
               />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center items-start">
              <h3 className="text-2xl font-bold text-brand-black mb-3">About FixFlow</h3>
              <p className="text-brand-text-secondary mb-8 leading-relaxed">
                We pride ourselves on hiring the best local technicians. Every team member is fully vetted, highly trained, and focused on genuine customer satisfaction.
              </p>
              <Link
                href="/#how-it-works"
                className="inline-flex h-11 items-center justify-center rounded-full bg-brand-primary px-8 text-sm font-semibold text-white transition-all hover:bg-brand-primary-dark hover:scale-105"
              >
                More About Us
              </Link>
            </div>
          </motion.div>

          {/* Right Card - Solid Teal */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-brand-primary rounded-3xl p-8 md:p-10 flex flex-col justify-center shadow-xl shadow-brand-primary/20"
          >
             <h3 className="text-[26px] font-bold text-white mb-8 leading-tight">
               Experience Convenience, Safety, and Expert Support
             </h3>
             <div className="flex flex-col gap-4">
               <div className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 backdrop-blur-md border border-white/5">
                 <Clock className="text-white h-5 w-5 shrink-0" />
                 <span className="text-white font-medium text-sm">24/7 Available</span>
               </div>
               <div className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 backdrop-blur-md border border-white/5">
                 <Calendar className="text-white h-5 w-5 shrink-0" />
                 <span className="text-white font-medium text-sm">Same-day service</span>
               </div>
               <div className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 backdrop-blur-md border border-white/5">
                 <BadgeCheck className="text-white h-5 w-5 shrink-0" />
                 <span className="text-white font-medium text-sm">Free estimates</span>
               </div>
               <div className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 backdrop-blur-md border border-white/5">
                 <ShieldCheck className="text-white h-5 w-5 shrink-0" />
                 <span className="text-white font-medium text-sm">Licensed and certified</span>
               </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
