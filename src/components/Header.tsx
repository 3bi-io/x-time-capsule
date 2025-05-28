
import { Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-slate-900 text-white py-4 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Time Capsule</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="#how-it-works" className="hover:text-blue-300 transition-colors">
            How It Works
          </a>
          <a href="#security" className="hover:text-blue-300 transition-colors">
            Security
          </a>
          <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
            Sign In
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
