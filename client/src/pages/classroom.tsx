import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lock, ChevronRight, ChevronLeft, Crown, BookOpen, GraduationCap, Trophy, Music, Zap, Flame, Guitar as GuitarIcon, Home, Star, Sparkles, Target, TrendingUp, Award } from 'lucide-react';
import { generalBeginnerLessons, rockLessons, metalLessons, bluesLessons, jazzLessons, funkLessons, Lesson } from '@/lib/comprehensive-lessons';
import { useSubscription } from '@/hooks/useSubscription';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FretboardDisplay from '@/components/fretboard-display';
import GearRecommendations from '@/components/gear-recommendations';

export default function Classroom() {
  const [selectedLesson, setSelectedLesson] = useState<LessonWithSkillLevel | null>(null);
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

  // Skill level descriptions
  const skillLevelDescriptions = {
    beginner: 'Foundational stage. Focus on basic open chords (e.g., E minor, A minor, C major), simple strumming patterns, reading tablature or basic notation, and tuning the instrument. Goals include playing simple songs (e.g., folk tunes) without buzzing strings; theory is minimal (e.g., understanding frets and strings).',
    novice: 'Early consolidation. Builds on basics with power chords, basic barre chords (e.g., F major), alternate picking, simple scales (e.g., minor pentatonic in one position), and fingerstyle patterns. Can play full songs with chord progressions; introduces music theory like key signatures and basic rhythm reading.',
    intermediate: 'Expanding versatility. Incorporates full barre chord shapes across the fretboard, modes (e.g., Dorian, Mixolydian), arpeggios, hybrid picking, bending/vibrato techniques, and genre-specific styles (e.g., blues shuffle or basic fingerpicking). Repertoire includes intermediate pieces (e.g., "Stairway to Heaven" solo intro); theory covers chord construction, intervals, and transposition.',
    advanced: 'Technical and musical refinement. Mastery of complex techniques like sweep picking, economy picking, tapping, advanced fingerstyle (e.g., Travis picking), modal interchange, and odd time signatures. Can improvise fluently over changes, arrange pieces, and perform in ensembles; deep theory knowledge (e.g., functional harmony, voice leading) enables composition.',
    expert: 'Professional-level execution. Virtuosic command of all techniques, seamless genre blending (e.g., fusion, classical, jazz), recording/production skills, and pedagogical ability. Repertoire spans originals and standards at concert level; theory application is intuitive for real-time analysis and innovation.',
    master: 'Pinnacle of artistry. Transcendent musicianship with innovative contributions (e.g., new techniques or influential albums), effortless adaptation to any context, and profound expressiveness. Icons like Andrés Segovia (classical), Jimi Hendrix (rock), or Paco de Lucía (flamenco) exemplify this; involves legacy-building through teaching, recording, or performance that shapes the instrument\'s evolution.'
  };

  // Extended lesson type with display difficulty
  type LessonWithSkillLevel = Lesson & { displayDifficulty: string };

  // Organize all lessons by skill level
  const allLessons = useMemo(() => [
    ...generalBeginnerLessons,
    ...rockLessons,
    ...metalLessons,
    ...bluesLessons,
    ...jazzLessons,
    ...funkLessons,
  ], []);

  const beginnerLessons = useMemo(() => {
    const lessons = allLessons.filter(l => l.difficulty === 'beginner').slice(0, 8);
    return lessons.map(l => ({ ...l, displayDifficulty: 'beginner' } as LessonWithSkillLevel));
  }, [allLessons]);

  const noviceLessons = useMemo(() => {
    const lessons = allLessons.filter(l => l.difficulty === 'beginner').slice(8);
    return lessons.map(l => ({ ...l, displayDifficulty: 'novice' } as LessonWithSkillLevel));
  }, [allLessons]);

  const intermediateLessons = useMemo(() => {
    const lessons = allLessons.filter(l => l.difficulty === 'intermediate');
    return lessons.map(l => ({ ...l, displayDifficulty: 'intermediate' } as LessonWithSkillLevel));
  }, [allLessons]);

  const advancedLessons = useMemo(() => {
    const masteryLessons = allLessons.filter(l => l.difficulty === 'mastery');
    const lessons = masteryLessons.slice(0, Math.ceil(masteryLessons.length * 0.4));
    return lessons.map(l => ({ ...l, displayDifficulty: 'advanced' } as LessonWithSkillLevel));
  }, [allLessons]);

  const expertLessons = useMemo(() => {
    const masteryLessons = allLessons.filter(l => l.difficulty === 'mastery');
    const lessons = masteryLessons.slice(Math.ceil(masteryLessons.length * 0.4), Math.ceil(masteryLessons.length * 0.7));
    return lessons.map(l => ({ ...l, displayDifficulty: 'expert' } as LessonWithSkillLevel));
  }, [allLessons]);

  const masterLessons = useMemo(() => {
    const masteryLessons = allLessons.filter(l => l.difficulty === 'mastery');
    const lessons = masteryLessons.slice(Math.ceil(masteryLessons.length * 0.7));
    return lessons.map(l => ({ ...l, displayDifficulty: 'master' } as LessonWithSkillLevel));
  }, [allLessons]);

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

  // Map user skill level to display skill levels
  const getPreferredSkillLevels = (skillLevel?: string): string[] => {
    if (!skillLevel) return ['beginner', 'novice', 'intermediate', 'advanced', 'expert', 'master'];
    
    switch (skillLevel) {
      case 'entry':
        return ['beginner', 'novice'];
      case 'intermediate':
        return ['beginner', 'novice', 'intermediate'];
      case 'advanced':
        return ['intermediate', 'advanced', 'expert'];
      case 'master':
        return ['advanced', 'expert', 'master'];
      default:
        return ['beginner', 'novice', 'intermediate', 'advanced', 'expert', 'master'];
    }
  };

  // Get recommended lessons based on user preferences
  const recommendedLessons = useMemo(() => {
    if (!preferences) return [];

    // Combine all skill-level lessons with their displayDifficulty
    const allSkillLevelLessons: LessonWithSkillLevel[] = [
      ...beginnerLessons,
      ...noviceLessons,
      ...intermediateLessons,
      ...advancedLessons,
      ...expertLessons,
      ...masterLessons,
    ];

    const preferredSkillLevels = getPreferredSkillLevels(preferences.skillLevel);
    
    // Filter lessons by skill level using displayDifficulty
    let filtered = allSkillLevelLessons.filter(lesson => 
      preferredSkillLevels.includes(lesson.displayDifficulty)
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

  const handleLessonClick = (lesson: LessonWithSkillLevel, isFree: boolean) => {
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
      case 'novice':
        return <Target className="h-4 w-4" />;
      case 'intermediate':
        return <GraduationCap className="h-4 w-4" />;
      case 'advanced':
        return <Trophy className="h-4 w-4" />;
      case 'expert':
        return <TrendingUp className="h-4 w-4" />;
      case 'master':
      case 'mastery':
        return <Award className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'novice':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'advanced':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'expert':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'master':
      case 'mastery':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
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

  const renderLessonCards = (lessons: LessonWithSkillLevel[]) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lessons.map((lesson, index) => {
          const isFree = index <= 1; // First 2 lessons are free
          const displayLevel = lesson.displayDifficulty || lesson.difficulty;
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
                <Badge className={getDifficultyColor(displayLevel)}>
                  {getDifficultyIcon(displayLevel)}
                  <span className="ml-1 capitalize">{displayLevel}</span>
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
    const displayLevel = selectedLesson.displayDifficulty || selectedLesson.difficulty;

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
                <Badge className={getDifficultyColor(displayLevel)}>
                  {getDifficultyIcon(displayLevel)}
                  <span className="ml-1 capitalize">{displayLevel}</span>
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
            Progressive guitar lessons organized by skill level. First 2 lessons in each level are free!
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
                const displayLevel = lesson.displayDifficulty || lesson.difficulty;
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
                      <Badge className={getDifficultyColor(displayLevel)}>
                        {getDifficultyIcon(displayLevel)}
                        <span className="ml-1 capitalize">{displayLevel}</span>
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

        {/* Skill-level based collapsible sections */}
        <Accordion type="multiple" defaultValue={['beginner', 'novice', 'intermediate', 'advanced', 'expert', 'master']} className="space-y-4">
          {/* Beginner Level */}
          <AccordionItem value="beginner" className="border border-border rounded-lg px-6 bg-card/50">
            <AccordionTrigger className="hover:no-underline" data-testid="accordion-beginner">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-green-500" />
                <div className="text-left">
                  <h2 className="text-xl font-bold">1. Beginner</h2>
                  <p className="text-sm text-muted-foreground">{beginnerLessons.length} lessons</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-6">
              <div className="mb-4 p-4 bg-muted/30 rounded-lg border border-muted">
                <p className="text-sm text-muted-foreground leading-relaxed">{skillLevelDescriptions.beginner}</p>
              </div>
              {renderLessonCards(beginnerLessons.slice(0, 8))}
            </AccordionContent>
          </AccordionItem>

          {/* Novice Level */}
          <AccordionItem value="novice" className="border border-border rounded-lg px-6 bg-card/50">
            <AccordionTrigger className="hover:no-underline" data-testid="accordion-novice">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-blue-500" />
                <div className="text-left">
                  <h2 className="text-xl font-bold">2. Novice</h2>
                  <p className="text-sm text-muted-foreground">{noviceLessons.length} lessons</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-6">
              <div className="mb-4 p-4 bg-muted/30 rounded-lg border border-muted">
                <p className="text-sm text-muted-foreground leading-relaxed">{skillLevelDescriptions.novice}</p>
              </div>
              {renderLessonCards(noviceLessons)}
            </AccordionContent>
          </AccordionItem>

          {/* Intermediate Level */}
          <AccordionItem value="intermediate" className="border border-border rounded-lg px-6 bg-card/50">
            <AccordionTrigger className="hover:no-underline" data-testid="accordion-intermediate">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-yellow-500" />
                <div className="text-left">
                  <h2 className="text-xl font-bold">3. Intermediate</h2>
                  <p className="text-sm text-muted-foreground">{intermediateLessons.length} lessons</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-6">
              <div className="mb-4 p-4 bg-muted/30 rounded-lg border border-muted">
                <p className="text-sm text-muted-foreground leading-relaxed">{skillLevelDescriptions.intermediate}</p>
              </div>
              {renderLessonCards(intermediateLessons)}
            </AccordionContent>
          </AccordionItem>

          {/* Advanced Level */}
          <AccordionItem value="advanced" className="border border-border rounded-lg px-6 bg-card/50">
            <AccordionTrigger className="hover:no-underline" data-testid="accordion-advanced">
              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-orange-500" />
                <div className="text-left">
                  <h2 className="text-xl font-bold">4. Advanced</h2>
                  <p className="text-sm text-muted-foreground">{advancedLessons.length} lessons</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-6">
              <div className="mb-4 p-4 bg-muted/30 rounded-lg border border-muted">
                <p className="text-sm text-muted-foreground leading-relaxed">{skillLevelDescriptions.advanced}</p>
              </div>
              {renderLessonCards(advancedLessons)}
            </AccordionContent>
          </AccordionItem>

          {/* Expert Level */}
          <AccordionItem value="expert" className="border border-border rounded-lg px-6 bg-card/50">
            <AccordionTrigger className="hover:no-underline" data-testid="accordion-expert">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-red-500" />
                <div className="text-left">
                  <h2 className="text-xl font-bold">5. Expert</h2>
                  <p className="text-sm text-muted-foreground">{expertLessons.length} lessons</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-6">
              <div className="mb-4 p-4 bg-muted/30 rounded-lg border border-muted">
                <p className="text-sm text-muted-foreground leading-relaxed">{skillLevelDescriptions.expert}</p>
              </div>
              {renderLessonCards(expertLessons)}
            </AccordionContent>
          </AccordionItem>

          {/* Master Level - Enhanced Elite Section */}
          <AccordionItem value="master" className="border-2 border-purple-500/30 rounded-lg px-6 bg-gradient-to-br from-purple-900/10 via-card/50 to-amber-900/10 shadow-lg shadow-purple-500/10">
            <AccordionTrigger className="hover:no-underline" data-testid="accordion-master">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Award className="h-6 w-6 text-purple-500" />
                  <Sparkles className="h-3 w-3 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <div className="text-left flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                      6. Master Level
                    </h2>
                    <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-[10px]">
                      ELITE
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{masterLessons.length} legendary techniques</p>
                </div>
                <Trophy className="h-5 w-5 text-amber-500 opacity-50" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-6 pb-8 space-y-6">
              {/* Inspirational Header */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-900/20 via-purple-800/10 to-amber-900/20 border-2 border-purple-500/20 p-6">
                <div className="absolute top-0 right-0 opacity-5">
                  <GuitarIcon className="h-32 w-32 text-purple-500" />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1 h-full bg-gradient-to-b from-purple-500 to-amber-500 rounded-full" />
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                        <Flame className="h-5 w-5 text-amber-500" />
                        Pinnacle of Artistry
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed italic">
                        "{skillLevelDescriptions.master}"
                      </p>
                      <div className="flex items-center gap-4 pt-2 flex-wrap">
                        <div className="flex items-center gap-2 text-xs text-purple-400">
                          <Star className="h-3 w-3" />
                          <span>Andrés Segovia</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-purple-400">
                          <Star className="h-3 w-3" />
                          <span>Jimi Hendrix</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-purple-400">
                          <Star className="h-3 w-3" />
                          <span>Paco de Lucía</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Master Focus Areas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-purple-500/5 border-purple-500/20">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Virtuosic Technique</h4>
                      <p className="text-xs text-muted-foreground">Economy picking, string skipping, advanced tapping</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-amber-500/5 border-amber-500/20">
                  <div className="flex items-start gap-3">
                    <Music className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Theoretical Mastery</h4>
                      <p className="text-xs text-muted-foreground">Diminished scales, extended voicings, modal fusion</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-red-500/5 border-red-500/20">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Professional Polish</h4>
                      <p className="text-xs text-muted-foreground">Studio recording, live performance, innovation</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Master Lessons */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                  <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
                    Master Techniques
                  </h4>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                </div>
                {renderLessonCards(masterLessons)}
              </div>

              {/* Master Achievement Message */}
              <div className="mt-6 p-5 rounded-lg bg-gradient-to-br from-purple-950/30 to-amber-950/20 border border-purple-500/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="font-bold text-foreground">Journey to Mastery</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      These techniques represent decades of guitar evolution. Take your time, practice with intention, 
                      and remember: every master was once a beginner who refused to give up. Your dedication to reaching 
                      this level is already extraordinary.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-purple-400 pt-2">
                      <Sparkles className="h-3 w-3" />
                      <span className="italic">"The beautiful thing about learning is that no one can take it away from you." - B.B. King</span>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Gear Recommendations */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <GearRecommendations 
          context="classroom"
          compact={false}
          maxItems={3}
        />
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
