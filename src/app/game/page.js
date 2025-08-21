import Link from 'next/link';

export const metadata = {
    title: 'Games — Vibent',
};

export default function GameLandingPage() {
    return (
        <>
            <main style={styles.page}>
                <header style={styles.header}>
                    <h1 style={styles.title}>Vibent Games</h1>
                    <p style={styles.subtitle}>Choose a game — quick, immersive, and themed to match the app</p>
                </header>

                <nav style={styles.grid} aria-label="Game navigation">
                    <Link href="/game/snake" style={styles.cardLink} aria-label="Play Snake">
                        <article style={styles.card} tabIndex={0}>
                            <div style={styles.iconWrap}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.2" />
                                    <path d="M8 16s1-3 4-3 4 3 4 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="8" cy="16" r="1.2" fill="currentColor" />
                                </svg>
                            </div>
                            <h2 style={styles.cardTitle}>Snake</h2>
                            <p style={styles.cardDesc}>Classic arcade snake — quick reflexes, higher score.</p>
                            <span style={styles.cta}>Play →</span>
                        </article>
                    </Link>

                    <Link href="/game/memory_ripple" style={styles.cardLink} aria-label="Play Memory Ripple">
                        <article style={styles.card} tabIndex={0}>
                            <div style={styles.iconWrap}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.2"/>
                                    <path d="M12 5v0M12 19v0M5 12h0M19 12h0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <h2 style={styles.cardTitle}>Memory Ripple</h2>
                            <p style={styles.cardDesc}>Pattern memory game with soft ripple effects.</p>
                            <span style={styles.cta}>Play →</span>
                        </article>
                    </Link>
                </nav>

                <footer style={styles.footer}>
                    <small style={{ color: 'rgba(255,255,255,0.6)' }}>Tip: Use Tab to focus a card, Enter to open.</small>
                </footer>
            </main>

            <style>{globalStyles}</style>
        </>
    );
}

const accent = '#6ee7b7';
const bg = '#061826';
const cardBg = 'rgba(255,255,255,0.03)';
const glass = 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))';

const styles = {
    page: {
        minHeight: '100vh',
        padding: '48px 24px',
        background: `radial-gradient(1200px 600px at 10% 10%, rgba(110,231,183,0.06), transparent), ${bg}`,
        color: '#E6F6F2',
        fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        maxWidth: 920,
        textAlign: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        margin: 0,
        letterSpacing: '-0.02em',
    },
    subtitle: {
        margin: '8px 0 0',
        color: 'rgba(230,246,242,0.8)',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 20,
        width: '100%',
        maxWidth: 920,
        marginTop: 12,
    },
    cardLink: {
        textDecoration: 'none',
        outline: 'none',
    },
    card: {
        background: `${glass}`,
        border: `1px solid rgba(110,231,183,0.06)`,
        padding: 18,
        borderRadius: 14,
        minHeight: 140,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        boxShadow: `0 6px 20px rgba(2,6,23,0.6)`,
        transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
        cursor: 'pointer',
    },
    iconWrap: {
        color: accent,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 56,
        height: 56,
        borderRadius: 12,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
    },
    cardTitle: {
        margin: 0,
        fontSize: 16,
    },
    cardDesc: {
        margin: 0,
        color: 'rgba(230,246,242,0.75)',
        fontSize: 13,
        flex: 1,
    },
    cta: {
        alignSelf: 'flex-end',
        color: accent,
        fontWeight: 600,
    },
    footer: {
        marginTop: 28,
    },
};

const globalStyles = `
    :root { -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }
    a:focus { outline: none; }
    article:focus { box-shadow: 0 0 0 4px rgba(110,231,183,0.08); transform: translateY(-4px); border-color: ${accent}; }
    a:hover article, a:focus article { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(2,6,23,0.7); border-color: ${accent}; }
    @media (max-width: 640px) {
        main { padding: 28px 16px; }
        h1 { font-size: 22px; }
    }
`;