
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Heart, Lock, User } from "lucide-react";

const VaultInterface = () => {
  const [selectedCategory, setSelectedCategory] = useState("documents");

  const categories = [
    {
      id: "documents",
      name: "Legal Documents",
      icon: FileText,
      count: 12,
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: "financial",
      name: "Financial Information",
      icon: Lock,
      count: 8,
      color: "bg-emerald-100 text-emerald-700"
    },
    {
      id: "personal",
      name: "Personal Messages",
      icon: Heart,
      count: 5,
      color: "bg-rose-100 text-rose-700"
    },
    {
      id: "contacts",
      name: "Important Contacts",
      icon: User,
      count: 15,
      color: "bg-purple-100 text-purple-700"
    }
  ];

  const mockItems = [
    { name: "Last Will and Testament", type: "PDF", date: "2024-01-15", status: "secured" },
    { name: "Bank Account Information", type: "Document", date: "2024-01-10", status: "secured" },
    { name: "Insurance Policies", type: "PDF", date: "2024-01-08", status: "secured" },
    { name: "Letter to Sarah", type: "Message", date: "2024-01-20", status: "secured" }
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Secure Digital Vault</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Organize and protect your most important information in categories that make sense for your family.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? "bg-blue-50 border-blue-200 border"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded ${category.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-sm">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  {categories.find(c => c.id === selectedCategory)?.name}
                </CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Add New Item
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-slate-100 p-2 rounded">
                          <FileText className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">{item.name}</h4>
                          <p className="text-sm text-slate-500">
                            {item.type} • Added {item.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant="outline" 
                          className="text-emerald-700 border-emerald-200 bg-emerald-50"
                        >
                          {item.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VaultInterface;
