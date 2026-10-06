"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export function ServiceArea() {
  return (
    <section id="service-area" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header Layout - Centered */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          {/* Pill Label */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 text-brand-primary px-4 py-2 mb-6">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium tracking-wide">Service Area</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-tight mb-6">
            Serving Communities Throughout the Greater Area
          </h2>
          <p className="text-brand-text-secondary text-[16px] leading-relaxed">
            We proudly serve homeowners and businesses across the metropolitan area and all surrounding communities. 
            If you are unsure whether we cover your area, give us a call.
          </p>
        </motion.div>

        {/* Map Embed */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-sm border border-gray-100 bg-gray-50 blur-0"
        >
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24056708688!2d106.74548366966606!3d-6.2297464971842885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x100c5e82dd4b820!2sJakarta%2C%20Indonesia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
             width="100%" 
             height="100%" 
             style={{ border: 0 }} 
             allowFullScreen={false} 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
             className="w-full h-full grayscale-[20%] contrast-125 opacity-90 transition-all hover:grayscale-0"
           ></iframe>
        </motion.div>

      </div>
    </section>
  );
}
