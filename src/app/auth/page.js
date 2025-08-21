'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WagmiProvider, useAccount } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider, ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient();

// Build your wagmi + RainbowKit config
const config = getDefaultConfig({
  appName: 'Vibent',
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || '',
  chains: [bsc, bscTestnet],
  ssr: true,
});

export default function AuthPage() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={darkTheme({
            accentColor: '#7c3aed', // violet-600
            accentColorForeground: 'white',
            borderRadius: 'large',
            overlayBlur: 'small',
          })}
        >
          <PageContent />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function PageContent() {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const [tab, setTab] = useState('login'); // 'login' | 'signup'
  const loginTabRef = useRef(null);
  const signupTabRef = useRef(null);

  useEffect(() => {
    // focus the active tab for keyboard users
    if (tab === 'login') loginTabRef.current?.focus();
    else signupTabRef.current?.focus();
  }, [tab]);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 rounded-md bg-white/5 px-3 py-2 focus:ring-2 focus:ring-indigo-400">
        Skip to content
      </a>

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[40rem] rounded-full bg-fuchsia-600/20 blur-[120px]" />
        <div className="absolute top-32 right-0 h-72 w-[35rem] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-72 w-[30rem] rounded-full bg-violet-600/20 blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/30" role="navigation" aria-label="Primary">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2" aria-label="Vibent home">
            <span className="h-3 w-3 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500" />
            <span className="font-semibold tracking-tight">Vibent</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/home"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Auth layout */}
      <main id="main" className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-12 md:grid-cols-2 md:py-20" role="main" aria-labelledby="auth-heading">
        {/* Left: headline + copy */}
        <div className="relative">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            DeSOC, verified by your work — not your clout
          </span>

          <h1 id="auth-heading" className="mt-3 bg-gradient-to-br from-white to-white/70 bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-6xl md:leading-[1.05]">
            Futuristic access, familiar vibe
            <span className="block bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Log in or create your account with your Web3 wallet
            </span>
          </h1>

          <p className="mt-5 text-lg text-white/70 md:text-xl" id="auth-description">
            One wallet, one identity. Connect to mint Proof of Work and Proof of Talent credentials — accessible and privacy-preserving.
          </p>

          <div className="mt-8 flex items-center gap-4 text-sm text-white/60">
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              Self‑custodial
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              No email needed
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              BNB Chain ready
            </div>
          </div>
        </div>

        {/* Right: card */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-900/20 via-fuchsia-900/20 to-indigo-900/20 p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            {/* Tabs */}
            <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-white/10 bg-black/30 p-1" role="tablist" aria-label="Authentication options">
              <button
                ref={loginTabRef}
                id="tab-login"
                role="tab"
                aria-selected={tab === 'login'}
                aria-controls="tabpanel-auth"
                onClick={() => setTab('login')}
                className={`w-1/2 rounded-full px-4 py-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 ${
                  tab === 'login'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Log in
              </button>
              <button
                ref={signupTabRef}
                id="tab-signup"
                role="tab"
                aria-selected={tab === 'signup'}
                aria-controls="tabpanel-auth"
                onClick={() => setTab('signup')}
                className={`w-1/2 rounded-full px-4 py-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 ${
                  tab === 'signup'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Create account
              </button>
            </div>

            <div id="tabpanel-auth" role="tabpanel" aria-labelledby={tab === 'login' ? 'tab-login' : 'tab-signup'} className="mx-auto mt-6 max-w-md text-center" aria-live="polite">
              <p className="text-white/70">
                {tab === 'login'
                  ? 'Welcome back. Connect your wallet to continue.'
                  : 'New to Vibent? Connect your wallet to create your account.'}
              </p>

              {/* Connect button (custom-styled) */}
              <div className="mt-6">
                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    mounted,
                  }) => {
                    const connected = mounted && account && chain;
                    const buttonLabel = connected ? `Connected: ${account.displayName}` : 'Connect wallet';
                    return (
                      <div
                        className={`inline-flex w-full flex-col items-center justify-center gap-3`}
                        aria-live="polite"
                      >
                        {/* Chain warning */}
                        {connected && chain?.unsupported ? (
                          <button
                            onClick={openChainModal}
                            type="button"
                            className="w-full rounded-xl border border-amber-400/30 bg-amber-500/10 px-6 py-3 text-sm font-medium text-amber-200 transition hover:bg-amber-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400"
                            aria-label="Switch network"
                          >
                            Wrong network — switch chain
                          </button>
                        ) : (
                          <button
                            onClick={ connected ? openAccountModal : openConnectModal }
                            type="button"
                            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-medium shadow-lg shadow-fuchsia-900/20 transition hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
                            aria-pressed={connected}
                            aria-label={connected ? `Account connected: ${account.displayName}` : 'Connect wallet to Vibent'}
                          >
                            <span className="inline-flex items-center justify-center gap-2">
                              {connected ? (
                                <>
                                  <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                                  <span>{buttonLabel}</span>
                                </>
                              ) : (
                                <>
                                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <path d="M12 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5 8v8a7 7 0 007 7v0a7 7 0 007-7V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  <span>{buttonLabel}</span>
                                </>
                              )}
                            </span>
                          </button>
                        )}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>

              {/* Continue CTA */}
              <ContinueSection isConnected={isConnected} address={address} onContinue={() => router.push('/')} />
              {/* Terms */}
              <p className="mt-6 text-xs text-white/50">
                By connecting a wallet you agree to our{' '}
                <a href="#" className="underline hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400">
                  Terms
                </a>{' '}
                and{' '}
                <a href="#" className="underline hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400">
                  Privacy
                </a>
                .
              </p>
            </div>

            {/* Corner glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
          </div>

          {/* Optional illustration on md+ */}
          <div className="pointer-events-none absolute -left-10 -bottom-10 hidden h-28 w-28 rounded-full bg-indigo-500/20 blur-2xl md:block" />
        </div>
      </main>
    </div>
  );
}

function ContinueSection({ isConnected, address, onContinue }) {
  return (
    <div className="mt-5">
      {isConnected ? (
        <div className="space-y-3" role="status" aria-live="polite">
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            Wallet ready: <span className="font-mono">{truncate(address)}</span>
          </div>
          <button
            onClick={onContinue}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
          >
            Continue to Vibent
          </button>
          <p className="text-xs text-white/50">
            Tip: First actions will mint your on-chain profile credentials.
          </p>
        </div>
      ) : (
        <div className="mt-4 text-sm text-white/60" role="note">
          No wallet? Install MetaMask or use WalletConnect on mobile.
        </div>
      )}
    </div>
  );
}

function truncate(addr) {
  if (!addr) return '';
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}