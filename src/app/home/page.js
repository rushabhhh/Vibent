
import Link from 'next/link';

export const metadata = {
  title: 'Vibent — Home',
  description:
    'Proof of Vibe meets Proof of Talent. Own your identity, prove your skills, and connect meaningfully.',
};

export default function HomePage() {
  const pov = 72;
  const pow = 64;

  // Left nav
  const featuresNav = [
    { label: 'Home', href: '/home', emoji: '🏠' },
    { label: 'Messages', href: '/messages', emoji: '💬' },
    { label: 'Reels', href: '/reels', emoji: '🎞' },
    { label: 'Games', href: '/game', emoji: '🎮' },
    { label: 'Settings', href: '/settings', emoji: '⚙' },
  ];

  // Stories with avatars
  const stories = [
    { name: 'You', you: true, img: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Aria', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { name: 'Kenji', img: 'https://randomuser.me/api/portraits/men/31.jpg' },
    { name: 'Mira', img: 'https://randomuser.me/api/portraits/women/12.jpg' },
    { name: 'Leo', img: 'https://randomuser.me/api/portraits/men/15.jpg' },
    { name: 'Zara', img: 'https://randomuser.me/api/portraits/women/33.jpg' },
    { name: 'Omar', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { name: 'Nia', img: 'https://randomuser.me/api/portraits/women/22.jpg' },
  ];

  // Posts with author avatars + media images
  const posts = [
    {
      id: 'p1',
      author: 'Aria Nguyen',
      authorImg: 'https://randomuser.me/api/portraits/women/68.jpg',
      handle: '@arian',
      time: '2h',
      povBadge: 82,
      title: 'Delivered BNB chain bounty — zk attestations live!',
      text:
        'Wrapped a milestone for the core DAO: verifiable PoW attestations for grants using viem + zk-SBTs. Code is modular and rolls into our Skill Graph.',
      skills: ['Solidity', 'Next.js', 'viem', 'zk-SNARKs'],
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1682687220591-fbd0a42d7ebd?w=1200&q=80&auto=format&fit=crop',
      stats: { likes: 128, comments: 23, shares: 11 },
    },
    {
      id: 'p2',
      author: 'Devon Park',
      authorImg: 'https://randomuser.me/api/portraits/men/35.jpg',
      handle: '@devon',
      time: '5h',
      povBadge: 77,
      title: 'Micro-reel: Scaling compatibility matching',
      text:
        'Quick explainer on how our compatibility engine blends on-chain graph signals + AI embeddings for collab matching.',
      skills: ['Graph ML', 'Vector DB', 'Rust', 'BNB'],
      mediaType: 'reel',
      mediaUrl: 'https://images.unsplash.com/photo-1707343846297-ff94c7a1125f?w=1200&q=80&auto=format&fit=crop',
      stats: { likes: 342, comments: 56, shares: 40 },
    },
  ];

  return (
    <div className="h-screen bg-[#0B0B0F] text-white overflow-hidden">
      {/* Global background — aurora + subtle noise */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="aurora absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[40rem] rounded-full bg-fuchsia-600/20 blur-[120px]" />
        <div className="aurora absolute top-32 right-0 h-72 w-[35rem] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="aurora absolute bottom-0 left-0 h-72 w-[30rem] rounded-full bg-violet-600/20 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-soft-light"
          style={{
            backgroundImage:
              'url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27 viewBox=%270 0 120 120%27><filter id=%27n%27><feTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/></filter><rect width=%27120%27 height=%27120%27 filter=%27url(%23n)%27 opacity=%270.6%27/></svg>")',
          }}
        />
      </div>

      {/* Top Nav */}
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="group flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 shadow-[0_0_18px_rgba(168,85,247,.45)] transition-transform group-hover:scale-110" />
            <span className="font-semibold tracking-tight">Vibent</span>
          </Link>

          {/* Search */}
          <div className="hidden flex-1 max-w-2xl items-center md:flex">
            <div className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,.03)] focus-within:border-white/20">
              <span className="opacity-60">🔎</span>
              <input
                type="search"
                placeholder="Search people, skills, reels..."
                className="w-full bg-transparent outline-none placeholder:text-white/40"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/create"
              className="hidden rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 shadow-[0_8px_30px_rgba(0,0,0,.25)] transition hover:bg-white/10 md:block"
            >
              Create Post
            </Link>
            <Link
              href="/game"
              className="rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium shadow-lg shadow-fuchsia-900/30 transition hover:scale-[1.02] active:scale-[0.99]"
            >
              Play Game
            </Link>
          </div>
        </div>
      </nav>

      {/* Main layout: left & right fixed; center scrolls */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:grid-cols-12 md:px-6 h-[calc(100vh-64px)]">
        {/* Left sidebar (sticky, non-scrolling) */}
        <aside className="hidden md:col-span-3 md:block sticky top-4 self-start h-[calc(100vh-80px)] overflow-hidden">
          {/* Profile mini */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_8px_30px_rgba(0,0,0,.25)] fade-in">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="You"
                  className="h-12 w-12 rounded-full object-cover border border-white/10"
                />
                <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 ring-2 ring-black pulse-ring" />
              </div>
              <div>
                <div className="font-medium">You</div>
                <div className="text-xs text-white/60">@you.vibe</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl border border-white/10 bg-white/5 p-2 float-slow">
                <div className="text-lg font-semibold">1.2k</div>
                Followers
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-2 float-slow delay-150">
                <div className="text-lg font-semibold">318</div>
                Following
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-2 float-slow delay-300">
                <div className="text-lg font-semibold">{pov}</div>
                PoV
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-3 shadow-[0_8px_30px_rgba(0,0,0,.25)] fade-in delay-120">
            <div className="mb-2 px-2 text-xs uppercase tracking-wider text-white/50">
              Navigation
            </div>
            <ul className="space-y-1 text-sm">
              {featuresNav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-3 rounded-xl px-2 py-2 text-white/80 ring-1 ring-transparent transition hover:bg-white/5 hover:text-white hover:ring-white/10"
                  >
                    <span className="text-base">{item.emoji}</span>
                    <span>{item.label}</span>
                    <span className="ml-auto hidden text-white/30 group-hover:inline">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Feed (ONLY this column scrolls) */}
        <section className="md:col-span-5 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar pb-24">
          {/* Stories (horizontal, invisible scrollbar) */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_8px_30px_rgba(0,0,0,.25)] fade-in">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-medium">Stories</div>
              <Link href="/reels" className="text-xs text-white/60 transition hover:text-white">
                View all
              </Link>
            </div>
            <div className="flex snap-x items-stretch gap-4 overflow-x-auto no-scrollbar pb-1">
              {stories.map((s, i) => (
                <div key={s.name + i} className="snap-start">
                  <div className="flex w-20 flex-col items-center gap-2 text-center">
                    <div className="relative h-16 w-16">
                      <img
                        src={s.img}
                        alt={s.name}
                        className="h-16 w-16 rounded-full object-cover ring-2 ring-fuchsia-500/40"
                      />
                      {s.you && (
                        <button
                          type="button"
                          className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-xs shadow-md transition hover:scale-105"
                          aria-label="Add story"
                        >
                          +
                        </button>
                      )}
                    </div>
                    <span className="truncate text-xs text-white/70">{s.you ? 'Your Story' : s.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feed posts */}
          <div className="mt-4 space-y-4">
            {posts.map((p, i) => (
              <article
                key={p.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_8px_30px_rgba(0,0,0,.25)] transition hover:border-white/15 fade-in"
                style={{ animationDelay: `${100 + i * 120}ms` }}
              >
                {/* Header */}
                <div className="flex items-start gap-3">
                  <img
                    src={p.authorImg}
                    alt={p.author}
                    className="h-11 w-11 shrink-0 rounded-full object-cover border border-white/10"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="truncate font-medium">{p.author}</div>
                      <span className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] text-emerald-200">
                        SBT Verified
                      </span>
                      <span className="ml-auto text-xs text-white/50">{p.time}</span>
                    </div>
                    <div className="text-xs text-white/60">{p.handle}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-3">
                  <div className="text-sm font-medium">{p.title}</div>
                  <p className="mt-1 text-sm text-white/70">{p.text}</p>

                  {/* Skills */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.skills.map((s) => (
                      <span key={s} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/80">
                        #{s}
                      </span>
                    ))}
                  </div>

                  {/* Media */}
                  {p.mediaType === 'image' ? (
                    <img
                      src={p.mediaUrl}
                      alt="Post media"
                      className="mt-3 h-64 w-full rounded-2xl object-cover float-slow"
                      loading="lazy"
                    />
                  ) : (
                    <Link href="/reels" className="mt-3 relative block h-[480px] w-full overflow-hidden rounded-2xl">
                      <img
                        src={p.mediaUrl}
                        alt="Reel preview"
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 grid place-items-center bg-black/30">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/50 text-2xl backdrop-blur">
                          ▶
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/30 p-3 text-xs backdrop-blur">
                        <span className="text-white/80">Swipe • Reels mode</span>
                        <span className="rounded-md border border-white/15 bg-white/10 px-2 py-1">Open Reels</span>
                      </div>
                    </Link>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/70">
                  <button type="button" className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10">
                    ❤ {p.stats.likes}
                  </button>
                  <button type="button" className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10">
                    💬 {p.stats.comments}
                  </button>
                  <button type="button" className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10">
                    ↗ {p.stats.shares}
                  </button>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs">
                      PoV {p.povBadge}
                    </span>
                    <Link
                      href="/credentials"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 transition hover:bg-white/10"
                    >
                      🪪 Mint Proof
                    </Link>
                    <Link
                      href="/portfolio"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 transition hover:bg-white/10"
                    >
                      ➕ Add to Portfolio
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* End of feed */}
          <div className="mt-6 text-center text-xs text-white/40">
            You’re all caught up • Come back for more vibes ✦
          </div>
        </section>

        {/* Right sidebar (sticky, non-scrolling) — kept only "Your Proof" */}
        <aside className="hidden md:col-span-4 lg:block sticky top-4 self-start h-[calc(100vh-80px)] overflow-hidden">
          {/* Proof panel */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_8px_30px_rgba(0,0,0,.25)] fade-in">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Your Proof</div>
              <Link href="/credentials" className="text-xs text-white/60 transition hover:text-white">
                View all
              </Link>
            </div>

            {/* Stacked narrow cards */}
            <div className="mt-5 space-y-4">
              {/* Proof of Vibe */}
              <div className="mx-auto w-full max-w-sm">
                <div className="group relative overflow-hidden rounded-2xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/10 via-violet-500/10 to-indigo-500/10 p-4 shadow-[0_12px_40px_rgba(168,85,247,.15)]">
                  <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-fuchsia-600/20 blur-3xl" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px]">✨</span>
                      Proof of Vibe
                    </div>
                    <span className="rounded-md border border-white/10 bg-white/10 px-2 py-0.5 text-[10px]">
                      Trusted
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <div
                      className="relative grid h-24 w-24 place-items-center rounded-full"
                      style={{
                        background: `conic-gradient(#a78bfa ${pov}%, rgba(255,255,255,0.12) ${pov}% 100%)`,
                      }}
                      aria-label={`Proof of Vibe ${pov}`}
                    >
                      <div className="absolute inset-2 rounded-full bg-black/60 shadow-inner shadow-black/40" />
                      <div className="relative text-center">
                        <div className="text-lg font-semibold">{pov}</div>
                        <div className="text-[10px] text-white/60">Score</div>
                      </div>
                    </div>
                    <div className="flex-1 text-xs text-white/70">
                      Community rapport, endorsements, and positive interactions boost your vibe score.
                      <div className="mt-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span>Endorsements: 34</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                        <span>Reputation Level: Trusted</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link href="/credentials" className="flex-1 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-center text-xs transition hover:bg-white/15">
                      Mint Social Proof
                    </Link>
                    <Link href="/rewards" className="flex-1 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-center text-xs transition hover:bg-white/15">
                      Claim Rewards
                    </Link>
                  </div>
                </div>
              </div>

              {/* Proof of Work */}
              <div className="mx-auto w-full max-w-sm">
                <div className="group relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-teal-500/10 p-4 shadow-[0_12px_40px_rgba(16,185,129,.15)]">
                  <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-emerald-600/20 blur-3xl" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px]">⚙</span>
                      Proof of Work
                    </div>
                    <span className="rounded-md border border-white/10 bg-white/10 px-2 py-0.5 text-[10px]">
                      Building
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <div
                      className="relative grid h-24 w-24 place-items-center rounded-full"
                      style={{
                        background: `conic-gradient(#34d399 ${pow}%, rgba(255,255,255,0.12) ${pow}% 100%)`,
                      }}
                      aria-label={`Proof of Work ${pow}`}
                    >
                      <div className="absolute inset-2 rounded-full bg-black/60 shadow-inner shadow-black/40" />
                      <div className="relative text-center">
                        <div className="text-lg font-semibold">{pow}</div>
                        <div className="text-[10px] text-white/60">Score</div>
                      </div>
                    </div>
                    <div className="flex-1 text-xs text-white/70">
                      On-chain credentials, commits, and shipped bounties raise your PoW.
                      <div className="mt-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                        <span>Skills Verified: 6</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        <span>Bounties Completed: 3</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link href="/credentials" className="flex-1 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-center text-xs transition hover:bg-white/15">
                      Mint Skill
                    </Link>
                    <Link href="/portfolio" className="flex-1 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-center text-xs transition hover:bg-white/15">
                      Add to Portfolio
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Removed: Matches, Trending Skills, Bounties & Gigs */}
        </aside>
      </main>

      {/* Mobile bottom nav — 5 items */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/50 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-5 px-4 py-2 text-xs text-white/70">
          <Link href="/home" className="flex flex-col items-center gap-1 active:scale-95">
            <span>🏠</span>
            <span>Home</span>
          </Link>
          <Link href="/messages" className="flex flex-col items-center gap-1 active:scale-95">
            <span>💬</span>
            <span>Messages</span>
          </Link>
          <Link href="/reels" className="flex flex-col items-center gap-1 active:scale-95">
            <span>🎞</span>
            <span>Reels</span>
          </Link>
          <Link href="/game" className="flex flex-col items-center gap-1 active:scale-95">
            <span>🎮</span>
            <span>Games</span>
          </Link>
          <Link href="/settings" className="flex flex-col items-center gap-1 active:scale-95">
            <span>⚙</span>
            <span>Settings</span>
          </Link>
        </div>
      </nav>

      {/* Plain <style> (NOT styled-jsx) — animations & invisible scrollbars */}
      <style>{`
        /* Invisible scrollbar */
        .no-scrollbar::-webkit-scrollbar { width: 0; height: 0; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Aurora drift */
        @keyframes auroraDrift {
          0% { transform: translate3d(0,0,0) scale(1); opacity: .7; }
          50% { transform: translate3d(10px,-6px,0) scale(1.05); opacity: .9; }
          100% { transform: translate3d(0,0,0) scale(1); opacity: .7; }
        }
        .aurora { animation: auroraDrift 10s ease-in-out infinite; }

        /* Card float */
        @keyframes floatSlow {
          0% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }
        .float-slow { animation: floatSlow 6s ease-in-out infinite; }
        .delay-150 { animation-delay: 150ms; }
        .delay-300 { animation-delay: 300ms; }

        /* Fade-in */
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeInUp .5s ease forwards; opacity: 0; }
        .delay-120 { animation-delay: 120ms; }

        /* Pulse ring for online dot */
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.45); }
          70% { box-shadow: 0 0 0 8px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }
        .pulse-ring { animation: pulseRing 2s infinite; }
      `}</style>
    </div>
  );
}

