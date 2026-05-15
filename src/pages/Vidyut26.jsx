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
    desc:  'The centrepiece of Vidyut 26 — a sprawling exhibition of production EVs, concept vehicles, and working prototypes from India\'s leading manufacturers and global brands. Walk the floor and witness firsthand how electric mobility has evolved from niche novelty to mainstream powerhouse. Engineers and designers will be on hand for live walkthroughs, detailed tech breakdowns, and direct Q&A sessions. Every vehicle on display represents a different vision of the electric future — and every visitor leaves with a new perspective on what mobility can be.',
  },
  {
    id:    '02',
    tag:   'Competition',
    title: 'Vidyut Speed Trials',
    date:  'March 14',
    time:  '2:00 PM',
    seats: '24 Teams',
    prize: '₹1,50,000',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
    desc:  'Student-built electric vehicles go head-to-head in timed acceleration runs across a purpose-designed track on the NIT Bhopal campus. Teams from universities across India compete in multiple categories — lightweight two-wheelers to full-scale electric karts. Each run is a testament to months of engineering, sleepless nights, and relentless iteration. Witness instant torque and zero-emission speed in its rawest, most honest form. The crowd favourite at every edition of Vidyut — and this year the track is longer and faster than ever before.',
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
    desc:  'The battery is the heart of every electric vehicle — and this symposium goes deep into its future. Researchers, battery scientists, and startup founders present cutting-edge work on solid-state batteries, silicon-anode technology, ultra-fast charging, and second-life battery applications. Presentations are followed by open panel discussions, giving attendees direct access to the scientists shaping tomorrow\'s energy storage. Whether you are a student, researcher, or industry professional — this is the session that changes how you see the EV transition.',
  },
  {
    id:    '04',
    tag:   'Challenge',
    title: 'EV Design Hackathon',
    date:  'March 15',
    time:  '8:00 AM',
    seats: '40 Teams',
    prize: '₹5,00,000',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=85',
    desc:  '48 hours. Three problem tracks. Unlimited ambition. Teams of four dive into EV charging infrastructure, battery management systems, or urban last-mile delivery. Armed with hardware components, cloud credits, and mentorship from industry veterans, participants design, prototype, and pitch to a panel of investors and engineers. This is not just a hackathon — it is a launchpad. Past Vidyut Hackathon winners have founded funded startups and won national innovation awards. This year\'s prize pool is the largest in Vidyut history.',
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
    desc:  'India has pledged 30% EV adoption by 2030. The Green Future Summit brings together policymakers, urban planners, EV startup founders, and sustainability experts for an unflinching conversation about what that commitment actually requires. Topics include charging infrastructure gaps, rural EV adoption, grid readiness for mass electrification, and the role of public investment in accelerating change. Expect data, debate, and a clear-eyed view of the road ahead — with no comfortable assumptions left unchallenged.',
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
    desc:  'A hands-on deep-dive into the full stack of EV charging — from AC/DC fundamentals and connector standards to smart grid integration, demand response, and vehicle-to-grid technology. Attendees configure a real charging station, simulate grid load scenarios, and explore business models for network deployment across India\'s tier-2 and tier-3 cities. Conducted by practising engineers from the EV charging industry. Limited to 60 participants to ensure every attendee gets hands-on time with the hardware.',
  },
];

var TIMELINE = [
  {
    day:    'Day One',
    date:   'March 14',
    title:  'Ignition',
    color:  'var(--copper)',
    events: [
      'Grand Opening Ceremony',
      'EV Grand Showcase Launch',
      'Speed Trial Qualifiers',
      'Industry Networking Dinner',
    ],
  },
  {
    day:    'Day Two',
    date:   'March 15',
    title:  'Acceleration',
    color:  'var(--pearl-dim)',
    events: [
      'Battery Tech Symposium',
      'Hackathon — 48hr Kickoff',
      'Green Future Summit',
      'Live Demos and Test Rides',
    ],
  },
  {
    day:    'Day Three',
    date:   'March 16',
    title:  'Podium',
    color:  'var(--sage)',
    events: [
      'Smart Charging Workshop',
      'Hackathon Finals and Pitch',
      'Speed Trial Finals',
      'Awards and Closing Gala',
    ],
  },
];

