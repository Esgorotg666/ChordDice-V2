import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";

interface AuthGateProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function AuthGate({ isOpen, onClose }: AuthGateProps) {
  const [, setLocation] = useLocation();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  // Check URL for referral code
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      setReferralCode(refCode.toUpperCase());
    }
  }, []);

  const handleSignUp = () => {
    setIsSigningUp(true);
    // If there's a referral code, store it in sessionStorage for processing after login
    if (referralCode.trim()) {
      sessionStorage.setItem('pendingReferralCode', referralCode.trim().toUpperCase());
    }
    // Navigate to signup page using SPA routing
    setLocation('/signup');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-sm p-0 overflow-hidden border border-red-900/50" data-testid="auth-gate-modal">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-red-700 to-red-900 text-white p-6">
          <DialogHeader className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-black/40 border border-red-800 p-3">
                <Music className="h-10 w-10" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold">
              Chord Dice
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/90">
              Sign in to start creating chord progressions
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content Section - No scrolling */}
        <div className="p-6 space-y-4">
          {/* Sign Up Button */}
          <Button 
            className="w-full py-6 text-lg font-semibold" 
            onClick={handleSignUp}
            disabled={isSigningUp}
            data-testid="button-sign-up"
          >
            {isSigningUp ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white/20 border-t-white rounded-full mr-2" />
                Redirecting...
              </>
            ) : (
              <>
                <Music className="mr-2 h-5 w-5" />
                Create Account
              </>
            )}
          </Button>
          
          {/* Sign In Button */}
          <Button 
            variant="outline" 
            className="w-full py-6 text-lg font-semibold"
            onClick={() => setLocation('/login')}
            data-testid="button-login"
          >
            Sign In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}