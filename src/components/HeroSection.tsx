
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import FeatureCard from "@/components/features/FeatureCard";
import { HERO_FEATURES } from "@/data/constants";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-blue-100 p-3 sm:p-4 rounded-full">
            <Heart className="h-8 w-8 sm:h-10 lg:h-12 sm:w-10 lg:w-12 text-blue-600" />
          </div>
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight px-2">
          Protect Your Family's Future with
          <span className="text-blue-600 block mt-2">Digital Legacy Planning</span>
        </h2>
        
        <p className="text-lg sm:text-xl text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          Securely store important documents, passwords, and heartfelt messages for your loved ones. 
          Access is granted only with proper verification, ensuring your family's security and peace of mind.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
          <Link to="/auth" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
              Create Your Time Capsule
            </Button>
          </Link>
          <Link to="/emergency-access" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-slate-300">
              Request Access
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
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
