import SectionHeader from "./SectionHeader";

const FEATURES = [
  {
    icon: "🎮",
    color: "#e74c3c",
    title: "Free BYOND MMO",
    body: "Soul Wars is a free browser MMO built on the BYOND engine, set in the Bleach universe. No download required — create an account and play from any browser.",

  },
  {
    icon: "🌀",
    color: "#8e44ad",
    title: "Spiritual Power (Reiatsu)",
    body: "Your reiatsu defines your strength. Train Attack, Defense, Reiatsu, and Dexterity to shape your combat identity — tank, glass cannon, hybrid, or pure support.",
  },
  {
    icon: "⚔️",
    color: "#5dade2",
    title: "7 Unique Factions",
    body: "Shinigami, Hollow, Quincy, Fullbringer, Vaizard, Bount, or Sinner — each faction has its own unlock path, skill tree, exclusive abilities, and end-game forms.",
  },
  {
    icon: "🏆",
    color: "#d4af37",
    title: "Event-Driven Progression",
    body: "Major milestones like Shikai, Bankai, and Resurrecciones require Event Wins. Competing and winning events isn't optional — it's the core of progression.",
  },
  {
    icon: "🔄",
    color: "#27ae60",
    title: "Rebirth & Prestige",
    body: "Reach max level, rebirth, and grow exponentially stronger. Each rebirth grants bonus SP based on your level, and unlocks the Sinner faction on the first run.",
  },
  {
    icon: "🧬",
    color: "#e67e22",
    title: "Deep Build Customization",
    body: "Pick your squad for passive bonuses, slot minor/major/ultimate perks, and specialize your release form. No two builds play the same.",
  },
];

export default function GameOverview() {
  return (
    <section id="overview" className="bg-[#080a0f] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="What is Soul Wars?" title="The Game" />

        <p className="font-body text-center text-lg text-[#7a8aaa] max-w-2xl mx-auto mb-14 -mt-4 leading-relaxed">
          Bleach: Soul Wars is a free BYOND MMO set in the Bleach universe. Level your character,
          master your faction&apos;s unique abilities, compete in events, and fight for spiritual dominance
          across Soul Society, Hueco Mundo, and beyond.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-sm border border-[#2a3450] bg-[#151a27] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3a4560]"
              style={{ borderLeftColor: f.color, borderLeftWidth: 3 }}
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-title text-[0.95rem] font-bold mb-2" style={{ color: f.color }}>
                {f.title}
              </h3>
              <p className="font-body text-sm text-[#7a8aaa] leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
