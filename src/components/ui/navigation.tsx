
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NavigationProps {
  variant?: "header" | "footer";
}

const Navigation = ({ variant = "header" }: NavigationProps) => {
  const navItems = [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/security", label: "Security" },
  ];

  if (variant === "header") {
    return (
      <nav className="flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="hover:text-blue-300 transition-colors"
          >
            {item.label}
          </Link>
        ))}
        <Link to="/auth">
          <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
            Sign In
          </Button>
        </Link>
        <Link to="/auth">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
        </Link>
      </nav>
    );
  }

  return (
    <ul className="space-y-2 text-slate-300">
      {navItems.map((item) => (
        <li key={item.href}>
          <Link to={item.href} className="hover:text-white transition-colors">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
