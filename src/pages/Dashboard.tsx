
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VaultInterface from "@/components/VaultInterface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Shield, Clock, Bell } from "lucide-react";

const Dashboard = () => {
  const [notifications] = useState([
    { id: 1, message: "New family member request from john@example.com", time: "2 hours ago", type: "request" },
    { id: 2, message: "Password vault updated successfully", time: "1 day ago", type: "update" },
    { id: 3, message: "Monthly security scan completed", time: "3 days ago", type: "security" }
  ]);

  const stats = [
    { label: "Total Items", value: "24", icon: Shield, color: "text-blue-600" },
    { label: "Family Members", value: "3", icon: Users, color: "text-green-600" },
    { label: "Last Updated", value: "2 days ago", icon: Clock, color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-slate-600">Manage your digital legacy and family access</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Item
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-800 mb-1">{notification.message}</p>
                      <p className="text-xs text-slate-500">{notification.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Users className="h-6 w-6" />
                    <span>Manage Family Access</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Shield className="h-6 w-6" />
                    <span>Security Settings</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Plus className="h-6 w-6" />
                    <span>Add Documents</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Bell className="h-6 w-6" />
                    <span>Notification Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <VaultInterface />
      <Footer />
    </div>
  );
};

export default Dashboard;
