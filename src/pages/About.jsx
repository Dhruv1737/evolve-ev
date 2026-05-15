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
  var duration = props.duration || 2200;
  var s        = useState(0);
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
  return React.createElement('span', { ref: ref }, count + suffix);
}

var TIMELINE = [
  {
    year:  '2021',
    title: 'The Beginning',
    desc:  'Three NIT Bhopal undergraduates launch EVOLVE with a single electric scooter on display and a conviction that India\'s EV revolution needed a student voice. The inaugural Vidyut draws 200 attendees and sets a precedent that the campus has never seen before.',
  },
  {
    year:  '2022',
    title: 'First Industry Bridge',
    desc:  'EVOLVE secures its first corporate partnership with a leading EV manufacturer. Production vehicles arrive on campus for the first time. Attendance triples. The Vidyut Speed Trials debut and instantly become the most-anticipated event of the conclave.',
  },
  {
    year:  '2023',
    title: 'National Stage',
    desc:  'Vidyut 23 draws teams from 18 states and earns coverage in three national publications. The EV Hackathon launches with a ₹2L prize pool. Two winning teams go on to found funded startups within the calendar year — and EVOLVE\'s reputation changes permanently.',
  },
  {
    year:  '2024',
    title: 'Institutional Recognition',
    desc:  'Footfall crosses 3,000 for the first time. EVOLVE partners with the Ministry of Heavy Industries for a dedicated policy panel. The Battery Tech Symposium debuts with speakers from ISRO, Ola Electric, and Tata Motors EV division.',
  },
  {
    year:  '2025',
    title: 'Record Edition',
    desc:  'Vidyut 25 — 4,500 attendees, 35 corporate exhibitors, ₹4L prize pool. EVOLVE is formally recognised as India\'s largest student-led electric vehicle conclave. Engineers from 9 countries attend the charging infrastructure workshop.',
  },
  {
    year:  '2026',
    title: 'Current of Change',
    desc:  'The 26th edition arrives with the most ambitious theme yet. 5,000 expected attendees, ₹6.5L prize pool, international keynote speakers, and the launch of the EVOLVE EV Research Grant — seeding student projects that will shape how India moves.',
  },
];

var VALUES = [
  {
    index: '01',
    title: 'Innovation First',
    desc:  'Breakthroughs happen when young engineers are given space to fail without consequence. Every EVOLVE programme is designed to push boundaries, not protect them.',
  },
  {
    index: '02',
    title: 'Sustainability at Core',
    desc:  'Electric mobility is not a technology choice — it is a responsibility. We build every event, every workshop, and every partnership with the planet\'s future as the non-negotiable bottom line.',
  },
  {
    index: '03',
    title: 'Community Driven',
    desc:  'EVOLVE is nothing without its 200 volunteers, 40 mentors, and thousands of attendees who show up each year believing that student-led change is real and lasting change.',
  },
  {
    index: '04',
    title: 'Open Access',
    desc:  'Knowledge about the electric future should not be gatekept. Every EVOLVE event is free to attend, every workshop open to all students, every insight shared with the world.',
  },
  {
    index: '05',
    title: 'Excellence Always',
    desc:  'From the quality of our speakers to the design of our events, we hold ourselves to a standard that makes industry professionals take notice — and want to come back.',
  },
  {
    index: '06',
    title: 'Action Over Talk',
    desc:  'We do not discuss the EV revolution — we build it. From live speed trials to funded prototypes, EVOLVE turns conversations into hardware and ideas into roads driven.',
  },
];

var TEAM = [
  { name: 'Priya Verma',   role: 'Head of Design',      dept: 'Creative'       },
  { name: 'Rohan Mehta',   role: 'Head of Technology',  dept: 'Engineering'    },
  { name: 'Simran Kaur',   role: 'Head of Sponsorship', dept: 'Partnerships'   },
  { name: 'Dev Patel',     role: 'Head of Operations',  dept: 'Logistics'      },
  { name: 'Nisha Gupta',   role: 'Head of Media',       dept: 'Communications' },
  { name: 'Arjun Singh',   role: 'Head of Competitions',dept: 'Events'         },
  { name: 'Kavya Reddy',   role: 'Head of Workshops',   dept: 'Education'      },
  { name: 'Ishan Dubey',   role: 'Head of Volunteers',  dept: 'Community'      },
];

