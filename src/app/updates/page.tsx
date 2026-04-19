'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PATCHES } from '@/data/updates';
import type { PatchTag, Patch } from '@/data/updates';

// ─── Tag config ────────────────────────────────────────────────────────────────
const TAG_CONFIG: Record<
  PatchTag,
  { label: string; color: string; bg: string; dot: string }
> = {
  new:     { label: 'New',     color: '#27ae60', bg: '#27ae6018', dot: '#27ae60' },
  buff:    { label: 'Buff',    color: '#00b4d8', bg: '#00b4d818', dot: '#00b4d8' },
  balance: { label: 'Balance', color: '#d4af37', bg: '#d4af3718', dot: '#d4af37' },
  nerf:    { label: 'Nerf',    color: '#e74c3c', bg: '#e74c3c18', dot: '#e74c3c' },
  fix:     { label: 'Fix',     color: '#8e44ad', bg: '#8e44ad18', dot: '#8e44ad' },
  system:  { label: 'System',  color: '#7a8aaa', bg: '#7a8aaa18', dot: '#7a8aaa' },
};

type TabKey = 'all' | PatchTag;

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all',     label: 'All' },
  { key: 'new',     label: 'New Content' },
  { key: 'balance', label: 'Balance' },
  { key: 'nerf',    label: 'Nerfs' },
  { key: 'buff',    label: 'Buffs' },
  { key: 'fix',     label: 'Bug Fixes' },
  { key: 'system',  label: 'System' },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function TagPill({ tag }: { tag: PatchTag }) {
  const cfg = TAG_CONFIG[tag];
  return (
    <span
      className="inline-block rounded px-2 py-0.5 font-title text-[0.58rem] tracking-widest uppercase shrink-0"
      style={{ color: cfg.color, backgroundColor: cfg.bg, border: `1px solid ${cfg.color}44` }}
    >
      {cfg.label}
    </span>
  );
}

function PatchItem({ tag, text }: { tag: PatchTag; text: string }) {
  const cfg = TAG_CONFIG[tag];
  return (
    <li className="flex gap-3 items-start py-2 border-b border-[#2a3450]/50 last:border-0">
      <span
        className="w-2 h-2 rounded-full mt-2 shrink-0"
        style={{ backgroundColor: cfg.dot }}
      />
      <TagPill tag={tag} />
      <span className="font-body text-sm text-[#7a8aaa] leading-relaxed">{text}</span>
    </li>
  );
}

