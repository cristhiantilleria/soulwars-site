"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import type { NewsItem } from "@/app/api/news/route";

// ── Auth ──────────────────────────────────────────────────────────────────────
function useAdminAuth() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error,  setError]  = useState(false);
  const [pass,   setPass]   = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 50); }, []);

  const attempt = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/feedback/__probe", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${pass}` },
    });
    if (res.status === 404) {
      setSecret(pass);
      setAuthed(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return { authed, secret, error, pass, setPass, attempt, inputRef };
}

// ── Empty form state ──────────────────────────────────────────────────────────
const emptyForm = { title: "", body: "", date: "" };

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AdminNewsPage() {
  const auth = useAdminAuth();

  const [items,   setItems]   = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [form,    setForm]    = useState(emptyForm);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [saving,  setSaving]  = useState(false);
  const [deleting,setDeleting]= useState<string | null>(null);

  const headers = useCallback(
    () => ({ "Content-Type": "application/json", Authorization: `Bearer ${auth.secret}` }),
    [auth.secret]
  );

  const loadItems = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/news");
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { if (auth.authed) loadItems(); }, [auth.authed, loadItems]);

  // ── Create ────────────────────────────────────────────────────────────────
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    setSaving(true);
    await fetch("/api/news", {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ ...form, date: form.date || new Date().toISOString() }),
    });
    setForm(emptyForm);
    await loadItems();
    setSaving(false);
  };

  // ── Update ────────────────────────────────────────────────────────────────
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    await fetch(`/api/news/${editing.id}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({ title: editing.title, body: editing.body, date: editing.date }),
    });
    setEditing(null);
    await loadItems();
    setSaving(false);
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this update?")) return;
    setDeleting(id);
    await fetch(`/api/news/${id}`, { method: "DELETE", headers: headers() });
    setItems(prev => prev.filter(i => i.id !== id));
    setDeleting(null);
  };

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!auth.authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <form onSubmit={auth.attempt} className="flex flex-col gap-4 p-8 rounded-xl border"
          style={{ background: "var(--surface)", borderColor: "var(--border)", width: 320 }}>
          <h1 className="font-display text-xl text-center" style={{ color: "var(--gold)" }}>
            News Admin
          </h1>
          <input
            ref={auth.inputRef}
            type="password"
            value={auth.pass}
            onChange={e => auth.setPass(e.target.value)}
            placeholder="Admin key"
            className="rounded px-3 py-2 font-body text-sm focus:outline-none transition-colors"
            style={{
              background: "var(--bg2)",
              border: `1px solid ${auth.error ? "var(--red)" : "var(--border)"}`,
              color: "var(--white)",
            }}
          />
          <button type="submit"
            className="font-title text-xs tracking-widest uppercase py-2 rounded transition-colors"
            style={{ background: "var(--red)", color: "#fff" }}>
            Unlock
          </button>
          {auth.error && (
            <p className="font-body text-xs text-center" style={{ color: "var(--red)" }}>
              Incorrect key
            </p>
          )}
        </form>
      </div>
    );
  }

  // ── Admin UI ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen p-6 md:p-10" style={{ background: "var(--bg)" }}>
      <div className="max-w-3xl mx-auto flex flex-col gap-8">

        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl" style={{ color: "var(--gold)" }}>
            News & Updates
          </h1>
          <a href="/" className="font-title text-xs tracking-widest uppercase transition-colors"
            style={{ color: "var(--muted)" }}>
            ← Site
          </a>
        </div>

        {/* ── Create form ─────────────────────────────────────────────────── */}
        <form onSubmit={handleCreate} className="flex flex-col gap-3 p-5 rounded-xl border"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <h2 className="font-title text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
            New Update
          </h2>
          <input
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="Title"
            maxLength={200}
            required
            className="rounded px-3 py-2 font-body text-sm focus:outline-none"
            style={{ background: "var(--bg2)", border: "1px solid var(--border)", color: "var(--white)" }}
          />
          <textarea
            value={form.body}
            onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
            placeholder="Body — patch notes, announcement, etc."
            maxLength={2000}
            rows={4}
            required
            className="rounded px-3 py-2 font-body text-sm focus:outline-none resize-y"
            style={{ background: "var(--bg2)", border: "1px solid var(--border)", color: "var(--white)" }}
          />
          <div className="flex items-center gap-3">
            <input
              type="datetime-local"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              className="rounded px-3 py-2 font-body text-sm focus:outline-none flex-1"
              style={{ background: "var(--bg2)", border: "1px solid var(--border)", color: "var(--muted)" }}
            />
            <button type="submit" disabled={saving}
              className="font-title text-xs tracking-widest uppercase px-5 py-2 rounded transition-opacity"
              style={{ background: "var(--red)", color: "#fff", opacity: saving ? 0.5 : 1 }}>
              {saving ? "Saving…" : "Post"}
            </button>
          </div>
        </form>

        {/* ── Items list ──────────────────────────────────────────────────── */}
        {loading ? (
          <p className="font-body text-sm text-center" style={{ color: "var(--muted)" }}>Loading…</p>
        ) : items.length === 0 ? (
          <p className="font-body text-sm text-center" style={{ color: "var(--muted)" }}>No updates yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map(item => (
              <div key={item.id} className="rounded-xl border p-4 flex flex-col gap-3"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}>

                {editing?.id === item.id ? (
                  /* ── Edit form ───────────────────────────────────────── */
                  <form onSubmit={handleUpdate} className="flex flex-col gap-2">
                    <input
                      value={editing.title}
                      onChange={e => setEditing(ed => ed ? { ...ed, title: e.target.value } : ed)}
                      maxLength={200}
                      required
                      className="rounded px-3 py-2 font-body text-sm focus:outline-none"
                      style={{ background: "var(--bg2)", border: "1px solid var(--gold)", color: "var(--white)" }}
                    />
                    <textarea
                      value={editing.body}
                      onChange={e => setEditing(ed => ed ? { ...ed, body: e.target.value } : ed)}
                      maxLength={2000}
                      rows={4}
                      required
                      className="rounded px-3 py-2 font-body text-sm focus:outline-none resize-y"
                      style={{ background: "var(--bg2)", border: "1px solid var(--gold)", color: "var(--white)" }}
                    />
                    <div className="flex gap-2">
                      <button type="submit" disabled={saving}
                        className="font-title text-xs tracking-widest uppercase px-4 py-1.5 rounded"
                        style={{ background: "var(--gold)", color: "#000", opacity: saving ? 0.5 : 1 }}>
                        {saving ? "Saving…" : "Save"}
                      </button>
                      <button type="button" onClick={() => setEditing(null)}
                        className="font-title text-xs tracking-widest uppercase px-4 py-1.5 rounded"
                        style={{ background: "var(--surface2)", color: "var(--muted)" }}>
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  /* ── Read view ───────────────────────────────────────── */
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-title text-sm" style={{ color: "var(--white)" }}>{item.title}</p>
                        <p className="font-body text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                          {new Date(item.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => setEditing(item)}
                          className="font-title text-[0.6rem] tracking-widest uppercase px-3 py-1 rounded transition-colors"
                          style={{ background: "var(--surface2)", color: "var(--gold)" }}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(item.id)} disabled={deleting === item.id}
                          className="font-title text-[0.6rem] tracking-widest uppercase px-3 py-1 rounded transition-colors"
                          style={{ background: "var(--surface2)", color: "var(--red)", opacity: deleting === item.id ? 0.5 : 1 }}>
                          {deleting === item.id ? "…" : "Delete"}
                        </button>
                      </div>
                    </div>
                    <p className="font-body text-sm whitespace-pre-wrap" style={{ color: "var(--muted)" }}>
                      {item.body}
                    </p>
                  </>
                )}

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
