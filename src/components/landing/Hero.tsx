"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Wrench, ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative w-full h-[85vh] min-h-[700px] flex items-center overflow-hidden bg-[#111]">
      {/* Thick Borders (Top and Right as seen in mockup) */}
      <div className="absolute top-0 right-0 h-full w-[20px] md:w-[40px] bg-brand-primary z-10" />
      <div className="absolute top-0 right-0 w-[40px] md:w-[150px] h-[20px] md:h-[40px] bg-brand-primary z-10" />
      
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0 mr-[20px] md:mr-[40px]">
        {/* Re-using cta-bg as a dark mechanic/technician working background for this specific hero reference */}
        <Image 
          src="/images/cta-bg.png" 
          alt="AC Repair Background" 
          fill 
          className="object-cover object-center opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-20 h-full flex items-center">
        
        {/* Vertical Pagination Element (Left edge) */}
        <div className="hidden lg:flex absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-30">
          <div className="h-16 w-[2px] bg-white/20" />
          <div className="w-5 h-5 rounded-full border-[2px] border-brand-primary flex items-center justify-center">
            <div className="w-2 h-2 bg-brand-primary rounded-full" />
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-white/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/80" />
          <div className="h-16 w-[2px] bg-white/20" />
        </div>

        {/* Glassmorphism Content Box */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative ml-0 lg:ml-16 bg-gradient-to-r from-black/60 to-black/30 backdrop-blur-md border border-white/10 rounded-xl p-8 md:p-12 lg:p-16 max-w-[650px]"
        >
          {/* Sparkles decoration inside/around box */}
          <Sparkles className="absolute -top-4 -right-4 text-brand-primary h-6 w-6 opacity-80" />
          <Sparkles className="absolute -bottom-8 left-12 text-brand-primary h-5 w-5 opacity-80" />

          {/* Subheading */}
          <div className="flex items-center gap-2 mb-4 text-white/90">
            <Wrench className="h-4 w-4" />
            <span className="text-sm font-semibold tracking-wider uppercase">
              Repairing Services
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white leading-[1.1] tracking-tight mb-6">
            Cooling expertise<br />you can trust
          </h1>

          {/* Description */}
          <p className="text-white/80 text-[15px] md:text-base leading-relaxed max-w-[500px] mb-8 font-light">
            A more comfortable home starts with reliable care. Choose your service, pick a convenient time, and request a visit in minutes.
          </p>

          {/* Call to Action Button */}
          <Link
            href="/book"
            className="inline-flex h-12 items-center justify-center rounded-md bg-brand-primary px-8 text-[14px] font-bold text-white transition-all hover:bg-brand-primary-dark gap-3 tracking-widest shadow-lg"
          >
           SCHEDULE NOW
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>


      </div>
    </section>
  );
}
