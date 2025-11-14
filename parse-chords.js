import fs from 'fs';

// Read the chord file
const chordData = fs.readFileSync('attached_assets/Pasted--All-Guitar-Chords-480-Chords-Across-12-Root-Notes-Format-Chord-Name-Abbreviation-fret-num-1761138983805_1761138983805.txt', 'utf8');

const lines = chordData.split('\n');
const chords = {};

for (const line of lines) {
  // Skip comments and empty lines
  if (line.startsWith('#') || line.startsWith('##') || line.trim() === '') {
    continue;
  }

  // Parse format: Chord Name (Abbreviation): (fret numbers)E<fret>A<fret>D<fret>G<fret>b<fret>e<fret>
  const match = line.match(/^(.+?)\s+\(([^)]+)\):\s+\(([^)]+)\)/);
  if (!match) continue;

  const fullName = match[1].trim();
  const abbrev = match[2].trim();
  const fretString = match[3].trim();

  // Extract positions from format like "x02220"
  const positions = [];
  for (let i = 0; i < 6; i++) {
    const char = fretString[i];
    if (char === 'x') {
      positions.push('X');
    } else if (char >= '0' && char <= '9') {
      positions.push(parseInt(char));
    } else if (char >= 'a' && char <= 'z') {
      // Handle hex digits (a=10, b=11, c=12, d=13)
      positions.push(char.charCodeAt(0) - 'a'.charCodeAt(0) + 10);
    } else {
      positions.push('X');
    }
  }

  // Determine fret number (starting fret for barre/high-position chords)
  // Only add fret property if:
  // 1. Chord name contains "Barre", OR
  // 2. All non-muted strings are fretted above fret 1 (no open strings)
  let minFret = 999;
  let hasOpenStrings = false;
  
  for (const pos of positions) {
    if (pos === 0) {
      hasOpenStrings = true;
    }
    if (pos !== 'X' && pos !== 0 && pos < minFret) {
      minFret = pos;
    }
  }

  // Determine chord key
  let key = abbrev;
  if (fullName.includes('Barre')) {
    key = abbrev + '_barre';
  }

  // Build chord object
  const chord = {
    name: fullName,
    positions: positions
  };

  // Add fret property ONLY if it's a barre chord or high-position chord without open strings
  const isBarre = fullName.includes('Barre');
  const isHighPosition = !hasOpenStrings && minFret > 1 && minFret !== 999;
  
  if (isBarre || isHighPosition) {
    chord.fret = minFret;
  }

  chords[key] = chord;
}

// Generate TypeScript code
let output = 'export const chordDiagrams: Record<string, ChordDiagram> = {\n';

for (const [key, chord] of Object.entries(chords)) {
  const posStr = chord.positions.map(p => typeof p === 'number' ? p : `'${p}'`).join(', ');
  const fretStr = chord.fret ? `, fret: ${chord.fret}` : '';
  output += `  '${key}': { name: '${chord.name}', positions: [${posStr}]${fretStr} },\n`;
}

output += '};\n';

fs.writeFileSync('generated-chords.ts', output);
console.log(`Generated ${Object.keys(chords).length} chord diagrams`);
