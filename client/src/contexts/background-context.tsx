import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

// Import guitar-ONLY background images - Premium BC Rich & Metal Guitar Collection
import warlockHero from "@assets/warlock2_1763245472144.jpg";
import warlockHeadstock from "@assets/generated_images/BC_Rich_Warlock_headstock_closeup_8b10fa2a.png";
import bcRichRed from "@assets/mouser_1763245486826.webp";
import bcRichBlack from "@assets/mouser2_1763245506942.webp";
import beastGuitar from "@assets/beast guitar_1763246735588.png";
import customWarlock from "@assets/custom warlock_1763246735588.png";
import jacksonV from "@assets/jackson v_1763246735589.png";
import warlockOutline1 from "@assets/Guitar Dice Pay Page_1763246735589.png";
import warlockOutline2 from "@assets/Guitar Dice Pay Page (2)_1763246735589.png";
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

  // Map genres to background images - Premium Guitar Collection
  // Purple Beast guitar with glowing eyes is the primary/hero background
  const genreBackgrounds: Record<Genre, string[]> = {
    'metal': [beastGuitar, warlockHero, customWarlock, jacksonV, bcRichRed, bcRichBlack, warlockOutline1],
    'black-metal': [beastGuitar, bcRichBlack, customWarlock, schecterGuitar, warlockOutline2],
    'death-metal': [beastGuitar, espGuitar, customWarlock, jacksonV, bcRichBlack, warlockOutline1],
    'extreme-metal': [beastGuitar, warlockHero, jacksonV, bcRichRed, customWarlock, warlockOutline2],
    'neo-classical': [prsGuitar, ibanezGuitar, warlockHeadstock],
    'flamenco': [prsGuitar, ibanezGuitar],
    'jazz': [prsGuitar, ibanezGuitar],
    'blues': [prsGuitar, ibanezGuitar],
    'folk': [prsGuitar, ibanezGuitar],
    'pop': [prsGuitar, ibanezGuitar],
    'rock': [beastGuitar, jacksonV, bcRichRed, prsGuitar, customWarlock, warlockOutline1],
    'funk': [prsGuitar, ibanezGuitar],
    'any': [beastGuitar, warlockHero, jacksonV, prsGuitar, warlockOutline1]
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
