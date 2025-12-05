import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { queryClient, apiRequest } from "@/lib/queryClient";
import RiffModal from "@/components/riff-modal";
import { 
  User, 
  Mail, 
  Crown, 
  Calendar, 
  Trash2, 
  Music, 
  ArrowLeft,
  CreditCard,
  Loader2,
  Share2,
  Play,
  Dices,
  Sparkles
} from "lucide-react";
import type { AccountSummary, ChordProgression } from "@shared/schema";

const genreColors: Record<string, { bg: string; border: string; text: string }> = {
  'Rock': { bg: 'from-red-600/20 to-orange-600/20', border: 'border-red-500/30', text: 'text-red-400' },
  'Metal': { bg: 'from-gray-600/20 to-zinc-700/20', border: 'border-gray-500/30', text: 'text-gray-300' },
  'Blues': { bg: 'from-blue-600/20 to-indigo-600/20', border: 'border-blue-500/30', text: 'text-blue-400' },
  'Jazz': { bg: 'from-purple-600/20 to-violet-600/20', border: 'border-purple-500/30', text: 'text-purple-400' },
  'Funk': { bg: 'from-orange-500/20 to-yellow-500/20', border: 'border-orange-500/30', text: 'text-orange-400' },
  'Pop': { bg: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-500/30', text: 'text-pink-400' },
  'Country': { bg: 'from-amber-600/20 to-yellow-600/20', border: 'border-amber-500/30', text: 'text-amber-400' },
  'Reggae': { bg: 'from-green-600/20 to-emerald-600/20', border: 'border-green-500/30', text: 'text-green-400' },
  'Classical': { bg: 'from-slate-500/20 to-gray-500/20', border: 'border-slate-400/30', text: 'text-slate-300' },
  'default': { bg: 'from-gold/10 to-amber-500/10', border: 'border-gold/30', text: 'text-gold' }
};

const getGenreColors = (genre?: string | null) => {
  if (!genre) return genreColors['default'];
  return genreColors[genre] || genreColors['default'];
};

function AccountSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <Skeleton className="h-6 w-48 bg-gray-800" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16 bg-gray-800" />
            <Skeleton className="h-4 w-40 bg-gray-800" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20 bg-gray-800" />
            <Skeleton className="h-4 w-24 bg-gray-800" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <Skeleton className="h-6 w-40 bg-gray-800" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-12 bg-gray-800" />
            <Skeleton className="h-6 w-20 bg-gray-800 rounded-full" />
          </div>
          <Skeleton className="h-10 w-full bg-gray-800" />
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-40 bg-gray-800" />
            <Skeleton className="h-5 w-12 bg-gray-800 rounded-full" />
          </div>
          <Skeleton className="h-4 w-64 bg-gray-800" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32 bg-gray-700" />
                  <Skeleton className="h-4 w-48 bg-gray-700" />
                  <Skeleton className="h-5 w-16 bg-gray-700 rounded-full" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-9 bg-gray-700 rounded" />
                  <Skeleton className="h-9 w-9 bg-gray-700 rounded" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function EmptyProgressions() {
  const [, navigate] = useLocation();
  
  return (
    <div className="text-center py-10">
      <div className="relative mx-auto w-24 h-24 mb-4">
        <div className="absolute inset-0 bg-gold/10 rounded-full animate-pulse" />
        <div className="absolute inset-2 bg-gold/5 rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Dices className="w-12 h-12 text-gold/50" />
        </div>
        <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-gold animate-bounce" style={{ animationDelay: '0.5s' }} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">No Saved Progressions</h3>
      <p className="text-gray-400 mb-4 max-w-xs mx-auto">
        Roll the dice to generate epic chord progressions, then save your favorites here!
      </p>
      <Button 
        onClick={() => navigate('/')}
        className="bg-gold hover:bg-gold/90 text-black"
        data-testid="button-start-rolling"
      >
        <Dices className="w-4 h-4 mr-2" />
        Start Rolling
      </Button>
    </div>
  );
}

export default function AccountPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedProgression, setSelectedProgression] = useState<ChordProgression | null>(null);

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

  const handleReplayProgression = (progression: ChordProgression) => {
    setSelectedProgression(progression);
  };

  const closeReplayModal = () => {
    setSelectedProgression(null);
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
          <AccountSkeleton />
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
                    {progressions.map((progression, index) => {
                      const colors = getGenreColors(progression.genre);
                      return (
                        <div 
                          key={progression.id}
                          className={`group relative p-4 bg-gradient-to-r ${colors.bg} rounded-xl border ${colors.border} transition-all duration-300 hover:scale-[1.01] hover:shadow-lg`}
                          data-testid={`progression-item-${progression.id}`}
                          style={{ 
                            animationDelay: `${index * 50}ms`,
                            animation: 'fadeInUp 0.4s ease-out forwards'
                          }}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <Music className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                                <h4 className="font-semibold text-white truncate">
                                  {progression.name || 'Untitled Progression'}
                                </h4>
                              </div>
                              
                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {Array.isArray(progression.chords) && 
                                  (progression.chords as string[]).map((chord, i) => (
                                    <span 
                                      key={i}
                                      className="px-2 py-0.5 bg-black/30 rounded text-sm text-white/90 font-mono"
                                    >
                                      {chord}
                                    </span>
                                  ))
                                }
                              </div>
                              
                              {progression.genre && (
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${colors.border} ${colors.text} bg-black/20`}
                                >
                                  {progression.genre}
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleReplayProgression(progression)}
                                className={`${colors.text} hover:bg-white/10 transition-colors`}
                                data-testid={`button-replay-progression-${progression.id}`}
                                title="Replay Progression"
                              >
                                <Play className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteProgression(progression.id)}
                                disabled={deletingId === progression.id}
                                className="text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors"
                                data-testid={`button-delete-progression-${progression.id}`}
                                title="Delete Progression"
                              >
                                {deletingId === progression.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyProgressions />
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

      {selectedProgression && (
        <RiffModal
          isOpen={!!selectedProgression}
          onClose={closeReplayModal}
          progression={Array.isArray(selectedProgression.chords) ? selectedProgression.chords as string[] : []}
          genre={selectedProgression.genre || undefined}
        />
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
