import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { familyMemberSchema, type FamilyMemberInput } from "@/lib/validationSchemas";
import { UserPlus, Trash2, Mail } from "lucide-react";

interface FamilyMember {
  id: string;
  member_name: string;
  member_email: string;
  access_level: string;
  is_verified: boolean;
  invited_at: string;
}

const FamilyMembers = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FamilyMemberInput>({
    memberName: "",
    memberEmail: "",
    accessLevel: "limited",
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('family_members')
        .select('*')
        .eq('vault_owner_id', user.id)
        .order('invited_at', { ascending: false });

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching family members:', error);
      toast({
        title: "Error",
        description: "Failed to load family members",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validated = familyMemberSchema.parse(formData);

      const { error } = await supabase
        .from('family_members')
        .insert({
          vault_owner_id: user!.id,
          member_name: validated.memberName,
          member_email: validated.memberEmail,
          access_level: validated.accessLevel,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Family member invited successfully",
      });

      setFormData({ memberName: "", memberEmail: "", accessLevel: "limited" });
      setShowForm(false);
      await fetchMembers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to invite family member",
        variant: "destructive",
      });
    }
  };

  const handleRemove = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('family_members')
        .delete()
        .eq('id', memberId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Family member removed",
      });

      await fetchMembers();
    } catch (error) {
      console.error('Error removing member:', error);
      toast({
        title: "Error",
        description: "Failed to remove family member",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Family Members</h1>
              <p className="text-muted-foreground">
                Manage who can access your time capsule
              </p>
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </div>

          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Invite Family Member</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInvite} className="space-y-4">
                  <div>
                    <Label htmlFor="memberName">Full Name</Label>
                    <Input
                      id="memberName"
                      value={formData.memberName}
                      onChange={(e) => setFormData({ ...formData, memberName: e.target.value })}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="memberEmail">Email Address</Label>
                    <Input
                      id="memberEmail"
                      type="email"
                      value={formData.memberEmail}
                      onChange={(e) => setFormData({ ...formData, memberEmail: e.target.value })}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="accessLevel">Access Level</Label>
                    <Select
                      value={formData.accessLevel}
                      onValueChange={(value: "limited" | "full") =>
                        setFormData({ ...formData, accessLevel: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="limited">Limited - Can view only</SelectItem>
                        <SelectItem value="full">Full - Can view and edit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit">Send Invitation</Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Current Members</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center text-muted-foreground py-8">Loading...</p>
              ) : members.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No family members invited yet
                </p>
              ) : (
                <div className="space-y-4">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-medium">{member.member_name}</h4>
                          <Badge variant={member.is_verified ? "default" : "secondary"}>
                            {member.is_verified ? "Verified" : "Pending"}
                          </Badge>
                          <Badge variant="outline">
                            {member.access_level === "full" ? "Full Access" : "Limited"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {member.member_email}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Invited {new Date(member.invited_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemove(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FamilyMembers;
