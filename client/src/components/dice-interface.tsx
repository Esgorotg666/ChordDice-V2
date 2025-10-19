import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Crown, Play, Eye } from "lucide-react";
import { colorGroups, exoticNumbers } from "@/lib/music-data";
import { useAuthContext } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useUsageTracking } from "@/hooks/useUsageTracking";

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
  onResult: (result: { type: 'single' | 'riff'; chord?: string; colorName?: string; progression?: string[] }) => void;
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
  
  const [currentMode, setCurrentMode] = useState<'single' | 'riff' | 'random' | 'tapping'>('single');
  const [selectedGenre, setSelectedGenre] = useState<Genre>('any');
  const [isRolling, setIsRolling] = useState(false);
  const [colorDiceValue, setColorDiceValue] = useState(4);
  const [numberDiceValue, setNumberDiceValue] = useState(4);
  const [chordTypeDiceValue, setChordTypeDiceValue] = useState('Maj'); // Display chord type instead of number
  
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
        if (isMinor) {
          // 10 authentic minor jazz progressions
          const jazzMinorProgressions = [
            // 1. John Coltrane "Blue Bossa" - Minor ii-V-i
            [buildChord(2, 'm7b5'), buildChord(7, '7'), buildChord(0, 'm7'), buildChord(5, 'm7')],
            // 2. Minor ii-V-i with extensions
            [buildChord(2, 'm7b5'), buildChord(7, '7'), buildChord(0, 'm7'), buildChord(8, 'M7')],
            // 3. Minor blues form
            [buildChord(0, 'm7'), buildChord(5, 'm7'), buildChord(0, 'm7'), buildChord(7, '7')],
            // 4. Modal minor progression
            [buildChord(0, 'm7'), buildChord(10, '7'), buildChord(8, 'M7'), buildChord(7, '7')],
            // 5. Minor turnaround
            [buildChord(0, 'm7'), buildChord(9, 'm7'), buildChord(2, 'm7b5'), buildChord(7, '7')],
            // 6. Dorian minor vamp
            [buildChord(0, 'm7'), buildChord(5, 'm7'), buildChord(0, 'm9'), buildChord(5, 'm9')],
            // 7. Minor with altered dominants
            [buildChord(2, 'm7b5'), buildChord(7, '7'), buildChord(0, 'm7'), buildChord(5, 'm7')],
            // 8. Minor backdoor progression
            [buildChord(5, 'm7'), buildChord(8, '7'), buildChord(0, 'm7'), buildChord(7, '7')],
            // 9. Minor Coltrane-style changes
            [buildChord(0, 'm7'), buildChord(3, '7'), buildChord(8, 'M7'), buildChord(0, 'm7')],
            // 10. Extended minor turnaround
            [buildChord(4, 'm7'), buildChord(10, '7'), buildChord(0, 'm7'), buildChord(7, '7')]
          ];
          return jazzMinorProgressions[randomIndex];
        } else {
          // 10 authentic major jazz progressions from Miles Davis, John Coltrane, etc.
          const jazzMajorProgressions = [
            // 1. Miles Davis "Autumn Leaves" - ii-V-I resolution
            [buildChord(2, 'm7'), buildChord(7, '7'), buildChord(0, 'M7'), buildChord(5, 'M7')],
            // 2. Dizzy Gillespie "I Got Rhythm" - Rhythm changes
            [buildChord(0, 'M7'), buildChord(9, 'm7'), buildChord(2, 'm7'), buildChord(7, '7')],
            // 3. Miles Davis "All Blues" - Blues form
            [buildChord(0, '7'), buildChord(5, '7'), buildChord(7, '7'), buildChord(0, '7')],
            // 4. Duke Ellington "Satin Doll" - Extended turnaround
            [buildChord(4, 'm7'), buildChord(9, 'm7'), buildChord(2, 'm7'), buildChord(7, '7')],
            // 5. John Coltrane "Giant Steps" - Ascending build
            [buildChord(0, 'M7'), buildChord(5, 'M7'), buildChord(2, 'm7'), buildChord(7, '7')],
            // 6. Dizzy Gillespie "Blues for Alice" - Bird blues
            [buildChord(10, '7'), buildChord(3, '7'), buildChord(8, 'M7'), buildChord(0, 'M7')],
            // 7. John Coltrane "Giant Steps" - Coltrane changes
            [buildChord(0, 'M7'), buildChord(3, '7'), buildChord(8, 'M7'), buildChord(11, '7')],
            // 8. Thelonious Monk "Misty" influences - Backdoor progression
            [buildChord(5, 'm7'), buildChord(10, '7'), buildChord(0, 'M7'), buildChord(7, '7')],
            // 9. Billie Holiday "All the Things You Are" - Modal shift
            [buildChord(9, 'm7'), buildChord(2, '7'), buildChord(7, 'M7'), buildChord(0, 'M7')],
            // 10. Standard I-vi-ii-V progression
            [buildChord(0, 'M7'), buildChord(9, 'm7'), buildChord(2, 'm7'), buildChord(7, '7')]
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
        // 10 authentic rock progressions from Led Zeppelin, Iron Maiden, Ozzy, etc.
        const rockProgressions = [
          // 1. Ozzy Osbourne "Crazy Train" - Classic I-IV-V drive
          [buildChord(0), buildChord(5), buildChord(7), buildChord(0)],
          // 2. Led Zeppelin "Rock and Roll" - Uplifting I-IV-V
          [buildChord(0), buildChord(5), buildChord(7), buildChord(0)],
          // 3. U2 "With or Without You" - Anthemic cycle
          [buildChord(0), buildChord(7), buildChord(9, 'm'), buildChord(5)],
          // 4. System of a Down "Lonely Day" - Emotional build
          [buildChord(9, 'm'), buildChord(5), buildChord(0), buildChord(7)],
          // 5. Scorpions "Rock You Like a Hurricane" - Retro energy
          [buildChord(0), buildChord(10), buildChord(5), buildChord(0)],
          // 6. Iron Maiden "The Trooper" - Minor hard rock
          [buildChord(0, 'm'), buildChord(7), buildChord(9, 'm'), buildChord(5)],
          // 7. Kiss "Rock and Roll All Nite" - Simplified drive
          [buildChord(0), buildChord(5), buildChord(7), buildChord(0)],
          // 8. Red Hot Chili Peppers "Under the Bridge" - Descending tension
          [buildChord(9, 'm'), buildChord(7), buildChord(5), buildChord(4, 'm')],
          // 9. Dio "Holy Diver" - Melodic flow
          [buildChord(0), buildChord(9, 'm'), buildChord(5), buildChord(7)],
          // 10. Motley Crue "Kickstart My Heart" - Power sequence
          [buildChord(0), buildChord(7), buildChord(5), buildChord(0)]
        ];
        return rockProgressions[randomIndex];
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
        // 10 authentic funk progressions from Parliament-Funkadelic, Earth Wind & Fire, etc.
        const funkProgressions = [
          // 1. Parliament-Funkadelic "Give Up the Funk" - Static E9 vamp
          [buildChord(0, '9'), buildChord(0, '9'), buildChord(0, '9'), buildChord(0, '9')],
          // 2. Sly and the Family Stone "Thank You" - Minor-dominant alternation
          [buildChord(9, 'm7'), buildChord(2, '7'), buildChord(9, 'm7'), buildChord(2, '7')],
          // 3. Tower of Power "What Is Hip?" - Chromatic ninth shift
          [buildChord(0, '9'), buildChord(2, '9'), buildChord(1, '9'), buildChord(0, '9')],
          // 4. The Temptations "Papa Was A Rollin' Stone" - Soulful minor vamp
          [buildChord(0, 'm7'), buildChord(5, 'm7'), buildChord(0, 'm7'), buildChord(5, 'm7')],
          // 5. Earth Wind and Fire "September" - Extended groove
          [buildChord(0, 'm9'), buildChord(5, '13'), buildChord(0, 'm9'), buildChord(5, '13')],
          // 6. Bootsy Collins/Parliament "Flash Light" - Dominant resolution
          [buildChord(7, '7'), buildChord(0, '7'), buildChord(7, '7'), buildChord(0, '7')],
          // 7. Marvin Gaye "Got To Give It Up" - Minor cycle
          [buildChord(0, 'm7'), buildChord(5, 'm7'), buildChord(0, 'm7'), buildChord(5, 'm7')],
          // 8. Rick James "Super Freak" influences - Upbeat extension
          [buildChord(2, '9'), buildChord(7, '9'), buildChord(2, '9'), buildChord(7, '9')],
          // 9. Curtis Mayfield "Superfly" - Modal vamp
          [buildChord(9, 'm'), buildChord(2, 'm'), buildChord(4, 'm'), buildChord(7)],
          // 10. Zapp "More Bounce to the Ounce" - Static extended minor
          [buildChord(0, 'm11'), buildChord(0, 'm11'), buildChord(0, 'm11'), buildChord(0, 'm11')]
        ];
        return funkProgressions[randomIndex];
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
        // 10 authentic classical progressions from Mozart, Bach, Beethoven, etc.
        const classicalProgressions = [
          // 1. Mozart Piano Sonata K. 545 - Authentic cadence
          [buildChord(0), buildChord(5), buildChord(7), buildChord(0)],
          // 2. Bach Prelude in C Major BWV 846 - Circle of fifths
          [buildChord(9, 'm'), buildChord(2, 'm'), buildChord(7), buildChord(0)],
          // 3. Handel variations - La Folia ground bass
          [buildChord(2, 'm'), buildChord(9, '7'), buildChord(2, 'm'), buildChord(0)],
          // 4. Bach chorales - Canon progression
          [buildChord(0), buildChord(7), buildChord(9, 'm'), buildChord(4, 'm')],
          // 5. Beethoven "Moonlight Sonata" - Minor descending
          [buildChord(0, 'm'), buildChord(8), buildChord(3), buildChord(10)],
          // 6. Mozart Eine Kleine Nachtmusik - Plagal-infused
          [buildChord(0), buildChord(9, 'm'), buildChord(5), buildChord(7)],
          // 7. Handel "Hallelujah" - Plagal cadence
          [buildChord(5), buildChord(0), buildChord(7), buildChord(0)],
          // 8. Schubert lieder - Deceptive cadence
          [buildChord(7), buildChord(9, 'm'), buildChord(5), buildChord(0)],
          // 9. Chopin preludes - Andalusian minor
          [buildChord(0, 'm'), buildChord(10), buildChord(8), buildChord(7)],
          // 10. Hildegard von Bingen (arr. Kronos) - Modal cycling
          [buildChord(0, 'm'), buildChord(8), buildChord(5, 'm'), buildChord(3)]
        ];
        return classicalProgressions[randomIndex];
      case 'flamenco':
        // Spanish Flamenco uses E Phrygian mode (traditional)
        // Phrygian: i-♭II-♭III-♭VII (authentic Spanish sound)
        if (isMinor) {
          return [
            buildChord(0, 'm'),    // i (tonic minor - E Phrygian)
            buildChord(1),         // ♭II (Phrygian characteristic)
            buildChord(3),         // ♭III
            buildChord(10)         // ♭VII
          ];
        } else {
          // Major flamenco (less common, but uses similar cadences)
          return [
            buildChord(0),         // I
            buildChord(10),        // ♭VII (Andalusian cadence)
            buildChord(8),         // ♭VI
            buildChord(7)          // V
          ];
        }
      case 'black-metal':
        // 10 authentic black metal progressions from Darkthrone, Mayhem, Dimmu Borgir, etc.
        const blackMetalProgressions = [
          // 1. Darkthrone "Transilvanian Hunger" - Haunting cyclical
          [buildChord(0, 'm'), buildChord(8), buildChord(5, 'm'), buildChord(3)],
          // 2. Dark Funeral "The Secrets of the Black Arts" - Andalusian descent
          [buildChord(0, 'm'), buildChord(8), buildChord(5, 'm'), buildChord(7)],
          // 3. Dimmu Borgir "Progenies of the Great Apocalypse" - Symphonic dissonance
          [buildChord(0, 'm'), buildChord(8), buildChord(3), buildChord(10)],
          // 4. Mayhem "Freezing Moon" - Harmonic minor atmospheric
          [buildChord(0, 'm'), buildChord(10), buildChord(8, 'm'), buildChord(9)],
          // 5. Cradle of Filth "Her Ghost in the Fog" - Eerie diminished
          [buildChord(0, 'm'), buildChord(11, '°'), buildChord(0, 'm'), buildChord(11, '°')],
          // 6. Der Weg Einer Freiheit "Noktvrn" - Post-black modal
          [buildChord(0, 'm'), buildChord(7, 'm'), buildChord(8), buildChord(3)],
          // 7. Behemoth "O Father O Satan O Sun!" - Epic minor with major
          [buildChord(0, 'm'), buildChord(10), buildChord(5), buildChord(9)],
          // 8. 1349 "I Am Abomination" - Augmented chaos
          [buildChord(0, 'm'), buildChord(8, '+'), buildChord(3), buildChord(10)],
          // 9. Nargaroth "Black Metal Ist Krieg" - Tremolo cycling
          [buildChord(0, 'm'), buildChord(8), buildChord(3), buildChord(7)],
          // 10. Peste Noire "Le Dernier Putsch" - Folk-black despairing
          [buildChord(0, 'm'), buildChord(3), buildChord(10), buildChord(8)]
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
        // 10 authentic extreme metal progressions from Slayer, Morbid Angel, Nile, etc.
        const extremeMetalProgressions = [
          // 1. Slayer "Raining Blood" - Chromatic power chord descent
          [buildChord(0, '5'), buildChord(11, '5'), buildChord(10, '5'), buildChord(9, '5')],
          // 2. Morbid Angel "God of Emptiness" - Tritone dissonance
          [buildChord(0, 'm'), buildChord(6, '5'), buildChord(0, 'm'), buildChord(6, '5')],
          // 3. Dying Fetus "Your Blood Is My Wine" - Aeolian melodic
          [buildChord(0, 'm'), buildChord(8), buildChord(3), buildChord(10)],
          // 4. Sodom "Agent Orange" - Chromatic drop power chords
          [buildChord(0, '5'), buildChord(10, '5'), buildChord(9, '5'), buildChord(8, '5')],
          // 5. Nile "Sacrifice Unto Sebek" - Phrygian ascent exotic
          [buildChord(0, '5'), buildChord(1, '5'), buildChord(3, '5'), buildChord(4, '5')],
          // 6. Necrophagist "Fermented Offal Discharge" - Diminished technical
          [buildChord(11, '°'), buildChord(0), buildChord(2, 'm'), buildChord(0)],
          // 7. Beherit "The Gate of Nanna" - Diminished interruption
          [buildChord(0, 'm'), buildChord(11, '°'), buildChord(0, 'm'), buildChord(11, '°')],
          // 8. Deicide "Dead by Dawn" - Descending minor resolution
          [buildChord(0, 'm'), buildChord(10), buildChord(8), buildChord(7)],
          // 9. Dark Funeral "Open the Gates" - Aeolian chromatic tremolo
          [buildChord(0, 'm'), buildChord(8), buildChord(3), buildChord(10)],
          // 10. Archspire "Drone Corpse Aviator" - Cyclical technical
          [buildChord(0, 'm'), buildChord(8), buildChord(3), buildChord(7)]
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
          onResult({ type: 'riff', progression });
        } else if (currentMode === 'tapping') {
          // Tapping mode - generate double hand tapping chord combinations
          const progression = generateTappingChords();
          onResult({ type: 'riff', progression });
        } else {
          // Normal dice-based generation
          const colorRoll = Math.floor(Math.random() * 8) + 1;
          const numberRoll = Math.floor(Math.random() * 8) + 1;
          
          setColorDiceValue(colorRoll);
          setNumberDiceValue(numberRoll);
          
          // Map number to chord type label for display
          const chordTypeLabels: Record<number, string> = {
            1: 'Dim',   // Diminished
            2: 'Aug',   // Augmented
            3: 'Sus',   // Suspended
            4: 'Maj7',  // Major 7th
            5: '9th',   // 9th
            6: 'Maj',   // Major (default)
            7: 'Maj',   // Major (default)
            8: 'Maj'    // Major (default)
          };
          setChordTypeDiceValue(chordTypeLabels[numberRoll] || 'Maj');

          const { chord, colorName } = generateChord(colorRoll, numberRoll);

          if (currentMode === 'single') {
            onResult({ type: 'single', chord, colorName });
          } else {
            const progression = generateRiff(colorRoll, numberRoll);
            onResult({ type: 'riff', progression });
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
      
      {/* Dice Display */}
      <div className="flex justify-center space-x-6 mb-6">
        {/* Color Die */}
        <div className="text-center">
          <div 
            className={`w-16 h-16 rounded-lg flex items-center justify-center mb-2 border-2 border-gray-600 ${colorGroup.class} ${isRolling ? 'animate-dice-roll' : ''}`}
            data-testid="dice-color"
          >
            <span className="text-xl font-bold text-white drop-shadow-lg">{colorDiceValue}</span>
          </div>
          <span className="text-xs text-muted-foreground">Color Die</span>
        </div>
        
        {/* Chord Type Die */}
        <div className="text-center">
          <div 
            className={`dice-face w-16 h-16 rounded-lg flex items-center justify-center mb-2 ${isRolling ? 'animate-dice-roll' : ''}`}
            data-testid="dice-chord-type"
          >
            <span className="text-sm font-bold text-foreground">{chordTypeDiceValue}</span>
          </div>
          <span className="text-xs text-muted-foreground">Chord Type</span>
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
                        await watchAd();
                      } catch (error) {
                        console.error('Error watching ad:', error);
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
                        Watching Ad...
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3 mr-1" />
                        Watch Ad (+1 Roll)
                      </>
                    )}
                  </Button>
                  {adError && (
                    <div className="text-xs text-red-600 dark:text-red-400">
                      Error: {adError}
                    </div>
                  )}
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
