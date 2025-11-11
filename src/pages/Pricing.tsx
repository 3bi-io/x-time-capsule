import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pageSEO, organizationSchema } from "@/utils/seoConfig";

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Personal",
      price: "$9.99",
      period: "/month",
      description: "Perfect for individuals protecting their personal legacy",
      features: [
        "Up to 10 time capsules",
        "5GB secure storage",
        "Basic encryption",
        "Email notifications",
        "Single beneficiary",
        "Standard support",
      ],
      cta: "Start Free Trial",
      featured: false,
    },
    {
      name: "Family",
      price: "$24.99",
      period: "/month",
      description: "Ideal for families securing their collective memories",
      features: [
        "Unlimited time capsules",
        "50GB secure storage",
        "Military-grade encryption",
        "Priority notifications",
        "Up to 5 beneficiaries",
        "Family member verification",
        "Priority support",
        "Advanced access controls",
      ],
      cta: "Start Free Trial",
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For organizations requiring advanced legacy solutions",
      features: [
        "Unlimited everything",
        "Unlimited secure storage",
        "Custom encryption options",
        "Dedicated account manager",
        "Unlimited beneficiaries",
        "Advanced admin controls",
        "24/7 premium support",
        "Custom integrations",
        "SLA guarantees",
        "White-label options",
      ],
      cta: "Contact Sales",
      featured: false,
    },
  ];

  const productSchemas = pricingPlans.map(plan => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Final Wishes Guardian - ${plan.name} Plan`,
    "description": plan.description,
    "offers": {
      "@type": "Offer",
      "price": plan.price.replace('$', '').replace('Custom', '0'),
      "priceCurrency": "USD",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "url": "https://finalwishesguardian.lovable.app/pricing"
    }
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEO {...pageSEO.pricing} />
      <StructuredData data={[organizationSchema, ...productSchemas]} />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            Choose Your Plan
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Protect your digital legacy with flexible pricing options designed for every need.
            All plans include a 14-day free trial.
          </p>
          <p className="text-sm sm:text-base text-slate-500">
            No credit card required • Cancel anytime • Upgrade or downgrade as needed
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative flex flex-col ${
                plan.featured 
                  ? "border-blue-600 shadow-xl scale-105 lg:scale-110" 
                  : "border-slate-200"
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-3">
                  <span className="text-4xl sm:text-5xl font-bold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-slate-600 text-lg">{plan.period}</span>
                </div>
                <CardDescription className="text-slate-600 text-sm sm:text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Link to="/auth" className="w-full">
                  <Button 
                    className={`w-full ${
                      plan.featured 
                        ? "bg-blue-600 hover:bg-blue-700" 
                        : "bg-slate-900 hover:bg-slate-800"
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-50 rounded-xl p-6 sm:p-8 lg:p-12 border border-slate-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-8 sm:mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2 text-base sm:text-lg">
                Can I change plans later?
              </h3>
              <p className="text-slate-600 text-sm sm:text-base">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2 text-base sm:text-lg">
                What payment methods do you accept?
              </h3>
              <p className="text-slate-600 text-sm sm:text-base">
                We accept all major credit cards, debit cards, and PayPal for your convenience.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2 text-base sm:text-lg">
                Is my data secure?
              </h3>
              <p className="text-slate-600 text-sm sm:text-base">
                Absolutely. We use military-grade encryption and follow industry best practices for data security.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2 text-base sm:text-lg">
                What happens after the free trial?
              </h3>
              <p className="text-slate-600 text-sm sm:text-base">
                You'll be automatically enrolled in your chosen plan. Cancel anytime during the trial at no charge.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-slate-600 mb-6 text-base sm:text-lg">
            Our team is here to help you find the perfect plan for your needs.
          </p>
          <Link to="/contact">
            <Button variant="outline" size="lg" className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white">
              Contact Us
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
