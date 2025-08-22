'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WagmiProvider, useAccount, useChainId, useSignMessage } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider, ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'Vibent Orgs',
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
  chains: [bscTestnet],
  ssr: true,
});

export default function OrgAuthPage() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={darkTheme({
            accentColor: '#7c3aed',
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
  const { signMessageAsync } = useSignMessage();
  const chainId = useChainId();
  const isTestnet = chainId === bscTestnet.id;

  // Initial selection state - null means showing selection buttons
  const [selectedOption, setSelectedOption] = useState(null); // null | 'existing' | 'new'
  const [orgType, setOrgType] = useState('Company');
  const [loading, setLoading] = useState(false);
  const [checkingOrg, setCheckingOrg] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1); // For horizontal widgets: 1 or 2

  // Form data for new organization
  const [orgData, setOrgData] = useState({
    name: '',
    domain: '',
    description: ''
  });

  // Reset any errors when option changes
  useEffect(() => {
    setError('');
  }, [selectedOption]);

  // Progress to next step when wallet connects (for new org flow)
  useEffect(() => {
    if (selectedOption === 'new' && isConnected && currentStep === 1) {
      setCurrentStep(2);
    }
  }, [isConnected, selectedOption, currentStep]);

  const handleOrgRegister = async (e) => {
    e.preventDefault();
    if (!orgData.name || !orgData.domain) {
      setError('Name and domain are required');
      return;
    }
    if (!isConnected || !address) {
      setError('Connect your wallet first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // attempt register with current session/cookie
      let res = await fetch('/api/org/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(orgData),
      });

      // if unauthorized, perform wallet auth (nonce->sign->verify) and retry
      if (res.status === 401) {
        // get nonce
        const n = await fetch(`/api/auth/nonce?address=${address}`, { credentials: 'include' });
        const njson = await n.json();
        if (!n.ok) {
          throw new Error(njson?.error || 'Could not get nonce');
        }
        const message = njson.message;

        // sign
        let signature;
        try {
          signature = await signMessageAsync({ message });
        } catch (err) {
          throw new Error('Signing cancelled or failed');
        }

        // verify
        const v = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ address, signature }),
        });
        const vjson = await v.json();
        if (!v.ok) {
          throw new Error(vjson?.error || 'Auth verify failed');
        }

        // retry register
        res = await fetch('/api/org/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(orgData),
        });
      }

      const body = await res.json().catch(() => null);
      if (!res.ok) {
        // show specific messages for common cases
        if (res.status === 409) {
          setError('Domain already taken. Choose another domain.');
        } else if (res.status === 401) {
          setError(body?.error || 'Unauthorized');
        } else {
          setError(body?.error || 'Registration failed');
        }
        return;
      }

      // success -> navigate to org home
      router.push('/org/home');
    } catch (err) {
      console.error('Organization registration error:', err);
      setError(err.message || 'Failed to register organization');
    } finally {
      setLoading(false);
    }
  };

  const checkExistingOrg = async () => {
    if (!isConnected || !address) {
      setError('Connect your wallet first');
      return;
    }

    setCheckingOrg(true);
    setError('');

    try {
      // 1) try check with current session (server will require session)
      let res = await fetch('/api/org/check', {
        method: 'POST',
        credentials: 'include',
      });

      // 2) if unauthorized, run auth sign flow (nonce -> sign -> verify) then retry
      if (res.status === 401) {
        // get nonce
        const n = await fetch(`/api/auth/nonce?address=${address}`, { credentials: 'include' });
        const njson = await n.json();
        if (!n.ok) {
          throw new Error(njson?.error || 'Could not get nonce');
        }
        const message = njson.message;

        // sign
        let signature;
        try {
          signature = await signMessageAsync({ message });
        } catch (err) {
          throw new Error('Signing cancelled or failed');
        }

        // verify
        const v = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ address, signature }),
        });
        const vjson = await v.json();
        if (!v.ok) {
          throw new Error(vjson?.error || 'Auth verify failed');
        }

        // retry check
        res = await fetch('/api/org/check', {
          method: 'POST',
          credentials: 'include',
        });
      }

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        if (res.status === 401) throw new Error('Unauthorized');
        throw new Error(errBody?.error || 'Check failed');
      }

      const body = await res.json();
      if (body.exists) {
        router.push('/org/home');
      } else {
        setError("You don't have access to any organization. Please register a new organization instead.");
      }
    } catch (err) {
      console.error('Organization check error:', err);
      setError(err.message || 'Failed to check organization membership');
    } finally {
      setCheckingOrg(false);
    }
  };

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
      <main className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        {/* Header */}
        <div className="text-center mb-10">
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

          <p className="mt-5 mx-auto max-w-3xl text-lg text-white/70 md:text-xl">
            Soulbound org badge, role‑based permissions, and one‑click credential
            templates. Multi‑sig friendly and testnet‑ready.
          </p>
        </div>

        {/* Initial selection screen with horizontal widgets */}
        {selectedOption === null && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {/* Widget 1: Connect to Existing Organization */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-teal-900/20 via-emerald-900/20 to-cyan-900/20 p-6">
              <div className="mb-2">
                <span className="inline-block rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect to Existing</h3>
              <p className="text-white/70 mb-6">
                Already have an organization? Connect your wallet to access it.
              </p>
              <button
                onClick={() => setSelectedOption('existing')}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-4 py-3 text-sm font-medium shadow-lg transition hover:scale-[1.01]"
              >
                Connect to Existing
              </button>
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-500/20 blur-3xl" />
            </div>

            {/* Widget 2: Register New Organization */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-900/20 via-fuchsia-900/20 to-indigo-900/20 p-6">
              <div className="mb-2">
                <span className="inline-block rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Register New</h3>
              <p className="text-white/70 mb-6">
                Create a new organization now.
              </p>
              <button
                onClick={() => setSelectedOption('new')}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-3 text-sm font-medium shadow-lg shadow-fuchsia-900/20 transition hover:scale-[1.01]"
              >
                Register New Organization
              </button>
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
            </div>
          </div>
        )}

        {/* Existing Organization Flow */}
        {selectedOption === 'existing' && (
          <div className="max-w-xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-teal-900/20 via-emerald-900/20 to-cyan-900/20 p-6">
              <h2 className="text-2xl font-semibold mb-4 text-center">Connect to Organization</h2>
              <p className="text-white/70 mb-6 text-center">
                Connect your wallet to access your organization.
              </p>

              {/* Connect Wallet */}
              <div className="mb-6">
                <ConnectButton.Custom>
                  {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
                    const connected = mounted && account && chain;
                    return (
                      <div className="inline-flex w-full flex-col items-center gap-3" aria-live="polite">
                        {!connected ? (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-3 text-sm font-medium shadow-lg transition hover:scale-[1.01]"
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
                                Testnet mode detected (BNB Testnet)
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>

              {/* Access Button (only shown when connected) */}
              {isConnected && (
                <button
                  onClick={checkExistingOrg}
                  disabled={checkingOrg}
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-3 text-sm font-medium shadow-lg transition hover:scale-[1.01] disabled:opacity-70"
                >
                  {checkingOrg ? 'Checking Access...' : 'Access Organization'}
                </button>
              )}
              
              {/* Error message */}
              {error && (
                <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3">
                  <div className="text-sm text-red-400">{error}</div>
                </div>
              )}
              
              {/* Back button */}
              <button
                onClick={() => setSelectedOption(null)}
                className="mt-6 text-sm text-white/60 hover:text-white block mx-auto"
              >
                ← Back to options
              </button>

              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-500/20 blur-3xl" />
            </div>
          </div>
        )}

        {/* New Organization Flow - Horizontal Steps */}
        {selectedOption === 'new' && (
          <div className="max-w-4xl mx-auto">
            {/* Horizontal Steps */}
            <div className="mb-8">
              <div className="relative flex justify-between">
                {/* Step 1: Connect Wallet */}
                <div className="flex flex-col items-center">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    currentStep >= 1 ? 'bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500' : 'border-2 border-white/20 bg-black/30'
                  }`}>
                    <span className="text-white font-medium">1</span>
                  </div>
                  <span className={`mt-2 text-sm ${currentStep >= 1 ? 'text-white' : 'text-white/60'}`}>Connect Wallet</span>
                </div>
                
                {/* Connector Line */}
                <div className="absolute top-6 left-0 right-0 flex-1 mx-12">
                  <div className={`h-1 w-full ${
                    currentStep > 1 ? 'bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500' : 'bg-white/10'
                  }`}></div>
                </div>

                {/* Step 2: Fill Organization Details */}
                <div className="flex flex-col items-center">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    currentStep >= 2 ? 'bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500' : 'border-2 border-white/20 bg-black/30'
                  }`}>
                    <span className="text-white font-medium">2</span>
                  </div>
                  <span className={`mt-2 text-sm ${currentStep >= 2 ? 'text-white' : 'text-white/60'}`}>Organization Details</span>
                </div>
              </div>
            </div>

            {/* Step Content */}
            <div className="relative overflow-hidden rounded-3xl b4order border-white/10 bg-gradient-to-br from-violet-900/20 via-fuchsia-900/20 to-indigo-900/20 p-6">
              {/* Step 1: Connect Wallet */}
              {currentStep === 1 && (
                <div className="text-center max-w-lg mx-auto">
                  <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
                  <p className="text-white/70 mb-6">
                    Connect your wallet to register a new organization and mint your organization&apos;s SBT.
                  </p>
                  
                  <div className="mb-6">
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
                                    Testnet mode detected (BNB Testnet)
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      }}
                    </ConnectButton.Custom>
                  </div>
                  
                  {/* Back button */}
                  <button
                    onClick={() => setSelectedOption(null)}
                    className="mt-4 text-sm text-white/60 hover:text-white"
                  >
                    ← Back to options
                  </button>
                </div>
              )}

              {/* Step 2: Organization Details */}
              {currentStep === 2 && (
                <div className="max-w-lg mx-auto">
                  <div className="flex items-center gap-4 mb-6">
                    <ConnectButton />
                  </div>

                  <h2 className="text-2xl font-semibold mb-4">Organization Details</h2>
                  <p className="text-white/70 mb-6">
                    Fill in the details for your new organization.
                  </p>

                  {/* Badge Preview */}
                  <div className="mb-6">
                    <HoloBadge 
                      orgType={orgType} 
                      isTestnet={isTestnet} 
                      orgName={orgData.name || 'Your Organization'} 
                    />
                    
                    {/* Org type selector */}
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs justify-center">
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

                  {/* Registration Form */}
                  <form onSubmit={handleOrgRegister} className="space-y-4">
                    {/* Organization Name */}
                    <div>
                      <label htmlFor="orgName" className="block text-sm font-medium text-white/80 mb-2">
                        Organization Name *
                      </label>
                      <input
                        id="orgName"
                        type="text"
                        required
                        value={orgData.name}
                        onChange={(e) => setOrgData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/50 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                        placeholder="Enter organization name"
                      />
                    </div>

                    {/* Organization Domain */}
                    <div>
                      <label htmlFor="orgDomain" className="block text-sm font-medium text-white/80 mb-2">
                        Domain *
                      </label>
                      <input
                        id="orgDomain"
                        type="text"
                        required
                        value={orgData.domain}
                        onChange={(e) => setOrgData(prev => ({ ...prev, domain: e.target.value }))}
                        className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/50 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                        placeholder="example.com"
                      />
                    </div>

                    {/* Organization Description */}
                    <div>
                      <label htmlFor="orgDescription" className="block text-sm font-medium text-white/80 mb-2">
                        Description (Optional)
                      </label>
                      <textarea
                        id="orgDescription"
                        rows={3}
                        value={orgData.description}
                        onChange={(e) => setOrgData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/50 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                        placeholder="Brief description of your organization"
                      />
                    </div>

                    {/* Error message */}
                    {error && (
                      <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3">
                        <div className="text-sm text-red-400">{error}</div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentStep(1);
                          setSelectedOption(null);
                        }}
                        className="flex-1 rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
                      >
                        Back
                      </button>
                      
                      <button
                        type="submit"
                        disabled={loading || !orgData.name || !orgData.domain}
                        className="flex-1 rounded-lg bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-3 text-sm font-medium shadow-lg shadow-fuchsia-900/20 transition hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
                      >
                        {loading ? 'Registering...' : 'Register Organization'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
            </div>

            {/* Safety ribbon */}
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/70 max-w-4xl mx-auto">
              <div className="flex items-center gap-2">
                <span>🛡️</span>
                <span>Multi‑sig tip: Connect with your Safe signer; you can add other signers later in Roles.</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function HoloBadge({ orgType, isTestnet, orgName }) {
  // Holographic, animated badge preview
  return (
    <div className="relative mx-auto max-w-[200px] overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-4">
      <div className="relative grid place-items-center rounded-2xl border border-white/10 bg-[#0b0b0f]/60 p-4">
        {/* Holo ring */}
        <div className="pointer-events-none absolute -inset-1 rounded-3xl opacity-60 [background:conic-gradient(from_0deg,rgba(236,72,153,.35),rgba(129,140,248,.35),rgba(99,102,241,.35),rgba(236,72,153,.35))] blur-xl" />
        {/* Core seal */}
        <div className="relative flex flex-col items-center">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-[conic-gradient(var(--tw-gradient-stops))] from-fuchsia-500 via-violet-400 to-indigo-500 p-[2px]">
              <div className="grid h-full w-full place-items-center rounded-full bg-black/70">
                <div className="text-base font-semibold">Verified</div>
                <div className="text-[8px] text-white/60">{orgType}</div>
              </div>
            </div>
            {/* Orbit dots */}
            <span className="absolute -right-1 top-1 h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="absolute -left-1 bottom-1 h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
          </div>
          <div className="mt-3 text-center">
            <div className="font-medium text-white text-xs">{orgName}</div>
            <div className="mt-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/80">
              {isTestnet ? 'BNB Testnet' : 'BNB Mainnet'}
            </div>
          </div>
        </div>
      </div>
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:16px_16px]" />
    </div>
  );
}