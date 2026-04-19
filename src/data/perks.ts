export type PerkType = "minor" | "major" | "ultimate";
export type PerkCategory = "offense" | "defense" | "utility" | "pvp" | "farming";

export interface Perk {
  id: string;
  name: string;
  type: PerkType;
  category: PerkCategory;
  color: string;
  ranks: string[];
  note: string;
  featured?: boolean;
}

export interface PerkSlot {
  level: number;
  type: PerkType;
  recommendation: string;
}

export const PERKS: Perk[] = [
  // ── Minor — Offense ───────────────────────────────────────────────────────
  {
    id: "subsequent-strikes", name: "Subsequent Strikes", type: "minor", category: "offense", color: "#e74c3c",
    ranks: ["R1: every 6 hits → 25% bonus dmg", "R2: every 5 hits → 25%", "R3: every 4 hits → 50% (10s CD)"],
    note: "Melee finisher perk. The CD resets the hit counter, so build around gap-closing.",
  },
  {
    id: "crit-chance", name: "Critical Chance Mastery", type: "minor", category: "offense", color: "#e74c3c",
    ranks: ["R1: +2%", "R2: +4%", "R3: +6% crit chance"],
    note: "Core for DEX/crit builds. Stacks with DEX stat directly.",
  },
  {
    id: "crit-dmg", name: "Critical Damage Mastery", type: "minor", category: "offense", color: "#e74c3c",
    ranks: ["R1: +3.3%", "R2: +6.6%", "R3: +9.9% crit damage"],
    note: "Makes every crit hit harder. Pair with Crit Chance for maximum burst.",
  },
  {
    id: "rei-train", name: "Reiatsu Training", type: "minor", category: "offense", color: "#8e44ad",
    ranks: ["R1: +5%", "R2: +10%", "R3: +15% Reiatsu attack dmg"],
    note: "Best perk for Kido/Cero builds. Applies to ALL reiatsu-type skills.",
  },
  {
    id: "empower", name: "Empower", type: "minor", category: "offense", color: "#d4af37",
    ranks: ["R1: +4%", "R2: +8%", "R3: +12% to 1 core stat"],
    note: "Choose your highest stat — at 380 REI, +12% = ~45 free stat points worth.",
  },
  {
    id: "combat-training", name: "Combat Training", type: "minor", category: "offense", color: "#e67e22",
    ranks: ["R1: +5%", "R2: +10%", "R3: +15% dmg with Normal/Defence attacks"],
    note: "Pure melee damage perk. Best for Str/Def stat builds using F/G attacks.",
  },
  {
    id: "cleave", name: "Cleave", type: "minor", category: "offense", color: "#e67e22",
    ranks: ["R1: 20%", "R2: 40%", "R3: 60% hard-attack dmg to adjacent enemies"],
    note: "Hard attack (G) hits multiple targets. Excellent for mob farming and PVP crowds.",
  },
  // ── Minor — Defense ───────────────────────────────────────────────────────
  {
    id: "hp-pool", name: "Health Pool", type: "minor", category: "defense", color: "#00b4d8",
    ranks: ["R1: +5%", "R2: +10%", "R3: +15% max Health"],
    note: "Pure survivability. Great for tank builds or low-DEF setups.",
  },
  {
    id: "toughness", name: "Toughness", type: "minor", category: "defense", color: "#00b4d8",
    ranks: ["R1: +2%", "R2: +4%", "R3: +6% Defense"],
    note: "Flat defense boost. Good for patching low DEF investments.",
  },
  {
    id: "dodge", name: "Dodge Mastery", type: "minor", category: "defense", color: "#00b4d8",
    ranks: ["R1: +5%", "R2: +7.5%", "R3: +10% Dodge Chance"],
    note: "Stacks with DEX avoidability. Good for hit-and-run playstyles.",
  },
  {
    id: "regen", name: "Regeneration Training", type: "minor", category: "defense", color: "#27ae60",
    ranks: ["R1: +10%", "R2: +20%", "R3: +30% HP Regen"],
    note: "Passive health recovery. Combos well with defensive masteries.",
  },
  {
    id: "recovery", name: "Recovery", type: "minor", category: "defense", color: "#27ae60",
    ranks: ["R1: 2%", "R2: 4%", "R3: 6% of damage taken returned over 5s"],
    note: "Heals based on damage received. Resets on each new hit — useful in sustained fights.",
  },
  // ── Minor — Utility ───────────────────────────────────────────────────────
  {
    id: "energy-pool", name: "Energy Pool", type: "minor", category: "utility", color: "#27ae60",
    ranks: ["R1: +5%", "R2: +10%", "R3: +15% max Reiryoku"],
    note: "More Kido casts before running dry. Good for Kido-heavy builds.",
  },
  {
    id: "inner-spirit", name: "Inner Spirit", type: "minor", category: "utility", color: "#27ae60",
    ranks: ["R1: +5%", "R2: +10%", "R3: +15% Reiryoku Regen"],
    note: "Recover Reiryoku faster between fights. Pairs with Energy Pool.",
  },
  {
    id: "free-shot", name: "Free Shot", type: "minor", category: "utility", color: "#7a8aaa",
    ranks: ["R1: 50% cost", "R2: 20% cost", "R3: 0 cost every 10s"],
    note: "Free Kido cast every 10s. Great for saving Reiryoku in extended fights.",
  },
  {
    id: "momentum", name: "Momentum", type: "minor", category: "utility", color: "#e67e22",
    ranks: ["R1: +1 speed", "R2: +2 speed", "R3: +3 speed after 5s no combat"],
    note: "Speed bonus while roaming. Drops on damage dealt/received.",
  },
  {
    id: "surge", name: "Surge", type: "minor", category: "utility", color: "#8e44ad",
    ranks: ["R1: 5%", "R2: 10%", "R3: 15% chance to 2x Reiryoku regen for 5s (10s CD)"],
    note: "Procs on ability use. Helps sustain Kido spam in long engagements.",
  },
  // ── Minor — PVP ───────────────────────────────────────────────────────────
  {
    id: "fracture", name: "Fracture", type: "minor", category: "pvp", color: "#d4af37",
    ranks: ["R1: -1.5%/stack", "R2: -2.25%/stack", "R3: -3%/stack DEF (max 10 stacks, 30s)"],
    note: "⭐ Best PVP perk. Max = -30% enemy DEF at R3. Every hit applies a stack.", featured: true,
  },
  {
    id: "bloodletting", name: "Bloodletting", type: "minor", category: "pvp", color: "#d4af37",
    ranks: ["R1: 5s", "R2: 10s", "R3: 15s — target heals 50% less (20s CD)"],
    note: "Counters tank/regen builds hard. Essential for end-game PVP.",
  },
  {
    id: "leg-slice", name: "Leg Slice", type: "minor", category: "pvp", color: "#e67e22",
    ranks: ["R1: 1s", "R2: 1s", "R3: 2s cripple on back hit (25s CD)"],
    note: "Mobility control. Pairs with flash step to back-hit consistently.",
  },
  {
    id: "flash-echo", name: "Flash Echo", type: "minor", category: "pvp", color: "#e67e22",
    ranks: ["R1: 2 tiles", "R2: 2 tiles", "R3: 3 tiles — 20% auto-flash away (30s CD)"],
    note: "Reactive escape tool. Counters dash-in aggression automatically.",
  },
  {
    id: "seething-hatred", name: "Seething Hatred", type: "minor", category: "pvp", color: "#e74c3c",
    ranks: ["R1: +2%", "R2: +4%", "R3: +6% dmg vs chosen faction"],
    note: "Pick your most common opponent's faction. Free flat damage against them.",
  },
  {
    id: "envenom", name: "Envenom", type: "minor", category: "pvp", color: "#27ae60",
    ranks: ["R1: 5s stack", "R2: 10s stack", "R3: 15s — 0.25%/s target HP as poison (30s CD)"],
    note: "DoT perk scaling off target's max HP. Strong against high-HP tanks.",
  },
  {
    id: "fake-out", name: "Fake Out", type: "minor", category: "pvp", color: "#7a8aaa",
    ranks: ["R1: 1s clone", "R2: 2s clone", "R3: 3s — go invisible + decoy on dodge (10s CD)"],
    note: "Procs on successful dodge. Great for repositioning or resetting a fight.",
  },
  // ── Minor — Farming ───────────────────────────────────────────────────────
  {
    id: "reaper", name: "Reaper", type: "minor", category: "farming", color: "#7a8aaa",
    ranks: ["R1: +10%", "R2: +20%", "R3: +30% Spirit Dust drop rate"],
    note: "Farming perk. Speeds up Spirit Level progression significantly.",
  },
  {
    id: "brilliance", name: "Brilliance", type: "minor", category: "farming", color: "#7a8aaa",
    ranks: ["R1: +10%", "R2: +20%", "R3: +30% experience gained"],
    note: "Leveling perk. Excellent for early game or after rebirth.",
  },
  {
    id: "lucky-find", name: "Lucky Find", type: "minor", category: "farming", color: "#7a8aaa",
    ranks: ["R1: 5% → 150% EXP", "R2: 5% → 200%", "R3: 10% chance 200% bonus EXP"],
    note: "Random EXP spikes from kills. Pairs with Brilliance for leveling builds.",
  },
  // ── Major ─────────────────────────────────────────────────────────────────
  {
    id: "shock", name: "Shock", type: "major", category: "pvp", color: "#d4af37",
    ranks: ["R1: 5% chance", "R2: 10% chance", "R3: 15% chance to Silence 3s (25s CD)"],
    note: "⭐ Top major perk. Silence prevents enemy skills mid-fight. Procs on every hit.", featured: true,
  },
  {
    id: "chill", name: "Chill", type: "major", category: "pvp", color: "#00b4d8",
    ranks: ["R1: 10%", "R2: 15%", "R3: 20% chance to Slow 2s (25s CD)"],
    note: "Higher proc than Shock. Slows movement — great for kiting.",
  },
  {
    id: "ignite", name: "Ignite", type: "major", category: "offense", color: "#e67e22",
    ranks: ["R1: 5%", "R2: 10%", "R3: 15% damage as burn over 5s (no stack)"],
    note: "⭐ Procs on EVERY hit. Kido combos trigger it repeatedly for massive burn.", featured: true,
  },
  {
    id: "evasion", name: "Evasion", type: "major", category: "defense", color: "#00b4d8",
    ranks: ["R1: +15%", "R2: +25%", "R3: +35% dodge when below 26% HP"],
    note: "Clutch survival tool. At low HP you become very hard to hit.",
  },
  {
    id: "flash-press", name: "Flash Pressure", type: "major", category: "pvp", color: "#8e44ad",
    ranks: ["R1: 3 tiles", "R2: 4 tiles", "R3: 5 tile AoE on flash step — slow + ground 5s (45s CD)"],
    note: "Turn your flash step into crowd control. Excellent for aggressive melee.",
  },
  {
    id: "last-grasp", name: "Last Grasp", type: "major", category: "defense", color: "#e74c3c",
    ranks: ["R1: 5 tiles", "R2: 7 tiles", "R3: 9 tile AoE when below 30% HP — slow + ground (45s CD)"],
    note: "Defensive panic button. Drops below 30% HP → enemy team gets grounded.",
  },
  {
    id: "vampiric-aura", name: "Vampiric Aura", type: "major", category: "defense", color: "#8e44ad",
    ranks: ["R1: 2.5%", "R2: 5%", "R3: 7.5% damage converted to lifesteal"],
    note: "Passive sustain on every hit. Scales well with high DPS builds.",
  },
  {
    id: "flurry-strikes", name: "Flurry Strikes", type: "major", category: "offense", color: "#e74c3c",
    ranks: ["R1: -15%", "R2: -30%", "R3: -45% F/G attack speed"],
    note: "Massive attack speed boost. Best major for melee builds.",
  },
  // ── Ultimate ──────────────────────────────────────────────────────────────
  {
    id: "berserker", name: "Berserker's Rage", type: "ultimate", category: "offense", color: "#e74c3c",
    ranks: ["R1: +0.16%/1% missing HP", "R2: +0.33%", "R3: +0.5% dmg per 1% missing HP"],
    note: "At 30% HP → +35% dmg. At 10% HP → +45% dmg. Best ultimate for offensive builds.", featured: true,
  },
  {
    id: "stand-behind-me", name: "Stand Behind Me", type: "ultimate", category: "defense", color: "#00b4d8",
    ranks: ["R1: +0.16%/1% missing HP", "R2: +0.33%", "R3: +0.5% Defense per 1% missing HP"],
    note: "Mirror of Berserker's Rage but for DEF. Excellent for tank builds at low HP.",
  },
];

