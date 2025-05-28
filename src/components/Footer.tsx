
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Time Capsule</h3>
            </Link>
            <p className="text-slate-300 mb-4 max-w-md">
              Protecting your family's future through secure digital legacy planning. 
              Peace of mind for you, security for your loved ones.
            </p>
            <p className="text-slate-400 text-sm">
              © 2024 Time Capsule. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/emergency-access" className="hover:text-white transition-colors">Emergency Access</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Documentation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            Built with care for families who want to protect what matters most.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
