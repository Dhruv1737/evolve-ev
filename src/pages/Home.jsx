import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function useReveal(threshold) {
  var t = threshold || 0.1;
  var ref = useRef(null);
  var s = useState(false);
  var visible = s[0];
  var setVisible = s[1];
  useEffect(function() {
    var observer = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: t });
    if (ref.current) observer.observe(ref.current);
    return function() { observer.disconnect(); };
  }, []);
  return [ref, visible];
}

function Counter(props) {
  var target   = props.target;
  var suffix   = props.suffix || '';
  var prefix   = props.prefix || '';
  var duration = props.duration || 2200;
  var s = useState(0);
  var count    = s[0];
  var setCount = s[1];
  var ref      = useRef(null);
  var started  = useRef(false);

  useEffect(function() {
    var observer = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        var start = performance.now();
        function tick(now) {
          var progress = Math.min((now - start) / duration, 1);
          var ease = 1 - Math.pow(1 - progress, 4);
          setCount(Math.floor(ease * target));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return function() { observer.disconnect(); };
  }, [target, duration]);

  return React.createElement('span', { ref: ref }, prefix + count + suffix);
}

var HIGHLIGHTS = [
  {
    tag:   'Exhibition',
    title: 'EV Grand Showcase',
    desc:  'Production vehicles, concept cars, and working prototypes from India\'s leading manufacturers.',
    stat:  '30+ Brands',
  },
  {
    tag:   'Competition',
    title: 'Speed Trials',
    desc:  'Student-built electric vehicles race on a purpose-built track. Peak torque, zero emissions.',
    stat:  '₹1.5L Prize',
  },
  {
    tag:   'Knowledge',
    title: 'Battery Symposium',
    desc:  'Solid-state cells, silicon anodes, ultra-fast charging — the science of tomorrow\'s batteries.',
    stat:  '12 Speakers',
  },
  {
    tag:   'Challenge',
    title: 'EV Hackathon',
    desc:  '48 hours to prototype EV solutions. Mentored by industry leaders. Judged by investors.',
    stat:  '₹5L Prize',
  },
  {
    tag:   'Summit',
    title: 'Green Future',
    desc:  'Policy, infrastructure, and India\'s path to 30% EV adoption by 2030.',
    stat:  'Open Access',
  },
  {
    tag:   'Workshop',
    title: 'Charging Lab',
    desc:  'Hands-on configuration of real EV charging stations. V2G, smart grid, and demand response.',
    stat:  '60 Seats',
  },
];

export default function Home() {
  var heroState      = useState(false);
  var heroVisible    = heroState[0];
  var setHeroVisible = heroState[1];

  var r1 = useReveal(0.08);
  var bentoRef     = r1[0];
  var bentoVisible = r1[1];

  var r2 = useReveal();
  var eventsRef     = r2[0];
  var eventsVisible = r2[1];

  var r3 = useReveal();
  var ctaRef     = r3[0];
  var ctaVisible = r3[1];

  useEffect(function() {
    var t = setTimeout(function() { setHeroVisible(true); }, 120);
    return function() { clearTimeout(t); };
  }, []);

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ══════════════════════════════════
          HERO — Asymmetric Bleed
      ══════════════════════════════════ */}
      <section style={{
        minHeight:      '100vh',
        display:        'flex',
        alignItems:     'center',
        position:       'relative',
        overflow:       'hidden',
        paddingTop:     100,
        paddingBottom:  60,
      }}>

        {/* Full bleed background image — right side bleeds off screen */}
        <div style={{
          position:           'absolute',
          top: 0, right: -40, bottom: 0,
          width:              '58%',
          backgroundImage:    'url(https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1400&q=90)',
          backgroundSize:     'cover',
          backgroundPosition: 'center left',
          filter:             'brightness(0.45) contrast(1.15) saturate(0.4)',
        }} />

        {/* Left fade mask */}
        <div style={{
          position:   'absolute',
          top: 0, left: 0, bottom: 0,
          width:      '55%',
          background: 'linear-gradient(90deg, var(--charcoal) 55%, transparent 100%)',
          zIndex:     1,
        }} />

        {/* Bottom fade */}
        <div style={{
          position:   'absolute',
          bottom: 0, left: 0, right: 0,
          height:     '30%',
          background: 'linear-gradient(0deg, var(--charcoal) 0%, transparent 100%)',
          zIndex:     1,
        }} />

        {/* Subtle copper vertical line */}
        <div style={{
          position:   'absolute',
          top: '15%', bottom: '15%',
          left:       '42%',
          width:      1,
          background: 'linear-gradient(180deg, transparent, rgba(184,115,51,0.3), transparent)',
          zIndex:     2,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div style={{ maxWidth: 620 }}>

            {/* Eyebrow */}
            <div style={{
              opacity:    heroVisible ? 1 : 0,
              transform:  heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.6s ease 0.1s',
            }}>
              <div className="eyebrow" style={{ marginBottom: 32 }}>
                NIT Bhopal &nbsp;·&nbsp; March 14–16, 2026
              </div>
            </div>

            {/* Main headline — editorial serif */}
            <div style={{
              opacity:    heroVisible ? 1 : 0,
              transform:  heroVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.8s ease 0.2s',
            }}>
              <h1 style={{
                fontFamily:    'var(--font-serif)',
                fontSize:      'clamp(3.8rem, 7.5vw, 7rem)',
                fontWeight:    300,
                lineHeight:    1.0,
                letterSpacing: '-0.01em',
                color:         'var(--pearl)',
                marginBottom:  0,
              }}>
                <span style={{ display: 'block' }}>The</span>
                <span style={{
                  display:     'block',
                  fontStyle:   'italic',
                  color:       'var(--copper-light)',
                }}>
                  Electric
                </span>
                <span style={{ display: 'block' }}>Future</span>
                <span style={{
                  display:       'block',
                  fontFamily:    'var(--font-wide)',
                  fontSize:      '38%',
                  fontStyle:     'normal',
                  fontWeight:    800,
                  letterSpacing: '0.28em',
                  color:         'var(--pearl-muted)',
                  marginTop:     12,
                }}>
                  IS NOW
                </span>
              </h1>
            </div>

            {/* Description */}
            <div style={{
              opacity:    heroVisible ? 1 : 0,
              transform:  heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.8s ease 0.38s',
            }}>
              <p style={{
                fontFamily:  'var(--font-body)',
                fontSize:    '1rem',
                fontWeight:  300,
                color:       'var(--pearl-muted)',
                lineHeight:  1.8,
                maxWidth:    460,
                margin:      '32px 0 44px',
              }}>
                India's most anticipated student-led electric vehicle conclave.
                Three days of engineering, competition, and the conversations
                that will shape how a billion people move.
              </p>
            </div>

            {/* CTA row */}
            <div style={{
              display:    'flex',
              gap:        16,
              flexWrap:   'wrap',
              opacity:    heroVisible ? 1 : 0,
              transform:  heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.8s ease 0.5s',
            }}>
              <Link to="/vidyut-26">
                <button className="btn-primary">
                  <span>Explore Vidyut 26</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </Link>
              <Link to="/about">
                <button className="btn-ghost">
                  <span>About EVOLVE</span>
                </button>
              </Link>
            </div>

            {/* Meta strip */}
            <div style={{
              display:    'flex',
              gap:        0,
              marginTop:  64,
              opacity:    heroVisible ? 1 : 0,
              transition: 'all 0.8s ease 0.62s',
            }}>
              {[
                { label: 'Edition',  value: '26th Annual' },
                { label: 'Venue',    value: 'NIT Bhopal'  },
                { label: 'Entry',    value: 'Free — Open' },
              ].map(function(item, i) {
                return (
                  <div key={item.label} style={{
                    paddingRight: 32,
                    marginRight:  32,
                    borderRight:  i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}>
                    <div style={{
                      fontFamily:    'var(--font-wide)',
                      fontSize:      '0.52rem',
                      fontWeight:    600,
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color:         'var(--pearl-ghost)',
                      marginBottom:  5,
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontFamily:    'var(--font-body)',
                      fontSize:      '0.85rem',
                      fontWeight:    400,
                      color:         'var(--pearl-dim)',
                    }}>
                      {item.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position:   'absolute',
          bottom:     40,
          left:       56,
          zIndex:     4,
          display:    'flex',
          alignItems: 'center',
          gap:        14,
          opacity:    heroVisible ? 0.5 : 0,
          transition: 'opacity 1s ease 1.2s',
        }}>
          <div style={{
            width:      40,
            height:     1,
            background: 'var(--copper)',
            animation:  'lineGrow 1s ease 1.5s both',
            transformOrigin: 'left',
          }} />
          <div style={{
            fontFamily:    'var(--font-wide)',
            fontSize:      '0.52rem',
            fontWeight:    600,
            letterSpacing: '0.3em',
            color:         'var(--pearl-ghost)',
            textTransform: 'uppercase',
          }}>
            Scroll
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════
          BENTO GRID — Stats + Highlight
      ══════════════════════════════════ */}
      <section className="section-sm" ref={bentoRef}>
        <div className="container">

          <div style={{
            display:             'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gridTemplateRows:    'auto auto',
            gap:                 16,
          }}
            className="bento-master"
          >

            {/* Tile A — Large: Image + statement */}
            <div style={{
              gridRow:      'span 2',
              position:     'relative',
              overflow:     'hidden',
              minHeight:    480,
              background:   'var(--charcoal-2)',
              border:       'var(--border)',
              opacity:      bentoVisible ? 1 : 0,
              transform:    bentoVisible ? 'translateY(0)' : 'translateY(32px)',
              transition:   'all 0.7s ease 0s',
            }}
              className="bento-tile"
            >
              <img
                src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&q=85"
                alt="Electric Vehicle"
                style={{
                  width:      '100%',
                  height:     '100%',
                  objectFit:  'cover',
                  position:   'absolute',
                  inset:      0,
                  filter:     'brightness(0.4) contrast(1.2) saturate(0.35)',
                  transition: 'transform 0.8s ease, filter 0.6s ease',
                }}
                onMouseEnter={function(e) {
                  e.currentTarget.style.transform = 'scale(1.04)';
                  e.currentTarget.style.filter    = 'brightness(0.5) contrast(1.15) saturate(0.45)';
                }}
                onMouseLeave={function(e) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.filter    = 'brightness(0.4) contrast(1.2) saturate(0.35)';
                }}
              />

              {/* Gradient overlay */}
              <div style={{
                position:   'absolute',
                inset:      0,
                background: 'linear-gradient(135deg, rgba(10,10,11,0.85) 0%, rgba(10,10,11,0.3) 60%, transparent 100%)',
              }} />

              {/* Content */}
              <div style={{
                position: 'absolute',
                inset:    0,
                padding:  '44px 40px',
                display:  'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div className="badge" style={{ alignSelf: 'flex-start' }}>
                  Live Showcase — Mar 14
                </div>

                <div>
                  <div style={{
                    fontFamily:    'var(--font-serif)',
                    fontSize:      'clamp(1.8rem, 3vw, 2.8rem)',
                    fontWeight:    300,
                    fontStyle:     'italic',
                    color:         'var(--pearl)',
                    lineHeight:    1.15,
                    marginBottom:  16,
                  }}>
                    India's largest student EV showcase returns
                  </div>
                  <div style={{
                    fontFamily:    'var(--font-wide)',
                    fontSize:      '0.6rem',
                    fontWeight:    600,
                    letterSpacing: '0.2em',
                    color:         'var(--copper)',
                    textTransform: 'uppercase',
                  }}>
                    30+ Exhibitors · 3 Days · NIT Bhopal
                  </div>
                </div>
              </div>
            </div>

            {/* Tile B — CO2 counter */}
            <div style={{
              background:  'var(--charcoal-2)',
              border:      'var(--border)',
              padding:     '36px 32px',
              display:     'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              opacity:     bentoVisible ? 1 : 0,
              transform:   bentoVisible ? 'translateY(0)' : 'translateY(32px)',
              transition:  'all 0.7s ease 0.1s',
              position:    'relative',
              overflow:    'hidden',
            }}
              className="bento-tile"
            >
              <div style={{
                fontFamily:    'var(--font-wide)',
                fontSize:      '0.55rem',
                fontWeight:    600,
                letterSpacing: '0.25em',
                color:         'var(--pearl-ghost)',
                textTransform: 'uppercase',
              }}>
                CO₂ Avoided
              </div>
              <div>
                <div style={{
                  fontFamily:  'var(--font-serif)',
                  fontSize:    'clamp(2.5rem, 4vw, 3.8rem)',
                  fontWeight:  300,
                  color:       'var(--copper-light)',
                  lineHeight:  1,
                  marginBottom: 8,
                }}>
                  <Counter target={1200} prefix="" suffix="K" />
                  <span style={{ fontSize: '40%', fontFamily: 'var(--font-wide)', fontWeight: 600, letterSpacing: '0.1em', marginLeft: 6, color: 'var(--pearl-muted)', verticalAlign: 'middle' }}>TONS</span>
                </div>
                <div style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '0.78rem',
                  fontWeight:    300,
                  color:         'var(--pearl-muted)',
                  lineHeight:    1.6,
                }}>
                  Projected annual impact of Vidyut alumni startups
                </div>
              </div>

              {/* Copper corner accent */}
              <div style={{
                position: 'absolute',
                bottom: 0, right: 0,
                width: 60, height: 60,
                borderTop:  '1px solid rgba(184,115,51,0.15)',
                borderLeft: '1px solid rgba(184,115,51,0.15)',
              }} />
            </div>

            {/* Tile C — Attendees */}
            <div style={{
              background:     'var(--copper)',
              padding:        '36px 32px',
              display:        'flex',
              flexDirection:  'column',
              justifyContent: 'space-between',
              opacity:        bentoVisible ? 1 : 0,
              transform:      bentoVisible ? 'translateY(0)' : 'translateY(32px)',
              transition:     'all 0.7s ease 0.18s',
              position:       'relative',
              overflow:       'hidden',
            }}
              className="bento-tile"
            >
              <div style={{
                fontFamily:    'var(--font-wide)',
                fontSize:      '0.55rem',
                fontWeight:    600,
                letterSpacing: '0.25em',
                color:         'rgba(10,10,11,0.6)',
                textTransform: 'uppercase',
              }}>
                Expected Footfall
              </div>
              <div>
                <div style={{
                  fontFamily:   'var(--font-serif)',
                  fontSize:     'clamp(2.5rem, 4vw, 3.8rem)',
                  fontWeight:   300,
                  color:        'var(--black)',
                  lineHeight:   1,
                  marginBottom: 8,
                }}>
                  <Counter target={5000} suffix="+" />
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '0.78rem',
                  fontWeight: 400,
                  color:      'rgba(10,10,11,0.65)',
                  lineHeight: 1.6,
                }}>
                  Attendees across 3 days of Vidyut 26
                </div>
              </div>
            </div>

            {/* Tile D — Hackathon prize */}
            <div style={{
              background:     'var(--charcoal-3)',
              border:         'var(--border)',
              padding:        '36px 32px',
              display:        'flex',
              flexDirection:  'column',
              justifyContent: 'space-between',
              opacity:        bentoVisible ? 1 : 0,
              transform:      bentoVisible ? 'translateY(0)' : 'translateY(32px)',
              transition:     'all 0.7s ease 0.26s',
            }}
              className="bento-tile"
            >
              <div style={{
                fontFamily:    'var(--font-wide)',
                fontSize:      '0.55rem',
                fontWeight:    600,
                letterSpacing: '0.25em',
                color:         'var(--pearl-ghost)',
                textTransform: 'uppercase',
              }}>
                Total Prize Pool
              </div>
              <div>
                <div style={{
                  fontFamily:   'var(--font-serif)',
                  fontSize:     'clamp(2.2rem, 3.5vw, 3.2rem)',
                  fontWeight:   300,
                  color:        'var(--pearl)',
                  lineHeight:   1,
                  marginBottom: 8,
                }}>
                  ₹6.5L
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '0.78rem',
                  fontWeight: 300,
                  color:      'var(--pearl-muted)',
                  lineHeight: 1.6,
                }}>
                  Across Speed Trials, Hackathon and Design challenges
                </div>
              </div>
            </div>

            {/* Tile E — CTA */}
            <div style={{
              background:  'var(--charcoal-2)',
              border:      'var(--border-copper)',
              padding:     '36px 32px',
              display:     'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              opacity:     bentoVisible ? 1 : 0,
              transform:   bentoVisible ? 'translateY(0)' : 'translateY(32px)',
              transition:  'all 0.7s ease 0.34s',
              position:    'relative',
              overflow:    'hidden',
            }}
              className="bento-tile"
            >
              <div style={{
                fontFamily:    'var(--font-serif)',
                fontSize:      '1.3rem',
                fontWeight:    300,
                fontStyle:     'italic',
                color:         'var(--pearl)',
                lineHeight:    1.3,
                marginBottom:  20,
              }}>
                Register now — entry is completely free
              </div>
              <Link to="/vidyut-26">
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Join the Movement</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </Link>

              {/* Shimmer */}
              <div style={{
                position:   'absolute',
                inset:      0,
                background: 'linear-gradient(105deg, transparent 40%, rgba(184,115,51,0.04) 50%, transparent 60%)',
                backgroundSize: '200% auto',
                animation:  'shimmer 5s linear infinite',
                pointerEvents: 'none',
              }} />
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════
          EVENTS GRID
      ══════════════════════════════════ */}
      <section className="section" ref={eventsRef}>
        <div className="container">

          <div style={{
            display:        'flex',
            alignItems:     'flex-end',
            justifyContent: 'space-between',
            marginBottom:   64,
            flexWrap:       'wrap',
            gap:            24,
          }}>
            <div>
              <div className="eyebrow">What Awaits You</div>
              <h2 style={{
                fontFamily:    'var(--font-serif)',
                fontSize:      'clamp(2.4rem, 5vw, 4.2rem)',
                fontWeight:    300,
                color:         'var(--pearl)',
                lineHeight:    1.05,
              }}>
                Six Days of<br />
                <span style={{ fontStyle: 'italic', color: 'var(--copper-light)' }}>
                  Electric Possibility
                </span>
              </h2>
            </div>
            <Link to="/vidyut-26">
              <button className="btn-ghost">
                <span>View All Events</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </Link>
          </div>

          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 2,
          }}
            className="events-grid"
          >
            {HIGHLIGHTS.map(function(item, i) {
              return (
                <div
                  key={item.title}
                  style={{
                    padding:    '40px 36px',
                    background: i % 2 === 0 ? 'var(--charcoal-2)' : 'var(--charcoal-3)',
                    border:     'var(--border)',
                    borderRadius: 0,
                    position:   'relative',
                    overflow:   'hidden',
                    cursor:     'default',
                    opacity:    eventsVisible ? 1 : 0,
                    transform:  eventsVisible ? 'translateY(0)' : 'translateY(28px)',
                    transition: 'all 0.6s ease ' + (i * 0.07) + 's',
                  }}
                  onMouseEnter={function(e) {
                    e.currentTarget.style.borderColor   = 'rgba(184,115,51,0.25)';
                    e.currentTarget.style.background    = 'var(--charcoal-3)';
                  }}
                  onMouseLeave={function(e) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.background  = i % 2 === 0 ? 'var(--charcoal-2)' : 'var(--charcoal-3)';
                  }}
                >
                  {/* Index number */}
                  <div style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.6rem',
                    color:         'var(--pearl-ghost)',
                    letterSpacing: '0.15em',
                    marginBottom:  24,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Tag */}
                  <div style={{
                    fontFamily:    'var(--font-wide)',
                    fontSize:      '0.55rem',
                    fontWeight:    600,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color:         'var(--copper)',
                    marginBottom:  14,
                  }}>
                    {item.tag}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily:    'var(--font-serif)',
                    fontSize:      'clamp(1.3rem, 2vw, 1.7rem)',
                    fontWeight:    400,
                    color:         'var(--pearl)',
                    lineHeight:    1.2,
                    marginBottom:  14,
                  }}>
                    {item.title}
                  </h3>

                  {/* Desc */}
                  <p style={{
                    fontFamily:  'var(--font-body)',
                    fontSize:    '0.85rem',
                    fontWeight:  300,
                    color:       'var(--pearl-muted)',
                    lineHeight:  1.75,
                    marginBottom: 28,
                  }}>
                    {item.desc}
                  </p>

                  {/* Stat */}
                  <div style={{
                    display:       'flex',
                    alignItems:    'center',
                    gap:           10,
                    paddingTop:    20,
                    borderTop:     '1px solid rgba(255,255,255,0.05)',
                    fontFamily:    'var(--font-wide)',
                    fontSize:      '0.6rem',
                    fontWeight:    600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color:         'var(--copper-light)',
                  }}>
                    <div style={{
                      width: 20, height: 1,
                      background: 'var(--copper)',
                      opacity: 0.5,
                      flexShrink: 0,
                    }} />
                    {item.stat}
                  </div>

                  {/* Hover top border */}
                  <div style={{
                    position:   'absolute',
                    top: 0, left: 0, right: 0,
                    height:     1,
                    background: 'linear-gradient(90deg, transparent, rgba(184,115,51,0.35), transparent)',
                    opacity:    0,
                    transition: 'opacity 0.3s ease',
                  }}
                    className="hover-line"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════
          CTA BANNER
      ══════════════════════════════════ */}
      <section className="section-sm" ref={ctaRef}>
        <div className="container">
          <div style={{
            display:        'grid',
            gridTemplateColumns: '1fr auto',
            alignItems:     'center',
            gap:            60,
            padding:        '64px 72px',
            background:     'var(--charcoal-2)',
            border:         'var(--border)',
            position:       'relative',
            overflow:       'hidden',
            opacity:        ctaVisible ? 1 : 0,
            transform:      ctaVisible ? 'translateY(0)' : 'translateY(24px)',
            transition:     'all 0.7s ease',
          }}
            className="cta-banner"
          >

            {/* Copper corner */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0,
              width: 120, height: 120,
              background: 'radial-gradient(circle at 0% 0%, rgba(184,115,51,0.08) 0%, transparent 70%)',
            }} />

            {/* Left */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                Limited Registration
              </div>
              <h2 style={{
                fontFamily:    'var(--font-serif)',
                fontSize:      'clamp(2rem, 3.5vw, 3rem)',
                fontWeight:    300,
                color:         'var(--pearl)',
                lineHeight:    1.1,
                marginBottom:  16,
              }}>
                Ready to be part of the{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--copper-light)' }}>
                  revolution?
                </span>
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '0.9rem',
                fontWeight: 300,
                color:      'var(--pearl-muted)',
                lineHeight: 1.75,
                maxWidth:   480,
              }}>
                Join 5,000 engineers, researchers, and EV professionals
                at India's most ambitious electric mobility event of 2026.
                Free entry. No registration fee.
              </p>
            </div>

            {/* Right */}
            <div style={{
              display:        'flex',
              flexDirection:  'column',
              gap:            12,
              flexShrink:     0,
              position:       'relative',
              zIndex:         1,
            }}>
              <Link to="/vidyut-26">
                <button className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                  <span>Register for Vidyut 26</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </Link>
              <Link to="/founders">
                <button className="btn-ghost" style={{ whiteSpace: 'nowrap' }}>
                  <span>Meet the Founders</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .bento-master { grid-template-columns: 1fr 1fr !important; }
          .events-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .cta-banner   { grid-template-columns: 1fr !important; padding: 48px 40px !important; }
        }
        @media (max-width: 700px) {
          .bento-master { grid-template-columns: 1fr !important; }
          .events-grid  { grid-template-columns: 1fr !important; }
          .cta-banner   { padding: 36px 24px !important; }
        }
      `}</style>
    </div>
  );
}