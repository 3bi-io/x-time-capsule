
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VaultInterface from "@/components/VaultInterface";
import VerificationProcess from "@/components/VerificationProcess";
import SecurityFeatures from "@/components/SecurityFeatures";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
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
