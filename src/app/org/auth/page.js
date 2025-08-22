'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WagmiProvider, useAccount, useChainId } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider, ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'Vibent Orgs',
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ,
  chains: [bsc, bscTestnet],
  ssr: true,
});

export default function OrgAuthPage() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={darkTheme({
            accentColor: '#7c3aed', // violet
            accentColorForeground: '#ffffff',
            borderRadius: 'large',
            overlayBlur: 'small',
          })}
        >
          <Content />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function Content() {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const isTestnet = chainId === bscTestnet.id;

  const [mode, setMode] = useState('new'); // 'new' | 'existing'
  const [role, setRole] = useState('admin'); // 'admin' | 'issuer' | 'viewer'
  const [orgType, setOrgType] = useState('Company'); // Company | University | DAO | Hackathon | NGO

  const steps = [
    { key: 'connect', title: 'Connect wallet (BNB)', done: isConnected },
    { key: 'verify', title: 'Verify organization (mint SBT)', done: false },
    { key: 'roles', title: 'Set roles & permissions', done: false },
    { key: 'templates', title: 'Add credential templates', done: false },
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
          <Link href="/org" className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500" />
            <span className="font-semibold tracking-tight">Vibent Orgs</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/org/home"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
            >
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2 md:py-16">
        {/* Left: Holographic Org Badge Preview */}
        <section className="relative">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            BNB Chain • Org‑grade verification
          </span>

          <h1 className="mt-3 bg-gradient-to-br from-white to-white/70 bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-6xl md:leading-[1.05]">
            Verify your organization
            <span className="block bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              and start issuing credentials
            </span>
          </h1>

          <p className="mt-5 text-lg text-white/70 md:text-xl">
            Soulbound org badge, role‑based permissions, and one‑click credential
            templates. Multi‑sig friendly and testnet‑ready.
          </p>

          {/* Unique holographic badge preview */}
          <div className="mt-8">
            <HoloBadge orgType={orgType} isTestnet={isTestnet} />
            {/* Org type selector */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              {['Company', 'University', 'DAO', 'Hackathon', 'NGO'].map((t) => (
                <button
                  key={t}
                  onClick={() => setOrgType(t)}
                  className={`rounded-full border px-3 py-1.5 transition ${
                    orgType === t
                      ? 'border-white/20 bg-white/10 text-white'
                      : 'border-white/10 bg-white/5 text-white/70 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Trust chips */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/70">
            <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">🪪 Soulbound Org SBT</span>
            <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">🔐 Multi‑sig friendly</span>
            <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">🧩 APIs & exports</span>
          </div>
        </section>

        {/* Right: Auth + Setup Card */}
        <section className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-900/20 via-fuchsia-900/20 to-indigo-900/20 p-6 sm:p-8">
            {/* Mode tabs */}
            <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-white/10 bg-black/30 p-1">
              <button
                onClick={() => setMode('new')}
                className={`w-1/2 rounded-full px-4 py-2 text-sm transition ${
                  mode === 'new' ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                New organization
              </button>
              <button
                onClick={() => setMode('existing')}
                className={`w-1/2 rounded-full px-4 py-2 text-sm transition ${
                  mode === 'existing' ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                Existing organization
              </button>
            </div>

            <div className="mx-auto mt-6 max-w-md text-center">
              <p className="text-white/70">
                {mode === 'new'
                  ? 'Connect a wallet to mint your organization’s SBT and unlock credential issuance.'
                  : 'Connect a wallet that’s already authorized for your organization.'}
              </p>

              {/* Connect + Chain handling */}
              <div className="mt-6">
                <ConnectButton.Custom>
                  {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
                    const connected = mounted && account && chain;
                    return (
                      <div className="inline-flex w-full flex-col items-center gap-3" aria-live="polite">
                        {!connected ? (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-medium shadow-lg shadow-fuchsia-900/20 transition hover:scale-[1.01]"
                          >
                            Connect wallet
                          </button>
                        ) : chain?.unsupported ? (
                          <button
                            onClick={openChainModal}
                            type="button"
                            className="w-full rounded-xl border border-amber-400/30 bg-amber-500/10 px-6 py-3 text-sm font-medium text-amber-200 transition hover:bg-amber-500/20"
                          >
                            Wrong network — switch chain
                          </button>
                        ) : (
                          <div className="flex w-full flex-col gap-2">
                            <button
                              onClick={openAccountModal}
                              type="button"
                              className="w-full rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
                            >
                              {`Connected: ${account.displayName}`} • {chain?.name}
                            </button>
                            {isTestnet && (
                              <div className="rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-200">
                                Testnet mode detected (BNB Testnet). Great for sandboxing.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>

              {/* Role selector */}
              <div className="mt-6">
                <div className="text-left text-sm font-medium">Select your role</div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  {[
                    { k: 'admin', label: 'Admin', hint: 'Full control' },
                    { k: 'issuer', label: 'Issuer', hint: 'Issue PoT' },
                    { k: 'viewer', label: 'Viewer', hint: 'Read only' },
                  ].map((r) => (
                    <button
                      key={r.k}
                      onClick={() => setRole(r.k)}
                      className={`rounded-xl border px-3 py-2 ${
                        role === r.k ? 'border-white/20 bg-white/10' : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="font-medium">{r.label}</div>
                      <div className="text-white/60">{r.hint}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Checklist */}
              <div className="mt-6 text-left">
                <div className="text-sm font-medium">Verification checklist</div>
                <ul className="mt-3 space-y-2 text-sm">
                  {steps.map((s) => (
                    <li key={s.key} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${s.done ? 'bg-emerald-400' : 'bg-white/30'}`} />
                      <span className={s.done ? 'text-white' : 'text-white/70'}>{s.title}</span>
                      {s.done && <span className="ml-auto text-xs text-emerald-300">Done</span>}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-6 space-y-2">
                <button
                  disabled={!isConnected}
                  onClick={() => router.push('/org/console')}
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-medium shadow-lg shadow-fuchsia-900/20 transition hover:scale-[1.01] disabled:opacity-60"
                >
                  Continue to Org Console
                </button>
                <div className="text-xs text-white/50">
                  Tip: You can sandbox on BNB Testnet, then switch to BNB Mainnet anytime.
                </div>
              </div>

              {/* Terms */}
              <p className="mt-6 text-xs text-white/50">
                By connecting a wallet you agree to our{' '}
                <a href="#" className="underline hover:text-white">Terms</a> and{' '}
                <a href="#" className="underline hover:text-white">Privacy</a>.
              </p>
            </div>

            {/* Corner glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
          </div>

          {/* Safety ribbon */}
          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/70">
            <div className="flex items-center gap-2">
              <span>🛡️</span>
              <span>Multi‑sig tip: Connect with your Safe signer; you can add other signers later in Roles.</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function HoloBadge({ orgType, isTestnet }) {
  // Holographic, animated badge preview
  return (
    <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-5">
      <div className="relative grid place-items-center rounded-2xl border border-white/10 bg-[#0b0b0f]/60 p-6">
        {/* Holo ring */}
        <div className="pointer-events-none absolute -inset-1 rounded-3xl opacity-60 [background:conic-gradient(from_0deg,rgba(236,72,153,.35),rgba(129,140,248,.35),rgba(99,102,241,.35),rgba(236,72,153,.35))] blur-xl" />
        {/* Core seal */}
        <div className="relative flex flex-col items-center">
          <div className="relative">
            <div className="h-28 w-28 rounded-full bg-[conic-gradient(var(--tw-gradient-stops))] from-fuchsia-500 via-violet-400 to-indigo-500 p-[2px]">
              <div className="grid h-full w-full place-items-center rounded-full bg-black/70">
                <div className="text-lg font-semibold">Verified Org</div>
                <div className="text-[10px] text-white/60">{orgType}</div>
              </div>
            </div>
            {/* Orbit dots */}
            <span className="absolute -right-1 top-1 h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="absolute -left-1 bottom-1 h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
          </div>
          <div className="mt-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            Soulbound on {isTestnet ? 'BNB Testnet' : 'BNB Mainnet'}
          </div>
        </div>
      </div>
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>
  );
}