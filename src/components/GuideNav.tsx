const SECTIONS = [
  { href: "#leveling",  icon: "📈", label: "Leveling",    desc: "Milestones & rebirth" },
  { href: "#factions",  icon: "⚔️", label: "Factions",    desc: "7 paths to power" },
  { href: "#stats",     icon: "📊", label: "Stats",        desc: "ATK · DEF · REI · DEX" },
  { href: "#mobs",      icon: "👾", label: "Mob Levels",   desc: "Where to grind" },
  { href: "#perks",     icon: "💎", label: "Perks",        desc: "Minor / Major / Ultimate" },
  { href: "#builds",    icon: "🏗️", label: "Build Maker",  desc: "Plan your allocation" },
  { href: "#tips",      icon: "💡", label: "New Players",  desc: "Starter essentials" },
];

export default function GuideNav() {
  return (
    <section className="bg-[#080a0f] border-y border-[#2a3450] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="font-title text-center text-[0.65rem] tracking-[0.5em] uppercase text-[#d4af37] mb-7">
          What&apos;s in this Guide
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {SECTIONS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="group flex flex-col items-center text-center rounded-sm border border-[#2a3450] bg-[#151a27] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d4af37]/50 hover:bg-[#1c2235]"
            >
              <span className="text-2xl mb-2">{s.icon}</span>
              <span className="font-title text-[0.65rem] tracking-wider uppercase text-[#e8eaf0] group-hover:text-[#d4af37] transition-colors leading-tight">
                {s.label}
              </span>
              <span className="mt-1 font-body text-[0.72rem] text-[#3a4560] group-hover:text-[#7a8aaa] transition-colors leading-tight">
                {s.desc}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