// ── Sponsorship tiers ──
// Each tier unlocks at a specific budget step.
// Min: ₹50,000  Max: ₹2,00,000  Step: ₹50,000
// Steps: 50k → 1L → 1.5L → 2L
var SPONSOR_TIERS = [
  {
    name:       'Community',
    threshold:  50000,
    color:      '#8a8a9a',
    colorLabel: 'Community',
    perks: [
      { text: 'Logo on official website',        included: true  },
      { text: 'Social media mention (2 posts)',   included: true  },
      { text: '2 complimentary delegate passes',  included: true  },
      { text: 'Name in event booklet',            included: true  },
      { text: 'Banner at venue entrance',         included: false },
      { text: 'Exhibition booth space',           included: false },
      { text: 'Speaking slot at main stage',      included: false },
      { text: 'Logo on stage backdrop',           included: false },
      { text: 'Dedicated press coverage',         included: false },
      { text: 'VIP lounge access',                included: false },
      { text: 'Event naming rights',              included: false },
      { text: 'Year-round EVOLVE branding',       included: false },
    ],
  },
  {
    name:       'Silver',
    threshold:  100000,
    color:      '#b0b8c8',
    colorLabel: 'Silver',
    perks: [
      { text: 'Logo on official website',         included: true  },
      { text: 'Social media mention (2 posts)',    included: true  },
      { text: '2 complimentary delegate passes',   included: true  },
      { text: 'Name in event booklet',             included: true  },
      { text: 'Banner at venue entrance',          included: true  },
      { text: 'Exhibition booth — 4 sqm',          included: true  },
      { text: 'Speaking slot at main stage',       included: false },
      { text: 'Logo on stage backdrop',            included: false },
      { text: 'Dedicated press coverage',          included: false },
      { text: 'VIP lounge access',                 included: false },
      { text: 'Event naming rights',               included: false },
      { text: 'Year-round EVOLVE branding',        included: false },
    ],
  },
  {
    name:       'Gold',
    threshold:  150000,
    color:      '#d4af37',
    colorLabel: 'Gold',
    perks: [
      { text: 'Logo on official website',          included: true  },
      { text: 'Social media mention (5 posts)',    included: true  },
      { text: '10 complimentary delegate passes',  included: true  },
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
    name:       'Title',
    threshold:  200000,
    color:      '#B87333',
    colorLabel: 'Title',
    perks: [
      { text: 'Logo on official website',          included: true  },
      { text: 'Social media campaign — full run',  included: true  },
      { text: '30 complimentary delegate passes',  included: true  },
      { text: 'Full-page + back cover booklet',    included: true  },
      { text: 'Banner at all venue zones',         included: true  },
      { text: 'Exhibition booth — 30 sqm premium', included: true  },
      { text: 'Keynote speaking slot',             included: true  },
      { text: 'Prominent logo on stage backdrop',  included: true  },
      { text: 'Dedicated press coverage',          included: true  },
      { text: 'Exclusive VIP lounge access',       included: true  },
      { text: 'Event naming rights',               included: true  },
      { text: 'Year-round EVOLVE branding',        included: true  },
    ],
  },
];

function formatBudget(val) {
  if (val >= 100000) {
    var l = val / 100000;
    return '\u20B9' + (l === Math.floor(l) ? l : l.toFixed(1)) + 'L';
  }
  return '\u20B9' + (val / 1000) + 'K';
}

function CheckIcon(props) {
  var color = props.color || 'var(--copper)';
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function SponsorSimulator() {
  // Steps: 50000, 100000, 150000, 200000
  var STEPS = [50000, 100000, 150000, 200000];
  var MIN   = 50000;
  var MAX   = 200000;

  var budgetState = useState(50000);
  var budget      = budgetState[0];
  var setBudget   = budgetState[1];

  // Find which tier is active based on budget
  var activeTierIndex = 0;
  for (var i = 0; i < SPONSOR_TIERS.length; i++) {
    if (budget >= SPONSOR_TIERS[i].threshold) {
      activeTierIndex = i;
    }
  }
  var activeTier = SPONSOR_TIERS[activeTierIndex];

  // Slider fill %
  var fillPct = ((budget - MIN) / (MAX - MIN)) * 100;

  return (
    <div style={{
      background: 'var(--charcoal-2)',
      border:     'var(--border)',
      position:   'relative',
      overflow:   'hidden',
    }}>

      {/* Top copper line */}
      <div style={{
        position:   'absolute',
        top: 0, left: '12%', right: '12%',
        height:     1,
        background: 'linear-gradient(90deg, transparent, var(--copper), transparent)',
        opacity:    0.4,
      }} />

      {/* ── Header ── */}
      <div style={{
        padding:      '52px 56px 40px',
        borderBottom: 'var(--border)',
      }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          Sponsorship Simulator
        </div>
        <div style={{
          display:        'flex',
          alignItems:     'flex-end',
          justifyContent: 'space-between',
          flexWrap:       'wrap',
          gap:            20,
          marginBottom:   10,
        }}>
          <h3 style={{
            fontFamily:  'var(--font-serif)',
            fontSize:    'clamp(1.8rem, 3vw, 2.6rem)',
            fontWeight:  300,
            color:       'var(--pearl)',
            lineHeight:  1.1,
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
            maxWidth:    380,
          }}>
            Move the slider to select your budget.
            Each step unlocks a new sponsorship tier
            with additional branding and visibility benefits.
          </p>
        </div>
      </div>

      {/* ── Slider section ── */}
      <div style={{ padding: '44px 56px', borderBottom: 'var(--border)' }}>

        {/* Budget display + tier badge */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          marginBottom:   32,
          flexWrap:       'wrap',
          gap:            16,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <div style={{
              fontFamily:  'var(--font-serif)',
              fontSize:    'clamp(3rem, 6vw, 5rem)',
              fontWeight:  300,
              lineHeight:  1,
              color:       activeTier.color,
              transition:  'color 0.4s ease',
            }}>
              {formatBudget(budget)}
            </div>
            <div style={{
              fontFamily:  'var(--font-wide)',
              fontSize:    '0.6rem',
              fontWeight:  600,
              letterSpacing: '0.15em',
              color:       'var(--pearl-muted)',
              textTransform: 'uppercase',
            }}>
              per annum
            </div>
          </div>

          {/* Active tier pill */}
          <div style={{
            display:       'flex',
            alignItems:    'center',
            gap:           10,
            padding:       '10px 20px',
            border:        '1px solid ' + activeTier.color,
            background:    'transparent',
            transition:    'border-color 0.4s ease',
          }}>
            <div style={{
              width:      8,
              height:     8,
              borderRadius: '50%',
              background: activeTier.color,
              transition: 'background 0.4s ease',
            }} />
            <div style={{
              fontFamily:    'var(--font-wide)',
              fontSize:      '0.62rem',
              fontWeight:    700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         activeTier.color,
              transition:    'color 0.4s ease',
            }}>
              {activeTier.name} Sponsor
            </div>
          </div>
        </div>

        {/* Slider */}
        <div style={{ marginBottom: 20, position: 'relative' }}>
          <input
            type="range"
            min={MIN}
            max={MAX}
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
              transition:       'background 0.3s ease',
            }}
          />
        </div>

        {/* Step markers */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          position:       'relative',
        }}>
          {STEPS.map(function(step, i) {
            var isActive  = budget >= step;
            var isCurrent = budget === step;
            return (
              <div
                key={step}
                onClick={function() { setBudget(step); }}
                style={{
                  display:       'flex',
                  flexDirection: 'column',
                  alignItems:    i === 0 ? 'flex-start' : i === STEPS.length - 1 ? 'flex-end' : 'center',
                  cursor:        'none',
                  gap:           6,
                }}
              >
                {/* Tick mark */}
                <div style={{
                  width:      1,
                  height:     8,
                  background: isActive ? SPONSOR_TIERS[i].color : 'rgba(255,255,255,0.12)',
                  transition: 'background 0.3s ease',
                  alignSelf:  i === 0 ? 'flex-start' : i === STEPS.length - 1 ? 'flex-end' : 'center',
                }} />

                {/* Label */}
                <div style={{
                  fontFamily:    'var(--font-wide)',
                  fontSize:      '0.52rem',
                  fontWeight:    isCurrent ? 700 : 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color:         isCurrent
                    ? SPONSOR_TIERS[i].color
                    : isActive
                      ? 'var(--pearl-muted)'
                      : 'var(--pearl-ghost)',
                  transition:    'color 0.3s ease',
                }}>
                  {SPONSOR_TIERS[i].name}
                </div>
                <div style={{
                  fontFamily:  'var(--font-mono)',
                  fontSize:    '0.5rem',
                  fontWeight:  300,
                  color:       isCurrent ? SPONSOR_TIERS[i].color : 'var(--pearl-ghost)',
                  transition:  'color 0.3s ease',
                  opacity:     0.8,
                }}>
                  {formatBudget(step)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Perks comparison table ── */}
      <div style={{ padding: '0 56px' }}>

        {/* Table header */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr repeat(4, 100px)',
          gap:                 0,
          borderBottom:        'var(--border)',
          padding:             '20px 0',
        }}
          className="perks-header"
        >
          <div style={{
            fontFamily:    'var(--font-wide)',
            fontSize:      '0.52rem',
            fontWeight:    600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         'var(--pearl-ghost)',
          }}>
            What You Get
          </div>

          {SPONSOR_TIERS.map(function(tier, i) {
            var isActive = activeTierIndex >= i;
            return (
              <div key={tier.name} style={{
                textAlign:     'center',
                padding:       '0 8px',
                borderLeft:    'var(--border)',
                transition:    'background 0.4s ease',
                background:    i === activeTierIndex
                  ? 'rgba(255,255,255,0.02)'
                  : 'transparent',
              }}>
                <div style={{
                  fontFamily:    'var(--font-wide)',
                  fontSize:      '0.52rem',
                  fontWeight:    700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color:         isActive ? tier.color : 'var(--pearl-ghost)',
                  transition:    'color 0.4s ease',
                }}>
                  {tier.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Perk rows */}
        {SPONSOR_TIERS[0].perks.map(function(perk, perkIdx) {
          return (
            <div key={perkIdx} style={{
              display:          'grid',
              gridTemplateColumns: '1fr repeat(4, 100px)',
              gap:              0,
              borderBottom:     perkIdx < SPONSOR_TIERS[0].perks.length - 1
                ? 'var(--border)'
                : 'none',
              padding:          '14px 0',
              transition:       'background 0.2s ease',
            }}
              className="perk-row"
              onMouseEnter={function(e) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.015)';
              }}
              onMouseLeave={function(e) {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {/* Perk label */}
              <div style={{
                fontFamily:  'var(--font-body)',
                fontSize:    '0.85rem',
                fontWeight:  300,
                color:       'var(--pearl-muted)',
                lineHeight:  1.4,
                paddingRight: 16,
                display:     'flex',
                alignItems:  'center',
              }}>
                {perk.text}
              </div>

              {/* Tier columns */}
              {SPONSOR_TIERS.map(function(tier, tierIdx) {
                var tierHasPerk  = tier.perks[perkIdx].included;
                var tierUnlocked = activeTierIndex >= tierIdx;
                var isHighlight  = tierIdx === activeTierIndex;

                return (
                  <div key={tier.name} style={{
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    borderLeft:     'var(--border)',
                    background:     isHighlight
                      ? 'rgba(255,255,255,0.02)'
                      : 'transparent',
                    transition:     'background 0.4s ease',
                  }}>
                    {tierHasPerk ? (
                      <div style={{
                        opacity:    tierUnlocked ? 1 : 0.25,
                        transition: 'opacity 0.4s ease',
                      }}>
                        <CheckIcon color={tierUnlocked ? tier.color : 'rgba(255,255,255,0.2)'} />
                      </div>
                    ) : (
                      <div style={{ opacity: 0.4 }}>
                        <CrossIcon />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* ── Unlocked summary bar ── */}
      <div style={{
        margin:     '0 56px',
        padding:    '24px 0',
        borderTop:  'var(--border)',
        display:    'flex',
        alignItems: 'center',
        gap:        16,
        flexWrap:   'wrap',
      }}>
        <div style={{
          fontFamily:  'var(--font-serif)',
          fontSize:    '1rem',
          fontStyle:   'italic',
          fontWeight:  300,
          color:       'var(--pearl-muted)',
        }}>
          At {formatBudget(budget)} you unlock
        </div>
        <div style={{
          fontFamily:    'var(--font-wide)',
          fontSize:      '0.62rem',
          fontWeight:    700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color:         activeTier.color,
          transition:    'color 0.4s ease',
        }}>
          {activeTier.perks.filter(function(p) { return p.included; }).length} benefits
        </div>
        <div style={{
          fontFamily:  'var(--font-serif)',
          fontSize:    '1rem',
          fontStyle:   'italic',
          fontWeight:  300,
          color:       'var(--pearl-muted)',
        }}>
          as a {activeTier.name} Sponsor.
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{
        padding:        '32px 56px 52px',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        flexWrap:       'wrap',
        gap:            24,
        borderTop:      'var(--border)',
      }}>
        <div>
          <div style={{
            fontFamily:  'var(--font-serif)',
            fontSize:    '1.15rem',
            fontWeight:  300,
            fontStyle:   'italic',
            color:       'var(--pearl)',
            marginBottom: 6,
          }}>
            Ready to partner with EVOLVE?
          </div>
          <div style={{
            fontFamily:  'var(--font-body)',
            fontSize:    '0.82rem',
            fontWeight:  300,
            color:       'var(--pearl-muted)',
          }}>
            Our team will send a full sponsorship deck within 24 hours of enquiry.
          </div>
        </div>
        <a href={'mailto:evolve@nitb.in?subject=Sponsorship Enquiry — ' + activeTier.name + ' Tier — Vidyut 26'}>
          <button className="btn-primary">
            <span>Request {activeTier.name} Tier Deck</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
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
          background:   var(--copper);
          border:       3px solid var(--charcoal-2);
          cursor:       none;
          box-shadow:   0 0 0 1px rgba(184,115,51,0.4);
          transition:   box-shadow 0.3s ease, background 0.3s ease;
        }
        input[type='range']::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 4px rgba(184,115,51,0.15);
        }
        input[type='range']::-moz-range-thumb {
          width:        20px;
          height:       20px;
          border-radius: 50%;
          background:   var(--copper);
          border:       3px solid var(--charcoal-2);
          cursor:       none;
        }
        input[type='range']:focus {
          outline: none;
        }
        @media (max-width: 900px) {
          .perks-header { grid-template-columns: 1fr repeat(4, 72px) !important; }
          .perk-row     { grid-template-columns: 1fr repeat(4, 72px) !important; }
        }
        @media (max-width: 640px) {
          .perks-header { grid-template-columns: 1fr repeat(4, 52px) !important; }
          .perk-row     { grid-template-columns: 1fr repeat(4, 52px) !important; }
        }
      `}</style>
    </div>
  );
}

export default function Vidyut26() {
  var heroState      = useState(false);
  var heroVisible    = heroState[0];
  var setHeroVisible = heroState[1];

  var activeEventState = useState(0);
  var activeEvent      = activeEventState[0];
  var setActiveEvent   = activeEventState[1];

  var formState   = useState({ name: '', email: '', college: '', event: '' });
  var formData    = formState[0];
  var setFormData = formState[1];

  var subState   = useState(false);
  var submitted  = subState[0];
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
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(135deg, rgba(10,10,11,0.97) 45%, rgba(10,10,11,0.6) 100%)',
        }} />
        <div style={{
          position:   'absolute',
          bottom: 0, left: 0, right: 0,
          height:     '40%',
          background: 'linear-gradient(0deg, var(--charcoal) 0%, transparent 100%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 680 }}>

            <div style={{
              opacity:    heroVisible ? 1 : 0,
              transform:  heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.6s ease 0.1s',
            }}>
              <div className="badge" style={{ marginBottom: 36, display: 'inline-flex' }}>
                26th Annual EV Conclave {'\u00B7'} NIT Bhopal
              </div>
            </div>

            <div style={{
              opacity:    heroVisible ? 1 : 0,
              transform:  heroVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.8s ease 0.2s',
            }}>
              <div style={{
                fontFamily:    'var(--font-wide)',
                fontSize:      '0.62rem',
                fontWeight:    600,
                letterSpacing: '0.4em',
                color:         'var(--copper)',
                textTransform: 'uppercase',
                marginBottom:  16,
              }}>
                Evolve Presents
              </div>
              <h1 style={{
                fontFamily:    'var(--font-serif)',
                fontSize:      'clamp(5rem, 13vw, 11rem)',
                fontWeight:    300,
                lineHeight:    0.9,
                letterSpacing: '-0.01em',
              }}>
                <span style={{ display: 'block', color: 'var(--pearl)' }}>Vidyut</span>
                <span style={{ display: 'block', fontStyle: 'italic', color: 'var(--copper-light)' }}>26</span>
              </h1>
            </div>

            <div style={{
              opacity:    heroVisible ? 1 : 0,
              transform:  heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.8s ease 0.38s',
              marginTop:  32,
            }}>
              <p style={{
                fontFamily:   'var(--font-body)',
                fontSize:     '1.05rem',
                fontWeight:   300,
                color:        'var(--pearl-muted)',
                lineHeight:   1.8,
                maxWidth:     520,
                marginBottom: 44,
              }}>
                Three days. One campus. A thousand sparks of innovation.
                India's most electrifying student-led EV conclave returns
                with its boldest programme, largest prize pool, and most
                ambitious vision yet.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="#register">
                  <button className="btn-primary" style={{ padding: '15px 44px' }}>
                    <span>Register {'\u2014'} Free Entry</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </a>
                <a href="#sponsor">
                  <button className="btn-ghost">
                    <span>Sponsor Vidyut 26</span>
                  </button>
                </a>
              </div>
            </div>

            <div style={{
              display:    'flex',
              gap:        12,
              marginTop:  52,
              flexWrap:   'wrap',
              opacity:    heroVisible ? 1 : 0,
              transition: 'all 0.8s ease 0.55s',
            }}>
              {[
                { icon: '\uD83D\uDCC5', text: 'March 14\u201316, 2026' },
                { icon: '\uD83D\uDCCD', text: 'NIT Bhopal, MP'       },
                { icon: '\uD83C\uDFC6', text: '\u20B96.5L Prize Pool' },
              ].map(function(pill) {
                return (
                  <div key={pill.text} style={{
                    display:    'flex',
                    alignItems: 'center',
                    gap:        8,
                    padding:    '9px 18px',
                    background: 'rgba(255,255,255,0.03)',
                    border:     'var(--border)',
                    fontFamily: 'var(--font-body)',
                    fontSize:   '0.82rem',
                    fontWeight: 300,
                    color:      'var(--pearl-muted)',
                  }}>
                    {pill.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════
          EVENTS
      ══════════════════════════════ */}
      <section className="section" ref={eventsRef}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <div className="eyebrow">Programme</div>
            <h2 style={{
              fontFamily:  'var(--font-serif)',
              fontSize:    'clamp(2.2rem, 4vw, 3.6rem)',
              fontWeight:  300,
              color:       'var(--pearl)',
              lineHeight:  1.05,
            }}>
              Events {'\u0026'}{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--copper-light)' }}>
                Competitions
              </span>
            </h2>
          </div>

          {/* Tab strip */}
          <div style={{
            display:      'flex',
            gap:          0,
            marginBottom: 32,
            borderBottom: 'var(--border)',
            overflowX:    'auto',
          }}>
            {EVENTS.map(function(ev, i) {
              var isActive = activeEvent === i;
              return (
                <button
                  key={ev.id}
                  onClick={function() { setActiveEvent(i); }}
                  style={{
                    padding:       '14px 22px',
                    background:    'transparent',
                    border:        'none',
                    borderBottom:  isActive
                      ? '2px solid var(--copper)'
                      : '2px solid transparent',
                    fontFamily:    'var(--font-wide)',
                    fontSize:      '0.56rem',
                    fontWeight:    600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color:         isActive ? 'var(--copper-light)' : 'var(--pearl-ghost)',
                    cursor:        'none',
                    whiteSpace:    'nowrap',
                    transition:    'all 0.3s ease',
                    marginBottom:  -1,
                  }}
                  onMouseEnter={function(e) {
                    if (!isActive) e.currentTarget.style.color = 'var(--pearl-muted)';
                  }}
                  onMouseLeave={function(e) {
                    if (!isActive) e.currentTarget.style.color = 'var(--pearl-ghost)';
                  }}
                >
                  {ev.id} {'\u2014'} {ev.tag}
                </button>
              );
            })}
          </div>

          {/* Active event panel */}
          {EVENTS.map(function(ev, i) {
            if (i !== activeEvent) return null;
            return (
              <div key={ev.id} style={{
                display:             'grid',
                gridTemplateColumns: '1fr 1fr',
                gap:                 0,
                border:              'var(--border)',
                overflow:            'hidden',
                opacity:             eventsVisible ? 1 : 0,
                transform:           eventsVisible ? 'translateY(0)' : 'translateY(24px)',
                transition:          'all 0.6s ease',
              }}
                className="event-panel"
              >
                {/* Image */}
                <div style={{ position: 'relative', overflow: 'hidden', minHeight: 440 }}>
                  <img
                    src={ev.image}
                    alt={ev.title}
                    style={{
                      width:      '100%',
                      height:     '100%',
                      objectFit:  'cover',
                      filter:     'brightness(0.5) contrast(1.15) saturate(0.35)',
                      transition: 'transform 0.8s ease',
                    }}
                    onMouseEnter={function(e) { e.currentTarget.style.transform = 'scale(1.04)'; }}
                    onMouseLeave={function(e) { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                  <div style={{
                    position:   'absolute',
                    inset:      0,
                    background: 'linear-gradient(90deg, transparent 55%, rgba(10,10,11,0.8) 100%)',
                  }} />
                  {ev.prize && (
                    <div style={{
                      position:   'absolute',
                      bottom:     28,
                      left:       28,
                      padding:    '10px 18px',
                      background: 'rgba(10,10,11,0.9)',
                      border:     'var(--border-copper)',
                      fontFamily: 'var(--font-serif)',
                      fontSize:   '1.3rem',
                      fontWeight: 300,
                      color:      'var(--copper-light)',
                    }}>
                      {ev.prize} Prize
                    </div>
                  )}
                </div>

                {/* Details */}
                <div style={{
                  padding:        '52px 48px',
                  background:     'var(--charcoal-2)',
                  display:        'flex',
                  flexDirection:  'column',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    fontFamily:    'var(--font-wide)',
                    fontSize:      '0.55rem',
                    fontWeight:    600,
                    letterSpacing: '0.25em',
                    color:         'var(--copper)',
                    textTransform: 'uppercase',
                    marginBottom:  16,
                  }}>
                    {ev.tag}
                  </div>
                  <h3 style={{
                    fontFamily:   'var(--font-serif)',
                    fontSize:     'clamp(1.8rem, 3vw, 2.4rem)',
                    fontWeight:   300,
                    color:        'var(--pearl)',
                    lineHeight:   1.1,
                    marginBottom: 20,
                  }}>
                    {ev.title}
                  </h3>
                  <p style={{
                    fontFamily:   'var(--font-body)',
                    fontSize:     '0.88rem',
                    fontWeight:   300,
                    color:        'var(--pearl-muted)',
                    lineHeight:   1.82,
                    marginBottom: 32,
                  }}>
                    {ev.desc}
                  </p>
                  <div style={{
                    display:      'flex',
                    gap:          32,
                    flexWrap:     'wrap',
                    marginBottom: 36,
                    paddingTop:   24,
                    borderTop:    'var(--border)',
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
                            fontSize:      '0.5rem',
                            fontWeight:    600,
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            color:         'var(--pearl-ghost)',
                            marginBottom:  5,
                          }}>
                            {m.label}
                          </div>
                          <div style={{
                            fontFamily:  'var(--font-body)',
                            fontSize:    '0.88rem',
                            fontWeight:  400,
                            color:       'var(--pearl-dim)',
                          }}>
                            {m.value}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <a href="#register">
                    <button className="btn-primary">
                      <span>Register for this Event</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </a>
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
        borderTop:    'var(--border)',
        borderBottom: 'var(--border)',
        background:   'var(--charcoal-2)',
      }}>
        <div className="container">
          <div style={{ marginBottom: 56 }}>
            <div className="eyebrow">Schedule</div>
            <h2 style={{
              fontFamily:  'var(--font-serif)',
              fontSize:    'clamp(2.2rem, 4vw, 3.6rem)',
              fontWeight:  300,
              color:       'var(--pearl)',
              lineHeight:  1.05,
            }}>
              Three Days of{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--copper-light)' }}>
                Pure Electric
              </span>
            </h2>
          </div>
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap:                 1,
            background:          'rgba(255,255,255,0.04)',
          }}
            className="timeline-grid"
          >
            {TIMELINE.map(function(day, i) {
              return (
                <div key={day.day} style={{
                  padding:    '48px 40px',
                  background: 'var(--charcoal-2)',
                  opacity:    timelineVisible ? 1 : 0,
                  transform:  timelineVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'all 0.6s ease ' + (i * 0.12) + 's',
                  position:   'relative',
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
                    fontSize:      '0.52rem',
                    fontWeight:    600,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color:         'var(--pearl-ghost)',
                    marginBottom:  6,
                  }}>
                    {day.date}
                  </div>
                  <div style={{
                    fontFamily:    'var(--font-wide)',
                    fontSize:      '0.6rem',
                    fontWeight:    700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         day.color,
                    marginBottom:  4,
                  }}>
                    {day.day}
                  </div>
                  <div style={{
                    fontFamily:   'var(--font-serif)',
                    fontSize:     '2.2rem',
                    fontWeight:   300,
                    color:        'var(--pearl)',
                    marginBottom: 32,
                    lineHeight:   1,
                  }}>
                    {day.title}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {day.events.map(function(ev) {
                      return (
                        <div key={ev} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{
                            width:      20, height: 1,
                            background: day.color,
                            opacity:    0.4, flexShrink: 0,
                          }} />
                          <span style={{
                            fontFamily:  'var(--font-body)',
                            fontSize:    '0.85rem',
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
          REGISTER FORM
      ══════════════════════════════ */}
      <section className="section" id="register" ref={registerRef} style={{
        borderTop:  'var(--border)',
        background: 'var(--charcoal-2)',
      }}>
        <div className="container">
          <div style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 80,
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
                fontSize:     'clamp(2.2rem, 4vw, 3.4rem)',
                fontWeight:   300,
                color:        'var(--pearl)',
                lineHeight:   1.05,
                marginBottom: 24,
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
                marginBottom: 40,
              }}>
                Entry is completely free. Secure your spot at India's most
                ambitious electric vehicle event of 2026. Fill in your details
                and we will send you everything you need before March 14th.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  'Free entry — no registration fee whatsoever',
                  'Open to all students and working professionals',
                  'Confirmation email within 24 hours',
                  'Full access to all open sessions and exhibitions',
                ].map(function(item) {
                  return (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{
                        width:          20, height: 20,
                        borderRadius:   '50%',
                        border:         'var(--border-copper)',
                        display:        'flex',
                        alignItems:     'center',
                        justifyContent: 'center',
                        flexShrink:     0,
                      }}>
                        <CheckIcon color="var(--copper)" />
                      </div>
                      <span style={{
                        fontFamily:  'var(--font-body)',
                        fontSize:    '0.85rem',
                        fontWeight:  300,
                        color:       'var(--pearl-muted)',
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
                  padding:    '64px 48px',
                  background: 'var(--charcoal-3)',
                  border:     'var(--border-copper)',
                  textAlign:  'center',
                }}>
                  <div style={{
                    fontFamily:   'var(--font-serif)',
                    fontSize:     '3.2rem',
                    fontWeight:   300,
                    fontStyle:    'italic',
                    color:        'var(--copper-light)',
                    marginBottom: 16,
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
                  }}>
                    Welcome to Vidyut 26. Check your email for confirmation
                    and event details. We will see you on March 14th at NIT Bhopal.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {[
                    { label: 'Full Name',            key: 'name',    type: 'text',  ph: 'Your full name'         },
                    { label: 'Email Address',         key: 'email',   type: 'email', ph: 'you@college.edu.in'     },
                    { label: 'College / Institution', key: 'college', type: 'text',  ph: 'NIT Bhopal, IIT Delhi...' },
                  ].map(function(field) {
                    return (
                      <div key={field.key}>
                        <label style={{
                          display:       'block',
                          fontFamily:    'var(--font-wide)',
                          fontSize:      '0.52rem',
                          fontWeight:    600,
                          letterSpacing: '0.22em',
                          textTransform: 'uppercase',
                          color:         'var(--pearl-ghost)',
                          marginBottom:  8,
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
                            padding:    '13px 16px',
                            background: 'var(--charcoal-3)',
                            border:     'var(--border)',
                            color:      'var(--pearl)',
                            fontFamily: 'var(--font-body)',
                            fontSize:   '0.88rem',
                            fontWeight: 300,
                            outline:    'none',
                            cursor:     'text',
                            transition: 'border-color 0.3s ease',
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
                      fontSize:      '0.52rem',
                      fontWeight:    600,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color:         'var(--pearl-ghost)',
                      marginBottom:  8,
                    }}>
                      Primary Event Interest
                    </label>
                    <select
                      value={formData.event}
                      onChange={function(e) { updateForm('event', e.target.value); }}
                      style={{
                        width:      '100%',
                        padding:    '13px 16px',
                        background: 'var(--charcoal-3)',
                        border:     'var(--border)',
                        color:      formData.event ? 'var(--pearl)' : 'var(--pearl-muted)',
                        fontFamily: 'var(--font-body)',
                        fontSize:   '0.88rem',
                        fontWeight: 300,
                        outline:    'none',
                        cursor:     'none',
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
                    style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: '0.68rem', marginTop: 8 }}
                  >
                    <span>Secure My Spot at Vidyut 26</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>

                  <div style={{
                    fontFamily:    'var(--font-wide)',
                    fontSize:      '0.5rem',
                    fontWeight:    600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color:         'var(--pearl-ghost)',
                    textAlign:     'center',
                  }}>
                    Free Entry {'\u00B7'} No Registration Fee {'\u00B7'} Open to All
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .event-panel    { grid-template-columns: 1fr !important; }
          .timeline-grid  { grid-template-columns: 1fr !important; }
          .register-grid  { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </div>
  );
}