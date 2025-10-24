import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Crown, Target, Clock } from "lucide-react";
import { Link } from "wouter";
import {
  exercises,
  getAllCategories,
  getSkillLevels,
  getExercisesByCategory,
  getExercisesBySkillLevel,
  type ExerciseCategory,
  type SkillLevel,
  type Exercise
} from "@/lib/exercises-data";
import { useSubscription } from "@/hooks/useSubscription";
import GearRecommendations from "@/components/gear-recommendations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ExercisesPage() {
  const { data: user } = useQuery({ queryKey: ["/api/auth/user"] });
  const { hasActiveSubscription, isLoading: subscriptionLoading } = useSubscription();
  
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'All'>('All');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<SkillLevel | 'All'>('All');
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);

  const filteredExercises = exercises.filter(ex => {
    const categoryMatch = selectedCategory === 'All' || ex.category === selectedCategory;
    const skillMatch = selectedSkillLevel === 'All' || ex.skillLevel === selectedSkillLevel;
    return categoryMatch && skillMatch;
  });

  const getSkillLevelColor = (level: SkillLevel) => {
    switch (level) {
      case 'Beginner': return 'bg-green-900/30 text-green-400 border-green-800';
      case 'Intermediate': return 'bg-blue-900/30 text-blue-400 border-blue-800';
      case 'Advanced': return 'bg-orange-900/30 text-orange-400 border-orange-800';
      case 'Extreme': return 'bg-red-900/30 text-red-400 border-red-800';
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return 'bg-green-500';
    if (difficulty <= 6) return 'bg-yellow-500';
    if (difficulty <= 8) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Premium gate
  if (subscriptionLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasActiveSubscription) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md border-red-900/50 bg-black/90">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-red-700 to-red-900 p-4 border border-red-800">
                <Crown className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Premium Feature
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Guitar Exercises is a premium feature with comprehensive training from beginner to extreme skill levels.
            </p>
            <div className="space-y-2">
              <Link href="/account">
                <Button className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 border border-red-900" data-testid="button-upgrade">
                  Upgrade to Premium
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full" data-testid="button-back-home">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-red-500" />
            <h1 className="text-lg font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Guitar Exercises</h1>
            <Badge variant="secondary" className="bg-red-900/30 text-red-400 border-red-800">
              Premium
            </Badge>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm" data-testid="button-home">
              Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Info Section */}
        <Card className="border-red-900/50 bg-black/80">
          <CardHeader>
            <CardTitle className="text-red-500">Master Your Guitar Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Comprehensive guitar exercises covering all essential techniques from basic chord changes to extreme virtuoso skills.
              Each exercise includes detailed instructions and explanations of why the technique is important for your musical development.
            </p>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="border-red-900/50 bg-black/80">
          <CardHeader>
            <CardTitle className="text-sm">Filter Exercises</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={(val) => setSelectedCategory(val as ExerciseCategory | 'All')}>
                  <SelectTrigger className="bg-card border-border" data-testid="select-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    {getAllCategories().map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Skill Level</label>
                <Select value={selectedSkillLevel} onValueChange={(val) => setSelectedSkillLevel(val as SkillLevel | 'All')}>
                  <SelectTrigger className="bg-card border-border" data-testid="select-skill">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Levels</SelectItem>
                    {getSkillLevels().map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''}
        </div>

        {/* Exercises List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredExercises.map((exercise) => (
            <Card key={exercise.id} className="border-red-900/50 bg-black/80">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{exercise.title}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className={getSkillLevelColor(exercise.skillLevel)}>
                        {exercise.skillLevel}
                      </Badge>
                      <Badge variant="outline" className="border-red-800">
                        {exercise.category}
                      </Badge>
                      {exercise.bpm && (
                        <Badge variant="outline" className="border-border">
                          <Clock className="h-3 w-3 mr-1" />
                          {exercise.bpm.min}-{exercise.bpm.max} BPM
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-2xl font-bold text-red-500">{exercise.difficulty}</div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-4 ${i < exercise.difficulty ? getDifficultyColor(exercise.difficulty) : 'bg-gray-700'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground">{exercise.description}</p>
                
                {expandedExercise === exercise.id && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="bg-red-950/20 border border-red-900/30 p-4">
                      <h4 className="text-sm font-semibold text-red-400 mb-2">Why This is Important</h4>
                      <p className="text-sm text-muted-foreground">{exercise.whyImportant}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Instructions</h4>
                      <ol className="space-y-2">
                        {exercise.instructions.map((instruction, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                            <span className="text-red-500 font-semibold">{idx + 1}.</span>
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {exercise.techniques && exercise.techniques.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Techniques Covered</h4>
                        <div className="flex flex-wrap gap-2">
                          {exercise.techniques.map((tech, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-card text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setExpandedExercise(expandedExercise === exercise.id ? null : exercise.id)}
                  data-testid={`button-expand-${exercise.id}`}
                >
                  {expandedExercise === exercise.id ? 'Hide Details' : 'Show Details'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredExercises.length === 0 && (
          <Card className="border-red-900/50 bg-black/80">
            <CardContent className="py-12 text-center">
              <Target className="h-16 w-16 text-red-500 mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">
                No exercises found for the selected filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
