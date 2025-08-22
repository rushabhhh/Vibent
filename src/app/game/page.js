import Link from 'next/link';

export const metadata = {
  title: 'Games — Vibent',
};

export default function GameLandingPage() {
  return (
    <>
      <main className="landing cosmic" style={styles.page}>
        {/* Background orbs + starfield */}
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />
        <div className="stars" aria-hidden />

        {/* Top badges (theme-matching) */}
        <div className="badges">
          <span className="pill pill-amber">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            Powered by BNB Smart Chain
          </span>
          <span className="pill pill-green">
            <span className="dot" /> DeSOC, verified by your work — not your clout
          </span>
        </div>

        <header style={styles.header} className="fade-in">
          <h1 style={styles.title}>
            Own your fun with{' '}
            <span className="grad violet">Proof of Play</span> and{' '}
            <span className="grad sunrise">Proof of Skill</span>
          </h1>
          <p style={styles.subtitle}>
            Quick, immersive mini-games with a sleek Vibent aesthetic.
          </p>
        </header>

        <nav style={styles.grid} aria-label="Game navigation">
          {/* SNAKE */}
          <Link href="/game/snake" className="cardLink" aria-label="Play Snake">
            <article className="card tilt glow" style={styles.card} tabIndex={0}>
              <div style={styles.iconWrap} className="iconWrap">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M8 16s1-3 4-3 4 3 4 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="8" cy="16" r="1.2" fill="currentColor" />
                </svg>
              </div>
              <h2 style={styles.cardTitle}>Snake</h2>
              <p style={styles.cardDesc}>Classic arcade snake — dodge yourself, chase the score.</p>
              <span style={styles.cta} className="ctaShine">Play →</span>
            </article>
          </Link>

          {/* MEMORY MATCH */}
          <Link href="/game/memory_ripple" className="cardLink" aria-label="Play Memory Match">
            <article className="card tilt glow" style={styles.card} tabIndex={0}>
              <div style={styles.iconWrap} className="iconWrap">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M12 5v0M12 19v0M5 12h0M19 12h0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 style={styles.cardTitle}>Memory Match</h2>
              <p style={styles.cardDesc}>Flip & match pairs before the clock runs out.</p>
              <span style={styles.cta} className="ctaShine">Play →</span>
            </article>
          </Link>

          {/* WHACK-A-MOLE */}
          <Link href="/game/whackmole" className="cardLink" aria-label="Play Whack-a-Mole">
            <article className="card tilt glow newBadge" style={styles.card} tabIndex={0}>
              <div style={styles.iconWrap} className="iconWrap">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 18c4-3 12-3 16 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <circle cx="12" cy="11" r="4" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="11" cy="10" r="0.8" fill="currentColor"/>
                  <circle cx="13" cy="10" r="0.8" fill="currentColor"/>
                </svg>
              </div>
              <h2 style={styles.cardTitle}>Whack-a-Mole</h2>
              <p style={styles.cardDesc}>Tap the mole when it pops — +10 per hit!</p>
              <span style={styles.cta} className="ctaShine">Play →</span>
            </article>
          </Link>
        </nav>

        <footer style={styles.footer} className="fade-in">
          <small style={{ color: 'rgba(255,255,255,0.65)' }}>
            Tip: Use Tab to focus a card, Enter to open.
          </small>
        </footer>
      </main>

      <style>{globalStyles}</style>
    </>
  );
}

/* Theme tokens matching the screenshot */
const violet = '#8b5cf6';          // primary violet
const pink = '#f472b6';            // pink
const peach = '#fca5a5';           // peach/soft coral
const bg = '#0b0e13';              // deep slate
const glass = 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))';

const styles = {
  page: {
    minHeight: '100vh',
    padding: '56px 24px 42px',
    background: bg,
    color: '#eef2ff',
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    maxWidth: 1120,
    textAlign: 'left',
    width: '100%',
    margin: '6px auto 14px',
  },
  title: {
    fontSize: 40,
    lineHeight: 1.1,
    margin: 0,
    letterSpacing: '-0.02em',
    color: '#e5e7eb',
  },
  subtitle: {
    margin: '14px 0 0',
    color: 'rgba(226,232,240,0.78)',
    maxWidth: 760,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 22,
    width: '100%',
    maxWidth: 1120,
    marginTop: 22,
  },
  card: {
    background: glass,
    border: `1px solid rgba(139,92,246,0.18)`,
    padding: 18,
    borderRadius: 18,
    minHeight: 156,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    boxShadow: `0 20px 50px rgba(2,6,23,0.55)`,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },
  iconWrap: {
    color: violet,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 58,
    height: 58,
    borderRadius: 14,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
  },
  cardTitle: {
    margin: 0,
    fontSize: 18,
    letterSpacing: '-0.015em',
  },
  cardDesc: {
    margin: 0,
    color: 'rgba(226,232,240,0.78)',
    fontSize: 13.5,
    flex: 1,
  },
  cta: {
    alignSelf: 'flex-end',
    fontWeight: 700,
    background: `linear-gradient(90deg, ${violet}, ${pink}, ${peach})`,
    backgroundClip: 'text',
    color: 'transparent',
  },
  footer: {
    marginTop: 30,
  },
};

