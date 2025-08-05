
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";

interface NavigationProps {
  variant?: "header" | "footer";
}

const Navigation = ({ variant = "header" }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  
  const navItems = [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/security", label: "Security" },
  ];

  if (variant === "header") {
    return (
      <>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="hover:text-blue-300 transition-colors text-sm lg:text-base"
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white text-sm lg:text-base px-3 lg:px-4">
                  Dashboard
                </Button>
              </Link>
              <Button 
                onClick={signOut}
                variant="outline" 
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white text-sm lg:text-base px-3 lg:px-4"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white text-sm lg:text-base px-3 lg:px-4">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-blue-600 hover:bg-blue-700 text-sm lg:text-base px-3 lg:px-4">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-lg font-medium hover:text-blue-600 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col space-y-3 pt-4 border-t">
                  {user ? (
                    <>
                      <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                          Dashboard
                        </Button>
                      </Link>
                      <Button 
                        onClick={() => {
                          setIsOpen(false);
                          signOut();
                        }}
                        variant="outline" 
                        className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/auth" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/auth" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </>
    );
  }

  return (
    <ul className="space-y-2 text-slate-300">
      {navItems.map((item) => (
        <li key={item.href}>
          <Link to={item.href} className="hover:text-white transition-colors text-sm sm:text-base">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
