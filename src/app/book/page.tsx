import { ProgressBar } from "@/components/booking/ProgressBar";
import { ServiceSelectionGrid } from "@/components/booking/ServiceSelectionGrid";

export const metadata = {
  title: "Book Service | FixFlow",
};

export default function BookStepOne() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 flex flex-col items-center">
      <div className="w-full max-w-[1100px]">
        <ProgressBar currentStep={1} />
        
        <div className="text-center mb-12 mt-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight mb-4">
            What service do you need?
          </h1>
          <p className="text-brand-text-secondary text-base lg:text-lg max-w-2xl mx-auto">
            Select one of our professional HVAC services below to view availability and schedule your appointment instantly.
          </p>
        </div>

        <ServiceSelectionGrid />
      </div>
    </div>
  );
}