const globalStyles = `
  :root { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  .cardLink { text-decoration: none; outline: none; }

  /* Gradient text helpers */
  .grad.violet{ background: linear-gradient(90deg, ${violet}, #a78bfa); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .grad.sunrise{ background: linear-gradient(90deg, ${pink}, ${peach}); -webkit-background-clip:text; background-clip:text; color:transparent; }

  /* Badges row */
  .badges{
    display:flex; gap:10px; flex-wrap:wrap;
    width:100%; max-width:1120px; margin:2px auto 12px;
  }
  .pill{
    display:inline-flex; align-items:center; gap:8px;
    padding:8px 12px; border-radius:999px; font-size:12.5px;
    border:1px solid rgba(255,255,255,.1);
    background: rgba(255,255,255,.04);
    box-shadow: 0 8px 30px rgba(0,0,0,.35), inset 0 0 12px rgba(255,255,255,.04);
    color:#e5e7eb;
  }
  .pill svg{ color:#fbbf24; }
  .pill-amber{ border-color: rgba(251,191,36,.25); }
  .pill-green{ border-color: rgba(16,185,129,.22); }
  .pill .dot{
    width:8px; height:8px; border-radius:999px; background:#16a34a;
    box-shadow:0 0 6px rgba(34,197,94,.8);
    display:inline-block;
  }

  /* Card entrance + stagger */
  .card{
    opacity:0; transform: translateY(10px) scale(.98);
    animation: enter .55s ease-out forwards;
  }
  .card:nth-child(1){ animation-delay:.08s; }
  .card:nth-child(2){ animation-delay:.16s; }
  .card:nth-child(3){ animation-delay:.24s; }
  @keyframes enter{ to{ opacity:1; transform: translateY(0) scale(1); } }

  .fade-in{ opacity:0; transform:translateY(-6px); animation: fadeUp .55s ease-out .06s forwards; }
  @keyframes fadeUp{ to{ opacity:1; transform:translateY(0); } }

  /* 3D tilt + border glow */
  .tilt{ transition: transform .2s ease, box-shadow .25s ease, border-color .2s ease; }
  .tilt:hover{ transform: translateY(-8px) perspective(1000px) rotateX(2deg) rotateY(-2deg) scale(1.02); }
  .tilt:focus-within{ transform: translateY(-4px) scale(1.01); }
  .glow::before{
    content:""; position:absolute; inset:-1px; border-radius: 18px;
    background: conic-gradient(from 180deg, rgba(139,92,246,.16), rgba(244,114,182,.16), rgba(252,165,165,.16));
    filter: blur(16px); opacity:0; transition: opacity .25s ease; z-index:-1;
  }
  .glow:hover::before{ opacity:1; }

  /* "NEW" badge on Whack-a-Mole */
  .newBadge::after{
    content:"NEW";
    position:absolute; top:10px; right:10px;
    font-size:10.5px; letter-spacing:.12em; font-weight:800;
    padding:4px 8px; border-radius:999px;
    background: linear-gradient(90deg, ${violet}, ${pink});
    color:#0b0e13;
    box-shadow: 0 8px 18px rgba(139,92,246,.35);
  }

  /* CTA shine */
  .ctaShine{ position:relative; }
  .ctaShine::after{
    content:""; position:absolute; inset:0;
    background: linear-gradient(115deg, transparent 20%, rgba(255,255,255,.2) 50%, transparent 80%);
    transform: translateX(-120%) skewX(-20deg);
    animation: shine 2.4s ease-in-out infinite;
  }
  @keyframes shine{
    to{ transform: translateX(120%) skewX(-20deg); }
  }

  /* Cosmic background vibes */
  .cosmic{
    background:
      radial-gradient(1200px 700px at 80% 10%, rgba(168,85,247,.10), transparent 60%),
      radial-gradient(1000px 700px at 12% 20%, rgba(244,114,182,.08), transparent 60%),
      ${bg};
  }
  .orb{ position:absolute; border-radius:50%; filter: blur(50px); mix-blend-mode: screen; opacity:.45; }
  .orb1{ width:560px; height:560px; right:-160px; top:-120px; background: radial-gradient(closest-side, rgba(139,92,246,.45), transparent); animation: float1 18s ease-in-out infinite; }
  .orb2{ width:420px; height:420px; left:-140px; top:120px; background: radial-gradient(closest-side, rgba(244,114,182,.35), transparent); animation: float2 22s ease-in-out infinite; }
  .orb3{ width:520px; height:520px; right:10%; bottom:-220px; background: radial-gradient(closest-side, rgba(252,165,165,.28), transparent); animation: float3 26s ease-in-out infinite; }
  @keyframes float1{ 0%{transform:translateY(0)} 50%{transform:translateY(18px)} 100%{transform:translateY(0)} }
  @keyframes float2{ 0%{transform:translateY(0)} 50%{transform:translateY(-22px)} 100%{transform:translateY(0)} }
  @keyframes float3{ 0%{transform:translateY(0)} 50%{transform:translateY(20px)} 100%{transform:translateY(0)} }

  /* Tiny stars */
  .stars{
    position:absolute; inset:0; pointer-events:none; opacity:.35;
    background-image:
      radial-gradient(2px 2px at 10% 20%, rgba(255,255,255,.6), transparent 60%),
      radial-gradient(1px 1px at 20% 70%, rgba(255,255,255,.5), transparent 60%),
      radial-gradient(1.5px 1.5px at 65% 35%, rgba(255,255,255,.5), transparent 60%),
      radial-gradient(1px 1px at 80% 60%, rgba(255,255,255,.5), transparent 60%),
      radial-gradient(1.5px 1.5px at 40% 15%, rgba(255,255,255,.45), transparent 60%);
  }

  /* Focus ring */
  article:focus { box-shadow: 0 0 0 4px rgba(139,92,246,0.22); border-color: ${violet}; }

  @media (max-width: 720px){
    .landing{ padding: 36px 16px 28px; }
    h1{ font-size: 28px !important; }
  }
`;
