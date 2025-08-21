'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function OrgHomePage() {
  const orgName = 'Nebula Labs';

  // Header nav — trimmed
  const headerNav = [
    { label: 'Home', href: '/org/home' },
    { label: 'Credentials', href: '/org/credentials' },
    { label: 'Settings', href: '/org/settings' },
    { label: 'Messages', href: '/org/messages' },
  ];

  // Left rail data
  const kpis = [
    { label: 'Credentials Issued', value: '1,284' },
    { label: 'Active Opportunities', value: '12' },
    { label: 'Event Registrations', value: '3,905' },
    { label: 'Verified Talent', value: '7,412' },
  ];

  const recentCreds = [
    { id: 'CRD-1284', user: 'Aria N.', template: 'Hackathon Winner', type: 'Transferable', time: '2h' },
    { id: 'CRD-1283', user: 'Devon P.', template: 'Contributor Verified', type: 'SBT', time: '6h' },
    { id: 'CRD-1282', user: 'Mira O.', template: 'Completion Certificate', type: 'SBT', time: '1d' },
  ];

  // Center reel profiles (mock)
  const profiles = [
    {
      id: 'u1',
      name: 'Zara M.',
      handle: '@zara',
      title: 'Smart Contract Engineer',
      pot: 86,
      pov: 78,
      skills: ['Solidity', 'zk‑SNARKs', 'Viem', 'Security'],
      badges: ['PoT Verified', 'SBT Holder'],
      cover: 'from-fuchsia-500 via-violet-500 to-indigo-500',
      achievements: ['Hackathon Winner — Nebula zk 2025', 'Contributor — Auditor Guild', 'Top 1% Reels • zk Education'],
    },
    {
      id: 'u2',
      name: 'Omar L.',
      handle: '@omar',
      title: 'Frontend + Design Systems',
      pot: 82,
      pov: 81,
      skills: ['Next.js', 'Tailwind', 'AA', 'Design'],
      badges: ['PoT Verified'],
      cover: 'from-emerald-400 via-cyan-400 to-sky-500',
      achievements: ['Shipped AA dashboard v2', 'Design Tokens Pack • OSS', 'Top Mentor — UI/UX'],
    },
    {
      id: 'u3',
      name: 'Nia R.',
      handle: '@nia',
      title: 'Community + Growth',
      pot: 79,
      pov: 84,
      skills: ['Community', 'Growth', 'Ops', 'Content'],
      badges: ['SBT Holder'],
      cover: 'from-amber-400 via-rose-400 to-fuchsia-500',
      achievements: ['Scaled community to 30k', 'Hosted 12 workshops', 'Campaign CTR +22%'],
    },
    {
      id: 'u4',
      name: 'Kenji I.',
      handle: '@kenji',
      title: 'ZK Researcher',
      pot: 88,
      pov: 76,
      skills: ['Circom', 'Halo2', 'Rust', 'Proof Systems'],
      badges: ['PoT Verified'],
      cover: 'from-indigo-400 via-violet-500 to-fuchsia-500',
      achievements: ['Paper: Efficient ZK Aggregation', 'ZK Prize finalist', 'Mentor • ZK Camp'],
    },
  ];

  // Modals
  const [issueOpen, setIssueOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeProfile, setActiveProfile] = useState(null);

  // Reel scroll helpers
  const reelRef = useRef(null);
  const [reelIndex, setReelIndex] = useState(0);

  const scrollReel = (dir) => {
    if (!reelRef.current) return;
    const container = reelRef.current;
    const card = container.querySelector('.reel-card');
    if (!card) return;
    const delta = card.getBoundingClientRect().height + 24; // card height + gap
    container.scrollBy({ top: dir === 'next' ? delta : -delta, behavior: 'smooth' });
  };

  useEffect(() => {
    const container = reelRef.current;
    if (!container) return;
    const onScroll = () => {
      const cards = Array.from(container.querySelectorAll('.reel-card'));
      const { top: ct } = container.getBoundingClientRect();
      let closest = 0;
      let min = Infinity;
      cards.forEach((c, i) => {
        const { top } = c.getBoundingClientRect();
        const dist = Math.abs(top - ct - 8);
        if (dist < min) {
          min = dist;
          closest = i;
        }
      });
      setReelIndex(closest);
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[40rem] rounded-full bg-fuchsia-600/14 blur-[120px]" />
        <div className="absolute top-32 right-0 h-72 w-[35rem] rounded-full bg-indigo-600/12 blur-[120px]" />
        <div className="absolute bottom-8 left-6 h-48 w-48 rounded-full bg-violet-600/10 blur-[90px]" />
      </div>

      {/* Header — big, single-line, scrollable if needed */}
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 overflow-x-auto whitespace-nowrap px-4 py-3 md:px-6">
          {/* Left: Brand + Org chips */}
          <div className="flex items-center gap-3">
            <Link href="/org" className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500" />
              <span className="text-2xl font-semibold tracking-tight">Vibent Orgs</span>
            </Link>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-base text-emerald-200">
              Verified
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-base text-white/80">
              {orgName}
            </span>
          </div>

          {/* Center nav */}
          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="flex items-center gap-3">
              {headerNav.map((n) => (
                <Link
                  key={n.label}
                  href={n.href}
                  className="rounded-md px-3 py-2 text-base text-white/85 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={() => setIssueOpen(true)}
              className="rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2 text-base font-medium shadow transition hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
              aria-haspopup="dialog"
            >
              Issue Credential
            </button>
            <Link
              href="/org/messages"
              className="hidden rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-base hover:bg-white/10 md:inline-flex"
            >
              Messages
            </Link>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Left rail: KPIs + Recent Issuance */}
          <aside className="md:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-lg font-medium">KPIs</div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {kpis.map((k) => (
                  <div key={k.label} className="rounded-xl border border-white/10 bg-black/30 p-3">
                    <div className="text-xs text-white/60">{k.label}</div>
                    <div className="mt-1 text-xl font-semibold">{k.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-lg font-medium">Recent Issuance</div>
                <Link href="/org/credentials" className="text-xs text-white/60 hover:text-white">
                  View all
                </Link>
              </div>
              <ul className="space-y-3 text-sm">
                {recentCreds.map((r) => (
                  <li key={r.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{r.user}</div>
                        <span className="text-white/50">• {r.time}</span>
                      </div>
                      <div className="truncate text-white/70">{r.template}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px]">{r.type}</span>
                      <Link href={`/org/credentials/${r.id}`} className="text-white/80 hover:text-white">
                        Open
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Center: Reel-like Profiles */}
          <section className="md:col-span-6 lg:col-span-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Talent Reels</h2>
              <div className="text-sm text-white/60">
                {reelIndex + 1} / {profiles.length}
              </div>
            </div>

            <div
              ref={reelRef}
              className="mt-4 h-[72vh] overflow-y-auto scroll-smooth snap-y snap-mandatory space-y-6 pr-2"
            >
              {profiles.map((p, idx) => (
                <div key={p.id} className="reel-card snap-start">
                  <article className="relative h-[72vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0C0C12]">
                    {/* Cover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.cover} opacity-20`} />
                    {/* Content */}
                    <div className="relative grid h-full grid-rows-[auto_1fr_auto] p-6">
                      {/* Top: identity */}
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="h-14 w-14 rounded-full bg-[conic-gradient(var(--tw-gradient-stops))] from-fuchsia-500 via-violet-400 to-indigo-500 p-[2px]">
                            <div className="grid h-full w-full place-items-center rounded-full bg-black/80 text-sm font-semibold">
                              {p.name.split(' ')[0]}
                            </div>
                          </div>
                          <span className="absolute -right-1 top-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-black" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="truncate text-lg font-semibold">{p.name}</div>
                            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs">{p.handle}</span>
                            {p.badges.map((b) => (
                              <span
                                key={b}
                                className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-200"
                              >
                                {b}
                              </span>
                            ))}
                          </div>
                          <div className="text-white/70">{p.title}</div>
                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                            {p.skills.map((s) => (
                              <span key={s} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1">
                                #{s}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Rings */}
                        <div className="ml-auto hidden items-center gap-3 sm:flex">
                          <MiniRingSolid label="PoT" value={p.pot} />
                          <MiniRingSolid label="PoV" value={p.pov} />
                        </div>
                      </div>

                      {/* Middle: showcase pane */}
                      <div className="mt-4">
                        <div className="relative h-full rounded-2xl border border-white/10 bg-black/30">
                          <div className="absolute inset-0 grid place-items-center">
                            <div className="rounded-full bg-black/50 px-3 py-1 text-xs backdrop-blur">
                              Reel preview — swipe/scroll to next
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom: actions + achievements */}
                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <ul className="flex flex-wrap items-center gap-3 text-xs">
                          {p.achievements.slice(0, 3).map((a, i) => (
                            <li key={i} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1">
                              {a}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setActiveProfile(p);
                              setProfileOpen(true);
                            }}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                          >
                            View profile
                          </button>
                          <Link
                            href="/org/watchlist"
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                          >
                            Save
                          </Link>
                          <Link
                            href="/org/messages"
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                          >
                            Message
                          </Link>
                          <button
                            onClick={() => setIssueOpen(true)}
                            className="rounded-lg bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-3 py-2 text-sm font-medium"
                          >
                            Issue Credential
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Reel nav controls */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-4">
                      <button
                        onClick={() => scrollReel('prev')}
                        className="pointer-events-auto rounded-full border border-white/10 bg-black/50 p-2 text-white/80 backdrop-blur hover:bg-black/60"
                        aria-label="Previous"
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => scrollReel('next')}
                        className="pointer-events-auto rounded-full border border-white/10 bg-black/50 p-2 text-white/80 backdrop-blur hover:bg-black/60"
                        aria-label="Next"
                      >
                        ›
                      </button>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </section>

          {/* Right: Quick actions + Insights */}
          <aside className="md:col-span-3">
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-medium">Quick actions</h3>
                <div className="mt-4 grid gap-3">
                  <button
                    onClick={() => setIssueOpen(true)}
                    className="w-full rounded-lg bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-3 text-sm font-medium"
                  >
                    Issue Credential
                  </button>
                  <Link
                    href="/org/templates"
                    className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-center text-sm hover:bg-black/30"
                  >
                    Manage templates
                  </Link>
                  <Link
                    href="/org/opportunities"
                    className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-center text-sm hover:bg-black/30"
                  >
                    Manage opportunities
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-medium">Insights (7d)</h3>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <InsightCard title="Issuance" value="+18%" gradient="from-fuchsia-500/30 to-indigo-500/30" />
                  <InsightCard title="Applicants" value="+9%" gradient="from-emerald-500/30 to-cyan-500/30" />
                  <InsightCard title="Engagement" value="+22%" gradient="from-amber-400/30 to-rose-400/30" />
                </div>
                <div className="mt-4 text-right">
                  <Link href="/org/analytics" className="text-sm text-white/80 hover:text-white">
                    Open analytics →
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Modals */}
      <IssueCredentialModal open={issueOpen} onClose={() => setIssueOpen(false)} />
      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} profile={activeProfile} />
    </div>
  );
}

/* ---------- UI helpers ---------- */

function MiniRingSolid({ label, value }) {
  return (
    <div className="text-center">
      <div
        className="relative grid h-12 w-12 place-items-center rounded-full"
        style={{
          background: `conic-gradient(#a78bfa ${value}%, rgba(255,255,255,0.12) ${value}% 100%)`,
        }}
      >
        <div className="absolute inset-1 rounded-full bg-black/80" />
        <div className="relative text-xs font-bold">{value}</div>
      </div>
      <div className="mt-1 text-[10px] text-white/60">{label}</div>
    </div>
  );
}

function InsightCard({ title, value, gradient }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-3">
      <div className="text-xs text-white/60">{title}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
      <div className={`mt-2 h-10 rounded-md bg-gradient-to-r ${gradient}`} />
    </div>
  );
}

/* ---------- Accessible Modal Base ---------- */

function useModalA11y(isOpen, modalRef, initialFocusRef, onClose) {
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.activeElement;
    const handleFocus = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        e.preventDefault();
        initialFocusRef.current?.focus();
      }
    };
    initialFocusRef.current?.focus();
    document.addEventListener('focusin', handleFocus);
    return () => {
      document.removeEventListener('focusin', handleFocus);
      if (prev instanceof HTMLElement) prev.focus();
    };
  }, [isOpen, modalRef, initialFocusRef]);
}

function BaseModal({ open, onClose, id, title, children, maxWidth = 'max-w-4xl' }) {
  const modalRef = useRef(null);
  const closeRef = useRef(null);
  useModalA11y(open, modalRef, closeRef, onClose);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-lg" onClick={onClose} aria-hidden="true" />
      <div
        ref={modalRef}
        className={`relative z-10 w-full ${maxWidth} overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0F] shadow-[0_0_60px_rgba(139,92,246,0.25)]`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
          <h2 id={`${id}-title`} className="text-xl font-semibold">
            {title}
          </h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-md bg-black/50 p-2 text-sm hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
          >
            ✕
          </button>
        </div>
        {/* Body */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Specific Modals ---------- */

function IssueCredentialModal({ open, onClose }) {
  return (
    <BaseModal open={open} onClose={onClose} id="issue" title="Issue Credential" maxWidth="max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: connect to issuance flow
          onClose();
        }}
        className="grid gap-4"
      >
        <label className="text-sm">
          <span className="sr-only">Recipient wallet or DID</span>
          <input
            name="recipient"
            required
            placeholder="0xabc... or did:pkh:..."
            className="w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm placeholder:text-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          />
          <div className="mt-1 text-xs text-white/60">Recipient wallet/DID</div>
        </label>

        <label className="text-sm">
          <span className="sr-only">Template</span>
          <select
            name="template"
            required
            className="w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <option value="">Select template…</option>
            <option value="hackathon-winner">Hackathon Winner (Transferable)</option>
            <option value="contrib-verified">Contributor Verified (SBT)</option>
          </select>
          <div className="mt-1 text-xs text-white/60">Template</div>
        </label>

        <div className="mt-2 flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-md bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
          >
            Issue now
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm hover:bg-black/40"
          >
            Cancel
          </button>
        </div>
      </form>
    </BaseModal>
  );
}

function ProfileModal({ open, onClose, profile }) {
  if (!profile) return null;
  return (
    <BaseModal open={open} onClose={onClose} id="profile" title="Talent Profile" maxWidth="max-w-5xl">
      {/* Solid banner (no transparency) */}
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0F0F15]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(236,72,153,0.18),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_30%_80%,rgba(124,58,237,0.18),transparent_40%)]" />
        <div className="relative p-6">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-[conic-gradient(var(--tw-gradient-stops))] from-fuchsia-500 via-violet-400 to-indigo-500 p-[3px]">
                <div className="grid h-full w-full place-items-center rounded-full bg-black/80 text-lg font-semibold">
                  {profile.name.split(' ')[0]}
                </div>
              </div>
              <span className="absolute -right-1 top-2 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-black" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <div className="truncate text-2xl font-bold">{profile.name}</div>
                <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs">{profile.handle}</span>
                <span className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-200">
                  PoT Verified
                </span>
              </div>
              <div className="text-white/70">{profile.title}</div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                {profile.skills.map((s) => (
                  <span key={s} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1">
                    #{s}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MiniRingSolid label="PoT" value={profile.pot} />
              <MiniRingSolid label="PoV" value={profile.pov} />
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="rounded-xl border border-white/10 bg-[#0F0F15] p-5">
            <div className="mb-2 text-sm font-medium">Highlights</div>
            <ul className="space-y-2 text-sm">
              {profile.achievements.map((a, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                  <span className="text-white/80">{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-[#0F0F15] p-5">
            <div className="mb-2 text-sm font-medium">Credentials</div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-white/10 bg-black/40 p-3">SBT — Contributor Verified</div>
              <div className="rounded-lg border border-white/10 bg-black/40 p-3">PoT — zk Winner</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="rounded-xl border border-white/10 bg-[#0F0F15] p-5">
          <div className="text-sm font-medium">Actions</div>
          <div className="mt-3 grid gap-2">
            <Link
              href={`/org/talent/${profile.id}`}
              className="rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-center text-sm hover:bg-black/40"
            >
              Open profile page
            </Link>
            <Link
              href="/org/watchlist"
              className="rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-center text-sm hover:bg-black/40"
            >
              Save to watchlist
            </Link>
            <Link
              href="/org/messages"
              className="rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-center text-sm hover:bg-black/40"
            >
              Send message
            </Link>
            <Link
              href="/org/credentials/new"
              className="rounded-lg bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2 text-center text-sm font-medium"
            >
              Issue Credential
            </Link>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}