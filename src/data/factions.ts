export interface FactionDetail {
  id: string;
  name: string;
  icon: string;
  color: string;
  tagline: string;
  sections: { title: string; items: { label: string; value?: string }[] }[];
}

export const FACTIONS: FactionDetail[] = [
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
        title: "Limit Release",
        items: [
          { label: "Learned at Level 70 (Lt or Captain only)" },
          { label: "Boosts stats by lvl ÷ 260" },
          { label: "At Lv130 = +50% all stats" },
        ],
      },
      {
        title: "Noble Families",
        items: [
          { value: "Kuchiki", label: "+30 Kido Density, +50% Kido Training" },
          { value: "Komamura", label: "+12% Defence" },
          { value: "Shihoin", label: "1.15x Back Dmg, -50% Shunko Drain" },
          { value: "Shiba", label: "-50% All Reiryoku Drains" },
          { value: "Unohana", label: "+50% Healing, +35% Regen" },
        ],
      },
    ],
  },
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
        title: "Arrancar / Resurreccion",
        items: [
          { label: "Talk to Aizen after Menos Grande+" },
          { label: "Resurreccion requires Level 40" },
          { label: "Train Zanjutsu as Vasto — much faster" },
          { value: "Stark", label: "+220% rei" },
          { value: "Charlotte", label: "+180% atk" },
        ],
      },
      {
        title: "Espada Ranks",
        items: [
          { value: "Leader", label: "Lv120 +13.5% atk/rei" },
          { value: "Espada 1", label: "Lv115 +12.5% atk/rei" },
          { value: "Espada 5", label: "Lv95 +8.5% atk/rei" },
          { value: "Espada 10", label: "Lv65 +3.5% atk/rei" },
        ],
      },
    ],
  },
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
          { value: "Pure rei", label: "+180% rei" },
        ],
      },
      {
        title: "Wandenreich Ranks",
        items: [
          { value: "Emperor", label: "Lv122" },
          { value: "Crown Prince", label: "Lv120 +14% rei" },
          { value: "Grandmaster", label: "Lv110 +12% rei" },
          { value: "SS Leader", label: "Lv100 +10% rei" },
        ],
      },
    ],
  },
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
      {
        title: "Stat Boosts",
        items: [
          { value: "Ichigo/Sado/Ginjo", label: "+60% atk, +24% def/dex" },
          { value: "Advanced", label: "+90% atk, +36% def/dex" },
          { value: "Yukio/Inoue", label: "+96% rei → +144% Advanced" },
        ],
      },
      {
        title: "Xcution Ranks",
        items: [
          { value: "Leader", label: "Lv120 +25% all stats" },
          { value: "Agent 1", label: "Lv110 +24%" },
          { value: "Agent 3", label: "Lv90 +21%" },
          { value: "Agent 5", label: "Lv70 +18%" },
        ],
      },
    ],
  },
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
          { value: "Vasto Mode", label: "10 Hogyoku Captures + 750 Mask Time + 1 RB" },
        ],
      },
      {
        title: "Mask Types",
        items: [
          { value: "Lisa", label: "+5% crit (+10% Vasto)" },
          { value: "Ichigo", label: "+2 move speed (+3 Vasto)" },
          { value: "Kensei", label: "+20% melee (+30% Vasto)" },
          { value: "Shinji", label: "+65% def (+70% Vasto)" },
          { value: "Hachi", label: "30% rei → Kido dmg, -4 cast time" },
          { value: "Love", label: "+40% rei (+60% Vasto)" },
        ],
      },
      {
        title: "Mask Mechanics",
        items: [
          { label: "All masks: +15% def base (+30% Vasto)" },
          { label: "1 mastery = 1 second of mask time" },
          { label: "Cap: 1000 mastery = 1000s normal / 500s Vasto" },
          { label: "Train mask by hitting mobs while masked" },
        ],
      },
    ],
  },
  {
    id: "bount",
    name: "Bount",
    icon: "🌊",
    color: "#1abc9c",
    tagline: "Artificially created immortals. Summon elemental dolls and fuse for ultimate power.",
    sections: [
      {
        title: "Types & Boosts",
        items: [
          { value: "Guhl/Gunther (Water/Rei)", label: "+96% rei → +144% Advanced" },
          { value: "Goethe (Fire/Rei)", label: "+96% rei → True: +170% rei, +40% def/dex" },
          { value: "Dalk (Metal/Def)", label: "+60% def → True: +150% def, +40% dex" },
        ],
      },
      {
        title: "Notes",
        items: [
          { label: "Goethe and Dalk have a True Fullbring tier beyond Advanced" },
          { label: "Same Xcution rank system as Fullbringers" },
          { label: "Fused Form grants +2 Move Speed" },
        ],
      },
    ],
  },
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
      {
        title: "Types",
        items: [
          { label: "Speed Sinner" },
          { label: "Tank Sinner" },
          { label: "Ranged Sinner" },
        ],
      },
      {
        title: "Hell Hierarchy",
        items: [
          { value: "Hell Overlord", label: "Level 120" },
          { value: "Hell Ruler 5", label: "Level 115" },
          { value: "Hell Ruler 4", label: "Level 110" },
          { value: "Hell Ruler 3", label: "Level 105" },
          { value: "Hell Ruler 2", label: "Level 100" },
          { value: "Hell Ruler 1", label: "Level 95" },
        ],
      },
    ],
  },
];
