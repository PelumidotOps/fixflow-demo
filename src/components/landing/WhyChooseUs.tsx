"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ThumbsUp, Star, DollarSign, ShieldCheck } from "lucide-react";

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-brand-black relative">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            {/* Pill Label */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 text-white px-4 py-2 mb-6 self-start backdrop-blur-sm">
              <ThumbsUp className="h-4 w-4" />
              <span className="text-sm font-medium tracking-wide">Why Choose Us</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              Quality Service That Speaks for Itself
            </h2>
            <p className="text-white/80 text-[16px] leading-relaxed mb-12 max-w-[500px]">
              We have built a strong reputation based on trust, reliability, and superior craftsmanship. 
              Our commitment ensures that when you hire FixFlow, you are getting the finest service available.
            </p>

            {/* Happy Customer Card */}
            <div className="relative w-full max-w-[450px] aspect-video sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                 src="/images/happy-customer.png"
                 alt="Happy Customer"
                 fill
                 className="object-cover"
              />
              
              {/* Trust Badge overlay */}
              <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3 bg-white rounded-full py-2.5 px-5 shadow-lg border border-gray-100">
                 <div className="flex -space-x-1">
                   <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center border-2 border-white text-brand-primary"><Star className="h-3 w-3 fill-current" /></div>
                   <div className="w-6 h-6 rounded-full bg-brand-primary/40 flex items-center justify-center border-2 border-white text-brand-primary"><Star className="h-3 w-3 fill-current" /></div>
                   <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center border-2 border-white text-white"><Star className="h-3 w-3 fill-current" /></div>
                 </div>
                 <span className="text-xs sm:text-sm font-semibold text-brand-black">Trusted By 500+ Partners</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stacked Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Card 1 - Teal */}
            <div className="bg-brand-primary rounded-3xl p-8 sm:p-10 shadow-lg border border-brand-primary-dark">
               <div className="flex flex-col sm:flex-row items-start gap-6">
                 <div className="flex items-center justify-center w-14 h-14 shrink-0 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-md">
                   <Star className="h-6 w-6 fill-current" />
                 </div>
                 <div>
                   <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Licensed Insured Technicians</h3>
                   <p className="text-white/90 leading-relaxed text-[15px]">
                     All our technicians are fully licensed, insured, and background checked for your peace of mind.
                   </p>
                 </div>
               </div>
            </div>

            {/* Card 2 - White */}
            <div className="bg-brand-surface rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
               <div className="flex flex-col sm:flex-row items-start gap-6">
                 <div className="flex items-center justify-center w-14 h-14 shrink-0 rounded-full bg-brand-black text-white">
                   <DollarSign className="h-6 w-6" />
                 </div>
                 <div>
                   <h3 className="text-xl sm:text-2xl font-bold text-brand-black mb-3">Transparent Fair Pricing</h3>
                   <p className="text-brand-text-secondary leading-relaxed text-[15px]">
                     No hidden fees or surprise charges. You receive a clear quote before any work begins.
                   </p>
                 </div>
               </div>
            </div>

            {/* Card 3 - White */}
            <div className="bg-brand-surface rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
               <div className="flex flex-col sm:flex-row items-start gap-6">
                 <div className="flex items-center justify-center w-14 h-14 shrink-0 rounded-full bg-brand-black text-white">
                   <ShieldCheck className="h-6 w-6" />
                 </div>
                 <div>
                   <h3 className="text-xl sm:text-2xl font-bold text-brand-black mb-3">100% Satisfaction Guarantee</h3>
                   <p className="text-brand-text-secondary leading-relaxed text-[15px]">
                     We do not leave until the job is done right. Your satisfaction is our absolute guarantee.
                   </p>
                 </div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
