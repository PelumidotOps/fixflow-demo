import { ProgressBar } from "@/components/booking/ProgressBar";
import { CustomerForm } from "@/components/booking/CustomerForm";

export const metadata = {
  title: "Confirm Booking | FixFlow",
};

export default function BookStepThree() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 flex flex-col items-center">
      <div className="w-full max-w-[1100px]">
        <ProgressBar currentStep={3} />
        
        <div className="text-center mb-12 mt-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight mb-4">
            Tell us about yourself
          </h1>
          <p className="text-brand-text-secondary text-base lg:text-lg max-w-2xl mx-auto">
            Please provide your details below so our technicians know exactly where to go and how to best contact you.
          </p>
        </div>

        <CustomerForm />
      </div>
    </div>
  );
}
