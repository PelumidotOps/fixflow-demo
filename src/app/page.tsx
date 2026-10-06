import { DemoBar } from "@/components/DemoBar";
import { PitchSections } from "@/components/landing/PitchSections";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { AboutSection } from "@/components/landing/AboutSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { WhyChooseUs } from "@/components/landing/WhyChooseUs";
import { ProjectsSection } from "@/components/landing/ProjectsSection";
import { ServiceArea } from "@/components/landing/ServiceArea";
import { Testimonials } from "@/components/landing/Testimonials";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { BlogSection } from "@/components/landing/BlogSection";
import { ContactStrip } from "@/components/landing/ContactStrip";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="relative flex w-full flex-col overflow-hidden bg-brand-surface">
      <Navbar />
      <Hero />
      <DemoBar />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUs />
      <ProjectsSection />
      <ServiceArea />
      <Testimonials />
      <CtaBanner />
      <BlogSection />
      <PitchSections />
      <ContactStrip />
      <Footer />
    </main>
  );
}
