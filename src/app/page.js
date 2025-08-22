// pages/index.js
"use client";
import {
  useEffect,
  useState, // Add this import
} from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Home() {
  const features = [
    {
      emoji: "⚒️",
      title: "Proof of Work",
      desc: "Turn your contributions, commits, proposals, and tasks into verifiable on-chain proofs.",
    },
    {
      emoji: "🎨",
      title: "Proof of Talent",
      desc: "Showcase skills with attestations, endorsements, and soulbound credentials tied to your identity.",
    },
    {
      emoji: "🧩",
      title: "Composability",
      desc: "Plug into the wider DeSOC graph. Your data is portable, verifiable, and reusable across apps.",
    },
    {
      emoji: "🛡️",
      title: "Reputation",
      desc: "Aggregate trust from actions, not vanity metrics. Weighted by context, timelines, and peers.",
    },
    {
      emoji: "🔐",
      title: "Token‑Gated Access",
      desc: "Gate communities, chats, and content based on on-chain credentials and contribution proofs.",
    },
    {
      emoji: "💸",
      title: "Bounties & Grants",
      desc: "Fund talent with on-chain payouts linked to verified milestones and proofs of work.",
    },
  ];
  const talent = [
    {
      title: "Event Achievements",
      desc: "Participation and recognition in hackathons or events. Each achievement contributes to your Talent Score, showcasing real-world problem-solving and project excellence.",
    },
    {
      title: "App Activeness",
      desc: "Consistent engagement on the platform through posts, comments, and challenges. Active participation boosts your Talent Score, reflecting your contribution and involvement.",
    },
    {
      title: "Badge Collection",
      desc: "Earned verified badges for skills, projects, and event participation. Badges enhance your Talent Score and highlight the diversity of your capabilities on the profile.",
    },
  ];

  const vibe = [
    {
      title: "Social Engagement",
      desc: "Likes, comments, and shares on posts contribute to your Vibe Score, reflecting your active participation and interaction with the community.",
    },
    {
      title: "Interest & Creativity",
      desc: "Participation in challenges, sharing creative ideas, and showcasing interests in tech, design, or content creation boosts your Vibe Score and demonstrates personality traits.",
    },
    {
      title: "Gaming & Challenge Performance",
      desc: "Scores in gamified quizzes, problem-solving games, and seasonal contests contribute to your Vibe Score, highlighting skill, strategy, and engagement level.",
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create state to store window dimensions
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Initialize window dimensions and transforms after mount
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  // Parallax transforms - using windowSize state
  const rotateX = useTransform(mouseY, [0, windowSize.height], [10, -10]);
  const rotateY = useTransform(mouseX, [0, windowSize.width], [-10, 10]);
  const translateX = useTransform(mouseX, [0, windowSize.width], [-20, 20]);
  const translateY = useTransform(mouseY, [0, windowSize.height], [-20, 20]);

  const [followMouse, setFollowMouse] = useState(false);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (followMouse) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [followMouse]);

  return (
    <>
      <Head>
        <title>Vibent — DeSOC for Proof of Work & Talent on BNB Chain</title>
        <meta
          name="description"
          content="Vibent is a decentralized social layer for verifiable Proof of Work and Proof of Talent, powered by BNB Smart Chain. Own your reputation, build in public, and unlock communities."
        />
      </Head>

      <div className="min-h-screen bg-[#0B0B0F] text-white">
        {/* Background glow */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[40rem] rounded-full bg-fuchsia-600/20 blur-[120px]" />
          <div className="absolute top-32 right-0 h-72 w-[35rem] rounded-full bg-indigo-600/20 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-72 w-[30rem] rounded-full bg-violet-600/20 blur-[120px]" />
          {/* BNB Chain themed glow */}
          <div className="absolute bottom-32 right-1/4 h-80 w-[30rem] rounded-full bg-amber-500/10 blur-[100px]" />
        </div>

        {/* Nav */}
        <nav className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500" />
              <span className="font-semibold tracking-tight">Vibent</span>
            </Link>
            <div className="hidden items-center gap-8 text-sm text-white/80 md:flex">
              <Link href="#proof" className="hover:text-white">
                Concept
              </Link>
              <Link href="#how" className="hover:text-white">
                How it works
              </Link>
              <Link href="#org" className="hover:text-white">
                Organization Access
              </Link>
              <Link href="#features" className="hover:text-white">
                Features
              </Link>

              <Link
                href="/auth/"
                className="rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium shadow-lg shadow-fuchsia-900/20 transition hover:scale-[1.02]"
              >
                Let&apos;s Go
              </Link>
            </div>
          </div>
        </nav>
        {/* hero section */}
        <div className="min-h-screen bg-[#0B0B0F] text-white">
          <header className="relative flex min-h-screen items-center overflow-hidden px-6 md:px-16">
            {/* Left content */}
            <motion.div
              className="relative z-10 max-w-xl"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 15,
                delay: 0.2,
              }}
            >
              {/* BNB Chain Badge */}
              <motion.div
                className="mb-4 inline-flex items-center gap-4 rounded-full border border-amber-400/20 bg-gradient-to-r from-amber-900/20 to-amber-700/10 px-3 py-1 text-sm text-amber-300"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Image
                  src="/images/icon.png"
                  alt="BNB Chain"
                  width={30}
                  height={30}
                  className="h-6 w-6"
                />
                Powered by BNB Smart Chain
              </motion.div>

              <motion.span
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                DeSOC, verified by your work — not your clout
              </motion.span>

              <motion.h1
                className="mt-6 bg-gradient-to-br from-white to-white/70 bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-6xl md:leading-[1.05]"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Own your reputation with{" "}
                <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  Proof of Vibe
                </span>{" "}
                and{" "}
                <span className="bg-gradient-to-r from-amber-300 to-rose-300 bg-clip-text text-transparent">
                  Proof of Talent
                </span>
              </motion.h1>

              <motion.p
                className="mt-5 text-lg text-white/70 md:text-xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                Vibent is a decentralized social layer that mints your
                contributions, skills, and community impact into verifiable
                on-chain credentials. Build in public. Unlock opportunities.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col items-center justify-start gap-3 sm:flex-row"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Link
                  href="/auth"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 font-medium shadow-lg shadow-fuchsia-900/20 transition hover:scale-[1.05]"
                >
                  Start Now
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.16669 10H15.8334"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 4.16669L15.8333 10L10 15.8334"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-medium text-white/90 transition hover:bg-white/10"
                >
                  Explore Demo
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right planet */}
            <motion.div
              className="absolute right-[-25%] top-1/2 hidden -translate-y-1/2 md:flex"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: 1.4,
                type: "spring",
                stiffness: 70,
              }}
              onAnimationComplete={() => setFollowMouse(true)} // Enable mouse-follow after entrance
            >
              <div className="relative w-[900px] h-[800px]">
                {/* Planet with entrance + mouse-follow */}
                <motion.div
                  className="relative z-10 w-full h-full rounded-full overflow-hidden"
                  style={
                    followMouse
                      ? {
                          rotateX,
                          rotateY,
                          x: translateX,
                          y: translateY,
                          perspective: 600,
                        }
                      : {}
                  }
                  initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    delay: 1.6,
                    type: "spring",
                    stiffness: 60,
                  }}
                >
                  <Image
                    src="/images/planet.webp"
                    alt="Planet"
                    className="w-full h-full object-cover rounded-full"
                    width={900}
                    height={800}
                  />
                </motion.div>
              </div>
            </motion.div>
          </header>
        </div>

        {/* BNB Smart Chain Showcase Section - With Split Background */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-black p-0">
            {/* Circuit pattern background - ONLY on the left side */}
            <div className="absolute left-0 top-0 bottom-0 w-1/2 opacity-30 md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-amber-950/20 to-transparent"></div>
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-pulse-very-slow"
              >
                <pattern
                  id="circuit-pattern"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M30,10 L70,10 M10,30 L30,30 M70,30 L90,30 M10,70 L30,70 M70,70 L90,70 M30,90 L70,90"
                    stroke="#F7B90B"
                    strokeWidth="1"
                    fill="none"
                  />
                  <circle cx="30" cy="30" r="3" fill="#F7B90B" opacity="0.6" />
                  <circle cx="70" cy="30" r="3" fill="#F7B90B" opacity="0.6" />
                  <circle cx="30" cy="70" r="3" fill="#F7B90B" opacity="0.6" />
                  <circle cx="70" cy="70" r="3" fill="#F7B90B" opacity="0.6" />
                  <path
                    d="M30,10 L30,30 M70,10 L70,30 M30,70 L30,90 M70,70 L70,90"
                    stroke="#F7B90B"
                    strokeWidth="1"
                    fill="none"
                  />
                </pattern>
                <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
              </svg>
            </div>

            {/* Right side gradient background */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent to-black/80"></div>

            <div className="relative flex flex-col md:flex-row items-center p-8 md:p-12">
              {/* Left side - Enhanced BNB Logo */}
              <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
                <div className="relative">
                  {/* Outer glow */}
                  <div className="absolute inset-0 rounded-full bg-amber-500/30 blur-3xl scale-150 animate-pulse-slow"></div>

                  {/* Rest of the BNB Logo content remains unchanged */}
                  <div className="relative w-80 h-80 flex items-center justify-center">
                    {/* Digital scanner effect */}
                    <div className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-amber-500/10 to-transparent animate-scanner"></div>

                    {/* Rotating outer hexagon */}
                    <div className="absolute w-full h-full animate-spin-very-slow">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <polygon
                          points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                          fill="none"
                          stroke="rgba(245,158,11,0.5)"
                          strokeWidth="0.5"
                          strokeDasharray="5,3"
                        />
                      </svg>
                    </div>
                    {/* Remaining logo elements unchanged */}
                    <div className="absolute w-[90%] h-[90%] animate-spin-reverse-slow">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <pattern
                          id="hexGrid"
                          width="10"
                          height="10"
                          patternUnits="userSpaceOnUse"
                          patternTransform="scale(0.7)"
                        >
                          <path
                            d="M5,0 L10,5 L5,10 L0,5 Z"
                            fill="none"
                            stroke="rgba(245,158,11,0.3)"
                            strokeWidth="0.5"
                          />
                        </pattern>
                        <circle cx="50" cy="50" r="45" fill="url(#hexGrid)" />
                      </svg>
                    </div>

                    {/* Multiple orbital rings */}
                    <div className="absolute w-full h-full rounded-full border border-amber-500/50 animate-spin-very-slow"></div>
                    <div className="absolute w-[93%] h-[93%] rounded-full border border-amber-500/30 animate-spin-slow"></div>
                    <div className="absolute w-[86%] h-[86%] rounded-full border border-amber-500/40 animate-spin-reverse-slow"></div>
                    <div
                      className="absolute w-[79%] h-[79%] rounded-full border border-amber-500/20 animate-spin-very-slow"
                      style={{ animationDuration: "25s" }}
                    ></div>

                    {/* BNB Logo */}
                    <div className="relative w-3/4 h-3/4 flex items-center justify-center group">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600/20 via-amber-500/30 to-amber-300/20 blur-md"></div>
                      <Image
                        src="/images/icon.png"
                        alt="BNB Smart Chain"
                        width={500}
                        height={500}
                        className="relative z-10 w-full h-full rounded-full object-cover shadow-[0_0_40px_rgba(245,158,11,0.5)] group-hover:shadow-[0_0_60px_rgba(245,158,11,0.7)] transition-all duration-500"
                      />
                      <div className="absolute inset-0 rounded-full bg-amber-500/0 group-hover:bg-amber-500/20 transition-all duration-500 blur-xl"></div>
                    </div>

                    {/* Enhanced animated dots */}
                    <div className="absolute w-full h-full">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.8)]"
                          style={{
                            left: `${
                              50 + 48 * Math.cos((2 * Math.PI * i) / 8)
                            }%`,
                            top: `${
                              50 + 48 * Math.sin((2 * Math.PI * i) / 8)
                            }%`,
                            animation: `pulseAndOrbit ${
                              3 + i * 0.5
                            }s infinite alternate ease-in-out`,
                          }}
                        ></div>
                      ))}
                    </div>

                    {/* Data connection lines */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="48"
                        stroke="rgba(245,158,11,0.15)"
                        strokeWidth="0.5"
                        fill="none"
                        strokeDasharray="0.5,3"
                      />
                      <line
                        x1="26"
                        y1="26"
                        x2="50"
                        y2="50"
                        stroke="rgba(245,158,11,0.3)"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="74"
                        y1="26"
                        x2="50"
                        y2="50"
                        stroke="rgba(245,158,11,0.3)"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="26"
                        y1="74"
                        x2="50"
                        y2="50"
                        stroke="rgba(245,158,11,0.3)"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="74"
                        y1="74"
                        x2="50"
                        y2="50"
                        stroke="rgba(245,158,11,0.3)"
                        strokeWidth="0.5"
                      />
                      <circle
                        cx="26"
                        cy="26"
                        r="2"
                        fill="rgba(245,158,11,0.5)"
                        className="animate-pulse"
                      />
                      <circle
                        cx="74"
                        cy="26"
                        r="2"
                        fill="rgba(245,158,11,0.5)"
                        className="animate-pulse"
                        style={{ animationDelay: "0.7s" }}
                      />
                      <circle
                        cx="26"
                        cy="74"
                        r="2"
                        fill="rgba(245,158,11,0.5)"
                        className="animate-pulse"
                        style={{ animationDelay: "1.1s" }}
                      />
                      <circle
                        cx="74"
                        cy="74"
                        r="2"
                        fill="rgba(245,158,11,0.5)"
                        className="animate-pulse"
                        style={{ animationDelay: "1.5s" }}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right side - Futuristic tech spec content */}
              <div className="md:w-1/2 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-5xl font-bold text-white relative overflow-hidden">
                    BNB
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse-slow"></span>
                  </h1>
                  <div className="h-10 w-px bg-gradient-to-b from-amber-500/10 via-amber-500/50 to-amber-500/10"></div>
                  <span className="text-amber-400 tracking-widest uppercase text-lg relative">
                    Smart Chain
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-amber-500/30"></span>
                  </span>
                </div>

                <h2 className="text-3xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                    Built on BNB: Where Proof Meets Talent
                  </span>
                </h2>

                <p className="text-white/80 mb-6 leading-relaxed">
                  Built for high performance and low fees, BNB Smart Chain is
                  the foundation of modern credential-based ecosystems. With
                  rapid block finality (~3 seconds per block), affordable gas
                  fees (just pennies per transaction), robust security, and
                  unmatched throughput, BNB Chain has become the leading
                  blockchain for professional identity and verifiable
                  credentials.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Tech spec items with futuristic style */}
                  <div className="flex items-start gap-3 group p-2 rounded-lg transition-all hover:bg-white/5">
                    <div className="mt-1 p-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 group-hover:shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-black"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-300 flex items-center gap-2">
                        Affordable Gas Fees
                        <span className="text-xs text-amber-300/50 font-normal">
                          [0.01-0.1 USD]
                        </span>
                      </h3>
                      <p className="text-sm text-white/70">
                        Daily fees usually translate to pennies per transaction,
                        averaging 426–534 BNB/day in August 2025.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group p-2 rounded-lg transition-all hover:bg-white/5">
                    <div className="mt-1 p-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 group-hover:shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                      <div
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-black"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-300 flex items-center gap-2">
                        Ultra-Fast Finality
                        <span className="text-xs text-amber-300/50 font-normal">
                          [~3s]
                        </span>
                      </h3>
                      <p className="text-sm text-white/70">
                        Blocks confirm in approximately 3 seconds for instant
                        transaction verification.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group p-2 rounded-lg transition-all hover:bg-white/5">
                    <div className="mt-1 p-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 group-hover:shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-black"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-300 flex items-center gap-2">
                        100% EVM Compatible
                        <span className="text-xs text-amber-300/50 font-normal">
                          [v1.1.0+]
                        </span>
                      </h3>
                      <p className="text-sm text-white/70">
                        Deploy existing Ethereum-based smart contracts
                        seamlessly.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group p-2 rounded-lg transition-all hover:bg-white/5">
                    <div className="mt-1 p-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 group-hover:shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-black"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-300 flex items-center gap-2">
                        Growing Ecosystem
                        <span className="text-xs text-amber-300/50 font-normal">
                          [1,400+ dApps]
                        </span>
                      </h3>
                      <p className="text-sm text-white/70">
                        Hosts over 5,800 decentralized applications, surpassing
                        all other chains
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced CTA buttons */}
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.bnbchain.org"
                    target="_blank"
                    rel="noreferrer"
                    className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 text-black font-semibold hover:from-amber-400 hover:to-amber-600 transition-all shadow-lg group overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-300/0 via-amber-300/30 to-amber-300/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    <span className="relative">Explore BNB Chain</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="relative"
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>

                  <a
                    href="/docs/bnb-integration"
                    className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 group relative px-4 py-2"
                  >
                    <span className="relative">Read Documentation</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="relative transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500/50 group-hover:w-full transition-all duration-300"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="proof"
          className="relative min-h-screen py-20 px-6 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Futuristic Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-indigo-900">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 max-w-6xl w-full space-y-32">
            {/* Proof of Talent */}
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-400 mb-10"
              >
                Proof of Talent
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-8">
                {talent.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg hover:shadow-pink-500/50 transition"
                  >
                    <h3 className="text-xl font-semibold text-pink-400">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 mt-2">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Proof of Vibe */}
            <div>
              <motion.h2
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-10 text-right"
              >
                Proof of Vibe
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-8">
                {vibe.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg hover:shadow-cyan-400/50 transition"
                  >
                    <h3 className="text-xl font-semibold text-cyan-400">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 mt-2">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how"
          className="mx-auto max-w-7xl px-6 pb-12 pt-8 md:pt-12"
        >
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
                text: "Link your wallet, social handles, and optional ENS/DID. You stay in control.",
              },
              {
                step: "02",
                title: "Prove work & talent",
                text: "Submit contributions or import from GitHub, on-chain actions, hackathons, and attestations.",
              },
              {
                step: "03",
                title: "Mint credentials",
                text: "Issue soulbound or scoped credentials. Unlock token‑gated communities and bounties.",
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

        {/* Organization Access */}
        <section
          id="org"
          className="relative mx-auto max-w-7xl px-4 pb-16 pt-12"
        >
          {/* Background Gradient Glow */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-fuchsia-900/20 via-violet-900/20 to-indigo-900/20 blur-2xl opacity-70"></div>

          {/* Container */}
          <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl shadow-2xl p-6 md:p-10">
            {/* Glow Blobs */}
            <div className="absolute -top-20 -left-10 h-60 w-60 rounded-full bg-fuchsia-600/30 blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-20 -right-10 h-60 w-60 rounded-full bg-indigo-600/30 blur-2xl animate-pulse"></div>

            {/* Hero Section */}
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 drop-shadow-lg">
                Organization Access
              </h3>
              <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                Verified organizations can{" "}
                <span className="text-fuchsia-400 font-semibold">register</span>
                ,
                <span className="text-violet-400 font-semibold">
                  {" "}
                  host hackathons & workshops
                </span>
                , and
                <span className="text-indigo-400 font-semibold">
                  {" "}
                  issue NFT badges
                </span>{" "}
                as authentic{" "}
                <span className="font-semibold text-fuchsia-300">
                  Proof of Talent
                </span>
                .
              </p>
            </div>

            {/* Flow with Animated Arrows */}
            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 relative">
              {/* Step 1: Register */}
              <div className="group relative z-10 rounded-xl border border-white/10 bg-gradient-to-br from-fuchsia-600/10 to-fuchsia-900/10 p-6 text-center hover:scale-105 transition-transform duration-300 w-64">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-fuchsia-600/30 text-fuchsia-300 text-2xl shadow-lg">
                  🏢
                </div>
                <h4 className="text-xl font-bold text-white">Register</h4>
                <p className="mt-2 text-sm text-gray-400">
                  Verified orgs get a unique batch ID to manage events.
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-fuchsia-400 animate-pulse"
                  fill="none"
                  stroke="url(#grad1)"
                  strokeWidth="2.5"
                  viewBox="0 0 48 48"
                >
                  <defs>
                    <linearGradient
                      id="grad1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#f0abfc" />
                      <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8 24h28M28 12l12 12-12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Step 2: Create Events */}
              <div className="group relative z-10 rounded-xl border border-white/10 bg-gradient-to-br from-violet-600/10 to-violet-900/10 p-6 text-center hover:scale-105 transition-transform duration-300 w-64">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-600/30 text-violet-300 text-2xl shadow-lg">
                  🎉
                </div>
                <h4 className="text-xl font-bold text-white">Host Events</h4>
                <p className="mt-2 text-sm text-gray-400">
                  Launch hackathons, workshops & competitions.
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-indigo-400 animate-pulse"
                  fill="none"
                  stroke="url(#grad2)"
                  strokeWidth="2.5"
                  viewBox="0 0 48 48"
                >
                  <defs>
                    <linearGradient
                      id="grad2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8 24h28M28 12l12 12-12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Step 3: Distribute Badges */}
              <div className="group relative z-10 rounded-xl border border-white/10 bg-gradient-to-br from-indigo-600/10 to-indigo-900/10 p-6 text-center hover:scale-105 transition-transform duration-300 w-64">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/30 text-indigo-300 text-2xl shadow-lg">
                  🏅
                </div>
                <h4 className="text-xl font-bold text-white">NFT Badges</h4>
                <p className="mt-2 text-sm text-gray-400">
                  Winners & participants earn verifiable Proof of Talent.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="relative z-10 mt-12 text-center">
              <a
                href="/org"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 px-8 py-3 text-lg font-semibold text-white shadow-xl shadow-fuchsia-900/30 hover:scale-110 hover:shadow-indigo-900/30 transition-transform duration-300"
              >
                🚀 Register Now!
              </a>
              <p className="mt-3 text-sm text-gray-400">
                Start your journey — from registration to NFT credentials.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="mx-auto max-w-7xl px-6 pb-12 pt-16 md:pt-24"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">
              What you can do with Vibent
            </h2>
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

        {/* Waitlist */}
        {/* <section
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
        </section> */}

        {/* FAQ */}
        {/* <section id="faq" className="mx-auto max-w-7xl px-6 pb-20">
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
        </section> */}

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
              <span className="text-white/40">
                © {new Date().getFullYear()} Vibent
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* Custom animations for BNB Chain section */}
      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes spin-very-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse-slow {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-pulse-slow {
          animation: pulse 3s infinite ease-in-out;
        }

        .animate-spin-very-slow {
          animation: spin-very-slow 30s linear infinite;
        }

        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 20s linear infinite;
        }

        @keyframes pulseAndOrbit {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes dataStream {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes scanner {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: 0 0;
          }
        }

        .animate-pulse-very-slow {
          animation: pulse 8s infinite ease-in-out;
        }

        .animate-scanner {
          animation: scanner 3s linear infinite;
        }
      `}</style>
    </>
  );
}
