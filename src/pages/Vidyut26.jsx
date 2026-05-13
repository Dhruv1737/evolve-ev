import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

const EVENTS = [
  {
    id: '01',
    title: 'EV Grand Showcase',
    category: 'EXHIBITION',
    date: 'Mar 14, 2026',
    time: '10:00 AM',
    desc: 'The centrepiece of Vidyut 26 — a sprawling exhibition of production EVs, concept vehicles, and working prototypes from India\'s leading manufacturers and global brands. Walk the floor and witness firsthand how electric mobility has evolved from niche novelty to mainstream powerhouse. From two-wheelers to heavy electric trucks, every segment of the EV ecosystem is represented. Engineers and designers will be on hand for live walkthroughs, detailed tech breakdowns, and Q&A sessions.',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    prize: null,
    spots: 'Open to All',
  },
  {
    id: '02',
    title: 'Vidyut Speed Trials',
    category: 'COMPETITION',
    date: 'Mar 14, 2026',
    time: '2:00 PM',
    desc: 'Buckle up for the most adrenaline-charged event of the year. Student-built electric vehicles go head-to-head in timed acceleration runs across a specially designed track on the NIT Bhopal campus. Teams from universities across India compete in multiple categories — from lightweight two-wheelers to full-scale electric karts. Each run is a testament to months of engineering, sleepless nights, and sheer innovation. Witness peak torque and instant acceleration in its purest form.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    prize: '₹1,50,000',
    spots: '24 Teams',
  },
  {
    id: '03',
    title: 'Battery Tech Symposium',
    category: 'KNOWLEDGE',
    date: 'Mar 15, 2026',
    time: '9:30 AM',
    desc: 'The battery is the heart of every electric vehicle, and this symposium goes deep into its future. Researchers, battery scientists, and startup founders gather to present cutting-edge work on solid-state batteries, silicon-anode technology, ultra-fast charging, and second-life battery applications. Presentations are followed by open panel discussions, giving attendees a rare chance to engage directly with the scientists shaping tomorrow\'s energy storage. Whether you\'re a student, researcher, or industry professional — this session is unmissable.',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80',
    prize: null,
    spots: 'Open to All',
  },
  {
    id: '04',
    title: 'EV Design Hackathon',
    category: 'CHALLENGE',
    date: 'Mar 15, 2026',
    time: '8:00 AM',
    desc: '48 hours. One challenge. Unlimited possibility. Teams of four dive into one of three problem tracks — EV charging infrastructure, battery management systems, or urban last-mile delivery solutions. Armed with components, cloud credits, and mentorship from industry veterans, participants design, prototype, and pitch their solutions to a panel of investors and engineers. This isn\'t just a hackathon — it\'s a launchpad. Past participants have gone on to found funded startups and win national innovation awards.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    prize: '₹5,00,000',
    spots: '40 Teams',
  },
  {
    id: '05',
    title: 'Green Future Summit',
    category: 'SUMMIT',
    date: 'Mar 15, 2026',
    time: '3:00 PM',
    desc: 'India has pledged 30% EV adoption by 2030. But how do we actually get there? The Green Future Summit brings together policymakers, urban planners, EV startup founders, and sustainability experts for an unflinching conversation about India\'s electric transition. Topics include charging infrastructure gaps, rural EV adoption, grid readiness for mass electrification, and the role of public policy in accelerating change. Expect debate, data, and a clear-eyed view of the road ahead.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    prize: null,
    spots: 'Open to All',
  },
  {
    id: '06',
    title: 'Smart Charging Workshop',
    category: 'WORKSHOP',
    date: 'Mar 16, 2026',
    time: '11:00 AM',
    desc: 'Charging infrastructure is the backbone of EV adoption — and it remains the biggest challenge. This hands-on workshop takes participants through the full stack of EV charging: from AC/DC charging fundamentals and connector standards to smart grid integration, demand response, and V2G (vehicle-to-grid) technology. Attendees get to configure a real-world charging station, simulate grid load scenarios, and explore business models for charging network deployment in India\'s tier-2 and tier-3 cities.',
    image: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=800&q=80',
    prize: null,
    spots: '60 Seats',
  },
];

const TIMELINE = [
  { day: 'Day 1', date: 'March 14', title: 'Ignition', events: ['Grand Opening Ceremony', 'EV Showcase Launch', 'Speed Trial Qualifiers', 'Networking Dinner'] },
  { day: 'Day 2', date: 'March 15', title: 'Acceleration', events: ['Battery Tech Symposium', 'Hackathon Kickoff', 'Green Future Summit', 'Live Demos & Test Rides'] },
  { day: 'Day 3', date: 'March 16', title: 'Podium', events: ['Smart Charging Workshop', 'Hackathon Finals & Pitch', 'Speed Trial Finals', 'Awards & Closing Gala'] },
];

