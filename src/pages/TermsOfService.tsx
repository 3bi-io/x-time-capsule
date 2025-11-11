import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { pageSEO, organizationSchema } from "@/utils/seoConfig";

const TermsOfService = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using Time Capsule's services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes."
    },
    {
      title: "2. Description of Service",
      content: "Time Capsule provides a secure digital platform for storing and managing personal information, documents, and messages intended for family members and designated beneficiaries. Our service includes encrypted storage, family member management, verification processes, and controlled access mechanisms."
    },
    {
      title: "3. User Accounts and Registration",
      content: "You must create an account to use our services. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate and current. You must be at least 18 years old to create an account."
    },
    {
      title: "4. Acceptable Use Policy",
      content: "You agree not to use our services to store illegal content, malware, or material that infringes on others' rights. You will not attempt to gain unauthorized access to our systems or interfere with service operation. You will not use automated systems to access the service without permission. Violations may result in account termination and legal action."
    },
    {
      title: "5. Content Ownership and License",
      content: "You retain all rights to the content you upload to Time Capsule. By uploading content, you grant us a limited license to store, process, and transmit your content as necessary to provide our services. We do not claim ownership of your content and will not access it except as necessary for service operation, security, or as required by law."
    },
    {
      title: "6. Verification and Access Control",
      content: "Family members requesting access to your vault must complete our verification process. We reserve the right to request additional documentation and to deny access requests that fail verification. Verification typically takes 24-48 hours but may take longer in complex cases. Emergency access requests receive priority processing."
    },
    {
      title: "7. Payment and Billing",
      content: "Subscription fees are charged monthly or annually as selected. All fees are non-refundable except as required by law. We may change our fees with 30 days' notice. Failure to pay may result in service suspension or termination. You are responsible for all taxes associated with your subscription."
    },
    {
      title: "8. Data Security and Backups",
      content: "We implement industry-standard security measures including AES-256 encryption, secure data centers, and regular security audits. While we take reasonable precautions, we cannot guarantee absolute security. We maintain regular backups but are not liable for data loss. We recommend maintaining your own backups of critical information."
    },
    {
      title: "9. Service Availability",
      content: "We strive for 99.9% uptime but do not guarantee uninterrupted service. Maintenance windows will be announced in advance when possible. We are not liable for damages resulting from service interruptions. In case of extended outages, we may offer service credits at our discretion."
    },
    {
      title: "10. Termination",
      content: "You may terminate your account at any time through your account settings. We may terminate or suspend your account for violations of these terms, illegal activity, or non-payment. Upon termination, you have 30 days to export your data before permanent deletion. Some data may be retained as required by law."
    },
    {
      title: "11. Limitation of Liability",
      content: "Time Capsule and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service. Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim. Some jurisdictions do not allow these limitations, so they may not apply to you."
    },
    {
      title: "12. Indemnification",
      content: "You agree to indemnify and hold harmless Time Capsule, its officers, directors, employees, and agents from any claims, losses, damages, liabilities, and expenses arising from your use of the service, violation of these terms, or infringement of any third-party rights."
    },
    {
      title: "13. Intellectual Property",
      content: "All intellectual property rights in the Time Capsule service, including software, designs, trademarks, and content, belong to Time Capsule or its licensors. You may not copy, modify, distribute, or create derivative works without our written permission. User content remains the property of users."
    },
    {
      title: "14. Dispute Resolution",
      content: "Any disputes arising from these terms shall be resolved through binding arbitration in accordance with the American Arbitration Association rules. You waive your right to a jury trial and to participate in class actions. The arbitration shall be held in Boston, Massachusetts. This agreement is governed by Massachusetts law."
    },
    {
      title: "15. Privacy and Data Protection",
      content: "Your use of Time Capsule is also governed by our Privacy Policy, which is incorporated into these terms by reference. We comply with GDPR, CCPA, and other applicable data protection laws. You have rights regarding your personal data as described in our Privacy Policy."
    },
    {
      title: "16. Changes to Service",
      content: "We reserve the right to modify, suspend, or discontinue any part of our service at any time with or without notice. We are not liable to you or any third party for any modification, suspension, or discontinuance of the service. We will provide reasonable notice of material changes when possible."
    },
    {
      title: "17. Third-Party Services",
      content: "Our service may integrate with third-party services or contain links to external websites. We are not responsible for the content, policies, or practices of third parties. Your use of third-party services is at your own risk and subject to their terms and policies."
    },
    {
      title: "18. Contact Information",
      content: "For questions about these Terms of Service, contact us at legal@timecapsule.com, call 1-800-TIME-911, or write to Time Capsule Legal Department, 123 Legacy Lane, Suite 400, Boston, MA 02108, United States."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO {...pageSEO.termsOfService} />
      <StructuredData data={organizationSchema} />
      <Header />
      
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-primary/10 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <FileText className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Terms of Service</h1>
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
                These Terms of Service ("Terms") govern your access to and use of Time Capsule's services,
                including our website, applications, and related services (collectively, the "Service").
                By using our Service, you agree to be bound by these Terms. Please read them carefully.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4 sm:space-y-6">
            {sections.map((section, index) => (
              <Card key={index}>
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3">{section.title}</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 sm:mt-8 bg-amber-50 border-amber-200">
            <CardContent className="p-4 sm:p-6">
              <h3 className="font-bold mb-2 text-sm sm:text-base">Acknowledgment</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                By using Time Capsule, you acknowledge that you have read, understood, and agree to be bound
                by these Terms of Service and our Privacy Policy. If you do not agree, you must discontinue
                use of our services immediately.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;
