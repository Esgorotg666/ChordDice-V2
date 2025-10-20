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
      <DialogContent className="w-[90vw] max-w-md p-0 overflow-hidden border-2 border-[#D4AF37]/30 bg-black" data-testid="auth-gate-modal">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Header Section */}
        <div className="relative bg-gradient-to-br from-black via-zinc-950 to-black border-b border-[#D4AF37]/20 p-8">
          <DialogHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-lg blur-xl animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-zinc-900 to-black border-2 border-[#D4AF37] p-4 rounded-lg shadow-xl shadow-[#D4AF37]/20">
                  <Music className="h-12 w-12 text-[#D4AF37]" />
                </div>
              </div>
            </div>
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] via-yellow-400 to-[#D4AF37] bg-clip-text text-transparent">
              Guitar Dice
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-base">
              Create epic chord progressions with virtual dice
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content Section */}
        <div className="relative p-8 space-y-5 bg-gradient-to-b from-zinc-950 to-black">
          {/* Sign Up Button */}
          <Button 
            className="w-full py-7 text-lg font-bold bg-gradient-to-r from-[#D4AF37] to-yellow-600 hover:from-yellow-600 hover:to-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/40 hover:scale-105" 
            onClick={handleSignUp}
            disabled={isSigningUp}
            data-testid="button-sign-up"
          >
            {isSigningUp ? (
              <>
                <div className="animate-spin w-5 h-5 border-3 border-black/20 border-t-black rounded-full mr-2" />
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
            className="w-full py-7 text-lg font-bold border-2 border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] hover:scale-105 transition-all duration-300 bg-black/50 backdrop-blur-sm shadow-md"
            onClick={() => setLocation('/login')}
            data-testid="button-login"
          >
            Sign In
          </Button>

          {/* Tagline */}
          <p className="text-center text-zinc-600 text-sm pt-2">
            Free tier • Roll the dice for killer riffs
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
