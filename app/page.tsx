'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, ClipboardCheck, Hammer, Home, Menu, MessageCircle, Phone, ShieldCheck, X } from 'lucide-react'

const images = {
  logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2154.PNG-OHeE2tk5vYCTRlD9to0OlaeSkyzfbl.png',
  roof: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2158.JPG-RRgMqGxXWKVyChFXOwDgp1SlhvOqNv.jpeg',
  install: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2156.JPG-vnDjHZG7LlegcD9xJ01MuS9utbGbV4.jpeg',
  siding: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2157.JPG-HNSIob7peEQoMyy8k88wYjMwcFA9hr.jpeg',
  deck: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2160.JPG-EgR0GOOPu7hfxQnNHiJnbdrOXxHDWq.jpeg',
  roofRepair: '/images/IMG_2167.JPG',
  exterior: '/images/IMG_2163.JPG',
}

const services = [
  { number: '01', title: 'Roofing', text: 'Residential roof replacements and roofing systems built to protect your home.', image: images.roof },
  { number: '02', title: 'Roof repairs', text: 'Focused repairs for leaks, storm damage, worn areas, and missing shingles.', image: images.roofRepair },
  { number: '03', title: 'Siding', text: 'Clean, weather-ready siding that refreshes and protects your exterior.', image: images.siding },
  { number: '04', title: 'Framing & additions', text: 'Structural framing and additions designed to make your space work harder.', image: images.install },
  { number: '05', title: 'Exterior remodeling', text: 'Thoughtful exterior updates that improve the look and condition of your home.', image: images.exterior },
  { number: '06', title: 'Decks & fencing', text: 'Well-built outdoor structures with clean lines and careful details.', image: images.deck },
]

const trustPoints = [
  { icon: MessageCircle, title: 'Clear communication', text: 'Know what is happening, what comes next, and who to contact.' },
  { icon: Hammer, title: 'Careful workmanship', text: 'Every project is approached with attention to the details that matter.' },
  { icon: ClipboardCheck, title: 'Straightforward estimates', text: 'Scope, expectations, and next steps are explained before work begins.' },
  { icon: Home, title: 'Respect for your property', text: 'Work is handled carefully around your home and job site.' },
  { icon: CheckCircle2, title: 'Reliable follow-through', text: 'Questions, updates, and next steps stay part of the conversation.' },
]

const projects = [
  { image: images.install, category: 'Roofing', title: 'Residential roof installation', alt: 'Diamond Roofing crew completing a residential roof installation' },
  { image: images.roof, category: 'Roofing', title: 'Roof replacement', alt: 'Completed residential roofing work by Diamond Roofing' },
  { image: images.deck, category: 'Decks & framing', title: 'Outdoor structure in progress', alt: 'Deck and framing work by Diamond Roofing' },
  { image: images.exterior, category: 'Remodeling', title: 'Exterior improvement', alt: 'Exterior remodeling work by Diamond Roofing' },
]

