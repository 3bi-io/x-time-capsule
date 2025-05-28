
import { Heart, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg">
            Create Your Time Capsule
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-slate-300">
            Request Access
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="bg-emerald-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Bank-Level Security</h3>
            <p className="text-slate-600">256-bit encryption and multi-factor authentication</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Verified Access</h3>
            <p className="text-slate-600">Death certificate verification required for access</p>
          </div>
          
          <div className="text-center">
            <div className="bg-amber-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Family Focused</h3>
            <p className="text-slate-600">Designed with your loved ones' needs in mind</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
