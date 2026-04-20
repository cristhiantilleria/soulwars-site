export interface Squad {
  name: string;
  tag: "offense" | "defense" | "utility" | "farming";
  perks: string[];
  captainPerk?: string;
  captainLabel?: string;
}

export interface NamedSection {
  eyebrow: string;
  title: string;
  note?: string;
  columns?: 2 | 3 | 4;
  items: Squad[];
}

export interface FactionDetail {
  id: string;
  name: string;
  icon: string;
  color: string;
  tagline: string;
  sections: { title: string; items: { label: string; value?: string }[] }[];
  namedSections?: NamedSection[];
}

export const FACTIONS: FactionDetail[] = [
  // ─── Shinigami ────────────────────────────────────────────────────────────
  {
    id: "shinigami",
    name: "Shinigami",
    icon: "⚔️",
    color: "#5dade2",
    tagline: "Soul Society guardians. Master Zanjutsu, Kido, and unlock Shikai & Bankai.",
    sections: [
      {
        title: "How to Join",
        items: [
          { label: "Die as a human → go Left in Dangai" },
          { label: "Reach Soul Society → head to the Academy" },
          { label: "Talk to Renji to become a trainee" },
          { label: "Join a Squad (recruiter north of Renji)" },
        ],
      },
      {
        title: "Shikai Requirements",
        items: [
          { value: "Level 25", label: "" },
          { label: "40 Zanpaktou Understanding (press M)" },
          { label: "50 Zanjutsu passive" },
        ],
      },
      {
        title: "Bankai Requirements",
        items: [
          { label: "Level 60+ · 1 Event Win" },
          { label: "100 Zanpakuto Understanding" },
          { label: "100 Zanjutsu + 35 Hakuda passive" },
          { label: "30 Spirit Mastery · 100 Shikai Mastery" },
        ],
      },
      {
        title: "Shunko",
        items: [
          { label: "Level 30 · 110 Hakuda Mastery" },
          { label: "15 Backstep Mastery · 65 Flash Step Mastery" },
          { label: "40 Kido Mastery" },
          { label: "Speak with Yoruichi near Squad 2 barracks" },
          { label: "Squad 2 members learn additional exclusive Shunko skills" },
        ],
      },
      {
        title: "Noble Families",
        items: [
          { value: "Kuchiki", label: "+30 Kido Density Cap, +50% Kido Density & Mastery Training, +40 Spirit Mastery Cap" },
          { value: "Komamura", label: "+12% Defence" },
          { value: "Shihoin", label: "1.15x Back Dmg, -50% Shunko Drain, +400% Shunko Training, +1 Move Speed" },
          { value: "Shiba", label: "-50% All Reiryoku Drains" },
          { value: "Unohana", label: "+50% Healing, +35% Regen Rate" },
        ],
      },
      {
        title: "Limit Release",
        items: [
          { label: "Learned at Level 70 (Lt or Captain only)" },
          { label: "Boosts stats by lvl ÷ 260" },
          { label: "At Lv130 = +50% all stats" },
        ],
      },
      {
        title: "Ranks",
        items: [
          { label: "Lieutenant: Level 65" },
          { label: "Captain: Know Bankai + Level 90 + defeat current Captain" },
          { label: "Limit Release: Level 70 (Lt/Captain only)" },
          { label: "Only 1 Captain and 1 Lieutenant per squad" },
        ],
      },
    ],
    namedSections: [
      {
        eyebrow: "Organizations",
        title: "Squads & Divisions",
        columns: 4,
        items: [
          { name: "Squad 1", tag: "defense", perks: ["+20% Atk/Rei", "+24% Def"], captainLabel: "Captain", captainPerk: "Access to 3 Sub-Captain squad perks (Squads 2, 3, 6, 7, 11)" },
          { name: "Squad 2", tag: "offense", perks: ["+20% Critical Damage", "1.15× Back Damage", "+50 Hakuda Cap", "+50% Hakuda Training", "+100% Shunpo Training", "-50% Shunpo Drain", "+2 Move Speed"], captainLabel: "Captain", captainPerk: "Promote / Demote own Lieutenant" },
          { name: "Squad 3", tag: "offense", perks: ["+10% Damage Dealt"], captainLabel: "Captain", captainPerk: "+15% Damage Dealt" },
          { name: "Squad 4", tag: "utility", perks: ["+70% Reiryoku Regen", "Exclusive AoE Heal skill"], captainLabel: "Captain", captainPerk: "Promote / Demote own Lieutenant" },
          { name: "Squad 5", tag: "farming", perks: ["+15% Leveling & Passive EXP", "+5% Atk/Rei", "+10% Def", "+25 Hakuda/Zanjutsu/Kido Density Cap", "+15 Toughness Cap"], captainLabel: "Captain", captainPerk: "Promote / Demote own Lieutenant" },
          { name: "Squad 6", tag: "utility", perks: ["+50% Kido Training", "+100% Flash Training", "+10% Rei", "+40 Kido Density Cap"], captainLabel: "Captain", captainPerk: "Promote / Demote own Lieutenant" },
          { name: "Squad 7", tag: "defense", perks: ["+50% Toughness Training", "+12.5% Def", "+30 Toughness Cap"], captainLabel: "Captain", captainPerk: "Promote / Demote own Lieutenant" },
          { name: "Squad 8", tag: "defense", perks: ["+50% Reiryoku Drain", "+40% HP/Reiryoku Regen", "+5% Atk/Rei", "+10% Def"], captainLabel: "Captain", captainPerk: "Promote / Demote own Lieutenant" },
          { name: "Squad 9", tag: "offense", perks: ["+100 Zanjutsu Cap", "+8% Atk"], captainLabel: "Captain", captainPerk: "Promote / Demote own Lieutenant" },
          { name: "Squad 10", tag: "farming", perks: ["+100% Passive Training", "+35 Zanjutsu Cap"], captainLabel: "Captain", captainPerk: "Promote / Demote own Lieutenant" },
          { name: "Squad 11", tag: "offense", perks: ["+50% Zanjutsu Training", "+50 Zanjutsu Cap", "+20 Toughness Cap", "+10% Atk", "+8% Def"], captainLabel: "Captain", captainPerk: "Promote / Demote own Lieutenant" },
          { name: "Squad 12", tag: "farming", perks: ["+80% Passive EXP", "+20% Regen Rate", "Poison-on-Hit"], captainLabel: "Captain", captainPerk: "Promote / Demote own Lieutenant" },
          { name: "Squad 13", tag: "utility", perks: ["+6% Atk/Rei/Def", "+1% Atk/Rei/Def per Squad 13 member online"], captainLabel: "Captain", captainPerk: "Promote / Demote own Lieutenant" },
          { name: "Kido Corps", tag: "utility", perks: ["Kido cast time halved", "+40 Kido Density Cap", "+40% Kido Density Training", "+75% Kido Mastery Training"], captainLabel: "Captain", captainPerk: "Kido is cast instantly" },
        ],
      },
    ],
  },

  // ─── Hollow ───────────────────────────────────────────────────────────────
  {
    id: "hollow",
    name: "Hollow",
    icon: "💀",
    color: "#e74c3c",
    tagline: "Devour souls to evolve from Weak Hollow to fearsome Arrancar. Challenge the Espada.",
    sections: [
      {
        title: "How to Join",
        items: [
          { label: "Die as a human → go Right in Dangai" },
          { label: "Or get killed by a Hollow" },
        ],
      },
      {
        title: "Evolution Path",
        items: [
          { value: "Weak", label: "50 devours" },
          { value: "Medium", label: "75 devours" },
          { value: "Strong", label: "120 devours" },
          { value: "Menos Grande", label: "1,500–2,500 devours" },
          { value: "Adjucha", label: "5,000–7,000 devours" },
          { value: "Vasto Lorde", label: "70,000–74,000 devours" },
        ],
      },
      {
        title: "Arrancar Unlock",
        items: [
          { label: "Talk to Aizen in Las Noches after Menos Grande+" },
          { label: "Resurreccion requires Level 40" },
          { label: "Train Zanjutsu as Vasto — much faster" },
        ],
      },
      {
        title: "Arrancar Perks",
        items: [
          { value: "Greater Power", label: "+15% base stats" },
          { value: "Greater Regeneration", label: "+50% Regeneration" },
        ],
      },
    ],
    namedSections: [
      {
        eyebrow: "Transformation",
        title: "Hollow Evolution Perks",
        note: "Choose one perk when you reach each stage.",
        columns: 3,
        items: [
          { name: "Weak Hollow", tag: "offense", perks: ["+3% Crit Chance", "+7.5% Crit Damage", "+5% Melee Damage", "-2% Damage Taken"] },
          { name: "Medium Hollow", tag: "offense", perks: ["+3% Crit Chance", "+7.5% Crit Damage", "+5% Melee Damage", "+5% Skill Damage", "-2% Damage Taken"] },
          { name: "Strong Hollow", tag: "offense", perks: ["+5% Crit Chance", "+10% Crit Damage", "+7% Melee Damage", "+7% Skill Damage", "-3% Damage Taken", "+5% Both Melee & Skill Damage"] },
          { name: "Menos Grande", tag: "utility", perks: ["+50% Cero Damage", "Cero slows targets for 1.5s", "0 Cero charge time + 100% Cero projectile speed"] },
          { name: "Adjucha", tag: "defense", perks: ["+30% Crit Damage, -20 Defense", "+15% dmg on next attack after back hit", "20% less Crit Damage taken", "50% resistance against slows"], captainLabel: "Note", captainPerk: "Adjucha perks are currently disabled in-game" },
          { name: "Vasto Lorde", tag: "offense", perks: ["-7% Damage Taken (but +25% more back-hit damage against you)", "+7% Damage Dealt (but +7% more Damage Taken)"] },
        ],
      },
      {
        eyebrow: "Resurreccion",
        title: "Types & Stat Boosts",
        columns: 3,
        items: [
          { name: "Grimmjow", tag: "offense", perks: ["+96% Atk, +24% Def/Dex"], captainLabel: "Hogyoku", captainPerk: "+150% Atk, +25% Def, +40% Dex (also +40% Dex on hit for 1s)" },
          { name: "Nel", tag: "offense", perks: ["+96% Atk, +24% Def/Dex"] },
          { name: "Nnoitra", tag: "defense", perks: ["+72% Def, +24% Dex"], captainLabel: "Hogyoku", captainPerk: "+100% Def/Dex" },
          { name: "Yammy", tag: "defense", perks: ["+96% Atk, +60% Def, +40% HP"], captainLabel: "Enraged / Hogyoku", captainPerk: "Enraged: +144% Atk · Hogyoku: +120% Def, +40% HP" },
          { name: "Charlotte", tag: "offense", perks: ["+180% Atk, +120% Def"] },
          { name: "Del Toro", tag: "offense", perks: ["+96% Atk, +24% Def/Dex"] },
          { name: "Stark (Guns)", tag: "utility", perks: ["+160% Rei, +24% Dex"], captainLabel: "Swords / Hogyoku", captainPerk: "Swords: +220% Rei, +72% Dex · Hogyoku: +60% Def, +150% Rei, +100% Dex" },
          { name: "Ulquiorra", tag: "utility", perks: ["+30% Def, +96% Rei, +24% Dex"], captainLabel: "Segunda Etapa / Hogyoku", captainPerk: "Segunda: +60% Def, +120% Rei, +48% Dex · Hogyoku: +60% Def, +150% Rei, +100% Dex" },
          { name: "Barragan", tag: "utility", perks: ["+96% Rei"], captainLabel: "Hogyoku", captainPerk: "+150% Rei, Def boosted by +100% Rei" },
          { name: "Volcanica", tag: "utility", perks: ["+30% Def, +96% Rei, +24% Dex"], captainLabel: "Hogyoku", captainPerk: "+60% Def, +150% Rei, +100% Dex" },
          { name: "Harribel", tag: "utility", perks: ["+96% Rei"] },
        ],
      },
      {
        eyebrow: "Power Structure",
        title: "Espada Ranks",
        columns: 4,
        items: [
          { name: "Espada Leader", tag: "offense", perks: ["Level 120", "+13.5% Atk/Rei", "+12.5% Def"] },
          { name: "Espada 1", tag: "offense", perks: ["Level 115", "+12.5% Atk/Rei", "+11.5% Def"] },
          { name: "Espada 2", tag: "offense", perks: ["Level 110", "+11.5% Atk/Rei", "+10.5% Def"] },
          { name: "Espada 3", tag: "offense", perks: ["Level 105", "+10.5% Atk/Rei", "+9.5% Def"] },
          { name: "Espada 4", tag: "offense", perks: ["Level 100", "+9.5% Atk/Rei", "+8.5% Def"] },
          { name: "Espada 5", tag: "offense", perks: ["Level 95", "+8.5% Atk/Rei", "+7.5% Def"] },
          { name: "Espada 6", tag: "offense", perks: ["Level 90", "+7.5% Atk/Rei", "+6.5% Def"] },
          { name: "Espada 7", tag: "offense", perks: ["Level 80", "+6.5% Atk/Rei", "+5.5% Def"] },
          { name: "Espada 8", tag: "offense", perks: ["Level 75", "+5.5% Atk/Rei", "+4.5% Def"] },
          { name: "Espada 9", tag: "offense", perks: ["Level 70", "+4.5% Atk/Rei", "+3.5% Def"] },
          { name: "Espada 10", tag: "offense", perks: ["Level 65", "+3.5% Atk/Rei", "+2.5% Def"] },
        ],
      },
      {
        eyebrow: "Organizations",
        title: "Fraccion Perks",
        columns: 3,
        items: [
          { name: "Fraccion 1 — Solitude", tag: "farming", perks: ["+10% base stats", "+10% passive experience", "+10% experience"], captainLabel: "Espada Perk", captainPerk: "+15% base stats, +20% passive EXP, +20% EXP" },
          { name: "Fraccion 2 — Age", tag: "utility", perks: ["Enemies within 80px cannot Shunpo"], captainLabel: "Espada Perk", captainPerk: "Force enemies to walk for 0.5s on hit (1.5s CD)" },
          { name: "Fraccion 3 — Sacrifice", tag: "offense", perks: ["Gain 30% HP and Reiryoku from every kill", "Every 1% HP missing → +0.3% damage"], captainLabel: "Espada Perk", captainPerk: "Every 1% HP missing → +0.4% damage" },
          { name: "Fraccion 4 — Emptiness", tag: "defense", perks: ["+30% Parry damage", "+50% Health Regen Rate"], captainLabel: "Espada Perk", captainPerk: "+50% Parry damage" },
          { name: "Fraccion 5 — Despair", tag: "defense", perks: ["Toughness reduces ~0.4% dmg/level (vs 0.35% standard)", "+30% Defence stat"], captainLabel: "Espada Perk", captainPerk: "Toughness reduces ~0.45% dmg/level" },
          { name: "Fraccion 6 — Destruction", tag: "offense", perks: ["+3 Speed for 4.5s every time you deal damage"], captainLabel: "Espada Perk", captainPerk: "+12% Attack boost" },
          { name: "Fraccion 7 — Intoxication", tag: "utility", perks: ["Create 10 Shunpo clones every time you Shunpo"], captainLabel: "Espada Perk", captainPerk: "Always has +2 Move Speed" },
          { name: "Fraccion 8 — Madness", tag: "defense", perks: ["+10% damage converted to Lifesteal"], captainLabel: "Espada Perk", captainPerk: "+15% damage converted to Lifesteal" },
          { name: "Fraccion 9 — Greed", tag: "farming", perks: ["+20% experience", "+50% passive experience"], captainLabel: "Espada Perk", captainPerk: "+30% experience, +70% passive experience" },
          { name: "Fraccion 10 — Rage", tag: "offense", perks: ["Every 1% HP missing → +0.5% more damage"], captainLabel: "Espada Perk", captainPerk: "Every 1% HP missing → +0.65% more damage" },
        ],
      },
    ],
  },

  // ─── Quincy ───────────────────────────────────────────────────────────────
  {
    id: "quincy",
    name: "Quincy",
    icon: "🏹",
    color: "#3498db",
    tagline: "Reishi-manipulating hunters. Unlock Vollständig and rise through the Wandenreich.",
    sections: [
      {
        title: "How to Join",
        items: [
          { label: "Be Human → talk to Quincy Elder" },
          { label: "Elder is in Urahara's Shop or Quincy Village" },
        ],
      },
      {
        title: "Key Unlocks",
        items: [
          { value: "Kojaku Bow", label: "Level 10" },
          { value: "Web Bow", label: "Lv30, 3 Event Wins, 25 Bow/Reishi" },
          { value: "Seele Schneider", label: "Level 25 + 40 Reishi Control" },
          { value: "Vollständig", label: "Lv65, 90 Reishi + 90 Bow Mastery" },
        ],
      },
      {
        title: "Vollständig Boosts",
        items: [
          { value: "Standard", label: "+72% def, +168% rei, +36% dex" },
          { value: "High-tier", label: "+84% def, +180% rei" },
          { value: "Pure Rei", label: "+180% rei" },
        ],
      },
    ],
    namedSections: [
      {
        eyebrow: "Power Structure",
        title: "Wandenreich Ranks",
        columns: 4,
        items: [
          { name: "Emperor", tag: "offense", perks: ["Level 122"] },
          { name: "Crown Prince", tag: "offense", perks: ["Level 120", "+14% Rei"] },
          { name: "Grandmaster", tag: "offense", perks: ["Level 110", "+12% Rei"] },
          { name: "SS Leader", tag: "offense", perks: ["Level 100", "+10% Rei"] },
        ],
      },
    ],
  },

  // ─── Fullbringer ──────────────────────────────────────────────────────────
  {
    id: "fullbringer",
    name: "Fullbringer",
    icon: "👊",
    color: "#e67e22",
    tagline: "Humans wielding Hollow Reiryoku. Physical combat specialists with powerful Fullbring.",
    sections: [
      {
        title: "How to Join",
        items: [
          { label: "Level to 15 as a Human" },
          { label: "Find Ginjo in his castle" },
          { label: "100 Hollow kills to unlock the class" },
        ],
      },
      {
        title: "Advanced Fullbring",
        items: [
          { label: "Level 55" },
          { label: "500 Hollow kills" },
          { label: "80 Spirit Mastery" },
          { label: "100 Fullbring Mastery" },
        ],
      },
    ],
    namedSections: [
      {
        eyebrow: "Fullbring Types",
        title: "Types & Stat Boosts",
        columns: 3,
        items: [
          { name: "Ichigo / Sado / Ginjo", tag: "offense", perks: ["Fullbring: +60% Atk, +24% Def/Dex"], captainLabel: "Advanced", captainPerk: "+90% Atk, +36% Def/Dex" },
          { name: "Yukio / Inoue", tag: "utility", perks: ["Fullbring: +96% Rei"], captainLabel: "Advanced", captainPerk: "+144% Rei" },
        ],
      },
      {
        eyebrow: "Power Structure",
        title: "Xcution Ranks",
        columns: 4,
        items: [
          { name: "Xcution Leader", tag: "offense", perks: ["Level 120", "+25% Atk/Def/Rei"] },
          { name: "Agent 1", tag: "offense", perks: ["Level 110", "+24% Atk/Def/Rei"] },
          { name: "Agent 2", tag: "offense", perks: ["Level 100", "+23% Atk/Def/Rei"] },
          { name: "Agent 3", tag: "offense", perks: ["Level 90", "+21% Atk/Def/Rei"] },
          { name: "Agent 4", tag: "offense", perks: ["Level 80", "+20% Atk/Def/Rei"] },
          { name: "Agent 5", tag: "offense", perks: ["Level 70", "+18% Atk/Def/Rei"] },
          { name: "Agent 6", tag: "utility", perks: ["Level 60"] },
          { name: "Agent 7", tag: "utility", perks: ["Level 50"] },
          { name: "Agent 8", tag: "utility", perks: ["Level 40"] },
        ],
      },
    ],
  },

  // ─── Vaizard ──────────────────────────────────────────────────────────────
  {
    id: "vaizard",
    name: "Vaizard",
    icon: "🎭",
    color: "#9b59b6",
    tagline: "Shinigami with inner Hollow power. 33% chance gene — unlock the Mask for devastating bonuses.",
    sections: [
      {
        title: "How to Unlock",
        items: [
          { label: "33% random gene chance on character creation" },
          { label: "Reach Level 30 → find Shinji (SW corner of Earth)" },
          { label: "Need 250 Hollow kills" },
          { label: "Reroll gene with Event Points" },
        ],
      },
      {
        title: "Mask Progression",
        items: [
          { value: "Cero", label: "5 Spirit Mastery" },
          { value: "Bala", label: "250 Mask Time + 25 Spirit Mastery" },
          { value: "Gran Rey Cero", label: "500 Mask Time + 50 Spirit Mastery" },
          { value: "Vasto Mode", label: "10 Hogyoku Captures + 750 Mask Time + 1 Rebirth" },
        ],
      },
      {
        title: "Mask Mechanics",
        items: [
          { label: "All masks grant +15% Def base (+30% in Vasto)" },
          { label: "1 mastery = 1 second of mask time" },
          { label: "Cap: 1000 mastery = 1000s normal / 500s Vasto" },
          { label: "Train mask by hitting mobs while masked" },
        ],
      },
    ],
    namedSections: [
      {
        eyebrow: "Mask System",
        title: "Mask Types & Bonuses",
        columns: 3,
        items: [
          { name: "Ichigo", tag: "utility", perks: ["+2 Move Speed"], captainLabel: "Vasto Form", captainPerk: "+3 Move Speed, +15% Dex" },
          { name: "Kensei", tag: "offense", perks: ["+20% Melee Damage"], captainLabel: "Vasto Form", captainPerk: "+30% Melee Damage" },
          { name: "Lisa", tag: "offense", perks: ["+5% Crit Chance"], captainLabel: "Vasto Form", captainPerk: "+10% Crit Chance" },
          { name: "Hiyori", tag: "offense", perks: ["+10% Crit Damage"], captainLabel: "Vasto Form", captainPerk: "+15% Crit Damage" },
          { name: "Shinji", tag: "defense", perks: ["+65% Def"], captainLabel: "Vasto Form", captainPerk: "+70% Def" },
          { name: "Hachigen", tag: "utility", perks: ["30% Reiatsu converted to Kido damage", "-4 Kido Cast Time"], captainLabel: "Note", captainPerk: "No separate Vasto boost listed" },
          { name: "Love", tag: "utility", perks: ["+40% Reiatsu"], captainLabel: "Vasto Form", captainPerk: "+60% Reiatsu" },
        ],
      },
    ],
  },

  // ─── Bount ────────────────────────────────────────────────────────────────
  {
    id: "bount",
    name: "Bount",
    icon: "🌊",
    color: "#1abc9c",
    tagline: "Artificially created immortals. Summon elemental dolls and fuse for ultimate power.",
    sections: [
      {
        title: "How to Join",
        items: [
          { label: "Same unlock path as Fullbringer" },
          { label: "Same Xcution rank system as Fullbringers" },
          { label: "Fused Form grants +2 Move Speed" },
        ],
      },
    ],
    namedSections: [
      {
        eyebrow: "Doll Types",
        title: "Types & Stat Boosts",
        columns: 3,
        items: [
          { name: "Guhl / Gunther (Water)", tag: "utility", perks: ["Fullbring: +96% Rei"], captainLabel: "Advanced", captainPerk: "+144% Rei" },
          { name: "Goethe (Fire)", tag: "utility", perks: ["Fullbring: +96% Rei"], captainLabel: "True Form", captainPerk: "+170% Rei, +40% Def/Dex" },
          { name: "Dalk (Metal)", tag: "defense", perks: ["Fullbring: +60% Def"], captainLabel: "True Form", captainPerk: "+150% Def, +40% Dex" },
        ],
      },
    ],
  },

  // ─── Sinner ───────────────────────────────────────────────────────────────
  {
    id: "sinner",
    name: "Sinner",
    icon: "🔥",
    color: "#e74c3c",
    tagline: "Requires 1 rebirth. Hell-bound souls — Speed, Tank, or Ranged paths await in the depths.",
    sections: [
      {
        title: "Requirements",
        items: [
          { label: "Must have at least 1 Rebirth" },
          { label: "Go to Hell and find the NPC" },
          { label: "Uses Hollow skill tree" },
        ],
      },
    ],
    namedSections: [
      {
        eyebrow: "Paths",
        title: "Sinner Types",
        columns: 3,
        items: [
          { name: "Speed Sinner", tag: "utility", perks: ["High-mobility playstyle", "Flash-step focused combat"] },
          { name: "Tank Sinner", tag: "defense", perks: ["High durability build", "Focus on absorbing damage"] },
          { name: "Ranged Sinner", tag: "offense", perks: ["Ranged Cero-based attacks", "Keep distance and chip damage"] },
        ],
      },
      {
        eyebrow: "Power Structure",
        title: "Hell Hierarchy",
        columns: 4,
        items: [
          { name: "Hell Overlord", tag: "offense", perks: ["Level 120"] },
          { name: "Hell Ruler 5", tag: "offense", perks: ["Level 115"] },
          { name: "Hell Ruler 4", tag: "offense", perks: ["Level 110"] },
          { name: "Hell Ruler 3", tag: "offense", perks: ["Level 105"] },
          { name: "Hell Ruler 2", tag: "offense", perks: ["Level 100"] },
          { name: "Hell Ruler 1", tag: "offense", perks: ["Level 95"] },
        ],
      },
    ],
  },
];