const process = [
  ['Request an estimate', 'Tell us about the property and the work you have in mind.'],
  ['Review the project', 'We take a closer look at the project and what it will involve.'],
  ['Confirm scope & schedule', 'We align on the details, expectations, and timing before work starts.'],
  ['Complete the work', 'The agreed work moves forward with clear communication along the way.'],
  ['Final walkthrough', 'We review the completed work and cover any remaining questions.'],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="site-shell" id="page-top">
      <div className="topline"><span>Residential Roofing <i /> Repairs <i /> Remodeling</span><a href="tel:9319806224"><Phone size={12} /> 931-980-6224</a></div>
      <header className="site-header">
        <a className="brand" href="#page-top" aria-label="Diamond Roofing home"><img src={images.logo} alt="Diamond Roofing LLC logo" /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X /> : <Menu />}</button>
        <nav id="main-navigation" className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#why-diamond" onClick={() => setMenuOpen(false)}>Why Diamond</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Our process</a>
          <a className="button button-small" href="#contact" onClick={() => setMenuOpen(false)}>Request an Estimate</a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-background" src={images.siding} alt="" aria-hidden="true" />
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p className="eyebrow">Roofing &amp; remodeling in Clarksville, Tennessee</p>
          <h1 id="hero-title">Built to protect.<br /><em>Made to last.</em></h1>
          <p className="hero-text">Careful exterior work, clear estimates, and reliable follow-through for your home.</p>
          <div className="hero-actions"><a className="button" href="#contact">Request an Estimate <ArrowRight size={17} /></a><a className="button button-secondary" href="#projects">See Our Work</a></div>
          <div className="hero-trust" aria-label="Diamond Roofing services and service area"><span><ShieldCheck size={17} />Residential roofing, repairs &amp; remodeling</span><span>Serving Clarksville and surrounding areas</span></div>
        </div>
        <a className="hero-scroll" href="#services"><span>Explore</span><ArrowRight size={16} /></a>
      </section>

      <section className="services section-pad" id="services">
        <div className="section-heading"><div><p className="eyebrow">Services for your home</p><h2>One trusted crew.<br /><em>Every layer.</em></h2></div><p>From the roofline to the spaces around it, Diamond Roofing brings a careful, straightforward approach to residential work.</p></div>
        <div className="service-grid">{services.map((service) => <article className="service-card" key={service.number}><div className="service-image"><img src={service.image} alt={`${service.title} project by Diamond Roofing`} /><span>{service.number}</span></div><div className="service-body"><h3>{service.title}</h3><p>{service.text}</p><a className="arrow-link" href="#contact">Discuss your project <ArrowRight size={16} /></a></div></article>)}</div>
      </section>

      <section className="trust section-pad" id="why-diamond">
        <div className="trust-intro"><p className="eyebrow">The Diamond difference</p><h2>Why work<br />with Diamond.</h2><p>Good work starts with a clear experience. These are the standards that guide the conversation from the first call through project follow-up.</p><a className="button button-secondary" href="#contact">Start a Conversation</a></div>
        <div className="trust-grid">{trustPoints.map(({ icon: Icon, title, text }) => <article className="trust-card" key={title}><div className="trust-icon"><Icon size={21} /></div><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>

      <section className="projects section-pad" id="projects">
        <div className="section-heading"><div><p className="eyebrow">Real work. Real results.</p><h2>Built by Diamond.</h2></div><p>A closer look at work completed by the Diamond Roofing crew—never stock photography.</p></div>
        <div className="project-grid">{projects.map((project, index) => <figure className={index === 0 ? 'project-featured' : ''} key={project.title}><img src={project.image} alt={project.alt} /><figcaption><span>{project.category}</span><strong>{project.title}</strong></figcaption></figure>)}</div>
      </section>

      <section className="process section-pad" id="process">
        <div className="process-head"><p className="eyebrow">How it works</p><h2>A clear path<br />from start to finish.</h2><p>Five simple steps keep expectations clear and the project moving.</p></div>
        <div className="process-list">{process.map(([title, text], index) => <article className="process-card" key={title}><span className="process-number">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>

      <section className="contact section-pad" id="contact"><div className="contact-copy"><p className="eyebrow">Let&apos;s talk about your project</p><h2>Ready to protect<br /><em>your place?</em></h2><p>Tell us what you have in mind. We&apos;ll review the details with you and discuss a clear next step.</p><div className="contact-details"><a href="tel:9319806224"><span>Call</span> 931-980-6224</a><a href="tel:9313463135"><span>Office</span> 931-346-3135</a><a href="mailto:thediamondroofing160426@gmail.com"><span>Email</span> thediamondroofing160426@gmail.com</a></div></div><form className="estimate-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><p className="form-title">Request your free estimate</p><label>Name<input required name="name" placeholder="Your name" /></label><label>Phone<input required name="phone" type="tel" placeholder="(931) 000-0000" /></label><label>Project ZIP Code<input required name="zip" inputMode="numeric" pattern="[0-9]{5}" placeholder="37000" /></label><label>Service needed<select name="project" defaultValue=""><option value="" disabled>Select a service</option><option>Roofing</option><option>Roof repairs</option><option>Siding</option><option>Framing or addition</option><option>Remodeling</option><option>Decks or fencing</option></select></label><label>Project details<textarea name="details" placeholder="Tell us about your project" rows={4} /></label><button className="button" type="submit">Request Estimate <ArrowRight size={17} /></button>{submitted && <p className="concept-message" role="status">Concept preview — form delivery will be connected during production.</p>}<p className="form-note">No pressure. Just a clear conversation about your project.</p></form></section>

      <footer className="site-footer"><a className="footer-brand" href="#page-top"><img src={images.logo} alt="Diamond Roofing LLC" /></a><div><p>Residential roofing, repairs, and remodeling in Clarksville, TN.</p><small>© {new Date().getFullYear()} Diamond Roofing LLC. All rights reserved.</small></div><a className="back-top" href="#page-top">Back to top ↑</a></footer>
    </main>
  )
}
