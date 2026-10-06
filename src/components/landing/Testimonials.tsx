"use client";

import { motion } from "framer-motion";
import { MessageSquare, Star } from "lucide-react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Jerome Bell",
    area: "Riverside District",
    image: "/images/avatar-1.png",
    quote: "Michael and his team installed a new Carrier system for us in two days, reducing our energy bills by 35% in the first month. Professional, clean and knowledgeable. Highly recommend.",
    rating: 5,
  },
  {
    id: 2,
    name: "Eleanor Pena",
    area: "Downtown Area",
    image: "/images/avatar-2.png",
    quote: "Michael and his team installed a new Carrier system for us in two days, reducing our energy bills by 35% in the first month. Professional, clean and knowledgeable. Highly recommend.",
    rating: 5,
  },
  {
    id: 3,
    name: "Robert Fox",
    area: "Oakwood Business Park",
    image: "/images/avatar-3.png",
    quote: "Michael and his team installed a new Carrier system for us in two days, reducing our energy bills by 35% in the first month. Professional, clean and knowledgeable. Highly recommend.",
    rating: 5,
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-white relative">
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
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm font-medium tracking-wide">Testimonial</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-tight mb-6">
            Success Stories from Happy Homeowners
          </h2>
          <p className="text-brand-text-secondary text-[16px] leading-relaxed">
            Don't just take our word for it. Read what your neighbors have to say about the quality, speed, and reliability of our HVAC services.
          </p>
        </motion.div>

        {/* Carousel Grid (simplified for now to match exactly 3 cards on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-primary/5 rounded-[32px] p-8 lg:p-10 flex flex-col justify-between items-start"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              
              <p className="text-brand-black text-[15px] font-medium leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image 
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-brand-black text-[15px]">{testimonial.name}</span>
                  <span className="text-brand-text-secondary text-sm">{testimonial.area}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots (Visual only for now since it exactly fits 3 desktop) */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <div className="w-8 h-2 rounded-full bg-brand-primary"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200 hover:bg-brand-primary/50 cursor-pointer transition-colors"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200 hover:bg-brand-primary/50 cursor-pointer transition-colors"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200 hover:bg-brand-primary/50 cursor-pointer transition-colors"></div>
        </div>

      </div>
    </section>
  );
}
