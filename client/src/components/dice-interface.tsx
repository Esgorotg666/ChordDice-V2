import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Crown, Play, Eye } from "lucide-react";
import { colorGroups, exoticNumbers, generateBridgePattern, type BridgePattern } from "@/lib/music-data";
import { useAuthContext } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { trackEvent } from "@/lib/analytics";
import { admobService } from "@/lib/admob-service";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

// Import genre-specific background images - Professional guitar photos
import metalBg1 from "@assets/stock_images/bc_rich_warlock_elec_12e0db25.jpg";
import metalBg2 from "@assets/stock_images/bc_rich_warlock_elec_4451a170.jpg";
import metalBg3 from "@assets/stock_images/bc_rich_warlock_elec_fab626bd.jpg";
import flamencoBg1 from "@assets/stock_images/classical_spanish_fl_b2e3ebee.jpg";
import flamencoBg2 from "@assets/stock_images/classical_spanish_fl_b2577fe2.jpg";
import folkBg1 from "@assets/stock_images/acoustic_folk_guitar_d5c1d2c6.jpg";
import folkBg2 from "@assets/stock_images/acoustic_folk_guitar_23dec4a3.jpg";
import rockBg1 from "@assets/stock_images/electric_guitar_rock_33b9efb4.jpg";
import rockBg2 from "@assets/stock_images/electric_guitar_rock_65a75e33.jpg";
import studioBg1 from "@assets/stock_images/professional_studio__e3ee18b3.jpg";
import studioBg2 from "@assets/stock_images/professional_studio__6f69c515.jpg";

interface DiceInterfaceProps {
  onResult: (result: { 
    type: 'single' | 'riff'; 
    chord?: string; 
    colorName?: string; 
    progression?: string[];
    bridgePattern?: BridgePattern;
    mainChord?: string;
    supportingChord?: string;
  }) => void;
  onUpgrade?: () => void;
}

type Genre = 'any' | 'jazz' | 'blues' | 'rock' | 'pop' | 'folk' | 'funk' | 'metal' | 'extreme-metal' | 'neo-classical' | 'black-metal' | 'death-metal' | 'flamenco';

const genres: { value: Genre; label: string; description: string; isPremium?: boolean }[] = [
  { value: 'any', label: 'Any Style', description: 'Random chord combinations' },
  { value: 'jazz', label: 'Jazz', description: 'Complex 7ths, 9ths, ii-V-I progressions' },
  { value: 'blues', label: 'Blues', description: 'Dominant 7ths, I-IV-V progressions' },
  { value: 'rock', label: 'Rock', description: 'Power chords, simple triads', isPremium: true },
  { value: 'pop', label: 'Pop', description: 'Catchy progressions like vi-IV-I-V' },
  { value: 'folk', label: 'Folk', description: 'Simple triads, traditional patterns' },
  { value: 'funk', label: 'Funk', description: 'Syncopated 9ths, 7sus4, Dorian grooves', isPremium: true },
  { value: 'neo-classical', label: 'Neo-Classical', description: 'Harmonic minor, diminished 7ths, Bach-inspired', isPremium: true },
  { value: 'flamenco', label: 'Spanish Flamenco', description: 'Phrygian mode, rasgueado patterns, authentic Spanish guitar', isPremium: true },
  { value: 'metal', label: 'Metal', description: 'Power chords, chromatic riffs, aggressive progressions', isPremium: true },
  { value: 'black-metal', label: 'Black Metal', description: 'Tremolo picking, minor keys, atmospheric dissonance', isPremium: true },
  { value: 'death-metal', label: 'Death Metal', description: 'Low tunings, palm muting, brutal chromatic riffs', isPremium: true },
  { value: 'extreme-metal', label: 'Extreme Metal', description: 'Diminished, tritones, dissonant intervals', isPremium: true }
];

