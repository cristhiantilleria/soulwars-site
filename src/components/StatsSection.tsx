import SectionHeader from "./SectionHeader";

const STATS = [
  {
    kanji: "攻", label: "Offensive", name: "Attack", color: "#e74c3c",
    effects: [
      "Increases max damage of Normal attacks",
      "Affects min damage of Normal attacks",
      "Increases Normal/Precision Critical damage",
      "Increases player Health",
    ],
  },
  {
    kanji: "守", label: "Defensive", name: "Defense", color: "#00b4d8",
    effects: [
      "Reduces damage taken per point",
      "Reduces Critical damage taken per point",
      "Hard cap: 70% damage reduction from Defense",
    ],
  },
  {
    kanji: "霊", label: "Spiritual", name: "Reiatsu", color: "#8e44ad",
    effects: [
      "Increases max damage of Reiatsu attacks",
      "Affects min damage of Reiatsu attacks",
      "Increases Reiatsu Critical damage",
      "Increases Reiryoku & Health (smaller)",
    ],
  },
  {
    kanji: "巧", label: "Technical", name: "Dexterity", color: "#27ae60",
    effects: [
      "Incrementally increases Critical hit rate",
      "Increases Accuracy",
      "Increases Avoidability",
    ],
  },
];

const CURRENCIES = [
  { name: "Event Points (EP)",    color: "#f39c12", desc: "Earned through events. Spend at event shop for respecs, zanpaktou rerolls, faction changes, or Eris Shop." },
  { name: "Spirit Dust (SD)",     color: "#8e44ad", desc: "Dropped by any mob. Spend at Artemis to increase Spirit Level (+30 all stats each, cap 10). Also used for Perk/Stat resets." },
  { name: "Soul Energy (SE)",     color: "#e74c3c", desc: "Earned from killing players or special events. Spend at the Soul Energy Shop for Reaper gear." },
  { name: "Guild Points (GP)",    color: "#27ae60", desc: "Earned from Guild Wars / House Wars. Spend at the Guild House vendor. Cannot be traded directly." },
  { name: "Soul Points (SP)",     color: "#3498db", desc: "Premium cash currency. Used for special features, race changes, and cash shop items." },
  { name: "Hell Points",          color: "#e74c3c", desc: "Earned from killing mobs in Hell. Accumulate 50+ to rebirth your character." },
];

export default function StatsSection() {
  return (
    <section id="stats" className="bg-[#080a0f] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Character Progression" title="Stats & Formulas" />

        {/* Overview bar */}
        <div className="mb-10 grid gap-4 rounded-sm border border-[#2a3450] bg-[#151a27] p-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Starting Stats",    body: <>All stats begin at <strong className="text-[#e8eaf0]">0</strong> and auto-increase by <strong className="text-[#e8eaf0]">+1 per level</strong></> },
            { label: "Points Per Level",  body: <><strong className="text-[#e8eaf0]">16 stat points</strong> to allocate each level</> },
            { label: "Spirit Level",      body: <>Up to 10 Spirit Levels via Spirit Dust → <strong className="text-[#e8eaf0]">+300 all stats</strong></> },
            { label: "Perk Points",       body: <>Every <strong className="text-[#e8eaf0]">2 levels</strong> = 1 Perk Point · Reset costs <strong className="text-[#e8eaf0]">30 Spirit Dust</strong></> },
          ].map((x) => (
            <div key={x.label}>
              <div className="font-title mb-1 text-[0.68rem] tracking-[0.3em] uppercase text-[#d4af37]">{x.label}</div>
              <p className="text-sm text-[#7a8aaa]">{x.body}</p>
            </div>
          ))}
        </div>

        {/* Stat cards */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.name}
              className="relative overflow-hidden rounded-sm border border-[#2a3450] bg-[#151a27] p-5 transition-all hover:border-[#4a6090]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 right-2 select-none font-serif text-[5rem] leading-none"
                style={{ color: "rgba(255,255,255,0.025)" }}
              >
                {s.kanji}
              </div>
              <div className="font-title mb-1 text-[0.7rem] tracking-[0.3em] uppercase text-[#d4af37]">{s.label}</div>
              <div className="font-display mb-4 text-xl" style={{ color: s.color }}>{s.name}</div>
              <ul className="space-y-1">
                {s.effects.map((e) => (
                  <li key={e} className="relative pl-4 text-sm text-[#7a8aaa]">
                    <span className="absolute left-0 text-[#d4af37]">›</span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Currencies */}
        <h3 className="font-title mb-4 text-[0.72rem] tracking-[0.3em] uppercase text-[#d4af37]">Currencies</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CURRENCIES.map((c) => (
            <div
              key={c.name}
              className="rounded-sm border border-[#2a3450] bg-[#151a27] p-4"
              style={{ borderLeftColor: c.color, borderLeftWidth: 3 }}
            >
              <div className="font-title mb-1.5 text-[0.95rem] font-bold" style={{ color: c.color }}>{c.name}</div>
              <p className="text-sm text-[#7a8aaa]">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
