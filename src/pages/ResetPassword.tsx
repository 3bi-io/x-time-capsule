import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { z } from "zod";

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if we have a valid recovery session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      // If there's a session or we're coming from a recovery link (hash contains access_token)
      const hasRecoveryToken = window.location.hash.includes('access_token') || 
                               window.location.hash.includes('type=recovery');
      setIsValidSession(!!session || hasRecoveryToken);
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    try {
      passwordSchema.parse({ password, confirmPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.errors.map(err => err.message));
        return;
      }
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Password Updated",
        description: "Your password has been successfully reset",
      });

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/auth');
      }, 3000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reset password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidSession === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Invalid or Expired Link</h2>
              <p className="text-muted-foreground mb-6">
                This password reset link is invalid or has expired. Please request a new one.
              </p>
              <Link to="/forgot-password">
                <Button className="w-full">Request New Link</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Password Reset Successful</h2>
              <p className="text-muted-foreground mb-6">
                Your password has been updated. Redirecting to sign in...
              </p>
              <Link to="/auth">
                <Button className="w-full">Sign In Now</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 mb-4 sm:mb-6">
            <div className="bg-primary p-2 rounded-lg">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Time Capsule</h1>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-lg sm:text-xl">Set New Password</CardTitle>
            <CardDescription className="text-center">
              Create a strong password for your account
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="password" className="text-sm">New Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Min 8 characters with uppercase, number, and special character
                </p>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-sm">Confirm Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-4 sm:mt-6">
          <Link to="/auth" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
