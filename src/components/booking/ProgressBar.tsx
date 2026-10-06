import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export function ProgressBar({ currentStep, totalSteps = 3 }: ProgressBarProps) {
  return (
    <div className="w-full flex justify-center py-6">
      <div className="w-full max-w-[280px] sm:max-w-md flex flex-col gap-2 relative mt-4">
        <span className="text-xs font-bold tracking-wider text-brand-primary uppercase absolute -top-6 left-1/2 -translate-x-1/2 w-max">
          Step {currentStep} of {totalSteps}
        </span>
        <div className="flex h-2.5 w-full gap-2 rounded-full overflow-hidden">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber <= currentStep;
            return (
              <div
                key={index}
                className={cn(
                  "h-full flex-1 transition-all duration-500 ease-out rounded-full",
                  isActive ? "bg-brand-primary" : "bg-gray-200"
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
