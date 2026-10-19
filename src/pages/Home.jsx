import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'
import HeroParticles from '../components/HeroParticles.jsx'
import Marquee from '../components/Marquee.jsx'
import CtaBand from '../components/CtaBand.jsx'

const SERVICE_PREVIEW = [
  {
    title: 'Coal Trading',
    text: 'Comprehensive coal trading solutions for industrial and commercial consumers — competitive pricing, flexible arrangements and dependable volumes.',
    to: '/services',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17h2l1-6h9l3 6h3v3H3z" /><circle cx="7" cy="19" r="1.6" /><circle cx="17" cy="19" r="1.6" /><path d="M12 3l4 8H8z" /></svg>
    )
  },
  {
    title: 'Procurement & Sourcing',
    text: 'Coal sourced from reliable local mines, established suppliers and international producers — matched precisely to client specifications.',
    to: '/sourcing',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" /></svg>
    )
  },
  {
    title: 'Mining, QA & Logistics',
    text: 'Operational presence in key mining regions with systematic quality control, stock management and end-to-end transportation.',
    to: '/services',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3l-1.5 6h4L10 21l1-7H7z" /></svg>
    )
  }
]

const INDUSTRIES = [
  {
    title: 'Textile & Spinning',
    text: 'Reliable fuel solutions for textile manufacturing and processing facilities.',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V8l8-4 8 4v12" /><path d="M9 20v-6h6v6" /></svg>
  },
  {
    title: 'Towel & Hosiery',
    text: 'Coal supply solutions for industrial heating and boiler operations.',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="5" rx="1" /><rect x="3" y="13" width="18" height="5" rx="1" /><path d="M7 6V4M17 6V4" /></svg>
  },
  {
    title: 'Dyeing & Processing',
    text: 'Fuel supply tailored to continuous industrial heat requirements.',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l-1 6H7z" /><path d="M8 12h8l-1 9H9z" /></svg>
  },
  {
    title: 'Cement & Building Materials',
    text: 'Coal solutions for energy-intensive manufacturing operations.',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V10l7-5 7 5v11" /><path d="M9 21v-6h6v6" /></svg>
  },
  {
    title: 'Brick & Ceramic',
    text: 'Suitable coal grades for kilns and high-temperature applications.',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16" /><path d="M6 20V9h5v11" /><path d="M11 20V5h5v15" /><path d="M16 20v-7h3v7" /></svg>
  },
  {
    title: 'Power & Energy',
    text: 'Fuel sourcing and supply solutions for power-generation requirements.',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4 14h6l-1 8 9-12h-6z" /></svg>
  }
]

const STATS = [
  { value: 2021, label: 'Year Established' },
  { value: 6, label: 'Core Services' },
  { value: 3, label: 'Sourcing Regions' },
  { value: 100, suffix: '%', label: 'Quality Commitment' }
]

const COMMITMENT_PANELS = [
  {
    title: 'Responsible Sourcing',
    text: 'Strong supplier relationships and verified supply channels across local and international markets.',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
  },
  {
    title: 'Rigorous Quality Control',
    text: 'Systematic sampling, inspection, testing and verification before every dispatch.',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19h16" /><path d="M6 19V9m6 10V5m6 14v-7" /></svg>
  },
  {
    title: 'Efficient Logistics',
    text: "From mine and port to your facility — coordinated, safe and cost-optimized movement.",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
  },
  {
    title: 'Customer-Focused Service',
    text: 'Transparency, responsiveness and consistent service in every relationship we build.',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-8 0v2" /><circle cx="12" cy="7" r="4" /></svg>
  }
]

