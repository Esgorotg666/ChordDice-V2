import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

// Import guitar-ONLY background images - Real BC Rich Warlock as hero
import warlockHero from "@assets/warlock2_1763245472144.jpg";
import warlockHeadstock from "@assets/generated_images/BC_Rich_Warlock_headstock_closeup_8b10fa2a.png";
import prsGuitar from "@assets/generated_images/PRS_Custom_24_guitar_7d603269.png";
import espGuitar from "@assets/generated_images/ESP_LTD_metal_guitar_e487aed2.png";
import ibanezGuitar from "@assets/generated_images/Ibanez_RG_series_guitar_52ce995e.png";
import schecterGuitar from "@assets/generated_images/Schecter_Hellraiser_guitar_77b29d39.png";

type Genre = 
  | 'metal' 
  | 'black-metal' 
  | 'death-metal' 
  | 'extreme-metal' 
  | 'neo-classical' 
  | 'flamenco' 
  | 'jazz' 
  | 'blues' 
  | 'folk' 
  | 'pop' 
  | 'rock' 
  | 'funk'
  | 'any';

interface BackgroundContextType {
  preferredGenre: Genre;
  backgroundImages: string[];
  isLoading: boolean;
}

const BackgroundContext = createContext<BackgroundContextType | null>(null);

export function BackgroundProvider({ children }: { children: ReactNode }) {
  // Fetch user preferences
  const { data: preferences, isLoading } = useQuery<{
    preferredGenre?: string;
    playingStyle?: string;
    skillLevel?: string;
    hasCompletedOnboarding: boolean;
  }>({
    queryKey: ["/api/preferences"],
  });

  // Map genres to background images - Guitar-only images with real BC Rich Warlock as hero
  const genreBackgrounds: Record<Genre, string[]> = {
    'metal': [warlockHero, warlockHeadstock, espGuitar],
    'black-metal': [schecterGuitar, warlockHero, espGuitar],
    'death-metal': [espGuitar, schecterGuitar, warlockHero],
    'extreme-metal': [warlockHero, schecterGuitar, espGuitar],
    'neo-classical': [prsGuitar, ibanezGuitar],
    'flamenco': [prsGuitar, ibanezGuitar],
    'jazz': [prsGuitar, ibanezGuitar],
    'blues': [prsGuitar, ibanezGuitar],
    'folk': [prsGuitar, ibanezGuitar],
    'pop': [prsGuitar, ibanezGuitar],
    'rock': [prsGuitar, ibanezGuitar, espGuitar],
    'funk': [prsGuitar, ibanezGuitar],
    'any': [warlockHero, prsGuitar]
  };

  // Get the preferred genre or default to 'metal'
  // Normalize to lowercase to handle legacy capitalized values
  let normalizedGenre = (preferences?.preferredGenre?.toLowerCase() || 'metal');
  
  // Remap legacy renamed genres
  const legacyRemap: Record<string, string> = {
    'classical': 'neo-classical',
    'country': 'folk'
  };
  normalizedGenre = legacyRemap[normalizedGenre] || normalizedGenre;
  
  // Validate genre is in our supported list, fallback to 'metal' if unknown
  const validGenres: Genre[] = ['metal', 'black-metal', 'death-metal', 'extreme-metal', 'neo-classical', 'flamenco', 'jazz', 'blues', 'folk', 'pop', 'rock', 'funk', 'any'];
  const preferredGenre = validGenres.includes(normalizedGenre as Genre) ? (normalizedGenre as Genre) : 'metal';
  
  // Get background images for the genre with fallback
  const backgroundImages = genreBackgrounds[preferredGenre] || genreBackgrounds['metal'];
  
  // Log if we're using fallback for debugging
  if (!validGenres.includes(normalizedGenre as Genre) && normalizedGenre !== 'metal') {
    console.warn(`Unknown genre "${normalizedGenre}", falling back to metal backgrounds`);
  }

  return (
    <BackgroundContext.Provider value={{ preferredGenre, backgroundImages, isLoading }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("useBackground must be used within BackgroundProvider");
  }
  return context;
}
