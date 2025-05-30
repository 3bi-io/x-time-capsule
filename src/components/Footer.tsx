
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">Time Capsule</h3>
            </Link>
            <p className="text-slate-300 mb-4 max-w-md text-sm sm:text-base">
              Protecting your family's future through secure digital legacy planning. 
              Peace of mind for you, security for your loved ones.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm">
              © 2024 Time Capsule. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="#" className="hover:text-white transition-colors text-sm">Help Center</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/emergency-access" className="hover:text-white transition-colors text-sm">Emergency Access</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors text-sm">Documentation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="#" className="hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors text-sm">Security</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors text-sm">Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-slate-400 text-xs sm:text-sm">
            Built with care for families who want to protect what matters most.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
