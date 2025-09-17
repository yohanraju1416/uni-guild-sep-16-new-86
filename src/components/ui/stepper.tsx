import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

interface StepProps {
  label: string;
  isActive: boolean;
  isCompleted: boolean;
  isLast: boolean;
  stepNumber: number;
}

const Step = ({ label, isActive, isCompleted, isLast, stepNumber }: StepProps) => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300",
            isCompleted
              ? "border-success bg-success text-success-foreground"
              : isActive
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted-foreground bg-background text-muted-foreground"
          )}
        >
          {isCompleted ? (
            <Check className="h-4 w-4" />
          ) : (
            <span className="text-sm font-medium">{stepNumber}</span>
          )}
        </div>
        <div
          className={cn(
            "mt-2 text-center text-xs font-medium transition-colors duration-300",
            isActive
              ? "text-primary"
              : isCompleted
              ? "text-success"
              : "text-muted-foreground"
          )}
        >
          {label}
        </div>
      </div>
      {!isLast && (
        <div
          className={cn(
            "mx-4 h-[2px] w-16 transition-colors duration-300",
            isCompleted ? "bg-success" : "bg-muted"
          )}
        />
      )}
    </div>
  );
};

export const Stepper = ({ steps, currentStep, className }: StepperProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <Step
            key={step}
            label={step}
            stepNumber={index + 1}
            isActive={index === currentStep}
            isCompleted={index < currentStep}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
};