const SPONSORS = [
  { tier: 'TITLE', name: 'PowerDrive India', color: 'var(--green-400)' },
  { tier: 'GOLD',  name: 'VoltEdge Motors',  color: '#fbbf24' },
  { tier: 'GOLD',  name: 'ChargePlus',        color: '#fbbf24' },
  { tier: 'SILVER',name: 'GreenArc Tech',     color: '#94a3b8' },
  { tier: 'SILVER',name: 'NitroCell Energy',  color: '#94a3b8' },
  { tier: 'SILVER',name: 'EcoFlux Labs',      color: '#94a3b8' },
];

export default function Vidyut26() {
  const [heroRef,     heroVisible]     = useReveal(0.1);
  const [aboutRef,    aboutVisible]    = useReveal();
  const [eventsRef,   eventsVisible]   = useReveal();
  const [timelineRef, timelineVisible] = useReveal();
  const [sponsorRef,  sponsorVisible]  = useReveal();
  const [registerRef, registerVisible] = useReveal();
  const [activeEvent, setActiveEvent]  = useState(0);
  const [formData, setFormData]        = useState({ name:'', email:'', college:'', event:'' });
  const [submitted, setSubmitted]      = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) setSubmitted(true);
  };

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ════════════════════════════
          HERO
      ════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        paddingTop: 100,
      }}>
        {/* Hero BG image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.12) saturate(0.4)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(5,10,5,0.97) 40%, rgba(20,83,26,0.4) 100%)',
        }} />

        {/* Scanline overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div ref={heroRef}>
            {/* Label */}
            <div style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.1s',
            }}>
              <span className="badge" style={{ marginBottom: 32, display: 'inline-flex' }}>
                Annual EV Conclave — NIT Bhopal
              </span>
            </div>

            {/* Title */}
            <div style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s ease 0.2s',
            }}>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5rem, 14vw, 13rem)',
                lineHeight: 0.88,
                letterSpacing: '0.02em',
                marginBottom: 0,
              }}>
                <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '35%', letterSpacing: '0.3em', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
                  EVOLVE PRESENTS
                </span>
                <span style={{ display: 'block', color: 'var(--green-400)', textShadow: '0 0 60px rgba(46,204,55,0.4)' }}>
                  VIDYUT
                </span>
                <span style={{ display: 'block', color: 'var(--text-primary)', WebkitTextStroke: '1px rgba(46,204,55,0.2)' }}>
                  26
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <div style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s ease 0.38s',
              marginTop: 32, maxWidth: 600,
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
              }}>
                Three days. One campus. A thousand sparks of innovation.
                India's most electrifying student-led EV conclave returns
                with bigger competitions, deeper knowledge sessions, and
                the boldest showcase of electric mobility yet.
              </p>
            </div>

            {/* Date / Venue pills */}
            <div style={{
              display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 36,
              opacity: heroVisible ? 1 : 0,
              transition: 'all 0.7s ease 0.5s',
            }}>
              {[
                { icon: '📅', text: 'March 14 – 16, 2026' },
                { icon: '📍', text: 'NIT Bhopal, Madhya Pradesh' },
                { icon: '⚡', text: 'Vidyut 26th Edition' },
              ].map(pill => (
                <div key={pill.text} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px',
                  background: 'rgba(46,204,55,0.06)',
                  border: 'var(--border)',
                  borderRadius: 100,
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                }}>
                  <span>{pill.icon}</span>
                  <span>{pill.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{
              marginTop: 48,
              opacity: heroVisible ? 1 : 0,
              transition: 'all 0.7s ease 0.6s',
            }}>
              <a href="#register">
                <button className="btn-glow" style={{ padding: '16px 48px', fontSize: '0.8rem' }}>
                  <span>Register Now — Free Entry</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: 40, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          opacity: 0.5,
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.3em' }}>SCROLL</div>
          <div style={{ width: 1, height: 50, background: 'linear-gradient(180deg, rgba(46,204,55,0.6), transparent)', animation: 'float 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ════════════════════════════
          ABOUT EV DAY
      ════════════════════════════ */}
      <section className="section" ref={aboutRef}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80, alignItems: 'center',
          }} className="about-grid">

            {/* Image side */}
            <div style={{
              position: 'relative',
              opacity: aboutVisible ? 1 : 0,
              transform: aboutVisible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.8s ease',
            }}>
              <div style={{
                position: 'relative', borderRadius: 8, overflow: 'hidden',
                border: 'var(--border)',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80"
                  alt="EV Day"
                  style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block', filter: 'brightness(0.75) saturate(0.8) hue-rotate(60deg)' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(5,10,5,0.5) 0%, transparent 60%)',
                }} />
              </div>

              {/* Floating stat card */}
              <div style={{
                position: 'absolute', bottom: -24, right: -24,
                padding: '20px 28px',
                background: 'rgba(10,26,10,0.95)',
                border: 'var(--border-bright)',
                borderRadius: 8,
                backdropFilter: 'blur(16px)',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', color: 'var(--green-400)', lineHeight: 1, textShadow: '0 0 20px rgba(46,204,55,0.4)' }}>26</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.2em', marginTop: 4 }}>YEARS OF LEGACY</div>
              </div>

              {/* Corner bracket */}
              <div style={{ position: 'absolute', top: -10, left: -10, width: 32, height: 32, borderTop: '2px solid var(--green-600)', borderLeft: '2px solid var(--green-600)' }} />
            </div>

            {/* Text side */}
            <div style={{
              opacity: aboutVisible ? 1 : 0,
              transform: aboutVisible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s ease 0.15s',
            }}>
              <div className="section-label">About EV Day</div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                color: 'var(--text-primary)',
                letterSpacing: '0.04em',
                marginBottom: 28,
              }}>
                WHERE INDIA'S{' '}
                <span style={{ color: 'var(--green-400)', textShadow: '0 0 20px rgba(46,204,55,0.3)' }}>
                  ELECTRIC REVOLUTION
                </span>{' '}
                BEGINS
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  `Vidyut 26 is not just an event — it is a movement. Born out of a conviction that India's youth would drive the electric revolution, EVOLVE at NIT Bhopal launched its first EV Day 26 years ago with a single electric scooter on display and a handful of passionate engineers in attendance. Today, Vidyut stands as India's largest student-organised electric vehicle conclave, drawing thousands of visitors, hundreds of competing teams, and dozens of industry partners every year.`,
                  `Each edition of Vidyut is built around a singular theme — and Vidyut 26 is no different. This year's theme, "Current of Change", captures the moment India finds itself in: a nation on the cusp of a transformational shift in how it powers its roads. From policy tailwinds and falling battery costs to a booming domestic EV startup ecosystem, the conditions for mass electrification have never been more ripe. Vidyut 26 is where that energy converges.`,
                  `Over three packed days, participants will experience live vehicle showcases, compete in engineering challenges with lakhs in prize money, attend thought-leadership panels, and forge connections with the brightest minds in sustainable mobility. Whether you are a first-year engineering student or a seasoned EV professional, Vidyut 26 has a seat for you at the table — and a charge point for the journey ahead.`,
                ].map((para, i) => (
                  <p key={i} style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.92rem',
                    color: i === 0 ? 'var(--text-secondary)' : 'var(--text-muted)',
                    lineHeight: 1.8,
                  }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          EVENTS
      ════════════════════════════ */}
      <section className="section" ref={eventsRef} style={{
        background: 'linear-gradient(180deg, transparent, rgba(15,34,16,0.2), transparent)',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>What's Happening</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              letterSpacing: '0.04em',
            }}>
              EVENTS &{' '}
              <span style={{ color: 'var(--green-400)', textShadow: '0 0 20px rgba(46,204,55,0.3)' }}>
                COMPETITIONS
              </span>
            </h2>
          </div>

          {/* Tab Selector */}
          <div style={{
            display: 'flex', gap: 4, flexWrap: 'wrap',
            marginBottom: 48, justifyContent: 'center',
          }}>
            {EVENTS.map((ev, i) => (
              <button key={ev.id} onClick={() => setActiveEvent(i)}
                style={{
                  padding: '8px 20px',
                  background: activeEvent === i ? 'rgba(46,204,55,0.15)' : 'transparent',
                  border: activeEvent === i ? 'var(--border-bright)' : 'var(--border)',
                  borderRadius: 100,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: activeEvent === i ? 'var(--green-400)' : 'var(--text-muted)',
                  letterSpacing: '0.15em',
                  cursor: 'none',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                }}>
                {ev.id}. {ev.category}
              </button>
            ))}
          </div>

          {/* Active event card */}
          {EVENTS.map((ev, i) => i === activeEvent && (
            <div key={ev.id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 0,
              border: 'var(--border)',
              borderRadius: 12,
              overflow: 'hidden',
              opacity: eventsVisible ? 1 : 0,
              transform: eventsVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.5s ease',
            }} className="event-detail">

              {/* Image */}
              <div style={{ position: 'relative', overflow: 'hidden', minHeight: 400 }}>
                <img
                  src={ev.image}
                  alt={ev.title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    filter: 'brightness(0.6) saturate(0.7) hue-rotate(60deg)',
                    transition: 'transform 0.6s ease',
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, transparent 50%, rgba(5,10,5,0.8) 100%)',
                }} />
                {/* Category tag on image */}
                <div style={{
                  position: 'absolute', top: 24, left: 24,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  color: 'var(--green-400)',
                  letterSpacing: '0.25em',
                  padding: '5px 12px',
                  background: 'rgba(5,10,5,0.8)',
                  border: 'var(--border-bright)',
                  borderRadius: 100,
                }}>
                  {ev.category}
                </div>
                {ev.prize && (
                  <div style={{
                    position: 'absolute', bottom: 24, left: 24,
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    color: '#fbbf24',
                    textShadow: '0 0 20px rgba(251,191,36,0.4)',
                  }}>
                    🏆 {ev.prize}
                  </div>
                )}
              </div>

              {/* Details */}
              <div style={{
                padding: '48px 48px',
                background: 'rgba(10,26,10,0.6)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.25em',
                  marginBottom: 12,
                }}>
                  {ev.id} / {String(EVENTS.length).padStart(2,'0')}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.04em',
                  marginBottom: 20,
                  lineHeight: 1.1,
                }}>
                  {ev.title}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.8,
                  marginBottom: 28,
                }}>
                  {ev.desc}
                </p>

                {/* Meta */}
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
                  {[
                    { label: 'DATE', value: ev.date },
                    { label: 'TIME', value: ev.time },
                    { label: 'CAPACITY', value: ev.spots },
                  ].map(m => (
                    <div key={m.label}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 4 }}>{m.label}</div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', color: 'var(--green-300)' }}>{m.value}</div>
                    </div>
                  ))}
                </div>

                <a href="#register">
                  <button className="btn-glow" style={{ alignSelf: 'flex-start' }}>
                    <span>Register for this Event</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════
          TIMELINE
      ════════════════════════════ */}
      <section className="section" ref={timelineRef}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Schedule</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              letterSpacing: '0.04em',
            }}>
              THREE DAYS OF{' '}
              <span style={{ color: 'var(--green-400)' }}>POWER</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}
            className="timeline-grid">
            {TIMELINE.map((day, i) => (
              <div key={day.day} className="card" style={{
                padding: '40px 32px', borderRadius: 8,
                opacity: timelineVisible ? 1 : 0,
                transform: timelineVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.6s ease ${i * 0.15}s`,
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Day number watermark */}
                <div style={{
                  position: 'absolute', top: -10, right: 20,
                  fontFamily: 'var(--font-display)',
                  fontSize: '7rem', lineHeight: 1,
                  color: 'rgba(46,204,55,0.04)',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}>
                  {i + 1}
                </div>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem', color: 'var(--text-muted)',
                  letterSpacing: '0.25em', marginBottom: 6,
                }}>
                  {day.date}
                </div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.75rem', color: 'var(--green-400)',
                  letterSpacing: '0.1em', marginBottom: 4,
                }}>
                  {day.day}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem', color: 'var(--text-primary)',
                  letterSpacing: '0.06em', marginBottom: 28,
                }}>
                  {day.title}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {day.events.map((ev, j) => (
                    <div key={ev} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      opacity: timelineVisible ? 1 : 0,
                      transition: `opacity 0.4s ease ${i * 0.15 + j * 0.08}s`,
                    }}>
                      <div style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: 'var(--green-500)',
                        boxShadow: '0 0 8px var(--green-500)',
                        flexShrink: 0,
                      }} />
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                      }}>
                        {ev}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom line */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, var(--green-${700 - i * 100}), transparent)`,
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          SPONSORS
      ════════════════════════════ */}
      <section className="section-sm" ref={sponsorRef} style={{
        borderTop: 'var(--border)', borderBottom: 'var(--border)',
        background: 'rgba(10,26,10,0.2)',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Powered By</div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              letterSpacing: '0.06em', color: 'var(--text-secondary)',
            }}>
              OUR SPONSORS & PARTNERS
            </h3>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            {SPONSORS.map((sp, i) => (
              <div key={sp.name} className="card" style={{
                padding: '20px 36px', borderRadius: 8,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                minWidth: 160,
                opacity: sponsorVisible ? 1 : 0,
                transform: sponsorVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease ${i * 0.07}s`,
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem', letterSpacing: '0.25em',
                  color: sp.color, marginBottom: 2,
                }}>
                  {sp.tier} SPONSOR
                </div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem', color: 'var(--text-secondary)',
                  letterSpacing: '0.06em',
                }}>
                  {sp.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          REGISTER FORM
      ════════════════════════════ */}
      <section className="section" id="register" ref={registerRef}>
        <div className="container">
          <div style={{
            maxWidth: 680, margin: '0 auto',
            opacity: registerVisible ? 1 : 0,
            transform: registerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="section-label" style={{ justifyContent: 'center' }}>Join The Movement</div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                letterSpacing: '0.04em',
              }}>
                REGISTER FOR{' '}
                <span style={{ color: 'var(--green-400)' }}>VIDYUT 26</span>
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem', color: 'var(--text-muted)',
                marginTop: 14, lineHeight: 1.7,
              }}>
                Entry is completely free. Fill in your details and secure
                your spot at India's most electric event of 2026.
              </p>
            </div>

            {submitted ? (
              <div style={{
                textAlign: 'center', padding: '64px 40px',
                border: 'var(--border-bright)', borderRadius: 12,
                background: 'rgba(46,204,55,0.04)',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>⚡</div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem', color: 'var(--green-400)',
                  letterSpacing: '0.06em', marginBottom: 12,
                }}>
                  YOU'RE IN!
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7,
                }}>
                  Welcome to Vidyut 26. Check your email for confirmation
                  and event details. See you on March 14th!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                display: 'flex', flexDirection: 'column', gap: 20,
                padding: '48px', border: 'var(--border)', borderRadius: 12,
                background: 'rgba(10,26,10,0.4)', backdropFilter: 'blur(12px)',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Form top glow */}
                <div style={{
                  position: 'absolute', top: 0, left: '20%', right: '20%', height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(46,204,55,0.5), transparent)',
                }} />

                {[
                  { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your full name' },
                  { label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@college.edu.in' },
                  { label: 'College / Institution', key: 'college', type: 'text', placeholder: 'NIT Bhopal, IIT Delhi...' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem', color: 'var(--text-muted)',
                      letterSpacing: '0.2em', display: 'block', marginBottom: 8,
                    }}>
                      {field.label.toUpperCase()}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.key]}
                      onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                      style={{
                        width: '100%', padding: '14px 16px',
                        background: 'rgba(5,10,5,0.7)',
                        border: '1px solid rgba(46,204,55,0.15)',
                        borderRadius: 6,
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem', outline: 'none',
                        transition: 'border-color 0.3s ease',
                        cursor: 'text',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(46,204,55,0.5)'}
                      onBlur={e  => e.target.style.borderColor = 'rgba(46,204,55,0.15)'}
                    />
                  </div>
                ))}

                {/* Event select */}
                <div>
                  <label style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem', color: 'var(--text-muted)',
                    letterSpacing: '0.2em', display: 'block', marginBottom: 8,
                  }}>
                    PRIMARY EVENT INTEREST
                  </label>
                  <select
                    value={formData.event}
                    onChange={e => setFormData(p => ({ ...p, event: e.target.value }))}
                    style={{
                      width: '100%', padding: '14px 16px',
                      background: 'rgba(5,10,5,0.7)',
                      border: '1px solid rgba(46,204,55,0.15)',
                      borderRadius: 6,
                      color: formData.event ? 'var(--text-primary)' : 'var(--text-muted)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem', outline: 'none',
                      cursor: 'none',
                    }}
                  >
                    <option value="">Select an event...</option>
                    {EVENTS.map(ev => (
                      <option key={ev.id} value={ev.id}>{ev.title}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn-glow" style={{
                  width: '100%', justifyContent: 'center',
                  padding: '16px', fontSize: '0.8rem', marginTop: 8,
                }}>
                  <span>Secure My Spot at Vidyut 26</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>

                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem', color: 'var(--text-muted)',
                  letterSpacing: '0.1em', textAlign: 'center',
                }}>
                  FREE ENTRY — NO REGISTRATION FEE — OPEN TO ALL
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .about-grid    { grid-template-columns: 1fr !important; gap: 40px !important; }
          .event-detail  { grid-template-columns: 1fr !important; }
          .timeline-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
        @media (max-width: 600px) {
          .timeline-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}