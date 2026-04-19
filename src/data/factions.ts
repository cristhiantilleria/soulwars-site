export interface Squad {
  name: string;
  tag: "offense" | "defense" | "utility" | "farming";
  perks: string[];
  captainPerk?: string;
}

export interface FactionDetail {
  id: string;
  name: string;
  icon: string;
  color: string;
  tagline: string;
  sections: { title: string; items: { label: string; value?: string }[] }[];
  squads?: Squad[];
  squadsLabel?: string;
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
          { value: "Kuchiki", label: "+30 Kido Density Cap, +50% Kido Density & Mastery Training, +40 Spirit Mastery Cap" },
          { value: "Komamura", label: "+12% Defence" },
          { value: "Shihoin", label: "1.15x Back Dmg, -50% Shunko Drain, +400% Shunko Training, +1 Move Speed" },
          { value: "Shiba", label: "-50% All Reiryoku Drains" },
          { value: "Unohana", label: "+50% Healing, +35% Regen Rate" },
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
        title: "Ranks",
        items: [
          { label: "Lieutenant: Level 65" },
          { label: "Captain: Know Bankai + Level 90 + defeat current Captain" },
          { label: "Limit Release: Level 70 (Lt/Captain only)" },
          { label: "Only 1 Captain and 1 Lieutenant per squad" },
        ],
      },
    ],
    squads: [
      {
        name: "Squad 1",
        tag: "defense",
        perks: ["+20% Atk/Rei", "+24% Def"],
        captainPerk: "Access to all 3 Sub-Captain Squad Perks (Squads 2, 3, 6, 7, 11)",
      },
      {
        name: "Squad 2",
        tag: "offense",
        perks: ["+20% Critical Damage", "1.15× Back Damage", "+50 Hakuda Cap", "+50% Hakuda Training", "+100% Shunpo Training", "-50% Shunpo Drain", "+2 Move Speed"],
        captainPerk: "Promote / Demote own Lieutenant",
      },
      {
        name: "Squad 3",
        tag: "offense",
        perks: ["+10% Damage Dealt"],
        captainPerk: "+15% Damage Dealt",
      },
      {
        name: "Squad 4",
        tag: "utility",
        perks: ["+70% Reiryoku Regen", "Exclusive AoE Heal skill"],
        captainPerk: "Promote / Demote own Lieutenant",
      },
      {
        name: "Squad 5",
        tag: "farming",
        perks: ["+15% Leveling & Passive EXP", "+5% Atk/Rei", "+10% Def", "+25 Hakuda/Zanjutsu/Kido Density Cap", "+15 Toughness Cap"],
        captainPerk: "Promote / Demote own Lieutenant",
      },
      {
        name: "Squad 6",
        tag: "utility",
        perks: ["+50% Kido Training", "+100% Flash Training", "+10% Rei", "+40 Kido Density Cap"],
        captainPerk: "Promote / Demote own Lieutenant",
      },
      {
        name: "Squad 7",
        tag: "defense",
        perks: ["+50% Toughness Training", "+12.5% Def", "+30 Toughness Cap"],
        captainPerk: "Promote / Demote own Lieutenant",
      },
      {
        name: "Squad 8",
        tag: "defense",
        perks: ["+50% Reiryoku Drain", "+40% HP/Reiryoku Regen", "+5% Atk/Rei", "+10% Def"],
        captainPerk: "Promote / Demote own Lieutenant",
      },
      {
        name: "Squad 9",
        tag: "offense",
        perks: ["+100 Zanjutsu Cap", "+8% Atk"],
        captainPerk: "Promote / Demote own Lieutenant",
      },
      {
        name: "Squad 10",
        tag: "farming",
        perks: ["+100% Passive Training", "+35 Zanjutsu Cap"],
        captainPerk: "Promote / Demote own Lieutenant",
      },
      {
        name: "Squad 11",
        tag: "offense",
        perks: ["+50% Zanjutsu Training", "+50 Zanjutsu Cap", "+20 Toughness Cap", "+10% Atk", "+8% Def"],
        captainPerk: "Promote / Demote own Lieutenant",
      },
      {
        name: "Squad 12",
        tag: "farming",
        perks: ["+80% Passive EXP", "+20% Regen Rate", "Poison-on-Hit"],
        captainPerk: "Promote / Demote own Lieutenant",
      },
      {
        name: "Squad 13",
        tag: "utility",
        perks: ["+6% Atk/Rei/Def", "+1% Atk/Rei/Def per Squad 13 member online"],
        captainPerk: "Promote / Demote own Lieutenant",
      },
      {
        name: "Kido Corps",
        tag: "utility",
        perks: ["Kido cast time halved", "+40 Kido Density Cap", "+40% Kido Density Training", "+75% Kido Mastery Training"],
        captainPerk: "Kido is cast instantly",
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
        title: "Hollow Perks — Weak",
        items: [
          { label: "+3% Crit Chance" },
          { label: "+7.5% Crit Damage" },
          { label: "+5% Melee Damage" },
          { label: "-2% Damage Taken" },
        ],
      },
      {
        title: "Hollow Perks — Medium",
        items: [
          { label: "+3% Crit Chance" },
          { label: "+7.5% Crit Damage" },
          { label: "+5% Melee Damage" },
          { label: "+5% Skill Damage" },
          { label: "-2% Damage Taken" },
        ],
      },
      {
        title: "Hollow Perks — Strong",
        items: [
          { label: "+5% Crit Chance" },
          { label: "+10% Crit Damage" },
          { label: "+7% Melee Damage" },
          { label: "+7% Skill Damage" },
          { label: "-3% Damage Taken" },
          { label: "+5% Both Melee & Skill Damage" },
        ],
      },
      {
        title: "Hollow Perks — Menos Grande",
        items: [
          { label: "+50% Cero Damage" },
          { label: "Cero slows targets for 1.5s" },
          { label: "0 Cero charge time + 100% Cero projectile speed" },
        ],
      },
      {
        title: "Hollow Perks — Vasto Lorde",
        items: [
          { label: "-7% Damage Taken, but +25% more back-hit damage against you" },
          { label: "+7% Damage Dealt, but +7% more Damage Taken" },
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
      {
        title: "Resurrecciones — Attack",
        items: [
          { value: "Grimmjow", label: "Ress: +96% atk, +24% def/dex · Hogyoku: +150% atk, +25% def, +40% dex" },
          { value: "Nel", label: "Ress: +96% atk, +24% def/dex" },
          { value: "Nnoitra", label: "Ress: +72% def, +24% dex · Hogyoku: +100% def/dex" },
          { value: "Yammy", label: "Ress: +96% atk, +60% def, +40% hp · Enraged: +144% atk · Hogyoku: +120% def, +40% hp" },
          { value: "Charlotte", label: "Ress: +180% atk, +120% def" },
          { value: "Del Toro", label: "Ress: +96% atk, +24% def/dex" },
        ],
      },
      {
        title: "Resurrecciones — Reiatsu",
        items: [
          { value: "Stark (Guns)", label: "Ress: +160% rei, +24% dex · Swords: +220% rei, +72% dex · Hogyoku: +60% def, +150% rei, +100% dex" },
          { value: "Ulquiorra", label: "Ress: +30% def, +96% rei, +24% dex · Segunda Etapa: +60% def, +120% rei, +48% dex · Hogyoku: +60% def, +150% rei, +100% dex" },
          { value: "Barragan", label: "Ress: +96% rei · Hogyoku: +150% rei, def boosted by +100% rei" },
          { value: "Volcanica", label: "Ress: +30% def, +96% rei, +24% dex · Hogyoku: +60% def, +150% rei, +100% dex" },
          { value: "Harribel", label: "Ress: +96% rei" },
        ],
      },
      {
        title: "Espada Ranks",
        items: [
          { value: "Leader", label: "Lv120 · +13.5% atk/rei, +12.5% def" },
          { value: "Espada 1", label: "Lv115 · +12.5% atk/rei, +11.5% def" },
          { value: "Espada 2", label: "Lv110 · +11.5% atk/rei, +10.5% def" },
          { value: "Espada 3", label: "Lv105 · +10.5% atk/rei, +9.5% def" },
          { value: "Espada 4", label: "Lv100 · +9.5% atk/rei, +8.5% def" },
          { value: "Espada 5", label: "Lv95 · +8.5% atk/rei, +7.5% def" },
          { value: "Espada 6", label: "Lv90 · +7.5% atk/rei, +6.5% def" },
          { value: "Espada 7", label: "Lv80 · +6.5% atk/rei, +5.5% def" },
          { value: "Espada 8", label: "Lv75 · +5.5% atk/rei, +4.5% def" },
          { value: "Espada 9", label: "Lv70 · +4.5% atk/rei, +3.5% def" },
          { value: "Espada 10", label: "Lv65 · +3.5% atk/rei, +2.5% def" },
        ],
      },
    ],
    squadsLabel: "Fraccion Perks",
    squads: [
      {
        name: "Fraccion 1 — Solitude",
        tag: "farming",
        perks: ["+10% base stats", "+10% passive experience", "+10% experience"],
        captainPerk: "+15% base stats, +20% passive experience, +20% experience",
      },
      {
        name: "Fraccion 2 — Age",
        tag: "utility",
        perks: ["Enemies within 80px of you cannot Shunpo"],
        captainPerk: "Force enemies to walk for 0.5s on hit (1.5s CD)",
      },
      {
        name: "Fraccion 3 — Sacrifice",
        tag: "offense",
        perks: ["Gain 30% HP and Reiryoku of every enemy killed", "For every 1% HP missing → +0.3% damage"],
        captainPerk: "For every 1% HP missing → +0.4% damage",
      },
      {
        name: "Fraccion 4 — Emptiness",
        tag: "defense",
        perks: ["+30% Parry damage", "+50% Health Regen Rate"],
        captainPerk: "+50% Parry damage",
      },
      {
        name: "Fraccion 5 — Despair",
        tag: "defense",
        perks: ["Toughness reduces ~0.4% dmg/level (vs standard 0.35%)", "+30% Defence stat"],
        captainPerk: "Toughness reduces ~0.45% dmg/level",
      },
      {
        name: "Fraccion 6 — Destruction",
        tag: "offense",
        perks: ["+3 Speed for 4.5s every time you deal damage"],
        captainPerk: "+12% Attack boost",
      },
      {
        name: "Fraccion 7 — Intoxication",
        tag: "utility",
        perks: ["Create 10 Shunpo clones every time you Shunpo"],
        captainPerk: "Always has +2 Move Speed",
      },
      {
        name: "Fraccion 8 — Madness",
        tag: "defense",
        perks: ["+10% damage converted to Lifesteal"],
        captainPerk: "+15% damage converted to Lifesteal",
      },
      {
        name: "Fraccion 9 — Greed",
        tag: "farming",
        perks: ["+20% experience", "+50% passive experience"],
        captainPerk: "+30% experience, +70% passive experience",
      },
      {
        name: "Fraccion 10 — Rage",
        tag: "offense",
        perks: ["Every 1% HP missing → +0.5% more damage"],
        captainPerk: "Every 1% HP missing → +0.65% more damage",
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
          { value: "Leader", label: "Lv120 · +25% atk/def/rei" },
          { value: "Agent 1", label: "Lv110 · +24% atk/def/rei" },
          { value: "Agent 2", label: "Lv100 · +23% atk/def/rei" },
          { value: "Agent 3", label: "Lv90 · +21% atk/def/rei" },
          { value: "Agent 4", label: "Lv80 · +20% atk/def/rei" },
          { value: "Agent 5", label: "Lv70 · +18% atk/def/rei" },
          { value: "Agent 6", label: "Lv60" },
          { value: "Agent 7", label: "Lv50" },
          { value: "Agent 8", label: "Lv40" },
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
