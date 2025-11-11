import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SecurityFeatures from "@/components/SecurityFeatures";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Server, Clock, Award } from "lucide-react";
import { pageSEO, organizationSchema } from "@/utils/seoConfig";

const Security = () => {
  const certifications = [
    { name: "SOC 2 Type II", status: "Certified" },
    { name: "ISO 27001", status: "Compliant" },
    { name: "GDPR", status: "Compliant" },
    { name: "CCPA", status: "Compliant" }
  ];

  const securityPrinciples = [
    {
      icon: Lock,
      title: "Zero-Knowledge Architecture",
      description: "We cannot access your data even if we wanted to. Your information is encrypted with keys only you control."
    },
    {
      icon: Eye,
      title: "Verified Access Only",
      description: "Access requires legal documentation and multi-step verification. No exceptions, no shortcuts."
    },
    {
      icon: Server,
      title: "Distributed Storage",
      description: "Your data is stored across multiple secure data centers with redundant backups and failover protection."
    },
    {
      icon: Clock,
      title: "Audit Trail",
      description: "Every access attempt is logged and monitored. You'll know exactly who accessed what and when."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO {...pageSEO.security} />
      <StructuredData data={organizationSchema} />
      <Header />
      
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="bg-blue-100 p-3 sm:p-4 rounded-full">
              <Shield className="h-8 w-8 sm:h-10 lg:h-12 sm:w-10 lg:w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">Bank-Level Security</h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Your family's most sensitive information deserves the highest level of protection. 
            Our security measures exceed industry standards.
          </p>
        </div>
      </section>

      <SecurityFeatures />

      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Our Security Principles</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              Every decision we make prioritizes the security and privacy of your family's information.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {securityPrinciples.map((principle, index) => (
              <Card key={index} className="p-4 sm:p-6">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-4 mb-3 sm:mb-4">
                    <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                      <principle.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">{principle.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-slate-600 text-sm sm:text-base">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Certifications & Compliance</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              We maintain the highest industry standards and certifications to ensure your data is protected.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center p-4 sm:p-6">
                <div className="flex justify-center mb-3 sm:mb-4">
                  <Award className="h-8 w-8 sm:h-10 lg:h-12 sm:w-10 lg:w-12 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">{cert.name}</h3>
                <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50 text-xs sm:text-sm">
                  {cert.status}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Security;
