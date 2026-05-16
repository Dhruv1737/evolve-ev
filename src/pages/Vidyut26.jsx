import React, { useEffect, useRef, useState } from 'react';

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

var EVENTS = [
  {
    id:    '01',
    tag:   'Exhibition',
    title: 'EV Grand Showcase',
    date:  'March 14',
    time:  '10:00 AM',
    seats: 'Open to All',
    prize: null,
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&q=85',
    desc:  'The centrepiece of Vidyut 26 — a sprawling exhibition of production EVs, concept vehicles, and working prototypes from India\'s leading manufacturers and global brands. Walk the floor and witness how electric mobility has evolved from niche novelty to mainstream powerhouse. Engineers and designers will be on hand for live walkthroughs, detailed tech breakdowns, and direct Q&A sessions.',
  },
  {
    id:    '02',
    tag:   'Competition',
    title: 'Vidyut Speed Trials',
    date:  'March 14',
    time:  '2:00 PM',
    seats: '24 Teams',
    prize: '1,50,000',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
    desc:  'Student-built electric vehicles go head-to-head in timed acceleration runs across a purpose-designed track on the NIT Bhopal campus. Teams from universities across India compete in multiple categories. Witness instant torque and zero-emission speed in its rawest, most honest form. The crowd favourite at every edition of Vidyut — and this year the track is longer and faster than ever before.',
  },
  {
    id:    '03',
    tag:   'Knowledge',
    title: 'Battery Tech Symposium',
    date:  'March 15',
    time:  '9:30 AM',
    seats: 'Open to All',
    prize: null,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=900&q=85',
    desc:  'The battery is the heart of every electric vehicle — and this symposium goes deep into its future. Researchers, battery scientists, and startup founders present cutting-edge work on solid-state batteries, silicon-anode technology, ultra-fast charging, and second-life battery applications. Presentations are followed by open panel discussions giving attendees direct access to the scientists shaping tomorrow\'s energy storage.',
  },
  {
    id:    '04',
    tag:   'Challenge',
    title: 'EV Design Hackathon',
    date:  'March 15',
    time:  '8:00 AM',
    seats: '40 Teams',
    prize: '5,00,000',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=85',
    desc:  '48 hours. Three problem tracks. Unlimited ambition. Teams of four dive into EV charging infrastructure, battery management systems, or urban last-mile delivery. Armed with hardware components, cloud credits, and mentorship from industry veterans, participants design, prototype, and pitch to a panel of investors and engineers. Past winners have founded funded startups and won national innovation awards.',
  },
  {
    id:    '05',
    tag:   'Summit',
    title: 'Green Future Summit',
    date:  'March 15',
    time:  '3:00 PM',
    seats: 'Open to All',
    prize: null,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=85',
    desc:  'India has pledged 30% EV adoption by 2030. The Green Future Summit brings together policymakers, urban planners, EV startup founders, and sustainability experts for an unflinching conversation about what that commitment actually requires. Topics include charging infrastructure gaps, rural EV adoption, grid readiness, and the role of public investment in accelerating change.',
  },
  {
    id:    '06',
    tag:   'Workshop',
    title: 'Smart Charging Lab',
    date:  'March 16',
    time:  '11:00 AM',
    seats: '60 Seats',
    prize: null,
    image: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=900&q=85',
    desc:  'A hands-on deep-dive into the full stack of EV charging — from AC/DC fundamentals and connector standards to smart grid integration, demand response, and vehicle-to-grid technology. Attendees configure a real charging station, simulate grid load scenarios, and explore business models for network deployment across India\'s tier-2 and tier-3 cities. Limited to 60 participants.',
  },
];

var TIMELINE = [
  {
    day:    'Day One',
    date:   'March 14',
    title:  'Ignition',
    color:  '#B87333',
    events: ['Grand Opening Ceremony', 'EV Grand Showcase Launch', 'Speed Trial Qualifiers', 'Industry Networking Dinner'],
  },
  {
    day:    'Day Two',
    date:   'March 15',
    title:  'Acceleration',
    color:  '#b0b8c8',
    events: ['Battery Tech Symposium', 'Hackathon 48hr Kickoff', 'Green Future Summit', 'Live Demos and Test Rides'],
  },
  {
    day:    'Day Three',
    date:   'March 16',
    title:  'Podium',
    color:  '#7a9e7e',
    events: ['Smart Charging Workshop', 'Hackathon Finals and Pitch', 'Speed Trial Finals', 'Awards and Closing Gala'],
  },
];

