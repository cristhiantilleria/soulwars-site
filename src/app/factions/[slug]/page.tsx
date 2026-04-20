import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FACTIONS, type Squad, type NamedSection } from '@/data/factions';
import { getTips } from '@/data/builds';
import { SHINIGAMI_TREE } from '@/data/skilltrees/shinigami';
import { HOLLOW_TREE } from '@/data/skilltrees/hollow';
import { QUINCY_TREE } from '@/data/skilltrees/quincy';
import { FULLBRINGER_TREE } from '@/data/skilltrees/fullbringer';
import type { SkillTree, SkillNode, NodeType } from '@/data/skilltrees/types';
import SectionHeader from '@/components/SectionHeader';

// ─── Static params ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return ['shinigami', 'hollow', 'quincy', 'fullbringer', 'vaizard', 'bount', 'sinner'].map(
    (slug) => ({ slug })
  );
}

// ─── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const faction = FACTIONS.find((f) => f.id === slug);
  if (!faction) return { title: 'Faction Not Found' };
  return {
    title: `${faction.name} — Soul Wars Wiki`,
    description: faction.tagline,
  };
}

// ─── Tree map ──────────────────────────────────────────────────────────────────
const TREES: Record<string, SkillTree> = {
  shinigami: SHINIGAMI_TREE,
  hollow: HOLLOW_TREE,
  quincy: QUINCY_TREE,
  fullbringer: FULLBRINGER_TREE,
};

// ─── Node type colours ─────────────────────────────────────────────────────────
const TYPE_COLORS: Record<NodeType, string> = {
  skill: '#e74c3c',
  augment: '#d4af37',
  passive: '#00b4d8',
  mastery: '#8e44ad',
};

const TYPE_LABELS: Record<NodeType, string> = {
  skill: 'Skill',
  augment: 'Augment',
  passive: 'Passive',
  mastery: 'Mastery',
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function NodeBadge({ type }: { type: NodeType }) {
  return (
    <span
      style={{
        color: TYPE_COLORS[type],
        border: `1px solid ${TYPE_COLORS[type]}44`,
        backgroundColor: `${TYPE_COLORS[type]}18`,
      }}
      className="inline-block rounded px-2 py-0.5 font-title text-[0.58rem] tracking-widest uppercase"
    >
      {TYPE_LABELS[type]}
    </span>
  );
}

function AugmentCard({ node }: { node: SkillNode }) {
  return (
    <div
      className="ml-6 mt-2 rounded border-l-2 p-3"
      style={{
        borderLeftColor: TYPE_COLORS.augment,
        backgroundColor: '#1c223580',
      }}
    >
      <div className="flex items-start gap-2 flex-wrap">
        <NodeBadge type={node.type as NodeType} />
        <span className="font-title text-[0.75rem] text-[#e8eaf0]">{node.name}</span>
      </div>
      <p className="mt-1 font-body text-sm text-[#7a8aaa]">{node.description}</p>
      {node.requiredLevel && (
        <p className="mt-1 font-title text-[0.62rem] tracking-wider text-[#d4af37] uppercase">
          Requires Level {node.requiredLevel}
        </p>
      )}
      {node.requiredSkills && node.requiredSkills.length > 0 && (
        <p className="mt-1 font-title text-[0.62rem] tracking-wider text-[#8e44ad] uppercase">
          Requires: {node.requiredSkills.join(', ')}
        </p>
      )}
      {node.prerequisites && node.prerequisites.length > 1 && (
        <p className="mt-1 font-title text-[0.6rem] tracking-wide text-[#7a8aaa]">
          All prereqs needed
        </p>
      )}
    </div>
  );
}

function SkillCard({
  skill,
  augments,
}: {
  skill: SkillNode;
  augments: SkillNode[];
}) {
  return (
    <div
      className="rounded-lg border p-4"
      style={{
        borderColor: `${TYPE_COLORS[skill.type as NodeType]}55`,
        backgroundColor: '#151a27',
      }}
    >
      {/* Skill header */}
      <div className="flex items-start gap-3 flex-wrap">
        <NodeBadge type={skill.type as NodeType} />
        <h3 className="font-title text-base text-[#e8eaf0]">{skill.name}</h3>
        {skill.requiredLevel && (
          <span className="ml-auto font-title text-[0.62rem] tracking-widest uppercase text-[#d4af37]">
            Lv {skill.requiredLevel}+
          </span>
        )}
      </div>
      <p className="mt-2 font-body text-sm text-[#7a8aaa] leading-relaxed">
        {skill.description}
      </p>
      {skill.requiredSkills && skill.requiredSkills.length > 0 && (
        <p className="mt-1 font-title text-[0.62rem] tracking-wider text-[#8e44ad] uppercase">
          Requires: {skill.requiredSkills.join(', ')}
        </p>
      )}

      {/* Nested augments */}
      {augments.length > 0 && (
        <div className="mt-3">
          {augments.map((aug) => (
            <AugmentCard key={aug.id} node={aug} />
          ))}
        </div>
      )}
    </div>
  );
}

function PassiveCard({ node }: { node: SkillNode }) {
  // Passives can also have augment children — rendered flat here
  return (
    <div
      className="rounded-lg border p-4"
      style={{
        borderColor: `${TYPE_COLORS[node.type as NodeType]}55`,
        backgroundColor: '#151a27',
      }}
    >
      <div className="flex items-start gap-2 flex-wrap mb-2">
        <NodeBadge type={node.type as NodeType} />
        <h3 className="font-title text-sm text-[#e8eaf0]">{node.name}</h3>
      </div>
      <p className="font-body text-sm text-[#7a8aaa] leading-relaxed">{node.description}</p>
    </div>
  );
}

function MasteryCard({ node }: { node: SkillNode }) {
  return (
    <div
      className="rounded-lg border p-5 relative overflow-hidden"
      style={{
        borderColor: '#8e44ad66',
        backgroundColor: '#151a27',
      }}
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: 'radial-gradient(ellipse at top left, #8e44ad, transparent 60%)',
        }}
      />
      <NodeBadge type="mastery" />
      <h3 className="mt-2 font-title text-base text-[#e8eaf0]">{node.name}</h3>
      {node.requiredLevel && (
        <span className="font-title text-[0.62rem] tracking-widest uppercase text-[#d4af37]">
          Level {node.requiredLevel} Required
        </span>
      )}
      <p className="mt-2 font-body text-sm text-[#7a8aaa] leading-relaxed">{node.description}</p>
    </div>
  );
}

