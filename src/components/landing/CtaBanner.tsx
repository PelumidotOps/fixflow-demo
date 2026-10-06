"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function CtaBanner() {
  return (
    <section className="relative py-32 bg-gray-900 mt-24">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
         <Image 
           src="/images/cta-bg.png"
           alt="HVAC Technician working"
           fill
           className="object-cover object-center px-4 md:px-0"
         />
         <div className="absolute inset-0 bg-brand-black/70 mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-[32px] p-10 md:p-16 max-w-4xl mx-auto flex flex-col items-center text-center shadow-2xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-tight mb-6">
            Get Started With Professional HVAC Care
          </h2>
          <p className="text-brand-text-secondary text-[16px] md:text-lg leading-relaxed mb-8 max-w-2xl">
            Whether you need a quick repair or a full system installation, our team is ready to deliver fast, reliable, and affordable service to your doorstep.
          </p>
          <Link
            href="/book"
            className="inline-flex h-14 items-center justify-center rounded-full bg-brand-primary px-10 text-[16px] font-semibold text-white transition-all hover:bg-brand-primary-dark hover:scale-105 gap-2 shadow-lg shadow-brand-primary/30"
          >
            Schedule Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
