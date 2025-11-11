import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield, Globe, Lock, FileCheck, Award } from "lucide-react";
import { pageSEO, organizationSchema } from "@/utils/seoConfig";

const Compliance = () => {
  const certifications = [
    {
      icon: Shield,
      title: "SOC 2 Type II Certified",
      description: "Annual third-party audits verify our security, availability, and confidentiality controls",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Globe,
      title: "GDPR Compliant",
      description: "Full compliance with European data protection regulations including data subject rights",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Lock,
      title: "CCPA Compliant",
      description: "California Consumer Privacy Act compliance with transparent data practices",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: FileCheck,
      title: "HIPAA Ready",
      description: "Infrastructure and processes suitable for protected health information",
      color: "bg-red-100 text-red-600"
    }
  ];

  const standards = [
    {
      category: "Data Protection",
      items: [
        "AES-256 encryption for data at rest",
        "TLS 1.3 encryption for data in transit",
        "Regular penetration testing and security audits",
        "Zero-knowledge architecture where applicable",
        "Secure key management and rotation",
        "Geographic data residency options"
      ]
    },
    {
      category: "Access Controls",
      items: [
        "Multi-factor authentication (MFA) available",
        "Role-based access control (RBAC)",
        "Principle of least privilege enforcement",
        "Comprehensive audit logging",
        "Session management and timeout policies",
        "IP allowlisting and geo-restrictions"
      ]
    },
    {
      category: "Infrastructure Security",
      items: [
        "SOC 2 compliant data centers",
        "24/7 security monitoring and incident response",
        "DDoS protection and mitigation",
        "Redundant systems and failover capabilities",
        "Regular backup and disaster recovery testing",
        "Physical security controls at facilities"
      ]
    },
    {
      category: "Privacy & Data Rights",
      items: [
        "Right to access your personal data",
        "Right to data portability and export",
        "Right to deletion and data erasure",
        "Right to rectification of inaccurate data",
        "Right to object to data processing",
        "Right to restrict processing"
      ]
    },
    {
      category: "Operational Security",
      items: [
        "Employee background checks and NDA agreements",
        "Security awareness training programs",
        "Incident response and breach notification procedures",
        "Regular security assessments and updates",
        "Vendor risk management program",
        "Change management and approval processes"
      ]
    },
    {
      category: "Legal & Regulatory",
      items: [
        "Data Processing Agreements (DPA) available",
        "Standard Contractual Clauses (SCC) for international transfers",
        "Business Associate Agreements (BAA) for HIPAA",
        "Transparent privacy policies and terms",
        "Regular legal and compliance reviews",
        "Data retention and deletion policies"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO {...pageSEO.compliance} />
      <StructuredData data={organizationSchema} />
      <Header />
      
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Compliance & Certifications</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade security and compliance standards to protect your most sensitive information
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Our Certifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`${cert.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <cert.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Security & Compliance Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standards.map((standard, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    {standard.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {standard.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Transparency Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                We believe in transparency. Our annual reports detail security incidents, data requests, and compliance metrics.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center pt-4">
                <div>
                  <p className="text-3xl font-bold text-primary">0</p>
                  <p className="text-sm text-muted-foreground">Data Breaches (2023)</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">99.9%</p>
                  <p className="text-sm text-muted-foreground">Uptime SLA</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">&lt;24h</p>
                  <p className="text-sm text-muted-foreground">Avg Incident Response</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Have Compliance Questions?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Our security and compliance team is here to help with your specific requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:compliance@timecapsule.com" className="text-primary font-medium hover:underline">
              compliance@timecapsule.com
            </a>
            <span className="hidden sm:inline text-muted-foreground">|</span>
            <a href="mailto:security@timecapsule.com" className="text-primary font-medium hover:underline">
              security@timecapsule.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Compliance;