export default function Home() {
  const heroSectionRef = useRef(null)
  const heroBgRef = useRef(null)
  const heroKickerRef = useRef(null)
  const heroLineRefs = useRef([])
  const heroLeadRef = useRef(null)
  const heroActionsRef = useRef(null)
  const heroScrollRef = useRef(null)

  useEffect(() => {
    const video = heroSectionRef.current?.querySelector('video')
    if (video) {
      video.play().catch(() => {})
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroBgRef.current,
        { scale: 1.14, opacity: 0.3 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }
      )

      gsap.fromTo(
        heroKickerRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: 0.2 }
      )

      gsap.fromTo(
        heroLineRefs.current,
        { opacity: 0, y: 120 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.35
        }
      )

      gsap.fromTo(
        [heroLeadRef.current, heroActionsRef.current],
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.7
        }
      )

      gsap.fromTo(
        heroScrollRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1.1 }
      )
    }, heroSectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="hero" ref={heroSectionRef}>
        <div className="hero-bg" ref={heroBgRef}>
          <video
            muted
            playsInline
            autoPlay
            loop
            className="hero-video"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <HeroParticles />
        <div className="hero-content">
          <span className="hero-kicker" ref={heroKickerRef}>
            <span className="dot" />
            Est. 2021 · Pakistan &amp; Global Sourcing
          </span>
          <h1>
            <span className="line"><span ref={(el) => (heroLineRefs.current[0] = el)}>Powering Industries.</span></span>
            <span className="line"><span ref={(el) => (heroLineRefs.current[1] = el)}>Connecting</span></span>
            <span className="line"><span ref={(el) => (heroLineRefs.current[2] = el)}><em>Resources.</em></span></span>
          </h1>
          <p className="lead" ref={heroLeadRef}>
            Premium coal supply, procurement and logistics solutions — engineered around your
            quality, quantity and operational requirements. Delivering excellence from mine to facility.
          </p>
          <div className="hero-actions" ref={heroActionsRef}>
            <Link to="/services" className="btn btn-primary">
              Explore Our Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <Link to="/contact" className="btn btn-ghost">Request a Quote</Link>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true" ref={heroScrollRef}>
          <span className="mouse"><span className="wheel" /></span>
          Scroll
        </div>
      </section>

      <Marquee />

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="container">
          <div className="split">
            <Reveal direction="left" className="split-media">
              <img src="/images/excavator-face.jpg" alt="Excavator working a coal seam at an active mining site" />
              <span className="media-frame" />
              <div className="media-float">
                <strong>2021</strong>
                <span>Established</span>
              </div>
            </Reveal>
            <Reveal direction="right">
              <span className="kicker">About FENIX Energy Resources</span>
              <h2 className="section-title">
                Coal supply is not just a commodity — it's a <em>commitment.</em>
              </h2>
              <p className="section-sub">
                FENIX ENERGY RESOURCES, established in 2021, is a professionally managed energy and
                coal trading company specializing in coal sourcing, procurement, trading, mining,
                quality management, logistics, and supply-chain solutions.
              </p>
              <p className="section-sub" style={{ marginTop: 16 }}>
                With a strong understanding of Pakistan's energy and industrial fuel market, we provide
                reliable coal solutions to industries across the country. Our sourcing network extends
                across Pakistan's major coal-producing regions as well as international markets —
                enabling us to offer coal tailored to our clients' specific quality, quantity, and
                operational requirements.
              </p>
              <ul className="check-list">
                <li><span className="ic">✓</span><span><b>Consistent quality</b> — every supply managed against agreed specifications.</span></li>
                <li><span className="ic">✓</span><span><b>Dependable service</b> — field teams across mines, stockyards, transport hubs &amp; ports.</span></li>
                <li><span className="ic">✓</span><span><b>Long-term solutions</b> — competitive value that keeps your operations running.</span></li>
              </ul>
              <div style={{ marginTop: 32 }}>
                <Link to="/about" className="btn btn-primary">
                  More About Us
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section stats-band">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * (i + 1)} className="stat">
                <div className="num">
                  <Counter value={s.value} suffix={s.suffix || ''} />
                </div>
                <div className="label">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <span className="kicker">Our Services</span>
            <h2 className="section-title">End-to-end <em>coal supply</em> solutions</h2>
            <p className="section-sub">
              From sourcing and mining to quality assurance, storage and delivery — one reliable
              supply network for every industrial fuel requirement.
            </p>
          </Reveal>
          <div className="cards-grid">
            {SERVICE_PREVIEW.map((s, i) => (
              <Reveal key={s.title} delay={0.1 * (i + 1)} className="card card-plain" data-tilt>
                <div className="card-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <Link className="card-link" to={s.to}>
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="center-cta">
            <Link to="/services" className="btn btn-ghost">View All Six Services</Link>
          </Reveal>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="kicker">Industries We Serve</span>
            <h2 className="section-title">Fueling Pakistan's <em>industrial</em> backbone</h2>
            <p className="section-sub">
              Our coal supply solutions support a diverse range of industrial sectors across the country.
            </p>
          </Reveal>
          <div className="cards-grid">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.title} delay={0.08 * (i + 1)} className="card card-plain">
                <div className="card-icon">{ind.icon}</div>
                <h3>{ind.title}</h3>
                <p>{ind.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENT */}
      <section className="section section-alt">
        <div className="container">
          <div className="split">
            <Reveal direction="left">
              <span className="kicker">Our Commitment</span>
              <h2 className="section-title">
                The right quality.<br />The right quantity.<br /><em className="text-gold">The right time.</em>
              </h2>
              <p className="section-sub">
                At FENIX ENERGY RESOURCES, our commitment goes beyond supplying coal. We strive to
                become a long-term energy partner for our customers by understanding their operational
                requirements, maintaining consistent supply, and developing commercially viable solutions.
              </p>
              <div className="pillar-row">
                <div>
                  <div className="pillar-num green">Quality</div>
                  <div className="pillar-label">Verified specifications</div>
                </div>
                <div>
                  <div className="pillar-num green">Quantity</div>
                  <div className="pillar-label">Dependable volumes</div>
                </div>
                <div>
                  <div className="pillar-num gold">Timing</div>
                  <div className="pillar-label">On-schedule delivery</div>
                </div>
              </div>
            </Reveal>
            <div className="panels-grid">
              {COMMITMENT_PANELS.map((p, i) => (
                <Reveal key={p.title} delay={0.1 * (i + 1)} direction="right" className="panel">
                  <div className="panel-icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
