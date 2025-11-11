import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VerificationProcess from "@/components/VerificationProcess";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, Phone } from "lucide-react";
import { pageSEO, organizationSchema } from "@/utils/seoConfig";

const EmergencyAccess = () => {
  return (
    <div className="min-h-screen">
      <SEO {...pageSEO.emergencyAccess} />
      <StructuredData data={organizationSchema} />
      <Header />
      
      <section className="bg-gradient-to-br from-red-50 to-orange-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="bg-red-100 p-3 sm:p-4 rounded-full">
              <AlertTriangle className="h-8 w-8 sm:h-10 lg:h-12 sm:w-10 lg:w-12 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">Emergency Access Request</h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            If you need immediate access to a Time Capsule due to a family emergency, 
            we're here to help you through the verification process.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <Card className="text-center p-4 sm:p-6 border-red-200">
              <div className="bg-red-100 p-3 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4">
                <Clock className="h-6 w-6 sm:h-10 sm:w-10 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">24-48 Hour Processing</h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Emergency requests are prioritized and processed within 24-48 hours
              </p>
            </Card>

            <Card className="text-center p-4 sm:p-6 border-red-200">
              <div className="bg-red-100 p-3 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4">
                <Phone className="h-6 w-6 sm:h-10 sm:w-10 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Direct Support</h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Our support team will contact you directly to assist with the process
              </p>
            </Card>

            <Card className="text-center p-4 sm:p-6 border-red-200">
              <div className="bg-red-100 p-3 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4">
                <AlertTriangle className="h-6 w-6 sm:h-10 sm:w-10 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Secure Verification</h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                All emergency requests still require proper documentation for security
              </p>
            </Card>
          </div>
        </div>
      </section>

      <VerificationProcess />

      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <Card className="p-4 sm:p-6 lg:p-8 border-red-200 bg-red-50">
            <CardHeader className="pb-4">
              <CardTitle className="text-red-800 flex items-center space-x-2 text-lg sm:text-xl">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                <span>Need Immediate Assistance?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-red-700 text-sm sm:text-base">
                  If this is a time-sensitive emergency and you need immediate assistance, 
                  please contact our emergency support line:
                </p>
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <p className="text-xl sm:text-2xl font-bold text-red-800 mb-2">1-800-TIME-911</p>
                  <p className="text-red-600 text-sm sm:text-base">Available 24/7 for emergency access requests</p>
                </div>
                <p className="text-xs sm:text-sm text-red-600">
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
