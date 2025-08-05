
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const { user, signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: ""
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      window.location.href = '/dashboard';
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message || "An error occurred during sign in.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Sign In Failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      const { error } = await signUp(formData.email, formData.password, formData.fullName);
      
      if (error) {
        toast({
          title: "Sign Up Failed",
          description: error.message || "An error occurred during sign up.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Created",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Sign Up Failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 mb-4 sm:mb-6">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Time Capsule</h1>
          </Link>
          <p className="text-slate-600 text-sm sm:text-base">Secure access to your digital legacy</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-lg sm:text-xl">Welcome</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin" className="text-sm">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="text-sm">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-sm">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="your@email.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-sm">Password</Label>
                    <Input 
                      id="password" 
                      name="password"
                      type="password" 
                      value={formData.password}
                      onChange={handleInputChange}
                      required 
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-6" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-sm">Full Name</Label>
                    <Input 
                      id="fullName" 
                      name="fullName"
                      placeholder="Your full name" 
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required 
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signupEmail" className="text-sm">Email</Label>
                    <Input 
                      id="signupEmail" 
                      name="email"
                      type="email" 
                      placeholder="your@email.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signupPassword" className="text-sm">Password</Label>
                    <Input 
                      id="signupPassword" 
                      name="password"
                      type="password" 
                      value={formData.password}
                      onChange={handleInputChange}
                      required 
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm">Confirm Password</Label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword"
                      type="password" 
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required 
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-6" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm text-slate-600">
            Need emergency access? <Link to="/emergency-access" className="text-blue-600 hover:underline">Click here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
