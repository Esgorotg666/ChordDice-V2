import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

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

  // Import background images
  const metalBg1 = new URL("../assets/metal-bg1.jpg", import.meta.url).href;
  const metalBg2 = new URL("../assets/metal-bg2.jpg", import.meta.url).href;
  const metalBg3 = new URL("../assets/metal-bg3.jpg", import.meta.url).href;
  const studioBg1 = new URL("../assets/studio-bg1.jpg", import.meta.url).href;
  const studioBg2 = new URL("../assets/studio-bg2.jpg", import.meta.url).href;
  const flamencoBg1 = new URL("../assets/flamenco-bg1.jpg", import.meta.url).href;
  const flamencoBg2 = new URL("../assets/flamenco-bg2.jpg", import.meta.url).href;
  const folkBg1 = new URL("../assets/folk-bg1.jpg", import.meta.url).href;
  const folkBg2 = new URL("../assets/folk-bg2.jpg", import.meta.url).href;
  const rockBg1 = new URL("../assets/rock-bg1.jpg", import.meta.url).href;
  const rockBg2 = new URL("../assets/rock-bg2.jpg", import.meta.url).href;

  // Map genres to background images
  const genreBackgrounds: Record<Genre, string[]> = {
    'metal': [metalBg1, metalBg2, metalBg3],
    'black-metal': [metalBg1, metalBg2, metalBg3],
    'death-metal': [metalBg1, metalBg2, metalBg3],
    'extreme-metal': [metalBg1, metalBg2, metalBg3],
    'neo-classical': [studioBg1, studioBg2],
    'flamenco': [flamencoBg1, flamencoBg2],
    'jazz': [studioBg1, studioBg2],
    'blues': [studioBg1, studioBg2],
    'folk': [folkBg1, folkBg2],
    'pop': [rockBg1, rockBg2],
    'rock': [rockBg1, rockBg2],
    'funk': [rockBg1, rockBg2],
    'any': [metalBg1, metalBg2, metalBg3]
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
  
  const preferredGenre = normalizedGenre as Genre;
  const backgroundImages = genreBackgrounds[preferredGenre] || [metalBg1];

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