export default function DiceInterface({ onResult, onUpgrade }: DiceInterfaceProps) {
  const { isAuthenticated } = useAuthContext();
  const { hasActiveSubscription } = useSubscription();
  const { toast } = useToast();
  const { 
    usageStatus, 
    canUseDiceRoll, 
    remainingRolls, 
    incrementDiceRoll,
    isIncrementingRoll,
    incrementError,
    hasWatchedMaxAds,
    watchAd,
    isWatchingAd,
    adError,
    extraTokens,
    isTestUser
  } = useUsageTracking();
  
  // Fetch user preferences to initialize genre
  const { data: preferences } = useQuery<{
    preferredGenre?: string;
    playingStyle?: string;
    skillLevel?: string;
    hasCompletedOnboarding: boolean;
  }>({
    queryKey: ["/api/preferences"],
    enabled: isAuthenticated,
  });
  
  const [currentMode, setCurrentMode] = useState<'single' | 'riff' | 'random' | 'tapping'>('single');
  const [selectedGenre, setSelectedGenre] = useState<Genre>('any');
  
  // Initialize selectedGenre from user's preferredGenre when preferences load
  useEffect(() => {
    if (preferences?.preferredGenre) {
      // Normalize to lowercase and handle legacy values
      let normalizedGenre = preferences.preferredGenre.toLowerCase();
      
      // Remap legacy genre names
      const legacyRemap: Record<string, string> = {
        'neo classical': 'neo-classical',
        'spanish flamenco': 'flamenco',
      };
      normalizedGenre = legacyRemap[normalizedGenre] || normalizedGenre;
      
      // Check if the genre is valid
      const validGenre = genres.find(g => g.value === normalizedGenre);
      if (validGenre) {
        setSelectedGenre(normalizedGenre as Genre);
      }
    }
  }, [preferences]);
  const [isRolling, setIsRolling] = useState(false);
  const [colorDiceValue, setColorDiceValue] = useState(4);
  const [numberDiceValue, setNumberDiceValue] = useState(4);
  const [chordTypeDiceValue, setChordTypeDiceValue] = useState('Maj'); // Display chord type instead of number
  
  // 3-Dice Bridge System - Store display values
  const [mainChordDisplay, setMainChordDisplay] = useState<string>('Roll');
  const [bridgePatternDisplay, setBridgePatternDisplay] = useState<string>('Roll');
  const [supportingChordDisplay, setSupportingChordDisplay] = useState<string>('Roll');
  
  const [bridgeDiceValue, setbridgeDiceValue] = useState(4); // Bridge pattern selector (1-8)
  const [supportingDiceValue, setSupportingDiceValue] = useState(4); // Supporting chord selector
  
  // Optional premium dice
  const [showTimeSignature, setShowTimeSignature] = useState(false);
  const [showMetronome, setShowMetronome] = useState(false);
  const [timeSignatureValue, setTimeSignatureValue] = useState('4/4');
  const [metronomeValue, setMetronomeValue] = useState(120);

  const formatChord = (key: string, type: string) => {
    const chordSuffixes: Record<string, string> = {
      'Major': '',
      'Minor': 'm',
      '6th': '6',
      '7th': '7',
      '9th': '9',
      'Minor 6th': 'm6',
      'Minor 7th': 'm7',
      'Major 7th': 'M7',
      'Diminished': '°',
      'Augmented': '+',
      'Suspended': 'sus',
      // Add all exotic chord types for consistency
      ...Object.fromEntries(
        Object.values(exoticNumbers).map(exotic => [exotic, exotic === 'Major 7th' ? 'M7' : 
          exotic === 'Diminished' ? '°' : 
          exotic === 'Augmented' ? '+' :
          exotic === 'Suspended' ? 'sus' :
          exotic === '9th' ? '9' : exotic])
      )
    };

    return key + (chordSuffixes[type] || '');
  };

  const normalizeNote = (note: string): string => {
    // Convert flats to sharps for consistent internal processing
    const flatToSharp: Record<string, string> = {
      'A♭': 'G#', 'Ab': 'G#',
      'B♭': 'A#', 'Bb': 'A#', 
      'D♭': 'C#', 'Db': 'C#',
      'E♭': 'D#', 'Eb': 'D#',
      'G♭': 'F#', 'Gb': 'F#'
    };
    return flatToSharp[note] || note;
  };

  const getChordRoot = (keyString: string): string => {
    // Extract the root note by removing any trailing quality indicators
    const root = keyString.replace(/m$/, '');
    return normalizeNote(root);
  };

  const isMinorKey = (keyString: string): boolean => {
    return keyString.endsWith('m');
  };

  const getGenreProgressions = (genre: Genre, rootNote: string, isMinor: boolean = false): string[] => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = notes.indexOf(rootNote);
    
    if (rootIndex === -1) {
      console.error(`Invalid root note: ${rootNote}`);
      return [rootNote]; // Fallback to just the root
    }
    
    const buildChord = (semitones: number, quality: string = ''): string => {
      const noteIndex = (rootIndex + semitones + 12) % 12; // Safe from negative numbers
      const note = notes[noteIndex];
      return note + quality;
    };

    // Randomly select from multiple authentic progressions per genre
    const randomIndex = Math.floor(Math.random() * 10);

    switch (genre) {
      case 'jazz':
        // Jazz - Authentic progressions from Bebop, Hard Bop, Modal, Cool Jazz eras
        // Characterized by extended harmony (9ths, 11ths, 13ths), altered dominants, ii-V-I
        // Semitone mapping: Same as classical, but with extended chord qualities
        if (isMinor) {
          // 10 authentic minor jazz progressions with extended voicings
          // Minor key semitone reference (C minor): Cm=0m, D=+2, Eb=+3, Fm=+5m, G=+7, Ab=+8, Bb=+10
          const jazzMinorProgressions = [
            // 1. John Coltrane "Blue Bossa" - Classic minor ii-V-i
            [buildChord(2, 'm7b5'), buildChord(7, '7b9'), buildChord(0, 'm9'), buildChord(5, 'm11')],  // iiø7-V7b9-im9-ivm11
            // 2. Miles Davis "So What" - Modal shift (Dm7-Ebm7 modal vamp)
            [buildChord(0, 'm11'), buildChord(1, 'm11'), buildChord(0, 'm9'), buildChord(1, 'm9')],  // im11-♭iim11-im9-♭iim9 (modal shift)
            // 3. Bill Evans "Autumn Leaves" - Minor turnaround (im9-IVmaj7-iiø7-V7alt)
            [buildChord(0, 'm9'), buildChord(5, 'maj7'), buildChord(2, 'm7b5'), buildChord(7, '7alt')],  // im9-IVmaj7-iiø7-V7alt
            // 4. Horace Silver "Song for My Father" - Latin jazz minor
            [buildChord(0, 'm9'), buildChord(5, 'm11'), buildChord(0, 'm9'), buildChord(7, '7#5')],  // im9-ivm11-im9-V7#5
            // 5. Wayne Shorter "Footprints" - Minor blues (Cm7-Fm7-Cm7-Cm7)
            [buildChord(0, 'm9'), buildChord(5, 'm7'), buildChord(0, 'm9'), buildChord(0, 'm9')],  // im9-ivm7-im9-im9 (minor blues)
            // 6. Herbie Hancock "Maiden Voyage" - Suspended minor modal
            [buildChord(0, 'm11'), buildChord(10, '13'), buildChord(8, 'maj9'), buildChord(7, '7b9')],  // im11-♭VII13-♭VImaj9-V7b9
            // 7. Charlie Parker "Confirmation" - Bebop minor with diminished
            [buildChord(0, 'm7'), buildChord(1, 'dim7'), buildChord(2, 'm7b5'), buildChord(7, '7b9')],  // im7-#idim7-iiø7-V7b9
            // 8. Chick Corea "Spain" - Modal minor with backdoor
            [buildChord(5, 'm9'), buildChord(8, '13'), buildChord(0, 'm(maj7)'), buildChord(7, '7sus4')],  // ivm9-♭VI13-im(maj7)-V7sus4
            // 9. Thelonious Monk "Round Midnight" - Chromatic minor
            [buildChord(0, 'm9'), buildChord(3, '7#5'), buildChord(8, 'maj7'), buildChord(0, 'm(maj7)')],  // im9-♭III7#5-♭VImaj7-im(maj7)
            // 10. Sonny Rollins "Doxy" - Minor blues turnaround
            [buildChord(3, 'm9'), buildChord(10, '7b9'), buildChord(0, 'm11'), buildChord(7, '7alt')]  // ♭iiim9-♭VII7b9-im11-V7alt
          ];
          return jazzMinorProgressions[randomIndex];
        } else {
          // 10 authentic major jazz progressions with extended chords (9ths, 11ths, 13ths)
          const jazzMajorProgressions = [
            // 1. Miles Davis "Autumn Leaves" - Classic ii-V-I
            [buildChord(2, 'm9'), buildChord(7, '13'), buildChord(0, 'maj9'), buildChord(5, '6/9')],  // iim9-V13-Imaj9-IV6/9
            // 2. Dizzy Gillespie "I Got Rhythm" - Rhythm changes
            [buildChord(0, '6/9'), buildChord(9, 'm9'), buildChord(2, 'm11'), buildChord(7, '7b9')],  // I6/9-vim9-iim11-V7b9
            // 3. Miles Davis "All Blues" - Blues with altered dominants
            [buildChord(0, '9'), buildChord(5, '13'), buildChord(7, '7#5'), buildChord(0, '7sus4')],  // I9-IV13-V7#5-I7sus4
            // 4. Duke Ellington "Satin Doll" - Extended turnaround
            [buildChord(4, 'm11'), buildChord(9, 'm9'), buildChord(2, 'm7'), buildChord(7, '7alt')],  // iiim11-vim9-iim7-V7alt
            // 5. John Coltrane "Giant Steps" - Coltrane changes
            [buildChord(0, 'maj7#11'), buildChord(5, 'maj9'), buildChord(2, 'm11'), buildChord(7, '13')],  // Imaj7#11-IVmaj9-iim11-V13
            // 6. Charlie Parker "Confirmation" - Bebop turnaround
            [buildChord(0, 'maj9'), buildChord(9, 'm9'), buildChord(2, 'm11'), buildChord(7, '13')],  // Imaj9-vim9-iim11-V13
            // 7. Bill Evans "Waltz for Debby" - Sophisticated voicings
            [buildChord(9, 'm9'), buildChord(2, 'm11'), buildChord(7, 'maj9'), buildChord(0, '6/9')],  // vim9-iim11-Vmaj9-I6/9
            // 8. Thelonious Monk "Straight No Chaser" - Blues substitutions
            [buildChord(0, 'maj9'), buildChord(3, '7#5'), buildChord(8, 'maj7#11'), buildChord(11, '7b9')],  // Imaj9-♭III7#5-♭VImaj7#11-VII7b9
            // 9. Wes Montgomery "Four on Six" - Backdoor progression
            [buildChord(5, 'm11'), buildChord(10, '13'), buildChord(0, 'maj9'), buildChord(7, '7alt')],  // ivm11-♭VII13-Imaj9-V7alt
            // 10. Dexter Gordon "Cheese Cake" - Bebop blues
            [buildChord(10, '13'), buildChord(3, '7b9'), buildChord(8, 'maj9'), buildChord(0, '6/9')]  // ♭VII13-♭III7b9-♭VImaj9-I6/9
          ];
          return jazzMajorProgressions[randomIndex];
        }
      case 'blues':
        // Same for major/minor blues - dominant 7ths
        return [
          buildChord(0, '7'),    // I7
          buildChord(5, '7'),    // IV7
          buildChord(0, '7'),    // I7
          buildChord(7, '7')     // V7
        ];
      case 'rock':
        // Rock - Authentic progressions from Classic Rock, Hard Rock, Punk, Grunge, Alternative
        // Spans 1960s-2000s rock music evolution
        // Characterized by power chords, I-IV-V, I-V-vi-IV, and modal minor progressions
        if (isMinor) {
          // 10 authentic minor rock progressions
          // Minor key semitone reference (C minor): Cm=0m, D=+2, Eb=+3, Fm=+5m, G=+7, Ab=+8, Bb=+10
          const rockMinorProgressions = [
            // 1. Iron Maiden "The Trooper" - Classic NWOBHM minor (Em-D-C-B)
            [buildChord(0, 'm'), buildChord(10), buildChord(8), buildChord(7)],  // i-♭VII-♭VI-V
            // 2. Metallica "Enter Sandman" - Heavy minor progression (Em-E5-C5-B5)
            [buildChord(0, 'm'), buildChord(10), buildChord(8), buildChord(0, 'm')],  // i-♭VII-♭VI-i
            // 3. Nirvana "Smells Like Teen Spirit" - Grunge classic (Fm-Db-Eb-Bb)
            [buildChord(0, 'm'), buildChord(8), buildChord(10), buildChord(5)],  // i-♭VI-♭VII-IV
            // 4. Black Sabbath "Iron Man" - Doom metal minor (Bm-D-Em-Bm)
            [buildChord(0, 'm'), buildChord(3), buildChord(5, 'm'), buildChord(0, 'm')],  // i-♭III-iv-i
            // 5. Alice in Chains "Man in the Box" - Grunge minor (Em-D-Em-C)
            [buildChord(0, 'm'), buildChord(10), buildChord(0, 'm'), buildChord(8)],  // i-♭VII-i-♭VI
            // 6. System of a Down "Toxicity" - Armenian Phrygian (Cm-Db-Eb-Cm)
            [buildChord(0, 'm'), buildChord(1), buildChord(3), buildChord(0, 'm')],  // i-♭ii-♭III-i (Phrygian)
            // 7. Soundgarden "Black Hole Sun" - Modal minor (Em-C-G-D)
            [buildChord(0, 'm'), buildChord(8), buildChord(3), buildChord(10)],  // i-♭VI-♭III-♭VII
            // 8. Tool "Schism" - Progressive minor (Dm-Gm-Bb-C)
            [buildChord(0, 'm'), buildChord(5, 'm'), buildChord(8), buildChord(10)],  // i-iv-♭VI-♭VII
            // 9. Radiohead "Creep" - Alternative (Gm-Bb-C-Cm) - needs major IV!
            [buildChord(0, 'm'), buildChord(3), buildChord(5), buildChord(5, 'm')],  // i-♭III-IV-iv
            // 10. Pearl Jam "Jeremy" - Grunge melodic minor (Am-G-F-E)
            [buildChord(0, 'm'), buildChord(10), buildChord(8), buildChord(7)]  // i-♭VII-♭VI-V
          ];
          return rockMinorProgressions[randomIndex];
        } else {
          // 10 authentic major rock progressions
          const rockMajorProgressions = [
            // 1. Led Zeppelin "Rock and Roll" - Classic I-IV-V
            [buildChord(0), buildChord(5), buildChord(7), buildChord(0)],  // I-IV-V-I
            // 2. U2 "With or Without You" - Anthemic I-V-vi-IV
            [buildChord(0), buildChord(7), buildChord(9, 'm'), buildChord(5)],  // I-V-vi-IV (Axis progression)
            // 3. AC/DC "Back in Black" - Power chord I-IV-I-V
            [buildChord(0), buildChord(5), buildChord(0), buildChord(7)],  // I-IV-I-V
            // 4. The Who "Baba O'Riley" - Classic rock I-V-IV-I
            [buildChord(0), buildChord(7), buildChord(5), buildChord(0)],  // I-V-IV-I
            // 5. Tom Petty "Free Fallin'" - I-IV-I-V pattern
            [buildChord(0), buildChord(5), buildChord(7), buildChord(5)],  // I-IV-V-IV
            // 6. Green Day "Basket Case" - Punk I-V-vi-IV
            [buildChord(0), buildChord(7), buildChord(9, 'm'), buildChord(5)],  // I-V-vi-IV
            // 7. The Rolling Stones "Satisfaction" - I-IV with ♭VII
            [buildChord(0), buildChord(10), buildChord(5), buildChord(0)],  // I-♭VII-IV-I
            // 8. Foo Fighters "Everlong" - Alternative I-vi-IV-V
            [buildChord(0), buildChord(9, 'm'), buildChord(5), buildChord(7)],  // I-vi-IV-V
            // 9. The Killers "Mr. Brightside" - Indie rock I-IV-vi-V
            [buildChord(0), buildChord(5), buildChord(9, 'm'), buildChord(7)],  // I-IV-vi-V
            // 10. Queen "We Will Rock You" - Stomp I-IV-I progression
            [buildChord(0), buildChord(5), buildChord(0), buildChord(5)]  // I-IV-I-IV
          ];
          return rockMajorProgressions[randomIndex];
        }
      case 'pop':
        if (isMinor) {
          // i-♭VI-♭III-♭VII (minor pop)
          return [
            buildChord(0, 'm'),    // i
            buildChord(8),         // ♭VI
            buildChord(3),         // ♭III
            buildChord(10)         // ♭VII
          ];
        } else {
          // vi-IV-I-V (major pop)
          return [
            buildChord(9, 'm'),    // vi
            buildChord(5),         // IV
            buildChord(0),         // I
            buildChord(7)          // V
          ];
        }
      case 'folk':
        if (isMinor) {
          // i-♭VII-♭VI-♭VII (minor folk)
          return [
            buildChord(0, 'm'),    // i
            buildChord(10),        // ♭VII
            buildChord(8),         // ♭VI
            buildChord(10)         // ♭VII
          ];
        } else {
          // I-vi-IV-V (major folk)
          return [
            buildChord(0),         // I
            buildChord(9, 'm'),    // vi
            buildChord(5),         // IV
            buildChord(7)          // V
          ];
        }
      case 'funk':
        // Funk - Authentic progressions from P-Funk, Motown, Soul, and Funk pioneers
        // Characterized by static vamps, extended 9th/11th/13th chords, syncopated rhythms
        // Often uses repetitive 1-2 chord grooves or ii-V modal vamps
        if (isMinor) {
          // 10 authentic minor funk progressions
          // Minor key semitone reference (C minor): Cm=0m, D=+2, Eb=+3, Fm=+5m, G=+7, Ab=+8, Bb=+10
          const funkMinorProgressions = [
            // 1. The Temptations "Papa Was A Rollin' Stone" - Classic minor vamp (Cm7-Fm7)
            [buildChord(0, 'm7'), buildChord(5, 'm7'), buildChord(0, 'm7'), buildChord(5, 'm7')],  // im7-ivm7-im7-ivm7
            // 2. Marvin Gaye "Got To Give It Up" - Dorian groove (Am7-Dm7)
            [buildChord(0, 'm7'), buildChord(5, 'm7'), buildChord(0, 'm7'), buildChord(5, 'm7')],  // im7-ivm7-im7-ivm7
            // 3. Zapp "More Bounce to the Ounce" - Static minor vamp (Cm11)
            [buildChord(0, 'm11'), buildChord(0, 'm11'), buildChord(0, 'm11'), buildChord(0, 'm11')],  // im11 (static)
            // 4. Curtis Mayfield "Superfly" - Modal minor progression (Fm-Cm-Gm-Cm)
            [buildChord(5, 'm9'), buildChord(0, 'm9'), buildChord(7, 'm9'), buildChord(0, 'm9')],  // ivm9-im9-vm9-im9
            // 5. Stevie Wonder "Superstition" - Static Ebm7 vamp
            [buildChord(0, 'm7'), buildChord(0, 'm7'), buildChord(0, 'm7'), buildChord(0, 'm7')],  // im7 (static)
            // 6. Herbie Hancock "Chameleon" - Minor modal vamp (Bm7-Bm7)
            [buildChord(0, 'm7'), buildChord(10, '7'), buildChord(0, 'm7'), buildChord(10, '7')],  // im7-♭VII7-im7-♭VII7
            // 7. Kool & the Gang "Jungle Boogie" - Minor with suspended
            [buildChord(0, 'm7'), buildChord(7, '7sus4'), buildChord(0, 'm7'), buildChord(7, '7sus4')],  // im7-V7sus4-im7-V7sus4
            // 8. The Meters "Cissy Strut" - New Orleans funk minor (Cm9-Eb7)
            [buildChord(0, 'm9'), buildChord(3, '9'), buildChord(0, 'm9'), buildChord(3, '9')],  // im9-♭III9-im9-♭III9
            // 9. War "Low Rider" - Latin funk minor (Gm7-Gm7)
            [buildChord(0, 'm7'), buildChord(10, '9'), buildChord(0, 'm7'), buildChord(10, '9')],  // im7-♭VII9-im7-♭VII9
            // 10. Funkadelic "Maggot Brain" - Extended minor modal (Em11-D9-C-Bm)
            [buildChord(0, 'm11'), buildChord(10, '9'), buildChord(8, 'maj7'), buildChord(7, 'm7')]  // im11-♭VII9-♭VImaj7-vm7
          ];
          return funkMinorProgressions[randomIndex];
        } else {
          // 10 authentic major funk progressions
          const funkMajorProgressions = [
            // 1. Parliament "Give Up the Funk" - Static dominant 9th vamp
            [buildChord(0, '9'), buildChord(0, '9'), buildChord(0, '9'), buildChord(0, '9')],  // I9 (static)
            // 2. Tower of Power "What Is Hip?" - Chromatic 9th movement
            [buildChord(0, '9'), buildChord(2, '9'), buildChord(1, '9'), buildChord(0, '9')],  // I9-II9-♭II9-I9
            // 3. Bootsy Collins "Flash Light" - V-I dominant shuffle
            [buildChord(7, '7'), buildChord(0, '7'), buildChord(7, '7'), buildChord(0, '7')],  // V7-I7-V7-I7
            // 4. James Brown "Get Up Offa That Thing" - ii-V funk
            [buildChord(2, '9'), buildChord(7, '9'), buildChord(2, '9'), buildChord(7, '9')],  // ii9-V9-ii9-V9
            // 5. Sly & the Family Stone "Thank You" - Extended ii-V
            [buildChord(2, 'm11'), buildChord(7, '13'), buildChord(2, 'm11'), buildChord(7, '13')],  // iim11-V13-iim11-V13
            // 6. Herbie Hancock "Chameleon" - Modal funk vamp
            [buildChord(0, '7#9'), buildChord(10, '7#9'), buildChord(0, '7#9'), buildChord(10, '7#9')],  // I7#9-♭VII7#9-I7#9-♭VII7#9
            // 7. Average White Band "Pick Up The Pieces" - Major 9th groove
            [buildChord(0, 'maj9'), buildChord(5, '13'), buildChord(0, 'maj9'), buildChord(5, '13')],  // Imaj9-IV13-Imaj9-IV13
            // 8. Jamiroquai "Virtual Insanity" - Modern funk
            [buildChord(0, 'maj7'), buildChord(9, 'm7'), buildChord(2, 'm9'), buildChord(7, '13')],  // Imaj7-vim7-iim9-V13
            // 9. Rick James "Super Freak" - Chromatic funk
            [buildChord(0, '9'), buildChord(1, '9'), buildChord(2, '9'), buildChord(0, '9')],  // I9-♭II9-ii9-I9
            // 10. Prince "Kiss" - Minimalist funk
            [buildChord(0, '7'), buildChord(5, '7'), buildChord(0, '7'), buildChord(5, '7')]  // I7-IV7-I7-IV7
          ];
          return funkMajorProgressions[randomIndex];
        }
      case 'metal':
        if (isMinor) {
          // i-♭VI-♭VII-i (minor metal power chord progression)
          return [
            buildChord(0, '5'),    // i5 (power chord)
            buildChord(8, '5'),    // ♭VI5
            buildChord(10, '5'),   // ♭VII5
            buildChord(0, '5')     // i5
          ];
        } else {
          // I-♭VII-♭VI-♭VII (major metal)
          return [
            buildChord(0, '5'),    // I5 (power chord)
            buildChord(10, '5'),   // ♭VII5
            buildChord(8, '5'),    // ♭VI5
            buildChord(10, '5')    // ♭VII5
          ];
        }
      case 'neo-classical':
        // Neo-Classical - Authentic progressions from Baroque, Classical, Romantic periods
        // Spans 300+ years of Western classical music tradition
        // Semitone mapping from C: C=0, D=+2, E=+4, F=+5, G=+7, A=+9, B=+11
        //                 Minor: Cm=0m, Dm=+2m, Eb=+3, Fm=+5m, Gm=+7m, Ab=+8, Bb=+10
        if (isMinor) {
          // 10 authentic minor classical progressions
          const classicalMinorProgressions = [
            // 1. Bach - Toccata & Fugue in D Minor, BWV 565 (Baroque organ masterpiece)
            [buildChord(0, 'm'), buildChord(7), buildChord(10), buildChord(0, 'm')],  // i-V-VII-i
            // 2. Beethoven - Moonlight Sonata Op. 27 No. 2 (Romantic piano)
            [buildChord(0, 'm'), buildChord(8), buildChord(10), buildChord(7)],  // i-♭VI-♭VII-V
            // 3. Vivaldi - Winter from Four Seasons (Baroque strings)
            [buildChord(0, 'm'), buildChord(5, 'm'), buildChord(7), buildChord(0, 'm')],  // i-iv-V-i (perfect cadence)
            // 4. Chopin - Prelude in E Minor Op. 28 No. 4 (Romantic chromaticism)
            [buildChord(0, 'm'), buildChord(8, 'maj7'), buildChord(5, 'm'), buildChord(7)],  // i-♭VImaj7-iv-V (chromatic predominant)
            // 5. Bach - Chaconne from Partita No. 2 (Baroque violin, ground bass)
            [buildChord(0, 'm'), buildChord(8), buildChord(5, 'm'), buildChord(7)],  // i-♭VI-iv-V
            // 6. Mozart - Requiem in D Minor K. 626 (Classical sacred)
            [buildChord(0, 'm'), buildChord(3), buildChord(10), buildChord(7)],  // i-♭III-♭VII-V
            // 7. Brahms - Symphony No. 4 in E Minor (Late Romantic)
            [buildChord(0, 'm'), buildChord(2, 'dim'), buildChord(7), buildChord(0, 'm')],  // i-ii°-V-i (Phrygian half cadence)
            // 8. Rachmaninoff - Prelude in C# Minor Op. 3 No. 2 (Late Romantic dramatic)
            [buildChord(7), buildChord(0, 'm'), buildChord(8), buildChord(7)],  // V-i-♭VI-V (dramatic resolution)
            // 9. Scarlatti - Sonata in A Minor K. 109 (Baroque harpsichord)
            [buildChord(0, 'm'), buildChord(5, 'm'), buildChord(11, 'dim'), buildChord(7)],  // i-iv-vii°-V (leading-tone dim)
            // 10. Handel - Sarabande in D Minor (Baroque dance suite)
            [buildChord(0, 'm'), buildChord(7, 'm'), buildChord(3), buildChord(7)]  // i-v-♭III-V (modal mixture)
          ];
          return classicalMinorProgressions[randomIndex];
        } else {
          // 10 authentic major classical progressions
          const classicalMajorProgressions = [
            // 1. Mozart - Eine Kleine Nachtmusik K. 525 (Classical serenade)
            [buildChord(0), buildChord(5), buildChord(7), buildChord(0)],  // I-IV-V-I (perfect authentic)
            // 2. Bach - Prelude in C Major BWV 846 (Well-Tempered Clavier Book I)
            [buildChord(0), buildChord(2, 'm'), buildChord(7), buildChord(0)],  // I-ii-V-I (circle of fifths)
            // 3. Handel - Hallelujah Chorus from Messiah (Baroque choral)
            [buildChord(5), buildChord(0), buildChord(7), buildChord(0)],  // IV-I-V-I (plagal + authentic)
            // 4. Beethoven - Symphony No. 9 "Ode to Joy" (Classical-Romantic transition)
            [buildChord(0), buildChord(7), buildChord(9, 'm'), buildChord(5)],  // I-V-vi-IV (Canon progression)
            // 5. Haydn - Surprise Symphony No. 94 (Classical orchestral)
            [buildChord(0), buildChord(9, 'm'), buildChord(5), buildChord(7)],  // I-vi-IV-V (Romantic progression)
            // 6. Pachelbel - Canon in D Major (Baroque ground bass)
            [buildChord(0), buildChord(7), buildChord(9, 'm'), buildChord(4, 'm')],  // I-V-vi-iii (Canon)
            // 7. Vivaldi - Spring from Four Seasons (Baroque concerto)
            [buildChord(0), buildChord(5), buildChord(2, 'm'), buildChord(7)],  // I-IV-ii-V (pre-dominant)
            // 8. Mozart - Piano Sonata No. 16 in C K. 545 (Classical pedagogy)
            [buildChord(7), buildChord(0), buildChord(5), buildChord(7)],  // V-I-IV-V (Alberti bass)
            // 9. Schubert - Ave Maria (Romantic lieder, deceptive cadence)
            [buildChord(7), buildChord(9, 'm'), buildChord(5), buildChord(0)],  // V-vi-IV-I (deceptive)
            // 10. Corelli - Christmas Concerto Op. 6 No. 8 (Baroque pastoral)
            [buildChord(0), buildChord(4, 'm'), buildChord(7), buildChord(0)]  // I-iii-V-I (mediant progression)
          ];
          return classicalMajorProgressions[randomIndex];
        }
      case 'flamenco':
        // Spanish Flamenco - Authentic palos using PHRYGIAN DOMINANT mode
        // KEY: Most flamenco uses MAJOR tonic (E, not Em) with ♭II characteristic
        // Classic Andalusian cadence: Am-G-F-E (iv-♭III-♭II-I) with MAJOR resolution
        if (isMinor) {
          // 10 authentic Phrygian dominant progressions (E major tonic, not Em)
          // Semitone mapping from E: Am=+5, B=+7, C=+8, D=+10, E=0, F=+1, G=+3
          const flamencoPhrygianProgressions = [
            // 1. Soleá - Mother of flamenco, cierre resolves to MAJOR tonic
            [buildChord(5, 'm'), buildChord(3), buildChord(1), buildChord(0, '7')],  // Am-G-F-E7 (classic cierre)
            // 2. Seguiriya - Deep cante, Phrygian dominant resolution
            [buildChord(0, '7'), buildChord(1), buildChord(3), buildChord(5, 'm')],  // E7-F-G-Am (reverse cadence)
            // 3. Bulerías - Fast 12-beat compás, dominant tonic E
            [buildChord(5, 'm'), buildChord(1), buildChord(0, '7'), buildChord(5, 'm')],  // Am-F-E7-Am
            // 4. Tangos - Phrygian with major tonic resolution
            [buildChord(0), buildChord(1), buildChord(3), buildChord(0)],  // E-F-G-E (Phrygian major)
            // 5. Taranta - Mining song, Phrygian dominant (tono de Levante)
            [buildChord(1), buildChord(3), buildChord(5, 'm'), buildChord(0, '7')],  // F-G-Am-E7
            // 6. Granaína - Free-form with E7 tonic (Phrygian dominant)
            [buildChord(3), buildChord(1), buildChord(0, '7'), buildChord(5, 'm')],  // G-F-E7-Am
            // 7. Minera - Deep song, major tonic E with Phrygian color
            [buildChord(1), buildChord(0), buildChord(3), buildChord(5, 'm')],  // F-E-G-Am
            // 8. Soleá por Bulería - Hybrid, resolves to E major
            [buildChord(5, 'm'), buildChord(3), buildChord(1), buildChord(0)],  // Am-G-F-E
            // 9. Cartagenera - Phrygian dominant with E7 tonic
            [buildChord(0, '7'), buildChord(1), buildChord(5, 'm'), buildChord(3)],  // E7-F-Am-G
            // 10. Rondeña - From Ronda, classic Phrygian cadence to E
            [buildChord(5, 'm'), buildChord(1), buildChord(3), buildChord(0)]  // Am-F-G-E
          ];
          return flamencoPhrygianProgressions[randomIndex];
        } else {
          // 10 authentic major flamenco progressions (traditional Andalusian cadences)
          const flamencoMajorProgressions = [
            // 1. Alegrías - Upbeat Cádiz, Andalusian cadence with V resolution
            [buildChord(0), buildChord(10), buildChord(8), buildChord(7)],  // C-Bb-Ab-G (Andalusian)
            // 2. Cantiñas - Joyful, proper V-I cadence
            [buildChord(5), buildChord(7), buildChord(0), buildChord(7)],  // F-G-C-G (IV-V-I-V)
            // 3. Fandangos de Huelva - Traditional I-IV-V-I
            [buildChord(0), buildChord(5), buildChord(7), buildChord(0)],  // C-F-G-C
            // 4. Colombianas - Latin fusion with V-I resolution
            [buildChord(0), buildChord(8), buildChord(7), buildChord(0)],  // C-Ab-G-C
            // 5. Rumba Flamenca - Popular rumba, Andalusian flavor
            [buildChord(0), buildChord(10), buildChord(7), buildChord(0)],  // C-Bb-G-C
            // 6. Caracoles - Festive, resolves V-I in compás
            [buildChord(5), buildChord(0), buildChord(7), buildChord(0)],  // F-C-G-C (plagal + authentic)
            // 7. Fandangos Naturales - Natural fandango, clear V-I
            [buildChord(0), buildChord(7), buildChord(5), buildChord(7)],  // C-G-F-G (I-V-IV-V)
            // 8. Romeras - Pilgrimage, Andalusian with V
            [buildChord(0), buildChord(10), buildChord(7), buildChord(0)],  // C-Bb-G-C
            // 9. Verdiales - Folk fandango, I-IV-V-I structure
            [buildChord(0), buildChord(5), buildChord(7), buildChord(0)],  // C-F-G-C
            // 10. Guajira - Cuban-Spanish, V-I resolution
            [buildChord(7), buildChord(0), buildChord(10), buildChord(0)]  // G-C-Bb-C (V-I-♭VII-I)
          ];
          return flamencoMajorProgressions[randomIndex];
        }
      case 'black-metal':
        // 10 authentic black metal progressions - power chords, minor, diminished, tritones, dissonance
        const blackMetalProgressions = [
          // 1. Classic tremolo power chord riff i5-i5-i5-i5 (sustained blastbeat foundation)
          [buildChord(0, '5'), buildChord(0, '5'), buildChord(0, '5'), buildChord(0, '5')],
          // 2. Tritone terror i5-tritone5-i5-tritone5 (C5-F#5 or E5-Bb5 dissonance)
          [buildChord(0, '5'), buildChord(6, '5'), buildChord(0, '5'), buildChord(6, '5')],
          // 3. Minor with diminished descent im-bVIIm-viidim-im (Em-Dm-D#dim-Em atmospheric)
          [buildChord(0, 'm'), buildChord(10, 'm'), buildChord(11, 'dim'), buildChord(0, 'm')],
          // 4. Chromatic descent with minor i5-bVII5-bVIm-V5 (power to minor blend)
          [buildChord(0, '5'), buildChord(10, '5'), buildChord(8, 'm'), buildChord(7, '5')],
          // 5. Phrygian minor darkness im-bIIm-bIIIdim-bIIm (Em-Fm-Gdim-Fm)
          [buildChord(0, 'm'), buildChord(1, 'm'), buildChord(3, 'dim'), buildChord(1, 'm')],
          // 6. Diminished tension with power iidim-i5-iidim-i5 (F#dim-E5 horror)
          [buildChord(2, 'dim'), buildChord(0, '5'), buildChord(2, 'dim'), buildChord(0, '5')],
          // 7. Minor Aeolian with diminished im-bVIm-viidim-im (Em-Cm-D#dim-Em)
          [buildChord(0, 'm'), buildChord(8, 'm'), buildChord(11, 'dim'), buildChord(0, 'm')],
          // 8. Atmospheric minor foundation im-im(add9)-iidim-im (ambient with tension)
          [buildChord(0, 'm'), buildChord(0, 'add9'), buildChord(2, 'dim'), buildChord(0, 'm')],
          // 9. Mixed power/minor/dim i5-bVIIm-tritone5-iidim (aggressive blend)
          [buildChord(0, '5'), buildChord(10, 'm'), buildChord(6, '5'), buildChord(2, 'dim')],
          // 10. Norwegian style im-bIIm-bVIm-viidim (Em-Fm-Cm-D#dim classic)
          [buildChord(0, 'm'), buildChord(1, 'm'), buildChord(8, 'm'), buildChord(11, 'dim')]
        ];
        return blackMetalProgressions[randomIndex];
      case 'death-metal':
        // 10 authentic death metal progressions from Cannibal Corpse, Suffocation, Nile, etc.
        const deathMetalProgressions = [
          // 1. Cannibal Corpse "Inhumane Harvest" - Tritone horror motif
          [buildChord(0, 'm'), buildChord(6, '5'), buildChord(0, 'm'), buildChord(6, '5')],
          // 2. Cannibal Corpse "Meathook Sodomy" - Aeolian chromatic tremolo
          [buildChord(0, 'm'), buildChord(8), buildChord(3), buildChord(10)],
          // 3. Nile "Sarcophagus" - Phrygian dominant exotic
          [buildChord(0, '5'), buildChord(1, '5'), buildChord(3, '5'), buildChord(4, '5')],
          // 4. Suffocation "Pierced from Within" - Diminished chaos
          [buildChord(11, '°'), buildChord(0), buildChord(2, 'm'), buildChord(0)],
          // 5. Vader "Dark Age" - Chromatic descent theme
          [buildChord(0, 'm'), buildChord(10), buildChord(8), buildChord(7)],
          // 6. Morbid Angel "Chapel of Ghouls" - Harmonic minor uplift
          [buildChord(0, 'm'), buildChord(8), buildChord(3), buildChord(10)],
          // 7. Deicide "Lunatic of God's Creation" - Descending tension
          [buildChord(0, 'm'), buildChord(10), buildChord(8), buildChord(7)],
          // 8. Entombed "Left Hand Path" - Chromatic power drop
          [buildChord(0, '5'), buildChord(11, '5'), buildChord(10, '5'), buildChord(9, '5')],
          // 9. Arch Enemy "Ravenous" - Melodic sequence
          [buildChord(0, 'm'), buildChord(8), buildChord(3), buildChord(7)],
          // 10. Sepultura "Roots Bloody Roots" - Stepwise groove
          [buildChord(0, '5'), buildChord(11, '5'), buildChord(10, '5'), buildChord(9, '5')]
        ];
        return deathMetalProgressions[randomIndex];
      case 'extreme-metal':
        // 10 authentic extreme metal progressions - modal, dissonant, power chord-based
        const extremeMetalProgressions = [
          // 1. Chromatic power chord descent (Slayer style)
          [buildChord(0, '5'), buildChord(11, '5'), buildChord(10, '5'), buildChord(9, '5')],
          // 2. Tritone oscillation i-b5 (Morbid Angel dissonance)
          [buildChord(0, 'm'), buildChord(6, '5'), buildChord(0, 'm'), buildChord(6, '5')],
          // 3. Aeolian i-VI-III-VII (natural minor descent)
          [buildChord(0, 'm'), buildChord(8), buildChord(3), buildChord(10)],
          // 4. Phrygian i-bII oscillation (ritualistic minor second)
          [buildChord(0, '5'), buildChord(1, '5'), buildChord(0, '5'), buildChord(1, '5')],
          // 5. Harmonic minor i-bII-V (exotic Egyptian scale - Nile)
          [buildChord(0, 'm'), buildChord(1), buildChord(7), buildChord(0, 'm')],
          // 6. Power fifth i5-iv5-V5 (open, primitive ambiguity)
          [buildChord(0, '5'), buildChord(5, '5'), buildChord(7, '5'), buildChord(0, '5')],
          // 7. Diminished pivot i-dim-i-VI (tension bridge)
          [buildChord(0, 'm'), buildChord(2, '°'), buildChord(0, 'm'), buildChord(8)],
          // 8. Dorian i-IV alternation (call-response tremolo, raised 6th)
          [buildChord(0, 'm'), buildChord(5), buildChord(0, 'm'), buildChord(5)],
          // 9. Phrygian dominant i-bII-bIII-bVII (Spanish/exotic)
          [buildChord(0, '5'), buildChord(1, '5'), buildChord(3, '5'), buildChord(10, '5')],
          // 10. Chromatic mediant i-bVI-bIII-bVII (epic slower sections)
          [buildChord(0, 'm'), buildChord(8), buildChord(3), buildChord(10)]
        ];
        return extremeMetalProgressions[randomIndex];
      default:
        // Random exotic chords for "any"
        const exoticTypes = Object.values(exoticNumbers);
        return Array.from({length: 4}, () => 
          rootNote + (exoticTypes[Math.floor(Math.random() * exoticTypes.length)] || '')
        );
    }
  };

  const generateChord = (colorRoll: number, numberRoll: number) => {
    const colorGroup = colorGroups[colorRoll - 1];
    const selectedKey = colorGroup.keys[Math.floor(Math.random() * colorGroup.keys.length)];
    const rootNote = getChordRoot(selectedKey);
    const minor = isMinorKey(selectedKey);
    
    if (selectedGenre === 'any') {
      // Original logic for "any" genre - use formatChord for consistency
      let chordType: string;
      if (exoticNumbers[numberRoll as keyof typeof exoticNumbers]) {
        chordType = exoticNumbers[numberRoll as keyof typeof exoticNumbers];
      } else {
        chordType = 'Major';
      }
      return {
        chord: formatChord(rootNote, chordType),
        colorName: colorGroup.name
      };
    } else {
      // For genre-specific single chords, use the first chord from the progression
      const progression = getGenreProgressions(selectedGenre, rootNote, minor);
      return {
        chord: progression[0],
        colorName: colorGroup.name
      };
    }
  };

  const generateRiff = (colorRoll: number, numberRoll: number) => {
    const colorGroup = colorGroups[colorRoll - 1];
    const selectedKey = colorGroup.keys[Math.floor(Math.random() * colorGroup.keys.length)];
    const rootNote = getChordRoot(selectedKey);
    const minor = isMinorKey(selectedKey);
    
    if (selectedGenre === 'any') {
      // Use dice semantics consistently - first chord uses initial dice, then roll for others
      const progression: string[] = [];
      
      // First chord uses the passed dice rolls
      let chordType: string;
      if (exoticNumbers[numberRoll as keyof typeof exoticNumbers]) {
        chordType = exoticNumbers[numberRoll as keyof typeof exoticNumbers];
      } else {
        chordType = 'Major';
      }
      progression.push(formatChord(rootNote, chordType));
      
      // Remaining chords use new random dice rolls
      for (let i = 1; i < 4; i++) {
        const randomColorRoll = Math.floor(Math.random() * 8) + 1;
        const randomNumberRoll = Math.floor(Math.random() * 8) + 1;
        const randomColorGroup = colorGroups[randomColorRoll - 1];
        const randomKey = randomColorGroup.keys[Math.floor(Math.random() * randomColorGroup.keys.length)];
        const randomRoot = getChordRoot(randomKey);
        
        // Use dice roll to select exotic type consistently with single mode
        let randomChordType: string;
        if (exoticNumbers[randomNumberRoll as keyof typeof exoticNumbers]) {
          randomChordType = exoticNumbers[randomNumberRoll as keyof typeof exoticNumbers];
        } else {
          randomChordType = 'Major';
        }
        progression.push(formatChord(randomRoot, randomChordType));
      }
      return progression;
    } else {
      // Use genre-specific progressions
      return getGenreProgressions(selectedGenre, rootNote, minor);
    }
  };

  const generateRandomChords = () => {
    // Completely random chord generation for premium users
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const allChordTypes = [
      '', 'm', '7', 'M7', 'm7', '6', 'm6', '9', 'm9', 'add9', 'sus2', 'sus4', 
      '°', '+', 'dim7', 'm7b5', '11', '13', 'maj9', 'maj11', 'maj13',
      '7sus4', '7sus2', 'add11', 'add13', '6/9', 'm6/9', 'alt', '7#5', '7b5',
      'm(maj7)', 'mMaj9', '7#9', '7b9', '7#11', 'maj7#11'
    ];
    
    const progression: string[] = [];
    for (let i = 0; i < 4; i++) {
      const randomNote = notes[Math.floor(Math.random() * notes.length)];
      const randomType = allChordTypes[Math.floor(Math.random() * allChordTypes.length)];
      progression.push(randomNote + randomType);
    }
    
    return progression;
  };

  const generateTappingChords = () => {
    // Generate chord combinations optimized for double hand tapping techniques
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    // Chord types that work well for tapping (extended chords, wide intervals)
    const tappingChordTypes = [
      'add9', 'add11', 'maj9', 'maj11', 'maj13',  // Extended major chords
      'm9', 'm11', 'm(maj7)', 'mMaj9',            // Extended minor chords  
      '9', '11', '13', '7#11', '7b9', '7#9',      // Dominant extensions
      'sus2', 'sus4', '7sus4', '7sus2',           // Suspended chords
      'maj7#11', '6/9', 'm6/9', 'add13'          // Compound intervals
    ];
    
    // Create a progression that flows well for tapping patterns
    const progression: string[] = [];
    const baseNote = notes[Math.floor(Math.random() * notes.length)];
    const baseIndex = notes.indexOf(baseNote);
    
    // Build a progression with good voice leading for tapping
    const intervals = [0, 5, 2, 7]; // I - IV - ii - V pattern but spread for tapping
    
    for (let i = 0; i < 4; i++) {
      const noteIndex = (baseIndex + intervals[i]) % 12;
      const note = notes[noteIndex];
      const chordType = tappingChordTypes[Math.floor(Math.random() * tappingChordTypes.length)];
      progression.push(note + chordType);
    }
    
    return progression;
  };

  const rollDice = async () => {
    if (isRolling || isIncrementingRoll) return;
    
    // Check if user clicked premium modes or selected premium genres without subscription
    const isPremiumMode = currentMode === 'random' || currentMode === 'tapping';
    const isPremiumGenre = genres.find(g => g.value === selectedGenre)?.isPremium;
    
    if ((isPremiumMode || isPremiumGenre) && !hasActiveSubscription) {
      onUpgrade?.();
      return;
    }

    // Check if user has reached their dice roll limit (unless premium)
    if (!hasActiveSubscription && !canUseDiceRoll) {
      onUpgrade?.();
      return;
    }
    
    setIsRolling(true);

    try {
      // Increment usage for non-premium users
      if (!hasActiveSubscription) {
        await incrementDiceRoll();
      }

      setTimeout(() => {
        // Roll optional premium dice if enabled
        if (showTimeSignature) {
          const timeSignatures = ['2/4', '3/4', '4/4', '5/4', '6/8', '7/8', '9/8', '12/8'];
          const randomTimeSignature = timeSignatures[Math.floor(Math.random() * timeSignatures.length)];
          setTimeSignatureValue(randomTimeSignature);
        }
        
        if (showMetronome) {
          // Generate BPM between 60-200 in increments of 10
          const bpmOptions = [60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200];
          const randomBPM = bpmOptions[Math.floor(Math.random() * bpmOptions.length)];
          setMetronomeValue(randomBPM);
        }
        
        if (currentMode === 'random') {
          // Random mode - generate completely random chord progression
          const progression = generateRandomChords();
          trackEvent('dice_roll', 'Dice', `${currentMode}-${selectedGenre}`, 1);
          onResult({ type: 'riff', progression });
        } else if (currentMode === 'tapping') {
          // Tapping mode - generate double hand tapping chord combinations
          const progression = generateTappingChords();
          trackEvent('dice_roll', 'Dice', `${currentMode}-${selectedGenre}`, 1);
          onResult({ type: 'riff', progression });
        } else {
          // 3-Dice Bridge System
          // Roll all three dice
          const mainDiceRoll = Math.floor(Math.random() * 8) + 1;
          const bridgeRoll = Math.floor(Math.random() * 8) + 1;
          const supportingDiceRoll = Math.floor(Math.random() * 8) + 1;
          
          setColorDiceValue(mainDiceRoll);
          setbridgeDiceValue(bridgeRoll);
          setSupportingDiceValue(supportingDiceRoll);
          
          // Generate main chord (Dice 1)
          const { chord: mainChord, colorName } = generateChord(mainDiceRoll, mainDiceRoll);
          
          // Generate supporting chord (Dice 3)
          const { chord: supportingChord } = generateChord(supportingDiceRoll, supportingDiceRoll);
          
          // Generate bridge pattern (Dice 2) - connects main and supporting chords
          const bridgePattern = generateBridgePattern(mainChord, supportingChord);
          
          // Update dice displays with actual chord symbols and pattern name
          setMainChordDisplay(mainChord);
          setBridgePatternDisplay(bridgePattern.name);
          setSupportingChordDisplay(supportingChord);

          if (currentMode === 'single') {
            // Single mode: Show main chord + bridge info
            trackEvent('dice_roll', 'Dice', `${currentMode}-${selectedGenre}-${mainChord}`, 1);
            onResult({ 
              type: 'single', 
              chord: mainChord, 
              colorName,
              bridgePattern,
              mainChord,
              supportingChord
            });
          } else {
            // Riff mode: Create 3-chord progression (Main → Supporting → Variation)
            const progression = [mainChord, supportingChord, mainChord]; // Simple progression
            trackEvent('dice_roll', 'Dice', `${currentMode}-${selectedGenre}`, 1);
            onResult({ 
              type: 'riff', 
              progression,
              bridgePattern,
              mainChord,
              supportingChord
            });
          }
        }
        
        setIsRolling(false);
      }, 1000);
    } catch (error) {
      console.error('Error rolling dice:', error);
      setIsRolling(false);
      // If usage limit reached, trigger upgrade modal
      if (error instanceof Error && error.message.includes('limit reached')) {
        onUpgrade?.();
      }
    }
  };

  const colorGroup = colorGroups[colorDiceValue - 1];

  // Genre-based background mapping with multiple images per genre
  const backgroundImage = useMemo(() => {
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
    
    // Get backgrounds for selected genre
    const backgrounds = genreBackgrounds[selectedGenre] || [metalBg1];
    
    // Randomly select one from the available backgrounds each time genre changes
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    return backgrounds[randomIndex];
  }, [selectedGenre]);

  return (
    <div 
      className="bg-card rounded-lg p-6 border border-border relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <h2 className="text-lg font-semibold mb-4 text-center">Roll the Dice</h2>
      
      {/* Genre Selection */}
      <div className="mb-4">
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Musical Genre</label>
        <Select value={selectedGenre} onValueChange={(value: Genre) => setSelectedGenre(value)}>
          <SelectTrigger className="w-full" data-testid="select-genre">
            <SelectValue placeholder="Select a genre">
              {selectedGenre && genres.find(g => g.value === selectedGenre)?.label}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {genres.map((genre) => (
              <SelectItem 
                key={genre.value} 
                value={genre.value}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{genre.label}</span>
                      {genre.isPremium && (
                        <Badge variant="secondary" className="h-4 px-1 flex items-center justify-center">
                          <Crown className="h-2 w-2" />
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{genre.description}</span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Dice Display - 3-Dice Bridge System */}
      <div className="flex justify-center space-x-4 mb-6 flex-wrap gap-y-4">
        {/* Dice 1: Main Chord */}
        <div className="text-center">
          <div 
            className={`w-20 h-20 rounded-lg flex items-center justify-center mb-2 border-2 border-gray-600 bg-purple-600 ${isRolling ? 'animate-dice-roll' : ''}`}
            data-testid="dice-main"
          >
            <span className="text-sm font-bold text-white drop-shadow-lg leading-tight">{mainChordDisplay}</span>
          </div>
          <span className="text-xs text-muted-foreground font-semibold">Main Chord</span>
        </div>
        
        {/* Dice 2: Bridge Pattern */}
        <div className="text-center max-w-[100px]">
          <div 
            className={`w-20 h-20 rounded-lg flex items-center justify-center mb-2 border-2 border-primary bg-gradient-to-br from-primary/80 to-primary ${isRolling ? 'animate-dice-roll' : ''}`}
            data-testid="dice-bridge"
          >
            <span className="text-[10px] font-bold text-white drop-shadow-lg leading-tight px-1 text-center">{bridgePatternDisplay}</span>
          </div>
          <span className="text-xs text-muted-foreground font-semibold">Bridge</span>
        </div>

        {/* Dice 3: Supporting Chord */}
        <div className="text-center">
          <div 
            className={`dice-face w-20 h-20 rounded-lg flex items-center justify-center mb-2 border-2 border-gray-600 bg-orange-600 ${isRolling ? 'animate-dice-roll' : ''}`}
            data-testid="dice-supporting"
          >
            <span className="text-sm font-bold text-white drop-shadow-lg leading-tight">{supportingChordDisplay}</span>
          </div>
          <span className="text-xs text-muted-foreground font-semibold">Supporting</span>
        </div>
      </div>

      {/* Optional Premium Dice */}
      {hasActiveSubscription && (
        <div className="mt-4 space-y-3">
          <div className="text-xs text-muted-foreground text-center mb-2">
            <Crown className="h-3 w-3 inline mr-1" />
            Optional Premium Dice
          </div>
          
          {/* Time Signature Toggle and Display */}
          <div className="flex items-center gap-3">
            <Button
              variant={showTimeSignature ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowTimeSignature(!showTimeSignature)}
              className="flex-shrink-0"
              data-testid="button-toggle-time-signature"
            >
              {showTimeSignature ? 'Hide' : 'Show'} Time
            </Button>
            {showTimeSignature && (
              <div className="flex items-center gap-2 flex-1">
                <div 
                  className={`dice-face w-16 h-16 rounded-lg flex items-center justify-center border-2 border-primary/50 ${isRolling ? 'animate-dice-roll' : ''}`}
                  data-testid="dice-time-signature"
                >
                  <span className="text-sm font-bold text-foreground">{timeSignatureValue}</span>
                </div>
                <span className="text-xs text-muted-foreground">Time Signature</span>
              </div>
            )}
          </div>

          {/* Metronome BPM Toggle and Display */}
          <div className="flex items-center gap-3">
            <Button
              variant={showMetronome ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowMetronome(!showMetronome)}
              className="flex-shrink-0"
              data-testid="button-toggle-metronome"
            >
              {showMetronome ? 'Hide' : 'Show'} BPM
            </Button>
            {showMetronome && (
              <div className="flex items-center gap-2 flex-1">
                <div 
                  className={`dice-face w-16 h-16 rounded-lg flex items-center justify-center border-2 border-primary/50 ${isRolling ? 'animate-dice-roll' : ''}`}
                  data-testid="dice-metronome"
                >
                  <span className="text-sm font-bold text-foreground">{metronomeValue}</span>
                </div>
                <span className="text-xs text-muted-foreground">BPM (Tempo)</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Game Mode Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Button
          variant={currentMode === 'single' ? 'default' : 'secondary'}
          className="py-3 px-2 font-medium transition-all transform active:scale-95 min-h-[48px] text-xs"
          onClick={() => setCurrentMode('single')}
          data-testid="button-single-roll"
        >
          <i className="fas fa-dice-one mr-1"></i>Single
        </Button>
        <Button
          variant={currentMode === 'riff' ? 'default' : 'secondary'}
          className="py-3 px-2 font-medium transition-all transform active:scale-95 min-h-[48px] text-xs"
          onClick={() => setCurrentMode('riff')}
          data-testid="button-riff-mode"
        >
          <i className="fas fa-music mr-1"></i>Riff
        </Button>
        <Button
          variant={currentMode === 'random' ? 'default' : 'secondary'}
          className={`py-3 px-2 font-medium transition-all transform active:scale-95 min-h-[48px] text-xs relative ${
            !hasActiveSubscription ? 'pr-6' : ''
          }`}
          onClick={() => {
            if (!hasActiveSubscription) {
              onUpgrade?.();
            } else {
              setCurrentMode('random');
            }
          }}
          data-testid="button-random-mode"
        >
          <i className="fas fa-random mr-1"></i>Random
          {!hasActiveSubscription && (
            <Badge variant="secondary" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">
              <Crown className="h-2 w-2" />
            </Badge>
          )}
        </Button>
        <Button
          variant={currentMode === 'tapping' ? 'default' : 'secondary'}
          className={`py-3 px-2 font-medium transition-all transform active:scale-95 min-h-[48px] text-xs relative ${
            !hasActiveSubscription ? 'pr-6' : ''
          }`}
          onClick={() => {
            if (!hasActiveSubscription) {
              onUpgrade?.();
            } else {
              setCurrentMode('tapping');
            }
          }}
          data-testid="button-tapping-mode"
        >
          <i className="fas fa-guitar mr-1"></i>Tapping
          {!hasActiveSubscription && (
            <Badge variant="secondary" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">
              <Crown className="h-2 w-2" />
            </Badge>
          )}
        </Button>
      </div>

      {/* Usage Counter (for non-premium users) */}
      {!hasActiveSubscription && usageStatus && (
        <div className="mb-4 p-3 bg-muted/50 rounded-lg border" data-testid="usage-counter">
          {isTestUser ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                Test User - Unlimited Access
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm font-medium">Free Generations</span>
              </div>
              <div className="text-sm font-semibold" data-testid="text-remaining-rolls">
                {remainingRolls} of {usageStatus.diceRollsLimit} left
              </div>
            </div>
          )}
          
          {/* Progress bar and usage info - hidden for test users */}
          {!isTestUser && (
            <>
              {/* Progress bar */}
              <div className="mt-2 w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    remainingRolls > 2 ? 'bg-green-500' : 
                    remainingRolls > 0 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ 
                    width: `${(remainingRolls / (usageStatus.diceRollsLimit || 5)) * 100}%` 
                  }}
                />
              </div>
              
              {/* Extra tokens display */}
              {extraTokens > 0 && (
                <div className="mt-2 text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <i className="fas fa-plus-circle"></i>
                  +{extraTokens} bonus roll{extraTokens > 1 ? 's' : ''} from ads
                </div>
              )}
              
              {/* Ad watch section */}
              {remainingRolls <= 2 && !hasWatchedMaxAds && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Get more rolls</span>
                    <span className="text-xs text-muted-foreground">{usageStatus?.adsWatchedCount || 0}/5 ads today</span>
                  </div>
                  <Button
                    onClick={async () => {
                      try {
                        // Show AdMob rewarded video ad
                        await admobService.showRewardedAd();
                        
                        // After ad completes, call backend to grant reward
                        await watchAd();
                        
                        toast({
                          title: "Reward earned!",
                          description: "You received 1 bonus dice roll. Thanks for watching!",
                        });
                      } catch (error: any) {
                        console.error('Error watching ad:', error);
                        
                        // Show user-friendly error message
                        toast({
                          title: "Ad not available",
                          description: error.message?.includes('cancelled') 
                            ? "Ad was cancelled" 
                            : "Unable to load ad right now. Please try again later.",
                          variant: "destructive",
                        });
                      }
                    }}
                    disabled={isWatchingAd || hasWatchedMaxAds}
                    variant="outline"
                    size="sm"
                    className="w-full"
                    data-testid="button-watch-ad"
                  >
                    {isWatchingAd ? (
                      <>
                        <Play className="h-3 w-3 mr-1 animate-pulse" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3 mr-1" />
                        Watch Ad (+1 Roll)
                      </>
                    )}
                  </Button>
                </div>
              )}
              
              {/* No rolls left message */}
              {remainingRolls === 0 && hasWatchedMaxAds && (
                <div className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                  <i className="fas fa-times-circle"></i>
                  No rolls left. Daily limit reached. Upgrade to premium for unlimited access.
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Roll Button */}
      <Button
        variant="secondary"
        className="w-full bg-accent text-accent-foreground py-4 px-6 font-semibold text-lg hover:bg-accent/90 transition-all transform active:scale-95 shadow-lg min-h-[48px]"
        onClick={rollDice}
        disabled={isRolling || isIncrementingRoll || (!hasActiveSubscription && !canUseDiceRoll)}
        data-testid="button-roll-dice"
      >
        {isRolling ? (
          <>
            <i className="fas fa-spinner fa-spin mr-2"></i>Rolling...
          </>
        ) : (
          <>
            <i className="fas fa-dice mr-2"></i>Roll Dice
          </>
        )}
      </Button>
    </div>
  );
}