var SPONSOR_TIERS = [
  {
    name:      'Community',
    threshold: 50000,
    color:     '#8a8a9a',
    perks: [
      { text: 'Logo on official website',       included: true  },
      { text: 'Social media mention (2 posts)',  included: true  },
      { text: '2 delegate passes',               included: true  },
      { text: 'Name in event booklet',           included: true  },
      { text: 'Banner at venue entrance',        included: false },
      { text: 'Exhibition booth space',          included: false },
      { text: 'Speaking slot at main stage',     included: false },
      { text: 'Logo on stage backdrop',          included: false },
      { text: 'Dedicated press coverage',        included: false },
      { text: 'VIP lounge access',               included: false },
      { text: 'Event naming rights',             included: false },
      { text: 'Year-round EVOLVE branding',      included: false },
    ],
  },
  {
    name:      'Silver',
    threshold: 100000,
    color:     '#b0b8c8',
    perks: [
      { text: 'Logo on official website',        included: true  },
      { text: 'Social media mention (2 posts)',   included: true  },
      { text: '2 delegate passes',                included: true  },
      { text: 'Name in event booklet',            included: true  },
      { text: 'Banner at venue entrance',         included: true  },
      { text: 'Exhibition booth — 4 sqm',         included: true  },
      { text: 'Speaking slot at main stage',      included: false },
      { text: 'Logo on stage backdrop',           included: false },
      { text: 'Dedicated press coverage',         included: false },
      { text: 'VIP lounge access',                included: false },
      { text: 'Event naming rights',              included: false },
      { text: 'Year-round EVOLVE branding',       included: false },
    ],
  },
  {
    name:      'Gold',
    threshold: 150000,
    color:     '#d4af37',
    perks: [
      { text: 'Logo on official website',         included: true  },
      { text: 'Social media mention (5 posts)',    included: true  },
      { text: '10 delegate passes',               included: true  },
      { text: 'Full-page in event booklet',        included: true  },
      { text: 'Banner at venue — premium spots',   included: true  },
      { text: 'Exhibition booth — 12 sqm',         included: true  },
      { text: 'Speaking slot — 20 minutes',        included: true  },
      { text: 'Logo on stage backdrop',            included: true  },
      { text: 'Dedicated press coverage',          included: false },
      { text: 'VIP lounge access',                 included: false },
      { text: 'Event naming rights',               included: false },
      { text: 'Year-round EVOLVE branding',        included: false },
    ],
  },
  {
    name:      'Title',
    threshold: 200000,
    color:     '#B87333',
    perks: [
      { text: 'Logo on official website',          included: true },
      { text: 'Social media campaign — full run',  included: true },
      { text: '30 delegate passes',                included: true },
      { text: 'Full-page and back cover booklet',  included: true },
      { text: 'Banner at all venue zones',         included: true },
      { text: 'Exhibition booth — 30 sqm premium', included: true },
      { text: 'Keynote speaking slot',             included: true },
      { text: 'Logo on stage backdrop',            included: true },
      { text: 'Dedicated press coverage',          included: true },
      { text: 'Exclusive VIP lounge access',       included: true },
      { text: 'Event naming rights',               included: true },
      { text: 'Year-round EVOLVE branding',        included: true },
    ],
  },
];

var STEPS = [50000, 100000, 150000, 200000];

function formatBudget(val) {
  if (val >= 100000) {
    var l = val / 100000;
    return '\u20B9' + (l === Math.floor(l) ? l : l.toFixed(1)) + 'L';
  }
  return '\u20B9' + (val / 1000) + 'K';
}

