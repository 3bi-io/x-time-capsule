import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import VerificationStep from "./verification/VerificationStep";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { FileUploadZone } from "./vault/FileUploadZone";
import { verificationRequestSchema, type VerificationRequestInput } from "@/lib/validationSchemas";
import { VERIFICATION_STEPS } from "@/data/constants";

const VerificationProcess = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [documentUrl, setDocumentUrl] = useState<string>("");
  const [formData, setFormData] = useState<VerificationRequestInput>({
    fullName: "",
    requesterEmail: user?.email || "",
    vaultOwnerEmail: "",
    phoneNumber: "",
    relationship: "",
  });

  const handleSubmit = async () => {
    if (step < 3) {
      if (step === 1 && !user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to continue with your verification request.",
          variant: "destructive",
        });
        return;
      }
      setStep(step + 1);
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit your verification request.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const validated = verificationRequestSchema.parse(formData);

      const { error } = await supabase
        .from('verification_requests')
        .insert({
          user_id: user.id,
          full_name: validated.fullName,
          requester_email: validated.requesterEmail,
          vault_owner_email: validated.vaultOwnerEmail,
          phone_number: validated.phoneNumber || null,
          relationship: validated.relationship,
          document_url: documentUrl || null,
          status: 'pending',
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Verification request submitted. We'll review it within 24-48 hours.",
      });

      // Reset form
      setFormData({
        fullName: "",
        requesterEmail: user?.email || "",
        vaultOwnerEmail: "",
        phoneNumber: "",
        relationship: "",
      });
      setDocumentUrl("");
      setStep(1);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit verification request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Access Verification Process</h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto px-4">
            To access a Time Capsule, we require proper documentation and verification to ensure 
            the security and privacy of the stored information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Steps Overview */}
          <div className="space-y-3 sm:space-y-4">
            {VERIFICATION_STEPS.map((verificationStep) => (
              <VerificationStep
                key={verificationStep.stepNumber}
                stepNumber={verificationStep.stepNumber}
                title={verificationStep.title}
                description={verificationStep.description}
                currentStep={step}
                isCompleted={step > verificationStep.stepNumber}
              />
            ))}
          </div>

          {/* Verification Form */}
          <Card>
            <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
              {step === 1 && (
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-sm">Full Legal Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="John Smith"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm">Your Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.requesterEmail}
                      onChange={(e) => setFormData({ ...formData, requesterEmail: e.target.value })}
                      placeholder="john@example.com"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vaultOwner" className="text-sm">Vault Owner's Email</Label>
                    <Input
                      id="vaultOwner"
                      type="email"
                      value={formData.vaultOwnerEmail}
                      onChange={(e) => setFormData({ ...formData, vaultOwnerEmail: e.target.value })}
                      placeholder="owner@example.com"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="relationship" className="text-sm">Relationship to Vault Owner</Label>
                    <Input
                      id="relationship"
                      value={formData.relationship}
                      onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                      placeholder="e.g., Spouse, Child, Parent"
                      required
                      className="mt-1"
                    />
                  </div>
                  <Button onClick={handleSubmit} className="w-full text-sm sm:text-base">
                    Continue to Document Upload
                  </Button>
                </div>
              )}

              {step === 2 && user && (
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                    Upload a government-issued ID (Driver's License, Passport, etc.)
                  </p>
                  <FileUploadZone
                    userId={user.id}
                    onFileUploaded={(url, fileName) => {
                      setDocumentUrl(url);
                      toast({
                        title: "File uploaded",
                        description: fileName,
                      });
                    }}
                    accept=".pdf,.jpg,.jpeg,.png"
                    maxSizeMB={10}
                  />
                  <Button onClick={handleSubmit} className="w-full text-sm sm:text-base" disabled={!documentUrl}>
                    Continue to Review
                  </Button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 text-center">
                    <Check className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-blue-600" />
                    <h3 className="font-semibold text-base sm:text-lg mb-2">Ready to Submit</h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Review your information and click Submit to send your verification request.
                      Our team will review within 24-48 hours.
                    </p>
                  </div>
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between p-2 sm:p-3 bg-slate-50 rounded">
                      <span className="text-slate-600">Name</span>
                      <span className="font-medium truncate ml-2">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between p-2 sm:p-3 bg-slate-50 rounded">
                      <span className="text-slate-600">Email</span>
                      <span className="font-medium truncate ml-2">{formData.requesterEmail}</span>
                    </div>
                    <div className="flex justify-between p-2 sm:p-3 bg-slate-50 rounded">
                      <span className="text-slate-600">Relationship</span>
                      <span className="font-medium truncate ml-2">{formData.relationship}</span>
                    </div>
                    <div className="flex justify-between p-2 sm:p-3 bg-slate-50 rounded">
                      <span className="text-slate-600">Document</span>
                      <span className="font-medium">{documentUrl ? "Uploaded" : "Not uploaded"}</span>
                    </div>
                  </div>
                  <Button onClick={handleSubmit} className="w-full text-sm sm:text-base" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Verification Request"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VerificationProcess;
