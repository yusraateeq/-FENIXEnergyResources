import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Preloader from './Preloader.jsx'

const ROUTE_META = {
  '/': {
    title: 'FENIX ENERGY RESOURCES | Premium Coal Supply & Industrial Fuel Solutions',
    description:
      'FENIX ENERGY RESOURCES delivers premium coal supply, industrial fuel procurement, mining support, and logistics solutions for Pakistan and global markets.'
  },
  '/about': {
    title: 'About FENIX ENERGY RESOURCES | Trusted Coal Supply Partner',
    description:
      'Learn about FENIX ENERGY RESOURCES — a coal trading, procurement, and supply-chain partner focused on quality, reliability, and industrial performance.'
  },
  '/services': {
    title: 'Coal Supply Services | Trading, Procurement & Logistics',
    description:
      'Explore FENIX ENERGY RESOURCES services including coal trading, sourcing, quality assurance, mining support, and end-to-end logistics coordination.'
  },
  '/sourcing': {
    title: 'Coal Sourcing & Procurement | Local & Global Supply Network',
    description:
      'Reliable coal sourcing from Pakistan and international markets with procurement strategies designed for quality, volume, and operational consistency.'
  },
  '/industries': {
    title: 'Industries We Serve | Coal Supply for Manufacturing & Energy',
    description:
      'FENIX ENERGY RESOURCES supports textile, cement, brick, ceramic, power, and processing industries with dependable coal supply solutions.'
  },
  '/why-us': {
    title: 'Why Choose FENIX ENERGY RESOURCES | Trusted Coal Partner',
    description:
      'Discover why industrial clients choose FENIX ENERGY RESOURCES for competitive pricing, quality control, dependable logistics, and responsive service.'
  },
  '/contact': {
    title: 'Contact FENIX ENERGY RESOURCES | Request a Quote',
    description:
      'Connect with FENIX ENERGY RESOURCES for coal supply inquiries, procurement requirements, and industrial fuel solutions.'
  }
}

/**
 * App shell: handles header scroll state, scroll-progress bar,
 * back-to-top button and scroll reset on route change.
 */
export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [progress, setProgress] = useState(0)
  const { pathname } = useLocation()

  // Reset scroll on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])

  useEffect(() => {
    const meta = ROUTE_META[pathname] || ROUTE_META['/']
    document.title = meta.title

    let descriptionTag = document.querySelector('meta[name="description"]')
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta')
      descriptionTag.setAttribute('name', 'description')
      document.head.appendChild(descriptionTag)
    }
    descriptionTag.setAttribute('content', meta.description)

    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta')
    ogTitle.setAttribute('property', 'og:title')
    ogTitle.setAttribute('content', meta.title)
    if (!ogTitle.parentNode) document.head.appendChild(ogTitle)

    const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta')
    ogDescription.setAttribute('property', 'og:description')
    ogDescription.setAttribute('content', meta.description)
    if (!ogDescription.parentNode) document.head.appendChild(ogDescription)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setShowTop(y > 500)
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? (y / h) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Preloader />
      <div id="scrollProgress" style={{ width: `${progress}%` }} />
      <Header scrolled={scrolled} />

      <main>{children}</main>

      <Footer />

      <button
        id="toTop"
        className={showTop ? 'show' : ''}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      </button>
    </>
  )
}