const SQUAD_TAG_COLORS: Record<Squad["tag"], string> = {
  offense: "#e74c3c",
  defense: "#00b4d8",
  utility: "#d4af37",
  farming: "#27ae60",
};

function SquadCard({ squad, factionColor }: { squad: Squad; factionColor: string }) {
  const tagColor = SQUAD_TAG_COLORS[squad.tag];
  return (
    <div
      className="rounded-lg border p-4 flex flex-col gap-3"
      style={{ borderColor: `${factionColor}33`, backgroundColor: "#151a27" }}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="font-title text-sm font-bold text-[#e8eaf0]">{squad.name}</h3>
        <span
          className="inline-block rounded px-2 py-0.5 font-title text-[0.58rem] tracking-widest uppercase"
          style={{ color: tagColor, border: `1px solid ${tagColor}44`, backgroundColor: `${tagColor}18` }}
        >
          {squad.tag}
        </span>
      </div>
      <ul className="space-y-1">
        {squad.perks.map((perk, i) => (
          <li key={i} className="font-body text-sm text-[#7a8aaa] flex gap-2">
            <span style={{ color: factionColor }} className="shrink-0 mt-0.5">·</span>
            {perk}
          </li>
        ))}
      </ul>
      {squad.captainPerk && (
        <div className="border-t border-white/[0.06] pt-2">
          <span className="font-title text-[0.6rem] tracking-widest uppercase text-[#d4af37]">
            {squad.captainLabel ?? "Captain"}:{" "}
          </span>
          <span className="font-body text-[0.8rem] text-[#7a8aaa]">{squad.captainPerk}</span>
        </div>
      )}
    </div>
  );
}

const COLS_CLASS: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

