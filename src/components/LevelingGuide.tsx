import SectionHeader from "./SectionHeader";

const MILESTONES = [
  {
    range: "Lv 1–25",
    color: "#27ae60",
    title: "Early Game",
    tips: [
      "Do the Tutorial Quest — talk to Teacher NPC, find Pool NPC, defeat 15 Delinquents, get candy from Urahara's Shop. Free EXP.",
      "Check if the Class event is active (classroom doors north of spawn). Idling inside can net you ~8 free levels.",
      "Farm Delinquents first, then move to Hollows in Karakura Town.",
      "Join a faction ASAP — squad perks apply from day one.",
      "Always accept Kill Quests from the NPC near your grind spot.",
    ],
  },
  {
    range: "Lv 25–60",
    color: "#d4af37",
    title: "Mid Game",
    tips: [
      "Shinigami: unlock Shikai at Lv25 (40 Zanpakuto Understanding + 50 Zanjutsu passive).",
      "Hollow: stay as Vasto Lorde as long as possible — VL form trains Zanjutsu passives much faster.",
      "Group farm every chance you get — party EXP bonus far outweighs solo grinding.",
      "Train passives during downtime: hit dummies (non-spiky side) or find a bumper buddy.",
      "Move to Hueco Mundo / stronger mobs as you hit mid-30s.",
    ],
  },
  {
    range: "Lv 60–90",
    color: "#e67e22",
    title: "Late Game",
    tips: [
      "Prioritize 1 event win — required for Bankai, Resurrecciones, Vasto, and most major unlocks.",
      "Shinigami: Bankai requires Lv60+ · 1 event win · 100 Zan Understanding · 100 Zanjutsu · 35 Hakuda · 30 Spirit Mastery.",
      "Lock in your stat build: ATK/DEF for physical builds, REI/DEF for spiritual builds.",
      "Lieutenant rank unlocks at Level 65 (squad-specific).",
      "Hell-tier mobs and event participation become your primary XP sources.",
    ],
  },
  {
    range: "Lv 90–130",
    color: "#e74c3c",
    title: "End Game",
    tips: [
      "Limit Release unlocks at Level 70 (Lieutenant or Captain only) — at Lv130 it grants +50% all stats.",
      "Captain rank: know Bankai + Lv90 + defeat the current Captain in a duel.",
      "Ultimate Perk slot unlocks at Level 120 — plan your ultimate pick early.",
      "Rebirth when ready: every level above 90 grants 15 SP. First rebirth multiplies XP need by ×2.5.",
      "Post-rebirth: Sinner faction becomes available. Perk slots are kept across all rebirths.",
    ],
  },
];

const REBIRTH = [
  { label: "Perk slots", value: "Kept across all rebirths" },
  { label: "SP bonus", value: "+15 SP per level above 90" },
  { label: "XP penalty", value: "×2.5 after first rebirth" },
  { label: "Unlocks", value: "Sinner faction (1st rebirth)" },
  { label: "Reset", value: "Back to Level 1" },
];

export default function LevelingGuide() {
  return (
    <section id="leveling" className="bg-[#0d1018] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="How to Progress" title="Leveling Guide" />

        {/* Milestone timeline */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-16">
          {MILESTONES.map((m) => (
            <div
              key={m.range}
              className="rounded-sm border border-[#2a3450] bg-[#151a27] p-5 flex flex-col gap-3"
              style={{ borderTopColor: m.color, borderTopWidth: 2 }}
            >
              <div>
                <span
                  className="font-title text-[0.62rem] tracking-widest uppercase"
                  style={{ color: m.color }}
                >
                  {m.range}
                </span>
                <h3 className="font-title text-[0.95rem] font-bold text-[#e8eaf0] mt-0.5">
                  {m.title}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {m.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2 font-body text-sm text-[#7a8aaa] leading-snug">
                    <span className="shrink-0 mt-0.5" style={{ color: m.color }}>·</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Rebirth panel */}
        <div className="rounded-sm border border-[#e74c3c]/30 bg-[#151a27] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="md:w-64 shrink-0">
              <div className="font-display text-4xl text-[#e74c3c]/20 mb-1">転生</div>
              <h3 className="font-title text-[0.72rem] tracking-widest uppercase text-[#e74c3c] mb-2">
                Rebirth System
              </h3>
              <p className="font-body text-sm text-[#7a8aaa] leading-relaxed">
                Rebirthing resets your level to 1 but makes you permanently stronger.
                Plan your rebirth timing around stat gains and SP bonuses.
              </p>
            </div>
            <div className="flex-1 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {REBIRTH.map((r) => (
                <div key={r.label} className="rounded border border-[#2a3450] bg-[#0d1018] p-3 text-center">
                  <div className="font-title text-[0.6rem] tracking-widest uppercase text-[#7a8aaa] mb-1">
                    {r.label}
                  </div>
                  <div className="font-body text-sm text-[#e8eaf0]">{r.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
