import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Shield, Users, Settings, FileText, Download, Video, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { pageSEO, organizationSchema } from "@/utils/seoConfig";

const Documentation = () => {
  const sections = [
    {
      icon: Book,
      title: "Getting Started Guide",
      description: "Complete walkthrough for new users",
      articles: [
        "Creating your first Time Capsule",
        "Understanding the dashboard",
        "Adding your first vault item",
        "Organizing with categories"
      ],
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Shield,
      title: "Security Documentation",
      description: "Learn about our security measures",
      articles: [
        "Encryption and data protection",
        "Two-factor authentication setup",
        "Password best practices",
        "Security audit logs"
      ],
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Users,
      title: "Family Access Management",
      description: "Managing family member permissions",
      articles: [
        "Adding family members",
        "Setting access levels",
        "Verification process explained",
        "Removing family access"
      ],
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Manage your account preferences",
      articles: [
        "Profile settings",
        "Changing your password",
        "Email notifications",
        "Data export options"
      ],
      color: "bg-amber-100 text-amber-600"
    }
  ];

  const resources = [
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      link: "#"
    },
    {
      icon: FileText,
      title: "PDF Guides",
      description: "Downloadable documentation",
      link: "#"
    },
    {
      icon: Code,
      title: "API Documentation",
      description: "For developers and integrations",
      link: "#"
    },
    {
      icon: Download,
      title: "Quick Reference",
      description: "Cheat sheets and shortcuts",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO {...pageSEO.documentation} />
      <StructuredData data={organizationSchema} />
      <Header />
      
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Documentation</h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
            Everything you need to know about using Time Capsule effectively
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/help-center">Search Help Center</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Documentation Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {sections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <section.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.articles.map((article, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Additional Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <resource.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Can't Find What You Need?</h2>
          <p className="text-lg mb-6 opacity-90">
            Our support team is ready to help you with any questions
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Documentation;
