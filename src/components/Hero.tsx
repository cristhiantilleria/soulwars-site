"use client";
import { useEffect, useRef } from "react";

const NAV_LINKS = [
  { href: "#overview",  label: "Game Overview" },
  { href: "#leveling",  label: "Leveling Guide" },
  { href: "#factions",  label: "Factions" },
  { href: "#stats",     label: "Stats & Formulas" },
  { href: "#mobs",      label: "Mob Levels" },
  { href: "#perks",     label: "Perk System" },
  { href: "#builds",    label: "Build Maker" },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number; color: string }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = [
      "192,57,43",   // red — soul reiatsu
      "142,68,173",  // purple — hollow reiatsu
      "52,152,219",  // blue — quincy reiatsu
      "212,175,55",  // gold — spirit energy
    ];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.3,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.5 - 0.08,
        alpha: Math.random() * 0.45 + 0.08,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 text-center"
    >
      {/* Backgrounds */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(192,57,43,0.18)_0%,transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_35%_at_80%_80%,rgba(0,119,168,0.1)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49.5%,rgba(192,57,43,0.05)_49.5%,rgba(192,57,43,0.05)_50.5%,transparent_50.5%),linear-gradient(0deg,transparent_49.5%,rgba(192,57,43,0.03)_49.5%,rgba(192,57,43,0.03)_50.5%,transparent_50.5%)] bg-[length:60px_60px]" />
      </div>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />

      {/* Large kanji watermark — animated reiatsu pulse */}
      <div
        aria-hidden
        className="kanji-pulse pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[40vw] leading-none font-black text-[#e74c3c]"
        style={{ opacity: 0.035 }}
      >
        魂
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <p
          className="font-title mb-5 text-[0.7rem] tracking-[0.45em] uppercase text-[#d4af37]"
          style={{ animation: "fadeUp 0.7s ease both" }}
        >
          Community Wiki · Guide 2.6
        </p>

        <h1
          className="font-display text-[clamp(2.8rem,9vw,6.5rem)] font-black leading-[1.05]"
          style={{ animation: "fadeUp 0.7s 0.12s ease both" }}
        >
          <span className="text-[#e74c3c] [text-shadow:0_0_40px_rgba(192,57,43,0.4),0_0_80px_rgba(192,57,43,0.2)]">
            Soul
          </span>{" "}
          <span className="text-[#e8eaf0]">Wars</span>
        </h1>

        <p
          className="mt-3 max-w-md font-body text-base italic text-[#7a8aaa]"
          style={{ animation: "fadeUp 0.7s 0.24s ease both" }}
        >
          The complete community guide for Bleach: Soul Wars — a BYOND MMO
        </p>

        <div
          className="my-8 h-px w-48 reiatsu-ribbon opacity-60"
          style={{ animation: "fadeUp 0.7s 0.36s ease both" }}
        />

        <nav
          className="flex flex-wrap justify-center gap-3"
          style={{ animation: "fadeUp 0.7s 0.48s ease both" }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-title rounded-sm border border-[#2a3450] bg-white/[0.02] px-4 py-2 text-[0.72rem] tracking-widest uppercase text-[#7a8aaa] transition-all duration-300 hover:border-[#d4af37] hover:bg-[rgba(212,175,55,0.08)] hover:text-[#d4af37] hover:shadow-[0_0_18px_rgba(212,175,55,0.2)]"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        style={{ animation: "fadeUp 0.7s 0.9s ease both" }}
      >
        <span className="font-title text-[0.6rem] tracking-[0.4em] uppercase text-[#7a8aaa]">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-[#e74c3c] to-transparent" />
      </div>
    </section>
  );
}
