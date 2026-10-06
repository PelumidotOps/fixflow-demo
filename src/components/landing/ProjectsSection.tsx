"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Grid2X2, ArrowRight } from "lucide-react";

export function ProjectsSection() {
  const projects = [
    {
      id: "proj-1",
      title: "3-Bedroom Home AC Installation",
      description: "Full system replacement with high-efficiency split AC units.",
      image: "/images/project-1.png",
    },
    {
      id: "proj-2",
      title: "Restaurant Kitchen Ventilation",
      description: "Custom stainless steel hood design and ventilation logic.",
      image: "/images/project-2.png",
    },
    {
      id: "proj-3",
      title: "Office Building HVAC Upgrade",
      description: "Scalable commercial multi-zone climate implementation.",
      image: "/images/project-3.png",
    },
    {
      id: "proj-4",
      title: "Smart Home Climate Control",
      description: "Thermostat integration for entire home automated heating.",
      image: "/images/project-4.png",
    }
  ];

  return (
    <section id="projects" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            {/* Pill Label */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 text-brand-primary px-4 py-2 mb-6">
              <Grid2X2 className="h-4 w-4" />
              <span className="text-sm font-medium tracking-wide">Our Project</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-tight max-w-[500px]">
              See Our Professional HVAC Work in Action
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex flex-col lg:items-end gap-6"
          >
            <p className="text-brand-text-secondary text-[16px] leading-relaxed lg:max-w-[400px] lg:text-right">
              Real jobs completed for real customers across residential homes and commercial businesses.
            </p>
            <Link
              href="/#projects"
              className="inline-flex h-11 items-center justify-center rounded-full bg-brand-primary px-8 text-sm font-semibold text-white transition-all hover:bg-brand-primary-dark hover:scale-105 shadow-sm"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-[32px] overflow-hidden bg-gray-100 aspect-[4/3] sm:aspect-video md:aspect-[4/3] flex items-end shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Full Bleed Image */}
              <Image 
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Bottom White Label */}
              <div className="relative z-10 m-4 sm:m-6 mt-auto bg-white rounded-2xl p-6 sm:p-8 w-[90%] sm:w-[85%] border border-gray-100 shadow-lg transform transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-brand-black mb-2">{project.title}</h3>
                <p className="text-brand-text-secondary text-sm sm:text-[15px] leading-relaxed pr-12 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Arrow Button overlaid on card edge */}
                <Link
                  href="/book" aria-label={`Request a service like ${project.title}`}
                  className="absolute -right-4 -bottom-4 sm:bottom-6 sm:right-6 flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary text-white shadow-md transition-transform duration-300 hover:scale-110"
                >
                  <ArrowRight className="h-5 w-5 -rotate-45" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
