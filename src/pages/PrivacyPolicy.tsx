import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { pageSEO, organizationSchema } from "@/utils/seoConfig";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        "Personal information you provide (name, email, phone number)",
        "Account credentials and authentication data",
        "Vault contents and digital legacy information",
        "Family member information you designate",
        "Payment and billing information",
        "Usage data and analytics",
        "Device and browser information"
      ]
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "Provide and maintain our services",
        "Process verification requests",
        "Communicate with you about your account",
        "Improve our services and user experience",
        "Ensure security and prevent fraud",
        "Comply with legal obligations",
        "Send important notifications and updates"
      ]
    },
    {
      title: "3. Data Storage and Security",
      content: [
        "All data is encrypted using AES-256 encryption",
        "Secure data centers with physical security measures",
        "Regular security audits and penetration testing",
        "Multi-factor authentication options",
        "Encrypted backups and disaster recovery",
        "GDPR and CCPA compliant data handling",
        "Employee access strictly controlled and monitored"
      ]
    },
    {
      title: "4. Data Sharing and Disclosure",
      content: [
        "We do not sell your personal information",
        "Data shared only with verified family members you designate",
        "Service providers bound by confidentiality agreements",
        "Law enforcement only when legally required",
        "Business transfers with notice to users",
        "Aggregate anonymized data for research and improvements"
      ]
    },
    {
      title: "5. Your Rights and Choices",
      content: [
        "Access your personal data at any time",
        "Request data correction or deletion",
        "Export your vault data",
        "Opt-out of marketing communications",
        "Close your account and delete your data",
        "Object to data processing",
        "Lodge complaints with supervisory authorities"
      ]
    },
    {
      title: "6. Cookies and Tracking",
      content: [
        "Essential cookies for service functionality",
        "Analytics cookies to improve user experience",
        "Preference cookies to remember your settings",
        "You can manage cookie preferences in your browser",
        "Third-party cookies from service providers",
        "No tracking for advertising purposes"
      ]
    },
    {
      title: "7. International Data Transfers",
      content: [
        "Data processed in secure US-based facilities",
        "Standard contractual clauses for international transfers",
        "Compliance with local data protection laws",
        "Your data protected regardless of location",
        "Regular assessments of data transfer mechanisms"
      ]
    },
    {
      title: "8. Data Retention",
      content: [
        "Active accounts: data retained indefinitely",
        "Inactive accounts: 7 years or as legally required",
        "Deleted accounts: 30-day recovery period",
        "Backup data: retained for disaster recovery",
        "Legal holds may extend retention periods",
        "You can request immediate deletion"
      ]
    },
    {
      title: "9. Children's Privacy",
      content: [
        "Services not intended for children under 13",
        "We do not knowingly collect children's data",
        "Parents can contact us to remove child data",
        "Age verification for new accounts",
        "Family accounts managed by adults"
      ]
    },
    {
      title: "10. Changes to This Policy",
      content: [
        "We may update this policy periodically",
        "Notice of material changes via email",
        "Continued use indicates acceptance",
        "Previous versions available upon request",
        "Last updated: January 2024"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO {...pageSEO.privacyPolicy} />
      <StructuredData data={organizationSchema} />
      <Header />
      
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-primary/10 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Shield className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Privacy Policy</h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Last Updated: January 15, 2024
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6 sm:mb-8 bg-blue-50 border-blue-200">
            <CardContent className="p-4 sm:p-6">
              <p className="text-xs sm:text-sm leading-relaxed">
                At Time Capsule, we take your privacy seriously. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you use our digital legacy planning service.
                Please read this policy carefully. If you do not agree with the terms of this privacy policy,
                please do not access the service.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {sections.map((section, index) => (
              <Card key={index}>
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{section.title}</h2>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 sm:mt-8 bg-amber-50 border-amber-200">
            <CardContent className="p-4 sm:p-6">
              <h3 className="font-bold mb-2 text-sm sm:text-base">Contact Us</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-3 sm:mt-4 space-y-1 text-xs sm:text-sm">
                <p className="font-medium">Email: privacy@timecapsule.com</p>
                <p className="font-medium">Phone: 1-800-TIME-911</p>
                <p className="font-medium">Address: 123 Legacy Lane, Suite 400, Boston, MA 02108</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
