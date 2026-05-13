import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function useReveal(threshold) {
  var t = threshold || 0.12;
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
  var duration = props.duration || 2000;
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
          var ease = 1 - Math.pow(1 - progress, 3);
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

var TIMELINE_ITEMS = [
  {
    year: '2021',
    title: 'EVOLVE Founded',
    desc: 'Three NIT Bhopal students — Yash, Ayush, and Aman — launch EVOLVE with a single electric scooter on display and a vision to build India\'s premier student EV platform. The first Vidyut draws 200 curious attendees and sparks a movement.',
  },
  {
    year: '2022',
    title: 'First Industry Partnership',
    desc: 'EVOLVE secures its first corporate partnership with a leading EV manufacturer, bringing real production vehicles to campus for the first time. Attendance triples. The Vidyut Speed Trials are introduced, instantly becoming the crowd favourite.',
  },
  {
    year: '2023',
    title: 'National Recognition',
    desc: 'Vidyut 23 is covered by three national publications and draws teams from 18 states. EVOLVE launches the EV Hackathon with prize money of Rs 2 Lakhs. Two Hackathon winners go on to found funded startups within the year.',
  },
  {
    year: '2024',
    title: 'Scale and Impact',
    desc: 'Footfall crosses 3,000 for the first time. EVOLVE partners with the Ministry of Heavy Industries for a policy panel. The Battery Tech Symposium debuts with speakers from ISRO, Ola Electric, and Tata Motors.',
  },
  {
    year: '2025',
    title: 'Vidyut 25 — Record Edition',
    desc: 'Over 4,500 attendees. 35 corporate exhibitors. Prize pool of Rs 4 Lakhs. Vidyut 25 cements EVOLVE as India\'s largest student-led EV conclave. A dedicated charging infrastructure workshop draws engineers from 9 countries.',
  },
  {
    year: '2026',
    title: 'Vidyut 26 — Current of Change',
    desc: 'The 26th edition arrives with the boldest theme yet. 5,000 expected attendees, Rs 5 Lakh hackathon, international speakers, and the launch of the EVOLVE EV Research Grant — funding student projects that can change how India moves.',
  },
];

var VALUES = [
  {
    icon: '⚡',
    title: 'Innovation First',
    desc: 'We believe breakthroughs happen when young engineers are given space, resources, and the freedom to fail. Every EVOLVE programme is designed to push boundaries, not protect them.',
  },
  {
    icon: '🌍',
    title: 'Sustainability at Core',
    desc: 'Electric mobility is not just a technology choice — it is a responsibility. We build every event, every workshop, and every partnership with the planet\'s future as the non-negotiable bottom line.',
  },
  {
    icon: '🤝',
    title: 'Community Driven',
    desc: 'EVOLVE is nothing without its community of 200 volunteers, 40 mentors, and thousands of attendees who show up every year believing that student-led change is real change.',
  },
  {
    icon: '🎯',
    title: 'Excellence Always',
    desc: 'From the quality of our speakers to the design of our events, we hold ourselves to a standard that makes industry professionals take notice. Good enough has never been good enough for us.',
  },
  {
    icon: '🔓',
    title: 'Open Access',
    desc: 'Knowledge about the electric future should not be gatekept. Every EVOLVE event is free to attend, every workshop is open to all students, and every insight shared at Vidyut is shared with the world.',
  },
  {
    icon: '🚀',
    title: 'Action Over Talk',
    desc: 'We do not just discuss the EV revolution — we build it. From running live speed trials to funding student prototypes, EVOLVE turns conversations into hardware, and ideas into roads driven.',
  },
];

var TEAM = [
  { name: 'Priya Verma',    role: 'Head of Design',       dept: 'Creative' },
  { name: 'Rohan Mehta',    role: 'Head of Tech',          dept: 'Engineering' },
  { name: 'Simran Kaur',    role: 'Head of Sponsorship',   dept: 'Partnerships' },
  { name: 'Dev Patel',      role: 'Head of Operations',    dept: 'Logistics' },
  { name: 'Nisha Gupta',    role: 'Head of Media',         dept: 'Communications' },
  { name: 'Arjun Singh',    role: 'Head of Competitions',  dept: 'Events' },
  { name: 'Kavya Reddy',    role: 'Head of Workshops',     dept: 'Education' },
  { name: 'Ishan Dubey',    role: 'Head of Volunteer Ops', dept: 'Community' },
];

export default function About() {
  var heroS      = useState(false);
  var heroVisible    = heroS[0];
  var setHeroVisible = heroS[1];

  var r1 = useReveal(0.1);
  var storyRef     = r1[0];
  var storyVisible = r1[1];

  var r2 = useReveal();
  var statsRef     = r2[0];
  var statsVisible = r2[1];

  var r3 = useReveal();
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
    var t = setTimeout(function() { setHeroVisible(true); }, 100);
    return function() { clearTimeout(t); };
  }, []);

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ═══════════════════════════
          HERO
      ═══════════════════════════ */}
      <section style={{
        minHeight: '70vh',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        paddingTop: 130, paddingBottom: 80,
      }}>

        {/* BG image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.08) saturate(0.3) hue-rotate(80deg)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(5,10,5,0.98) 50%, rgba(20,83,26,0.3) 100%)',
        }} />

        {/* Animated arc */}
        <div style={{
          position: 'absolute',
          top: '50%', right: '-100px',
          transform: 'translateY(-50%)',
          width: 500, height: 500,
          border: '1px solid rgba(46,204,55,0.07)',
          borderRadius: '50%',
          animation: 'spin-slow 30s linear infinite',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%', right: '-60px',
          transform: 'translateY(-50%)',
          width: 360, height: 360,
          border: '1px dashed rgba(46,204,55,0.05)',
          borderRadius: '50%',
          animation: 'spin-reverse 20s linear infinite',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            <span className="badge" style={{ marginBottom: 28, display: 'inline-flex' }}>
              Our Story — Est. 2021
            </span>
          </div>

          <div style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4.5rem, 11vw, 10rem)',
              lineHeight: 0.88, letterSpacing: '0.02em',
            }}>
              <span style={{
                display: 'block', color: 'var(--text-muted)',
                fontSize: '30%', fontFamily: 'var(--font-mono)',
                letterSpacing: '0.35em', marginBottom: 14,
              }}>
                WE ARE
              </span>
              <span style={{ display: 'block', color: 'var(--green-400)', textShadow: '0 0 60px rgba(46,204,55,0.35)' }}>
                EVOLVE
              </span>
            </h1>
          </div>

          <div style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.35s',
            maxWidth: 640, marginTop: 28,
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
            }}>
              India's most passionate student community for electric mobility.
              We are engineers, dreamers, organisers, and advocates —
              united by one belief: that the future of transport is electric,
              and that the future starts on campus.
            </p>
          </div>

          <div style={{
            display: 'flex', gap: 16, marginTop: 44, flexWrap: 'wrap',
            opacity: heroVisible ? 1 : 0,
            transition: 'all 0.7s ease 0.5s',
          }}>
            <Link to="/vidyut-26">
              <button className="btn-glow" style={{ padding: '14px 40px' }}>
                <span>Explore Vidyut 26</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
      </section>

      {/* ═══════════════════════════
          STORY SECTION
      ═══════════════════════════ */}
      <section className="section" ref={storyRef}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80, alignItems: 'center',
          }}
            className="story-grid"
          >
            <div style={{
              opacity: storyVisible ? 1 : 0,
              transform: storyVisible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.8s ease',
            }}>
              <div className="section-label">Who We Are</div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                letterSpacing: '0.04em', marginBottom: 28,
              }}>
                MORE THAN AN{' '}
                <span style={{ color: 'var(--green-400)', textShadow: '0 0 20px rgba(46,204,55,0.3)' }}>
                  EV CLUB
                </span>
              </h2>

              {[
                'EVOLVE is the electric vehicle and sustainable mobility student body of NIT Bhopal. Founded in 2021 by three undergraduate engineers who believed that India\'s EV revolution needed a student voice, EVOLVE has grown into a 200-member organisation that is reshaping how engineering students engage with the future of transport.',
                'We are not a club that talks about electric vehicles — we build them, race them, and present them on stages that matter. Our members have gone on to work at Ola Electric, Tata Motors EV division, and ISRO\'s propulsion lab. Several have founded their own EV startups, two of which have raised seed funding. EVOLVE is their launchpad.',
                'Through Vidyut, our annual conclave, we create India\'s most immersive campus EV experience. Through our workshops and symposiums, we democratise access to cutting-edge EV knowledge. And through our competitions, we give young engineers the chance to prove that world-class innovation does not require a Silicon Valley zip code — just a good problem and the drive to solve it.',
              ].map(function(para, i) {
                return (
                  <p key={i} style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: i === 0 ? 'var(--text-secondary)' : 'var(--text-muted)',
                    lineHeight: 1.85,
                    marginBottom: 18,
                  }}>
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Right image mosaic */}
            <div style={{
              opacity: storyVisible ? 1 : 0,
              transform: storyVisible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s ease 0.15s',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gap: 12,
              height: 480,
            }}>
              {[
                { src: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80', span: 'row-span-2' },
                { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', span: '' },
                { src: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&q=80', span: '' },
              ].map(function(img, i) {
                return (
                  <div key={i} style={{
                    gridRow: i === 0 ? 'span 2' : 'span 1',
                    borderRadius: 8, overflow: 'hidden',
                    border: '1px solid rgba(46,204,55,0.12)',
                  }}>
                    <img
                      src={img.src}
                      alt="EVOLVE"
                      style={{
                        width: '100%', height: '100%',
                        objectFit: 'cover',
                        filter: 'brightness(0.65) saturate(0.6) hue-rotate(50deg)',
                        transition: 'transform 0.5s ease',
                      }}
                      onMouseEnter={function(e) { e.currentTarget.style.transform = 'scale(1.05)'; }}
                      onMouseLeave={function(e) { e.currentTarget.style.transform = 'scale(1)'; }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          STATS BAR
      ═══════════════════════════ */}
      <section className="section-sm" ref={statsRef} style={{
        background: 'rgba(10,26,10,0.3)',
        borderTop: 'var(--border)', borderBottom: 'var(--border)',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5,1fr)',
            gap: 0, textAlign: 'center',
          }}
            className="stats-bar"
          >
            {[
              { value: 200,  suffix: '+',  label: 'Active Members' },
              { value: 26,   suffix: '',   label: 'Editions of Vidyut' },
              { value: 5000, suffix: '+',  label: 'Annual Attendees' },
              { value: 30,   suffix: '+',  label: 'Industry Partners' },
              { value: 10,   suffix: '+',  label: 'Startups Launched' },
            ].map(function(stat, i) {
              return (
                <div key={stat.label} style={{
                  padding: '40px 20px',
                  borderRight: i < 4 ? 'var(--border)' : 'none',
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s ease ' + (i * 0.08) + 's',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 3vw, 3rem)',
                    color: 'var(--green-400)',
                    textShadow: '0 0 20px rgba(46,204,55,0.3)',
                    lineHeight: 1,
                    marginBottom: 8,
                  }}>
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.58rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          TIMELINE
      ═══════════════════════════ */}
      <section className="section" ref={timelineRef}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              Our Journey
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              letterSpacing: '0.04em',
            }}>
              FROM SPARK TO{' '}
              <span style={{ color: 'var(--green-400)' }}>REVOLUTION</span>
            </h2>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>

            {/* Centre line */}
            <div style={{
              position: 'absolute',
              left: '50%', top: 0, bottom: 0,
              width: 1,
              background: 'linear-gradient(180deg, transparent, rgba(46,204,55,0.25), transparent)',
              transform: 'translateX(-50%)',
            }} />

            {TIMELINE_ITEMS.map(function(item, i) {
              var isLeft = i % 2 === 0;
              return (
                <div key={item.year} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 60px 1fr',
                  marginBottom: 48,
                  opacity: timelineVisible ? 1 : 0,
                  transform: timelineVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.6s ease ' + (i * 0.1) + 's',
                }}>

                  {/* Left slot */}
                  <div style={{
                    paddingRight: 40, textAlign: 'right',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'flex-end', justifyContent: 'center',
                  }}>
                    {isLeft && (
                      <div className="card" style={{ padding: '28px 28px', borderRadius: 8, maxWidth: 420, textAlign: 'left' }}>
                        <div style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.4rem', color: 'var(--green-400)',
                          letterSpacing: '0.06em', marginBottom: 6,
                        }}>
                          {item.title}
                        </div>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.8,
                        }}>
                          {item.desc}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Centre dot */}
                  <div style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}>
                    <div style={{
                      width: 14, height: 14,
                      background: 'var(--green-500)',
                      borderRadius: '50%',
                      border: '3px solid var(--black)',
                      boxShadow: '0 0 16px rgba(46,204,55,0.5)',
                      flexShrink: 0,
                    }} />
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem', color: 'var(--green-600)',
                      letterSpacing: '0.1em',
                    }}>
                      {item.year}
                    </div>
                  </div>

                  {/* Right slot */}
                  <div style={{
                    paddingLeft: 40,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'flex-start', justifyContent: 'center',
                  }}>
                    {!isLeft && (
                      <div className="card" style={{ padding: '28px 28px', borderRadius: 8, maxWidth: 420 }}>
                        <div style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.4rem', color: 'var(--green-400)',
                          letterSpacing: '0.06em', marginBottom: 6,
                        }}>
                          {item.title}
                        </div>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.8,
                        }}>
                          {item.desc}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          VALUES
      ═══════════════════════════ */}
      <section className="section" ref={valuesRef} style={{
        background: 'linear-gradient(180deg, transparent, rgba(15,34,16,0.15), transparent)',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              What Drives Us
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              letterSpacing: '0.04em',
            }}>
              OUR{' '}
              <span style={{ color: 'var(--green-400)' }}>VALUES</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 20,
          }}
            className="values-grid"
          >
            {VALUES.map(function(val, i) {
              return (
                <div key={val.title} className="card" style={{
                  padding: '36px 32px', borderRadius: 8,
                  opacity: valuesVisible ? 1 : 0,
                  transform: valuesVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: 'all 0.6s ease ' + (i * 0.08) + 's',
                }}
                  onMouseEnter={function(e) {
                    e.currentTarget.style.transform     = 'translateY(-6px)';
                    e.currentTarget.style.borderColor   = 'rgba(46,204,55,0.3)';
                    e.currentTarget.style.boxShadow     = '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(46,204,55,0.08)';
                  }}
                  onMouseLeave={function(e) {
                    e.currentTarget.style.transform   = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(46,204,55,0.12)';
                    e.currentTarget.style.boxShadow   = 'none';
                  }}
                >
                  <div style={{ fontSize: '2.2rem', marginBottom: 16 }}>{val.icon}</div>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.88rem',
                    color: 'var(--green-400)',
                    letterSpacing: '0.08em',
                    marginBottom: 12,
                  }}>
                    {val.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.8,
                  }}>
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          TEAM
      ═══════════════════════════ */}
      <section className="section" ref={teamRef}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              Core Committee
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              letterSpacing: '0.04em',
            }}>
              THE TEAM{' '}
              <span style={{ color: 'var(--green-400)' }}>BEHIND IT</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 16,
          }}
            className="team-grid"
          >
            {TEAM.map(function(member, i) {
              return (
                <div key={member.name} className="card" style={{
                  padding: '28px 24px', borderRadius: 8,
                  opacity: teamVisible ? 1 : 0,
                  transform: teamVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.5s ease ' + (i * 0.07) + 's',
                  position: 'relative', overflow: 'hidden',
                }}
                  onMouseEnter={function(e) {
                    e.currentTarget.style.borderColor = 'rgba(46,204,55,0.3)';
                  }}
                  onMouseLeave={function(e) {
                    e.currentTarget.style.borderColor = 'rgba(46,204,55,0.12)';
                  }}
                >
                  {/* Avatar placeholder */}
                  <div style={{
                    width: 52, height: 52,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(46,204,55,0.2), rgba(20,83,26,0.4))',
                    border: '1px solid rgba(46,204,55,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    color: 'var(--green-400)',
                    marginBottom: 16,
                    boxShadow: '0 0 16px rgba(46,204,55,0.1)',
                  }}>
                    {member.name.charAt(0)}
                  </div>

                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.52rem',
                    color: 'var(--green-600)',
                    letterSpacing: '0.2em',
                    marginBottom: 4,
                    textTransform: 'uppercase',
                  }}>
                    {member.dept}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.82rem',
                    color: 'var(--text-primary)',
                    letterSpacing: '0.04em',
                    marginBottom: 4,
                  }}>
                    {member.name}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                  }}>
                    {member.role}
                  </div>

                  {/* Bottom accent */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: 2,
                    background: 'linear-gradient(90deg, var(--green-800), transparent)',
                  }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          CTA
      ═══════════════════════════ */}
      <section className="section-sm" ref={ctaRef}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
            border: 'var(--border)',
            borderRadius: 12, overflow: 'hidden',
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease',
          }}
            className="cta-grid"
          >
            {/* Left */}
            <div style={{
              padding: '64px 56px',
              background: 'rgba(10,26,10,0.5)',
              borderRight: 'var(--border)',
            }}>
              <div className="section-label" style={{ marginBottom: 20 }}>
                Join EVOLVE
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                letterSpacing: '0.04em', marginBottom: 20,
              }}>
                BE PART OF THE{' '}
                <span style={{ color: 'var(--green-400)' }}>MOVEMENT</span>
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem', color: 'var(--text-muted)',
                lineHeight: 1.8, marginBottom: 32,
              }}>
                We are always looking for passionate NIT Bhopal students who
                want to build the electric future. Whether you are an engineer,
                designer, storyteller, or organiser — there is a place for you
                in EVOLVE.
              </p>
              <a href="mailto:evolve@nitb.in">
                <button className="btn-glow">
                  <span>Apply to Join EVOLVE</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </a>
            </div>

            {/* Right */}
            <div style={{
              padding: '64px 56px',
              background: 'rgba(5,10,5,0.7)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <div className="section-label" style={{ marginBottom: 20 }}>
                Partner With Us
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                letterSpacing: '0.04em', marginBottom: 20,
              }}>
                SPONSOR{' '}
                <span style={{ color: 'var(--green-400)' }}>VIDYUT 26</span>
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem', color: 'var(--text-muted)',
                lineHeight: 1.8, marginBottom: 32,
              }}>
                Put your brand in front of 5,000 of India's brightest
                engineering students and EV professionals. Sponsorship
                packages are available at Title, Gold, Silver, and
                Community tiers.
              </p>
              <Link to="/vidyut-26">
                <button className="btn-outline">
                  <span>View Sponsorship Decks</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .stats-bar { grid-template-columns: repeat(3,1fr) !important; }
          .team-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 900px) {
          .story-grid   { grid-template-columns: 1fr !important; gap: 40px !important; }
          .values-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .cta-grid     { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .stats-bar    { grid-template-columns: repeat(2,1fr) !important; }
          .values-grid  { grid-template-columns: 1fr !important; }
          .team-grid    { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}