"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Fan, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Explore demo", href: "/demo" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-white/0 lg:bg-white/0" // The reference image shows navbar on top of the teal background, but actually it's a white pill shaped container? Let me re-examine.
      )}
      style={{
        // In the reference image, the navbar is actually a white rounded container floating at the top.
        paddingTop: "20px"
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between bg-white rounded-[100px] px-6 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-brand-primary">
              <Fan className="h-7 w-7" />
            </div>
            <span className="text-xl font-bold text-brand-black tracking-tight">FixFlow</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-brand-black transition-colors hover:text-brand-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/book"
              className="hidden lg:inline-flex h-11 items-center justify-center rounded-full bg-brand-primary px-8 text-[15px] font-semibold text-white transition-all hover:bg-brand-primary-dark hover:scale-105"
            >
              Book Now
            </Link>
            <button
              className="lg:hidden text-brand-black p-2"
              aria-label="Toggle navigation" aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-[80px] left-4 right-4 bg-white rounded-2xl p-4 shadow-xl lg:hidden flex flex-col gap-4 z-40">
          {NAV_LINKS.map((link) => (
             <Link
               key={link.label}
               href={link.href}
               onClick={() => setIsMobileMenuOpen(false)}
               className="text-[15px] font-medium text-brand-black hover:text-brand-primary p-2"
             >
               {link.label}
             </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex h-11 w-full items-center justify-center rounded-full bg-brand-primary px-8 text-[15px] font-semibold text-white"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
