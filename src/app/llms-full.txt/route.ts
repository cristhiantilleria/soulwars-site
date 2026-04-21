import { NextResponse } from "next/server";
import { FACTIONS } from "@/data/factions";
import { PERKS, PERK_SLOTS } from "@/data/perks";
import { MOBS } from "@/data/mobs";
import { SHINIGAMI_TREE } from "@/data/skilltrees/shinigami";
import { HOLLOW_TREE } from "@/data/skilltrees/hollow";
import { QUINCY_TREE } from "@/data/skilltrees/quincy";
import { FULLBRINGER_TREE } from "@/data/skilltrees/fullbringer";
import type { SkillTree } from "@/data/skilltrees/types";

function renderTree(tree: SkillTree): string[] {
  const lines: string[] = [];
  const skills   = tree.nodes.filter(n => n.type === "skill");
  const passives = tree.nodes.filter(n => n.type === "passive");
  const masteries = tree.nodes.filter(n => n.type === "mastery");
  const augments = tree.nodes.filter(n => n.type === "augment");

  if (skills.length) {
    lines.push("  Active Skills:");
    for (const s of skills) {
      lines.push(`  - ${s.name}${s.requiredLevel ? ` [Lv${s.requiredLevel}+]` : ""}: ${s.description}`);
      const augs = augments.filter(a => a.prerequisites?.includes(s.id));
      for (const a of augs) {
        lines.push(`      ↳ ${a.name}: ${a.description}`);
      }
    }
    lines.push("");
  }

  if (passives.length) {
    lines.push("  Passives:");
    for (const p of passives) {
      lines.push(`  - ${p.name}: ${p.description}`);
      const augs = augments.filter(a => a.prerequisites?.includes(p.id));
      for (const a of augs) {
        lines.push(`      ↳ ${a.name}: ${a.description}`);
      }
    }
    lines.push("");
  }

  if (masteries.length) {
    lines.push("  Masteries (choose ONE at Level 40):");
    for (const m of masteries) {
      lines.push(`  - ${m.name}${m.requiredLevel ? ` [Lv${m.requiredLevel}]` : ""}: ${m.description}`);
    }
    lines.push("");
  }

  return lines;
}

