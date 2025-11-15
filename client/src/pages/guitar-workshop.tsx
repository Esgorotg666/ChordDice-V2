import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Wrench, Zap, Radio, Settings, AlertCircle, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function GuitarWorkshop() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Wrench className="h-8 w-8 text-primary" />
          Guitar Builder's Workshop
        </h1>
        <p className="text-muted-foreground text-lg">
          Professional guides for guitar repair, maintenance, and custom modifications
        </p>
      </div>

      <Tabs defaultValue="maintenance" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="maintenance" data-testid="tab-maintenance">
            <Settings className="h-4 w-4 mr-2" />
            Maintenance
          </TabsTrigger>
          <TabsTrigger value="electronics" data-testid="tab-electronics">
            <Zap className="h-4 w-4 mr-2" />
            Electronics
          </TabsTrigger>
          <TabsTrigger value="wiring" data-testid="tab-wiring">
            <Radio className="h-4 w-4 mr-2" />
            Wiring Diagrams
          </TabsTrigger>
        </TabsList>

        {/* MAINTENANCE TAB */}
        <TabsContent value="maintenance">
          <Accordion type="single" collapsible className="w-full space-y-4">
            
            {/* Restringing */}
            <AccordionItem value="restringing" className="border rounded-lg px-4">
              <AccordionTrigger data-testid="accordion-restringing">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold">Restringing Your Guitar</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Tools Needed
                    </p>
                    <ul className="text-sm space-y-1 ml-6 list-disc">
                      <li>String winder</li>
                      <li>Wire cutters</li>
                      <li>Tuner</li>
                      <li>Cloth for cleaning</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">1</Badge>
                      <div>
                        <p className="font-medium">Remove Old Strings</p>
                        <p className="text-sm text-muted-foreground">Loosen all strings completely using the tuning pegs. Cut strings in the middle and remove carefully. Clean the fretboard while strings are off.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">2</Badge>
                      <div>
                        <p className="font-medium">Install New Strings</p>
                        <p className="text-sm text-muted-foreground">Start with the low E string. Insert through bridge (or tailpiece), pull through tuning post hole. Leave 2-3 inches of slack for winding.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">3</Badge>
                      <div>
                        <p className="font-medium">Wind the Tuning Pegs</p>
                        <p className="text-sm text-muted-foreground">Bend string 90° at the post. Wind downward, keeping tension. Aim for 2-3 wraps on bass strings, 3-4 on treble strings. Trim excess with wire cutters.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">4</Badge>
                      <div>
                        <p className="font-medium">Stretch and Tune</p>
                        <p className="text-sm text-muted-foreground">Gently stretch each string by pulling upward at the 12th fret. Tune to pitch. Repeat stretching 2-3 times until strings hold tune.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Truss Rod Adjustment */}
            <AccordionItem value="trussrod" className="border rounded-lg px-4">
              <AccordionTrigger data-testid="accordion-trussrod">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold">Truss Rod Adjustment</span>
                  <Badge variant="destructive" className="text-xs">Advanced</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2 flex items-center gap-2 text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      CAUTION
                    </p>
                    <p className="text-sm text-muted-foreground">Over-tightening can damage your neck. Make small adjustments (1/4 turn max) and wait 24 hours between adjustments.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">1</Badge>
                      <div>
                        <p className="font-medium">Check Neck Relief</p>
                        <p className="text-sm text-muted-foreground">Tune to pitch. Fret the low E at 1st and last fret simultaneously. Check gap at 8th fret - should be about 0.010" (thickness of a business card).</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">2</Badge>
                      <div>
                        <p className="font-medium">Locate Truss Rod Nut</p>
                        <p className="text-sm text-muted-foreground">Usually at headstock (under cover) or inside soundhole (acoustic). Identify correct wrench size (typically 4mm, 5mm, or 1/4").</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">3</Badge>
                      <div>
                        <p className="font-medium">Make Adjustment</p>
                        <p className="text-sm text-muted-foreground"><strong>Clockwise (righty-tighty)</strong> = less relief (straighter neck). <strong>Counter-clockwise (lefty-loosey)</strong> = more relief (more bow). Turn 1/4 turn maximum.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">4</Badge>
                      <div>
                        <p className="font-medium">Wait and Recheck</p>
                        <p className="text-sm text-muted-foreground">Wait 24 hours for neck to settle. Recheck relief. Repeat if necessary with small adjustments.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Bridge and Nut Setup */}
            <AccordionItem value="bridge-nut" className="border rounded-lg px-4">
              <AccordionTrigger data-testid="accordion-bridge-nut">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold">Bridge and Nut Setup</span>
                  <Badge variant="destructive" className="text-xs">Advanced</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6 pt-4">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Setting String Height (Action)
                    </h4>
                    <div className="space-y-2 ml-6">
                      <p className="text-sm"><strong>Low action (fast playing):</strong> 1.5mm bass side, 1.0mm treble side at 12th fret</p>
                      <p className="text-sm"><strong>Medium action (balanced):</strong> 2.0mm bass side, 1.5mm treble side</p>
                      <p className="text-sm"><strong>High action (no buzzing):</strong> 2.5mm+ bass side, 2.0mm+ treble side</p>
                      <p className="text-sm text-muted-foreground mt-2">Adjust saddle height screws on Tune-o-matic or individual saddles on Strat-style bridges.</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Nut Slot Height
                    </h4>
                    <div className="space-y-2 ml-6">
                      <p className="text-sm">Fret each string at 3rd fret. Gap at 1st fret should be just barely visible (about 0.002"-0.005").</p>
                      <p className="text-sm text-muted-foreground">If too high, nut slots need filing (use proper nut files). If too low, nut needs replacement.</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Intonation Setup
                    </h4>
                    <div className="space-y-2 ml-6">
                      <p className="text-sm">Tune string to pitch. Play 12th fret harmonic, then fretted 12th fret note.</p>
                      <p className="text-sm"><strong>Fretted note sharp:</strong> Move saddle back (away from neck)</p>
                      <p className="text-sm"><strong>Fretted note flat:</strong> Move saddle forward (toward neck)</p>
                      <p className="text-sm text-muted-foreground">Repeat for all strings until harmonic and fretted notes match perfectly.</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Floyd Rose Setup */}
            <AccordionItem value="floyd-rose" className="border rounded-lg px-4">
              <AccordionTrigger data-testid="accordion-floyd-rose">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold">Floyd Rose Tremolo Setup</span>
                  <Badge variant="destructive" className="text-xs">Expert</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6 pt-4">
                  <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2 flex items-center gap-2 text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      Expert Level - Requires Patience
                    </p>
                    <p className="text-sm text-muted-foreground">Floyd Rose setup is iterative. Each adjustment affects others. Plan for multiple rounds of fine-tuning.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">1</Badge>
                      <div>
                        <p className="font-medium">String Installation</p>
                        <p className="text-sm text-muted-foreground">Cut ball ends off strings. Insert into bridge block, tighten clamp. Stretch through nut, insert into locking nut, tune to pitch. DO NOT lock nut yet.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">2</Badge>
                      <div>
                        <p className="font-medium">Set Bridge Parallel</p>
                        <p className="text-sm text-muted-foreground">Bridge baseplate should be parallel to body. Adjust spring claw screws in back cavity. Tighten = pulls bridge down. Loosen = lets bridge rise. Use 3 springs for standard tuning.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">3</Badge>
                      <div>
                        <p className="font-medium">Tune and Balance</p>
                        <p className="text-sm text-muted-foreground">Tune all strings to pitch. Check bridge parallel. Adjust spring tension if needed. Repeat until bridge stays parallel when in tune.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">4</Badge>
                      <div>
                        <p className="font-medium">Set Intonation</p>
                        <p className="text-sm text-muted-foreground">For each string: Tune to pitch. Compare 12th fret harmonic to fretted note. Loosen string lock screw at bridge, adjust saddle position, retighten lock screw, retune, test again.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">5</Badge>
                      <div>
                        <p className="font-medium">Lock the Nut</p>
                        <p className="text-sm text-muted-foreground">Once intonation is perfect on all strings, tighten locking nut clamps evenly. Use fine tuners only from this point. String changes require unlocking and repeating process.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Pro Tips</p>
                    <ul className="text-sm space-y-1 ml-4 list-disc">
                      <li>Block bridge with wood while changing strings to maintain spring tension</li>
                      <li>Stretch strings thoroughly before locking nut</li>
                      <li>Lubricate nut slots with graphite or nut sauce</li>
                      <li>Keep springs and claw screws oiled to prevent rust</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Changing Pickups */}
            <AccordionItem value="pickups" className="border rounded-lg px-4">
              <AccordionTrigger data-testid="accordion-pickups">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold">Changing Pickups</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Tools Needed
                    </p>
                    <ul className="text-sm space-y-1 ml-6 list-disc">
                      <li>Soldering iron (30-40W)</li>
                      <li>Solder (60/40 rosin core)</li>
                      <li>Wire cutters/strippers</li>
                      <li>Screwdrivers (Phillips and flathead)</li>
                      <li>Masking tape and marker (for labeling)</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">1</Badge>
                      <div>
                        <p className="font-medium">Document Current Wiring</p>
                        <p className="text-sm text-muted-foreground">Take photos of all connections BEFORE removing anything. Label wires with tape (hot, ground, north coil, south coil for 4-conductor).</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">2</Badge>
                      <div>
                        <p className="font-medium">Remove Old Pickup</p>
                        <p className="text-sm text-muted-foreground">Loosen strings. Remove pickguard/pickup ring screws. Desolder connections at volume pot or switch. Remove mounting screws and springs.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">3</Badge>
                      <div>
                        <p className="font-medium">Install New Pickup</p>
                        <p className="text-sm text-muted-foreground">Mount pickup with springs (compress to desired height). Route wires neatly. Match wire colors: Black/Green = hot, White/Red = series link (tape off for standard), Bare/Braided = ground.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">4</Badge>
                      <div>
                        <p className="font-medium">Solder Connections</p>
                        <p className="text-sm text-muted-foreground">Heat joint first, apply solder to joint (not iron). Hot wire to switch/pot lug, ground to pot casing or ground wire. Clean tip between joints.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">5</Badge>
                      <div>
                        <p className="font-medium">Test and Set Height</p>
                        <p className="text-sm text-muted-foreground">Reassemble, tune up, test all positions. Adjust height: ~2mm from string at last fret (neck pickup), ~1.5mm (bridge pickup). Closer = more output but possible magnetic pull.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Tuning Machines */}
            <AccordionItem value="tuners" className="border rounded-lg px-4">
              <AccordionTrigger data-testid="accordion-tuners">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold">Changing Tuning Machines</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">1</Badge>
                      <div>
                        <p className="font-medium">Measure and Match</p>
                        <p className="text-sm text-muted-foreground">Measure post hole diameter (usually 8mm, 10mm, or 11/32"). Check mounting screw pattern. Verify headstock thickness. Purchase matching replacement or use adapter bushings.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">2</Badge>
                      <div>
                        <p className="font-medium">Remove Old Tuners</p>
                        <p className="text-sm text-muted-foreground">Remove strings. Unscrew tuner buttons (if separate). Remove mounting screws from back of headstock. Gently pull tuners out from front.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">3</Badge>
                      <div>
                        <p className="font-medium">Install New Tuners</p>
                        <p className="text-sm text-muted-foreground">Insert from front, ensuring correct orientation (all buttons same side). Install bushings/washers. Secure with screws from back - snug but not over-tight. Ensure smooth rotation.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">4</Badge>
                      <div>
                        <p className="font-medium">String Up and Test</p>
                        <p className="text-sm text-muted-foreground">Restring guitar. Check for smooth operation, no binding. Locking tuners: insert string, tighten thumb wheel, tune with minimal wraps.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </TabsContent>

        {/* ELECTRONICS TAB */}
        <TabsContent value="electronics">
          <Accordion type="single" collapsible className="w-full space-y-4">
            
            {/* Volume and Tone Pots */}
            <AccordionItem value="pots" className="border rounded-lg px-4">
              <AccordionTrigger data-testid="accordion-pots">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold">Changing Volume and Tone Pots</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Choosing Pot Values</p>
                    <ul className="text-sm space-y-1 ml-4 list-disc">
                      <li><strong>250K pots:</strong> Single-coil pickups (Strat, Tele) - warmer, less bright</li>
                      <li><strong>500K pots:</strong> Humbuckers - brighter, more clarity</li>
                      <li><strong>Audio taper (A):</strong> Volume pots - smooth, gradual change</li>
                      <li><strong>Linear taper (B):</strong> Tone pots - even frequency roll-off</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">1</Badge>
                      <div>
                        <p className="font-medium">Identify Pot Type</p>
                        <p className="text-sm text-muted-foreground">Check existing pot markings (e.g., "A500K" or "B250K"). Note shaft type: solid shaft (push-on knob) or split shaft (set screw knob).</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">2</Badge>
                      <div>
                        <p className="font-medium">Desolder Old Pot</p>
                        <p className="text-sm text-muted-foreground">Heat each lug while gently pulling wire. Remove casing ground wire. Unscrew mounting nut from pickguard/control plate.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">3</Badge>
                      <div>
                        <p className="font-medium">Install New Pot</p>
                        <p className="text-sm text-muted-foreground">Insert through hole, secure with washer and nut. Orient so shaft rotates smoothly without wire interference. Solder ground wire to pot casing.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">4</Badge>
                      <div>
                        <p className="font-medium">Wire Connections</p>
                        <p className="text-sm text-muted-foreground"><strong>Volume:</strong> Input to lug 3, output to lug 2, lug 1 to ground. <strong>Tone:</strong> Input to lug 3, lug 2 to capacitor + ground, lug 1 to ground.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Tone Capacitor Values</p>
                    <ul className="text-sm space-y-1 ml-4 list-disc">
                      <li><strong>0.022µF:</strong> Strat-style, brighter tone roll-off</li>
                      <li><strong>0.047µF:</strong> Les Paul-style, darker tone roll-off</li>
                      <li>Film or ceramic types work well, vintage paper-in-oil for tone purists</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Input Jack */}
            <AccordionItem value="input-jack" className="border rounded-lg px-4">
              <AccordionTrigger data-testid="accordion-input-jack">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold">Changing Input Jack</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">1</Badge>
                      <div>
                        <p className="font-medium">Identify Jack Type</p>
                        <p className="text-sm text-muted-foreground"><strong>Barrel jack:</strong> Les Paul-style, mounts in side. <strong>Plate jack:</strong> Strat/Tele-style, mounts on body. <strong>Stereo vs Mono:</strong> Stereo for active pickups, mono for passive.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">2</Badge>
                      <div>
                        <p className="font-medium">Remove Old Jack</p>
                        <p className="text-sm text-muted-foreground">Desolder both lugs (tip = hot signal, sleeve = ground). For barrel jack, remove nut from inside cavity. For plate jack, remove mounting screws.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">3</Badge>
                      <div>
                        <p className="font-medium">Install and Wire New Jack</p>
                        <p className="text-sm text-muted-foreground">Mount securely. Solder hot signal (from volume pot output) to tip lug. Solder ground wire to sleeve lug. Ensure good solder joints - jack takes mechanical stress.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Badge variant="outline" className="h-6">4</Badge>
                      <div>
                        <p className="font-medium">Test Connection</p>
                        <p className="text-sm text-muted-foreground">Plug in cable and wiggle it. Should be snug with no crackling. If loose, tighten jack nut or bend tip contact slightly inward (carefully).</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      Common Problem
                    </p>
                    <p className="text-sm text-muted-foreground">If jack gets loose and spins, the nut is stripped. Use jack socket wrench or pliers with tape to tighten. Consider Switchcraft jack for better durability.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </TabsContent>

        {/* WIRING DIAGRAMS TAB */}
        <TabsContent value="wiring">
          <div className="space-y-6">
            
            {/* Pickup Configuration Diagrams */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5" />
                  Pickup Configuration Wiring Diagrams
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* 1 Humbucker */}
                <div className="border rounded-lg p-4 bg-card">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Badge>1</Badge>
                    Single Humbucker - 1 Volume, 1 Tone
                  </h3>
                  <pre className="text-xs bg-black/40 p-4 rounded overflow-x-auto font-mono">
{`                    TONE POT (500K)
                         ┌─────┐
                    ┌────┤  3  ├─── (to pickup hot)
                    │    └─────┘
                    │      │  │
         CAP ───────┴──────┘  └──── (to ground)
      (0.047µF)             2│
                           Ground

    PICKUP                           VOLUME POT (500K Audio)
    ┌─────┐                              ┌─────┐
    │  N  │──── Hot (black) ─────────────┤  3  │
    │     │                               └─────┘
    │  S  │                                 │  │
    └─────┘                                 │  └──── Output to jack (Tip)
       │                                    2│
    Ground ────────┬─────────────────────── Ground
      (bare)       │
                   └──── To bridge & jack sleeve (Ground)`}
                  </pre>
                  <p className="text-xs text-muted-foreground mt-2">Standard single humbucker wiring. Hot wire from pickup → tone pot lug 3 → volume pot lug 3. Volume pot lug 2 → output jack tip. All grounds connected.</p>
                </div>

                {/* 2 Humbuckers */}
                <div className="border rounded-lg p-4 bg-card">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Badge>2</Badge>
                    Two Humbuckers - 3-Way Switch, 2 Volume, 2 Tone
                  </h3>
                  <pre className="text-xs bg-black/40 p-4 rounded overflow-x-auto font-mono">
{`    NECK PICKUP          3-WAY TOGGLE              BRIDGE PICKUP
    ┌─────┐              ┌─────────┐                  ┌─────┐
    │  N  │─ Hot ───────→│ Neck    │                  │  N  │
    │     │              │   (1)   │                  │     │
    │  S  │              │         │                  │  S  │
    └─────┘              │ Both    │                  └─────┘
       │                 │   (2)   │                     │
    Ground               │         │                  Ground
                         │ Bridge  │←─── Hot ───────────┘
                         │   (3)   │
                         └────┬────┘
                              │
                         (to output)

    NECK VOLUME    NECK TONE       BRIDGE VOLUME    BRIDGE TONE
    ┌─────┐       ┌─────┐          ┌─────┐         ┌─────┐
 ───┤ 3   │    ┌──┤ 3   │       ───┤ 3   │      ┌──┤ 3   │
    └─────┘    │  └─────┘          └─────┘      │  └─────┘
      2│       │    2│               2│          │    2│
       └───────┘  0.047µF            └───────────┘  0.047µF
                    │                                 │
                  Ground                            Ground

All "2" lugs connect together and go to OUTPUT JACK TIP
All grounds (pickups, pots, bridge, jack sleeve) connect together`}
                  </pre>
                  <p className="text-xs text-muted-foreground mt-2">Classic Les Paul wiring. Each pickup has independent volume/tone. 3-way switch selects neck/both/bridge.</p>
                </div>

                {/* HSS Configuration */}
                <div className="border rounded-lg p-4 bg-card">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Badge>3</Badge>
                    HSS (Humbucker + 2 Singles) - 5-Way Switch, 1 Volume, 2 Tone
                  </h3>
                  <pre className="text-xs bg-black/40 p-4 rounded overflow-x-auto font-mono">
{`    5-WAY SWITCH POSITIONS:
    Position 1: Bridge Humbucker
    Position 2: Bridge Humbucker + Middle Single (parallel)
    Position 3: Middle Single Coil
    Position 4: Middle + Neck Single (parallel)
    Position 5: Neck Single Coil

    NECK SINGLE    MIDDLE SINGLE    BRIDGE HUMBUCKER
    ┌─────┐        ┌─────┐          ┌─────┐
    │  o  │───┐    │  o  │───┐      │ N S │───┐
    └─────┘   │    └─────┘   │      └─────┘   │
      │       │      │        │        │       │
    Ground    │    Ground     │      Ground    │
              │               │                │
              └───────┬───────┴────────────────┘
                      │
                5-WAY SWITCH ──→ VOLUME POT ──→ OUTPUT
                      │
                TONE 1 (Neck/Mid) ──→ Neck & Middle
                TONE 2 (Bridge) ──────→ Bridge Only

    MASTER VOLUME (250K)          TONE 1 (250K)         TONE 2 (500K)
    ┌─────┐                       ┌─────┐              ┌─────┐
 ───┤ 3   │                    ┌──┤ 3   │           ┌──┤ 3   │
    └─────┘                    │  └─────┘           │  └─────┘
      2│                       │    2│              │    2│
       └────→ Output       0.022µF Ground       0.047µF Ground`}
                  </pre>
                  <p className="text-xs text-muted-foreground mt-2">Common Strat mod with bridge humbucker. 250K volume for singles, dual tone controls. Wire 5-way switch per manufacturer diagram.</p>
                </div>

                {/* HH Active */}
                <div className="border rounded-lg p-4 bg-card">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Badge>4</Badge>
                    Two Active Humbuckers (EMG) - 3-Way Switch, 2 Volume, 1 Tone
                  </h3>
                  <pre className="text-xs bg-black/40 p-4 rounded overflow-x-auto font-mono">
{`    9V BATTERY
    ┌────┐
    │ +  │──── Red (Power Bus)
    │    │
    │ -  │──── Black (Ground Bus)
    └────┘

    NECK PICKUP (EMG)     BRIDGE PICKUP (EMG)
    ┌─────┐              ┌─────┐
    │     │─ White ───┐  │     │─ White ───┐
    │  N  │           │  │  N  │           │
    │  S  │           │  │  S  │           │
    └─────┘           │  └─────┘           │
    Red to +9V        │  Red to +9V        │
    Black to Gnd      │  Black to Gnd      │
                      │                    │
                NECK VOL (25K)       BRIDGE VOL (25K)
                   Input               Input
                      │                    │
                   Output               Output
                      │                    │
                      └─────┬──────────────┘
                            │
                       3-WAY SWITCH
                            │
                       MASTER TONE (25K)
                            │
                       OUTPUT JACK
                       (Tip = Output)
                       (Sleeve = Ground)

STEREO JACK (for battery switching):
    Tip: Output signal
    Ring: Battery + (disconnects when unplugged)
    Sleeve: Ground`}
                  </pre>
                  <p className="text-xs text-muted-foreground mt-2">Active pickups use lower value pots (25K). Stereo jack disconnects battery when unplugged. Use shielded wire, keep runs short.</p>
                </div>

                {/* Hybrid Active/Passive */}
                <div className="border rounded-lg p-4 bg-card">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Badge>5</Badge>
                    Hybrid: 1 Active + 1 Passive Humbucker - 3-Way, 2 Volume, 1 Tone
                  </h3>
                  <pre className="text-xs bg-black/40 p-4 rounded overflow-x-auto font-mono">
{`    NECK (Active EMG)        BRIDGE (Passive)
    ┌─────┐                  ┌─────┐
    │     │─ White ───┐      │ N S │─ Hot ───┐
    │  N  │           │      └─────┘         │
    │  S  │           │         │            │
    └─────┘           │       Ground         │
    Red to +9V        │                      │
    Black to Gnd      │                      │
                      │                      │
                 NECK VOL              BRIDGE VOL
                  (25K)                 (500K)
                   Output                Output
                      │                      │
                      └──────┬───────────────┘
                             │
                        3-WAY SWITCH
                             │
                        MASTER TONE (500K)
                             │
                          OUTPUT

NOTE: Different pot values! 
- Active pickup side: 25K volume pot
- Passive pickup side: 500K volume pot
- Master tone: 500K (passive pickups need it)
- Battery powers only the active pickup`}
                  </pre>
                  <p className="text-xs text-muted-foreground mt-2">Uncommon but possible. Active pickup needs 25K pot, passive needs 500K. Tone pot at 500K won't affect active much. Ensure battery ground is solid.</p>
                </div>

              </CardContent>
            </Card>

            {/* Switch Configuration Diagrams */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5" />
                  Switch & Control Configuration Diagrams
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* 3-Way 2V2T */}
                <div className="border rounded-lg p-4 bg-card">
                  <h3 className="font-semibold mb-3">3-Way Switch - 2 Volumes, 2 Tones (Les Paul Style)</h3>
                  <pre className="text-xs bg-black/40 p-4 rounded overflow-x-auto font-mono">
{`    Pickup A ──→ Vol A ──→ Tone A ──┐
                                      ├──→ 3-Way Switch ──→ Output
    Pickup B ──→ Vol B ──→ Tone B ──┘

    Switch Position 1: Pickup A only
    Switch Position 2: Both pickups (parallel)
    Switch Position 3: Pickup B only

    Each pickup has independent volume and tone control.
    "Rhythm/Treble" style - vintage Gibson wiring.`}
                  </pre>
                </div>

                {/* 3-Way 2V1T */}
                <div className="border rounded-lg p-4 bg-card">
                  <h3 className="font-semibold mb-3">3-Way Switch - 2 Volumes, 1 Tone (Modern LP)</h3>
                  <pre className="text-xs bg-black/40 p-4 rounded overflow-x-auto font-mono">
{`    Pickup A ──→ Vol A ──┐
                          ├──→ 3-Way Switch ──→ Master Tone ──→ Output
    Pickup B ──→ Vol B ──┘

    Switch Position 1: Pickup A only
    Switch Position 2: Both pickups (parallel)
    Switch Position 3: Pickup B only

    Independent volumes, shared master tone.
    Modern wiring - tone affects both pickups.`}
                  </pre>
                </div>

                {/* 3-Way 1V2T */}
                <div className="border rounded-lg p-4 bg-card">
                  <h3 className="font-semibold mb-3">3-Way Switch - 1 Volume, 2 Tones</h3>
                  <pre className="text-xs bg-black/40 p-4 rounded overflow-x-auto font-mono">
{`    Pickup A ──→ Tone A ──┐
                            ├──→ 3-Way Switch ──→ Master Volume ──→ Output
    Pickup B ──→ Tone B ──┘

    Switch Position 1: Pickup A with its tone control
    Switch Position 2: Both pickups (blended tones)
    Switch Position 3: Pickup B with its tone control

    Master volume, independent tone shaping per pickup.`}
                  </pre>
                </div>

                {/* 2-Way 1V1T */}
                <div className="border rounded-lg p-4 bg-card">
                  <h3 className="font-semibold mb-3">2-Way Switch - 1 Volume, 1 Tone (Tele Style)</h3>
                  <pre className="text-xs bg-black/40 p-4 rounded overflow-x-auto font-mono">
{`    Pickup A (Neck) ──┐
                       ├──→ 2-Way Switch ──→ Volume ──→ Tone ──→ Output
    Pickup B (Bridge)─┘

    Switch Position 1: Neck pickup
    Switch Position 2: Bridge pickup

    Simple, classic Telecaster wiring.
    Master volume and tone for both positions.`}
                  </pre>
                </div>

                {/* 5-Way SSS */}
                <div className="border rounded-lg p-4 bg-card">
                  <h3 className="font-semibold mb-3">5-Way Switch - 1 Volume, 2 Tones (Strat Style)</h3>
                  <pre className="text-xs bg-black/40 p-4 rounded overflow-x-auto font-mono">
{`    NECK ────────┐
    MIDDLE ──────┼───→ 5-WAY SWITCH ──→ VOLUME ──→ OUTPUT
    BRIDGE ──────┘              │
                                ├── Tone 1 (Neck/Middle)
                                └── Tone 2 (Bridge)

    Position 1: Bridge only
    Position 2: Bridge + Middle (parallel)
    Position 3: Middle only
    Position 4: Middle + Neck (parallel)
    Position 5: Neck only

    Tone 1 affects neck and middle positions.
    Tone 2 affects bridge position only.
    Classic Stratocaster wiring.`}
                  </pre>
                </div>

              </CardContent>
            </Card>

            {/* Wiring Tips */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Essential Wiring Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Always photograph before desoldering.</strong> Take multiple angles. You'll thank yourself later.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Use quality solder:</strong> 60/40 or 63/37 rosin core. Never acid core. Thin solder (0.031") for electronics.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Shielding matters:</strong> Use copper tape or shielding paint in control cavity to reduce hum and noise.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Keep wires short:</strong> Excess wire length can pick up interference. Route neatly and trim to fit.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Test before closing up:</strong> Plug in and test every switch position before putting pickguard back on.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Ground everything:</strong> All pot casings, bridge, spring claw, jack sleeve should connect to ground.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Active pickups are different:</strong> They need 25K pots, battery power, and a stereo jack for switching.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>When in doubt, draw it out:</strong> Sketch your wiring plan before starting. Label everything.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
