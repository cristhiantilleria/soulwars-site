"use client";
import { useState } from "react";
import { PERKS, PERK_SLOTS, type PerkType } from "@/data/perks";
import SectionHeader from "./SectionHeader";

type Tab = "minor" | "major" | "ultimate" | "timeline";

const TYPE_COLORS: Record<PerkType, string> = {
  minor:    "#27ae60",
  major:    "#d4af37",
  ultimate: "#e74c3c",
};

const SLOT_COLORS: Record<PerkType, string> = TYPE_COLORS;

function PerkCard({ perk }: { perk: (typeof PERKS)[number] }) {
  return (
    <div
      className="rounded-sm border border-[#2a3450] bg-[#151a27] p-4 transition-all duration-200 hover:bg-[#1c2235]"
      style={{ borderLeftColor: perk.color, borderLeftWidth: 3 }}
    >
      <div className="mb-2.5 flex items-start justify-between gap-2">
        <span className="font-title text-[0.95rem] font-bold text-[#e8eaf0]">{perk.name}</span>
        {perk.featured && (
          <span className="font-title shrink-0 rounded-sm border border-[#d4af37] bg-[rgba(212,175,55,0.1)] px-1.5 py-0.5 text-[0.6rem] tracking-wider uppercase text-[#d4af37]">
            ⭐ Top Pick
          </span>
        )}
      </div>
      <div className="mb-2.5 flex flex-wrap gap-1.5">
        {perk.ranks.map((r, i) => (
          <span
            key={i}
            className="font-title rounded-sm border border-[#2a3450] px-1.5 py-0.5 text-[0.72rem] text-[#7a8aaa]"
            style={
              i === perk.ranks.length - 1
                ? { borderColor: perk.color, color: perk.color, background: `${perk.color}18` }
                : {}
            }
          >
            {r}
          </span>
        ))}
      </div>
      <p className="text-[0.87rem] text-[#7a8aaa] leading-relaxed">{perk.note}</p>
    </div>
  );
}

export default function PerksSection() {
  const [tab, setTab] = useState<Tab>("minor");

  const tabs: { id: Tab; label: string }[] = [
    { id: "minor",    label: "Minor" },
    { id: "major",    label: "Major" },
    { id: "ultimate", label: "Ultimate" },
    { id: "timeline", label: "Slot Timeline" },
  ];

  const filtered = PERKS.filter((p) =>
    tab === "timeline" ? false : p.type === tab
  );

  return (
    <section id="perks" className="bg-[#080a0f] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Power Progression" title="Perk System" />

        {/* Slot overview */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {([
            { type: "minor",    label: "Minor",    slots: "9 slots · Lv10,20,40,50,70,80,90,100,110",   pp: "1–3 PP each" },
            { type: "major",    label: "Major",    slots: "3 slots · Lv30, 60, 90",                       pp: "2–4–6 PP (cumul.)" },
            { type: "ultimate", label: "Ultimate", slots: "1 slot · Level 120 only",                      pp: "5–10–15 PP (cumul.)" },
            { type: "info",     label: "6 PP",     slots: "To max 1 Minor Perk",                          pp: "Every 2 levels = 1 PP · Reset = 30 SD" },
          ] as const).map((x) => (
            <div key={x.label} className="rounded-sm border border-[#2a3450] bg-[#151a27] p-4 text-center">
              <div
                className="font-display mb-2 text-2xl"
                style={{ color: x.type === "info" ? "#00b4d8" : TYPE_COLORS[x.type as PerkType] }}
              >
                {x.label}
              </div>
              <p className="text-xs text-[#7a8aaa]">{x.slots}</p>
              <p className="mt-1 text-xs font-semibold text-[#e8eaf0]">{x.pp}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-1 border-b border-[#2a3450]">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`font-title mb-[-1px] border-b-2 px-4 py-2.5 text-[0.7rem] tracking-widest uppercase transition-all ${
                tab === t.id
                  ? "border-[#d4af37] text-[#d4af37]"
                  : "border-transparent text-[#7a8aaa] hover:text-[#e8eaf0]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Perk grid */}
        {tab !== "timeline" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PerkCard key={p.id} perk={p} />
            ))}
          </div>
        )}

        {/* Timeline */}
        {tab === "timeline" && (
          <div className="relative pl-10">
            <div className="absolute left-[1.1rem] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#e74c3c] via-[#d4af37] to-[#8e44ad]" />
            <div className="space-y-3">
              {PERK_SLOTS.map((slot, i) => (
                <div
                  key={i}
                  className="relative flex items-center gap-4 rounded-sm border border-[#2a3450] bg-[#151a27] p-4"
                >
                  {/* dot */}
                  <span
                    className="absolute -left-[1.55rem] h-3 w-3 rounded-full border-2 border-[#080a0f]"
                    style={{ background: SLOT_COLORS[slot.type], boxShadow: `0 0 6px ${SLOT_COLORS[slot.type]}` }}
                  />
                  <div
                    className="font-display min-w-[3rem] text-xl"
                    style={{ color: SLOT_COLORS[slot.type] }}
                  >
                    {slot.level}
                  </div>
                  <div>
                    <div
                      className="font-title text-[0.68rem] tracking-widest uppercase mb-0.5"
                      style={{ color: SLOT_COLORS[slot.type] }}
                    >
                      {slot.type} Slot
                    </div>
                    <p className="text-sm text-[#7a8aaa]">{slot.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
