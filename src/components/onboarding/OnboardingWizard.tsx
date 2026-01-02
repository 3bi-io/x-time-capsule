import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  FileText, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Lock,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  onAddVaultItem: () => void;
  onInviteFamily: () => void;
}

const steps = [
  {
    id: "welcome",
    title: "Welcome to Time Capsule",
    subtitle: "Your secure digital legacy platform",
    icon: Sparkles,
    color: "bg-primary text-primary-foreground",
  },
  {
    id: "security",
    title: "Bank-Level Security",
    subtitle: "Your data is protected with industry-leading encryption",
    icon: Lock,
    color: "bg-emerald-500 text-white",
  },
  {
    id: "vault",
    title: "Create Your First Vault Item",
    subtitle: "Store important documents, messages, and information",
    icon: FileText,
    color: "bg-blue-500 text-white",
  },
  {
    id: "family",
    title: "Invite Family Members",
    subtitle: "Grant trusted people access to your legacy",
    icon: Users,
    color: "bg-purple-500 text-white",
  },
  {
    id: "complete",
    title: "You're All Set!",
    subtitle: "Start building your digital legacy today",
    icon: CheckCircle,
    color: "bg-green-500 text-white",
  },
];

const OnboardingWizard = ({ 
  isOpen, 
  onClose, 
  onComplete, 
  onAddVaultItem, 
  onInviteFamily 
}: OnboardingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const progress = ((currentStep + 1) / steps.length) * 100;
  const step = steps[currentStep];
  const StepIcon = step.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  const handleAddVaultItem = () => {
    onAddVaultItem();
    handleNext();
  };

  const handleInviteFamily = () => {
    onInviteFamily();
    handleNext();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        {/* Progress bar */}
        <div className="px-6 pt-6">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2 text-right">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className={cn("w-20 h-20 rounded-full flex items-center justify-center", step.color)}>
              <StepIcon className="h-10 w-10" />
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
            <p className="text-muted-foreground">{step.subtitle}</p>
          </div>

          {/* Step-specific content */}
          {step.id === "welcome" && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Secure Storage</p>
                  <p className="text-xs text-muted-foreground">Store important documents and messages safely</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Family Access</p>
                  <p className="text-xs text-muted-foreground">Grant access to trusted family members</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Heart className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Peace of Mind</p>
                  <p className="text-xs text-muted-foreground">Know your legacy is protected</p>
                </div>
              </div>
            </div>
          )}

          {step.id === "security" && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium">256-bit AES Encryption</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  All your data is encrypted before storage
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium">Multi-Factor Authentication</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Additional security layers protect your account
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium">Verified Access Only</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Death certificate verification required for access
                </p>
              </div>
            </div>
          )}

          {step.id === "vault" && (
            <div className="space-y-4">
              <p className="text-sm text-center text-muted-foreground mb-4">
                Add your first vault item to get started. You can store:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border bg-card text-center">
                  <FileText className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <p className="text-xs font-medium">Legal Documents</p>
                </div>
                <div className="p-3 rounded-lg border bg-card text-center">
                  <Lock className="h-6 w-6 mx-auto mb-2 text-emerald-500" />
                  <p className="text-xs font-medium">Financial Info</p>
                </div>
                <div className="p-3 rounded-lg border bg-card text-center">
                  <Heart className="h-6 w-6 mx-auto mb-2 text-rose-500" />
                  <p className="text-xs font-medium">Personal Messages</p>
                </div>
                <div className="p-3 rounded-lg border bg-card text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                  <p className="text-xs font-medium">Important Contacts</p>
                </div>
              </div>
              <Button 
                className="w-full mt-4" 
                onClick={handleAddVaultItem}
              >
                <FileText className="h-4 w-4 mr-2" />
                Add Your First Item
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-muted-foreground" 
                onClick={handleNext}
              >
                Skip for now
              </Button>
            </div>
          )}

          {step.id === "family" && (
            <div className="space-y-4">
              <p className="text-sm text-center text-muted-foreground mb-4">
                Invite trusted family members who can access your vault when needed.
              </p>
              <div className="p-4 rounded-lg border bg-card">
                <h4 className="font-medium text-sm mb-2">Access Levels</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-xs"><strong>Limited:</strong> View only access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-xs"><strong>Full:</strong> View and edit access</span>
                  </div>
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={handleInviteFamily}
              >
                <Users className="h-4 w-4 mr-2" />
                Invite Family Member
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-muted-foreground" 
                onClick={handleNext}
              >
                Skip for now
              </Button>
            </div>
          )}

          {step.id === "complete" && (
            <div className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">
                You're ready to start using Time Capsule! Here's what you can do:
              </p>
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 p-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Add more vault items any time</span>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Invite additional family members</span>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Set unlock dates for time-locked content</span>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Manage your settings and preferences</span>
                </div>
              </div>
              <Button 
                className="w-full mt-4" 
                size="lg"
                onClick={handleComplete}
              >
                Get Started
                <Sparkles className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="px-6 pb-6 flex justify-between">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={cn(currentStep === 0 && "invisible")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          {step.id !== "vault" && step.id !== "family" && step.id !== "complete" && (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingWizard;
