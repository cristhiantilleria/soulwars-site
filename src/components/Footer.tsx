export default function Footer() {
  return (
    <footer className="border-t border-[#2a3450] bg-[#0d1018] px-4 py-8 text-center">
      <div className="font-display mb-2 text-lg text-[#e74c3c]/60">魂</div>
      <p className="text-sm italic text-[#7a8aaa]">
        Soul Wars Community Wiki — Version 3.0 · Built by the community, for the community
      </p>
      <p className="mt-1.5 text-xs text-[#7a8aaa]/70">
        Not officially affiliated with Rhyuke or the Soul Wars development team ·{" "}
        <a
          href="https://discord.gg/9T5gPBe"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#d4af37] hover:underline"
        >
          join the Discord
        </a>
      </p>
      <p className="mt-2 text-xs text-[#7a8aaa]/50">
        Made by <span className="text-[#d4af37]">Pipe</span>
      </p>
    </footer>
  );
}
