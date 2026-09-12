'use client'

import { useState } from 'react'

const images = {
  logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2154.PNG-OHeE2tk5vYCTRlD9to0OlaeSkyzfbl.png',
  roof: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2158.JPG-RRgMqGxXWKVyChFXOwDgp1SlhvOqNv.jpeg',
  install: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2156.JPG-vnDjHZG7LlegcD9xJ01MuS9utbGbV4.jpeg',
  siding: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2157.JPG-HNSIob7peEQoMyy8k88wYjMwcFA9hr.jpeg',
  deck: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2160.JPG-EgR0GOOPu7hfxQnNHiJnbdrOXxHDWq.jpeg',
}

const services = [
  { number: '01', title: 'Roofing', text: 'Roof replacements and residential systems built for your home.', image: images.roof },
  { number: '02', title: 'Siding', text: 'Weather-tight siding installed level, clean, and ready for years outside.', image: images.siding },
  { number: '03', title: 'Framing & additions', text: 'Strong structures and additions that make more room work better.', image: images.install },
  { number: '04', title: 'Roof repairs', text: 'Careful repairs for leaks, damage, broken shingles, and wear.', image: images.roof },
  { number: '05', title: 'Remodeling', text: 'Practical updates that protect your home and improve the way it lives.', image: images.siding },
  { number: '06', title: 'Decks & fencing', text: 'Solid outdoor structures with clean lines, safe details, and lasting materials.', image: images.deck },
]

const process = [
  ['Tell us about your project', 'Share the work you have in mind and how we can reach you.'],
  ['Review the property', 'We take a closer look at the home and the work involved.'],
  ['Confirm the scope', 'We align on the project details and timing before work begins.'],
  ['Complete the project', 'We carry out the agreed work and keep communication clear through completion.'],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="site-shell">
      <div className="topline"><span>Residential Roofing • Repairs • Remodeling</span></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Diamond Roofing home"><img src={images.logo} alt="Diamond Roofing LLC logo" /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}><span /><span /><span /></button>
        <nav id="main-navigation" className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#process" onClick={() => setMenuOpen(false)}>Our process</a><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a className="button button-small" href="#contact" onClick={() => setMenuOpen(false)}>Request an Estimate</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow">Residential Roofing &amp; Remodeling • Clarksville, Tennessee</p><h1>Built to protect<br /><em>what matters.</em></h1><p className="hero-text">Roofing, repairs, siding, remodeling, framing, additions, decks, and fencing handled with clear communication and careful work.</p><div className="hero-actions"><a className="button" href="#contact">Get a free estimate <span>↗</span></a><a className="text-link" href="tel:9319806224">931-980-6224</a></div><div className="hero-proof"><span className="proof-mark" aria-hidden="true">✦</span><strong>Serving Clarksville and surrounding communities.</strong></div></div>
        <div className="hero-image"><img src={images.siding} alt="Exterior remodeling project by Diamond Roofing" /><div className="image-label"><span>Recent project</span><strong>Exterior remodeling</strong></div></div>
      </section>

      <section className="intro section-pad"><div className="section-kicker">Diamond Roofing LLC</div><div className="intro-grid"><h2>More than a roof.<br /><span>Protection you can count on.</span></h2><div><p>We protect your home with workmanship that is honest, fast, and clean. From the first inspection to the final sweep, you get clear communication and a finished job you can feel good about.</p><a className="arrow-link" href="#process">How we work <span>→</span></a></div></div></section>

      <section className="services section-pad" id="services"><div className="section-heading"><div><p className="eyebrow">Featured residential services</p><h2>Solid work.<br /><em>Every layer.</em></h2></div><p>One crew for the work above, around, and underneath your home.</p></div><div className="service-grid">{services.map((service) => <article className="service-card" key={service.number}><div className="service-image"><img src={service.image} alt={`${service.title} project by Diamond Roofing`} /><span>{service.number}</span></div><div className="service-body"><h3>{service.title}</h3><p>{service.text}</p><a className="arrow-link" href="#contact">Get an estimate <span>→</span></a></div></article>)}</div></section>

      <section className="process section-pad" id="process"><div className="process-head"><p className="eyebrow">How it works</p><h2>A straightforward process.</h2><p>Four clear steps from the first conversation through project completion.</p></div><div className="process-list">{process.map(([title, text], index) => <article className="process-card" key={title}><span className="process-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="projects section-pad" id="projects"><div className="section-heading"><div><p className="eyebrow">The work speaks</p><h2>Recent projects.</h2></div><p>Real work from the Diamond Roofing crew. No stock photography.</p></div><div className="project-grid"><figure className="project-large"><img src={images.install} alt="Roofing team working on a residential home" /><figcaption><span>Roofing installation</span><strong>Built for the weather ahead.</strong></figcaption></figure><figure><img src={images.deck} alt="Deck framing project in progress" /><figcaption><span>Framing &amp; decks</span><strong>Strong starts. Clean finishes.</strong></figcaption></figure></div></section>

      <section className="contact section-pad" id="contact"><div className="contact-copy"><p className="eyebrow">Let&apos;s get to work</p><h2>Protect your place<br /><em>with Diamond.</em></h2><p>Tell us a little about your project. We&apos;ll get back to you to review the details and discuss the next steps.</p><div className="contact-details"><a href="tel:9319806224"><span>Call</span> 931-980-6224</a><a href="tel:9313463135"><span>Office</span> 931-346-3135</a><a href="mailto:thediamondroofing160426@gmail.com"><span>Email</span> thediamondroofing160426@gmail.com</a></div></div><form className="estimate-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><p className="form-title">Request your free estimate</p><label>Name<input required name="name" placeholder="Your name" /></label><label>Phone<input required name="phone" type="tel" placeholder="(931) 000-0000" /></label><label>Project ZIP Code<input required name="zip" inputMode="numeric" pattern="[0-9]{5}" placeholder="37000" /></label><label>Service needed<select name="project" defaultValue=""><option value="" disabled>Select a service</option><option>Roofing</option><option>Roof repairs</option><option>Siding</option><option>Framing or addition</option><option>Remodeling</option><option>Decks or fencing</option></select></label><label>Project details<textarea name="details" placeholder="Tell us about your project" rows={4} /></label><button className="button" type="submit">Request estimate <span>↗</span></button>{submitted && <p className="concept-message" role="status">Concept preview — form delivery will be connected during production.</p>}<p className="form-note">No pressure. Just a clear conversation about your project.</p></form></section>

      <footer className="site-footer"><img src={images.logo} alt="Diamond Roofing LLC" /><div><p>Residential roofing, repairs, and remodeling in Clarksville, TN.</p><small>© {new Date().getFullYear()} Diamond Roofing LLC. All rights reserved.</small></div><a className="back-top" href="#top">Back to top ↑</a></footer>
    </main>
  )
}
