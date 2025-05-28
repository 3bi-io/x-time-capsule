
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import FeatureCard from "@/components/features/FeatureCard";
import { HERO_FEATURES } from "@/data/constants";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <Heart className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        
        <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
          Protect Your Family's Future with
          <span className="text-blue-600 block">Digital Legacy Planning</span>
        </h2>
        
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Securely store important documents, passwords, and heartfelt messages for your loved ones. 
          Access is granted only with proper verification, ensuring your family's security and peace of mind.
        </p>
        
        <div className="flex justify-center space-x-4 mb-12">
          <Link to="/auth">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg">
              Create Your Time Capsule
            </Button>
          </Link>
          <Link to="/emergency-access">
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-slate-300">
              Request Access
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {HERO_FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconColor={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