var STATS = [
  { value: 200,  suffix: '+', label: 'Active Members'        },
  { value: 26,   suffix: '',  label: 'Editions of Vidyut'    },
  { value: 5000, suffix: '+', label: 'Annual Attendees'      },
  { value: 30,   suffix: '+', label: 'Industry Partners'     },
  { value: 10,   suffix: '+', label: 'Startups Launched'     },
];

export default function About() {
  var heroState      = useState(false);
  var heroVisible    = heroState[0];
  var setHeroVisible = heroState[1];

  var r1 = useReveal(0.08);
  var storyRef     = r1[0];
  var storyVisible = r1[1];

  var r2 = useReveal();
  var statsRef     = r2[0];
  var statsVisible = r2[1];

  var r3 = useReveal(0.05);
  var timelineRef     = r3[0];
  var timelineVisible = r3[1];

  var r4 = useReveal();
  var valuesRef     = r4[0];
  var valuesVisible = r4[1];

  var r5 = useReveal();
  var teamRef     = r5[0];
  var teamVisible = r5[1];

  var r6 = useReveal();
  var ctaRef     = r6[0];
  var ctaVisible = r6[1];

  useEffect(function() {
    var t = setTimeout(function() { setHeroVisible(true); }, 120);
    return function() { clearTimeout(t); };
  }, []);

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section style={{
        minHeight:     '80vh',
        display:       'flex',
        alignItems:    'flex-end',
        position:      'relative',
        overflow:      'hidden',
        paddingTop:    120,
        paddingBottom: 80,
      }}>

        {/* BG image */}
        <div style={{
          position:           'absolute',
          inset:              0,
          backgroundImage:    'url(https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=90)',
          backgroundSize:     'cover',
          backgroundPosition: 'center 40%',
          filter:             'brightness(0.12) contrast(1.2) saturate(0.25)',
        }} />

        {/* Overlays */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(135deg, rgba(10,10,11,0.98) 40%, rgba(10,10,11,0.7) 100%)',
        }} />
        <div style={{
          position:   'absolute',
          bottom: 0, left: 0, right: 0,
          height:     '45%',
          background: 'linear-gradient(0deg, var(--charcoal) 0%, transparent 100%)',
        }} />

        {/* Decorative right element */}
        <div style={{
          position:   'absolute',
          top:        '20%',
          right:      '8%',
          width:      280,
          height:     280,
          border:     '1px solid rgba(184,115,51,0.06)',
          borderRadius: '50%',
          animation:  'rotateSlow 40s linear infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position:   'absolute',
          top:        '25%',
          right:      '11%',
          width:      200,
          height:     200,
          border:     '1px solid rgba(184,115,51,0.04)',
          borderRadius: '50%',
          animation:  'rotateSlow 28s linear infinite reverse',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>

          <div style={{
            opacity:    heroVisible ? 1 : 0,
            transform:  heroVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.6s ease 0.1s',
            marginBottom: 24,
          }}>
            <span className="badge">Est. 2021 — NIT Bhopal</span>
          </div>

          <div style={{
            opacity:    heroVisible ? 1 : 0,
            transform:  heroVisible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'all 0.8s ease 0.2s',
          }}>
            <h1 style={{
              fontFamily:    'var(--font-serif)',
              fontSize:      'clamp(5rem, 13vw, 12rem)',
              fontWeight:    300,
              lineHeight:    0.88,
              letterSpacing: '-0.01em',
              marginBottom:  36,
            }}>
              <span style={{
                display:  'block',
                color:    'var(--pearl-muted)',
                fontSize: '28%',
                fontFamily: 'var(--font-wide)',
                fontWeight: 600,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}>
                We are
              </span>
              <span style={{
                display:   'block',
                color:     'var(--pearl)',
              }}>
                Evolve
              </span>
            </h1>
          </div>

          <div style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 80,
            opacity:    heroVisible ? 1 : 0,
            transform:  heroVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.8s ease 0.38s',
          }}
            className="about-hero-bottom"
          >
            <p style={{
              fontFamily:  'var(--font-body)',
              fontSize:    '1.05rem',
              fontWeight:  300,
              color:       'var(--pearl-muted)',
              lineHeight:  1.8,
              maxWidth:    520,
            }}>
              India's most passionate student community for electric
              mobility. We are engineers, dreamers, organisers, and
              advocates — united by the belief that the future of
              transport is electric, and that future starts on campus.
            </p>
            <div style={{
              display:   'flex',
              gap:       48,
              alignSelf: 'flex-end',
              flexWrap:  'wrap',
            }}>
              {[
                { val: '200+', label: 'Members'  },
                { val: '26',   label: 'Editions' },
                { val: '5K+',  label: 'Reached'  },
              ].map(function(s) {
                return (
                  <div key={s.label}>
                    <div style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize:   '2.6rem',
                      fontWeight: 300,
                      color:      'var(--copper-light)',
                      lineHeight: 1,
                      marginBottom: 6,
                    }}>
                      {s.val}
                    </div>
                    <div style={{
                      fontFamily:    'var(--font-wide)',
                      fontSize:      '0.52rem',
                      fontWeight:    600,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color:         'var(--pearl-ghost)',
                    }}>
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom divider */}
          <div style={{
            marginTop:  64,
            height:     1,
            background: 'linear-gradient(90deg, rgba(184,115,51,0.3), rgba(255,255,255,0.06), transparent)',
            opacity:    heroVisible ? 1 : 0,
            transition: 'opacity 1s ease 0.65s',
          }} />
        </div>
      </section>


      {/* ══════════════════════════════
          STORY
      ══════════════════════════════ */}
      <section className="section" ref={storyRef}>
        <div className="container">
          <div style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 80,
            alignItems:          'center',
          }}
            className="story-grid"
          >

            {/* Left — text */}
            <div style={{
              opacity:    storyVisible ? 1 : 0,
              transform:  storyVisible ? 'translateX(0)' : 'translateX(-32px)',
              transition: 'all 0.8s ease',
            }}>
              <div className="eyebrow">Who We Are</div>
              <h2 style={{
                fontFamily:  'var(--font-serif)',
                fontSize:    'clamp(2rem, 3.5vw, 3.2rem)',
                fontWeight:  300,
                color:       'var(--pearl)',
                lineHeight:  1.05,
                marginBottom: 32,
              }}>
                More than an EV club.{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--copper-light)' }}>
                  A movement.
                </span>
              </h2>

              {[
                'EVOLVE is the electric vehicle and sustainable mobility student body of NIT Bhopal. Founded in 2021 by three undergraduate engineers who believed that India\'s EV revolution needed a student voice, EVOLVE has grown into a 200-member organisation that is reshaping how engineering students engage with the future of transport.',
                'We are not a club that talks about electric vehicles — we build them, race them, and present them on stages that matter. Our members have gone on to work at Ola Electric, Tata Motors EV division, and ISRO\'s propulsion lab. Several have founded their own EV startups, two of which have raised institutional seed funding from marquee investors.',
                'Through Vidyut, our annual conclave, we create India\'s most immersive campus EV experience. Through our workshops and symposiums, we democratise access to cutting-edge knowledge. And through our competitions, we prove that world-class engineering innovation does not require a Silicon Valley zip code — just a real problem and the drive to solve it.',
              ].map(function(para, i) {
                return (
                  <p key={i} style={{
                    fontFamily:  'var(--font-body)',
                    fontSize:    '0.9rem',
                    fontWeight:  300,
                    color:       i === 0 ? 'var(--pearl-dim)' : 'var(--pearl-muted)',
                    lineHeight:  1.85,
                    marginBottom: 16,
                  }}>
                    {para}
                  </p>
                );
              })}

              <div style={{ marginTop: 36, display: 'flex', gap: 14 }}>
                <Link to="/founders">
                  <button className="btn-primary">
                    <span>Meet the Founders</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </Link>
                <Link to="/vidyut-26">
                  <button className="btn-ghost">
                    <span>Explore Vidyut 26</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right — image mosaic */}
            <div style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows:    '260px 200px',
              gap:                 10,
              opacity:    storyVisible ? 1 : 0,
              transform:  storyVisible ? 'translateX(0)' : 'translateX(32px)',
              transition: 'all 0.8s ease 0.15s',
            }}>
              {[
                {
                  src:  'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=700&q=85',
                  span: true,
                },
                {
                  src:  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85',
                  span: false,
                },
                {
                  src:  'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=700&q=85',
                  span: false,
                },
              ].map(function(img, i) {
                return (
                  <div key={i} style={{
                    gridRow:    i === 0 ? 'span 2' : 'span 1',
                    overflow:   'hidden',
                    border:     'var(--border)',
                    position:   'relative',
                  }}>
                    <img
                      src={img.src}
                      alt="EVOLVE"
                      style={{
                        width:      '100%',
                        height:     '100%',
                        objectFit:  'cover',
                        filter:     'brightness(0.55) contrast(1.1) saturate(0.35)',
                        transition: 'transform 0.7s ease, filter 0.5s ease',
                      }}
                      onMouseEnter={function(e) {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.filter    = 'brightness(0.65) contrast(1.05) saturate(0.5)';
                      }}
                      onMouseLeave={function(e) {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.filter    = 'brightness(0.55) contrast(1.1) saturate(0.35)';
                      }}
                    />

                    {/* Copper overlay on first image */}
                    {i === 0 && (
                      <div style={{
                        position:   'absolute',
                        bottom:     0,
                        left:       0,
                        right:      0,
                        height:     '40%',
                        background: 'linear-gradient(0deg, rgba(184,115,51,0.12) 0%, transparent 100%)',
                        pointerEvents: 'none',
                      }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════
          STATS BAR
      ══════════════════════════════ */}
      <section ref={statsRef} style={{
        borderTop:    'var(--border)',
        borderBottom: 'var(--border)',
        background:   'var(--charcoal-2)',
        padding:      '0',
      }}>
        <div className="container">
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap:                 0,
          }}
            className="stats-bar"
          >
            {STATS.map(function(stat, i) {
              return (
                <div key={stat.label} style={{
                  padding:     '52px 32px',
                  borderRight: i < STATS.length - 1 ? 'var(--border)' : 'none',
                  textAlign:   'center',
                  opacity:     statsVisible ? 1 : 0,
                  transform:   statsVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition:  'all 0.5s ease ' + (i * 0.08) + 's',
                  position:    'relative',
                }}>
                  {/* Top copper accent on hover */}
                  <div style={{
                    position:   'absolute',
                    top: 0, left: '20%', right: '20%',
                    height:     1,
                    background: 'var(--copper)',
                    opacity:    0.3,
                  }} />

                  <div style={{
                    fontFamily:  'var(--font-serif)',
                    fontSize:    'clamp(2.2rem, 3.5vw, 3.2rem)',
                    fontWeight:  300,
                    color:       'var(--copper-light)',
                    lineHeight:  1,
                    marginBottom: 10,
                  }}>
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{
                    fontFamily:    'var(--font-wide)',
                    fontSize:      '0.55rem',
                    fontWeight:    600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         'var(--pearl-ghost)',
                  }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════
          TIMELINE
      ══════════════════════════════ */}
      <section className="section" ref={timelineRef}>
        <div className="container">

          <div style={{
            display:             'grid',
            gridTemplateColumns: '280px 1fr',
            gap:                 80,
          }}
            className="timeline-layout"
          >

            {/* Sticky left label */}
            <div style={{
              opacity:    timelineVisible ? 1 : 0,
              transform:  timelineVisible ? 'translateX(0)' : 'translateX(-24px)',
              transition: 'all 0.7s ease',
            }}>
              <div style={{ position: 'sticky', top: 120 }}>
                <div className="eyebrow" style={{ marginBottom: 20 }}>
                  Our Journey
                </div>
                <h2 style={{
                  fontFamily:  'var(--font-serif)',
                  fontSize:    'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight:  300,
                  color:       'var(--pearl)',
                  lineHeight:  1.05,
                  marginBottom: 24,
                }}>
                  From spark{' '}
                  <span style={{ fontStyle: 'italic', color: 'var(--copper-light)' }}>
                    to revolution.
                  </span>
                </h2>
                <p style={{
                  fontFamily:  'var(--font-body)',
                  fontSize:    '0.85rem',
                  fontWeight:  300,
                  color:       'var(--pearl-muted)',
                  lineHeight:  1.8,
                }}>
                  Six years. Six editions. One relentless conviction that India's students could build the electric future — if someone gave them the right stage.
                </p>
              </div>
            </div>

            {/* Timeline entries */}
            <div style={{ position: 'relative' }}>

              {/* Vertical line */}
              <div style={{
                position:   'absolute',
                top: 8, bottom: 8,
                left:       0,
                width:      1,
                background: 'linear-gradient(180deg, var(--copper), rgba(184,115,51,0.1))',
                opacity:    0.25,
              }} />

              <div style={{
                display:       'flex',
                flexDirection: 'column',
                gap:           0,
              }}>
                {TIMELINE.map(function(item, i) {
                  return (
                    <div key={item.year} style={{
                      display:   'grid',
                      gridTemplateColumns: '80px 1fr',
                      gap:       32,
                      padding:   '40px 0',
                      borderBottom: i < TIMELINE.length - 1 ? 'var(--border)' : 'none',
                      opacity:   timelineVisible ? 1 : 0,
                      transform: timelineVisible ? 'translateY(0)' : 'translateY(24px)',
                      transition:'all 0.6s ease ' + (i * 0.1) + 's',
                      position:  'relative',
                    }}>

                      {/* Year + dot */}
                      <div style={{
                        display:        'flex',
                        flexDirection:  'column',
                        alignItems:     'flex-end',
                        paddingRight:   24,
                        position:       'relative',
                      }}>
                        {/* Dot on line */}
                        <div style={{
                          position:     'absolute',
                          right:        -5,
                          top:          6,
                          width:        10,
                          height:       10,
                          borderRadius: '50%',
                          background:   i === 0 ? 'var(--copper)' : 'var(--charcoal-4)',
                          border:       '2px solid ' + (i === 0 ? 'var(--copper)' : 'rgba(184,115,51,0.25)'),
                          transition:   'background 0.3s ease',
                        }} />
                        <div style={{
                          fontFamily:  'var(--font-serif)',
                          fontSize:    '1.3rem',
                          fontWeight:  300,
                          color:       i === TIMELINE.length - 1
                            ? 'var(--copper-light)'
                            : 'var(--pearl-ghost)',
                          lineHeight:  1,
                          marginTop:   0,
                        }}>
                          {item.year}
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <div style={{
                          fontFamily:    'var(--font-wide)',
                          fontSize:      '0.58rem',
                          fontWeight:    600,
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color:         i === TIMELINE.length - 1
                            ? 'var(--copper)'
                            : 'var(--pearl-ghost)',
                          marginBottom:  10,
                        }}>
                          {item.title}
                        </div>
                        <p style={{
                          fontFamily:  'var(--font-body)',
                          fontSize:    '0.88rem',
                          fontWeight:  300,
                          color:       'var(--pearl-muted)',
                          lineHeight:  1.8,
                        }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════
          VALUES
      ══════════════════════════════ */}
      <section className="section" ref={valuesRef} style={{
        borderTop:  'var(--border)',
        background: 'var(--charcoal-2)',
      }}>
        <div className="container">
          <div style={{
            display:        'flex',
            alignItems:     'flex-end',
            justifyContent: 'space-between',
            marginBottom:   64,
            gap:            40,
            flexWrap:       'wrap',
          }}>
            <div style={{
              opacity:    valuesVisible ? 1 : 0,
              transform:  valuesVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.6s ease',
            }}>
              <div className="eyebrow">What Drives Us</div>
              <h2 style={{
                fontFamily:  'var(--font-serif)',
                fontSize:    'clamp(2.2rem, 4vw, 3.6rem)',
                fontWeight:  300,
                color:       'var(--pearl)',
                lineHeight:  1.05,
              }}>
                Our{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--copper-light)' }}>
                  Values
                </span>
              </h2>
            </div>
          </div>

          {/* Values as editorial list */}
          <div style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           0,
          }}>
            {VALUES.map(function(val, i) {
              return (
                <div
                  key={val.title}
                  style={{
                    display:      'grid',
                    gridTemplateColumns: '60px 240px 1fr',
                    gap:          40,
                    padding:      '36px 0',
                    borderBottom: i < VALUES.length - 1 ? 'var(--border)' : 'none',
                    alignItems:   'start',
                    opacity:      valuesVisible ? 1 : 0,
                    transform:    valuesVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition:   'all 0.5s ease ' + (i * 0.07) + 's',
                    cursor:       'default',
                  }}
                  className="value-row"
                  onMouseEnter={function(e) {
                    e.currentTarget.style.background = 'rgba(184,115,51,0.02)';
                  }}
                  onMouseLeave={function(e) {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.68rem',
                    fontWeight:    300,
                    color:         'var(--copper)',
                    opacity:       0.6,
                    paddingTop:    4,
                  }}>
                    {val.index}
                  </div>
                  <div style={{
                    fontFamily:    'var(--font-serif)',
                    fontSize:      '1.25rem',
                    fontWeight:    400,
                    color:         'var(--pearl)',
                    lineHeight:    1.2,
                    paddingTop:    2,
                  }}>
                    {val.title}
                  </div>
                  <p style={{
                    fontFamily:  'var(--font-body)',
                    fontSize:    '0.88rem',
                    fontWeight:  300,
                    color:       'var(--pearl-muted)',
                    lineHeight:  1.8,
                  }}>
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════
          TEAM
      ══════════════════════════════ */}
      <section className="section" ref={teamRef}>
        <div className="container">
          <div style={{ marginBottom: 56 }}>
            <div className="eyebrow">Core Committee</div>
            <h2 style={{
              fontFamily:  'var(--font-serif)',
              fontSize:    'clamp(2.2rem, 4vw, 3.6rem)',
              fontWeight:  300,
              color:       'var(--pearl)',
              lineHeight:  1.05,
            }}>
              The team{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--copper-light)' }}>
                behind it all
              </span>
            </h2>
          </div>

          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap:                 1,
            background:          'rgba(255,255,255,0.04)',
          }}
            className="team-grid"
          >
            {TEAM.map(function(member, i) {
              return (
                <div key={member.name} style={{
                  padding:    '36px 28px',
                  background: 'var(--charcoal-2)',
                  position:   'relative',
                  overflow:   'hidden',
                  opacity:    teamVisible ? 1 : 0,
                  transform:  teamVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'all 0.5s ease ' + (i * 0.06) + 's',
                  cursor:     'default',
                }}
                  onMouseEnter={function(e) {
                    e.currentTarget.style.background = 'var(--charcoal-3)';
                  }}
                  onMouseLeave={function(e) {
                    e.currentTarget.style.background = 'var(--charcoal-2)';
                  }}
                >
                  {/* Initial avatar */}
                  <div style={{
                    width:         44,
                    height:        44,
                    borderRadius:  '50%',
                    background:    'var(--charcoal-4)',
                    border:        'var(--border-copper)',
                    display:       'flex',
                    alignItems:    'center',
                    justifyContent:'center',
                    fontFamily:    'var(--font-serif)',
                    fontSize:      '1.1rem',
                    fontWeight:    300,
                    color:         'var(--copper-light)',
                    marginBottom:  20,
                    flexShrink:    0,
                  }}>
                    {member.name.charAt(0)}
                  </div>

                  <div style={{
                    fontFamily:    'var(--font-wide)',
                    fontSize:      '0.5rem',
                    fontWeight:    600,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color:         'var(--copper)',
                    marginBottom:  6,
                    opacity:       0.7,
                  }}>
                    {member.dept}
                  </div>

                  <div style={{
                    fontFamily:  'var(--font-serif)',
                    fontSize:    '1rem',
                    fontWeight:  400,
                    color:       'var(--pearl)',
                    marginBottom: 4,
                    lineHeight:  1.2,
                  }}>
                    {member.name}
                  </div>

                  <div style={{
                    fontFamily:  'var(--font-body)',
                    fontSize:    '0.78rem',
                    fontWeight:  300,
                    color:       'var(--pearl-muted)',
                  }}>
                    {member.role}
                  </div>

                  {/* Bottom copper line */}
                  <div style={{
                    position:   'absolute',
                    bottom: 0, left: 0, right: 0,
                    height:     1,
                    background: 'linear-gradient(90deg, var(--copper), transparent)',
                    opacity:    0.15,
                  }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════
          CTA — JOIN + SPONSOR
      ══════════════════════════════ */}
      <section className="section-sm" ref={ctaRef} style={{
        borderTop: 'var(--border)',
      }}>
        <div className="container">
          <div style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 1,
            background:          'rgba(255,255,255,0.04)',
            opacity:    ctaVisible ? 1 : 0,
            transform:  ctaVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}
            className="cta-split"
          >

            {/* Left — Join */}
            <div style={{
              padding:    '64px 56px',
              background: 'var(--charcoal-2)',
              position:   'relative',
              overflow:   'hidden',
            }}>
              <div style={{
                position:   'absolute',
                top: 0, left: 0,
                width:      100,
                height:     100,
                background: 'radial-gradient(circle at 0% 0%, rgba(184,115,51,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div className="eyebrow" style={{ marginBottom: 20 }}>
                Join EVOLVE
              </div>
              <h3 style={{
                fontFamily:  'var(--font-serif)',
                fontSize:    'clamp(1.8rem, 3vw, 2.6rem)',
                fontWeight:  300,
                color:       'var(--pearl)',
                lineHeight:  1.05,
                marginBottom: 20,
              }}>
                Be part of the{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--copper-light)' }}>
                  movement.
                </span>
              </h3>
              <p style={{
                fontFamily:  'var(--font-body)',
                fontSize:    '0.88rem',
                fontWeight:  300,
                color:       'var(--pearl-muted)',
                lineHeight:  1.8,
                marginBottom: 36,
                maxWidth:    400,
              }}>
                We are always looking for passionate NIT Bhopal students
                who want to build the electric future. Engineer, designer,
                storyteller, or organiser — there is a place for you here.
              </p>
              <a href="mailto:evolve@nitb.in">
                <button className="btn-primary">
                  <span>Apply to Join EVOLVE</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </a>
            </div>

            {/* Right — Sponsor */}
            <div style={{
              padding:    '64px 56px',
              background: 'var(--charcoal-3)',
              position:   'relative',
              overflow:   'hidden',
            }}>
              <div style={{
                position:   'absolute',
                bottom: 0, right: 0,
                width:      100,
                height:     100,
                background: 'radial-gradient(circle at 100% 100%, rgba(184,115,51,0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div className="eyebrow" style={{ marginBottom: 20 }}>
                Partner With Us
              </div>
              <h3 style={{
                fontFamily:  'var(--font-serif)',
                fontSize:    'clamp(1.8rem, 3vw, 2.6rem)',
                fontWeight:  300,
                color:       'var(--pearl)',
                lineHeight:  1.05,
                marginBottom: 20,
              }}>
                Sponsor{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--copper-light)' }}>
                  Vidyut 26.
                </span>
              </h3>
              <p style={{
                fontFamily:  'var(--font-body)',
                fontSize:    '0.88rem',
                fontWeight:  300,
                color:       'var(--pearl-muted)',
                lineHeight:  1.8,
                marginBottom: 36,
                maxWidth:    400,
              }}>
                Put your brand in front of 5,000 of India's brightest
                engineering students and EV professionals. Title, Gold,
                Silver, and Community tiers available.
              </p>
              <Link to="/vidyut-26">
                <button className="btn-ghost">
                  <span>View Sponsorship Simulator</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1100px) {
          .timeline-layout { grid-template-columns: 1fr !important; gap: 48px !important; }
          .value-row       { grid-template-columns: 60px 1fr !important; }
          .stats-bar       { grid-template-columns: repeat(3,1fr) !important; }
          .team-grid       { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 900px) {
          .story-grid       { grid-template-columns: 1fr !important; gap: 48px !important; }
          .about-hero-bottom{ grid-template-columns: 1fr !important; gap: 40px !important; }
          .cta-split        { grid-template-columns: 1fr !important; }
          .value-row        { grid-template-columns: 1fr !important; gap: 12px !important; }
        }
        @media (max-width: 600px) {
          .stats-bar { grid-template-columns: repeat(2,1fr) !important; }
          .team-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}