import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { Settings, Crown, User, LogOut, Users, Trash2, MoreVertical, BookOpen } from "lucide-react";
import DiceInterface from "@/components/dice-interface";
import ChordChart from "@/components/chord-chart";
import PentatonicGuide from "@/components/pentatonic-guide";
import AdvancedScaleGuide from "@/components/advanced-scale-guide";
import ScaleCombination from "@/components/scale-combination";
import RiffModal from "@/components/riff-modal";
import FretboardModal from "@/components/fretboard-modal";
import FretboardDisplay from "@/components/fretboard-display";
import SubscriptionModal from "@/components/subscription-modal";
import { OnboardingModal } from "@/components/onboarding-modal";
import { SettingsModal } from "@/components/settings-modal";
import AuthGate from "@/components/auth-gate";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/contexts/AuthContext";
import { useBackground } from "@/contexts/background-context";
import { useSubscription } from "@/hooks/useSubscription";
import { useStreak } from "@/hooks/useStreak";
import { getChordDiagram, type BridgePattern } from "@/lib/music-data";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import StreakDisplay from "@/components/streak-display";
import GearRecommendations from "@/components/gear-recommendations";

interface GeneratedResult {
  type: 'single' | 'riff';
  chord?: string;
  colorName?: string;
  progression?: string[];
  bridgePattern?: BridgePattern;
  mainChord?: string;
  supportingChord?: string;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuthContext();
  const { backgroundImages } = useBackground();
  const { hasActiveSubscription } = useSubscription();
  const { currentStreak, longestStreak, isPracticedToday, updateStreak } = useStreak();
  const { toast } = useToast();
  
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [showRiffModal, setShowRiffModal] = useState(false);
  const [showFretboardModal, setShowFretboardModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [currentChord, setCurrentChord] = useState<string>('');
  const [selectedChord, setSelectedChord] = useState<string>('');

  // Select a random background from user's preferred genre
  // Use preferredGenre as the dependency to prevent re-randomization on every render
  const backgroundImage = useMemo(() => {
    if (backgroundImages.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex];
  }, [backgroundImages.join(',')]);

  // Fetch user preferences to check if onboarding is needed
  const { data: preferences } = useQuery<{ hasCompletedOnboarding: boolean }>({
    queryKey: ["/api/preferences"],
    enabled: isAuthenticated,
    retry: false,
  });

  // Show onboarding modal for new authenticated users who haven't completed it
  useEffect(() => {
    if (isAuthenticated && !isLoading && preferences && !preferences.hasCompletedOnboarding) {
      setShowOnboardingModal(true);
    }
  }, [isAuthenticated, isLoading, preferences]);

  // Mutation to apply referral code after login
  const applyReferralMutation = useMutation({
    mutationFn: (referralCode: string) => 
      apiRequest('POST', '/api/referrals/apply', { referralCode }),
    onSuccess: () => {
      // Clear the pending referral code only after successful application
      sessionStorage.removeItem('pendingReferralCode');
      toast({
        title: "Referral code applied!",
        description: "Welcome! Your friend will get rewarded when you upgrade to Premium.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Referral code issue",
        description: error.message || "Could not apply referral code, but you can still use the app!",
        variant: "destructive",
      });
      // Keep the code in sessionStorage for potential retry
    },
  });

  // Process pending referral code after authentication
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const pendingReferralCode = sessionStorage.getItem('pendingReferralCode');
      if (pendingReferralCode && !applyReferralMutation.isPending) {
        // Apply the referral code (don't clear until success)
        applyReferralMutation.mutate(pendingReferralCode);
      }
    }
  }, [isAuthenticated, isLoading]);

  const handleDiceResult = (result: GeneratedResult) => {
    setResult(result);
    // Close any existing modals first
    setShowRiffModal(false);
    setShowFretboardModal(false);
    
    // Update practice streak when user rolls the dice
    if (isAuthenticated) {
      updateStreak();
    }
    
    if (result.type === 'riff') {
      // Small delay to ensure clean state transition
      setTimeout(() => setShowRiffModal(true), 50);
    }
  };

  // Normalize chord names to match chord diagram keys
  const normalizeChordName = (chord: string): string => {
    let normalized = chord;
    
    // Convert sharps to flats where database uses flats
    // Database has: Ab, Bb, C#, Eb, F# (mixed sharp/flat notation)
    const sharpToFlat: Record<string, string> = {
      'A#': 'Bb',  // Database uses Bb, not A#
      'D#': 'Eb',  // Database uses Eb, not D#
      'G#': 'Ab'   // Database uses Ab, not G#
      // C# and F# are kept as-is (database uses C# and F#)
    };
    
    // Replace sharp notes at the start of the chord name
    for (const [sharp, flat] of Object.entries(sharpToFlat)) {
      if (normalized.startsWith(sharp)) {
        normalized = normalized.replace(sharp, flat);
        break;
      }
    }
    
    // Fix chord symbols: + → aug, ° → dim, ø → m7b5
    normalized = normalized.replace(/\+$/, 'aug');  // B+ → Baug
    normalized = normalized.replace(/°$/, 'dim');   // G#° → G#dim (then converted to Abdim)
    normalized = normalized.replace(/ø$/, 'm7b5'); // Half-diminished
    
    // Fix suspended chords: sus → sus4 (database has sus4 and sus2, not just sus)
    normalized = normalized.replace(/sus$/, 'sus4');
    
    // Fix Major notation: Maj → maj (FMaj → Fmaj, then becomes F for major)
    normalized = normalized.replace(/Maj$/, '');  // FMaj → F (major chords have no suffix)
    
    // Fix Major 7th: M7 → maj7, M9 → maj9
    normalized = normalized.replace(/M7$/, 'maj7');
    normalized = normalized.replace(/M9$/, 'maj9');
    
    // Fix power chords: remove '5' suffix (database just has 'C', 'C#', 'Bb' not 'C5', 'C#5', 'Bb5')
    // But keep alterations like 7#5, 7b5, m7b5
    normalized = normalized.replace(/^([A-G](?:#|b)?)5$/, '$1');
    
    return normalized;
  };

  const handleChordSelect = (chord: string) => {
    setSelectedChord(chord);
    // Immediately show the fretboard when a chord is clicked
    handleShowFretboard(chord);
  };

  const handleShowFretboard = (chordName?: string) => {
    // Use the provided chord, or selected chord, or generated chord as fallback
    const rawChord = chordName || selectedChord || result?.chord || '';
    const chordToShow = normalizeChordName(rawChord);
    setCurrentChord(chordToShow);
    setShowFretboardModal(true);
  };

  // Show loading state while checking authentication (only for authenticated users)
  if (isLoading && isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Guest/Demo Mode: Allow unauthenticated users to access the dice interface
  // Auth will be prompted contextually for save/history/persistence features

  return (
    <div 
      className="bg-background text-foreground min-h-screen relative"
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      } : undefined}
    >
      {/* Background Overlay for better readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0"></div>
      {/* Dark gold accent glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-900/5 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-800/5 blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <i className="fas fa-music text-primary text-xl"></i>
                <h1 className="text-lg font-semibold text-foreground">Guitar Dice</h1>
              </div>
              <p className="text-[10px] sm:text-xs italic font-medium mt-0.5 ml-8" 
                style={{ 
                  color: '#D4AF37',
                  textShadow: '0 0 8px rgba(212, 175, 55, 0.3)'
                }}>
                Roll the Dice, Rock the Riffs, Write the Hits!
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Practice Streak Badge */}
              {isAuthenticated && currentStreak > 0 && (
                <StreakDisplay 
                  currentStreak={currentStreak}
                  longestStreak={longestStreak}
                  isPracticedToday={isPracticedToday}
                  compact={true}
                />
              )}
              
              {/* Subscription Status Badge */}
              {isAuthenticated && (
                <Badge 
                  variant={hasActiveSubscription ? "default" : "secondary"}
                  className={hasActiveSubscription ? "bg-primary text-primary-foreground" : ""}
                >
                  {hasActiveSubscription ? (
                    <>
                      <Crown className="mr-1 h-3 w-3" />
                      Premium
                    </>
                  ) : (
                    "Free"
                  )}
                </Badge>
              )}
              
              {/* Auth Actions */}
              {isLoading ? (
                <div className="animate-spin w-5 h-5 border-2 border-muted border-t-primary rounded-full" />
              ) : isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  {user && (
                    <div className="flex items-center space-x-2">
                      {user.profileImageUrl && (
                        <img 
                          src={user.profileImageUrl} 
                          alt="Profile" 
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      )}
                      <span className="text-sm font-medium text-foreground hidden sm:inline" data-testid="text-username">
                        {user.firstName || user.username || user.email?.split('@')[0] || 'User'}
                      </span>
                    </div>
                  )}
                  
                  {/* User Menu Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-2 h-auto"
                        data-testid="button-user-menu"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem 
                        onClick={() => setLocation('/delete-account')}
                        className="text-red-600 focus:text-red-600 cursor-pointer"
                        data-testid="menu-delete-account"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => window.location.href = '/api/logout'}
                        className="cursor-pointer"
                        data-testid="menu-logout"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => window.location.href = '/api/login'}
                  className="p-2 h-auto"
                  data-testid="button-login"
                >
                  <User className="h-4 w-4" />
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 h-auto"
                onClick={() => setShowSettingsModal(true)}
                data-testid="button-settings"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Dice Interface */}
        <DiceInterface 
          onResult={handleDiceResult} 
          onUpgrade={() => setShowSubscriptionModal(true)} 
        />

        {/* Result Display - 3-Dice Bridge System */}
        {result && result.type === 'single' && result.bridgePattern && result.mainChord && result.supportingChord && (
          <div className="bg-card rounded-lg p-6 border border-border animate-fade-in" data-testid="result-display">
            <h3 className="text-lg font-semibold mb-4">3-Dice Bridge System Result</h3>
            
            {/* 3-Dice Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {/* Dice 1: Main Chord */}
              <div className="bg-purple-600/10 border border-purple-600/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Dice 1: Main Chord</div>
                <div className="text-xl font-bold text-purple-600">{result.mainChord}</div>
              </div>
              
              {/* Dice 2: Bridge Pattern */}
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Dice 2: Bridge</div>
                <div className="text-lg font-bold text-primary mb-1">{result.bridgePattern.name}</div>
                <div className="text-xs text-muted-foreground">{result.bridgePattern.description}</div>
              </div>
              
              {/* Dice 3: Supporting Chord */}
              <div className="bg-orange-600/10 border border-orange-600/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Dice 3: Supporting</div>
                <div className="text-xl font-bold text-orange-600">{result.supportingChord}</div>
              </div>
            </div>

            {/* Fretboard Displays - Dice 1 and Dice 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Dice 1 Fretboard */}
              <div>
                <div className="text-sm font-semibold text-purple-600 mb-2">Dice 1: {result.mainChord}</div>
                <FretboardDisplay
                  chordDiagram={getChordDiagram(normalizeChordName(result.mainChord))}
                  chordName={result.mainChord}
                  showLegend={false}
                />
              </div>
              
              {/* Dice 3 Fretboard */}
              <div>
                <div className="text-sm font-semibold text-orange-600 mb-2">Dice 3: {result.supportingChord}</div>
                <FretboardDisplay
                  chordDiagram={getChordDiagram(normalizeChordName(result.supportingChord))}
                  chordName={result.supportingChord}
                  showLegend={false}
                />
              </div>
            </div>

            {/* Bridge Pattern Details */}
            {result.bridgePattern.notes.length > 0 && result.bridgePattern.notes.length <= 7 && (
              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                <strong>Bridge Scale Notes:</strong> {result.bridgePattern.notes.join(', ')}
              </div>
            )}
            {result.bridgePattern.fretboardPattern && (
              <div className="mt-2 text-sm text-muted-foreground">
                <strong>How to connect:</strong> {result.bridgePattern.fretboardPattern}
              </div>
            )}
          </div>
        )}

        {/* Gear Recommendations - Shown after generating chords */}
        {result && (
          <GearRecommendations 
            context="any"
            compact={false}
            maxItems={2}
          />
        )}

        {/* Chord Chart */}
        <ChordChart onChordSelect={handleChordSelect} />

        {/* Scale Guide - Premium or Basic */}
        <AdvancedScaleGuide onUpgrade={() => setShowSubscriptionModal(true)} />

        {/* Scale Combinations - Premium Feature */}
        <ScaleCombination onUpgrade={() => setShowSubscriptionModal(true)} />

        {/* Quick Actions */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Guitar Classroom - Free & Premium */}
            <Link href="/classroom">
              <Button 
                variant="secondary" 
                className="w-full py-3 px-4 hover:bg-accent hover:text-accent-foreground transition-all transform active:scale-95"
                data-testid="button-classroom"
              >
                <BookOpen className="mr-2 h-4 w-4" />Classroom
              </Button>
            </Link>
            
            {/* Tapping Practice - Premium Only */}
            {hasActiveSubscription && (
              <Link href="/tapping">
                <Button 
                  variant="secondary" 
                  className="w-full py-3 px-4 hover:bg-accent hover:text-accent-foreground transition-all transform active:scale-95"
                  data-testid="button-tapping"
                >
                  <Crown className="mr-2 h-4 w-4 text-amber-500" />Tapping
                </Button>
              </Link>
            )}
            {/* Compatible Scales - Premium Only */}
            {hasActiveSubscription && (
              <Link href="/scales">
                <Button 
                  variant="secondary" 
                  className="w-full py-3 px-4 hover:bg-accent hover:text-accent-foreground transition-all transform active:scale-95"
                  data-testid="button-scales"
                >
                  <Crown className="mr-2 h-4 w-4 text-amber-500" />Scales
                </Button>
              </Link>
            )}
            {/* Guitar Exercises - Premium Only */}
            {hasActiveSubscription && (
              <Link href="/exercises">
                <Button 
                  variant="secondary" 
                  className="w-full py-3 px-4 hover:bg-accent hover:text-accent-foreground transition-all transform active:scale-95"
                  data-testid="button-exercises"
                >
                  <Crown className="mr-2 h-4 w-4 text-amber-500" />Exercises
                </Button>
              </Link>
            )}
            <Button 
              variant="secondary" 
              className="w-full py-3 px-4 hover:bg-accent hover:text-accent-foreground transition-all transform active:scale-95"
              data-testid="button-referrals"
              onClick={() => setLocation('/referrals')}
            >
              <Users className="mr-2 h-4 w-4" />Referrals
            </Button>
            <Button 
              variant="secondary" 
              className="py-3 px-4 hover:bg-accent hover:text-accent-foreground transition-all transform active:scale-95"
              data-testid="button-history"
            >
              <i className="fas fa-history mr-2"></i>History
            </Button>
            <Button 
              variant="secondary" 
              className="py-3 px-4 hover:bg-accent hover:text-accent-foreground transition-all transform active:scale-95"
              data-testid="button-favorites"
            >
              <i className="fas fa-heart mr-2"></i>Favorites
            </Button>
            <Button 
              variant="secondary" 
              className="py-3 px-4 hover:bg-accent hover:text-accent-foreground transition-all transform active:scale-95"
              data-testid="button-share"
            >
              <i className="fas fa-share-alt mr-2"></i>Share
            </Button>
          </div>
        </div>
      </div>

      {/* Riff Modal */}
      {result && result.type === 'riff' && (
        <RiffModal 
          isOpen={showRiffModal}
          onClose={() => setShowRiffModal(false)}
          progression={result.progression || []}
          onShowFretboard={handleShowFretboard}
          bridgePattern={result.bridgePattern}
          mainChord={result.mainChord}
          supportingChord={result.supportingChord}
        />
      )}

      {/* Fretboard Modal */}
      <FretboardModal
        isOpen={showFretboardModal}
        onClose={() => setShowFretboardModal(false)}
        chordDiagram={getChordDiagram(currentChord)}
        chordName={currentChord}
      />

        {/* Subscription Modal */}
        <SubscriptionModal
          open={showSubscriptionModal}
          onOpenChange={setShowSubscriptionModal}
        />

        {/* Onboarding Modal */}
        <OnboardingModal
          open={showOnboardingModal}
          onComplete={() => {
            setShowOnboardingModal(false);
            // Refresh preferences data
            queryClient.invalidateQueries({ queryKey: ["/api/preferences"] });
          }}
        />

        {/* Settings Modal */}
        <SettingsModal
          open={showSettingsModal}
          onOpenChange={setShowSettingsModal}
        />
      </div>
    </div>
  );
}
