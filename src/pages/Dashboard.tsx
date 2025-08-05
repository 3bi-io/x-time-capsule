
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VaultInterface from "@/components/VaultInterface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Shield, Clock, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useVaultData } from "@/hooks/useVaultData";

const Dashboard = () => {
  const { user } = useAuth();
  const { timeCapsules, loading } = useVaultData();
  const [notifications] = useState([
    { id: 1, message: "New family member request from john@example.com", time: "2 hours ago", type: "request" },
    { id: 2, message: "Password vault updated successfully", time: "1 day ago", type: "update" },
    { id: 3, message: "Monthly security scan completed", time: "3 days ago", type: "security" }
  ]);

  const stats = [
    { 
      label: "Total Items", 
      value: loading ? "..." : timeCapsules.length.toString(), 
      icon: Shield, 
      color: "text-blue-600" 
    },
    { label: "Family Members", value: "0", icon: Users, color: "text-green-600" },
    { 
      label: "Account Created", 
      value: user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Today", 
      icon: Clock, 
      color: "text-orange-600" 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <section className="py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Welcome back, {user?.user_metadata?.full_name || 'User'}
              </h1>
              <p className="text-slate-600 text-sm sm:text-base">Manage your digital legacy and family access</p>
            </div>
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Item
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-slate-600">{stat.label}</p>
                      <p className="text-xl sm:text-2xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-3 sm:space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs sm:text-sm text-slate-800 mb-1 leading-relaxed">{notification.message}</p>
                      <p className="text-xs text-slate-500">{notification.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <Button variant="outline" className="h-16 sm:h-20 flex flex-col space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <Users className="h-4 w-4 sm:h-6 sm:w-6" />
                    <span className="text-center">Manage Family Access</span>
                  </Button>
                  <Button variant="outline" className="h-16 sm:h-20 flex flex-col space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <Shield className="h-4 w-4 sm:h-6 sm:w-6" />
                    <span className="text-center">Security Settings</span>
                  </Button>
                  <Button variant="outline" className="h-16 sm:h-20 flex flex-col space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <Plus className="h-4 w-4 sm:h-6 sm:w-6" />
                    <span className="text-center">Add Documents</span>
                  </Button>
                  <Button variant="outline" className="h-16 sm:h-20 flex flex-col space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <Bell className="h-4 w-4 sm:h-6 sm:w-6" />
                    <span className="text-center">Notification Settings</span>
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
