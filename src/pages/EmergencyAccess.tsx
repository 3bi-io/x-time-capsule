
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VerificationProcess from "@/components/VerificationProcess";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, Phone } from "lucide-react";

const EmergencyAccess = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="bg-gradient-to-br from-red-50 to-orange-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Emergency Access Request</h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            If you need immediate access to a Time Capsule due to a family emergency, 
            we're here to help you through the verification process.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center p-6 border-red-200">
              <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4">
                <Clock className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">24-48 Hour Processing</h3>
              <p className="text-slate-600 text-sm">
                Emergency requests are prioritized and processed within 24-48 hours
              </p>
            </Card>

            <Card className="text-center p-6 border-red-200">
              <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4">
                <Phone className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">Direct Support</h3>
              <p className="text-slate-600 text-sm">
                Our support team will contact you directly to assist with the process
              </p>
            </Card>

            <Card className="text-center p-6 border-red-200">
              <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4">
                <AlertTriangle className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">Secure Verification</h3>
              <p className="text-slate-600 text-sm">
                All emergency requests still require proper documentation for security
              </p>
            </Card>
          </div>
        </div>
      </section>

      <VerificationProcess />

      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center space-x-2">
                <Phone className="h-6 w-6" />
                <span>Need Immediate Assistance?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-red-700">
                  If this is a time-sensitive emergency and you need immediate assistance, 
                  please contact our emergency support line:
                </p>
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <p className="text-2xl font-bold text-red-800 mb-2">1-800-TIME-911</p>
                  <p className="text-red-600">Available 24/7 for emergency access requests</p>
                </div>
                <p className="text-sm text-red-600">
                  Please have the Time Capsule ID and your relationship to the deceased ready when you call.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EmergencyAccess;
