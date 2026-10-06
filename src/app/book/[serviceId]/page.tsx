import { ProgressBar } from "@/components/booking/ProgressBar";
import { DateTimeSelection } from "@/components/booking/DateTimeSelection";

export const metadata = {
  title: "Select Date & Time | FixFlow",
};

export default function BookStepTwo() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 flex flex-col items-center">
      <div className="w-full max-w-[1100px]">
        <ProgressBar currentStep={2} />
        
        <div className="text-center mb-12 mt-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight mb-4">
            Choose your preferred date and time.
          </h1>
          <p className="text-brand-text-secondary text-base lg:text-lg max-w-2xl mx-auto">
            Select a convenient appointment window for our expert technicians to arrive at your location.
          </p>
        </div>

        <DateTimeSelection />
      </div>
    </div>
  );
}
