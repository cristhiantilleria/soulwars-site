"use client";
import { useState, useEffect, useCallback } from "react";
import {
  STYLE_LABELS, STYLE_RATIOS, PERK_RECS, ZAN_LABELS, ZAN_BONUSES,
  FACTION_COLORS, FACTION_LABELS, getTips,
  type BuildStyle,
} from "@/data/builds";
import SectionHeader from "./SectionHeader";

interface SavedBuild {
  id: number;
  name: string;
  faction: string;
  level: number;
  style: BuildStyle;
  zan: string;
  squad: string;
  atk: number;
  def: number;
  rei: number;
  dex: number;
}

const STAT_COLORS = {
  atk: "#e74c3c",
  def: "#00b4d8",
  rei: "#8e44ad",
  dex: "#27ae60",
} as const;

type StatKey = keyof typeof STAT_COLORS;

function StatSlider({
  stat,
  value,
  max,
  onChange,
}: {
  stat: StatKey;
  value: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  const color = STAT_COLORS[stat];
  const label = { atk: "Attack", def: "Defense", rei: "Reiatsu", dex: "Dexterity" }[stat];

  return (
    <div className="flex items-center gap-3">
      <span className="font-title min-w-[80px] text-sm font-semibold" style={{ color }}>
        {label}
      </span>
      <div className="relative flex-1 h-1.5 rounded-full bg-[#2a3450]">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
        <input
          type="range"
          min={0}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        {/* thumb */}
        <div
          className="pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-[#080a0f] shadow transition-all"
          style={{ left: `calc(${pct}% - 7px)`, background: color }}
        />
      </div>
      <span className="font-title min-w-[42px] text-right text-sm text-[#e8eaf0]">{value}</span>
    </div>
  );
}

export default function BuildMaker() {
  const [name, setName]     = useState("Shadow Kido");
  const [faction, setFaction] = useState("vaizard");
  const [level, setLevel]   = useState(100);
  const [style, setStyle]   = useState<BuildStyle>("kidocrit");
  const [zan, setZan]       = useState("aizen");
  const [squad, setSquad]   = useState("squad6");

  const total = level * 16;
  const [stats, setStats] = useState({ atk: 192, def: 416, rei: 576, dex: 416 });
  const [generated, setGenerated] = useState(false);
  const [saved, setSaved]   = useState<SavedBuild[]>([]);

  const [copied, setCopied] = useState(false);

  const autoAllocate = useCallback((s: BuildStyle, t: number) => {
    const r = STYLE_RATIOS[s];
    const a = Math.round(r[0] * t);
    const d = Math.round(r[1] * t);
    const re = Math.round(r[2] * t);
    const dx = t - a - d - re;
    setStats({ atk: a, def: d, rei: re, dex: Math.max(0, dx) });
  }, []);

  useEffect(() => {
    autoAllocate("kidocrit", 100 * 16);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setStat = (key: StatKey, val: number) => {
    const others: StatKey[] = (["atk", "def", "rei", "dex"] as StatKey[]).filter((k) => k !== key);
    const rest = others.reduce((s, k) => s + stats[k], 0);
    const clamped = Math.min(val, total - rest);
    setStats((prev) => ({ ...prev, [key]: Math.max(0, clamped) }));
  };

  const remaining = total - stats.atk - stats.def - stats.rei - stats.dex;

  const generate = () => setGenerated(true);

  const saveBuild = () => {
    const b: SavedBuild = { id: Date.now(), name, faction, level, style, zan, squad, ...stats };
    setSaved((prev) => [...prev, b]);
  };

  const loadBuild = (b: SavedBuild) => {
    setName(b.name); setFaction(b.faction); setLevel(b.level);
    setStyle(b.style as BuildStyle); setZan(b.zan); setSquad(b.squad);
    setStats({ atk: b.atk, def: b.def, rei: b.rei, dex: b.dex });
    setGenerated(true);
  };

  const exportBuild = () => {
    const recs = PERK_RECS[style] || [];
    const text = [
      `[Soul Wars Build] ${name}`,
      `Faction: ${FACTION_LABELS[faction] ?? "None"} | Level: ${level} | Zan: ${ZAN_LABELS[zan] ?? "None"}`,
      `ATK: ${stats.atk} | DEF: ${stats.def} | REI: ${stats.rei} | DEX: ${stats.dex}`,
      `Perks:`,
      ...recs.map((r) => `  ${r.slot}: ${r.perk} (${r.pp}PP)`),
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const factionColor = FACTION_COLORS[faction] ?? "#7a8aaa";
  const tips = getTips(faction, style, stats.def, zan, squad);
  const perksToShow = PERK_RECS[style] ?? [];

  return (
    <section id="builds" className="bg-[#0d1018] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Plan Your Character" title="Build Maker" />

        <div className="mx-auto max-w-4xl rounded-sm border border-[#2a3450] bg-[#151a27] p-6 md:p-8">
          {/* Form */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Build name */}
            <div className="flex flex-col gap-1.5">
              <label className="font-title text-[0.68rem] tracking-[0.25em] uppercase text-[#d4af37]">Build Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Shadow Kido"
                className="rounded-sm border border-[#2a3450] bg-[#111520] px-3 py-2 text-[#e8eaf0] font-body text-base outline-none focus:border-[#e74c3c] transition-colors"
              />
            </div>

            {/* Faction */}
            <div className="flex flex-col gap-1.5">
              <label className="font-title text-[0.68rem] tracking-[0.25em] uppercase text-[#d4af37]">Faction</label>
              <select
                value={faction}
                onChange={(e) => setFaction(e.target.value)}
                className="rounded-sm border border-[#2a3450] bg-[#111520] px-3 py-2 text-[#e8eaf0] font-body text-base outline-none focus:border-[#e74c3c] transition-colors cursor-pointer"
              >
                <option value="">— Select Faction —</option>
                {Object.entries(FACTION_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>

            {/* Level */}
            <div className="flex flex-col gap-1.5">
              <label className="font-title text-[0.68rem] tracking-[0.25em] uppercase text-[#d4af37]">Target Level</label>
              <select
                value={level}
                onChange={(e) => { const l = Number(e.target.value); setLevel(l); autoAllocate(style, l * 16); }}
                className="rounded-sm border border-[#2a3450] bg-[#111520] px-3 py-2 text-[#e8eaf0] font-body text-base outline-none focus:border-[#e74c3c] transition-colors cursor-pointer"
              >
                {[30, 50, 75, 100, 120].map((l) => <option key={l} value={l}>Level {l}</option>)}
              </select>
            </div>

            {/* Style */}
            <div className="flex flex-col gap-1.5">
              <label className="font-title text-[0.68rem] tracking-[0.25em] uppercase text-[#d4af37]">Play Style</label>
              <select
                value={style}
                onChange={(e) => { const s = e.target.value as BuildStyle; setStyle(s); autoAllocate(s, total); }}
                className="rounded-sm border border-[#2a3450] bg-[#111520] px-3 py-2 text-[#e8eaf0] font-body text-base outline-none focus:border-[#e74c3c] transition-colors cursor-pointer"
              >
                {Object.entries(STYLE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>

            {/* Zanpakuto */}
            <div className="flex flex-col gap-1.5">
              <label className="font-title text-[0.68rem] tracking-[0.25em] uppercase text-[#d4af37]">Zanpakuto / Release</label>
              <select
                value={zan}
                onChange={(e) => setZan(e.target.value)}
                className="rounded-sm border border-[#2a3450] bg-[#111520] px-3 py-2 text-[#e8eaf0] font-body text-base outline-none focus:border-[#e74c3c] transition-colors cursor-pointer"
              >
                <option value="">— Select —</option>
                <optgroup label="ATK Types (+96% atk, +36% dex at Bankai)">
                  {["kensei","gin","soifon","shunshui","tybw"].map((k) => <option key={k} value={k}>{ZAN_LABELS[k]}</option>)}
                </optgroup>
                <optgroup label="REI Types (+96% rei at Bankai)">
                  {["rukia","byakuya","yamamoto","mayuri","urahara"].map((k) => <option key={k} value={k}>{ZAN_LABELS[k]}</option>)}
                </optgroup>
                <optgroup label="Hybrid / Special">
                  {["aizen","hitsugaya","ichigo","kenpachi","unohana"].map((k) => <option key={k} value={k}>{ZAN_LABELS[k]}</option>)}
                </optgroup>
              </select>
            </div>

            {/* Squad */}
            <div className="flex flex-col gap-1.5">
              <label className="font-title text-[0.68rem] tracking-[0.25em] uppercase text-[#d4af37]">Squad (Shinigami)</label>
              <select
                value={squad}
                onChange={(e) => setSquad(e.target.value)}
                className="rounded-sm border border-[#2a3450] bg-[#111520] px-3 py-2 text-[#e8eaf0] font-body text-base outline-none focus:border-[#e74c3c] transition-colors cursor-pointer"
              >
                <option value="">— No Squad —</option>
                <option value="squad1">Squad 1 — +20% ATK/REI, +24% DEF</option>
                <option value="squad2">Squad 2 — +20% Crit DMG, +50 Hakuda Cap</option>
                <option value="squad3">Squad 3 — +10% Damage Dealt</option>
                <option value="squad4">Squad 4 — +70% Reiryoku Regen, AoE Heal</option>
                <option value="squad5">Squad 5 — +15% EXP, +5% ATK/REI</option>
                <option value="squad6">Squad 6 — +50% Kido Training, +10% REI ⭐ Kido</option>
                <option value="squad7">Squad 7 — +50% Toughness Training, +12.5% DEF</option>
                <option value="squad8">Squad 8 — +50% Reiryoku Drain, +40% Regen</option>
                <option value="squad9">Squad 9 — +100 Zanjutsu Cap, +8% ATK</option>
                <option value="squad10">Squad 10 — +100% Passive Training</option>
                <option value="squad11">Squad 11 — +50% Zanjutsu Training, +10% ATK ⭐ Melee</option>
                <option value="squad12">Squad 12 — +80% Passive EXP, Poison-on-Hit</option>
                <option value="squad13">Squad 13 — +6% all stats + 1% per member online</option>
                <option value="kidocorps">Kido Corps — halved cast time, +75% Kido Mastery</option>
              </select>
            </div>
          </div>

          {/* Sliders */}
          <div className="mb-5 space-y-4">
            <div className="flex items-baseline justify-between">
              <h4 className="font-title text-[0.68rem] tracking-[0.25em] uppercase text-[#d4af37]">
                Stat Allocation — {total} pts total
              </h4>
              <span className="font-title text-sm text-[#7a8aaa]">
                Remaining:{" "}
                <span className={`text-base ${remaining < 0 ? "text-[#e74c3c]" : "text-[#d4af37]"}`}>
                  {remaining}
                </span>
              </span>
            </div>
            {(["atk", "def", "rei", "dex"] as StatKey[]).map((k) => (
              <StatSlider key={k} stat={k} value={stats[k]} max={total} onChange={(v) => setStat(k, v)} />
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={generate}
              className="font-title rounded-sm border border-[#e74c3c] px-5 py-2.5 text-[0.72rem] tracking-widest uppercase text-[#e74c3c] transition-all hover:bg-[#e74c3c] hover:text-[#080a0f] hover:shadow-[0_0_18px_rgba(231,76,60,0.35)]"
            >
              ⚔ Generate Build
            </button>
            <button
              onClick={() => autoAllocate(style, total)}
              className="font-title rounded-sm border border-[#d4af37] px-5 py-2.5 text-[0.72rem] tracking-widest uppercase text-[#d4af37] transition-all hover:bg-[#d4af37] hover:text-[#080a0f]"
            >
              ✦ Auto Allocate
            </button>
          </div>

          {/* Output */}
          {generated && (
            <div className="mt-8 animate-fade-in rounded-sm border border-[#2a3450] bg-[#080a0f] p-5">
              {/* Header */}
              <div className="mb-5 flex flex-wrap items-center gap-3 border-b border-[#2a3450] pb-4">
                <div>
                  <div className="font-display text-xl text-[#e8eaf0]">{name || "Unnamed Build"}</div>
                  <div className="mt-0.5 text-sm text-[#7a8aaa]">
                    Lv{level} · {STYLE_LABELS[style]}{zan ? ` · ${ZAN_LABELS[zan]}` : ""}
                  </div>
                  {zan && ZAN_BONUSES[zan] && (
                    <div className="mt-1 text-[0.82rem] italic text-[#8e44ad]">⚔ {ZAN_BONUSES[zan]}</div>
                  )}
                </div>
                <span
                  className="font-title ml-auto rounded-sm border px-2.5 py-1 text-[0.65rem] tracking-widest uppercase"
                  style={{ color: factionColor, borderColor: factionColor }}
                >
                  {FACTION_LABELS[faction] ?? "No Faction"}
                </span>
              </div>

              {/* Stat display */}
              <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(["atk", "def", "rei", "dex"] as StatKey[]).map((k) => (
                  <div key={k} className="rounded-sm border border-[#2a3450] bg-[#151a27] p-3 text-center">
                    <div className="font-title mb-1 text-[0.62rem] tracking-widest uppercase text-[#7a8aaa]">
                      {{ atk: "Attack", def: "Defense", rei: "Reiatsu", dex: "Dexterity" }[k]}
                    </div>
                    <div className="font-display text-2xl" style={{ color: STAT_COLORS[k] }}>
                      {stats[k]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Perk recommendations */}
              {perksToShow.length > 0 && (
                <div className="mb-4 rounded-sm border border-[#2a3450] bg-[#151a27] p-4" style={{ borderLeftColor: "#8e44ad", borderLeftWidth: 3 }}>
                  <h4 className="font-title mb-3 text-[0.68rem] tracking-widest uppercase text-[#8e44ad]">Recommended Perks</h4>
                  <div className="space-y-2">
                    {perksToShow.map((r, i) => (
                      <div key={i} className="flex items-center justify-between gap-3 border-b border-white/[0.04] pb-2 last:border-0 last:pb-0 text-sm">
                        <span className="text-[#7a8aaa] min-w-[110px]">{r.slot}</span>
                        <span className="flex-1 text-[#e8eaf0]">{r.perk}</span>
                        <span className="font-title text-xs text-[#d4af37]">{r.pp} PP</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="rounded-sm border border-[#2a3450] bg-[#151a27] p-4" style={{ borderLeftColor: "#d4af37", borderLeftWidth: 3 }}>
                <h4 className="font-title mb-3 text-[0.68rem] tracking-widest uppercase text-[#d4af37]">Build Tips</h4>
                <ul className="space-y-1.5">
                  {tips.map((t, i) => (
                    <li key={i} className="relative pl-4 text-sm text-[#7a8aaa]">
                      <span className="absolute left-0 text-[#d4af37]">›</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Save / export */}
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={saveBuild}
                  className="font-title rounded-sm border border-[#e74c3c] px-4 py-2 text-[0.68rem] tracking-widest uppercase text-[#e74c3c] transition-all hover:bg-[#e74c3c] hover:text-[#080a0f]"
                >
                  💾 Save Build
                </button>
                <button
                  onClick={exportBuild}
                  className="font-title rounded-sm border border-[#d4af37] px-4 py-2 text-[0.68rem] tracking-widest uppercase text-[#d4af37] transition-all hover:bg-[#d4af37] hover:text-[#080a0f]"
                >
                  {copied ? "✓ Copied!" : "📋 Copy to Clipboard"}
                </button>
              </div>
            </div>
          )}

          {/* Saved builds */}
          {saved.length > 0 && (
            <div className="mt-8">
              <h4 className="font-title mb-3 text-[0.68rem] tracking-widest uppercase text-[#7a8aaa]">Saved Builds</h4>
              <div className="space-y-2">
                {saved.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => loadBuild(b)}
                    className="flex cursor-pointer items-center gap-3 rounded-sm border border-[#2a3450] bg-[#080a0f] px-4 py-3 transition-colors hover:border-[#d4af37]"
                  >
                    <span className="font-title flex-1 text-sm text-[#e8eaf0]">{b.name}</span>
                    <span className="text-xs italic text-[#7a8aaa]">
                      {FACTION_LABELS[b.faction] ?? "—"} · Lv{b.level}
                    </span>
                    <span className="text-xs text-[#7a8aaa]">
                      ATK:{b.atk} DEF:{b.def} REI:{b.rei} DEX:{b.dex}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSaved((p) => p.filter((x) => x.id !== b.id)); }}
                      className="text-[#7a8aaa] hover:text-[#e74c3c] transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
