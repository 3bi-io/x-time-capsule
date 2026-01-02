import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, User, Bell, AlertCircle, Download, Trash2, CreditCard } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  const { profile, updateProfile, deleteAccount, exportData } = useProfile();
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [fullName, setFullName] = useState(profile?.full_name || user?.user_metadata?.full_name || "");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [notificationPrefs, setNotificationPrefs] = useState({
    emailNotifications: true,
    accessAlerts: true,
    weeklyDigest: false,
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);

    try {
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

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await updateProfile({ full_name: fullName });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setLoading(true);
    try {
      await exportData();
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") return;
    
    setLoading(true);
    try {
      await deleteAccount();
    } finally {
      setLoading(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">Settings</h1>

          <Tabs defaultValue="profile" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-4 h-auto">
              <TabsTrigger value="profile" className="text-xs sm:text-sm py-2 sm:py-2.5">
                <User className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="text-xs sm:text-sm py-2 sm:py-2.5">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs sm:text-sm py-2 sm:py-2.5">
                <Bell className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="text-xs sm:text-sm py-2 sm:py-2.5">
                <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Billing</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Manage your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input value={user?.email || ""} disabled />
                      <p className="text-xs text-muted-foreground mt-1">
                        Contact support to change your email address
                      </p>
                    </div>
                    <div>
                      <Label>Account Created</Label>
                      <Input 
                        value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown"} 
                        disabled 
                      />
                    </div>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Data Export */}
              <Card>
                <CardHeader>
                  <CardTitle>Export Your Data</CardTitle>
                  <CardDescription>
                    Download a copy of all your vault items and settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" onClick={handleExport} disabled={loading}>
                    <Download className="h-4 w-4 mr-2" />
                    {loading ? "Exporting..." : "Export Data (JSON)"}
                  </Button>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible actions that affect your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="destructive" 
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    This will permanently delete all your vault items and data
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
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

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose how you want to receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates about your account
                      </p>
                    </div>
                    <Switch
                      checked={notificationPrefs.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationPrefs({ ...notificationPrefs, emailNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Access Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone accesses your vault
                      </p>
                    </div>
                    <Switch
                      checked={notificationPrefs.accessAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationPrefs({ ...notificationPrefs, accessAlerts: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a weekly summary of vault activity
                      </p>
                    </div>
                    <Switch
                      checked={notificationPrefs.weeklyDigest}
                      onCheckedChange={(checked) =>
                        setNotificationPrefs({ ...notificationPrefs, weeklyDigest: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Manage your subscription</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Free Plan</h3>
                      <span className="text-sm text-muted-foreground">Active</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      10 vault items, 1 family member
                    </p>
                    <Button>Upgrade to Premium</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Payment integration coming soon. Upgrade to unlock unlimited vault items, 
                    more family members, and priority support.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* Delete Account Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>
                This action cannot be undone. This will permanently delete your account 
                and remove all your data from our servers.
              </p>
              <p>
                Type <strong>DELETE</strong> to confirm:
              </p>
              <Input
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type DELETE to confirm"
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={deleteConfirmText !== "DELETE" || loading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loading ? "Deleting..." : "Delete Account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;
