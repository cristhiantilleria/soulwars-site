export default function WipeBanner() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <div className="flex items-center gap-4 rounded-sm border border-[#d4af37]/40 bg-gradient-to-r from-[#d4af37]/10 to-[#e74c3c]/5 p-4 md:p-5">
        <span className="shrink-0 text-2xl">⚔️</span>
        <div>
          <strong className="font-title block text-sm text-[#d4af37]">Version 3.0 Wipe — April 18th 2026</strong>
          <p className="mt-0.5 text-sm text-[#7a8aaa]">
            The biggest update in Soul Wars history is live. 130,000+ lines of code changed — race skill trees, faction war map, alchemy, mining, Wandenreich as its own faction, full balance transparency, and much more.{" "}
            <a href="/updates" className="text-[#d4af37] underline underline-offset-2 hover:text-[#f1c40f] transition-colors">
              View full update log →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
