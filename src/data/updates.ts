export type PatchTag = 'fix' | 'new' | 'balance' | 'nerf' | 'buff' | 'system';

export interface PatchItem {
  tag: PatchTag;
  text: string;
}

export interface Patch {
  version: string;
  label: string;
  date: string;
  items: PatchItem[];
}

export const PATCHES: Patch[] = [
  {
    version: 'live',
    label: 'Live',
    date: 'April 19th 2026',
    items: [
      { tag: 'fix', text: 'Fixed Vaizard Vasto Form not applying correctly after rebirth.' },
      { tag: 'fix', text: 'Fixed Sprenger Pentagon collision detection with walls.' },
      { tag: 'fix', text: 'Fixed Bringer Light drain rate not updating after Lingering augment.' },
      { tag: 'balance', text: 'Adjusted Blut Vene Immune unlock conditions — now requires all 4 prerequisites.' },
      { tag: 'balance', text: 'Kurohitsugi Silenced proc chance reduced from 35% → 30%.' },
      { tag: 'buff', text: 'Shukuchi Mastery stack duration extended from 12s → 15s.' },
      { tag: 'new', text: 'Skill Tree UI added to Faction pages on the community wiki.' },
      { tag: 'system', text: 'Server performance improvements for Menos Grande zone.' },
    ],
  },
  {
    version: 'live-apr18',
    label: 'Live — It\'s a New Day',
    date: 'April 18th 2026',
    items: [
      { tag: 'new', text: 'Skill Tree system fully released — all four main factions now have learnable nodes.' },
      { tag: 'new', text: 'Gran Rey Cero augment branch added for Hollow/Arrancar.' },
      { tag: 'new', text: 'Blut Arterie Master capstone augment added for Quincy.' },
      { tag: 'new', text: 'Bringer Light Perfected capstone augment added for Fullbringer.' },
      { tag: 'buff', text: 'Cero Emperador mastery width increased from 1-tile → 2-tile.' },
      { tag: 'buff', text: 'Ransōtengai Limitless now activates when HP is below 25% (was 20%).' },
      { tag: 'nerf', text: 'Fullbringer iron_fist_augment Hakuda scaling nerfed from 50% → 40%.' },
      { tag: 'nerf', text: 'Iron Fist Crushing defense reduction nerfed from 50% → 15%.' },
      { tag: 'nerf', text: 'Iron Fist Crushing Defense bonus nerfed from 50% → 25%.' },
      { tag: 'nerf', text: 'Dirty Boots Flash Dash CD reduction nerfed from 50% → 25%.' },
      { tag: 'nerf', text: 'Dirty Boots Momentum damage bonus nerfed from 50% → 30%, added 15s CD.' },
      { tag: 'nerf', text: 'Book of the End debuff extension nerfed from 50% → 30%.' },
      { tag: 'nerf', text: 'Book of the End Insert damage reduction nerfed from 25% → 10%.' },
      { tag: 'nerf', text: 'Fullbringer Defender mastery damage reduction nerfed from 20% → 10%.' },
      { tag: 'fix', text: 'Fixed Acid Pour not properly hitting all targets in radius.' },
      { tag: 'fix', text: 'Fixed Bringer Spark Detonate bonus damage calculation.' },
      { tag: 'balance', text: 'Hollow Monarch cooldown increased from 8s → 10s.' },
      { tag: 'system', text: 'Rebirth stat retention reworked — see full notes on Discord.' },
    ],
  },
  {
    version: '3.0-wipe',
    label: '3.0 — Wipe',
    date: 'April 18th 2026',
    items: [
      { tag: 'new', text: 'Major Wipe — After 2 years and 4 months, Soul Wars has wiped with its biggest update to date. 130,000+ lines of code changed.' },
      { tag: 'new', text: 'Complete stat system rework — Attack, Defence, Reiatsu, Dexterity are now the four primary stats.' },
      { tag: 'new', text: 'Skill Tree system introduced — four faction trees (Shinigami, Hollow, Quincy, Fullbringer) with Skills, Augments, Passives, and Masteries.' },
      { tag: 'new', text: 'Perk system overhauled — new Perk Points (PP) economy, Ranks up to R3.' },
      { tag: 'new', text: 'Blut Vene and Blut Arterie added as learnable Quincy skills.' },
      { tag: 'new', text: 'Bringer Light mastery cap raised to 1000, with 500-mastery power spike.' },
      { tag: 'new', text: 'Hollow evolution rework — Vasto Lorde now requires 70,000–74,000 devours.' },
      { tag: 'new', text: 'Noble Family system added for Shinigami — Kuchiki, Komamura, Shihoin, Shiba, Unohana.' },
      { tag: 'new', text: 'Shunpo Mastery added — affects Hirenkyaku and Flash Dash cooldowns.' },
      { tag: 'new', text: 'Spirit Level system — Spirit Level 10 = +300 to ALL stats.' },
      { tag: 'new', text: 'Vasto Mode for Vaizards requires 10 Hogyoku Captures.' },
      { tag: 'new', text: 'Sinner faction added — requires 1 Rebirth, uses Hollow skill tree.' },
      { tag: 'system', text: 'Complete server architecture overhaul for improved stability.' },
      { tag: 'system', text: 'New anti-cheat system deployed.' },
      { tag: 'system', text: 'Map expanded — new zones added in Soul Society, Hueco Mundo, and Hell.' },
      { tag: 'balance', text: 'All faction rank bonus formulas recalculated from scratch.' },
      { tag: 'balance', text: 'Event system reworked — Events now grant Event Points currency.' },
    ],
  },
];
