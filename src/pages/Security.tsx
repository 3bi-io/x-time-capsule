
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SecurityFeatures from "@/components/SecurityFeatures";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Server, Clock, Award } from "lucide-react";

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
      <Header />
      
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Bank-Level Security</h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Your family's most sensitive information deserves the highest level of protection. 
            Our security measures exceed industry standards.
          </p>
        </div>
      </section>

      <SecurityFeatures />

      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Security Principles</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Every decision we make prioritizes the security and privacy of your family's information.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {securityPrinciples.map((principle, index) => (
              <Card key={index} className="p-6">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <principle.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{principle.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Certifications & Compliance</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We maintain the highest industry standards and certifications to ensure your data is protected.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">
                  <Award className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">{cert.name}</h3>
                <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
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
