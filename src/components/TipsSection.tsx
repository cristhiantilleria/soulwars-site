import SectionHeader from "./SectionHeader";

const TIPS = [
  { n: "01", title: "Do the Tutorial Quest",       body: "Spawn → talk to Teacher NPC → find Pool NPC → defeat 15 Delinquents → find Chef → get candy from Urahara's Shop. Free EXP and it teaches the compass system." },
  { n: "02", title: "Check the Events Tab",        body: "If 'Class' is active, the classroom doors just north of your spawn are open. Idling inside can net you ~8 free levels. Always check before grinding." },
  { n: "03", title: "Always Group Farm",           body: "Grouping is significantly faster than solo grinding, especially after level 40+. The EXP bonus from parties far outweighs going alone." },
  { n: "04", title: "Train Passives Strategically",body: "If playing Hollow, stay as Vasto Lorde as long as possible before becoming Arrancar — Vasto gives massive passive training speed bonuses for Zanjutsu." },
  { n: "05", title: "Zanjutsu Training",           body: "Hit training dummies (non-spiky side — the target changes per hit). Or find a 'bumper buddy' for faster gains. Dummies are near Urahara's shop." },
  { n: "06", title: "Win Events for Unlocks",      body: "Most major unlocks (Ress, Vasto, Bankai) require Event Wins. Prioritize participating in events early — even 1 win unlocks critical progression gates." },
  { n: "07", title: "Build for Your Release",      body: "ATK-based releases → stack Attack + Defense. REI-based releases → stack Reiatsu + Defense. Don't neglect Defense — survivability matters in this game." },
  { n: "08", title: "Rebirth Timing",              body: "Rebirthing resets you to Lv1 but keeps perk slots. For every level above 90 you were, you gain 15 SP. First RB increases EXP requirement by 2.5x. Unlocks Sinner race." },
  { n: "09", title: "Kill Quest NPCs",             body: "Near most grinding spots there's an NPC that offers a kill quest for your current mob. Always accept these — the bonus EXP is significant and helps while leveling." },
];

export default function TipsSection() {
  return (
    <section id="tips" className="bg-[#080a0f] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Getting Started" title="New Player Tips" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TIPS.map((tip) => (
            <div
              key={tip.n}
              className="rounded-sm border border-[#2a3450] bg-[#151a27] p-5 transition-all duration-200 hover:border-[#4a6090] hover:-translate-y-0.5"
            >
              <div className="font-display mb-2 text-4xl leading-none text-[#d4af37]/15">{tip.n}</div>
              <h3 className="font-title mb-2.5 text-[0.95rem] text-[#e8eaf0]">{tip.title}</h3>
              <p className="text-sm leading-relaxed text-[#7a8aaa]">{tip.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
