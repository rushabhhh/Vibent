import Link from 'next/link';

export const metadata = {
  title: 'Vibent for Organizations — Issue Credentials, Host Events, Discover Talent',
  description:
    'Onboard organizations to issue Proof of Talent, host hackathons, and discover verified talent powered by Proof of Vibe.',
};

export default function OrgLandingPage() {
  const stats = [
    { label: 'Credentials issued', value: '10k+' },
    { label: 'Organizations onboarded', value: '350+' },
    { label: 'Avg issuance time', value: '⩽ 30s' },
  ];

  const features = [
    {
      title: 'Verified Org Identity',
      emoji: '✅',
      desc:
        'Mint a soulbound org badge to verify your brand. No fake profiles, no spam.',
    },
    {
      title: 'Issue Proof of Talent',
      emoji: '🎖️',
      desc:
        'Certifications, hackathon prizes, course completions — all as PoT NFTs.',
    },
    {
      title: 'Post Opportunities',
      emoji: '💼',
      desc:
        'Jobs, internships, grants, bounties, community roles — all discoverable.',
    },
    {
      title: 'Host Events',
      emoji: '🏟️',
      desc:
        'Hackathons, workshops, mentorship programs with on‑chain credentialing.',
    },
    {
      title: 'Discover Talent',
      emoji: '🧭',
      desc:
        'Filter users by PoT, PoV, skills, contributions, and endorsements.',
    },
    {
      title: 'Sponsor Challenges',
      emoji: '🚀',
      desc:
        'Meme battles, quizzes, reels — reward authentic engagement with tokens.',
    },
    {
      title: 'Watchlists',
      emoji: '👀',
      desc:
        'Save promising users to follow progress and reach out when ready.',
    },
    {
      title: 'Insights & Analytics',
      emoji: '📊',
      desc:
        'Track credential issuance, event performance, and talent funnels.',
    },
    {
      title: 'API & Integrations',
      emoji: '🔌',
      desc:
        'Simple APIs and exports. Bring your own LMS/HRIS or DAO tools.',
    },
  ];

  const solutions = [
    { title: 'Universities', desc: 'Course completion, research credits, hackathon awards.' },
    { title: 'Companies', desc: 'Internships, job offers, skills verification, partner badges.' },
    { title: 'DAOs', desc: 'Contributor proofs, governance milestones, grant credentials.' },
    { title: 'Hackathon Hosts', desc: 'Finalist/winner credentials, participation SBTs.' },
    { title: 'NGOs', desc: 'Volunteer hours, project impact badges, field certifications.' },
    { title: 'Communities', desc: 'Membership, moderator badges, reputation tiers.' },
  ];

  const templates = [
    { title: 'Completion Certificate', type: 'SBT', tag: 'Course' },
    { title: 'Hackathon Winner', type: 'Transferable', tag: 'Prize' },
    { title: 'Participation', type: 'SBT', tag: 'Event' },
    { title: 'Internship Offer', type: 'Transferable', tag: 'Offer' },
    { title: 'Contributor Verified', type: 'SBT', tag: 'DAO' },
    { title: 'Mentorship Badge', type: 'SBT', tag: 'Program' },
  ];

  const filters = ['PoT 70+', 'PoV 65+', 'Solidity', 'Design', 'ZK', 'BNB'];

  const faq = [
    {
      q: 'Is the org identity an NFT?',
      a: 'Yes. Your org verification is a soulbound badge tied to your wallet/DID.',
    },
    {
      q: 'Which chains are supported?',
      a: 'BNB Chain first, with progressive expansion to other EVM networks.',
    },
    {
      q: 'Are credentials transferable?',
      a: 'You choose per template: soulbound (non‑transferable) or transferable tokens.',
    },
    {
      q: 'Can we bulk‑issue credentials?',
      a: 'Yes. Upload CSV or integrate via API to issue at scale.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[40rem] rounded-full bg-fuchsia-600/20 blur-[120px]" />
        <div className="absolute top-32 right-0 h-72 w-[35rem] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-72 w-[30rem] rounded-full bg-violet-600/20 blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500" />
            <span className="font-semibold tracking-tight">Vibent</span>
          </Link>
          <div className="hidden items-center gap-8 text-sm text-white/80 md:flex">
            {/* <Link href="#features" className="hover:text-white">Features</Link>
            <Link href="#solutions" className="hover:text-white">Solutions</Link>
            <Link href="#templates" className="hover:text-white">Templates</Link>
            <Link href="#how" className="hover:text-white">How it works</Link>
            <Link href="#faq" className="hover:text-white">FAQ</Link> */}
            <Link
              href="/org/auth"
              className="rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium shadow-lg shadow-fuchsia-900/20 transition hover:scale-[1.02]"
            >
              Start free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-7xl px-6 pt-16 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Built for BNB Chain • Org‑grade credentials
          </div>

          <h1 className="bg-gradient-to-br from-white to-white/70 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl md:leading-[1.05]">
            Issue on‑chain credentials.
            <span className="mx-2 bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Discover verified talent.
            </span>
          </h1>

          <p className="mt-5 text-balance text-lg text-white/70 md:text-xl">
            Vibent for Organizations gives you a verified identity, Proof of Talent
            issuance, event hosting, and a PoV‑powered talent explorer — all in one
            decentralized suite.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/org/auth"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 font-medium shadow-lg shadow-fuchsia-900/20 transition hover:scale-[1.02]"
            >
              Start issuing credentials 🚀
            </Link>
            
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-3 items-center gap-4 text-center text-xs text-white/60">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-lg font-semibold text-white">{s.value}</div>
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 pb-12 pt-16 md:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">Everything orgs need</h2>
          <p className="mt-3 text-white/70">
            Verified identity, credentialing, events, talent discovery, and engagement —
            all on-chain and portable.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="relative rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/[0.08]">
              <div className="mb-3 text-2xl">{f.emoji}</div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-white/70">{f.desc}</p>
              <div className="pointer-events-none absolute inset-x-0 -top-px mx-4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
          ))}
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="mx-auto max-w-7xl px-6 pb-12 pt-8 md:pt-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">Built for every organization</h2>
          <p className="mt-3 text-white/70">Choose your path — the flows adapt to your needs.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-lg font-semibold">{s.title}</div>
              <p className="mt-2 text-sm text-white/70">{s.desc}</p>
              <div className="mt-4">
                <Link href="/org/auth" className="text-sm text-white/80 hover:text-white">Get started →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-6 pb-12 pt-8 md:pt-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">How it works for orgs</h2>
          <p className="mt-3 text-white/70">Five steps from zero to verified talent pipeline.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-5">
          {[
            { n: '01', t: 'Verify org', d: 'Connect wallet and mint your org SBT badge.' },
            { n: '02', t: 'Set templates', d: 'Pick or create credential templates for your use case.' },
            { n: '03', t: 'Launch events', d: 'Post jobs, hackathons, workshops, or programs.' },
            { n: '04', t: 'Issue PoT', d: 'Award credentials on completion or victory.' },
            { n: '05', t: 'Discover & hire', d: 'Use PoT + PoV filters to shortlist verified talent.' },
          ].map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-2 text-xs tracking-widest text-white/60">STEP {s.n}</div>
              <div className="text-lg font-semibold">{s.t}</div>
              <p className="mt-2 text-sm text-white/70">{s.d}</p>
              <div className="pointer-events-none absolute inset-x-0 -top-px mx-4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-2xl text-center">
          <Link
            href="/org/auth"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 font-medium shadow-lg shadow-fuchsia-900/20 transition hover:scale-[1.02]"
          >
            Verify organization & start issuing
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-white/60 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500" />
            <span>Vibent — Orgs</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white">For Individuals</Link>
            <Link href="/org/auth" className="hover:text-white">Org Auth</Link>
            <span className="text-white/40">© {new Date().getFullYear()} Vibent</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