function buildFullText(): string {
  const L: string[] = [];

  // ── Header ──────────────────────────────────────────────────────────────
  L.push("# Soul Wars Community Wiki — Full Content Dump");
  L.push("# Game: Bleach: Soul Wars (BYOND MMO)");
  L.push("# Guide Version: 3.0 | Wipe Date: April 18th 2026");
  L.push("# Source: https://soulwars-site.vercel.app");
  L.push("# Generated from live data — all sections included");
  L.push("");

  // ── Game Overview ────────────────────────────────────────────────────────
  L.push("═══════════════════════════════════════════════════");
  L.push("GAME OVERVIEW");
  L.push("═══════════════════════════════════════════════════");
  L.push("");
  L.push("Bleach: Soul Wars is a free browser MMO built on the BYOND engine, set in the Bleach");
  L.push("universe. Players choose a faction, train stats, master skill trees, compete in events,");
  L.push("and fight for spiritual dominance across Soul Society, Hueco Mundo, and beyond.");
  L.push("");
  L.push("Key Features:");
  L.push("- Free BYOND MMO — no download required, create a BYOND account and play");
  L.push("- 7 unique factions, each with distinct progression, skill trees, and end-game forms");
  L.push("- Event-driven progression — major milestones (Shikai, Bankai, Resurrecciones) require event wins");
  L.push("- Rebirth system — prestige for permanent SP bonuses and new faction unlocks");
  L.push("- Deep build customization via stat allocation, squad bonuses, and perk slots");
  L.push("- PvP-focused with events, guild wars, and a Faction War Map zone");
  L.push("");

  // ── v3.0 Wipe Changes ───────────────────────────────────────────────────
  L.push("═══════════════════════════════════════════════════");
  L.push("VERSION 3.0 — MAJOR CHANGES (April 18th 2026)");
  L.push("═══════════════════════════════════════════════════");
  L.push("");
  L.push("130,000+ lines of code changed. Key additions:");
  L.push("- Race Skill Trees: Every faction has a unique skill tree (~200 nodes). 1 point per 4 levels up to Lv100; more from achievements.");
  L.push("- Wandenreich: Quincies are now their own independent faction with territory. Emperor assigns Schrifts.");
  L.push("- Alchemy: New profession. Craft gems, necklaces, potions, guild traps. Success rate scales with alchemy level.");
  L.push("- Mining: 11 ore types. Rarest recipe uses Void Ore + Hell Raid material to add an extra gem slot.");
  L.push("- Faction War Map: PvP zone where you cannot harm your own faction. Capture points grant temporary boosts.");
  L.push("- Vaizards: Own race again. No squad access, no Limit Release. Knight ranks 1-3 get extra mask perks.");
  L.push("- Squad 0: Each captain has unique Zanpakuto skin, skills, armor, and private Soul King Palace instance.");
  L.push("- All gear: Minimum 2 gem slots; cap is 3 (4th slot via special alchemy recipe).");
  L.push("- Balance transparency: All skill numbers and formulas are now fully documented.");
  L.push("");

  // ── Stats ────────────────────────────────────────────────────────────────
  L.push("═══════════════════════════════════════════════════");
  L.push("STATS SYSTEM");
  L.push("═══════════════════════════════════════════════════");
  L.push("");
  L.push("All stats start at 0, auto-increase +1 per level. 16 stat points allocated manually each level.");
  L.push("");
  L.push("Attack (ATK) — Offensive:");
  L.push("  - Increases max damage of Normal attacks");
  L.push("  - Affects min damage of Normal attacks");
  L.push("  - Increases Normal/Precision Critical damage");
  L.push("  - Increases player Health");
  L.push("");
  L.push("Defense (DEF) — Defensive:");
  L.push("  - Reduces damage taken per point");
  L.push("  - Reduces Critical damage taken per point");
  L.push("  - Hard cap: 70% damage reduction from Defense alone");
  L.push("");
  L.push("Reiatsu (REI) — Spiritual:");
  L.push("  - Increases max damage of Reiatsu attacks");
  L.push("  - Affects min damage of Reiatsu attacks");
  L.push("  - Increases Reiatsu Critical damage");
  L.push("  - Increases Reiryoku and Health (smaller bonus than ATK)");
  L.push("");
  L.push("Dexterity (DEX) — Technical:");
  L.push("  - Incrementally increases Critical hit rate");
  L.push("  - Increases Accuracy");
  L.push("  - Increases Avoidability");
  L.push("");
  L.push("Spirit Level:");
  L.push("  - Purchased with Spirit Dust at Artemis NPC");
  L.push("  - Each Spirit Level grants +30 to ALL stats");
  L.push("  - Maximum: 10 Spirit Levels = +300 all stats");
  L.push("");

  // ── Currencies ───────────────────────────────────────────────────────────
  L.push("═══════════════════════════════════════════════════");
  L.push("CURRENCIES");
  L.push("═══════════════════════════════════════════════════");
  L.push("");
  L.push("- Event Points (EP): Earned through events. Used for respecs, Schrift resets, zanpakuto rerolls, faction changes.");
  L.push("- Spirit Dust (SD): Dropped by any mob. Used for Spirit Level at Artemis. Perk/Stat resets cost 30 SD.");
  L.push("- Soul Energy (SE): From killing players. Spent at Soul Energy Shop for Reaper gear.");
  L.push("- Guild Points (GP): From Guild/House Wars. Spent at Guild House vendor.");
  L.push("- Soul Points (SP): Premium cash currency. Race changes, cash shop, special features.");
  L.push("- Hell Points: From killing mobs in Hell. Accumulate 50+ to rebirth.");
  L.push("- PvP Souls: From PvP kills. Used to level gear (alternative to Spirit Dust).");
  L.push("- Hell Souls: From Hell mobs. Used to level gear.");
  L.push("");

  // ── Leveling Guide ───────────────────────────────────────────────────────
  L.push("═══════════════════════════════════════════════════");
  L.push("LEVELING GUIDE");
  L.push("═══════════════════════════════════════════════════");
  L.push("");
  L.push("Early Game (Lv 1–25):");
  L.push("  - Complete Tutorial Quest: Teacher NPC → Pool NPC → defeat 15 Delinquents → Chef → candy from Urahara's Shop");
  L.push("  - Check if Class event is active (classroom doors north of spawn) — idle inside for ~8 free levels");
  L.push("  - Farm Delinquents first, then move to Hollows in Karakura Town");
  L.push("  - Join a faction as soon as possible for squad perk bonuses");
  L.push("  - Always accept Kill Quests from the NPC near your grinding spot");
  L.push("  - First perk slot unlocks at Level 10");
  L.push("");
  L.push("Mid Game (Lv 25–60):");
  L.push("  - Shinigami: unlock Shikai at Lv25 (40 Zanpakuto Understanding + 50 Zanjutsu passive)");
  L.push("  - Hollow: stay as Vasto Lorde as long as possible — VL form trains Zanjutsu passives much faster");
  L.push("  - Group farm every chance you get — party EXP bonus far outweighs solo grinding");
  L.push("  - Train passives during downtime: hit dummies (non-spiky side) or find a 'bumper buddy'");
  L.push("  - Move to Hueco Mundo / stronger mobs as you hit mid-30s");
  L.push("  - Major perk slot at Level 30 — Shock R3 is recommended for most builds");
  L.push("");
  L.push("Late Game (Lv 60–90):");
  L.push("  - Prioritize 1 event win — required for Bankai, Resurrecciones, Vasto, and most major unlocks");
  L.push("  - Shinigami Bankai requires: Lv60+ · 1 event win · 100 Zan Understanding · 100 Zanjutsu · 35 Hakuda · 30 Spirit Mastery");
  L.push("  - Lock in your stat build: ATK/DEF for physical, REI/DEF for spiritual");
  L.push("  - Lieutenant rank unlocks at Level 65 (squad-specific)");
  L.push("  - Hell-tier mobs and event participation become primary XP sources");
  L.push("  - Major perk at Level 60 — Ignite R3 (burn on every hit)");
  L.push("");
  L.push("End Game (Lv 90–130):");
  L.push("  - Limit Release unlocks at Level 70 (Lieutenant or Captain only) — at Lv130 grants +50% all stats");
  L.push("  - Captain rank: know Bankai + Lv90 + defeat the current Captain in a duel");
  L.push("  - Major perk at Level 90 — Chill R3 (20% slow chance)");
  L.push("  - Ultimate Perk slot unlocks at Level 120 — Berserker's Rage R3 (offense) or Stand Behind Me R3 (tank)");
  L.push("  - Rebirth when ready: every level above 90 grants 15 SP. First rebirth multiplies XP by ×2.5");
  L.push("  - Post-rebirth: Sinner faction becomes available. Perk slots are kept across all rebirths");
  L.push("");
  L.push("Rebirth System:");
  L.push("  - Resets your level to 1 but keeps perk slots and equipped gear");
  L.push("  - For every level above 90 at time of rebirth, gain 15 SP");
  L.push("  - XP requirement multiplied by ×2.5 after first rebirth");
  L.push("  - First rebirth unlocks the Sinner faction");
  L.push("  - Multiple rebirths compound SP bonuses");
  L.push("");

  // ── Factions ─────────────────────────────────────────────────────────────
  L.push("═══════════════════════════════════════════════════");
  L.push("FACTIONS (7 TOTAL)");
  L.push("═══════════════════════════════════════════════════");
  L.push("");

  for (const f of FACTIONS) {
    L.push(`─────────────────────────────────────`);
    L.push(`${f.icon} ${f.name.toUpperCase()} (${f.kanji})`);
    L.push(`"${f.quote}"`);
    L.push(f.tagline);
    L.push("");

    for (const section of f.sections) {
      L.push(`  ${section.title}:`);
      for (const item of section.items) {
        const label = item.value ? `${item.value}: ${item.label}` : item.label;
        if (label.trim()) L.push(`  - ${label}`);
      }
      L.push("");
    }

    if (f.namedSections) {
      for (const ns of f.namedSections) {
        L.push(`  ${ns.title.toUpperCase()}:`);
        if (ns.note) L.push(`  (${ns.note})`);
        for (const item of ns.items) {
          L.push(`  [${item.tag.toUpperCase()}] ${item.name}:`);
          for (const perk of item.perks) {
            L.push(`    - ${perk}`);
          }
          if (item.captainPerk) {
            L.push(`    ${item.captainLabel ?? "Captain"}: ${item.captainPerk}`);
          }
        }
        L.push("");
      }
    }
  }

  // ── Skill Trees ──────────────────────────────────────────────────────────
  L.push("═══════════════════════════════════════════════════");
  L.push("SKILL TREES");
  L.push("═══════════════════════════════════════════════════");
  L.push("");
  L.push("Skill points: 1 per 4 levels up to Lv100; additional from achievements.");
  L.push("Augments extend an existing skill — they require the parent skill as a prerequisite.");
  L.push("Masteries are exclusive: you can only pick ONE at Level 40.");
  L.push("");

  const TREES: { label: string; tree: SkillTree }[] = [
    { label: "SHINIGAMI SKILL TREE", tree: SHINIGAMI_TREE },
    { label: "HOLLOW / ARRANCAR SKILL TREE", tree: HOLLOW_TREE },
    { label: "QUINCY / WANDENREICH SKILL TREE", tree: QUINCY_TREE },
    { label: "FULLBRINGER SKILL TREE", tree: FULLBRINGER_TREE },
  ];

  for (const { label, tree } of TREES) {
    L.push(`─────────────────────────────────────`);
    L.push(label);
    L.push("");
    for (const line of renderTree(tree)) L.push(line);
  }

  // ── Mob Levels ───────────────────────────────────────────────────────────
  L.push("═══════════════════════════════════════════════════");
  L.push("MOB LEVELS & GRINDING LOCATIONS");
  L.push("═══════════════════════════════════════════════════");
  L.push("");
  L.push("Tiers: early (Lv2–27) | mid (Lv30–55) | late (Lv60–85) | hell (Lv90–140)");
  L.push("");

  const tiers = ["early", "mid", "late", "hell"] as const;
  for (const tier of tiers) {
    const mobs = MOBS.filter(m => m.tier === tier);
    L.push(`${tier.toUpperCase()} TIER:`);
    for (const m of mobs) {
      const note = m.note ? ` — ${m.note}` : "";
      L.push(`  Lv${m.level}: ${m.name}${note}`);
    }
    L.push("");
  }

  // ── Perk System ──────────────────────────────────────────────────────────
  L.push("═══════════════════════════════════════════════════");
  L.push("PERK SYSTEM");
  L.push("═══════════════════════════════════════════════════");
  L.push("");
  L.push("Perk Points (PP): 1 per 2 levels. Resetting all perks costs 30 Spirit Dust.");
  L.push("Minor Perks: 9 slots (unlock at Lv 10,20,40,50,70,80,90,100,110) — Rank 1/2/3 costs 1/2/3 PP");
  L.push("Major Perks: 3 slots (unlock at Lv 30,60,90) — Rank 1/2/3 costs 2/4/6 PP cumulative");
  L.push("Ultimate Perk: 1 slot (unlocks at Lv 120) — Rank 1/2/3 costs 5/10/15 PP cumulative");
  L.push("Max Minor Perk: 6 PP total to max rank 3");
  L.push("");

  const perkTypes: Array<"minor" | "major" | "ultimate"> = ["minor", "major", "ultimate"];
  for (const t of perkTypes) {
    const label = t.charAt(0).toUpperCase() + t.slice(1);
    L.push(`${label.toUpperCase()} PERKS:`);
    for (const p of PERKS.filter(p => p.type === t)) {
      const star = p.featured ? " ⭐ TOP PICK" : "";
      L.push(`  ${p.name}${star} [${p.category}]`);
      L.push(`    Ranks: ${p.ranks.join(" | ")}`);
      L.push(`    Note: ${p.note}`);
    }
    L.push("");
  }

  L.push("PERK SLOT UNLOCK TIMELINE:");
  for (const slot of PERK_SLOTS) {
    L.push(`  Level ${slot.level} (${slot.type}): ${slot.recommendation}`);
  }
  L.push("");

  // ── Build Guidance ───────────────────────────────────────────────────────
  L.push("═══════════════════════════════════════════════════");
  L.push("BUILD GUIDANCE");
  L.push("═══════════════════════════════════════════════════");
  L.push("");
  L.push("Stat allocation presets (% of total points per level):");
  L.push("  Attack build:    ATK 50% | DEF 26% | REI 12% | DEX 12%");
  L.push("  Reiatsu build:   ATK 12% | DEF 26% | REI 50% | DEX 12%");
  L.push("  Tank build:      ATK 15% | DEF 55% | REI 15% | DEX 15%");
  L.push("  Hybrid build:    ATK 28% | DEF 26% | REI 28% | DEX 18%");
  L.push("  Crit build:      ATK 35% | DEF 26% | REI 10% | DEX 29%");
  L.push("  Kido+Crit build: ATK 12% | DEF 26% | REI 36% | DEX 26%");
  L.push("");
  L.push("General rules:");
  L.push("  - ATK releases (Bankai, Arrancar) → stack ATK + DEF");
  L.push("  - REI releases (Kido, Cero) → stack REI + DEF");
  L.push("  - Never neglect DEF — survivability is critical in PvP");
  L.push("  - DEX pays off at higher levels when crit stacks with DEX-specific perks");
  L.push("");

  // ── New Player Tips ───────────────────────────────────────────────────────
  L.push("═══════════════════════════════════════════════════");
  L.push("NEW PLAYER TIPS");
  L.push("═══════════════════════════════════════════════════");
  L.push("");
  L.push("1. Tutorial Quest: Spawn → Teacher NPC → Pool NPC → 15 Delinquents → Chef → Urahara candy. Free EXP + compass tutorial.");
  L.push("2. Class event: If active, idle in the classroom (north of spawn) for ~8 free levels — always check first.");
  L.push("3. Group farm: Party EXP bonus is significantly higher than solo. Always group at mid-game onward.");
  L.push("4. Skill tree: You get 1 point every 4 levels. Plan your tree path before spending points.");
  L.push("5. Hollow progression: Stay as Vasto Lorde before becoming Arrancar — VL trains Zanjutsu passives much faster.");
  L.push("6. Events first: Most major unlocks require at least 1 Event Win. Prioritize competing in events early.");
  L.push("7. Match your build to your release: ATK releases → ATK+DEF; REI releases → REI+DEF.");
  L.push("8. Rebirth timing: Resets to Lv1, keeps perk slots. EXP ×2.5 after first RB. Unlocks Sinner race.");
  L.push("9. Kill Quest NPCs: Near most grinding spots there's a quest NPC — bonus EXP is significant.");
  L.push("10. Passive training: Hit dummies on the non-spiky side (target changes per hit) or find a bumper buddy.");
  L.push("11. Zanpakuto understanding: Press M to check your understanding level. Required for Shikai/Bankai.");
  L.push("12. Stat reset: Costs 30 Spirit Dust at the appropriate NPC. Plan before spending, but don't be afraid to reset.");
  L.push("");

  // ── Footer ───────────────────────────────────────────────────────────────
  L.push("═══════════════════════════════════════════════════");
  L.push("Soul Wars Community Wiki | Guide v3.0 | April 2026");
  L.push("https://soulwars-site.vercel.app");
  L.push("Not officially affiliated with Rhyuke or the Soul Wars development team.");
  L.push("Discord: discord.gg/9T5gPBe");
  L.push("═══════════════════════════════════════════════════");

  return L.join("\n");
}

export function GET() {
  return new NextResponse(buildFullText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=600",
    },
  });
}
