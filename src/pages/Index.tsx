import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VaultInterface from "@/components/VaultInterface";
import VerificationProcess from "@/components/VerificationProcess";
import SecurityFeatures from "@/components/SecurityFeatures";
import Footer from "@/components/Footer";
import { pageSEO, organizationSchema } from "@/utils/seoConfig";

const Index = () => {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Final Wishes Guardian",
    "description": "Secure digital legacy and time capsule platform",
    "url": "https://finalwishesguardian.lovable.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://finalwishesguardian.lovable.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO {...pageSEO.home} />
      <StructuredData data={[organizationSchema, webPageSchema]} />
      <Header />
      <HeroSection />
      <VaultInterface />
      <VerificationProcess />
      <SecurityFeatures />
      <Footer />
    </div>
  );
};

export default Index;