function NamedSectionBlock({ ns, factionColor }: { ns: NamedSection; factionColor: string }) {
  const cols = ns.columns ?? 3;
  return (
    <section className="mb-20">
      <SectionHeader eyebrow={ns.eyebrow} title={ns.title} />
      {ns.note && (
        <p className="font-body text-sm text-[#7a8aaa] mb-6 -mt-6">{ns.note}</p>
      )}
      <div className={`grid gap-4 ${COLS_CLASS[cols]}`}>
        {ns.items.map((item) => (
          <SquadCard key={item.name} squad={item} factionColor={factionColor} />
        ))}
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function FactionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const faction = FACTIONS.find((f) => f.id === slug);
  if (!faction) notFound();

  const tree = TREES[slug] ?? null;
  const tips = getTips(slug, 'hybrid', 300, '', '');

  // Organise nodes
  const skillNodes: SkillNode[] = [];
  const passiveNodes: SkillNode[] = [];
  const masteryNodes: SkillNode[] = [];
  // augments keyed by their primary prerequisite (first in array)
  const augmentsByParent: Record<string, SkillNode[]> = {};

  if (tree) {
    const allNodes = tree.nodes;

    for (const node of allNodes) {
      if (node.type === 'mastery') {
        masteryNodes.push(node);
      } else if (node.type === 'passive') {
        passiveNodes.push(node);
        // Passive augment children will be attached below
      } else if (node.type === 'skill') {
        skillNodes.push(node);
      } else if (node.type === 'augment') {
        // Find the primary parent — first prerequisite that is NOT itself an augment
        const prereqs = node.prerequisites ?? [];
        const parentId =
          prereqs.find((p) => {
            const parent = allNodes.find((n) => n.id === p);
            return parent && parent.type !== 'augment';
          }) ??
          prereqs[0] ??
          '__orphan';

        if (!augmentsByParent[parentId]) augmentsByParent[parentId] = [];
        augmentsByParent[parentId].push(node);
      }
    }

    // For passive nodes that have augment children — keep them as passives,
    // their augments will render in the passive section via augmentsByParent
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      {/* ── Nav bar ────────────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 border-b border-[#2a3450] bg-[#080a0f]/95 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="font-display text-sm text-[#e74c3c] shrink-0 hover:opacity-80 transition-opacity"
          >
            Soul Wars
          </Link>
          <span className="text-[#2a3450]">/</span>
          <Link
            href="/#factions"
            className="font-title text-[0.68rem] tracking-widest uppercase text-[#7a8aaa] hover:text-[#d4af37] transition-colors"
          >
            Factions
          </Link>
          <span className="text-[#2a3450]">/</span>
          <span
            className="font-title text-[0.68rem] tracking-widest uppercase"
            style={{ color: faction.color }}
          >
            {faction.name}
          </span>
          <div className="ml-auto">
            <Link
              href="/updates"
              className="font-title text-[0.65rem] tracking-widest uppercase text-[#7a8aaa] hover:text-[#d4af37] transition-colors"
            >
              Updates
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero header ────────────────────────────────────────────────────── */}
      <header
        className="relative overflow-hidden py-20 px-4"
        style={{
          background: `linear-gradient(180deg, ${faction.color}18 0%, transparent 70%)`,
          borderBottom: `1px solid ${faction.color}33`,
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ backgroundColor: faction.color }}
        />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-4 text-6xl">{faction.icon}</div>
          <h1
            className="font-display text-[clamp(2.2rem,6vw,4rem)] mb-4"
            style={{ color: faction.color }}
          >
            {faction.name}
          </h1>
          <p className="font-body text-lg text-[#7a8aaa] max-w-xl mx-auto">{faction.tagline}</p>
          <Link
            href="/#factions"
            className="mt-6 inline-flex items-center gap-2 font-title text-[0.68rem] tracking-widest uppercase text-[#7a8aaa] hover:text-[#d4af37] transition-colors"
          >
            ← Back to Factions
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">

        {/* ── Overview ───────────────────────────────────────────────────────── */}
        <section className="mb-20">
          <SectionHeader eyebrow="Overview" title={`${faction.name} Guide`} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {faction.sections.map((sec) => (
              <div
                key={sec.title}
                className="rounded-lg border p-5"
                style={{
                  borderColor: '#2a3450',
                  backgroundColor: '#151a27',
                }}
              >
                <h3
                  className="font-title text-[0.72rem] tracking-widest uppercase mb-4"
                  style={{ color: faction.color }}
                >
                  {sec.title}
                </h3>
                <ul className="space-y-2">
                  {sec.items.map((item, i) => (
                    <li key={i} className="font-body text-sm">
                      {item.value && (
                        <span className="text-[#e8eaf0] font-semibold">{item.value} </span>
                      )}
                      {item.label && (
                        <span className="text-[#7a8aaa]">{item.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Named Sections (squads, ranks, types, etc.) ────────────────────── */}
        {faction.namedSections?.map((ns) => (
          <NamedSectionBlock key={ns.title} ns={ns} factionColor={faction.color} />
        ))}

        {/* ── Skill Tree ─────────────────────────────────────────────────────── */}
        <section className="mb-20">
          <SectionHeader eyebrow="Skill Tree" title="Abilities & Augments" />

          {!tree ? (
            /* Coming soon */
            <div
              className="rounded-xl border border-dashed p-16 text-center"
              style={{ borderColor: '#2a3450' }}
            >
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-display text-xl text-[#e8eaf0] mb-2">Skill Tree Coming Soon</h3>
              <p className="font-body text-[#7a8aaa]">
                The {faction.name} skill tree is not yet available. Check back after an update.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Legend */}
              <div className="flex flex-wrap gap-4 justify-center">
                {(Object.entries(TYPE_COLORS) as [NodeType, string][]).map(([type, color]) => (
                  <div key={type} className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-title text-[0.65rem] tracking-widest uppercase text-[#7a8aaa]">
                      {TYPE_LABELS[type]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Active Skills */}
              {skillNodes.length > 0 && (
                <div>
                  <h3
                    className="font-title text-[0.72rem] tracking-[0.4em] uppercase mb-6"
                    style={{ color: TYPE_COLORS.skill }}
                  >
                    Active Skills
                  </h3>
                  <div className="grid gap-6 lg:grid-cols-2">
                    {skillNodes.map((skill) => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                        augments={augmentsByParent[skill.id] ?? []}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Passives */}
              {passiveNodes.length > 0 && (
                <div>
                  <h3
                    className="font-title text-[0.72rem] tracking-[0.4em] uppercase mb-6"
                    style={{ color: TYPE_COLORS.passive }}
                  >
                    Passives
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {passiveNodes.map((p) => (
                      <div key={p.id}>
                        <PassiveCard node={p} />
                        {/* Augments branching from this passive */}
                        {(augmentsByParent[p.id] ?? []).length > 0 && (
                          <div className="mt-2">
                            {(augmentsByParent[p.id] ?? []).map((aug) => (
                              <AugmentCard key={aug.id} node={aug} />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Masteries */}
              {masteryNodes.length > 0 && (
                <div>
                  <h3
                    className="font-title text-[0.72rem] tracking-[0.4em] uppercase mb-2"
                    style={{ color: TYPE_COLORS.mastery }}
                  >
                    Masteries
                  </h3>
                  <p className="font-body text-sm text-[#7a8aaa] mb-6">
                    Choose ONE mastery at Level 40. Each is a unique specialisation path.
                  </p>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {masteryNodes.map((m) => (
                      <MasteryCard key={m.id} node={m} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ── Tips ───────────────────────────────────────────────────────────── */}
        {tips.length > 0 && (
          <section className="mb-16">
            <SectionHeader eyebrow="New Players" title={`${faction.name} Tips`} />
            <div
              className="rounded-xl border p-8"
              style={{ borderColor: '#2a3450', backgroundColor: '#151a27' }}
            >
              <ul className="space-y-3">
                {tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 font-body text-sm text-[#7a8aaa]">
                    <span style={{ color: faction.color }} className="shrink-0 font-bold mt-0.5">
                      {i + 1}.
                    </span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── Footer nav ─────────────────────────────────────────────────────── */}
        <div className="border-t border-[#2a3450] pt-8 flex flex-wrap gap-4 justify-between items-center">
          <Link
            href="/#factions"
            className="font-title text-[0.68rem] tracking-widest uppercase text-[#7a8aaa] hover:text-[#d4af37] transition-colors"
          >
            ← All Factions
          </Link>
          <Link
            href="/updates"
            className="font-title text-[0.68rem] tracking-widest uppercase text-[#7a8aaa] hover:text-[#d4af37] transition-colors"
          >
            Update Log →
          </Link>
        </div>
      </main>
    </div>
  );
}