function CheckIcon(props) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke={props.color || 'currentColor'} strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function SponsorSimulator() {
  var budgetState = useState(50000);
  var budget      = budgetState[0];
  var setBudget   = budgetState[1];

  var activeTierIndex = 0;
  for (var i = 0; i < SPONSOR_TIERS.length; i++) {
    if (budget >= SPONSOR_TIERS[i].threshold) activeTierIndex = i;
  }
  var activeTier = SPONSOR_TIERS[activeTierIndex];
  var fillPct    = ((budget - 50000) / (200000 - 50000)) * 100;
  var unlockedCount = activeTier.perks.filter(function(p) { return p.included; }).length;

  return (
    <div style={{
      background: 'var(--charcoal-2)',
      border:     '1px solid rgba(255,255,255,0.06)',
      position:   'relative',
      overflow:   'hidden',
    }}>

      {/* Top line */}
      <div style={{
        position:   'absolute',
        top: 0, left: '12%', right: '12%',
        height:     1,
        background: 'linear-gradient(90deg, transparent, var(--copper), transparent)',
        opacity:    0.4,
      }} />

      {/* Header */}
      <div style={{ padding: '48px 40px 36px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        className="sim-header">
        <div className="eyebrow" style={{ marginBottom: 14 }}>Sponsorship Simulator</div>
        <h3 style={{
          fontFamily:   'var(--font-serif)',
          fontSize:     'clamp(1.6rem, 3vw, 2.4rem)',
          fontWeight:   300,
          color:        'var(--pearl)',
          lineHeight:   1.1,
          marginBottom: 12,
          margin:       0,
        }}>
          See exactly what your{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--copper-light)' }}>
            investment unlocks
          </span>
        </h3>
        <p style={{
          fontFamily:  'var(--font-body)',
          fontSize:    '0.85rem',
          fontWeight:  300,
          color:       'var(--pearl-muted)',
          lineHeight:  1.75,
          maxWidth:    500,
          marginTop:   12,
          marginBottom: 0,
        }}>
          Move the slider to select your sponsorship budget.
          Each step of the slider unlocks a new tier with
          additional branding and visibility benefits.
        </p>
      </div>

      {/* Slider section */}
      <div style={{ padding: '36px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        className="sim-slider">

        {/* Budget + tier row */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          flexWrap:       'wrap',
          gap:            16,
          marginBottom:   28,
        }}>
          <div style={{
            fontFamily:  'var(--font-serif)',
            fontSize:    'clamp(2.4rem, 6vw, 4.5rem)',
            fontWeight:  300,
            lineHeight:  1,
            color:       activeTier.color,
            transition:  'color 0.4s ease',
          }}>
            {formatBudget(budget)}
          </div>

          <div style={{
            display:       'flex',
            alignItems:    'center',
            gap:           10,
            padding:       '9px 18px',
            border:        '1px solid ' + activeTier.color,
            transition:    'border-color 0.4s ease',
          }}>
            <div style={{
              width:      7, height: 7,
              borderRadius: '50%',
              background:  activeTier.color,
              transition:  'background 0.4s ease',
              flexShrink:  0,
            }} />
            <div style={{
              fontFamily:    'var(--font-wide)',
              fontSize:      '0.58rem',
              fontWeight:    700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         activeTier.color,
              transition:    'color 0.4s ease',
              whiteSpace:    'nowrap',
            }}>
              {activeTier.name} Sponsor
            </div>
          </div>
        </div>

        {/* Slider */}
        <input
          type="range"
          min={50000}
          max={200000}
          step={50000}
          value={budget}
          onChange={function(e) { setBudget(Number(e.target.value)); }}
          style={{
            width:            '100%',
            appearance:       'none',
            WebkitAppearance: 'none',
            height:           2,
            background:       'linear-gradient(90deg, ' + activeTier.color + ' ' + fillPct + '%, rgba(255,255,255,0.08) ' + fillPct + '%)',
            outline:          'none',
            cursor:           'none',
            display:          'block',
            marginBottom:     16,
            transition:       'background 0.3s ease',
          }}
        />

        {/* Step markers */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {STEPS.map(function(step, idx) {
            var isActive  = budget >= step;
            var isCurrent = budget === step;
            var tier      = SPONSOR_TIERS[idx];
            return (
              <div
                key={step}
                onClick={function() { setBudget(step); }}
                style={{
                  display:       'flex',
                  flexDirection: 'column',
                  alignItems:    idx === 0 ? 'flex-start' : idx === STEPS.length - 1 ? 'flex-end' : 'center',
                  gap:           5,
                  cursor:        'none',
                }}
              >
                <div style={{
                  width:      1, height: 7,
                  background: isActive ? tier.color : 'rgba(255,255,255,0.1)',
                  transition: 'background 0.3s ease',
                  alignSelf:  idx === 0 ? 'flex-start' : idx === STEPS.length - 1 ? 'flex-end' : 'center',
                }} />
                <div style={{
                  fontFamily:    'var(--font-wide)',
                  fontSize:      '0.48rem',
                  fontWeight:    700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color:         isCurrent ? tier.color : isActive ? 'var(--pearl-muted)' : 'var(--pearl-ghost)',
                  transition:    'color 0.3s ease',
                  textAlign:     idx === 0 ? 'left' : idx === STEPS.length - 1 ? 'right' : 'center',
                }}>
                  {tier.name}
                </div>
                <div style={{
                  fontFamily:  'var(--font-mono)',
                  fontSize:    '0.46rem',
                  color:       isCurrent ? tier.color : 'var(--pearl-ghost)',
                  transition:  'color 0.3s ease',
                  textAlign:   idx === 0 ? 'left' : idx === STEPS.length - 1 ? 'right' : 'center',
                }}>
                  {formatBudget(step)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Perks table — desktop */}
      <div className="perks-table-desktop" style={{ padding: '0 40px' }}>
        {/* Table header */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr repeat(4, 90px)',
          gap:                 0,
          borderBottom:        '1px solid rgba(255,255,255,0.06)',
          padding:             '18px 0',
        }}>
          <div style={{
            fontFamily:    'var(--font-wide)',
            fontSize:      '0.5rem',
            fontWeight:    600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         'var(--pearl-ghost)',
          }}>
            What You Get
          </div>
          {SPONSOR_TIERS.map(function(tier, ti) {
            var isUnlocked = activeTierIndex >= ti;
            return (
              <div key={tier.name} style={{
                textAlign:  'center',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
                padding:    '0 4px',
                background: ti === activeTierIndex ? 'rgba(255,255,255,0.015)' : 'transparent',
                transition: 'background 0.4s ease',
              }}>
                <div style={{
                  fontFamily:    'var(--font-wide)',
                  fontSize:      '0.48rem',
                  fontWeight:    700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color:         isUnlocked ? tier.color : 'var(--pearl-ghost)',
                  transition:    'color 0.4s ease',
                }}>
                  {tier.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Perk rows */}
        {SPONSOR_TIERS[0].perks.map(function(perk, pi) {
          return (
            <div key={pi} style={{
              display:             'grid',
              gridTemplateColumns: '1fr repeat(4, 90px)',
              gap:                 0,
              borderBottom:        pi < SPONSOR_TIERS[0].perks.length - 1
                ? '1px solid rgba(255,255,255,0.04)'
                : 'none',
              padding:             '12px 0',
              transition:          'background 0.2s ease',
            }}
              onMouseEnter={function(e) { e.currentTarget.style.background = 'rgba(255,255,255,0.012)'; }}
              onMouseLeave={function(e) { e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{
                fontFamily:  'var(--font-body)',
                fontSize:    '0.82rem',
                fontWeight:  300,
                color:       'var(--pearl-muted)',
                paddingRight: 16,
                display:     'flex',
                alignItems:  'center',
              }}>
                {perk.text}
              </div>
              {SPONSOR_TIERS.map(function(tier, ti) {
                var hasPerk    = tier.perks[pi].included;
                var isUnlocked = activeTierIndex >= ti;
                var isCurrent  = ti === activeTierIndex;
                return (
                  <div key={tier.name} style={{
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    borderLeft:     '1px solid rgba(255,255,255,0.06)',
                    background:     isCurrent ? 'rgba(255,255,255,0.015)' : 'transparent',
                    transition:     'background 0.4s ease',
                  }}>
                    {hasPerk ? (
                      <div style={{ opacity: isUnlocked ? 1 : 0.2, transition: 'opacity 0.4s ease' }}>
                        <CheckIcon color={isUnlocked ? tier.color : 'rgba(255,255,255,0.2)'} />
                      </div>
                    ) : (
                      <CrossIcon />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Perks list — mobile (shows only active tier perks) */}
      <div className="perks-table-mobile" style={{ padding: '0 24px', display: 'none' }}>
        <div style={{
          fontFamily:    'var(--font-wide)',
          fontSize:      '0.52rem',
          fontWeight:    600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         activeTier.color,
          padding:       '20px 0 16px',
          borderBottom:  '1px solid rgba(255,255,255,0.06)',
          transition:    'color 0.4s ease',
        }}>
          {activeTier.name} Tier — What You Get
        </div>
        {activeTier.perks.map(function(perk, pi) {
          return (
            <div key={pi} style={{
              display:     'flex',
              alignItems:  'flex-start',
              gap:         12,
              padding:     '12px 0',
              borderBottom: pi < activeTier.perks.length - 1
                ? '1px solid rgba(255,255,255,0.04)'
                : 'none',
            }}>
              <div style={{
                width:      20,
                height:     20,
                flexShrink: 0,
                display:    'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop:  1,
              }}>
                {perk.included
                  ? <CheckIcon color={activeTier.color} />
                  : <CrossIcon />
                }
              </div>
              <span style={{
                fontFamily:  'var(--font-body)',
                fontSize:    '0.85rem',
                fontWeight:  300,
                color:       perk.included ? 'var(--pearl-muted)' : 'var(--pearl-ghost)',
                lineHeight:  1.5,
              }}>
                {perk.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Summary bar */}
      <div style={{
        padding:    '20px 40px',
        borderTop:  '1px solid rgba(255,255,255,0.06)',
        display:    'flex',
        alignItems: 'center',
        gap:        10,
        flexWrap:   'wrap',
      }}
        className="sim-summary"
      >
        <span style={{
          fontFamily:  'var(--font-serif)',
          fontSize:    '0.95rem',
          fontStyle:   'italic',
          color:       'var(--pearl-muted)',
        }}>
          At {formatBudget(budget)} you unlock
        </span>
        <span style={{
          fontFamily:    'var(--font-wide)',
          fontSize:      '0.6rem',
          fontWeight:    700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color:         activeTier.color,
          transition:    'color 0.4s ease',
        }}>
          {unlockedCount} benefits
        </span>
        <span style={{
          fontFamily:  'var(--font-serif)',
          fontSize:    '0.95rem',
          fontStyle:   'italic',
          color:       'var(--pearl-muted)',
        }}>
          as a {activeTier.name} Sponsor.
        </span>
      </div>

      {/* CTA */}
      {/* CTA */}
<div
  style={{
    padding: '28px 40px 44px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 20,
  }}
  className="sim-cta"
>
  <div>
    <div
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.1rem',
        fontWeight: 300,
        fontStyle: 'italic',
        color: 'var(--pearl)',
        marginBottom: 5,
      }}
    >
      Ready to partner with EVOLVE?
    </div>

    <div
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.8rem',
        fontWeight: 300,
        color: 'var(--pearl-muted)',
      }}
    >
      Full sponsorship deck delivered within 24 hours.
    </div>
  </div>

  <a
    href={
      'mailto:evolve@nitb.in?subject=Sponsorship%20Enquiry%20%E2%80%94%20' +
      activeTier.name +
      '%20Tier%20%E2%80%94%20Vidyut%2026'
    }
    style={{ textDecoration: 'none' }}
  >
    <button
      className="btn-primary"
      style={{ whiteSpace: 'nowrap' }}
    >
      <span>Request {activeTier.name} Tier Deck</span>

      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  </a>
</div>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width:        20px;
          height:       20px;
          border-radius: 50%;
          background:   #B87333;
          border:       3px solid #18181c;
          cursor:       none;
          box-shadow:   0 0 0 1px rgba(184,115,51,0.4);
          transition:   box-shadow 0.3s ease;
        }
        input[type='range']::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 4px rgba(184,115,51,0.15);
        }
        input[type='range']::-moz-range-thumb {
          width:        20px;
          height:       20px;
          border-radius: 50%;
          background:   #B87333;
          border:       3px solid #18181c;
          cursor:       none;
        }
        input[type='range']:focus { outline: none; }

        @media (max-width: 700px) {
          .perks-table-desktop { display: none !important; }
          .perks-table-mobile  { display: block !important; }
          .sim-header  { padding: 32px 24px 24px !important; }
          .sim-slider  { padding: 28px 24px !important; }
          .sim-summary { padding: 16px 24px !important; }
          .sim-cta     { padding: 24px 24px 36px !important; flex-direction: column !important; align-items: flex-start !important; }
          .sim-cta button { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
}

export default function Vidyut26() {
  var heroState      = useState(false);
  var heroVisible    = heroState[0];
  var setHeroVisible = heroState[1];

  var activeState = useState(0);
  var activeEvent = activeState[0];
  var setActiveEvent = activeState[1];

  var formState   = useState({ name: '', email: '', college: '', event: '' });
  var formData    = formState[0];
  var setFormData = formState[1];

  var subState    = useState(false);
  var submitted   = subState[0];
  var setSubmitted = subState[1];

  var r1 = useReveal(0.08);
  var eventsRef     = r1[0];
  var eventsVisible = r1[1];

  var r2 = useReveal();
  var timelineRef     = r2[0];
  var timelineVisible = r2[1];

  var r3 = useReveal(0.04);
  var simRef     = r3[0];
  var simVisible = r3[1];

  var r4 = useReveal();
  var registerRef     = r4[0];
  var registerVisible = r4[1];

  useEffect(function() {
    var t = setTimeout(function() { setHeroVisible(true); }, 120);
    return function() { clearTimeout(t); };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.name && formData.email) setSubmitted(true);
  }

  function updateForm(key, val) {
    setFormData(function(prev) {
      var next = {};
      Object.keys(prev).forEach(function(k) { next[k] = prev[k]; });
      next[key] = val;
      return next;
    });
  }

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section style={{
        minHeight:     '100vh',
        display:       'flex',
        alignItems:    'center',
        position:      'relative',
        overflow:      'hidden',
        paddingTop:    100,
        paddingBottom: 80,
      }}>
        <div style={{
          position:           'absolute',
          inset:              0,
          backgroundImage:    'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=90)',
          backgroundSize:     'cover',
          backgroundPosition: 'center',
          filter:             'brightness(0.18) contrast(1.2) saturate(0.3)',
        }} />
        <div style={{
          position:   'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(10,10,11,0.97) 45%, rgba(10,10,11,0.6) 100%)',
        }} />
        <div style={{
          position:   'absolute',
          bottom: 0, left: 0, right: 0,
          height:     '40%',
          background: 'linear-gradient(0deg, #121214 0%, transparent 100%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ maxWidth: 680 }}>

            <div style={{
              opacity:    heroVisible ? 1 : 0,
              transform:  heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.6s ease 0.1s',
              marginBottom: 32,
            }}>
              <span className="badge">
                26th Annual EV Conclave {'\u00B7'} NIT Bhopal
              </span>
            </div>

            <div style={{
              opacity:    heroVisible ? 1 : 0,
              transform:  heroVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.8s ease 0.2s',
              marginBottom: 32,
            }}>
              <div style={{
                fontFamily:    'var(--font-wide)',
                fontSize:      '0.6rem',
                fontWeight:    600,
                letterSpacing: '0.4em',
                color:         'var(--copper)',
                textTransform: 'uppercase',
                marginBottom:  14,
              }}>
                Evolve Presents
              </div>
              <h1 style={{
                fontFamily:    'var(--font-serif)',
                fontSize:      'clamp(4.5rem, 13vw, 11rem)',
                fontWeight:    300,
                lineHeight:    0.9,
                letterSpacing: '-0.01em',
                margin:        0,
              }}>
                <span style={{ display: 'block', color: 'var(--pearl)' }}>Vidyut</span>
                <span style={{
                  display:   'block',
                  fontStyle: 'italic',
                  color:     'var(--copper-light)',
                }}>26</span>
              </h1>
            </div>

            <div style={{
              opacity:    heroVisible ? 1 : 0,
              transform:  heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.8s ease 0.38s',
            }}>
              <p style={{
                fontFamily:   'var(--font-body)',
                fontSize:     'clamp(0.9rem, 2vw, 1.05rem)',
                fontWeight:   300,
                color:        'var(--pearl-muted)',
                lineHeight:   1.8,
                maxWidth:     520,
                marginBottom: 40,
                marginTop:    0,
              }}>
                Three days. One campus. A thousand sparks of innovation.
                India's most electrifying student-led EV conclave returns
                with its boldest programme and largest prize pool yet.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
                <a href="#register" style={{ textDecoration: 'none' }}>
                  <button className="btn-primary" style={{ padding: '14px 36px' }}>
                    <span>Register {'\u2014'} Free Entry</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </a>
                <a href="#sponsor" style={{ textDecoration: 'none' }}>
                  <button className="btn-ghost">
                    <span>Sponsor Vidyut 26</span>
                  </button>
                </a>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {[
                  'March 14\u201316, 2026',
                  'NIT Bhopal, MP',
                  '\u20B96.5L Prize Pool',
                ].map(function(pill) {
                  return (
                    <div key={pill} style={{
                      padding:    '8px 16px',
                      background: 'rgba(255,255,255,0.03)',
                      border:     '1px solid rgba(255,255,255,0.06)',
                      fontFamily: 'var(--font-body)',
                      fontSize:   '0.8rem',
                      fontWeight: 300,
                      color:      'var(--pearl-muted)',
                    }}>
                      {pill}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════
          EVENTS
      ══════════════════════════════ */}
      <section className="section" ref={eventsRef}>
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <div className="eyebrow">Programme</div>
            <h2 style={{
              fontFamily:  'var(--font-serif)',
              fontSize:    'clamp(2rem, 4vw, 3.6rem)',
              fontWeight:  300,
              color:       'var(--pearl)',
              lineHeight:  1.05,
              margin:      0,
            }}>
              Events {'\u0026'}{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--copper-light)' }}>
                Competitions
              </span>
            </h2>
          </div>

          {/* Tab strip */}
          <div style={{
            display:       'flex',
            gap:           0,
            marginBottom:  24,
            borderBottom:  '1px solid rgba(255,255,255,0.06)',
            overflowX:     'auto',
            WebkitOverflowScrolling: 'touch',
          }}>
            {EVENTS.map(function(ev, i) {
              var isActive = activeEvent === i;
              return (
                <button
                  key={ev.id}
                  onClick={function() { setActiveEvent(i); }}
                  style={{
                    padding:       '12px 18px',
                    background:    'transparent',
                    border:        'none',
                    borderBottom:  isActive
                      ? '2px solid #B87333'
                      : '2px solid transparent',
                    fontFamily:    'var(--font-wide)',
                    fontSize:      '0.54rem',
                    fontWeight:    600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color:         isActive ? 'var(--copper-light)' : 'var(--pearl-ghost)',
                    cursor:        'none',
                    whiteSpace:    'nowrap',
                    transition:    'all 0.3s ease',
                    marginBottom:  -1,
                    flexShrink:    0,
                  }}
                >
                  {ev.id} {ev.tag}
                </button>
              );
            })}
          </div>

          {/* Active event */}
          {EVENTS.map(function(ev, i) {
            if (i !== activeEvent) return null;
            return (
              <div key={ev.id} style={{
                border:     '1px solid rgba(255,255,255,0.06)',
                overflow:   'hidden',
                opacity:    eventsVisible ? 1 : 0,
                transform:  eventsVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.6s ease',
              }}
                className="event-panel"
              >
                <div style={{
                  display:   'flex',
                  flexDirection: 'row',
                }}
                  className="event-panel-inner"
                >
                  {/* Image */}
                  <div style={{
                    position:   'relative',
                    overflow:   'hidden',
                    flexShrink: 0,
                  }}
                    className="event-img"
                  >
                    <img
                      src={ev.image}
                      alt={ev.title}
                      style={{
                        width:      '100%',
                        height:     '100%',
                        objectFit:  'cover',
                        filter:     'brightness(0.5) contrast(1.15) saturate(0.35)',
                        display:    'block',
                        transition: 'transform 0.8s ease',
                      }}
                      onMouseEnter={function(e) { e.currentTarget.style.transform = 'scale(1.04)'; }}
                      onMouseLeave={function(e) { e.currentTarget.style.transform = 'scale(1)'; }}
                    />
                    <div style={{
                      position:   'absolute', inset: 0,
                      background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,11,0.9) 100%)',
                    }} />
                    {ev.prize && (
                      <div style={{
                        position:   'absolute',
                        bottom:     20, left: 20,
                        padding:    '8px 16px',
                        background: 'rgba(10,10,11,0.92)',
                        border:     '1px solid rgba(184,115,51,0.35)',
                        fontFamily: 'var(--font-serif)',
                        fontSize:   '1.1rem',
                        fontWeight: 300,
                        color:      'var(--copper-light)',
                      }}>
                        {'\u20B9'}{ev.prize} Prize
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div style={{
                    padding:        '40px 40px',
                    background:     'var(--charcoal-2)',
                    display:        'flex',
                    flexDirection:  'column',
                    justifyContent: 'center',
                    flex:           1,
                  }}
                    className="event-details"
                  >
                    <div style={{
                      fontFamily:    'var(--font-wide)',
                      fontSize:      '0.52rem',
                      fontWeight:    600,
                      letterSpacing: '0.22em',
                      color:         'var(--copper)',
                      textTransform: 'uppercase',
                      marginBottom:  14,
                    }}>
                      {ev.tag}
                    </div>
                    <h3 style={{
                      fontFamily:   'var(--font-serif)',
                      fontSize:     'clamp(1.5rem, 3vw, 2.2rem)',
                      fontWeight:   300,
                      color:        'var(--pearl)',
                      lineHeight:   1.1,
                      marginBottom: 16,
                      margin:       '0 0 16px 0',
                    }}>
                      {ev.title}
                    </h3>
                    <p style={{
                      fontFamily:   'var(--font-body)',
                      fontSize:     '0.86rem',
                      fontWeight:   300,
                      color:        'var(--pearl-muted)',
                      lineHeight:   1.82,
                      marginBottom: 28,
                      margin:       '0 0 28px 0',
                    }}>
                      {ev.desc}
                    </p>

                    {/* Meta */}
                    <div style={{
                      display:      'flex',
                      gap:          24,
                      flexWrap:     'wrap',
                      marginBottom: 28,
                      paddingTop:   20,
                      borderTop:    '1px solid rgba(255,255,255,0.06)',
                    }}>
                      {[
                        { label: 'Date',     value: ev.date  },
                        { label: 'Time',     value: ev.time  },
                        { label: 'Capacity', value: ev.seats },
                      ].map(function(m) {
                        return (
                          <div key={m.label}>
                            <div style={{
                              fontFamily:    'var(--font-wide)',
                              fontSize:      '0.48rem',
                              fontWeight:    600,
                              letterSpacing: '0.22em',
                              textTransform: 'uppercase',
                              color:         'var(--pearl-ghost)',
                              marginBottom:  4,
                            }}>
                              {m.label}
                            </div>
                            <div style={{
                              fontFamily:  'var(--font-body)',
                              fontSize:    '0.85rem',
                              fontWeight:  400,
                              color:       'var(--pearl-dim)',
                            }}>
                              {m.value}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <a href="#register" style={{ textDecoration: 'none', alignSelf: 'flex-start' }}>
                      <button className="btn-primary">
                        <span>Register for this Event</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* ══════════════════════════════
          TIMELINE
      ══════════════════════════════ */}
      <section className="section" ref={timelineRef} style={{
        borderTop:    '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background:   'var(--charcoal-2)',
      }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <div className="eyebrow">Schedule</div>
            <h2 style={{
              fontFamily:  'var(--font-serif)',
              fontSize:    'clamp(2rem, 4vw, 3.6rem)',
              fontWeight:  300,
              color:       'var(--pearl)',
              lineHeight:  1.05,
              margin:      0,
            }}>
              Three Days of{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--copper-light)' }}>
                Pure Electric
              </span>
            </h2>
          </div>

          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 1,
            background:          'rgba(255,255,255,0.04)',
          }}
            className="timeline-grid"
          >
            {TIMELINE.map(function(day, i) {
              return (
                <div key={day.day} style={{
                  padding:    '40px 32px',
                  background: 'var(--charcoal-2)',
                  position:   'relative',
                  opacity:    timelineVisible ? 1 : 0,
                  transform:  timelineVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'all 0.6s ease ' + (i * 0.12) + 's',
                }}>
                  <div style={{
                    position:   'absolute',
                    top: 0, left: 0, right: 0,
                    height:     2,
                    background: day.color,
                    opacity:    0.5,
                  }} />
                  <div style={{
                    fontFamily:    'var(--font-wide)',
                    fontSize:      '0.5rem',
                    fontWeight:    600,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color:         'var(--pearl-ghost)',
                    marginBottom:  5,
                  }}>
                    {day.date}
                  </div>
                  <div style={{
                    fontFamily:    'var(--font-wide)',
                    fontSize:      '0.56rem',
                    fontWeight:    700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color:         day.color,
                    marginBottom:  4,
                  }}>
                    {day.day}
                  </div>
                  <div style={{
                    fontFamily:   'var(--font-serif)',
                    fontSize:     'clamp(1.6rem, 2.5vw, 2.2rem)',
                    fontWeight:   300,
                    color:        'var(--pearl)',
                    lineHeight:   1,
                    marginBottom: 28,
                  }}>
                    {day.title}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {day.events.map(function(ev) {
                      return (
                        <div key={ev} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{
                            width:      16, height: 1,
                            background: day.color,
                            opacity:    0.4, flexShrink: 0,
                          }} />
                          <span style={{
                            fontFamily:  'var(--font-body)',
                            fontSize:    '0.82rem',
                            fontWeight:  300,
                            color:       'var(--pearl-muted)',
                          }}>
                            {ev}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════
          SPONSOR SIMULATOR
      ══════════════════════════════ */}
      <section className="section" id="sponsor" ref={simRef}>
        <div className="container">
          <div style={{
            opacity:    simVisible ? 1 : 0,
            transform:  simVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}>
            <SponsorSimulator />
          </div>
        </div>
      </section>


      {/* ══════════════════════════════
          REGISTER
      ══════════════════════════════ */}
      <section className="section" id="register" ref={registerRef} style={{
        borderTop:  '1px solid rgba(255,255,255,0.06)',
        background: 'var(--charcoal-2)',
      }}>
        <div className="container">
          <div style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 72,
            alignItems:          'start',
          }}
            className="register-grid"
          >
            {/* Left */}
            <div style={{
              opacity:    registerVisible ? 1 : 0,
              transform:  registerVisible ? 'translateX(0)' : 'translateX(-24px)',
              transition: 'all 0.7s ease',
            }}>
              <div className="eyebrow">Join the Movement</div>
              <h2 style={{
                fontFamily:   'var(--font-serif)',
                fontSize:     'clamp(2rem, 4vw, 3.2rem)',
                fontWeight:   300,
                color:        'var(--pearl)',
                lineHeight:   1.05,
                marginBottom: 20,
                marginTop:    0,
              }}>
                Register for{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--copper-light)' }}>
                  Vidyut 26
                </span>
              </h2>
              <p style={{
                fontFamily:   'var(--font-body)',
                fontSize:     '0.9rem',
                fontWeight:   300,
                color:        'var(--pearl-muted)',
                lineHeight:   1.8,
                marginBottom: 36,
                marginTop:    0,
              }}>
                Entry is completely free. Secure your spot at India's most
                ambitious electric vehicle event of 2026. We will send you
                everything you need before March 14th.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Free entry — no registration fee whatsoever',
                  'Open to all students and working professionals',
                  'Confirmation email within 24 hours',
                  'Full access to all open sessions and exhibitions',
                ].map(function(item) {
                  return (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{
                        width:          20, height: 20,
                        borderRadius:   '50%',
                        border:         '1px solid rgba(184,115,51,0.35)',
                        display:        'flex',
                        alignItems:     'center',
                        justifyContent: 'center',
                        flexShrink:     0,
                        marginTop:      1,
                      }}>
                        <CheckIcon color="var(--copper)" />
                      </div>
                      <span style={{
                        fontFamily:  'var(--font-body)',
                        fontSize:    '0.85rem',
                        fontWeight:  300,
                        color:       'var(--pearl-muted)',
                        lineHeight:  1.5,
                      }}>
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right — form */}
            <div style={{
              opacity:    registerVisible ? 1 : 0,
              transform:  registerVisible ? 'translateX(0)' : 'translateX(24px)',
              transition: 'all 0.7s ease 0.15s',
            }}>
              {submitted ? (
                <div style={{
                  padding:    '56px 40px',
                  background: 'var(--charcoal-3)',
                  border:     '1px solid rgba(184,115,51,0.25)',
                  textAlign:  'center',
                }}>
                  <div style={{
                    fontFamily:   'var(--font-serif)',
                    fontSize:     'clamp(2.2rem, 5vw, 3.2rem)',
                    fontWeight:   300,
                    fontStyle:    'italic',
                    color:        'var(--copper-light)',
                    marginBottom: 14,
                    lineHeight:   1,
                  }}>
                    You're in.
                  </div>
                  <p style={{
                    fontFamily:  'var(--font-body)',
                    fontSize:    '0.88rem',
                    fontWeight:  300,
                    color:       'var(--pearl-muted)',
                    lineHeight:  1.75,
                    margin:      0,
                  }}>
                    Welcome to Vidyut 26. Check your email for confirmation.
                    We will see you on March 14th at NIT Bhopal.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
                >
                  {[
                    { label: 'Full Name',            key: 'name',    type: 'text',  ph: 'Your full name'           },
                    { label: 'Email Address',         key: 'email',   type: 'email', ph: 'you@college.edu.in'       },
                    { label: 'College / Institution', key: 'college', type: 'text',  ph: 'NIT Bhopal, IIT Delhi...' },
                  ].map(function(field) {
                    return (
                      <div key={field.key}>
                        <label style={{
                          display:       'block',
                          fontFamily:    'var(--font-wide)',
                          fontSize:      '0.5rem',
                          fontWeight:    600,
                          letterSpacing: '0.22em',
                          textTransform: 'uppercase',
                          color:         'var(--pearl-ghost)',
                          marginBottom:  7,
                        }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.ph}
                          value={formData[field.key]}
                          onChange={function(e) { updateForm(field.key, e.target.value); }}
                          style={{
                            width:      '100%',
                            padding:    '13px 14px',
                            background: 'var(--charcoal-3)',
                            border:     '1px solid rgba(255,255,255,0.06)',
                            color:      'var(--pearl)',
                            fontFamily: 'var(--font-body)',
                            fontSize:   '0.88rem',
                            fontWeight: 300,
                            outline:    'none',
                            cursor:     'text',
                            transition: 'border-color 0.3s ease',
                            boxSizing:  'border-box',
                          }}
                          onFocus={function(e) { e.target.style.borderColor = 'rgba(184,115,51,0.4)'; }}
                          onBlur={function(e)  { e.target.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                        />
                      </div>
                    );
                  })}

                  <div>
                    <label style={{
                      display:       'block',
                      fontFamily:    'var(--font-wide)',
                      fontSize:      '0.5rem',
                      fontWeight:    600,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color:         'var(--pearl-ghost)',
                      marginBottom:  7,
                    }}>
                      Primary Event Interest
                    </label>
                    <select
                      value={formData.event}
                      onChange={function(e) { updateForm('event', e.target.value); }}
                      style={{
                        width:      '100%',
                        padding:    '13px 14px',
                        background: 'var(--charcoal-3)',
                        border:     '1px solid rgba(255,255,255,0.06)',
                        color:      formData.event ? 'var(--pearl)' : 'var(--pearl-muted)',
                        fontFamily: 'var(--font-body)',
                        fontSize:   '0.88rem',
                        fontWeight: 300,
                        outline:    'none',
                        cursor:     'none',
                        boxSizing:  'border-box',
                      }}
                    >
                      <option value="">Select an event...</option>
                      {EVENTS.map(function(ev) {
                        return (
                          <option key={ev.id} value={ev.id}>{ev.title}</option>
                        );
                      })}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width:          '100%',
                      justifyContent: 'center',
                      padding:        '15px',
                      fontSize:       '0.66rem',
                      marginTop:      6,
                    }}
                  >
                    <span>Secure My Spot at Vidyut 26</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>

                  <div style={{
                    fontFamily:    'var(--font-wide)',
                    fontSize:      '0.48rem',
                    fontWeight:    600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color:         'var(--pearl-ghost)',
                    textAlign:     'center',
                  }}>
                    Free Entry {'\u00B7'} No Fee {'\u00B7'} Open to All
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── All responsive styles ── */}
      <style>{`

        /* Event panel — desktop side by side */
        .event-panel-inner {
          flex-direction: row;
        }
        .event-img {
          width: 45%;
          min-height: 420px;
        }
        .event-details {
          padding: 48px 44px;
        }

        /* Timeline */
        .timeline-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        /* Register */
        .register-grid {
          grid-template-columns: 1fr 1fr;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .event-img { width: 40% !important; }
          .event-details { padding: 36px 32px !important; }
        }

        /* Mobile */
        @media (max-width: 700px) {
          /* Event panel stacks */
          .event-panel-inner { flex-direction: column !important; }
          .event-img {
            width: 100% !important;
            min-height: 240px !important;
            max-height: 280px;
          }
          .event-details { padding: 28px 24px !important; }

          /* Timeline stacks */
          .timeline-grid {
            grid-template-columns: 1fr !important;
            gap: 1px !important;
          }

          /* Register stacks */
          .register-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }

        @media (max-width: 500px) {
          .event-img { max-height: 220px; }
        }
      `}</style>
    </div>
  );
}