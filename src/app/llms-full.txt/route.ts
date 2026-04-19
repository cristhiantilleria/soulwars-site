import { NextResponse } from "next/server";
import { FACTIONS } from "@/data/factions";
import { PERKS, PERK_SLOTS } from "@/data/perks";
import { MOBS } from "@/data/mobs";

function buildFullText(): string {
  const lines: string[] = [];

  lines.push("# Soul Wars — Community Wiki (Full Content)");
  lines.push("");
  lines.push("Game: Bleach: Soul Wars (BYOND MMO)");
  lines.push("Guide version: 3.0 | Date: April 2026");
  lines.push("Wipe: April 18th 2026 — Version 3.0 (130,000+ lines of code changed)");
  lines.push("Source: https://soulwars-site.vercel.app");
  lines.push("");

  lines.push("## Key New Systems (v3.0)");
  lines.push("");
  lines.push("- Race Skill Trees: Every race has a unique skill tree (~200 nodes total). 1 point per 4 levels up to 100; additional points from achievements.");
  lines.push("- Wandenreich: Quincies are now their own faction with their own territory. Emperor assigns each Schrift to one player and picks any 4 of their own.");
  lines.push("- Alchemy: New profession. Craft gems, necklaces, potions, guild traps. Success rate scales with alchemy level.");
  lines.push("- Mining: 11 ore types. Rarest recipe uses Void Ore + Hell Raid material to add an extra gem slot to gear.");
  lines.push("- Faction War Map: PvP zone where you cannot harm your own faction. Capture points grant temporary boosts.");
  lines.push("- Vaizards: Own race again. No squad access, no Limit Release. Knight ranks 1-3 get extra mask perks. Vasto Lord gets 2 extra.");
  lines.push("- All gear: Minimum 2 gem slots; cap is 3 (4th requires special alchemy recipe).");
  lines.push("- Squad 0: Each captain has unique Zanpakuto skin, skills, armor set, and private instanced Soul King Palace.");
  lines.push("");

  lines.push("## Stats");
  lines.push("");
  lines.push("All stats start at 0, auto-increase +1 per level. 16 points allocated manually each level.");
  lines.push("- Attack (ATK): Increases Normal attack damage (max/min), Normal/Precision Crit damage, player HP");
  lines.push("- Defense (DEF): Reduces damage taken per point, reduces Crit damage taken. Hard cap: 70% reduction.");
  lines.push("- Reiatsu (REI): Increases Reiatsu attack damage (max/min), Reiatsu Crit damage, Reiryoku and HP (smaller).");
  lines.push("- Dexterity (DEX): Increases Crit hit rate, Accuracy, Avoidability.");
  lines.push("");

  lines.push("## Currencies");
  lines.push("");
  lines.push("- Event Points (EP): Earned through events. Respecs, Schrift resets, zanpakuto rerolls, faction changes.");
  lines.push("- Spirit Dust (SD): Dropped by any mob. Used at Artemis for Spirit Level (+30 all stats each, cap 10). Perk/Stat resets cost 30 SD.");
  lines.push("- Soul Energy (SE): From killing players. Spent at Soul Energy Shop for Reaper gear.");
  lines.push("- Guild Points (GP): From Guild/House Wars. Spent at Guild House vendor.");
  lines.push("- Soul Points (SP): Premium cash currency. Special features, race changes, cash shop.");
  lines.push("- Hell Points: From killing mobs in Hell. Accumulate 50+ to rebirth.");
  lines.push("- PvP Souls: From PvP kills. Used to level gear (alternative to Spirit Dust).");
  lines.push("- Hell Souls: From Hell mobs. Used to level gear.");
  lines.push("");

  lines.push("## Factions");
  lines.push("");
  for (const f of FACTIONS) {
    lines.push(`### ${f.icon} ${f.name}`);
    lines.push(f.tagline);
    lines.push("");
    for (const section of f.sections) {
      lines.push(`#### ${section.title}`);
      for (const item of section.items) {
        const label = item.value ? `${item.value}: ${item.label}` : item.label;
        lines.push(`- ${label}`);
      }
      lines.push("");
    }
  }

  lines.push("## Mob Levels & Locations");
  lines.push("");
  for (const m of MOBS) {
    const note = m.note ? ` | ${m.note}` : "";
    lines.push(`- Lv${m.level}: ${m.name} [${m.tier}]${note}`);
  }
  lines.push("");

  lines.push("## Perk System");
  lines.push("");
  lines.push("- Minor: 9 slots (Lv 10,20,40,50,70,80,90,100,110) | Rank 1-2-3 costs 1-2-3 PP");
  lines.push("- Major: 3 slots (Lv 30,60,90) | Rank 1-2-3 costs 2-4-6 PP cumulative");
  lines.push("- Ultimate: 1 slot (Lv 120) | Rank 1-2-3 costs 5-10-15 PP cumulative");
  lines.push("- Perk Point reset: 30 Spirit Dust");
  lines.push("");

  const types: Array<"minor" | "major" | "ultimate"> = ["minor", "major", "ultimate"];
  for (const t of types) {
    lines.push(`### ${t.charAt(0).toUpperCase() + t.slice(1)} Perks`);
    for (const p of PERKS.filter(p => p.type === t)) {
      lines.push(`- ${p.name}${p.featured ? " ⭐" : ""}: ${p.ranks.join(" | ")} — ${p.note}`);
    }
    lines.push("");
  }

  lines.push("### Perk Slot Timeline");
  for (const slot of PERK_SLOTS) {
    lines.push(`- Level ${slot.level} (${slot.type}): ${slot.recommendation}`);
  }
  lines.push("");

  lines.push("## Build Guidance");
  lines.push("");
  lines.push("Stat allocation presets (% of total points):");
  lines.push("- Attack build: ATK 50%, DEF 26%, REI 12%, DEX 12%");
  lines.push("- Reiatsu build: ATK 12%, DEF 26%, REI 50%, DEX 12%");
  lines.push("- Tank build: ATK 15%, DEF 55%, REI 15%, DEX 15%");
  lines.push("- Hybrid build: ATK 28%, DEF 26%, REI 28%, DEX 18%");
  lines.push("- Crit build: ATK 35%, DEF 26%, REI 10%, DEX 29%");
  lines.push("- Kido+Crit build: ATK 12%, DEF 26%, REI 36%, DEX 26%");
  lines.push("");

  lines.push("## New Player Tips");
  lines.push("");
  lines.push("1. Tutorial Quest: Spawn → Teacher NPC → Pool NPC → 15 Delinquents → Chef → candy from Urahara's Shop.");
  lines.push("2. Events tab: If 'Class' is active, idle in classroom for ~8 free levels.");
  lines.push("3. Group farm — party EXP bonus is significantly higher than solo.");
  lines.push("4. Skill Tree: You get 1 point every 4 levels. Plan your tree path before spending.");
  lines.push("5. Hollow: Stay as Vasto Lorde before becoming Arrancar for faster passive training.");
  lines.push("6. Win Events early — most major unlocks require at least 1 Event Win.");
  lines.push("7. Build for your release: ATK releases → stack ATK+DEF; REI releases → stack REI+DEF.");
  lines.push("8. Rebirth: resets to Lv1, keeps perk slots. EXP req +2.5x after first RB. Unlocks Sinner race.");
  lines.push("9. Kill Quest NPCs near grinding spots — bonus EXP is significant.");
  lines.push("");

  lines.push("---");
  lines.push("Soul Wars Community Wiki · Guide v3.0 · Not officially affiliated with Rhyuke or the Soul Wars dev team.");

  return lines.join("\n");
}

export function GET() {
  return new NextResponse(buildFullText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