function PatchBlock({
  patch,
  activeTab,
  search,
}: {
  patch: Patch;
  activeTab: TabKey;
  search: string;
}) {
  const filteredItems = patch.items.filter((item) => {
    const matchesTab = activeTab === 'all' || item.tag === activeTab;
    const matchesSearch =
      search.trim() === '' ||
      item.text.toLowerCase().includes(search.toLowerCase()) ||
      item.tag.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (filteredItems.length === 0) return null;

  // Count by tag for this patch
  const counts: Partial<Record<PatchTag, number>> = {};
  for (const item of filteredItems) {
    counts[item.tag] = (counts[item.tag] ?? 0) + 1;
  }

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: '#2a3450', backgroundColor: '#151a27' }}
    >
      {/* Patch header */}
      <div
        className="px-6 py-4 border-b flex flex-wrap gap-4 items-start justify-between"
        style={{
          borderBottomColor: '#2a3450',
          background: 'linear-gradient(90deg, #1c223580 0%, #151a2780 100%)',
        }}
      >
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-title text-[0.65rem] tracking-[0.4em] uppercase text-[#d4af37]">
              {patch.label}
            </span>
            <span
              className="rounded-full px-2 py-0.5 font-title text-[0.58rem] tracking-wider uppercase"
              style={{
                backgroundColor:
                  patch.version === '3.0-wipe' ? '#e74c3c20' : '#27ae6020',
                color: patch.version === '3.0-wipe' ? '#e74c3c' : '#27ae60',
                border: `1px solid ${patch.version === '3.0-wipe' ? '#e74c3c44' : '#27ae6044'}`,
              }}
            >
              {patch.version === '3.0-wipe' ? '⚔ Major Wipe' : 'Live'}
            </span>
          </div>
          <p className="mt-1 font-display text-[1.1rem] text-[#e8eaf0]">{patch.date}</p>
        </div>
        {/* Tag summary pills */}
        <div className="flex flex-wrap gap-2">
          {(Object.entries(counts) as [PatchTag, number][]).map(([tag, count]) => (
            <span
              key={tag}
              className="font-title text-[0.58rem] tracking-widest uppercase rounded px-2 py-0.5"
              style={{
                color: TAG_CONFIG[tag].color,
                backgroundColor: TAG_CONFIG[tag].bg,
                border: `1px solid ${TAG_CONFIG[tag].color}44`,
              }}
            >
              {count} {TAG_CONFIG[tag].label}
            </span>
          ))}
        </div>
      </div>

      {/* Items list */}
      <ul className="px-6 py-4">
        {filteredItems.map((item, i) => (
          <PatchItem key={i} tag={item.tag} text={item.text} />
        ))}
      </ul>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function UpdatesPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  const visiblePatches = useMemo(() => {
    return PATCHES.filter((patch) =>
      patch.items.some((item) => {
        const matchesTab = activeTab === 'all' || item.tag === activeTab;
        const matchesSearch =
          search.trim() === '' ||
          item.text.toLowerCase().includes(search.toLowerCase()) ||
          item.tag.toLowerCase().includes(search.toLowerCase());
        return matchesTab && matchesSearch;
      })
    );
  }, [search, activeTab]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      {/* ── Sticky header ──────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[#2a3450] bg-[#080a0f]/95 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Top bar */}
          <div className="flex items-center gap-4 py-3">
            <Link
              href="/"
              className="font-display text-sm text-[#e74c3c] shrink-0 hover:opacity-80 transition-opacity"
            >
              Soul Wars
            </Link>
            <span className="text-[#2a3450]">/</span>
            <span className="font-title text-[0.68rem] tracking-widest uppercase text-[#e8eaf0]">
              Update Log
            </span>
            <div className="ml-auto">
              <Link
                href="/#factions"
                className="font-title text-[0.65rem] tracking-widest uppercase text-[#7a8aaa] hover:text-[#d4af37] transition-colors"
              >
                Factions
              </Link>
            </div>
          </div>

          {/* Search + Tabs */}
          <div className="pb-3 space-y-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search updates…"
              className="w-full rounded-md border border-[#2a3450] bg-[#151a27] px-4 py-2 font-body text-sm text-[#e8eaf0] placeholder-[#7a8aaa] focus:border-[#d4af37] focus:outline-none transition-colors"
            />
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="shrink-0 rounded font-title text-[0.62rem] tracking-widest uppercase px-3 py-1.5 transition-all"
                  style={
                    activeTab === tab.key
                      ? {
                          backgroundColor: '#d4af3720',
                          color: '#d4af37',
                          border: '1px solid #d4af3744',
                        }
                      : {
                          backgroundColor: 'transparent',
                          color: '#7a8aaa',
                          border: '1px solid #2a3450',
                        }
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── Wipe banner ────────────────────────────────────────────────────── */}
      <div
        className="border-b py-4 px-4 text-center"
        style={{
          borderColor: '#e74c3c44',
          backgroundColor: '#e74c3c10',
        }}
      >
        <p className="font-body text-sm text-[#e8eaf0] max-w-3xl mx-auto leading-relaxed">
          <span className="text-[#e74c3c] font-semibold">⚔ Major Wipe — April 18th 2026</span>
          {' '}— After 2 years and 4 months, Soul Wars has wiped with its biggest update to date.
          130,000+ lines of code changed. A new era begins.
        </p>
      </div>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {/* Page title */}
        <div className="mb-12 text-center">
          <span className="font-title mb-3 block text-[0.68rem] tracking-[0.5em] uppercase text-[#d4af37]">
            Patch History
          </span>
          <h1 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] text-[#e8eaf0] relative inline-block">
            Soul Wars — Update Log
            <span className="absolute -bottom-2 left-[20%] right-[20%] block h-px bg-gradient-to-r from-transparent via-[#e74c3c] to-transparent" />
          </h1>
        </div>

        {/* Patch blocks */}
        {visiblePatches.length > 0 ? (
          <div className="space-y-8">
            {visiblePatches.map((patch) => (
              <PatchBlock
                key={patch.version}
                patch={patch}
                activeTab={activeTab}
                search={search}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-display text-xl text-[#7a8aaa]">No updates found</p>
            <p className="font-body text-sm text-[#7a8aaa] mt-2">
              Try a different search term or tab.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 border-t border-[#2a3450] pt-8 flex flex-wrap gap-4 justify-between items-center">
          <Link
            href="/"
            className="font-title text-[0.68rem] tracking-widest uppercase text-[#7a8aaa] hover:text-[#d4af37] transition-colors"
          >
            ← Home
          </Link>
          <Link
            href="/#factions"
            className="font-title text-[0.68rem] tracking-widest uppercase text-[#7a8aaa] hover:text-[#d4af37] transition-colors"
          >
            Factions →
          </Link>
        </div>
      </main>
    </div>
  );
}
