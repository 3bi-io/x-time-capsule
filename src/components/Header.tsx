
import { Shield } from "lucide-react";
import Navigation from "@/components/ui/navigation";

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
        <Navigation variant="header" />
      </div>
    </header>
  );
};

export default Header;
