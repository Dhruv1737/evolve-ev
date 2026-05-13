import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// ── Animated counter ──
function Counter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(ease * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Scroll reveal hook ──
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

// ── Glitch text ──
function GlitchText({ text, style }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block', ...style }}>
      <span style={{ position: 'relative', zIndex: 2 }}>{text}</span>
      <span style={{
        position: 'absolute', inset: 0, zIndex: 1,
        color: 'var(--green-300)',
        animation: 'glitch-1 4s infinite',
        clipPath: 'inset(0 0 95% 0)',
      }}>{text}</span>
      <span style={{
        position: 'absolute', inset: 0, zIndex: 1,
        color: 'var(--accent)',
        animation: 'glitch-2 4s infinite 0.5s',
        clipPath: 'inset(80% 0 5% 0)',
      }}>{text}</span>
    </div>
  );
}

const STATS = [
  { value: 26,   suffix: 'th', label: 'Edition',        desc: 'Annual EV Conclave' },
  { value: 5000, suffix: '+',  label: 'Attendees',       desc: 'Expected footfall' },
  { value: 48,   suffix: 'h',  label: 'Of Innovation',   desc: 'Non-stop events' },
  { value: 30,   suffix: '+',  label: 'Exhibitors',      desc: 'EV brands & startups' },
];

