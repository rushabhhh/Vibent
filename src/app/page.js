// pages/index.js
'use client';
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      emoji: "⚒️",
      title: "Proof of Work",
      desc:
        "Turn your contributions, commits, proposals, and tasks into verifiable on-chain proofs.",
    },
    {
      emoji: "🎨",
      title: "Proof of Talent",
      desc:
        "Showcase skills with attestations, endorsements, and soulbound credentials tied to your identity.",
    },
    {
      emoji: "🧩",
      title: "Composability",
      desc:
        "Plug into the wider DeSOC graph. Your data is portable, verifiable, and reusable across apps.",
    },
    {
      emoji: "🛡️",
      title: "Reputation",
      desc:
        "Aggregate trust from actions, not vanity metrics. Weighted by context, timelines, and peers.",
    },
    {
      emoji: "🔐",
      title: "Token‑Gated Access",
      desc:
        "Gate communities, chats, and content based on on-chain credentials and contribution proofs.",
    },
    {
      emoji: "💸",
      title: "Bounties & Grants",
      desc:
        "Fund talent with on-chain payouts linked to verified milestones and proofs of work.",
    },
  ];

  const handleWaitlist = (e) => {
    e.preventDefault();
    const email = e.target.elements.email?.value;
    if (!email) return;
    // Replace with your API call or provider (Formspree, Supabase, etc.)
    console.log("Waitlist signup:", email);
    alert("Thanks! You’re on the Vibent waitlist.");
    e.target.reset();
  };

  return (
    <>
      <Head>
        <title>Vibent — DeSOC for Proof of Work & Talent</title>
        <meta
          name="description"
          content="Vibent is a decentralized social layer for verifiable Proof of Work and Proof of Talent. Own your reputation, build in public, and unlock communities."
        />
      </Head>

      <div className="min-h-screen bg-[#0B0B0F] text-white">
        {/* Background glow */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[40rem] rounded-full bg-fuchsia-600/20 blur-[120px]" />
          <div className="absolute top-32 right-0 h-72 w-[35rem] rounded-full bg-indigo-600/20 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-72 w-[30rem] rounded-full bg-violet-600/20 blur-[120px]" />
        </div>

        {/* Nav */}
        <nav className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500" />
              <span className="font-semibold tracking-tight">Vibent</span>
            </Link>
            <div className="hidden items-center gap-8 text-sm text-white/80 md:flex">
              <Link href="#features" className="hover:text-white">
                Features
              </Link>
              <Link href="#how" className="hover:text-white">
                How it works
              </Link>
              <Link href="#faq" className="hover:text-white">
                FAQ
              </Link>
              <a
                href="https://docs.example.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Docs
              </a>
              <Link
                href="#waitlist"
                className="rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium shadow-lg shadow-fuchsia-900/20 transition hover:scale-[1.02]"
              >
                Join waitlist
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <header className="mx-auto max-w-7xl px-6 pt-16 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              DeSOC, verified by your work — not your clout
            </div>

            <h1 className="bg-gradient-to-br from-white to-white/70 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl md:leading-[1.05]">
              Own your reputation with
              <span className="mx-2 bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Proof of Work
              </span>
              and
              <span className="mx-2 bg-gradient-to-r from-amber-300 to-rose-300 bg-clip-text text-transparent">
                Proof of Talent
              </span>
            </h1>

            <p className="mt-5 text-balance text-lg text-white/70 md:text-xl">
              Vibent is a decentralized social layer that mints your
              contributions, skills, and community impact into verifiable
              on-chain credentials. Build in public. Unlock opportunities.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#waitlist"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 font-medium shadow-lg shadow-fuchsia-900/20 transition hover:scale-[1.02]"
              >
                Get early access
                <span aria-hidden>🚀</span>
              </Link>
              <a
                href="https://demo.example.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-medium text-white/90 transition hover:bg-white/10"
              >
                Watch demo
                <span aria-hidden>▶️</span>
              </a>
            </div>

            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-3 items-center gap-4 text-center text-xs text-white/60">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-lg font-semibold text-white">10k+</div>
                Credentials issued
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-lg font-semibold text-white">120+</div>
                DAOs & communities
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-lg font-semibold text-white">0x</div>
                Your data, your keys
              </div>
            </div>
          </div>
        </header>

        {/* Features */}
        <section id="features" className="mx-auto max-w-7xl px-6 pb-12 pt-16 md:pt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">What you can do with Vibent</h2>
            <p className="mt-3 text-white/70">
              Build a verifiable profile powered by your work, skills, and
              contributions — portable across the DeSOC ecosystem.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/[0.08]"
              >
                <div className="mb-3 text-2xl">{f.emoji}</div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-white/70">{f.desc}</p>
                <div className="pointer-events-none absolute inset-x-0 -top-px mx-4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mx-auto max-w-7xl px-6 pb-12 pt-8 md:pt-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">How it works</h2>
            <p className="mt-3 text-white/70">
              Three simple steps to make your reputation composable.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Connect identity",
                text:
                  "Link your wallet, social handles, and optional ENS/DID. You stay in control.",
              },
              {
                step: "02",
                title: "Prove work & talent",
                text:
                  "Submit contributions or import from GitHub, on-chain actions, hackathons, and attestations.",
              },
              {
                step: "03",
                title: "Mint credentials",
                text:
                  "Issue soulbound or scoped credentials. Unlock token‑gated communities and bounties.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="mb-3 text-xs tracking-widest text-white/60">
                  STEP {s.step}
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/70">{s.text}</p>
                <div className="pointer-events-none absolute inset-x-0 -top-px mx-4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>
            ))}
          </div>
        </section>

        {/* Waitlist */}
        <section
          id="waitlist"
          className="mx-auto max-w-7xl px-6 pb-16 pt-8 md:pt-12"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-900/20 via-fuchsia-900/20 to-indigo-900/20 p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="text-2xl font-semibold md:text-3xl">
                Be first to vibe with Vibent
              </h3>
              <p className="mt-2 text-white/70">
                Join the waitlist for early access, invites, and community drops.
              </p>
              <form
                onSubmit={handleWaitlist}
                className="mx-auto mt-6 flex max-w-md flex-col items-center gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@vibe.xyz"
                  className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/30"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-medium shadow-lg shadow-fuchsia-900/20 transition hover:scale-[1.01] sm:w-auto"
                >
                  Join waitlist
                </button>
              </form>
            </div>
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-7xl px-6 pb-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold md:text-3xl">FAQ</h2>
            <div className="mt-6 space-y-4">
              <details className="group rounded-xl border border-white/10 bg-white/5 p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between">
                  <span className="font-medium">Is my data self-sovereign?</span>
                  <span className="text-white/50 group-open:rotate-180 transition">⌄</span>
                </summary>
                <p className="mt-3 text-sm text-white/70">
                  Yes. Your credentials are tied to your wallet/DID. You choose what to
                  reveal and where to port it.
                </p>
              </details>
              <details className="group rounded-xl border border-white/10 bg-white/5 p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between">
                  <span className="font-medium">Which chains are supported?</span>
                  <span className="text-white/50 group-open:rotate-180 transition">⌄</span>
                </summary>
                <p className="mt-3 text-sm text-white/70">
                  We start with EVM chains and expand progressively. Multi‑chain reads
                  and attestations are planned.
                </p>
              </details>
              <details className="group rounded-xl border border-white/10 bg-white/5 p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between">
                  <span className="font-medium">Are credentials NFTs?</span>
                  <span className="text-white/50 group-open:rotate-180 transition">⌄</span>
                </summary>
                <p className="mt-3 text-sm text-white/70">
                  They can be soulbound (non‑transferable) or scoped tokens based on
                  context. Both are verifiable on-chain.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/20">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-white/60 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500" />
              <span>Vibent — DeSOC for Proof of Work & Talent</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white">
                Twitter
              </a>
              <a href="#" className="hover:text-white">
                Discord
              </a>
              <a href="#" className="hover:text-white">
                GitHub
              </a>
              <span className="text-white/40">© {new Date().getFullYear()} Vibent</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}