import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react";

interface VerificationRequest {
  id: string;
  full_name: string;
  requester_email: string;
  vault_owner_email: string;
  phone_number: string | null;
  relationship: string;
  document_url: string | null;
  status: string;
  admin_notes: string | null;
  submitted_at: string;
  user_id: string | null;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate('/dashboard');
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchRequests();
    }
  }, [isAdmin]);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('verification_requests')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast({
        title: "Error",
        description: "Failed to load verification requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (requestId: string, newStatus: 'approved' | 'rejected') => {
    setProcessing(true);
    try {
      const request = requests.find(r => r.id === requestId);
      if (!request) throw new Error('Request not found');

      // Update verification request status
      const { error: updateError } = await supabase
        .from('verification_requests')
        .update({
          status: newStatus,
          admin_notes: adminNotes,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', requestId);

      if (updateError) throw updateError;

      // Create notification for the requester
      if (request.user_id) {
        await supabase.from('notifications').insert({
          user_id: request.user_id,
          title: `Verification Request ${newStatus === 'approved' ? 'Approved' : 'Rejected'}`,
          message: newStatus === 'approved'
            ? `Your verification request for ${request.vault_owner_email} has been approved. You can now access their vault.`
            : `Your verification request for ${request.vault_owner_email} was not approved. ${adminNotes || 'Please contact support for more information.'}`,
          type: newStatus === 'approved' ? 'success' : 'error',
        });
      }

      // If approved, create family member record
      if (newStatus === 'approved') {
        // Find vault owner by email
        const { data: ownerProfile } = await supabase
          .from('profiles')
          .select('user_id')
          .eq('user_id', (await supabase.from('profiles').select('user_id').limit(1).single()).data?.user_id)
          .single();

        // Note: In production, you'd query auth.users by email via edge function
        // For now, admin manually manages family_members table via SQL if needed
        
        toast({
          title: "Important",
          description: "Verification approved. Please add the family member record manually in the database using the vault owner's email.",
        });
      }

      toast({
        title: "Success",
        description: `Request ${newStatus} successfully`,
      });

      setSelectedRequest(null);
      setAdminNotes("");
      await fetchRequests();
    } catch (error: any) {
      console.error('Error updating request:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update request",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (adminLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const approvedRequests = requests.filter(r => r.status === 'approved');
  const rejectedRequests = requests.filter(r => r.status === 'rejected');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Review and manage verification requests</p>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingRequests.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedRequests.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedRequests.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-3 sm:space-y-4">
          <TabsList className="w-full grid grid-cols-3 h-auto">
            <TabsTrigger value="pending" className="text-xs sm:text-sm py-2">Pending ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="approved" className="text-xs sm:text-sm py-2">Approved ({approvedRequests.length})</TabsTrigger>
            <TabsTrigger value="rejected" className="text-xs sm:text-sm py-2">Rejected ({rejectedRequests.length})</TabsTrigger>
          </TabsList>

          {['pending', 'approved', 'rejected'].map((status) => {
            const filteredRequests = requests.filter(r => r.status === status);
            return (
              <TabsContent key={status} value={status} className="space-y-3 sm:space-y-4">
                {filteredRequests.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground text-sm sm:text-base">
                      No {status} requests
                    </CardContent>
                  </Card>
                ) : (
                  filteredRequests.map((request) => (
                    <Card key={request.id}>
                      <CardHeader className="px-4 sm:px-6">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base sm:text-lg truncate">{request.full_name}</CardTitle>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                              Submitted {new Date(request.submitted_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={
                            request.status === 'approved' ? 'default' :
                            request.status === 'rejected' ? 'destructive' : 'secondary'
                          } className="self-start text-xs">
                            {request.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <p className="text-sm font-medium">Requester Email</p>
                            <p className="text-sm text-muted-foreground">{request.requester_email}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Vault Owner Email</p>
                            <p className="text-sm text-muted-foreground">{request.vault_owner_email}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Relationship</p>
                            <p className="text-sm text-muted-foreground">{request.relationship}</p>
                          </div>
                          {request.phone_number && (
                            <div>
                              <p className="text-sm font-medium">Phone</p>
                              <p className="text-sm text-muted-foreground">{request.phone_number}</p>
                            </div>
                          )}
                        </div>

                        {request.document_url && (
                          <div>
                            <p className="text-sm font-medium mb-2">Verification Document</p>
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={`${supabase.storage.from('verification-documents').getPublicUrl(request.document_url).data.publicUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Document
                              </a>
                            </Button>
                          </div>
                        )}

                        {request.admin_notes && (
                          <div>
                            <p className="text-sm font-medium mb-2">Admin Notes</p>
                            <p className="text-sm text-muted-foreground">{request.admin_notes}</p>
                          </div>
                        )}

                        {request.status === 'pending' && (
                          <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t">
                            <div>
                              <label className="text-xs sm:text-sm font-medium mb-2 block">Admin Notes</label>
                              <Textarea
                                placeholder="Add notes about this verification..."
                                value={selectedRequest === request.id ? adminNotes : ""}
                                onChange={(e) => {
                                  setSelectedRequest(request.id);
                                  setAdminNotes(e.target.value);
                                }}
                                rows={3}
                                className="text-sm"
                              />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                              <Button
                                onClick={() => handleUpdateStatus(request.id, 'approved')}
                                disabled={processing}
                                className="flex-1 text-sm sm:text-base"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                onClick={() => handleUpdateStatus(request.id, 'rejected')}
                                disabled={processing}
                                variant="destructive"
                                className="flex-1 text-sm sm:text-base"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
