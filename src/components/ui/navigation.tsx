
import { Button } from "@/components/ui/button";

interface NavigationProps {
  variant?: "header" | "footer";
}

const Navigation = ({ variant = "header" }: NavigationProps) => {
  const navItems = [
    { href: "#how-it-works", label: "How It Works" },
    { href: "#security", label: "Security" },
  ];

  if (variant === "header") {
    return (
      <nav className="flex items-center space-x-6">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="hover:text-blue-300 transition-colors"
          >
            {item.label}
          </a>
        ))}
        <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
          Sign In
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Get Started
        </Button>
      </nav>
    );
  }

  return (
    <ul className="space-y-2 text-slate-300">
      {navItems.map((item) => (
        <li key={item.href}>
          <a href={item.href} className="hover:text-white transition-colors">
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
