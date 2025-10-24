import { useState } from "react";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, Music, Guitar, Zap, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/contexts/AuthContext";
import { apiRequest } from "@/lib/queryClient";
import { trackEvent } from "@/lib/analytics";

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SubscriptionModal({ open, onOpenChange }: SubscriptionModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuthContext();
  const [, setLocation] = useLocation();

  const handleUpgrade = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to upgrade to Premium.",
      });
      onOpenChange(false);
      // Navigate to account/login page
      setLocation('/account');
      return;
    }

    setIsLoading(true);
    try {
      trackEvent('begin_checkout', 'Subscription', 'Premium $4.99/month', 4.99);
      
      const response = await apiRequest('POST', '/api/subscription/create-checkout', {});
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create checkout session');
      }
      
      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error: any) {
      console.error('Subscription error:', error);
      toast({
        title: "Upgrade Error",
        description: error.message || "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Music className="h-5 w-5" />,
      title: "Advanced Scale Guide",
      description: "Access to Minor Pentatonic, Blues, Dorian, Mixolydian, and more scales"
    },
    {
      icon: <Guitar className="h-5 w-5" />,
      title: "Advanced 4-Dice Mode", 
      description: "Time signature and playing style dice for complex compositions"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Audio Chord Samples",
      description: "Listen to generated chords with high-quality audio playback"
    },
    {
      icon: <Crown className="h-5 w-5" />,
      title: "Unlimited Favorites",
      description: "Save unlimited chord progressions and build your personal library"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto max-h-[90vh] overflow-y-auto" data-testid="subscription-modal">
        <DialogHeader className="pb-2">
          <DialogTitle className="flex items-center justify-center gap-2 text-lg">
            <Crown className="h-5 w-5 text-primary" />
            Upgrade to Premium
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* Pricing Card */}
          <Card className="border-primary/20">
            <CardHeader className="text-center py-4">
              <CardTitle className="flex items-center justify-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                  <Crown className="mr-1 h-3 w-3" />
                  Premium
                </Badge>
              </CardTitle>
              <div className="text-2xl font-bold text-primary">$4.99</div>
              <CardDescription className="text-xs">per month</CardDescription>
            </CardHeader>
          </Card>

          {/* Features List */}
          <div className="space-y-2.5">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2.5">
                <div className="bg-primary/10 p-1.5 rounded-full flex-shrink-0">
                  <div className="h-4 w-4">{feature.icon}</div>
                </div>
                <div>
                  <h4 className="font-medium text-sm leading-tight">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground leading-snug">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Upgrade Button */}
          <Button 
            onClick={handleUpgrade} 
            className="w-full h-10" 
            disabled={isLoading}
            data-testid="button-upgrade-premium"
          >
            {isLoading ? (
              <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2" />
            ) : !isAuthenticated ? (
              <LogIn className="mr-2 h-4 w-4" />
            ) : (
              <Crown className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Processing..." : !isAuthenticated ? "Log In to Upgrade" : "Upgrade Now"}
          </Button>

          <div className="text-center pt-1">
            <p className="text-xs text-muted-foreground leading-tight">
              Cancel anytime • No commitment
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}