
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, Clock } from "lucide-react";

const SecurityFeatures = () => {
  const features = [
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description: "All data is encrypted with AES-256 encryption before storage, ensuring only authorized family members can access information.",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: Lock,
      title: "Multi-Factor Authentication",
      description: "Additional security layers including SMS verification, email confirmation, and biometric authentication options.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Eye,
      title: "Document Verification",
      description: "Death certificates are verified through official channels and cross-referenced with government databases.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Clock,
      title: "Access Logging",
      description: "Complete audit trail of all access attempts and document views, with notifications to designated family members.",
      color: "bg-amber-100 text-amber-600"
    }
  ];

  return (
    <section id="security" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Bank-Level Security</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Your family's most sensitive information deserves the highest level of protection. 
            Our security measures exceed industry standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 bg-slate-50 rounded-lg p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <p className="text-slate-600">Uptime Guarantee</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-slate-600">Security Monitoring</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">256-bit</div>
              <p className="text-slate-600">AES Encryption</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityFeatures;
