import Link from 'next/link';

export const metadata = {
  title: 'Vibent — Home',
  description:
    'Proof of Vibe meets Proof of Talent. Own your identity, prove your skills, and connect meaningfully.',
};

export default function HomePage() {
  const pov = 72; // Proof of Vibe score (static mock)
  const featuresNav = [
    { label: 'Home', href: '/home', emoji: '🏠' },
    { label: 'Network', href: '/network', emoji: '🕸️' },
    { label: 'Messages', href: '/messages', emoji: '💬' },
    { label: 'Notifications', href: '/notifications', emoji: '🔔' },
    { label: 'Reels', href: '/reels', emoji: '🎞️' },
    { label: 'Games', href: '/game', emoji: '🎮' },
    { label: 'Opportunities', href: '/opportunities', emoji: '💼' },
    { label: 'Communities', href: '/communities', emoji: '🪐' },
    { label: 'Credentials', href: '/credentials', emoji: '🎖️' },
    { label: 'Portfolio', href: '/portfolio', emoji: '📁' },
    { label: 'Settings', href: '/settings', emoji: '⚙️' },
  ];

  const stories = [
    { name: 'You', you: true },
    { name: 'Aria', color: 'from-fuchsia-400 to-indigo-400' },
    { name: 'Kenji', color: 'from-amber-300 to-rose-400' },
    { name: 'Mira', color: 'from-emerald-300 to-cyan-400' },
    { name: 'Leo', color: 'from-violet-400 to-purple-600' },
    { name: 'Zara', color: 'from-sky-300 to-indigo-500' },
    { name: 'Omar', color: 'from-pink-300 to-rose-500' },
    { name: 'Nia', color: 'from-lime-300 to-emerald-500' },
  ];

  const posts = [
    {
      id: 'p1',
      author: 'Aria Nguyen',
      handle: '@arian',
      time: '2h',
      povBadge: 82,
      title: 'Delivered BNB chain bounty — zk attestations live!',
      text:
        'Wrapped a milestone for the core DAO: verifiable PoW attestations for grants using viem + zk-SBTs. Code is modular and rolls into our Skill Graph.',
      skills: ['Solidity', 'Next.js', 'viem', 'zk-SNARKs'],
      mediaType: 'image',
      mediaGradient: 'from-fuchsia-500 via-violet-500 to-indigo-500',
      stats: { likes: 128, comments: 23, shares: 11 },
    },
    {
      id: 'p2',
      author: 'Devon Park',
      handle: '@devon',
      time: '5h',
      povBadge: 77,
      title: 'Micro-reel: Scaling compatibility matching',
      text:
        'Quick explainer on how our compatibility engine blends on-chain graph signals + AI embeddings for collab matching.',
      skills: ['Graph ML', 'Vector DB', 'Rust', 'BNB'],
      mediaType: 'reel',
      mediaGradient: 'from-amber-400 via-rose-400 to-fuchsia-500',
      stats: { likes: 342, comments: 56, shares: 40 },
    },
  ];

  const matches = [
    { name: 'Mina K.', role: 'Product + Growth', match: 93, tag: 'Co‑founder' },
    { name: 'Raj S.', role: 'Solidity + Audits', match: 90, tag: 'Mentor' },
    { name: 'Elio V.', role: 'Design Systems', match: 88, tag: 'Design' },
  ];

  const trendingSkills = [
    { skill: 'Account Abstraction', delta: '+12%' },
    { skill: 'ZK Proof Systems', delta: '+9%' },
    { skill: 'On-chain Credentials', delta: '+7%' },
    { skill: 'Social Graph ML', delta: '+6%' },
  ];

  const gigs = [
    { title: 'Core Protocol Contributor', org: 'Nebula DAO', reward: '3,000 USDT', tag: 'Grant' },
    { title: 'Community Researcher', org: 'Orbit Labs', reward: '1,250 USDT', tag: 'Bounty' },
    { title: 'Reels Creator (Expert Content)', org: 'Vibent', reward: 'Token Rewards', tag: 'Creator' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      {/* Background aurora */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[40rem] rounded-full bg-fuchsia-600/20 blur-[120px]" />
        <div className="absolute top-32 right-0 h-72 w-[35rem] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-72 w-[30rem] rounded-full bg-violet-600/20 blur-[120px]" />
      </div>

      {/* Top Nav */}
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500" />
            <span className="font-semibold tracking-tight">Vibent</span>
          </Link>

          {/* Search */}
          <div className="hidden flex-1 max-w-2xl items-center md:flex">
            <div className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 focus-within:border-white/20">
              <span className="opacity-60">🔎</span>
              <input
                type="search"
                placeholder="Search people, skills, bounties, reels..."
                className="w-full bg-transparent outline-none placeholder:text-white/40"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/create"
              className="hidden rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10 md:block"
            >
              Create Post
            </Link>
            <Link
              href="/game"
              className="rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium shadow-lg shadow-fuchsia-900/20 transition hover:scale-[1.02]"
            >
              Play Game
            </Link>
            <Link
              href="/auth"
              className="hidden rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/70 hover:text-white md:block"
            >
              Switch account
            </Link>
          </div>
        </div>
      </nav>

      {/* Main layout */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-12 md:px-6">
        {/* Left sidebar */}
        <aside className="hidden md:col-span-3 md:block">
          {/* Profile mini */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 p-[2px]">
                  <div className="h-full w-full rounded-full bg-black/60" />
                </div>
                <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 ring-2 ring-black" />
              </div>
              <div>
                <div className="font-medium">You</div>
                <div className="text-xs text-white/60">@you.vibe</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                <div className="text-lg font-semibold">1.2k</div>
                Followers
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                <div className="text-lg font-semibold">318</div>
                Following
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                <div className="text-lg font-semibold">{pov}</div>
                PoV
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="mb-2 px-2 text-xs uppercase tracking-wider text-white/50">
              Navigation
            </div>
            <ul className="space-y-1 text-sm">
              {featuresNav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-3 rounded-lg px-2 py-2 text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    <span className="text-base">{item.emoji}</span>
                    <span>{item.label}</span>
                    <span className="ml-auto hidden text-white/30 group-hover:inline">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick actions */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 text-sm font-medium">Quick Actions</div>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/create" className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 hover:bg-black/40">
                ✨ Create Post
              </Link>
              <Link href="/reels" className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 hover:bg-black/40">
                🎬 Open Reels
              </Link>
              <Link href="/credentials" className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 hover:bg-black/40">
                🪪 Mint Credential
              </Link>
              <Link href="/rewards" className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 hover:bg-black/40">
                💎 Claim Rewards
              </Link>
            </div>
          </div>
        </aside>

        {/* Feed */}
        <section className="md:col-span-6">
          {/* Stories */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-medium">Stories</div>
              <Link href="/reels" className="text-xs text-white/60 hover:text-white">
                View all
              </Link>
            </div>
            <div className="flex snap-x items-stretch gap-4 overflow-x-auto pb-1">
              {stories.map((s, i) => (
                <div key={s.name + i} className="snap-start">
                  {s.you ? (
                    <div className="flex w-20 flex-col items-center gap-2 text-center">
                      <div className="relative h-16 w-16">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-slate-700 to-slate-500 p-[2px]">
                          <div className="h-full w-full rounded-full bg-black/60" />
                        </div>
                        <button
                          type="button"
                          className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-xs shadow-md"
                          aria-label="Add story"
                        >
                          +
                        </button>
                      </div>
                      <span className="truncate text-xs text-white/70">Your Story</span>
                    </div>
                  ) : (
                    <div className="flex w-20 flex-col items-center gap-2">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-tr p-[2px]"
                           style={{ backgroundImage: `linear-gradient(to top right, var(--tw-gradient-stops))` }}
                      >
                        <div className={`h-full w-full rounded-full bg-black/60 ring-2 ring-transparent`} />
                      </div>
                      <span className="truncate text-xs text-white/70">{s.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Composer */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 p-[2px]">
                <div className="h-full w-full rounded-full bg-black/60" />
              </div>
              <div className="flex-1">
                <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/60">
                  Share a vibe, achievement, or reel…
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">🤖 AI Assist</span>
              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">📎 Attach</span>
              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">🌐 Public</span>
              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">🔗 Mint PoW</span>
              <Link
                href="/create"
                className="ml-auto rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2 font-medium"
              >
                Create Post
              </Link>
            </div>
          </div>

          {/* Feed posts */}
          <div className="mt-4 space-y-4">
            {posts.map((p) => (
              <article key={p.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 p-[2px]">
                    <div className="h-full w-full rounded-full bg-black/60" />
                  </div>
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
                    <div className={`mt-3 h-64 w-full rounded-xl bg-gradient-to-br ${p.mediaGradient}`} />
                  ) : (
                    <Link
                      href="/reels"
                      className={`mt-3 relative block h-[480px] w-full overflow-hidden rounded-xl bg-gradient-to-br ${p.mediaGradient}`}
                    >
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/40 text-2xl backdrop-blur">
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
                  <button type="button" className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
                    ❤️ {p.stats.likes}
                  </button>
                  <button type="button" className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
                    💬 {p.stats.comments}
                  </button>
                  <button type="button" className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
                    ↗️ {p.stats.shares}
                  </button>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs">
                      PoV {p.povBadge}
                    </span>
                    <Link
                      href="/credentials"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10"
                    >
                      🪪 Mint Proof
                    </Link>
                    <Link
                      href="/portfolio"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10"
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

        {/* Right sidebar */}
        <aside className="hidden md:col-span-3 lg:block">
          {/* Proof panel */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Your Proof</div>
              <Link href="/credentials" className="text-xs text-white/60 hover:text-white">
                View all
              </Link>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div
                className="relative grid h-28 w-28 place-items-center rounded-full"
                style={{
                  background: `conic-gradient(#a78bfa ${pov}%, rgba(255,255,255,0.1) ${pov}% 100%)`,
                }}
              >
                <div className="absolute inset-2 rounded-full bg-black/60" />
                <div className="relative text-center">
                  <div className="text-xl font-semibold">{pov}</div>
                  <div className="text-[10px] text-white/60">Proof of Vibe</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Level: Trusted
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-400" />
                  Proof of Talent: 6 creds
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-pink-400" />
                  Community Endorsements: 34
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Link href="/credentials" className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center text-sm hover:bg-white/10">
                Mint Skill
              </Link>
              <Link href="/rewards" className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center text-sm hover:bg-white/10">
                Claim Rewards
              </Link>
            </div>
          </div>

          {/* Matches */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 text-sm font-medium">Top Matches</div>
            <div className="space-y-3">
              {matches.map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 p-[2px]">
                    <div className="h-full w-full rounded-full bg-black/60" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="truncate text-sm font-medium">{m.name}</div>
                      <div className="text-xs text-white/60">{m.match}%</div>
                    </div>
                    <div className="truncate text-xs text-white/60">{m.role} • {m.tag}</div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500"
                        style={{ width: `${m.match}%` }}
                      />
                    </div>
                  </div>
                  <Link href="/messages" className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs hover:bg-white/10">
                    Connect
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Trending skills */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 text-sm font-medium">Trending Skills</div>
            <div className="space-y-2 text-sm">
              {trendingSkills.map((t) => (
                <div key={t.skill} className="flex items-center justify-between">
                  <span className="text-white/80">#{t.skill}</span>
                  <span className="rounded-md border border-emerald-400/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-200">
                    {t.delta}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Gigs */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 text-sm font-medium">Bounties & Gigs</div>
            <div className="space-y-3">
              {gigs.map((g) => (
                <div key={g.title} className="rounded-xl border border-white/10 bg-black/30 p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{g.title}</div>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px]">{g.tag}</span>
                  </div>
                  <div className="text-xs text-white/60">{g.org}</div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-white/70">{g.reward}</span>
                    <Link href="/opportunities" className="text-white/80 hover:text-white">View</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/40 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-5 px-4 py-2 text-xs text-white/70">
          <Link href="/home" className="flex flex-col items-center gap-1">
            <span>🏠</span>
            <span>Home</span>
          </Link>
          <Link href="/network" className="flex flex-col items-center gap-1">
            <span>🕸️</span>
            <span>Network</span>
          </Link>
          <Link href="/reels" className="flex flex-col items-center gap-1">
            <span>🎞️</span>
            <span>Reels</span>
          </Link>
          <Link href="/create" className="flex flex-col items-center gap-1">
            <span>➕</span>
            <span>Post</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1">
            <span>👤</span>
            <span>Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}