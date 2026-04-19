"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#factions", label: "Factions" },
  { href: "#stats",    label: "Stats" },
  { href: "#mobs",     label: "Mobs" },
  { href: "#perks",    label: "Perks" },
  { href: "#builds",   label: "Build Maker" },
  { href: "#tips",     label: "New Players" },
  { href: "/updates",  label: "Updates" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#080a0f]/95 backdrop-blur-md shadow-lg shadow-black/40" : "bg-[#080a0f]/80 backdrop-blur-sm"
      } border-b border-[#2a3450]`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6">
        <a href="#hero" className="font-display text-sm text-[#e74c3c] shrink-0">
          Soul Wars
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-5 list-none">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-title text-[0.7rem] tracking-widest uppercase text-[#7a8aaa] transition-colors hover:text-[#d4af37]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3">
          <a
            href="#builds"
            className="hidden sm:inline-block font-title text-[0.68rem] tracking-widest uppercase border border-[#e74c3c] text-[#e74c3c] px-3 py-1.5 rounded-sm transition-all hover:bg-[#e74c3c] hover:text-[#080a0f]"
          >
            Build Maker
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#7a8aaa] hover:text-white"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#2a3450] bg-[#0d1018] px-4 py-3">
          <ul className="flex flex-col gap-3 list-none">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block font-title text-xs tracking-widest uppercase text-[#7a8aaa] hover:text-[#d4af37]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
