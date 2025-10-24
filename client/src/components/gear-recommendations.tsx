import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ShoppingCart } from "lucide-react";
import { 
  GEAR_RECOMMENDATIONS, 
  AFFILIATE_PROGRAMS, 
  getRecommendedProgram, 
  buildAffiliateLink,
  type GearRecommendation 
} from "@shared/affiliates";

interface GearRecommendationsProps {
  context?: string; // e.g., 'metal', 'jazz', 'exercises', 'classroom'
  category?: 'guitar' | 'amp' | 'pedal' | 'accessory' | 'learning';
  compact?: boolean;
  maxItems?: number;
}

export default function GearRecommendations({ 
  context = 'any', 
  category,
  compact = false,
  maxItems = 3 
}: GearRecommendationsProps) {
  const [isEU, setIsEU] = useState(false);

  // Detect user region (simplified - you could use a geolocation API)
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const euTimezones = ['Europe/', 'Africa/', 'Asia/Istanbul'];
    setIsEU(euTimezones.some(tz => timezone.startsWith(tz)));
  }, []);

  // Get relevant gear recommendations
  let recommendations = GEAR_RECOMMENDATIONS.filter(
    gear => !gear.relevantTo || gear.relevantTo.includes(context) || gear.relevantTo.includes('any')
  );

  if (category) {
    recommendations = recommendations.filter(gear => gear.category === category);
  }

  // Shuffle and limit
  const shuffled = [...recommendations].sort(() => Math.random() - 0.5);
  const displayedGear = shuffled.slice(0, maxItems);

  if (displayedGear.length === 0) return null;

  const affiliateProgram = getRecommendedProgram(isEU);

  if (compact) {
    return (
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">
          🎸 Recommended Gear from {affiliateProgram.name}:
        </p>
        <div className="flex flex-wrap gap-2">
          {displayedGear.map((gear) => {
            const link = buildAffiliateLink(affiliateProgram, gear.searchTerm);
            return (
              <Button
                key={gear.name}
                variant="outline"
                size="sm"
                asChild
                className="text-xs"
                data-testid={`link-gear-${gear.searchTerm}`}
              >
                <a href={link} target="_blank" rel="noopener noreferrer sponsored">
                  <span className="mr-1">{gear.icon}</span>
                  {gear.name}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <Card className="border-primary/20 bg-card/50" data-testid="card-gear-recommendations">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Recommended Gear
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {affiliateProgram.name} • {affiliateProgram.commissionRate}
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Practice with the right tools. Supporting us through these links helps keep the app free!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayedGear.map((gear) => {
          const link = buildAffiliateLink(affiliateProgram, gear.searchTerm);
          return (
            <div
              key={gear.name}
              className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background/50 hover:bg-background transition-colors"
            >
              <div className="text-3xl">{gear.icon}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm">{gear.name}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {gear.description}
                </p>
              </div>
              <Button
                variant="default"
                size="sm"
                asChild
                className="shrink-0"
                data-testid={`button-shop-${gear.searchTerm}`}
              >
                <a href={link} target="_blank" rel="noopener noreferrer sponsored">
                  Shop
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            </div>
          );
        })}
        
        <p className="text-[10px] text-muted-foreground pt-2 border-t border-border">
          As an affiliate partner, we may earn a commission from qualifying purchases. 
          This helps support Guitar Dice development at no extra cost to you.
        </p>
      </CardContent>
    </Card>
  );
}
