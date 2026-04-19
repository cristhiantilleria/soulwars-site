export type BuildStyle = "attack" | "reiatsu" | "tank" | "hybrid" | "crit" | "kidocrit";

export interface PerkRec {
  slot: string;
  perk: string;
  pp: number;
}

export const STYLE_LABELS: Record<BuildStyle, string> = {
  attack:   "Melee DPS",
  reiatsu:  "Kido / Ability DPS",
  tank:     "Tank",
  hybrid:   "Hybrid",
  crit:     "Crit",
  kidocrit: "Kido + Crit Hybrid",
};

// Allocation ratios [atk, def, rei, dex]
export const STYLE_RATIOS: Record<BuildStyle, [number, number, number, number]> = {
  attack:   [0.50, 0.26, 0.12, 0.12],
  reiatsu:  [0.12, 0.26, 0.50, 0.12],
  tank:     [0.15, 0.55, 0.15, 0.15],
  hybrid:   [0.28, 0.26, 0.28, 0.18],
  crit:     [0.35, 0.26, 0.10, 0.29],
  kidocrit: [0.12, 0.26, 0.36, 0.26],
};

export const PERK_RECS: Record<BuildStyle, PerkRec[]> = {
  attack: [
    { slot: "Lv10 Minor", perk: "Critical Chance Mastery R3", pp: 6 },
    { slot: "Lv20 Minor", perk: "Critical Damage Mastery R3", pp: 6 },
    { slot: "Lv30 Major", perk: "Shock R3",                   pp: 4 },
    { slot: "Lv40 Minor", perk: "Fracture (PVP) R3",          pp: 6 },
    { slot: "Lv50 Minor", perk: "Leg Slice R2",               pp: 3 },
    { slot: "Lv60 Major", perk: "Ignite R3",                  pp: 4 },
  ],
  reiatsu: [
    { slot: "Lv10 Minor", perk: "Reiatsu Training R3", pp: 6 },
    { slot: "Lv20 Minor", perk: "Energy Pool R2",      pp: 3 },
    { slot: "Lv30 Major", perk: "Shock R3",            pp: 4 },
    { slot: "Lv40 Minor", perk: "Fracture (PVP) R3",  pp: 6 },
    { slot: "Lv50 Minor", perk: "Free Shot R2",        pp: 3 },
    { slot: "Lv60 Major", perk: "Ignite R3",           pp: 4 },
  ],
  kidocrit: [
    { slot: "Lv10 Minor", perk: "Reiatsu Training R3",        pp: 6 },
    { slot: "Lv20 Minor", perk: "Critical Chance Mastery R3", pp: 6 },
    { slot: "Lv30 Major", perk: "Shock R3",                   pp: 4 },
    { slot: "Lv40 Minor", perk: "Critical Damage Mastery R3", pp: 6 },
    { slot: "Lv50 Minor", perk: "Fracture (PVP) R3",          pp: 6 },
    { slot: "Lv60 Major", perk: "Ignite R3",                  pp: 4 },
  ],
  tank: [
    { slot: "Lv10 Minor", perk: "Health Pool R3",         pp: 6 },
    { slot: "Lv20 Minor", perk: "Toughness R3",           pp: 6 },
    { slot: "Lv30 Major", perk: "Evasion R3",             pp: 4 },
    { slot: "Lv40 Minor", perk: "Regeneration Training R3", pp: 6 },
    { slot: "Lv50 Minor", perk: "Dodge Mastery R2",       pp: 3 },
    { slot: "Lv60 Major", perk: "Last Grasp R3",          pp: 4 },
  ],
  hybrid: [
    { slot: "Lv10 Minor", perk: "Empower R3 (highest stat)",  pp: 6 },
    { slot: "Lv20 Minor", perk: "Critical Chance Mastery R2", pp: 3 },
    { slot: "Lv30 Major", perk: "Shock R3",                   pp: 4 },
    { slot: "Lv40 Minor", perk: "Fracture (PVP) R2",          pp: 3 },
    { slot: "Lv50 Minor", perk: "Toughness R2",               pp: 3 },
    { slot: "Lv60 Major", perk: "Ignite R2",                  pp: 2 },
  ],
  crit: [
    { slot: "Lv10 Minor", perk: "Critical Chance Mastery R3", pp: 6 },
    { slot: "Lv20 Minor", perk: "Critical Damage Mastery R3", pp: 6 },
    { slot: "Lv30 Major", perk: "Flash Pressure R3",          pp: 4 },
    { slot: "Lv40 Minor", perk: "Fracture (PVP) R3",          pp: 6 },
    { slot: "Lv50 Minor", perk: "Leg Slice R2",               pp: 3 },
    { slot: "Lv60 Major", perk: "Shock R3",                   pp: 4 },
  ],
};

export const ZAN_LABELS: Record<string, string> = {
  kensei: "Kensei", gin: "Gin", soifon: "Soi Fon", shunshui: "Shunsui", tybw: "TYBW Ichigo",
  rukia: "Rukia", byakuya: "Byakuya", yamamoto: "Yamamoto", mayuri: "Mayuri", urahara: "Urahara",
  aizen: "Aizen", hitsugaya: "Hitsugaya", ichigo: "Ichigo", kenpachi: "Kenpachi", unohana: "Unohana",
};

