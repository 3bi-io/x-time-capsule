import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, Book, Shield, Users, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { pageSEO, organizationSchema } from "@/utils/seoConfig";

const HelpCenter = () => {
  const categories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of Time Capsule",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "How we protect your information",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Users,
      title: "Family Access",
      description: "Managing family member permissions",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: HelpCircle,
      title: "Troubleshooting",
      description: "Common issues and solutions",
      color: "bg-amber-100 text-amber-600"
    }
  ];

  const faqs = [
    {
      question: "How do I create my first Time Capsule?",
      answer: "Sign up for an account, navigate to your dashboard, and click 'Add New Item'. Choose a category, add your information, and save. Your data is automatically encrypted and securely stored."
    },
    {
      question: "How do family members request access?",
      answer: "Family members can visit the Emergency Access page and submit a verification request with their identification documents. Our team reviews each request within 24-48 hours."
    },
    {
      question: "What documents are accepted for verification?",
      answer: "We accept government-issued IDs (driver's license, passport), death certificates, and legal documents proving your relationship to the vault owner."
    },
    {
      question: "Is my data encrypted?",
      answer: "Yes, all data is encrypted using AES-256 encryption both in transit and at rest. Only you and authorized family members can access your information."
    },
    {
      question: "Can I change who has access to my vault?",
      answer: "Yes, you can manage family members from your dashboard. You can add or remove members and adjust their access levels at any time."
    },
    {
      question: "What happens if I forget my password?",
      answer: "Click 'Forgot Password' on the login page. We'll send a secure reset link to your registered email address. For security reasons, we cannot reset your password without email verification."
    },
    {
      question: "How much does Time Capsule cost?",
      answer: "We offer a free plan for basic storage, and premium plans starting at $9.99/month with unlimited storage and advanced features."
    },
    {
      question: "Can I export my data?",
      answer: "Yes, you can export all your vault data at any time from the Settings page. Your data will be provided in a secure, encrypted format."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO {...pageSEO.helpCenter} />
      <StructuredData data={[organizationSchema, faqSchema]} />
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">How Can We Help?</h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
            Find answers to common questions or contact our support team
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for help articles..."
              className="pl-12 py-6 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <category.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-background border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center p-8 sm:p-12 border-2 border-primary/20">
            <CardHeader>
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl">Still Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our support team is here to help 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/documentation">View Documentation</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpCenter;
