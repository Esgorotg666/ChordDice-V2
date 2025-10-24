// Affiliate program configuration for music gear retailers

export interface AffiliateProgram {
  id: string;
  name: string;
  region: 'US' | 'EU' | 'Global';
  commissionRate: string;
  baseUrl: string;
  affiliateParam: string; // URL parameter for affiliate tracking
}

export const AFFILIATE_PROGRAMS: AffiliateProgram[] = [
  {
    id: 'sweetwater',
    name: 'Sweetwater',
    region: 'US',
    commissionRate: '5%',
    baseUrl: 'https://www.sweetwater.com',
    affiliateParam: 'mrkgadid=YOUR_SWEETWATER_ID', // Replace with actual affiliate ID
  },
  {
    id: 'guitar-center',
    name: 'Guitar Center',
    region: 'US',
    commissionRate: '3-5%',
    baseUrl: 'https://www.guitarcenter.com',
    affiliateParam: 'source=YOUR_GC_AFFILIATE_ID', // Replace with CJ affiliate ID
  },
  {
    id: 'thomann',
    name: 'Thomann',
    region: 'EU',
    commissionRate: '5%',
    baseUrl: 'https://www.thomann.de',
    affiliateParam: 'partner_id=YOUR_THOMANN_ID', // Replace with actual affiliate ID
  },
  {
    id: 'zzounds',
    name: 'zZounds',
    region: 'US',
    commissionRate: '3%',
    baseUrl: 'https://www.zzounds.com',
    affiliateParam: '3994582', // zZounds affiliate ID
  },
  {
    id: 'musicians-friend',
    name: "Musician's Friend",
    region: 'US',
    commissionRate: '3-5%',
    baseUrl: 'https://www.musiciansfriend.com',
    affiliateParam: 'source=YOUR_MF_AFFILIATE_ID', // Replace with CJ affiliate ID
  },
];

// Product categories with search terms
export interface GearRecommendation {
  category: 'guitar' | 'amp' | 'pedal' | 'accessory' | 'learning';
  name: string;
  description: string;
  searchTerm: string;
  icon: string;
  relevantTo?: string[]; // Which app features this is relevant to
}

