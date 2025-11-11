import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

const routeLabels: Record<string, string> = {
  "": "Home",
  "how-it-works": "How It Works",
  "security": "Security",
  "pricing": "Pricing",
  "auth": "Sign In",
  "emergency-access": "Emergency Access",
  "help-center": "Help Center",
  "contact": "Contact",
  "documentation": "Documentation",
  "privacy-policy": "Privacy Policy",
  "terms-of-service": "Terms of Service",
  "compliance": "Compliance",
  "dashboard": "Dashboard",
  "admin": "Admin",
  "family-members": "Family Members",
  "settings": "Settings"
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) return null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://finalwishesguardian.lovable.app/"
      },
      ...pathnames.map((path, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": routeLabels[path] || path,
        "item": `https://finalwishesguardian.lovable.app/${pathnames.slice(0, index + 1).join("/")}`
      }))
    ]
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  <span className="sr-only">Home</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathnames.map((path, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;
              const label = routeLabels[path] || path;

              return (
                <div key={path} className="flex items-center">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={routeTo}>{label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  );
};

export default Breadcrumbs;
