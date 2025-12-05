import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { 
  User, 
  Mail, 
  Crown, 
  Calendar, 
  Trash2, 
  Users, 
  Music, 
  ArrowLeft,
  CreditCard,
  Loader2,
  Share2
} from "lucide-react";
import type { AccountSummary, ChordProgression } from "@shared/schema";

export default function AccountPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: summary, isLoading: summaryLoading } = useQuery<AccountSummary>({
    queryKey: ['/api/account/summary'],
    enabled: isAuthenticated,
  });

  const { data: progressions, isLoading: progressionsLoading } = useQuery<ChordProgression[]>({
    queryKey: ['/api/account/progressions'],
    enabled: isAuthenticated,
  });

  const deleteProgressionMutation = useMutation({
    mutationFn: async (progressionId: string) => {
      return apiRequest('DELETE', `/api/account/progressions/${progressionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/account/progressions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/account/summary'] });
      toast({
        title: "Progression Deleted",
        description: "Your saved progression has been removed.",
      });
      setDeletingId(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete progression",
        variant: "destructive",
      });
      setDeletingId(null);
    },
  });

  const manageSubscriptionMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/subscription/portal');
      return res.json();
    },
    onSuccess: (data: { url: string }) => {
      window.location.href = data.url;
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to open subscription management",
        variant: "destructive",
      });
    },
  });

  const handleDeleteProgression = (id: string) => {
    setDeletingId(id);
    deleteProgressionMutation.mutate(id);
  };

  const handleManageSubscription = () => {
    manageSubscriptionMutation.mutate();
  };

  const handleReferFriend = () => {
    navigate('/referrals');
  };

  const handleDeleteAccount = () => {
    navigate('/delete-account');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="bg-gray-900 border-gold max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-gold">Sign In Required</CardTitle>
            <CardDescription className="text-gray-400">
              Please sign in to view your account
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button 
              onClick={() => navigate('/login')}
              className="bg-gold hover:bg-gold/90 text-black"
              data-testid="button-go-login"
            >
              Sign In
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="border-gray-700"
              data-testid="button-go-home"
            >
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isLoading = summaryLoading || progressionsLoading;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4 text-gray-400 hover:text-white"
          data-testid="button-back-home"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <h1 className="text-3xl font-bold text-gold mb-6 flex items-center gap-3">
          <User className="w-8 h-8" />
          My Account
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gold" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Email</span>
                  <span className="text-white" data-testid="text-user-email">
                    {summary?.email || 'Not available'}
                  </span>
                </div>
                {summary?.username && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Username</span>
                    <span className="text-white" data-testid="text-username">
                      {summary.username}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Crown className="w-5 h-5 text-gold" />
                  Subscription Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Plan</span>
                  <Badge 
                    className={summary?.subscriptionStatus === 'active' 
                      ? "bg-gold text-black" 
                      : "bg-gray-700 text-gray-300"
                    }
                    data-testid="badge-subscription-status"
                  >
                    {summary?.subscriptionStatus === 'active' ? 'Premium' : 'Free'}
                  </Badge>
                </div>
                
                {summary?.subscriptionStatus === 'active' && summary?.daysUntilRenewal !== null && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Days Until Renewal
                    </span>
                    <span className="text-white" data-testid="text-days-renewal">
                      {summary.daysUntilRenewal} days
                    </span>
                  </div>
                )}

                {summary?.subscriptionStatus === 'active' ? (
                  <Button
                    onClick={handleManageSubscription}
                    disabled={manageSubscriptionMutation.isPending}
                    className="w-full bg-gold hover:bg-gold/90 text-black"
                    data-testid="button-manage-subscription"
                  >
                    {manageSubscriptionMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <CreditCard className="w-4 h-4 mr-2" />
                    )}
                    Manage Subscription
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate('/')}
                    className="w-full bg-gold hover:bg-gold/90 text-black"
                    data-testid="button-upgrade"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade to Premium
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Music className="w-5 h-5 text-gold" />
                  Saved Progressions
                  <Badge variant="outline" className="ml-2 border-gray-600">
                    {summary?.savedProgressionsCount || 0} / {summary?.maxProgressions || 10}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Save up to 10 chord progressions from your dice rolls
                </CardDescription>
              </CardHeader>
              <CardContent>
                {progressions && progressions.length > 0 ? (
                  <div className="space-y-3">
                    {progressions.map((progression) => (
                      <div 
                        key={progression.id}
                        className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
                        data-testid={`progression-item-${progression.id}`}
                      >
                        <div className="flex-1">
                          <div className="font-medium text-white">
                            {progression.name || 'Untitled Progression'}
                          </div>
                          <div className="text-sm text-gray-400">
                            {Array.isArray(progression.chords) 
                              ? (progression.chords as string[]).join(' → ')
                              : 'No chords'}
                          </div>
                          {progression.genre && (
                            <Badge variant="outline" className="mt-1 text-xs border-gray-600">
                              {progression.genre}
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProgression(progression.id)}
                          disabled={deletingId === progression.id}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          data-testid={`button-delete-progression-${progression.id}`}
                        >
                          {deletingId === progression.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No saved progressions yet</p>
                    <p className="text-sm mt-1">Roll the dice and save your favorite chord progressions!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Separator className="bg-gray-800" />

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  onClick={handleReferFriend}
                  className="w-full border-gold text-gold hover:bg-gold/10"
                  data-testid="button-refer-friend"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Refer a Friend
                </Button>

                <Button
                  variant="outline"
                  onClick={handleDeleteAccount}
                  className="w-full border-red-700 text-red-400 hover:bg-red-900/20"
                  data-testid="button-delete-account"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
