
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, CheckCircle, AlertCircle, FileText } from "lucide-react";

const VerificationProcess = () => {
  const [step, setStep] = useState(1);
  const [uploadStatus, setUploadStatus] = useState("pending");

  const handleFileUpload = () => {
    setUploadStatus("uploading");
    setTimeout(() => {
      setUploadStatus("uploaded");
      setStep(2);
    }, 2000);
  };

  return (
    <section className="py-16 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Access Verification Process</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            To access a Time Capsule, we require proper documentation and verification to ensure 
            the security and privacy of the stored information.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Steps Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <span>Verification Steps</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`p-4 rounded-lg border-l-4 ${step >= 1 ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">1. Identity Verification</h4>
                  {step > 1 && <CheckCircle className="h-5 w-5 text-emerald-600" />}
                </div>
                <p className="text-sm text-slate-600">Provide your relationship to the deceased and contact information</p>
              </div>

              <div className={`p-4 rounded-lg border-l-4 ${step >= 2 ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">2. Death Certificate Upload</h4>
                  {step > 2 && <CheckCircle className="h-5 w-5 text-emerald-600" />}
                </div>
                <p className="text-sm text-slate-600">Upload a certified copy of the death certificate</p>
              </div>

              <div className={`p-4 rounded-lg border-l-4 ${step >= 3 ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">3. Review & Approval</h4>
                  {step > 3 && <CheckCircle className="h-5 w-5 text-emerald-600" />}
                </div>
                <p className="text-sm text-slate-600">Our team reviews your request (typically 24-48 hours)</p>
              </div>

              <div className={`p-4 rounded-lg border-l-4 ${step >= 4 ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">4. Access Granted</h4>
                  {step > 4 && <CheckCircle className="h-5 w-5 text-emerald-600" />}
                </div>
                <p className="text-sm text-slate-600">Secure access to the Time Capsule contents</p>
              </div>
            </CardContent>
          </Card>

          {/* Verification Form */}
          <Card>
            <CardHeader>
              <CardTitle>Request Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Your Full Name</Label>
                    <Input id="fullName" placeholder="Enter your full legal name" />
                  </div>
                  
                  <div>
                    <Label htmlFor="relationship">Relationship to Deceased</Label>
                    <Input id="relationship" placeholder="e.g., Spouse, Child, Sibling" />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="(555) 123-4567" />
                  </div>
                  
                  <Button 
                    onClick={() => setStep(2)} 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Continue to Document Upload
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label>Death Certificate Upload</Label>
                    <div className="mt-2 border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                      {uploadStatus === "pending" && (
                        <>
                          <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-600 mb-4">
                            Upload a certified copy of the death certificate
                          </p>
                          <Button onClick={handleFileUpload} variant="outline">
                            Choose File
                          </Button>
                        </>
                      )}
                      
                      {uploadStatus === "uploading" && (
                        <>
                          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                          <p className="text-slate-600">Uploading document...</p>
                        </>
                      )}
                      
                      {uploadStatus === "uploaded" && (
                        <>
                          <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                          <p className="text-emerald-600 font-medium mb-2">Document uploaded successfully</p>
                          <div className="flex items-center justify-center space-x-2 text-slate-600">
                            <FileText className="h-4 w-4" />
                            <span>death_certificate.pdf</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {uploadStatus === "uploaded" && (
                    <Button 
                      onClick={() => setStep(3)} 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Submit for Review
                    </Button>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="text-center space-y-4">
                  <div className="bg-amber-50 p-6 rounded-lg">
                    <AlertCircle className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                    <h3 className="font-medium text-slate-900 mb-2">Under Review</h3>
                    <p className="text-slate-600">
                      Your request has been submitted and is currently under review. 
                      We'll contact you within 24-48 hours with an update.
                    </p>
                  </div>
                  <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50">
                    Review in Progress
                  </Badge>
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
