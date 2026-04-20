"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import type { FeedbackItem } from "@/app/api/feedback/route";

type FilterTab = "all" | "suggestion" | "bug";
type SortMode  = "votes" | "newest";
type VoteDir   = "up" | "down" | null;

const STATUS_STYLES: Record<FeedbackItem["status"], { label: string; color: string }> = {
  open:          { label: "Open",        color: "#7a8aaa" },
  planned:       { label: "Planned",     color: "#d4af37" },
  "in-progress": { label: "In Progress", color: "#3498db" },
  done:          { label: "Done",        color: "#27ae60" },
};

const TYPE_STYLES: Record<FeedbackItem["type"], { label: string; color: string }> = {
  suggestion: { label: "Suggestion", color: "#8e44ad" },
  bug:        { label: "Bug Report",  color: "#e74c3c" },
};

const VOTE_KEY = (id: string) => `sw_vote_${id}`;

// ── FeedbackCard ──────────────────────────────────────────────────────────────
function FeedbackCard({
  item,
  onVote,
  onDelete,
  adminMode,
}: {
  item: FeedbackItem;
  onVote: (id: string, dir: "up" | "down") => void;
  onDelete: (id: string) => void;
  adminMode: boolean;
}) {
  const [voted, setVoted] = useState<VoteDir>(null);

  useEffect(() => {
    const stored = localStorage.getItem(VOTE_KEY(item.id)) as VoteDir;
    setVoted(stored ?? null);
  }, [item.id]);

  const handleVote = (dir: "up" | "down") => {
    if (voted) return;
    onVote(item.id, dir);
    setVoted(dir);
    localStorage.setItem(VOTE_KEY(item.id), dir);
  };

  const type   = TYPE_STYLES[item.type];
  const status = STATUS_STYLES[item.status];
  const age    = (() => {
    const diff = Date.now() - new Date(item.created_at).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    return `${days}d ago`;
  })();

  return (
    <div className="flex gap-4 rounded-lg border border-[#2a3450] bg-[#151a27] p-5 transition-colors hover:border-[#3a4560] relative">
      {/* Vote column */}
      <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
        <button
          onClick={() => handleVote("up")}
          disabled={!!voted}
          title={voted ? "Already voted" : "Upvote"}
          className="text-lg leading-none transition-transform active:scale-90 disabled:cursor-default"
          style={{ color: voted === "up" ? "#27ae60" : "#2a3450" }}
        >
          ▲
        </button>
        <span
          className="font-title text-sm font-bold tabular-nums"
          style={{ color: item.votes > 0 ? "#d4af37" : item.votes < 0 ? "#e74c3c" : "#7a8aaa" }}
        >
          {item.votes}
        </span>
        <button
          onClick={() => handleVote("down")}
          disabled={!!voted}
          title={voted ? "Already voted" : "Downvote"}
          className="text-lg leading-none transition-transform active:scale-90 disabled:cursor-default"
          style={{ color: voted === "down" ? "#e74c3c" : "#2a3450" }}
        >
          ▼
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span
            className="inline-block rounded px-2 py-0.5 font-title text-[0.58rem] tracking-widest uppercase"
            style={{ color: type.color, border: `1px solid ${type.color}44`, backgroundColor: `${type.color}18` }}
          >
            {type.label}
          </span>
          <span
            className="inline-block rounded px-2 py-0.5 font-title text-[0.58rem] tracking-widest uppercase"
            style={{ color: status.color, border: `1px solid ${status.color}44`, backgroundColor: `${status.color}18` }}
          >
            {status.label}
          </span>
        </div>
        <h3 className="font-title text-[0.95rem] text-[#e8eaf0] mb-1">{item.title}</h3>
        {item.description && (
          <p className="font-body text-sm text-[#7a8aaa] leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}
        <p className="mt-2 font-title text-[0.6rem] tracking-wider uppercase text-[#3a4560]">
          {item.author} · {age}
        </p>
      </div>

      {/* Admin delete */}
      {adminMode && (
        <button
          onClick={() => onDelete(item.id)}
          title="Delete"
          className="absolute top-3 right-3 text-[#e74c3c]/40 hover:text-[#e74c3c] transition-colors font-title text-xs tracking-widest uppercase"
        >
          ✕
        </button>
      )}
    </div>
  );
}

// ── SubmitForm ────────────────────────────────────────────────────────────────
function SubmitForm({ onSubmit }: { onSubmit: (item: FeedbackItem) => void }) {
  const [open, setOpen]               = useState(false);
  const [type, setType]               = useState<"suggestion" | "bug">("suggestion");
  const [title, setTitle]             = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor]           = useState("");
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, type, author }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to submit");
      }
      const item: FeedbackItem = await res.json();
      onSubmit(item);
      setTitle(""); setDescription(""); setAuthor(""); setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      {!open ? (
        <div className="flex gap-3">
          <button
            onClick={() => { setType("suggestion"); setOpen(true); }}
            className="font-title text-[0.68rem] tracking-widest uppercase border border-[#8e44ad] text-[#8e44ad] px-4 py-2 rounded-sm transition-all hover:bg-[#8e44ad] hover:text-white"
          >
            + Submit Idea
          </button>
          <button
            onClick={() => { setType("bug"); setOpen(true); }}
            className="font-title text-[0.68rem] tracking-widest uppercase border border-[#e74c3c] text-[#e74c3c] px-4 py-2 rounded-sm transition-all hover:bg-[#e74c3c] hover:text-white"
          >
            Report Bug
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="rounded-lg border border-[#2a3450] bg-[#151a27] p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-title text-[0.72rem] tracking-widest uppercase text-[#d4af37]">
              {type === "suggestion" ? "Submit an Idea" : "Report a Bug"}
            </h3>
            <button type="button" onClick={() => setOpen(false)} className="font-title text-[0.65rem] tracking-widest uppercase text-[#7a8aaa] hover:text-[#e8eaf0]">
              Cancel
            </button>
          </div>
          <div className="flex gap-2">
            {(["suggestion", "bug"] as const).map((t) => (
              <button key={t} type="button" onClick={() => setType(t)}
                className="font-title text-[0.62rem] tracking-widest uppercase px-3 py-1.5 rounded-sm border transition-all"
                style={type === t
                  ? { borderColor: TYPE_STYLES[t].color, color: TYPE_STYLES[t].color, backgroundColor: `${TYPE_STYLES[t].color}18` }
                  : { borderColor: "#2a3450", color: "#7a8aaa" }}
              >
                {TYPE_STYLES[t].label}
              </button>
            ))}
          </div>
          <div>
            <label className="block font-title text-[0.6rem] tracking-widest uppercase text-[#7a8aaa] mb-1.5">
              Title <span className="text-[#e74c3c]">*</span>
            </label>
            <input required maxLength={120} value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder={type === "suggestion" ? "e.g. Add a stat calculator" : "e.g. Bala Flurry deals 0 damage"}
              className="w-full bg-[#0d1018] border border-[#2a3450] rounded px-3 py-2 font-body text-sm text-[#e8eaf0] placeholder-[#3a4560] focus:outline-none focus:border-[#d4af37] transition-colors"
            />
          </div>
          <div>
            <label className="block font-title text-[0.6rem] tracking-widest uppercase text-[#7a8aaa] mb-1.5">Description</label>
            <textarea maxLength={600} rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="More details..."
              className="w-full bg-[#0d1018] border border-[#2a3450] rounded px-3 py-2 font-body text-sm text-[#e8eaf0] placeholder-[#3a4560] focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
            />
          </div>
          <div>
            <label className="block font-title text-[0.6rem] tracking-widest uppercase text-[#7a8aaa] mb-1.5">Your Name (optional)</label>
            <input maxLength={50} value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Anonymous"
              className="w-full bg-[#0d1018] border border-[#2a3450] rounded px-3 py-2 font-body text-sm text-[#e8eaf0] placeholder-[#3a4560] focus:outline-none focus:border-[#d4af37] transition-colors"
            />
          </div>
          {error && (
            <p className="font-body text-sm text-[#e74c3c] bg-[#e74c3c]/10 border border-[#e74c3c]/30 rounded px-3 py-2">{error}</p>
          )}
          <button type="submit" disabled={loading || !title.trim()}
            className="font-title text-[0.68rem] tracking-widest uppercase border border-[#d4af37] text-[#d4af37] px-5 py-2 rounded-sm transition-all hover:bg-[#d4af37] hover:text-[#080a0f] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}

// ── AdminLock ─────────────────────────────────────────────────────────────────
function AdminLock({ onUnlock }: { onUnlock: (secret: string) => void }) {
  const [open, setOpen]     = useState(false);
  const [pass, setPass]     = useState("");
  const [error, setError]   = useState(false);
  const inputRef            = useRef<HTMLInputElement>(null);

  const attempt = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/feedback/__probe", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${pass}` },
    });
    if (res.status === 404) {
      // 404 means route exists but item not found = password correct
      onUnlock(pass);
      setOpen(false);
      setPass("");
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        title="Admin"
        className="font-title text-[0.6rem] tracking-widest uppercase text-[#3a4560] hover:text-[#7a8aaa] transition-colors"
      >
        🔒
      </button>
      {open && (
        <form
          onSubmit={attempt}
          className="absolute right-0 top-7 z-50 bg-[#151a27] border border-[#2a3450] rounded-lg p-3 flex gap-2 shadow-xl"
        >
          <input
            ref={inputRef}
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Admin key"
            className={`bg-[#0d1018] border rounded px-2 py-1 font-body text-sm text-[#e8eaf0] w-32 focus:outline-none transition-colors ${error ? "border-[#e74c3c]" : "border-[#2a3450] focus:border-[#d4af37]"}`}
          />
          <button type="submit" className="font-title text-[0.6rem] tracking-widest uppercase text-[#d4af37] hover:text-white transition-colors">
            Enter
          </button>
        </form>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function FeedbackPage() {
  const [items, setItems]       = useState<FeedbackItem[]>([]);
  const [loading, setLoading]   = useState(true);
  const [kvError, setKvError]   = useState(false);
  const [filter, setFilter]     = useState<FilterTab>("all");
  const [sort, setSort]         = useState<SortMode>("votes");
  const [adminMode, setAdminMode] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");

  const fetchItems = useCallback(async () => {
    try {
      const res  = await fetch("/api/feedback");
      const data = await res.json();
      if (!res.ok) { setKvError(true); return; }
      setItems(data);
    } catch { setKvError(true); }
    finally  { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleVote = async (id: string, direction: "up" | "down") => {
    const res = await fetch(`/api/feedback/${id}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    if (!res.ok) return;
    const { votes } = await res.json();
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, votes } : i)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    const res = await fetch(`/api/feedback/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${adminSecret}` },
    });
    if (res.ok) setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleUnlock = (secret: string) => {
    setAdminSecret(secret);
    setAdminMode(true);
  };

  const visible = items
    .filter((i) => filter === "all" || i.type === filter)
    .sort((a, b) =>
      sort === "votes"
        ? b.votes - a.votes
        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return (
    <div className="min-h-screen bg-[#0d1018]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-[#2a3450] bg-[#080a0f]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="font-display text-sm text-[#e74c3c] hover:opacity-80 transition-opacity">
            Soul Wars
          </Link>
          <span className="text-[#2a3450]">/</span>
          <span className="font-title text-[0.68rem] tracking-widest uppercase text-[#d4af37]">
            Community Feedback
          </span>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/updates" className="font-title text-[0.65rem] tracking-widest uppercase text-[#7a8aaa] hover:text-[#d4af37] transition-colors">
              Updates
            </Link>
            {adminMode ? (
              <button onClick={() => { setAdminMode(false); setAdminSecret(""); }}
                className="font-title text-[0.6rem] tracking-widest uppercase text-[#e74c3c] hover:text-white transition-colors"
              >
                🔓 Exit Admin
              </button>
            ) : (
              <AdminLock onUnlock={handleUnlock} />
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="border-b border-[#2a3450] py-14 px-4 text-center"
        style={{ background: "linear-gradient(180deg, #8e44ad18 0%, transparent 70%)" }}
      >
        <div className="font-display mb-2 text-2xl text-[#8e44ad]/50">魂</div>
        <h1 className="font-display text-[clamp(1.8rem,5vw,3rem)] text-[#e8eaf0] mb-3">
          Community Feedback
        </h1>
        <p className="font-body text-[#7a8aaa] max-w-md mx-auto text-sm">
          Vote on ideas you want to see, report bugs, or submit your own suggestions.
          Top-voted ideas get reviewed first.
        </p>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">

        {kvError && (
          <div className="mb-8 rounded-lg border border-[#d4af37]/40 bg-[#d4af37]/10 p-4 font-body text-sm text-[#d4af37]">
            <strong className="font-title tracking-widest uppercase text-xs">Setup Required</strong>
            <p className="mt-1 text-[#7a8aaa]">
              Add <code className="text-[#d4af37]">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="text-[#d4af37]">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your Vercel environment variables.
            </p>
          </div>
        )}

        {adminMode && (
          <div className="mb-6 rounded-lg border border-[#e74c3c]/40 bg-[#e74c3c]/10 px-4 py-3 font-title text-[0.65rem] tracking-widest uppercase text-[#e74c3c]">
            Admin mode active — click ✕ on any item to delete it
          </div>
        )}

        {!kvError && <SubmitForm onSubmit={(item) => setItems((prev) => [item, ...prev])} />}

        {/* Filters + sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex gap-1">
            {(["all", "suggestion", "bug"] as FilterTab[]).map((tab) => (
              <button key={tab} onClick={() => setFilter(tab)}
                className="font-title text-[0.62rem] tracking-widest uppercase px-3 py-1.5 rounded-sm border transition-all"
                style={filter === tab
                  ? { borderColor: "#d4af37", color: "#d4af37", backgroundColor: "#d4af3718" }
                  : { borderColor: "#2a3450", color: "#7a8aaa" }}
              >
                {tab === "all" ? "All" : tab === "suggestion" ? "Ideas" : "Bugs"}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {(["votes", "newest"] as SortMode[]).map((s) => (
              <button key={s} onClick={() => setSort(s)}
                className="font-title text-[0.62rem] tracking-widest uppercase px-3 py-1.5 rounded-sm border transition-all"
                style={sort === s
                  ? { borderColor: "#5dade2", color: "#5dade2", backgroundColor: "#5dade218" }
                  : { borderColor: "#2a3450", color: "#7a8aaa" }}
              >
                {s === "votes" ? "Top Voted" : "Newest"}
              </button>
            ))}
          </div>
        </div>

        {/* Items */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 rounded-lg border border-[#2a3450] bg-[#151a27] animate-pulse" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#2a3450] py-20 text-center">
            <p className="font-title text-[0.72rem] tracking-widest uppercase text-[#3a4560]">
              {items.length === 0 ? "No feedback yet — be the first!" : "Nothing matches this filter"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map((item) => (
              <FeedbackCard
                key={item.id}
                item={item}
                onVote={handleVote}
                onDelete={handleDelete}
                adminMode={adminMode}
              />
            ))}
          </div>
        )}

        {items.length > 0 && (
          <p className="mt-8 text-center font-title text-[0.6rem] tracking-widest uppercase text-[#3a4560]">
            {items.length} submission{items.length !== 1 ? "s" : ""} ·{" "}
            {items.reduce((s, i) => s + i.votes, 0)} net votes
          </p>
        )}
      </main>
    </div>
  );
}
