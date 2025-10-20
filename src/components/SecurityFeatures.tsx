
import { Card, CardContent } from "@/components/ui/card";
import SecurityCard from "@/components/security/SecurityCard";
import { SECURITY_FEATURES } from "@/data/constants";

const SecurityFeatures = () => {
  return (
    <section id="security" className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Bank-Level Security</h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto px-4">
            Your family's most sensitive information deserves the highest level of protection. 
            Our security measures exceed industry standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SECURITY_FEATURES.map((feature, index) => (
            <SecurityCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </div>

        <div className="mt-8 sm:mt-12 bg-slate-50 rounded-lg p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <p className="text-sm sm:text-base text-slate-600">Uptime Guarantee</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-sm sm:text-base text-slate-600">Security Monitoring</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">256-bit</div>
              <p className="text-sm sm:text-base text-slate-600">AES Encryption</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityFeatures;
