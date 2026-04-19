"use client";
import { useState } from "react";
import Link from "next/link";
import { FACTIONS, type FactionDetail } from "@/data/factions";
import SectionHeader from "./SectionHeader";

function FactionCard({
  faction,
  active,
  onClick,
}: {
  faction: FactionDetail;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-sm border bg-[#151a27] p-6 text-left transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: active ? faction.color : "#2a3450",
        boxShadow: active ? `0 0 24px ${faction.color}33` : undefined,
      }}
    >
      {/* top accent bar */}
      <span
        className="absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: faction.color, transform: active ? "scaleX(1)" : undefined }}
      />
      <div className="mb-3 text-3xl">{faction.icon}</div>
      <div className="font-title mb-1.5 text-[1.05rem] font-bold" style={{ color: faction.color }}>
        <Link
          href={`/factions/${faction.id}`}
          className="hover:underline underline-offset-2"
          onClick={(e) => e.stopPropagation()}
        >
          {faction.name}
        </Link>
      </div>
      <p className="text-sm leading-snug text-[#7a8aaa]">{faction.tagline}</p>
    </button>
  );
}

function DetailPanel({ faction }: { faction: FactionDetail }) {
  return (
    <div
      className="mt-8 animate-fade-in rounded-sm border border-[#2a3450] bg-[#151a27] p-6 md:p-8"
      style={{ borderTopColor: faction.color }}
    >
      <h3
        className="font-display mb-6 border-b border-[#2a3450] pb-4 text-xl md:text-2xl"
        style={{ color: faction.color }}
      >
        {faction.icon}{" "}
        <Link
          href={`/factions/${faction.id}`}
          className="hover:underline underline-offset-2"
        >
          {faction.name}
        </Link>
      </h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {faction.sections.map((sec) => (
          <div key={sec.title}>
            <h4 className="font-title mb-3 text-[0.7rem] tracking-[0.25em] uppercase text-[#d4af37]">
              {sec.title}
            </h4>
            <ul className="space-y-1.5">
              {sec.items.map((item, i) => (
                <li
                  key={i}
                  className="border-b border-white/[0.04] pb-1.5 text-[0.9rem] text-[#7a8aaa] last:border-0"
                >
                  {item.value && (
                    <strong className="mr-1 text-[#e8eaf0]">{item.value}:</strong>
                  )}
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FactionsSection() {
  const [active, setActive] = useState<string | null>(null);

  const toggle = (id: string) => setActive(active === id ? null : id);
  const activeFaction = FACTIONS.find((f) => f.id === active);

  return (
    <section id="factions" className="bg-[#0d1018] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Choose Your Path" title="Factions" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {FACTIONS.map((f) => (
            <FactionCard
              key={f.id}
              faction={f}
              active={active === f.id}
              onClick={() => toggle(f.id)}
            />
          ))}
        </div>

        {activeFaction && <DetailPanel faction={activeFaction} />}
      </div>
    </section>
  );
}