export const PERK_SLOTS: PerkSlot[] = [
  { level: 10,  type: "minor",    recommendation: "Reiatsu Training R3 or Crit Chance R3 — pick based on build" },
  { level: 20,  type: "minor",    recommendation: "Critical Chance or Critical Damage Mastery" },
  { level: 30,  type: "major",    recommendation: "Shock R3 — best major for most builds" },
  { level: 40,  type: "minor",    recommendation: "Critical Damage Mastery or Fracture (PVP)" },
  { level: 50,  type: "minor",    recommendation: "Fracture (PVP) R3 — stacks DEF reduction fast" },
  { level: 60,  type: "major",    recommendation: "Ignite R3 — burn on every hit" },
  { level: 70,  type: "minor",    recommendation: "Bloodletting R3 — counters regen/tank builds" },
  { level: 80,  type: "minor",    recommendation: "Leg Slice R2 or Flash Echo R2" },
  { level: 90,  type: "major",    recommendation: "Chill R3 — 20% slow chance, pairs with Shock for CC chain" },
  { level: 90,  type: "minor",    recommendation: "Flash Echo R2 or upgrade existing perks" },
  { level: 100, type: "minor",    recommendation: "Empower R3 — +12% to your highest stat" },
  { level: 110, type: "minor",    recommendation: "Free Shot R3 — free ability cost every 10s" },
  { level: 120, type: "ultimate", recommendation: "Berserker's Rage R3 (offense) or Stand Behind Me R3 (tank)" },
];
