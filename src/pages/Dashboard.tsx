import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VaultInterface from "@/components/VaultInterface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useVaultData } from "@/hooks/useVaultData";
import { useNotifications } from "@/hooks/useNotifications";
import { Shield, Users, Clock, Plus, Settings as SettingsIcon } from "lucide-react";
import { AddVaultItemModal } from "@/components/vault/AddVaultItemModal";
import type { VaultItemInput } from "@/lib/validationSchemas";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { timeCapsules, loading, addTimeCapsule } = useVaultData();
  const { notifications, markAsRead } = useNotifications();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddItem = async (item: VaultItemInput) => {
    await addTimeCapsule({
      title: item.title,
      description: item.description || "",
      category: item.category,
      content: item.content || {},
    });
  };

  const stats = [
    { 
      label: "Total Items", 
      value: loading ? "..." : timeCapsules.length.toString(), 
      icon: Shield, 
      color: "text-blue-600" 
    },
    { 
      label: "Family Members", 
      value: "0", 
      icon: Users, 
      color: "text-green-600" 
    },
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
            <Button 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowAddModal(true)}
            >
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

          {/* Recent Activity & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                {notifications.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No recent activity</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your notifications will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start space-x-3 text-sm p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                        onClick={() => !notification.is_read && markAsRead(notification.id)}
                      >
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          notification.type === "success" ? "bg-emerald-500" :
                          notification.type === "error" ? "bg-red-500" :
                          "bg-blue-500"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-medium truncate">{notification.title}</p>
                            {!notification.is_read && (
                              <Badge variant="secondary" className="text-xs flex-shrink-0">New</Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground text-xs">{notification.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <Button
                    variant="outline"
                    className="h-20 sm:h-24 flex flex-col justify-center space-y-2 text-xs sm:text-sm hover:bg-slate-50 transition-colors"
                    onClick={() => navigate('/family-members')}
                  >
                    <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-center">Manage Family</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 sm:h-24 flex flex-col justify-center space-y-2 text-xs sm:text-sm hover:bg-slate-50 transition-colors"
                    onClick={() => navigate('/settings')}
                  >
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-center">Security</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 sm:h-24 flex flex-col justify-center space-y-2 text-xs sm:text-sm hover:bg-slate-50 transition-colors"
                    onClick={() => setShowAddModal(true)}
                  >
                    <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-center">Add Item</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 sm:h-24 flex flex-col justify-center space-y-2 text-xs sm:text-sm hover:bg-slate-50 transition-colors"
                    onClick={() => navigate('/settings')}
                  >
                    <SettingsIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-center">Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <VaultInterface />
      <Footer />

      <AddVaultItemModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onAdd={handleAddItem}
      />
    </div>
  );
};

export default Dashboard;
