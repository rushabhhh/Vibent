'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function OrgHomePage() {
  const orgName = 'Nebula Labs';

  // Header nav — trimmed
  const headerNav = [
    // { label: 'Home', href: '/org/home' },
    // { label: 'Credentials', href: '/org/credentials' },
    // { label: 'Settings', href: '/org/settings' },
    // { label: 'Messages', href: '/org/messages' },
  ];

  // Left rail data
  const kpis = [
    { label: 'Credentials Issued', value: '1,284' },
    { label: 'Active Opportunities', value: '12' },
    { label: 'Event Registrations', value: '3,905' },
    { label: 'Verified Talent', value: '7,412' },
  ];

  const pastEvents = [
    {
      id: 'EVT-001',
      name: 'BNB Hackathon 2025',
      type: 'Hackathon',
      date: 'June 15-18, 2025',
      participants: '385'
    },
    {
      id: 'EVT-002',
      name: 'zk-Workshop Series',
      type: 'Workshop',
      date: 'May 5-20, 2025',
      participants: '210'
    },
    {
      id: 'EVT-003',
      name: 'Web3 Design Summit',
      type: 'Conference',
      date: 'April 10, 2025',
      participants: '178'
    },
  ];

  const recentMessages = [
    {
      id: 'msg1',
      sender: 'Omar L.',
      avatar: 'O',
      avatarColor: 'from-emerald-400 via-cyan-400 to-sky-500',
      message: 'Thanks for the opportunity! When do we start?',
      time: '2h ago',
      unread: true
    },
    {
      id: 'msg2',
      sender: 'Jill Dhandhukiya.',
      avatar: 'Z',
      avatarColor: 'from-fuchsia-500 via-violet-500 to-indigo-500',
      message: 'I\'ve submitted the final code for review.',
      time: '5h ago',
      unread: false
    },
    {
      id: 'msg3',
      sender: 'Rushabh Rathod.',
      avatar: 'K',
      avatarColor: 'from-indigo-400 via-violet-500 to-fuchsia-500',
      message: 'Can we discuss the zkSNARK implementation?',
      time: '1d ago',
      unread: false
    },
    {
      id: 'msg4',
      sender: 'Diya Sarvaiya',
      avatar: 'K',
      avatarColor: 'from-indigo-400 via-violet-500 to-fuchsia-500',
      message: 'Can we discuss the zkSNARK implementation?',
      time: '1d ago',
      unread: false
    },
    {
      id: 'msg7',
      sender: 'Archita Sharma',
      avatar: 'K',
      avatarColor: 'from-indigo-400 via-violet-500 to-fuchsia-500',
      message: 'Can we discuss the zkSNARK implementation?',
      time: '1d ago',
      unread: false
    },
    {
      id: 'msg5',
      sender: 'Zara ',
      avatar: 'K',
      avatarColor: 'from-indigo-400 via-violet-500 to-fuchsia-500',
      message: 'Can we discuss the zkSNARK implementation?',
      time: '1d ago',
      unread: false
    }
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
      bannerImage: '/images/banner1.jpg', // Add banner image path
      achievements: ['Hackathon Winner — Nebula zk 2025', 'Contributor — Auditor Guild', 'Top 1% Reels • zk Education'],
      bio: 'Senior blockchain developer specialized in zkSNARKs and smart contract security...',
      github: 'github.com/zaradev',
      contributions: '800+ commits in 2025, Core contributor to zk-toolkit',
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

  // AI Summarizer state
  const [showAiSummary, setShowAiSummary] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');

  // AI Summarizer Functions
  const generateAiSummary = async (user) => {
    setIsLoading(true);
    setAiResponse('');
    setSelectedUser(user);
    setShowAiSummary(true);

    try {
      // For demo purposes, generate a minimal response
      setTimeout(() => {
        // No text content, will just use the summary cards at the top
        setAiResponse('');
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error generating AI summary:', error);
      setAiResponse('Sorry, there was an error generating the AI summary. Please try again.');
      setIsLoading(false);
    }
  };

  const askAiQuestion = async (e) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    setIsLoading(true);
    const previousResponse = aiResponse;

    try {
      // Function analysis logic stays the same
      const getSkillMatch = userQuestion.toLowerCase();
      const checkForSkill = userQuestion.toLowerCase();

      // For React rendering purposes, we'll use a different approach
      // Create a flag to identify the response type
      let responseType = 'default';
      let skillData = null;

      // Determine the type of response needed
      if (userQuestion.toLowerCase().includes('ml') ||
        userQuestion.toLowerCase().includes('machine learning')) {
        responseType = 'missing-skill';
        skillData = { name: 'Machine Learning' };
      } else if (userQuestion.toLowerCase().includes('devops')) {
        responseType = 'missing-skill';
        skillData = { name: 'DevOps' };
      } else if (userQuestion.toLowerCase().includes('experience') ||
        userQuestion.toLowerCase().includes('background')) {
        responseType = 'experience';
      } else if (userQuestion.toLowerCase().includes('fit') ||
        userQuestion.toLowerCase().includes('team')) {
        responseType = 'team-fit';
      } else {
        // Check if asking about a skill in the profile
        const skill = selectedUser.skills.find(s =>
          userQuestion.toLowerCase().includes(s.toLowerCase())
        );

        if (skill) {
          responseType = 'has-skill';
          skillData = {
            name: skill,
            index: selectedUser.skills.indexOf(skill)
          };
        }
      }

      setTimeout(() => {
        // Instead of HTML strings, store a marker that we'll use to render the appropriate component
        setAiResponse(`${previousResponse ? previousResponse + '\n\n' : ''}**Q: ${userQuestion}**\n\n[RESPONSE_TYPE:${responseType}${skillData ? '|' + JSON.stringify(skillData) : ''}]`);
        setUserQuestion('');
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error asking AI question:', error);
      setAiResponse(`${previousResponse ? previousResponse + '\n\n' : ''}**Q: ${userQuestion}**\n\nSorry, there was an error processing your question. Please try again.`);
      setIsLoading(false);
    }
  };

  // Now we need to change how we render responses
  const renderResponse = (responseText) => {
    if (!responseText.includes('[RESPONSE_TYPE:')) return null;

    const match = responseText.match(/\[RESPONSE_TYPE:([^|]+)(?:\|(.+))?\]/);
    if (!match) return null;

    const type = match[1];
    const data = match[2] ? JSON.parse(match[2]) : null;

    switch (type) {
      case 'missing-skill':
        return (
          <div className="p-3 rounded-lg bg-gradient-to-br from-gray-900/60 to-black/60 border border-white/10">
            <h4 className="text-base font-semibold mb-2 text-white flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {data.name} Assessment
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                <span className="text-white/80">No {data.name} skills listed in {selectedUser.name}&#39;s profile</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                <span className="text-white/80">Primary expertise is in {selectedUser.skills.slice(0, 2).join(' and ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                <span className="text-white/80">{selectedUser.title} role focuses on {selectedUser.skills[0]}-related skills</span>
              </div>
              <div className="mt-3 px-3 py-2 bg-black/40 rounded-md text-sm text-white/70 italic">
                Note: Based on {selectedUser.name}&lsquo;s verified profile, there&apos;s no evidence of {data.name} expertise. Their verified strengths are in {selectedUser.skills.join(', ')}.
              </div>
            </div>
          </div>
        );

      case 'has-skill':
        const skillIndex = data.index;
        const skillLevel = skillIndex === 0 ? 'expert' : skillIndex === 1 ? 'advanced' : 'proficient';
        const skillScore = skillIndex === 0 ? 95 : skillIndex === 1 ? 85 : 75;

        return (
          <div className="p-3 rounded-lg bg-gradient-to-br from-violet-900/30 to-indigo-900/30 border border-violet-500/20">
            <h4 className="text-base font-semibold mb-2 text-white flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              {data.name} Expertise Analysis
            </h4>

            <div className="flex items-start mb-3">
              <div className="relative h-14 w-14 rounded-full mr-3 flex-shrink-0" style={{ background: `conic-gradient(#8b5cf6 ${skillScore}%, rgba(255,255,255,0.1) ${skillScore}% 100%)` }}>
                <div className="absolute inset-1 rounded-full bg-black/60 flex items-center justify-center">
                  <div className="text-sm font-bold text-violet-300">{skillScore}%</div>
                </div>
              </div>

              <div className="flex-1">
                <div className="text-sm font-medium text-violet-300">{skillLevel.toUpperCase()} LEVEL</div>
                <div className="text-xs text-white/70 mt-1">
                  {skillIndex === 0
                    ? 'This appears to be their strongest technical skill'
                    : skillIndex === 1
                      ? 'This is one of their primary technical competencies'
                      : 'This is part of their broader skillset'}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-400 mt-1.5"></span>
                <span className="text-white/80">Demonstrated through: {selectedUser.achievements.find(a => a.toLowerCase().includes(data.name.toLowerCase())) || selectedUser.achievements[0]}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-400 mt-1.5"></span>
                <span className="text-white/80">Context: {data.name} is {skillIndex < 2 ? 'a core part of' : 'complementary to'} their {selectedUser.title} role</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-400 mt-1.5"></span>
                <span className="text-white/80">Overall technical rating (PoT: {selectedUser.pot}) suggests {selectedUser.pot > 85 ? 'exceptional' : selectedUser.pot > 75 ? 'very strong' : 'solid'} capabilities</span>
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-900/30 to-blue-900/30 border border-indigo-500/20">
            <h4 className="text-base font-semibold mb-2 text-white flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              Professional Background
            </h4>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="rounded-md bg-black/30 px-3 py-2">
                <div className="text-xs text-indigo-300">Current Role</div>
                <div className="text-sm">{selectedUser.title}</div>
              </div>
              <div className="rounded-md bg-black/30 px-3 py-2">
                <div className="text-xs text-indigo-300">Verified Status</div>
                <div className="text-sm">PoT Score: {selectedUser.pot}/100</div>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-sm font-medium text-indigo-300 mb-1.5">Technical Strengths</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedUser.skills.map((skill, i) => (
                  <span key={i} className="text-white/90 text-xs px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20">{skill}</span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-indigo-300 mb-1.5">Notable Achievements</div>
              <div className="space-y-1">
                {selectedUser.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-400 mt-1.5"></span>
                    <span className="text-white/80 text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'team-fit':
        return (
          <div className="p-3 rounded-lg bg-gradient-to-br from-fuchsia-900/30 to-pink-900/30 border border-fuchsia-500/20">
            <h4 className="text-base font-semibold mb-2 text-white flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-400">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Team Fit Analysis
            </h4>

            <div className="flex items-start mb-3">
              <div className="relative h-14 w-14 rounded-full mr-3 flex-shrink-0" style={{ background: `conic-gradient(#d946ef ${selectedUser.pov}%, rgba(255,255,255,0.1) ${selectedUser.pov}% 100%)` }}>
                <div className="absolute inset-1 rounded-full bg-black/60 flex items-center justify-center">
                  <div className="text-sm font-bold text-fuchsia-300">{selectedUser.pov}%</div>
                </div>
              </div>

              <div className="flex-1">
                <div className="text-sm font-medium text-fuchsia-300">COLLABORATION POTENTIAL</div>
                <div className="text-xs text-white/70 mt-1">
                  {selectedUser.pov > 80 ? 'Excellent communicator with strong interpersonal skills' : 'Effective communicator with good team presence'}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-fuchsia-400 mt-1.5"></span>
                <span className="text-white/80">Would likely excel in {selectedUser.pov > 80 ? 'collaborative environments that value innovative thinking' : 'structured teams with clear objectives'}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-fuchsia-400 mt-1.5"></span>
                <span className="text-white/80">Leadership potential: {selectedUser.pot > 85 ? 'Strong technical leadership capabilities' : 'Can contribute technically while developing leadership skills'}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-fuchsia-400 mt-1.5"></span>
                <span className="text-white/80">Would bring valuable expertise to teams working on {selectedUser.skills[0]}-focused projects</span>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-900/30 to-fuchsia-900/30 border border-violet-500/20">
            <h4 className="text-base font-semibold mb-2 text-white flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              Talent Analysis
            </h4>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="rounded-md bg-black/30 px-3 py-2">
                <div className="text-xs text-violet-300">Professional Profile</div>
                <div className="text-sm">{selectedUser.title}</div>
              </div>
              <div className="rounded-md bg-black/30 px-3 py-2">
                <div className="text-xs text-violet-300">Key Expertise</div>
                <div className="text-sm">{selectedUser.skills.slice(0, 2).join(', ')}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-md bg-black/30 flex-1 px-3 py-2">
                <div className="text-xs text-violet-300">Technical Standing</div>
                <div className="text-sm">Top {100 - selectedUser.pot}% (PoT {selectedUser.pot}/100)</div>
              </div>
              <div className="rounded-md bg-black/30 flex-1 px-3 py-2">
                <div className="text-xs text-violet-300">Team Compatibility</div>
                <div className="text-sm">{selectedUser.pov > 80 ? 'Excellent' : 'Strong'} (PoV {selectedUser.pov}/100)</div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="h-2 w-2 rounded-full bg-violet-400 mt-1.5"></span>
              <span className="text-white/80">{selectedUser.name} brings valuable skills to any project involving {selectedUser.skills[0]}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="h-2 w-2 rounded-full bg-violet-400 mt-1.5"></span>
              <span className="text-white/80">Their track record suggests they can deliver high-quality work and would be a {selectedUser.pov > 80 ? 'great' : 'solid'} team contributor</span>
            </div>
          </div>
        );
    }
  };

  const [showSuccessToast, setShowSuccessToast] = useState(false);

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
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto px-4 py-8 md:py-10"> 
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Left rail: KPIs + Recent Issuance */}
          <aside className="md:col-span-3">
            {/* <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-lg font-medium">KPIs</div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {kpis.map((k) => (
                  <div key={k.label} className="rounded-xl border border-white/10 bg-black/30 p-3">
                    <div className="text-xs text-white/60">{k.label}</div>
                    <div className="mt-1 text-xl font-semibold">{k.value}</div>
                  </div>
                ))}
              </div>
            </div> */}

            <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-medium flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-400">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Past Events
                </h3>
                <Link href="/org/events" className="text-sm flex items-center gap-1 text-fuchsia-300 hover:text-fuchsia-200 transition-colors">
                  View all
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </Link>
              </div>

              <div className="space-y-4 max-h-[70vh] md:max-h-[calc(100vh-300px)] overflow-y-auto pr-1 pb-1 custom-scrollbar">
                {pastEvents.map((event) => (
                  <Link href={`/org/events/${event.id}`} key={event.id}>
                    <div className="group relative rounded-xl border border-white/10 bg-black/30 hover:bg-black/40 transition-colors">
                      <div className="p-4">
                        <div className="flex flex-col">
                          <div className="flex items-start justify-between">
                            <h4 className="text-lg font-semibold group-hover:text-fuchsia-200 transition-colors">{event.name}</h4>
                            <div className={`rounded-md px-2 py-0.5 text-xs font-medium ${event.type === 'Hackathon'
                                ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30'
                                : event.type === 'Workshop'
                                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              }`}>
                              {event.type}
                            </div>
                          </div>

                          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/80">
                            <div className="flex items-center gap-1.5">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                              {event.date}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                              {event.participants} attendees
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex -space-x-2">
                              {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-7 w-7 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-500 p-[1px]">
                                  <div className="h-full w-full rounded-full bg-black/70"></div>
                                </div>
                              ))}
                              <div className="ml-1 rounded-md bg-white/5 px-1.5 py-0.5 text-xs">
                                +{parseInt(event.participants) - 3}
                              </div>
                            </div>

                            <div className="group-hover:translate-x-0.5 transition-transform duration-300 text-white/80 group-hover:text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                <div className="text-xs text-white/60">
                  {pastEvents.length} events completed
                </div>
                <button className="text-xs text-fuchsia-300 hover:text-fuchsia-200 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Export calendar
                </button>
              </div>
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
                    <div className="absolute inset-0">
                      <Image
                        src={p.bannerImage || '/images/default-banner.jpg'} // Fallback to default banner
                        alt={`${p.name}'s banner`}
                        fill
                        className="object-cover opacity-20"
                        priority
                      />
                      {/* Add a gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${p.cover} opacity-30 mix-blend-overlay`} />
                    </div>
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
                          {/* <button
                            onClick={() => {
                              setActiveProfile(p);
                              setProfileOpen(true);
                            }}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                          >
                            View profile
                          </button> */}
                          {/* <Link
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
                          </Link> */}
                          <button
                            onClick={() => generateAiSummary(p)}
                            className="rounded-lg bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-3 py-2 text-sm font-medium flex items-center gap-1.5"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 8V4H8"></path>
                              <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                              <path d="M2 14h2"></path>
                              <path d="M20 14h2"></path>
                              <path d="M15 13v2"></path>
                              <path d="M9 13v2"></path>
                            </svg>
                            AI Insights
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
    {/* Messages section moved to top */}
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Messages</h3>
        <Link href="/org/messages" className="text-xs text-white/60 hover:text-white">
          View all
        </Link>
      </div>
                
                <div className="space-y-3">
                  {recentMessages.map((msg) => (
                    <Link href={`/org/messages/${msg.id}`} key={msg.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                      <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${msg.avatarColor} p-[1px] flex-shrink-0`}>
                        <div className="h-full w-full rounded-full bg-black/70 flex items-center justify-center text-sm font-medium">
                          {msg.avatar}
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-sm flex items-center gap-2">
                            {msg.sender}
                            {msg.unread && (
                              <span className="h-2 w-2 rounded-full bg-fuchsia-500"></span>
                            )}
                          </div>
                          <div className="text-xs text-white/50">{msg.time}</div>
                        </div>
                        <p className="text-sm text-white/70 truncate group-hover:text-white/90 transition-colors">
                          {msg.message}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-white/10">
                  <Link
                    href="/org/messages/new"
                    className="flex items-center justify-center gap-2 w-full text-sm text-fuchsia-300 hover:text-fuchsia-200 py-1.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14"></path>
                      <path d="M5 12h14"></path>
                    </svg>
                    New message
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

      {/* AI Summary Modal */}
      {showAiSummary && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="relative max-w-3xl w-full max-h-[90vh] overflow-auto rounded-2xl border border-white/10 bg-[#0B0B0F] p-6">
            <button
              onClick={() => setShowAiSummary(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header with profile info */}
            <div className="flex items-center gap-4 mb-6 bg-gradient-to-r from-black/40 via-fuchsia-950/10 to-indigo-950/10 rounded-xl p-3 border border-white/5">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 p-[2px]">
                <div className="h-full w-full rounded-full bg-black/60 flex items-center justify-center">
                  <span className="text-xl font-bold">{selectedUser.name.charAt(0)}</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  {selectedUser.name}
                  <span className="text-xs py-0.5 px-2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/20">
                    Verified
                  </span>
                </h3>
                <div className="text-white/70 text-sm">{selectedUser.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="rounded-md border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-sm text-violet-300">PoT {selectedUser.pot}</span>
                  <span className="rounded-md border border-fuchsia-500/20 bg-fuchsia-500/10 px-2 py-0.5 text-sm text-fuchsia-300">PoV {selectedUser.pov}</span>
                </div>
              </div>
            </div>

            {/* AI Analysis Content */}
            <div className="prose prose-invert max-w-none">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="h-8 w-8 rounded-full border-2 border-fuchsia-500 border-t-transparent animate-spin mb-4"></div>
                  <p className="text-white/70">Analyzing talent profile...</p>
                </div>
              ) : (
                <div>
                  {/* Summary Cards Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="col-span-2 lg:col-span-1 rounded-xl bg-gradient-to-br from-violet-900/20 to-indigo-900/20 border border-violet-500/20 p-4">
                      <div className="text-sm font-medium text-violet-300 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        EXPERTISE
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {selectedUser.skills.map((skill, i) => (
                          <span key={i} className="text-white text-sm px-2 py-0.5 rounded-md bg-violet-500/10 border border-violet-500/20">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-2 lg:col-span-1 rounded-xl bg-gradient-to-br from-fuchsia-900/20 to-pink-900/20 border border-fuchsia-500/20 p-4">
                      <div className="text-sm font-medium text-fuchsia-300 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                        SCORES
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="rounded-md bg-white/5 px-3 py-1.5 flex items-center">
                          <div className="font-medium mr-2">PoT:</div>
                          <div className="text-violet-300 font-bold">{selectedUser.pot}/100</div>
                        </div>
                        <div className="rounded-md bg-white/5 px-3 py-1.5 flex items-center">
                          <div className="font-medium mr-2">PoV:</div>
                          <div className="text-fuchsia-300 font-bold">{selectedUser.pov}/100</div>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 rounded-xl bg-gradient-to-br from-indigo-900/20 to-cyan-900/20 border border-indigo-500/20 p-4">
                      <div className="text-sm font-medium text-indigo-300 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        ACHIEVEMENTS
                      </div>
                      <div className="space-y-1.5">
                        {selectedUser.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <span className="h-2 w-2 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0"></span>
                            <span className="text-white/90">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* No text summary, just show Q&A Section if available */}
                  {aiResponse && aiResponse.includes('Q:') && (
                    <div className="mt-6 space-y-4">
                      {aiResponse.split('\n\n**Q:').slice(1).map((qa, i) => {
                        const [question, answer] = qa.split('**\n\n');
                        return (
                          <div key={i} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                            <div className="bg-black/40 px-4 py-3 flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-fuchsia-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <path d="M12 17h.01"></path>
                              </svg>
                              <span className="font-medium">Q: {question}</span>
                            </div>
                            <div className="p-4">
                              {answer.includes('[RESPONSE_TYPE:') ? renderResponse(answer) : answer}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Ask section */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <h4 className="text-base font-semibold mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                Ask about this talent
              </h4>
              <form onSubmit={askAiQuestion} className="flex gap-2">
                <input
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Skills, experience, fit for roles..."
                  className="flex-1 rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-white placeholder:text-white/50 focus:border-violet-500 focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !userQuestion.trim()}
                  className="rounded-lg bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2 font-medium shadow-lg transition hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
                >
                  Ask
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 shadow-lg backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-500/20 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-emerald-300">Credentials queued for issuance</h4>
                <p className="text-sm text-white/70">Your credentials will be sent shortly. This may take a few minutes.</p>
              </div>
            </div>
          </div>
        </div>
      )}
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
}

function BaseModal({ open, onClose, id, title, children, maxWidth = 'max-w-4xl' }) {
  const modalRef = useRef(null);
  const closeRef = useRef(null);
  useModalA11y(open, modalRef, closeRef, onClose);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-lg" onClick={onClose} aria-hidden="true" />
      <div
        ref={modalRef}
        className={`relative z-10 w-full ${maxWidth} rounded-2xl border border-white/10 bg-[#0B0B0F] shadow-[0_0_60px_rgba(139,92,246,0.25)] flex flex-col max-h-[90vh]`}
      >
        {/* Header - Fixed */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5 sticky top-0 bg-[#0B0B0F] z-10">
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

        {/* Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}

function IssueCredentialModal({ open, onClose }) {
  const [eventName, setEventName] = useState('');
  const [recipients, setRecipients] = useState([{ role: 'Participant', address: '' }]);
  const fileInputRef = useRef(null);
  const [importError, setImportError] = useState('');

  const addRecipient = () => {
    setRecipients([...recipients, { role: 'Participant', address: '' }]);
  };

  const updateRecipient = (index, field, value) => {
    const updatedRecipients = [...recipients];
    updatedRecipients[index][field] = value;
    setRecipients(updatedRecipients);
  };

  const removeRecipient = (index) => {
    const updatedRecipients = [...recipients];
    updatedRecipients.splice(index, 1);
    setRecipients(updatedRecipients);
  };

  const handleCSVUpload = (e) => {
    setImportError('');
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvData = event.target.result;
        const lines = csvData.split('\n');

        // Skip header row and filter out empty lines
        const entries = lines
          .slice(1)
          .map(line => line.trim())
          .filter(line => line)
          .map(line => {
            // Extract role and address from CSV
            const [role, address] = line.split(',').map(item => item.trim());

            // Validate role - default to Participant if not valid
            const validRoles = ['Participant', 'Winner', 'Special mention', 'Mentor'];
            const validRole = validRoles.includes(role) ? role : 'Participant';

            return { role: validRole, address };
          });

        // Validate entries
        const hasEmptyFields = entries.some(entry => !entry.address);
        if (hasEmptyFields) {
          setImportError('Some entries in your CSV have missing wallet addresses. Please check your file format.');
          return;
        }

        // Update recipients with parsed data
        setRecipients(entries);

        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error("CSV parsing error:", error);
        setImportError('Failed to parse CSV. Please ensure your file is formatted correctly with columns for role and wallet address.');
      }
    };
    reader.readAsText(file);
  };

  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data
    console.log({
      eventName,
      recipients
    });
    // Show the success toast
    setShowSuccessToast(true);
    // Hide the toast after 5 seconds
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 5000);
    onClose();
  };

  return (
    <BaseModal open={open} onClose={onClose} id="issue" title="Issue Credential" maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex-1">
          {/* Event Information */}
          <div className="space-y-4 mb-6">
            {/* <h3 className="text-base font-medium text-white">Event Information</h3> */}

            <div className="grid gap-4">
              <label className="block">
                <div className="mb-1.5 text-sm font-medium">Event Name</div>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Enter event name"
                  className="w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm placeholder:text-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  required
                />
              </label>
            </div>
          </div>

          {/* Recipients Section */}
          <div className="border-t border-white/10 pt-5 mb-6">
            <h3 className="text-base font-medium text-white mb-2">Recipients</h3>
            <p className="text-sm text-white/60 mb-4">Add recipients who will receive credentials for this event.</p>

            {recipients.map((recipient, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3 pb-3 border-b border-white/5 relative">
                <div className="md:col-span-5">
                  <select
                    value={recipient.role}
                    onChange={(e) => updateRecipient(index, 'role', e.target.value)}
                    className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400"
                  >
                    <option value="Participant">Participant</option>
                    <option value="Winner">Winner</option>
                    <option value="Special mention">Special mention</option>
                    <option value="Mentor">Mentor</option>
                  </select>
                </div>
                <div className="md:col-span-6">
                  <input
                    type="text"
                    value={recipient.address}
                    onChange={(e) => updateRecipient(index, 'address', e.target.value)}
                    placeholder="0x... or did:pkh:..."
                    className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm placeholder:text-white/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400"
                    required
                  />
                </div>
                <div className="md:col-span-1 flex items-center justify-center">
                  {recipients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRecipient(index)}
                      className="text-white/60 hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addRecipient}
              className="mt-1 flex items-center gap-2 text-sm text-fuchsia-300 hover:text-fuchsia-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              Add another recipient
            </button>
          </div>

          {/* CSV Import Section */}
          <div className="border-t border-white/10 pt-5 mb-6">
            <h3 className="text-base font-medium text-white mb-2">Bulk Import</h3>
            <p className="text-sm text-white/60 mb-4">Upload a CSV file with role and address columns to add recipients in bulk.</p>
            
            <div className="flex items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="flex-1 rounded-md bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-3 text-sm font-medium transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
              >
                Upload CSV
              </button>
              <div className="text-sm text-white/70">
                {recipients.length} recipient{recipients.length !== 1 && 's'} will be imported
              </div>
            </div>

            {importError && (
              <div className="mt-3 text-red-400 text-sm">{importError}</div>
            )}
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="flex-1 rounded-md bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-3 text-sm font-medium transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
              >
                Issue Credentials
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm hover:bg-black/40"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </BaseModal>
  );
}

function ProfileModal({ open, onClose, profile }) {
  if (!profile) return null;

  return (
    <BaseModal open={open} onClose={onClose} id="profile" title="Talent Profile" maxWidth="max-w-4xl">
      <div className="space-y-6">
        {/* Header with profile info */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-black/40 via-fuchsia-950/10 to-indigo-950/10 rounded-xl p-4 border border-white/5">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 p-[2px]">
            <div className="h-full w-full rounded-full bg-black/60 flex items-center justify-center">
              <span className="text-xl font-bold">{profile.name.charAt(0)}</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-2">
              {profile.name}
              <span className="text-xs py-0.5 px-2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/20">
                Verified
              </span>
            </h3>
            <div className="text-white/70 text-sm">{profile.title}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="rounded-md border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-sm text-violet-300">PoT {profile.pot}</span>
              <span className="rounded-md border border-fuchsia-500/20 bg-fuchsia-500/10 px-2 py-0.5 text-sm text-fuchsia-300">PoV {profile.pov}</span>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h4 className="text-lg font-medium mb-3">Skills & Expertise</h4>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm">
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h4 className="text-lg font-medium mb-3">Achievements</h4>
          <div className="space-y-2">
            {profile.achievements.map((achievement, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-400 mt-1.5"></span>
                <span className="text-white/90">{achievement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bio if available */}
        {profile.bio && (
          <div>
            <h4 className="text-lg font-medium mb-3">About</h4>
            <p className="text-white/80">{profile.bio}</p>
          </div>
        )}

        {/* GitHub info if available */}
        {profile.github && (
          <div>
            <h4 className="text-lg font-medium mb-3">GitHub</h4>
            <div className="rounded-lg border border-white/10 bg-black/30 p-3">
              <div className="flex items-center gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="text-fuchsia-300 hover:text-fuchsia-200">
                  {profile.github}
                </a>
              </div>
              {profile.contributions && (
                <div className="mt-2 text-sm text-white/70">
                  {profile.contributions}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="border-t border-white/10 pt-5 flex flex-wrap gap-3">
          <Link href={`/org/messages/new?to=${profile.handle}`} className="rounded-lg bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium">
            Message
          </Link>
          <Link href="/org/watchlist" className="rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-sm hover:bg-black/40">
            Add to watchlist
          </Link>
          <Link href="/org/issue" className="rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-sm hover:bg-black/40">
            Issue credential
          </Link>
        </div>
      </div>
    </BaseModal>
  );
}