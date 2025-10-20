
import { CheckCircle } from "lucide-react";

interface VerificationStepProps {
  stepNumber: number;
  title: string;
  description: string;
  currentStep: number;
  isCompleted: boolean;
}

const VerificationStep = ({ 
  stepNumber, 
  title, 
  description, 
  currentStep, 
  isCompleted 
}: VerificationStepProps) => {
  const isActive = currentStep >= stepNumber;
  
  return (
    <div className={`p-3 sm:p-4 rounded-lg border-l-4 ${
      isActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50'
    }`}>
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <h4 className="font-medium text-sm sm:text-base">{stepNumber}. {title}</h4>
        {isCompleted && <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />}
      </div>
      <p className="text-xs sm:text-sm text-slate-600">{description}</p>
    </div>
  );
};

export default VerificationStep;
