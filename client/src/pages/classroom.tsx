import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lock, ChevronRight, ChevronLeft, Crown, BookOpen, GraduationCap, Trophy, Music, Zap, Flame, Guitar as GuitarIcon, Home, Star, Sparkles } from 'lucide-react';
import { generalBeginnerLessons, rockLessons, metalLessons, bluesLessons, jazzLessons, funkLessons, Lesson } from '@/lib/comprehensive-lessons';
import { useSubscription } from '@/hooks/useSubscription';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FretboardDisplay from '@/components/fretboard-display';

export default function Classroom() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentSubsectionIndex, setCurrentSubsectionIndex] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { hasActiveSubscription } = useSubscription();

  // Fetch user preferences for personalized recommendations
  const { data: preferences } = useQuery<{
    preferredGenre?: string;
    playingStyle?: string;
    skillLevel?: string;
    hasCompletedOnboarding: boolean;
  }>({
    queryKey: ["/api/preferences"],
    retry: false,
  });

  // Map user skill level to lesson difficulties
  const getPreferredDifficulties = (skillLevel?: string): string[] => {
    if (!skillLevel) return ['beginner', 'intermediate', 'advanced', 'mastery'];
    
    switch (skillLevel) {
      case 'entry':
        return ['beginner'];
      case 'intermediate':
        return ['beginner', 'intermediate'];
      case 'advanced':
        return ['intermediate', 'advanced'];
      case 'master':
        return ['advanced', 'mastery'];
      default:
        return ['beginner', 'intermediate', 'advanced', 'mastery'];
    }
  };

  // Get recommended lessons based on user preferences
  const recommendedLessons = useMemo(() => {
    if (!preferences) return [];

    const allLessons = [
      ...generalBeginnerLessons,
      ...rockLessons,
      ...metalLessons,
      ...bluesLessons,
      ...jazzLessons,
      ...funkLessons,
    ];

    const preferredDifficulties = getPreferredDifficulties(preferences.skillLevel);
    
    // Filter lessons by skill level and optionally by genre
    let filtered = allLessons.filter(lesson => 
      preferredDifficulties.includes(lesson.difficulty)
    );

    // Prioritize lessons matching preferred genre
    if (preferences.preferredGenre) {
      const genreKeywords: Record<string, string[]> = {
        'metal': ['metal', 'shred', 'power', 'thrash', 'gallop'],
        'black-metal': ['metal', 'tremolo', 'atmospheric', 'blast'],
        'death-metal': ['metal', 'brutal', 'technical', 'growl'],
        'extreme-metal': ['metal', 'speed', 'precision', 'aggressive'],
        'rock': ['rock', 'power chord', 'classic', 'riff'],
        'blues': ['blues', 'bend', '12-bar', 'shuffle'],
        'jazz': ['jazz', 'chord', 'improvisation', 'theory'],
        'funk': ['funk', 'groove', 'rhythm', 'slap'],
        'folk': ['folk', 'acoustic', 'fingerstyle', 'traditional'],
        'flamenco': ['flamenco', 'spanish', 'classical'],
        'neo-classical': ['classical', 'arpeggio', 'sweep'],
      };

      // Normalize to lowercase to handle legacy capitalized values
      let normalizedGenre = preferences.preferredGenre.toLowerCase();
      
      // Remap legacy renamed genres
      const legacyRemap: Record<string, string> = {
        'classical': 'neo-classical',
        'country': 'folk'
      };
      normalizedGenre = legacyRemap[normalizedGenre] || normalizedGenre;
      
      const keywords = genreKeywords[normalizedGenre] || [];
      
      filtered = filtered.sort((a, b) => {
        const aScore = keywords.some(k => 
          a.title.toLowerCase().includes(k) || 
          a.description.toLowerCase().includes(k)
        ) ? 1 : 0;
        const bScore = keywords.some(k => 
          b.title.toLowerCase().includes(k) || 
          b.description.toLowerCase().includes(k)
        ) ? 1 : 0;
        return bScore - aScore;
      });
    }

    // Return top 6 recommendations
    return filtered.slice(0, 6);
  }, [preferences]);

  const handleLessonClick = (lesson: Lesson, isFree: boolean) => {
    // First 2 lessons in each category are free
    if (!isFree && !hasActiveSubscription) {
      setShowUpgradeModal(true);
      return;
    }
    setSelectedLesson(lesson);
    setCurrentSubsectionIndex(0);
  };

  const handleNext = () => {
    if (selectedLesson && currentSubsectionIndex < selectedLesson.subsections.length - 1) {
      setCurrentSubsectionIndex(currentSubsectionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSubsectionIndex > 0) {
      setCurrentSubsectionIndex(currentSubsectionIndex - 1);
    }
  };

  const handleComplete = () => {
    setSelectedLesson(null);
    setCurrentSubsectionIndex(0);
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return <BookOpen className="h-4 w-4" />;
      case 'intermediate':
        return <GraduationCap className="h-4 w-4" />;
      case 'advanced':
      case 'mastery':
        return <Trophy className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'advanced':
      case 'mastery':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getGenreIcon = (genre: string) => {
    switch (genre) {
      case 'general':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'rock':
        return <GuitarIcon className="h-5 w-5 text-orange-500" />;
      case 'metal':
        return <Flame className="h-5 w-5 text-red-500" />;
      case 'blues':
        return <Music className="h-5 w-5 text-purple-500" />;
      case 'jazz':
        return <Zap className="h-5 w-5 text-yellow-500" />;
      case 'funk':
        return <Zap className="h-5 w-5 text-green-500" />;
      default:
        return <Music className="h-5 w-5 text-primary" />;
    }
  };

  const getGenreDescription = (genre: string) => {
    switch (genre) {
      case 'general':
        return 'Essential guitar fundamentals for beginners';
      case 'rock':
        return 'Power chords, palm muting, and rock techniques';
      case 'metal':
        return 'Speed, precision, and aggressive playing styles';
      case 'blues':
        return 'Bending, 12-bar blues, and soulful expression';
      case 'jazz':
        return 'Complex chords, improvisation, and theory';
      case 'funk':
        return 'Rhythm, groove, and percussive techniques';
      default:
        return 'Learn guitar techniques';
    }
  };

  const renderLessonCards = (lessons: Lesson[]) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lessons.map((lesson, index) => {
          const isFree = index <= 1; // First 2 lessons are free
          return (
            <Card
              key={lesson.id}
              className={`p-4 cursor-pointer transition-all hover:border-primary/50 ${
                !isFree && !hasActiveSubscription ? 'opacity-75' : ''
              }`}
              onClick={() => handleLessonClick(lesson, isFree)}
              data-testid={`card-lesson-${lesson.id}`}
            >
              <div className="flex items-start justify-between mb-3">
                <Badge className={getDifficultyColor(lesson.difficulty)}>
                  {getDifficultyIcon(lesson.difficulty)}
                  <span className="ml-1 capitalize">{lesson.difficulty}</span>
                </Badge>
                {!isFree && !hasActiveSubscription && (
                  <Lock className="h-4 w-4 text-muted-foreground" data-testid={`icon-locked-${lesson.id}`} />
                )}
                {isFree && (
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                    FREE
                  </Badge>
                )}
              </div>

              <h3 className="font-semibold mb-2 line-clamp-2">{lesson.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{lesson.description}</p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{lesson.subsections.length} sections</span>
                {!isFree && !hasActiveSubscription && (
                  <span className="flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    Premium
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    );
  };

  if (selectedLesson) {
    const currentSubsection = selectedLesson.subsections[currentSubsectionIndex];
    const isLastSubsection = currentSubsectionIndex === selectedLesson.subsections.length - 1;

    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedLesson(null);
              setCurrentSubsectionIndex(0);
            }}
            className="mb-4"
            data-testid="button-back-to-lessons"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Lessons
          </Button>

          <Card className="p-6 bg-card border-border">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getDifficultyColor(selectedLesson.difficulty)}>
                  {getDifficultyIcon(selectedLesson.difficulty)}
                  <span className="ml-1 capitalize">{selectedLesson.difficulty}</span>
                </Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{selectedLesson.title}</h1>
              <p className="text-muted-foreground">{selectedLesson.description}</p>
            </div>

            {/* Progress indicator */}
            <div className="flex gap-2 mb-6">
              {selectedLesson.subsections.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    index <= currentSubsectionIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                  data-testid={`progress-segment-${index}`}
                />
              ))}
            </div>

            {/* Fretboard Patterns */}
            {selectedLesson.fretboardPatterns && selectedLesson.fretboardPatterns.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Music className="h-5 w-5 text-primary" />
                  Fretboard Patterns
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedLesson.fretboardPatterns.map((pattern, index) => (
                    <FretboardDisplay
                      key={index}
                      chordDiagram={{
                        name: pattern.name,
                        positions: pattern.positions as (number | 'X')[],
                        fingers: pattern.fingers?.map(f => f ?? 0) || []
                      }}
                      chordName={pattern.name}
                      showLegend={index === 0}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Scales */}
            {selectedLesson.scales && selectedLesson.scales.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Related Scales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedLesson.scales.map((scale, index) => (
                    <Card key={index} className="p-4 bg-muted/50">
                      <h4 className="font-semibold mb-2">{scale.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">Pattern: {scale.pattern}</p>
                      {scale.notes && scale.notes.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                          {scale.notes.map((note, noteIndex) => (
                            <Badge key={noteIndex} variant="outline" className="text-xs">
                              {note}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Subsection content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3" data-testid="text-subsection-title">
                  {currentSubsection.title}
                </h2>
                <p className="text-foreground leading-relaxed mb-4" data-testid="text-subsection-content">
                  {currentSubsection.content}
                </p>
              </div>

              {currentSubsection.technique && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h3 className="font-semibold text-primary mb-2">Technique</h3>
                  <p className="text-sm text-foreground">{currentSubsection.technique}</p>
                </div>
              )}

              {currentSubsection.tips && currentSubsection.tips.length > 0 && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Pro Tips</h3>
                  <ul className="space-y-2">
                    {currentSubsection.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSubsectionIndex === 0}
                data-testid="button-previous-subsection"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {isLastSubsection ? (
                <Button onClick={handleComplete} data-testid="button-complete-lesson">
                  Complete Lesson
                </Button>
              ) : (
                <Button onClick={handleNext} data-testid="button-next-subsection">
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-4"
            data-testid="button-home"
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Guitar Classroom</h1>
          <p className="text-muted-foreground">
            Master guitar techniques organized by genre. First lesson in each category is free!
          </p>
        </div>

        {/* Recommended For You Section */}
        {preferences && recommendedLessons.length > 0 && (
          <div className="mb-8 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Recommended For You</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Based on your {preferences.skillLevel} skill level
              {preferences.preferredGenre && ` and love for ${preferences.preferredGenre}`}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedLessons.map((lesson, index) => {
                const isFree = index === 0; // Only first recommended lesson is guaranteed free
                return (
                  <Card
                    key={lesson.id}
                    className={`p-4 cursor-pointer transition-all hover:border-primary/50 bg-card ${
                      !isFree && !hasActiveSubscription ? 'opacity-75' : ''
                    }`}
                    onClick={() => handleLessonClick(lesson, isFree)}
                    data-testid={`card-recommended-${lesson.id}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={getDifficultyColor(lesson.difficulty)}>
                        {getDifficultyIcon(lesson.difficulty)}
                        <span className="ml-1 capitalize">{lesson.difficulty}</span>
                      </Badge>
                      {!isFree && !hasActiveSubscription && (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      )}
                      {isFree && (
                        <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                          FREE
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-semibold mb-2 line-clamp-2">{lesson.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{lesson.description}</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{lesson.subsections.length} sections</span>
                      {!isFree && !hasActiveSubscription && (
                        <span className="flex items-center gap-1">
                          <Crown className="h-3 w-3" />
                          Premium
                        </span>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Genre-based collapsible sections */}
        <Accordion type="multiple" defaultValue={['general', 'rock', 'metal', 'blues', 'jazz', 'funk']} className="space-y-4">
          <AccordionItem value="general" className="border border-border rounded-lg px-6 bg-card/50">
            <AccordionTrigger className="hover:no-underline" data-testid="accordion-general">
              <div className="flex items-center gap-3">
                {getGenreIcon('general')}
                <div className="text-left">
                  <h2 className="text-xl font-bold">Beginner Basics</h2>
                  <p className="text-sm text-muted-foreground">{generalBeginnerLessons.length} lessons - {getGenreDescription('general')}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-6">
              {renderLessonCards(generalBeginnerLessons)}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rock" className="border border-border rounded-lg px-6 bg-card/50">
            <AccordionTrigger className="hover:no-underline" data-testid="accordion-rock">
              <div className="flex items-center gap-3">
                {getGenreIcon('rock')}
                <div className="text-left">
                  <h2 className="text-xl font-bold">Rock</h2>
                  <p className="text-sm text-muted-foreground">{rockLessons.length} lessons - {getGenreDescription('rock')}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-6">
              {renderLessonCards(rockLessons)}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="metal" className="border border-border rounded-lg px-6 bg-card/50">
            <AccordionTrigger className="hover:no-underline" data-testid="accordion-metal">
              <div className="flex items-center gap-3">
                {getGenreIcon('metal')}
                <div className="text-left">
                  <h2 className="text-xl font-bold">Metal</h2>
                  <p className="text-sm text-muted-foreground">{metalLessons.length} lessons - {getGenreDescription('metal')}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-6">
              {renderLessonCards(metalLessons)}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="blues" className="border border-border rounded-lg px-6 bg-card/50">
            <AccordionTrigger className="hover:no-underline" data-testid="accordion-blues">
              <div className="flex items-center gap-3">
                {getGenreIcon('blues')}
                <div className="text-left">
                  <h2 className="text-xl font-bold">Blues</h2>
                  <p className="text-sm text-muted-foreground">{bluesLessons.length} lessons - {getGenreDescription('blues')}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-6">
              {renderLessonCards(bluesLessons)}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="jazz" className="border border-border rounded-lg px-6 bg-card/50">
            <AccordionTrigger className="hover:no-underline" data-testid="accordion-jazz">
              <div className="flex items-center gap-3">
                {getGenreIcon('jazz')}
                <div className="text-left">
                  <h2 className="text-xl font-bold">Jazz</h2>
                  <p className="text-sm text-muted-foreground">{jazzLessons.length} lessons - {getGenreDescription('jazz')}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-6">
              {renderLessonCards(jazzLessons)}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="funk" className="border border-border rounded-lg px-6 bg-card/50">
            <AccordionTrigger className="hover:no-underline" data-testid="accordion-funk">
              <div className="flex items-center gap-3">
                {getGenreIcon('funk')}
                <div className="text-left">
                  <h2 className="text-xl font-bold">Funk</h2>
                  <p className="text-sm text-muted-foreground">{funkLessons.length} lessons - {getGenreDescription('funk')}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-6">
              {renderLessonCards(funkLessons)}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Upgrade modal */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent data-testid="dialog-upgrade">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              Premium Feature
            </DialogTitle>
            <DialogDescription>
              This lesson requires a Premium subscription. Upgrade to unlock all lessons and advanced techniques!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Premium Benefits:</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  Unlimited access to all lessons
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  Advanced techniques and exercises
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  Unlimited chord progressions
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  Premium genres and features
                </li>
              </ul>
            </div>
            <Button className="w-full" data-testid="button-upgrade-now">
              Upgrade to Premium - $4.99/month
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
