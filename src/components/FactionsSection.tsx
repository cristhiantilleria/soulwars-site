import Link from "next/link";
import { FACTIONS, type FactionDetail } from "@/data/factions";
import SectionHeader from "./SectionHeader";

function FactionCard({ faction }: { faction: FactionDetail }) {
  return (
    <Link
      href={`/factions/${faction.id}`}
      className="group relative overflow-hidden rounded-sm border bg-[#151a27] p-6 text-left transition-all duration-300 hover:-translate-y-1 block"
      style={{ borderColor: "#2a3450" }}
    >
      {/* top accent bar */}
      <span
        className="absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: faction.color }}
      />
      <div className="mb-3 text-3xl">{faction.icon}</div>
      <div
        className="font-title mb-1.5 text-[1.05rem] font-bold transition-colors"
        style={{ color: faction.color }}
      >
        {faction.name}
      </div>
      <p className="text-sm leading-snug text-[#7a8aaa]">{faction.tagline}</p>
      <span
        className="mt-4 inline-block font-title text-[0.62rem] tracking-widest uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ color: faction.color }}
      >
        View Guide →
      </span>
    </Link>
  );
}

export default function FactionsSection() {
  return (
    <section id="factions" className="bg-[#0d1018] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Choose Your Path" title="Factions" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {FACTIONS.map((f) => (
            <FactionCard key={f.id} faction={f} />
          ))}
        </div>
      </div>
    </section>
  );
}
