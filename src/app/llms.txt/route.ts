import { NextResponse } from "next/server";

const BASE = "https://soulwars-site.vercel.app";

const LLMS_TXT = `# Soul Wars — Community Wiki

> The complete community guide for Bleach: Soul Wars, a BYOND MMO.
> Covers factions, stats, mob levels, perk system, skill trees, update log, and new-player tips.
> Version 3.0 — Major wipe April 18th 2026. 130,000+ lines of code changed.

## Pages

- [Home & Overview](${BASE}/): Hero, wipe banner, news ticker
- [Factions](${BASE}/#factions): All 7 playable factions overview
- [Shinigami Guide](${BASE}/factions/shinigami): Full Shinigami guide with Kido/Zanjutsu skill tree
- [Hollow / Arrancar Guide](${BASE}/factions/hollow): Full Hollow guide with Cero/Bala skill tree
- [Quincy Guide](${BASE}/factions/quincy): Full Quincy guide with Blut/Schrift skill tree
- [Fullbringer Guide](${BASE}/factions/fullbringer): Full Fullbringer guide with Bringer Light skill tree
- [Vaizard Guide](${BASE}/factions/vaizard): Vaizard guide and mask mechanics
- [Bount Guide](${BASE}/factions/bount): Bount doll and fusion guide
- [Sinner Guide](${BASE}/factions/sinner): Sinner (Hell) guide
- [Stats & Formulas](${BASE}/#stats): ATK, DEF, REI, DEX stats, currencies, Spirit Level
- [Mob Levels & Locations](${BASE}/#mobs): Full mob table Lv2–140
- [Perk System](${BASE}/#perks): Minor, Major, Ultimate perks with slot timeline
- [Build Maker](${BASE}/#builds): Interactive stat allocator
- [New Player Tips](${BASE}/#tips): 9 essential tips
- [Update Log](${BASE}/updates): Full patch notes for Version 3.0 wipe

## Full Content

- [Full wiki content](${BASE}/llms-full.txt): Complete plain-text dump of all wiki data

## Key Facts (Post-Wipe v3.0, April 2026)

- Game: Bleach: Soul Wars (BYOND MMO)
- Wipe: April 18th 2026 — Version 3.0 (130,000+ lines of code changed)
- 7 factions: Shinigami, Hollow/Arrancar, Quincy (now Wandenreich), Fullbringer, Vaizard, Bount, Sinner
- NEW: Race-specific skill trees (~200 nodes). 1 skill point per 4 levels; more via achievements
- NEW: Wandenreich is its own faction — Quincies no longer part of Earth
- NEW: Alchemy and Mining professions
- NEW: All Quincy Schrifts added
- NEW: Faction War Map PvP zone
- Stats: Attack (ATK), Defense (DEF), Reiatsu (REI), Dexterity (DEX)
- 16 stat points per level; Spirit Level adds up to +300 all stats
- Perk points: 1 per 2 levels; Minor (9 slots), Major (3 slots), Ultimate (1 slot at Lv120)
`;

export function GET() {
  return new NextResponse(LLMS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
