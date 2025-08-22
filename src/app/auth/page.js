'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WagmiProvider, useAccount, useSignMessage } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider, ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'Vibent',
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || '',
  chains: [bscTestnet],
  ssr: true,
});

export default function AuthPage() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={darkTheme({
            accentColor: '#7c3aed',
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
  const { signMessageAsync } = useSignMessage();
  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    profile_picker: '',
    bio: '',
    dob: '',
    binance_id: '',
    social_links: '',
    interests: '',
  });

  // New: auto-sign flow state guards
  const [pendingAutoSign, setPendingAutoSign] = useState(false);
  const isSigningRef = useRef(false);

  useEffect(() => {
    if (isNew) setShowProfileForm(true);
  }, [isNew]);

  // when user clicked "Connect" and connection completes, auto-run auth to sign nonce
  useEffect(() => {
    if (isConnected && pendingAutoSign) {
      setPendingAutoSign(false);
      // avoid double-sign
      if (!isSigningRef.current) {
        handleAuth();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, pendingAutoSign]);

  async function handleAuth() {
    if (isSigningRef.current) return;
    if (!isConnected || !address) {
      alert('Connect a wallet first');
      return;
    }

    try {
      isSigningRef.current = true;
      setLoading(true);

      // 1) get nonce/message from backend
      const res1 = await fetch(`/api/auth/nonce?address=${address}`, { credentials: 'include' });
      const data1 = await res1.json();
      if (!res1.ok) {
        alert(data1?.error || 'Could not get nonce');
        return;
      }
      const message = data1.message;

      // 2) sign (gasless)
      let signature;
      try {
        signature = await signMessageAsync({ message });
      } catch (err) {
        // user rejected or signing failed
        console.error('sign failed', err);
        alert('Signing cancelled or failed');
        return;
      }

      // 3) verify on backend
      const res2 = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ address, signature }),
      });
      const data2 = await res2.json();
      if (!res2.ok) {
        alert(data2?.error || 'Login failed');
        return;
      }

      // if new -> prompt for profile completion
      if (data2.isNew) {
        setIsNew(true);
        return;
      }

      // existing user -> redirect (session cookie set)
      router.push('/home');
    } catch (err) {
      console.error(err);
      alert('Authentication error');
    } finally {
      isSigningRef.current = false;
      setLoading(false);
    }
  }

  async function submitProfile(e) {
    e.preventDefault();
    try {
      setLoading(true);
      // prepare payload: parse social_links and interests
      const payload = {
        name: profile.name,
        username: profile.username,
        profile_picker: profile.profile_picker,
        bio: profile.bio,
        dob: profile.dob || null,
        binance_id: profile.binance_id || null,
        social_links: profile.social_links ? profile.social_links.split(',').map(s => s.trim()) : null,
        interests: profile.interests ? profile.interests.split(',').map(s => s.trim()) : null,
      };

      const res = await fetch('/api/auth/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data?.error || 'Could not save profile');
        setLoading(false);
        return;
      }

      // profile saved — go to dashboard
      setShowProfileForm(false);
      setIsNew(false);
      router.push('/org/home');
    } catch (err) {
      console.error(err);
      alert('Profile save error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
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

            <div className="mx-auto mt-6 max-w-md text-center" aria-live="polite">
              <p className="text-white/70">
                {'Welcome To Vibent. Connect your wallet to continue.' }
              </p>

              {/* Connect button (updated) */}
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
                    // When not connected: clicking will open connect modal and mark pendingAutoSign,
                    // so after successful connection the effect will call handleAuth and trigger signing.
                    const onClickWhenDisconnected = () => {
                      setPendingAutoSign(true);
                      openConnectModal?.();
                    };

                    return (
                      <div className={`inline-flex w-full flex-col items-center justify-center gap-3`} aria-live="polite">
                        {connected && chain?.unsupported ? (
                          <button onClick={openChainModal} type="button" className="w-full rounded-xl border border-amber-400/30 bg-amber-500/10 px-6 py-3 text-sm font-medium text-amber-200">Wrong network — switch chain</button>
                        ) : (
                          <button
                            onClick={ connected ? handleAuth : onClickWhenDisconnected }
                            type="button"
                            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-medium shadow-lg"
                            aria-disabled={loading}
                          >
                            {connected ? `Continue with ${account.displayName}` : 'Connect wallet'}
                          </button>
                        )}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>

              {/* loading / hints */}
              <div className="mt-5">
                {loading && <div className="text-sm text-white/60">Processing…</div>}
              </div>

              {/* If already connected but user wants to explicitly continue for normal flow */}
              {!isConnected && <div className="mt-4 text-sm text-white/60">No wallet? Install MetaMask or use WalletConnect on mobile.</div>}
            </div>

            {/* Corner glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
          </div>
        </div>
      </main>

      {/* Profile form modal (shown when new user) */}
      {showProfileForm && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* dark blurred backdrop */}
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={() => {}} />

          <form onSubmit={submitProfile} className="relative z-10 w-full max-w-lg rounded-xl border border-white/6 bg-black/80 backdrop-blur-md p-6 shadow-2xl">
            {/* loading overlay */}
            {loading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-xl bg-black/60 backdrop-blur-sm">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent border-white/40" />
                <div className="mt-3 text-sm font-medium text-white/85">Saving profile…</div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Complete your profile</h2>
              <button
                type="button"
                onClick={() => setShowProfileForm(false)}
                aria-label="Close"
                className="rounded-full p-1 text-white/70 hover:bg-white/5 focus:outline-none"
                disabled={loading}
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid gap-3">
              <label className="text-sm text-white/90">
                Name
                <input
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={loading}
                  className="mt-1 w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>

              <label className="text-sm text-white/90">
                Username
                <input
                  required
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  disabled={loading}
                  className="mt-1 w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>

              <label className="text-sm text-white/90">
                Profile picker (choose)
                <select
                  required
                  value={profile.profile_picker}
                  onChange={(e) => setProfile({ ...profile, profile_picker: e.target.value })}
                  disabled={loading}
                  className="mt-1 w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select…</option>
                  <option value="avatar-1">Avatar 1</option>
                  <option value="avatar-2">Avatar 2</option>
                  <option value="upload">Upload (coming soon)</option>
                </select>
              </label>

              <label className="text-sm text-white/90">
                Bio
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  disabled={loading}
                  className="mt-1 w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                />
              </label>

              <label className="text-sm text-white/90">
                DOB
                <input
                  type="date"
                  value={profile.dob}
                  onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                  disabled={loading}
                  className="mt-1 w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>

              <label className="text-sm text-white/90">
                Binance ID (optional)
                <input
                  value={profile.binance_id}
                  onChange={(e) => setProfile({ ...profile, binance_id: e.target.value })}
                  disabled={loading}
                  className="mt-1 w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>

              <label className="text-sm text-white/90">
                Social links (comma separated, optional)
                <input
                  value={profile.social_links}
                  onChange={(e) => setProfile({ ...profile, social_links: e.target.value })}
                  disabled={loading}
                  className="mt-1 w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>

              <label className="text-sm text-white/90">
                Interests (comma separated, optional)
                <input
                  value={profile.interests}
                  onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
                  disabled={loading}
                  className="mt-1 w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>

              <div className="mt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 rounded-md bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  Save profile
                </button>
                <button
                  type="button"
                  onClick={() => setShowProfileForm(false)}
                  className="rounded-md border border-white/10 px-4 py-2 text-white/90 bg-black/50 hover:bg-black/40"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
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