export const GEAR_RECOMMENDATIONS: GearRecommendation[] = [
  // Guitars
  {
    category: 'guitar',
    name: 'BC Rich Warlock',
    description: 'Iconic metal guitar with aggressive styling',
    searchTerm: 'bc-rich-warlock',
    icon: '🎸',
    relevantTo: ['metal', 'extreme-metal', 'black-metal', 'death-metal'],
  },
  {
    category: 'guitar',
    name: 'Stratocaster',
    description: 'Versatile electric guitar for rock, blues, and more',
    searchTerm: 'fender-stratocaster',
    icon: '🎸',
    relevantTo: ['rock', 'blues', 'any'],
  },
  {
    category: 'guitar',
    name: 'Classical Guitar',
    description: 'Perfect for flamenco and classical playing',
    searchTerm: 'classical-guitar',
    icon: '🎸',
    relevantTo: ['flamenco', 'neo-classical'],
  },
  {
    category: 'guitar',
    name: 'Jazz Guitar',
    description: 'Hollow body guitar ideal for jazz tones',
    searchTerm: 'jazz-guitar-hollow-body',
    icon: '🎸',
    relevantTo: ['jazz'],
  },
  
  // Amps
  {
    category: 'amp',
    name: 'High-Gain Amp',
    description: 'Perfect for metal and hard rock',
    searchTerm: 'high-gain-amp-head',
    icon: '🔊',
    relevantTo: ['metal', 'extreme-metal', 'black-metal', 'death-metal', 'rock'],
  },
  {
    category: 'amp',
    name: 'Jazz Amp',
    description: 'Clean tones for jazz and blues',
    searchTerm: 'jazz-amp-clean',
    icon: '🔊',
    relevantTo: ['jazz', 'blues'],
  },
  
  // Pedals
  {
    category: 'pedal',
    name: 'Distortion Pedal',
    description: 'Essential for rock and metal tones',
    searchTerm: 'distortion-pedal',
    icon: '⚡',
    relevantTo: ['rock', 'metal', 'extreme-metal'],
  },
  {
    category: 'pedal',
    name: 'Reverb Pedal',
    description: 'Add depth and atmosphere',
    searchTerm: 'reverb-pedal',
    icon: '🌊',
    relevantTo: ['any'],
  },
  {
    category: 'pedal',
    name: 'Delay Pedal',
    description: 'Create ambient textures',
    searchTerm: 'delay-pedal',
    icon: '🔁',
    relevantTo: ['any'],
  },
  
  // Accessories
  {
    category: 'accessory',
    name: 'Metronome',
    description: 'Essential for practice and timing',
    searchTerm: 'metronome',
    icon: '⏱️',
    relevantTo: ['exercises'],
  },
  {
    category: 'accessory',
    name: 'Guitar Tuner',
    description: 'Keep your guitar in tune',
    searchTerm: 'guitar-tuner',
    icon: '🎵',
    relevantTo: ['any'],
  },
  {
    category: 'accessory',
    name: 'Capo',
    description: 'Change keys easily',
    searchTerm: 'guitar-capo',
    icon: '🔧',
    relevantTo: ['any'],
  },
  
  // Learning Materials
  {
    category: 'learning',
    name: 'Guitar Method Books',
    description: 'Structured learning for all levels',
    searchTerm: 'guitar-method-book',
    icon: '📚',
    relevantTo: ['classroom', 'exercises'],
  },
  {
    category: 'learning',
    name: 'Music Theory Books',
    description: 'Understand the theory behind the music',
    searchTerm: 'music-theory-book',
    icon: '📖',
    relevantTo: ['classroom'],
  },
];

// Helper to build affiliate link
export function buildAffiliateLink(
  program: AffiliateProgram,
  searchTerm: string
): string {
  // URL encode the search term for safety
  const encodedSearch = encodeURIComponent(searchTerm);
  
  // zZounds uses a different URL structure with affiliate ID in path
  if (program.id === 'zzounds') {
    // Format: https://www.zzounds.com/a--3994582/search?query=term
    return `${program.baseUrl}/a--${program.affiliateParam}/search?query=${encodedSearch}`;
  }
  
  // Customize search paths per retailer (based on their actual URL structures)
  let searchPath: string;
  switch (program.id) {
    case 'sweetwater':
      searchPath = `/store/search.php?s=${encodedSearch}`;
      break;
    case 'guitar-center':
      searchPath = `/search?Ntt=${encodedSearch}`;
      break;
    case 'thomann':
      searchPath = `/search_dir.html?sw=${encodedSearch}`;
      break;
    case 'musicians-friend':
      searchPath = `/search?Ntt=${encodedSearch}`;
      break;
    default:
      searchPath = `/search?query=${encodedSearch}`;
  }
  
  return `${program.baseUrl}${searchPath}&${program.affiliateParam}`;
}

// Helper to get recommended affiliate program based on user location
export function getRecommendedProgram(
  isEU: boolean,
  preferredProgram?: string
): AffiliateProgram {
  if (preferredProgram) {
    const program = AFFILIATE_PROGRAMS.find(p => p.id === preferredProgram);
    if (program) return program;
  }
  
  if (isEU) {
    return AFFILIATE_PROGRAMS.find(p => p.id === 'thomann')!;
  }
  
  // Default to Sweetwater for US (highest commission)
  return AFFILIATE_PROGRAMS.find(p => p.id === 'sweetwater')!;
}

// Helper to get gear recommendations for a specific context
export function getGearForContext(context: string): GearRecommendation[] {
  return GEAR_RECOMMENDATIONS.filter(
    gear => !gear.relevantTo || gear.relevantTo.includes(context) || gear.relevantTo.includes('any')
  );
}