export const ZAN_BONUSES: Record<string, string> = {
  kensei:    "+96% ATK · +36% DEX at Bankai",
  gin:       "+96% ATK · +36% DEX at Bankai",
  soifon:    "+96% ATK · +36% DEX at Bankai",
  shunshui:  "+96% ATK · +36% DEX at Bankai",
  tybw:      "+96% ATK · +36% DEX · True Bankai: +160% ATK",
  rukia:     "+96% REI at Bankai",
  byakuya:   "+96% REI at Bankai",
  yamamoto:  "+96% REI at Bankai",
  mayuri:    "+96% REI at Bankai",
  urahara:   "+96% REI at Bankai",
  aizen:     "+36% DEF · +96% REI at Bankai · True: +170% REI +40% DEF/DEX",
  hitsugaya: "+96% REI · +36% DEX at Bankai",
  ichigo:    "+96% ATK · +36% DEF · True Bankai: +160% ATK +25% DEF +40% DEX",
  kenpachi:  "+96% ATK · +36% DEF · True: +170% ATK",
  unohana:   "+96% REI · +36% DEX at Bankai",
};

export const FACTION_COLORS: Record<string, string> = {
  shinigami:   "#5dade2",
  hollow:      "#e74c3c",
  quincy:      "#3498db",
  fullbringer: "#e67e22",
  vaizard:     "#9b59b6",
  bount:       "#1abc9c",
  sinner:      "#e74c3c",
};

export const FACTION_LABELS: Record<string, string> = {
  shinigami:   "Shinigami",
  hollow:      "Hollow / Arrancar",
  quincy:      "Quincy",
  fullbringer: "Fullbringer",
  vaizard:     "Vaizard",
  bount:       "Bount",
  sinner:      "Sinner",
};

export function getTips(
  faction: string,
  style: string,
  def: number,
  zan: string,
  squad: string
): string[] {
  const tips: string[] = [];

  const factionTips: Record<string, string[]> = {
    shinigami: [
      "Press M constantly to train Zanpakuto Understanding — need 40 for Shikai, 100 for Bankai",
      "Bankai requires Level 60 + 1 Event Win — win events early",
      "Limit Release (Lv70, Lt/Captain only): scales as lvl÷260 — at Lv130 = +50% all stats",
    ],
    hollow: [
      "Stay Vasto Lorde as long as possible before Arrancar — passive gains are much faster",
      "Need 1 Event Win for Vasto Lorde — win an event first!",
      "Devours: Weak→50 · Medium→75 · Strong→120 · Menos→1.5k–2.5k · Adjucha→5k–7k · Vasto→70k–74k",
    ],
    quincy: [
      "Web Bow at Lv30 needs 3 Event Wins — major power spike, prioritize it",
      "Vollständig (Lv65): needs 90 Reishi Control AND 90 Bow Mastery — train both simultaneously",
    ],
    fullbringer: [
      "Find Ginjo at his castle at Lv15 — bring 100 Hollow kills",
      "Advanced Fullbring: 500 Hollow kills + 80 Spirit Mastery + 100 Fullbring Mastery + Lv55",
    ],
    vaizard: [
      "33% gene chance — reroll with Event Points if you don't have it",
      "Vaizards CANNOT learn Vasto Form while in a Squad — leave squad before rebirthing",
      "Need 250 Hollow kills → find Shinji at SW corner of Earth to fully awaken",
      "Train mask by hitting mobs while masked",
    ],
    bount: [
      "Goethe and Dalk have True Fullbring tier — a unique advantage over regular Fullbringers",
      "Fused Form grants +2 Move Speed — maintain it in all combat",
    ],
    sinner: [
      "Requires 1 Rebirth minimum — plan rebirth timing carefully",
      "Uses Hollow skill tree — learn hollow skills while working toward sinner",
    ],
  };

  if (faction && factionTips[faction]) tips.push(...factionTips[faction]);
  if (zan === "aizen") tips.push("Aizen Shikai gives +36% DEF immediately — great survivability while leveling toward Bankai");
  if (style === "kidocrit") tips.push("Fracture (PVP) R3 is essential — 10 hits = -60% enemy DEF before Kurohitsugi lands");
  if (squad === "squad6") tips.push("Squad 6 gives +10% REI and +50% Kido Mastery Training — fastest path to Kido cap");
  if (squad === "squad11") tips.push("Squad 11 gives +10% ATK and +50% Zanjutsu Training — best for physical builds");
  if (def < 200) tips.push("⚠ Low Defense — consider raising DEF or taking Toughness perk to compensate");
  tips.push("Spirit Level 10 = +300 ALL stats — invest Spirit Dust at Artemis NPC immediately");
  tips.push("Every 2 levels = 1 Perk Point. Plan your perk path before spending");

  return [...new Set(tips)].slice(0, 7);
}
