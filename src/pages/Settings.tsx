import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, User, Bell, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { z } from "zod";

const passwordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);

    try {
      // Validate password
      passwordSchema.parse(passwordData);

      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Password updated successfully",
      });

      setPasswordData({ newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error.errors.map(err => err.message));
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to update password",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">Settings</h1>

          <Tabs defaultValue="security" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="security" className="text-xs sm:text-sm py-2 sm:py-2.5">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="text-xs sm:text-sm py-2 sm:py-2.5">
                <User className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs sm:text-sm py-2 sm:py-2.5">
                <Bell className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="security">
              <Card>
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-lg sm:text-xl">Change Password</CardTitle>
                  <CardDescription className="text-sm">
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <form onSubmit={handlePasswordChange} className="space-y-3 sm:space-y-4">
                    {validationErrors.length > 0 && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <ul className="list-disc list-inside space-y-1">
                            {validationErrors.map((error, index) => (
                              <li key={index}>{error}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, newPassword: e.target.value })
                        }
                        placeholder="Enter new password"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Must be at least 8 characters with uppercase, number, and special character
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                        }
                        placeholder="Confirm new password"
                        required
                      />
                    </div>

                    <Button type="submit" disabled={loading}>
                      {loading ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Manage your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Email</Label>
                      <Input value={user?.email || ""} disabled />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Contact support to change your email address
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose how you want to receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Notification settings coming soon. You'll receive important updates via email.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