const HIGHLIGHTS = [
  {
    icon: '⚡',
    title: 'Live EV Showcase',
    desc: 'Experience the latest electric vehicles from top manufacturers up close. Test drives, tech demos, and live walkthroughs.',
    tag: 'EXHIBITION',
  },
  {
    icon: '🏁',
    title: 'Speed Trials',
    desc: 'Watch electric vehicles compete in timed acceleration runs. Raw power, zero emissions, maximum thrill.',
    tag: 'COMPETITION',
  },
  {
    icon: '🧠',
    title: 'Tech Symposium',
    desc: 'Industry leaders and researchers share breakthroughs in battery tech, charging infra, and EV policy.',
    tag: 'KNOWLEDGE',
  },
  {
    icon: '🔋',
    title: 'Battery Innovation Lab',
    desc: 'Hands-on with next-gen solid-state batteries, fast-charging prototypes, and energy storage solutions.',
    tag: 'WORKSHOP',
  },
  {
    icon: '🌍',
    title: 'Green Future Summit',
    desc: 'Panel discussions on sustainable mobility, carbon neutrality, and India\'s EV roadmap to 2030.',
    tag: 'SUMMIT',
  },
  {
    icon: '🏆',
    title: 'EV Hackathon',
    desc: '48-hour challenge to prototype innovative EV solutions. Prizes worth ₹5 Lakhs up for grabs.',
    tag: 'CHALLENGE',
  },
];

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsRef, statsVisible] = useReveal();
  const [highlightsRef, highlightsVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();
  const canvasRef = useRef(null);

  // Hero entrance
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // ── Electric arc canvas ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const arcs = [...Array(6)].map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 120 + 60,
      alpha: Math.random() * 0.12 + 0.04,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      arcs.forEach(a => {
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > canvas.width)  a.vx *= -1;
        if (a.y < 0 || a.y > canvas.height) a.vy *= -1;
        const g = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, a.r);
        g.addColorStop(0, `rgba(46,204,55,${a.alpha})`);
        g.addColorStop(1, 'rgba(46,204,55,0)');
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ════════════════════════════════
          HERO SECTION
      ════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 100,
      }}>
        {/* Canvas background */}
        <canvas ref={canvasRef} style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
        }} />

        {/* Diagonal accent line */}
        <div style={{
          position: 'absolute',
          top: 0, right: '25%',
          width: 1, height: '100%',
          background: 'linear-gradient(180deg, transparent, rgba(46,204,55,0.15), transparent)',
          transform: 'skewX(-15deg)',
        }} />
        <div style={{
          position: 'absolute',
          top: 0, right: '45%',
          width: 1, height: '100%',
          background: 'linear-gradient(180deg, transparent, rgba(46,204,55,0.07), transparent)',
          transform: 'skewX(-15deg)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: 80,
            minHeight: '80vh',
          }}
            className="hero-grid"
          >

            {/* ── Left: Text ── */}
            <div>
              {/* Badge */}
              <div style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.1s',
              }}>
                <span className="badge" style={{ marginBottom: 28, display: 'inline-flex' }}>
                  EV Day 2026 — Vidyut 26
                </span>
              </div>

              {/* Main headline */}
              <div style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.7s ease 0.2s',
              }}>
                <h1 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(4rem, 8vw, 7.5rem)',
                  lineHeight: 0.95,
                  letterSpacing: '0.03em',
                  marginBottom: 8,
                }}>
                  <GlitchText
                    text="THE"
                    style={{ color: 'var(--text-secondary)', display: 'block' }}
                  />
                  <span style={{
                    display: 'block',
                    color: 'var(--green-400)',
                    textShadow: '0 0 40px rgba(46,204,55,0.4), 0 0 80px rgba(46,204,55,0.15)',
                  }}>
                    ELECTRIC
                  </span>
                  <span style={{
                    display: 'block',
                    color: 'var(--text-primary)',
                    WebkitTextStroke: '1px rgba(46,204,55,0.3)',
                  }}>
                    FUTURE
                  </span>
                  <span style={{
                    display: 'block',
                    color: 'var(--text-secondary)',
                    fontSize: '60%',
                    letterSpacing: '0.15em',
                  }}>
                    IS NOW
                  </span>
                </h1>
              </div>

              {/* Subtext */}
              <div style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s ease 0.35s',
              }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  maxWidth: 460,
                  margin: '28px 0 40px',
                }}>
                  India's premier electric vehicle conclave returns.
                  Three days of innovation, competition, and the future
                  of sustainable mobility — all at NIT Bhopal.
                </p>
              </div>

              {/* CTA Buttons */}
              <div style={{
                display: 'flex', gap: 16, flexWrap: 'wrap',
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s ease 0.45s',
              }}>
                <Link to="/vidyut-26">
                  <button className="btn-glow">
                    <span>Explore Vidyut 26</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </Link>
                <Link to="/about">
                  <button className="btn-outline">
                    <span>About EVOLVE</span>
                  </button>
                </Link>
              </div>

              {/* Date strip */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 24,
                marginTop: 56,
                opacity: heroVisible ? 1 : 0,
                transition: 'all 0.7s ease 0.55s',
              }}>
                {[
                  { label: 'DATE', value: 'Mar 14–16, 2026' },
                  { label: 'VENUE', value: 'NIT Bhopal' },
                  { label: 'EDITION', value: '26th Annual' },
                ].map((item, i) => (
                  <React.Fragment key={item.label}>
                    {i > 0 && (
                      <div style={{ width: 1, height: 32, background: 'rgba(46,204,55,0.2)' }} />
                    )}
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.55rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.25em',
                        marginBottom: 4,
                      }}>{item.label}</div>
                      <div style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.78rem',
                        color: 'var(--green-300)',
                        letterSpacing: '0.06em',
                      }}>{item.value}</div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* ── Right: Visual ── */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'scale(1)' : 'scale(0.9)',
              transition: 'all 0.9s ease 0.3s',
            }}>
              {/* Outer spinning ring */}
              <div style={{
                position: 'absolute',
                width: 420, height: 420,
                border: '1px solid rgba(46,204,55,0.1)',
                borderRadius: '50%',
                animation: 'spin-slow 20s linear infinite',
              }}>
                {[0, 90, 180, 270].map(deg => (
                  <div key={deg} style={{
                    position: 'absolute',
                    width: 8, height: 8,
                    background: 'var(--green-500)',
                    borderRadius: '50%',
                    top: '50%', left: '50%',
                    transform: `rotate(${deg}deg) translateX(210px) translate(-50%,-50%)`,
                    boxShadow: '0 0 10px var(--green-500)',
                  }} />
                ))}
              </div>

              {/* Middle ring */}
              <div style={{
                position: 'absolute',
                width: 300, height: 300,
                border: '1px dashed rgba(46,204,55,0.15)',
                borderRadius: '50%',
                animation: 'spin-reverse 14s linear infinite',
              }} />

              {/* Inner ring */}
              <div style={{
                position: 'absolute',
                width: 200, height: 200,
                border: '1px solid rgba(46,204,55,0.2)',
                borderRadius: '50%',
                animation: 'spin-slow 8s linear infinite',
              }} />

              {/* Center logo */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
                animation: 'float 6s ease-in-out infinite',
              }}>
                <div style={{
                  width: 140, height: 140,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(46,204,55,0.12) 0%, rgba(5,10,5,0.8) 70%)',
                  border: '1px solid rgba(46,204,55,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(46,204,55,0.2), inset 0 0 40px rgba(46,204,55,0.05)',
                  animation: 'pulse-glow 3s ease infinite',
                }}>
                  <img
                    src="https://evolve.nitb.in/Evolve_Logo.png"
                    alt="EVOLVE"
                    style={{ width: 90, filter: 'drop-shadow(0 0 16px rgba(46,204,55,0.6))' }}
                  />
                </div>

                {/* Voltage label */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  color: 'var(--green-400)',
                  letterSpacing: '0.1em',
                  textShadow: '0 0 20px rgba(46,204,55,0.5)',
                  animation: 'flicker 8s ease infinite',
                }}>
                  VIDYUT 26
                </div>
              </div>

              {/* Floating data chips */}
              {[
                { label: 'ZERO EMISSION', top: '8%',  left: '5%'  },
                { label: '100% ELECTRIC', top: '8%',  right: '5%' },
                { label: 'NET ZERO 2030', bottom: '8%', left: '5%' },
                { label: 'EV REVOLUTION', bottom: '8%', right: '5%'},
              ].map((chip, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  ...chip,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  color: 'var(--green-500)',
                  letterSpacing: '0.15em',
                  padding: '5px 10px',
                  border: '1px solid rgba(46,204,55,0.2)',
                  background: 'rgba(5,10,5,0.7)',
                  backdropFilter: 'blur(8px)',
                  animation: `float ${5 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.8}s`,
                }}>
                  {chip.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: 40, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 8,
          opacity: heroVisible ? 0.6 : 0,
          transition: 'opacity 1s ease 1s',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.3em',
          }}>SCROLL</div>
          <div style={{
            width: 1, height: 50,
            background: 'linear-gradient(180deg, rgba(46,204,55,0.6), transparent)',
            animation: 'float 2s ease-in-out infinite',
          }} />
        </div>
      </section>

      {/* ════════════════════════════════
          STATS SECTION
      ════════════════════════════════ */}
      <section className="section-sm" ref={statsRef} style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent, rgba(20,83,26,0.06), transparent)',
          pointerEvents: 'none',
        }} />
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
          }}
            className="stats-grid"
          >
            {STATS.map((stat, i) => (
              <div key={stat.label}
                className="card"
                style={{
                  padding: '48px 32px',
                  textAlign: 'center',
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease ${i * 0.1}s`,
                  borderRadius: i === 0 ? '8px 0 0 8px' : i === 3 ? '0 8px 8px 0' : 0,
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                  color: 'var(--green-400)',
                  lineHeight: 1,
                  textShadow: '0 0 30px rgba(46,204,55,0.3)',
                  marginBottom: 4,
                }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.72rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.12em',
                  marginBottom: 6,
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.1em',
                }}>
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          HIGHLIGHTS SECTION
      ════════════════════════════════ */}
      <section className="section" ref={highlightsRef}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              What Awaits You
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: 'var(--text-primary)',
              letterSpacing: '0.04em',
            }}>
              EVENT{' '}
              <span style={{
                color: 'var(--green-400)',
                textShadow: '0 0 30px rgba(46,204,55,0.3)',
              }}>
                HIGHLIGHTS
              </span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}
            className="highlights-grid"
          >
            {HIGHLIGHTS.map((item, i) => (
              <div
                key={item.title}
                className="card"
                style={{
                  padding: '36px 32px',
                  borderRadius: 8,
                  cursor: 'default',
                  opacity: highlightsVisible ? 1 : 0,
                  transform: highlightsVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.6s ease ${i * 0.08}s`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'rgba(46,204,55,0.3)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(46,204,55,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(46,204,55,0.12)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Tag */}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  color: 'var(--green-600)',
                  letterSpacing: '0.25em',
                  marginBottom: 16,
                }}>
                  {item.tag}
                </div>

                {/* Icon */}
                <div style={{
                  fontSize: '2.2rem',
                  marginBottom: 16,
                  filter: 'drop-shadow(0 0 8px rgba(46,204,55,0.3))',
                }}>
                  {item.icon}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.06em',
                  marginBottom: 12,
                  lineHeight: 1.3,
                }}>
                  {item.title}
                </h3>

                {/* Desc */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                }}>
                  {item.desc}
                </p>

                {/* Bottom accent */}
                <div style={{
                  marginTop: 24,
                  height: 2,
                  background: 'linear-gradient(90deg, var(--green-700), transparent)',
                  borderRadius: 1,
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CTA BANNER
      ════════════════════════════════ */}
      <section className="section-sm" ref={ctaRef}>
        <div className="container">
          <div style={{
            position: 'relative',
            padding: '72px 64px',
            border: 'var(--border-bright)',
            borderRadius: 12,
            overflow: 'hidden',
            textAlign: 'center',
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease',
          }}>
            {/* Background glow */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(30,132,38,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Corner accents */}
            {['top-left','top-right','bottom-left','bottom-right'].map(c => (
              <div key={c} style={{
                position: 'absolute',
                [c.includes('top')    ? 'top'    : 'bottom']: 16,
                [c.includes('left')   ? 'left'   : 'right']:  16,
                width: 24, height: 24,
                borderTop:    c.includes('top')    ? '2px solid var(--green-600)' : 'none',
                borderBottom: c.includes('bottom') ? '2px solid var(--green-600)' : 'none',
                borderLeft:   c.includes('left')   ? '2px solid var(--green-600)' : 'none',
                borderRight:  c.includes('right')  ? '2px solid var(--green-600)' : 'none',
              }} />
            ))}

            <div className="section-label" style={{ justifyContent: 'center', marginBottom: 20 }}>
              Limited Seats Available
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: 'var(--text-primary)',
              letterSpacing: '0.04em',
              marginBottom: 16,
              position: 'relative', zIndex: 1,
            }}>
              READY TO BE PART OF THE{' '}
              <span style={{ color: 'var(--green-400)' }}>REVOLUTION?</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              maxWidth: 520,
              margin: '0 auto 40px',
              lineHeight: 1.7,
              position: 'relative', zIndex: 1,
            }}>
              Join thousands of EV enthusiasts, engineers, and innovators
              at India's biggest electric vehicle event of the year.
            </p>
            <div style={{
              display: 'flex', gap: 16,
              justifyContent: 'center', flexWrap: 'wrap',
              position: 'relative', zIndex: 1,
            }}>
              <Link to="/vidyut-26">
                <button className="btn-glow" style={{ padding: '16px 48px', fontSize: '0.8rem' }}>
                  <span>Register for Vidyut 26</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </Link>
              <Link to="/founders">
                <button className="btn-outline">
                  <span>Meet the Founders</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid       { grid-template-columns: 1fr !important; gap: 48px !important; }
          .stats-grid      { grid-template-columns: repeat(2, 1fr) !important; }
          .highlights-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .stats-grid      { grid-template-columns: 1fr 1fr !important; }
          .highlights-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}