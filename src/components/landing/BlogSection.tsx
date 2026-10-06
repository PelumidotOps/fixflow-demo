"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

const BLOGS = [
  {
    id: 1,
    title: "The Benefits of Smart Thermostat Technology",
    date: "August 15, 2026",
    excerpt: "Learn how upgrading to a smart thermostat can drastically reduce your monthly energy consumption and give you ultimate control.",
    image: "/images/blog-1.png",
  },
  {
    id: 2,
    title: "How to Lower Your Energy Bills This Summer",
    date: "July 28, 2026",
    excerpt: "Summer heat doesn't always have to mean skyrocketing electricity bills. Discover actionable tips to maintain comfort efficiently.",
    image: "/images/blog-1.png", // Re-using to mitigate rate limit
  },
  {
    id: 3,
    title: "The Complete Guide to HVAC Maintenance",
    date: "June 10, 2026",
    excerpt: "Preventative maintenance is the key to longevity for any heating or cooling system. Find out what you should be doing annually.",
    image: "/images/blog-1.png", // Re-using to mitigate rate limit
  }
];

export function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          {/* Pill Label */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 text-brand-primary px-4 py-2 mb-6">
            <BookOpen className="h-4 w-4" />
            <span className="text-sm font-medium tracking-wide">Blog</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-tight mb-6">
            Stay Informed With Our HVAC Blog
          </h2>
          <p className="text-brand-text-secondary text-[16px] leading-relaxed">
            Read our latest articles, guides, and tips on maintaining your climate control systems and optimizing energy efficiency.
          </p>
        </motion.div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOGS.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col bg-brand-surface rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                <Image 
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="inline-flex self-start px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-semibold mb-4">
                  {blog.date}
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-4 leading-snug group-hover:text-brand-primary transition-colors">
                  <Link href={`/guides/${blog.id}`}>{blog.title}</Link>
                </h3>
                <p className="text-brand-text-secondary text-[15px] leading-relaxed mb-6 flex-grow">
                  {blog.excerpt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
