"use client";
import { useState } from "react";
import { MOBS, TIER_CONFIG, type MobTier } from "@/data/mobs";
import SectionHeader from "./SectionHeader";

const TIERS: MobTier[] = ["early", "mid", "late", "hell"];

export default function MobsSection() {
  const [filter, setFilter] = useState<MobTier | "all">("all");

  const displayed = filter === "all" ? MOBS : MOBS.filter((m) => m.tier === filter);

  return (
    <section id="mobs" className="bg-[#0d1018] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Where to Grind" title="Mob Levels & Locations" />

        {/* Filter tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`font-title rounded-sm border px-4 py-1.5 text-[0.7rem] tracking-widest uppercase transition-all ${
              filter === "all"
                ? "border-[#d4af37] bg-[rgba(212,175,55,0.12)] text-[#d4af37]"
                : "border-[#2a3450] text-[#7a8aaa] hover:border-[#4a6090]"
            }`}
          >
            All
          </button>
          {TIERS.map((t) => {
            const cfg = TIER_CONFIG[t];
            const active = filter === t;
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className="font-title rounded-sm border px-4 py-1.5 text-[0.7rem] tracking-widest uppercase transition-all"
                style={{
                  borderColor: active ? cfg.color : "#2a3450",
                  color: active ? cfg.color : "#7a8aaa",
                  background: active ? cfg.bg : undefined,
                }}
              >
                {cfg.label}
              </button>
            );
          })}
        </div>

        <div className="overflow-x-auto rounded-sm border border-[#2a3450]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#151a27]">
                {["Level", "Mob", "Tier", "Notes"].map((h) => (
                  <th
                    key={h}
                    className="font-title px-5 py-3.5 text-left text-[0.68rem] tracking-[0.3em] uppercase text-[#d4af37] border-b border-[#2a3450]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayed.map((mob, i) => {
                const cfg = TIER_CONFIG[mob.tier];
                return (
                  <tr
                    key={i}
                    className="border-b border-white/[0.03] transition-colors hover:bg-[#151a27]"
                  >
                    <td className="font-title px-5 py-2.5 font-semibold text-[#e8eaf0]">{mob.level}</td>
                    <td className="px-5 py-2.5 text-[#e8eaf0]">{mob.name}</td>
                    <td className="px-5 py-2.5">
                      <span
                        className="font-title inline-block rounded-sm border px-2 py-0.5 text-[0.65rem] tracking-wide uppercase"
                        style={{ color: cfg.color, borderColor: cfg.color, background: cfg.bg }}
                      >
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-2.5 text-[#7a8aaa]">{mob.note ?? "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
