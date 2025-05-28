
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Upload, Users, Lock, Heart } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Create Your Time Capsule",
      description: "Set up your secure digital vault and organize your important documents, passwords, and messages by category.",
      icon: Upload,
      color: "bg-blue-100 text-blue-600"
    },
    {
      step: 2,
      title: "Add Trusted Family Members",
      description: "Designate family members who should have access to your information and specify what each person can access.",
      icon: Users,
      color: "bg-green-100 text-green-600"
    },
    {
      step: 3,
      title: "Secure with Verification",
      description: "Your information is protected with bank-level encryption and requires proper documentation for access.",
      icon: Lock,
      color: "bg-purple-100 text-purple-600"
    },
    {
      step: 4,
      title: "Peace of Mind",
      description: "Your family can access critical information when they need it most, with proper verification safeguards.",
      icon: Heart,
      color: "bg-red-100 text-red-600"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">How Time Capsule Works</h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Protecting your family's future is simple with our secure, step-by-step process.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12">
            {steps.map((step, index) => (
              <div key={step.step} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2">
                  <Card className="p-8">
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`p-3 rounded-full ${step.color}`}>
                          <step.icon className="h-8 w-8" />
                        </div>
                        <div className="text-3xl font-bold text-slate-300">
                          {step.step.toString().padStart(2, '0')}
                        </div>
                      </div>
                      <CardTitle className="text-2xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 text-lg">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:w-1/2">
                  <div className="bg-slate-100 rounded-lg h-64 flex items-center justify-center">
                    <div className={`p-4 rounded-full ${step.color}`}>
                      <step.icon className="h-16 w-16" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Protect Your Family's Future?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of families who trust Time Capsule with their most important information.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
            Get Started Today
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
