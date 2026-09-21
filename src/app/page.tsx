const assetBase = "/nexus-assets";

import { AIDirectory } from "@/components/ai-directory";
import { PropertyDiscovery } from "@/components/property-discovery";
import { nexusFAQ } from "@/config/faq-knowledge-base";

const societies = [
  { name: "DHA Lahore", city: "Lahore", image: `${assetBase}/dha.png` },
  { name: "Wapda Town", city: "Lahore", image: `${assetBase}/wapdatown.png` },
  { name: "Askari 14", city: "Rawalpindi", image: `${assetBase}/askarirawalpindi.png` },
  { name: "Bahria Town", city: "Islamabad", image: `${assetBase}/bahriaislamabad.png` },
];

const benefits = [
  ["Real Estate Operating System", "Discovery, verification, leads, deals, and intelligence in one connected workflow."],
  ["National Property Graph", "Properties connect to areas, cities, provinces, people, leads, and decisions."],
  ["54 AI Employees", "Specialist AI workforce with scoped permissions, governed memory, and escalation paths."],
  ["Verification Before Visibility", "Identity, documents, ownership, fraud signals, and audit evidence shape trust."],
  ["Protected Leads", "Qualification, routing, locking, monitoring, and ownership history keep relationships accountable."],
  ["Auditable Deals", "Milestones, documents, payments, and disputes remain connected throughout the lifecycle."],
  ["Role-Based Workspaces", "Buyers, sellers, agents, agencies, investors, developers, and enterprises get focused tools."],
  ["Human-Controlled AI", "AI accelerates judgment but never invents data or silently approves high-stakes actions."],
];

const faqs = nexusFAQ.slice(0, 10);

function Arrow() { return <span aria-hidden="true">-&gt;</span>; }

function LegacyHomePage() {
  return (
    <main>
      <section className="hero-section" id="top">
        <nav className="site-nav">
          <a className="logo" href="#top"><img src={`${assetBase}/transparentlogo.png`} alt="Nexus Property Network" /></a>
          <div className="nav-links"><a href="/search">Properties</a><a href="/coverage">Coverage Areas</a><a href="/lead-protection">Lead Protection</a><a href="/ai-workforce">AI Workforce</a><a href="/pricing">Pricing</a><a href="/faq">FAQ</a></div>
          <div className="nav-actions"><a className="login-link" href="/login">Login</a><a className="button button-dark" href="/register">Get Started <Arrow /></a></div>
        </nav>
        <div className="hero-content">
          <img className="hero-background" src={`${assetBase}/newheroimage.png`} alt="" aria-hidden="true" />
          <div className="hero-copy">
            <p className="kicker">Pakistan&apos;s #1 AI Property Platform</p>
            <h1>Pakistan&apos;s Real Estate <em>Operating</em> System</h1>
            <p className="hero-description">A connected property network for discovery, verification, protected leads, auditable deals, and 54 governed AI Employees - from Karachi to Gilgit.</p>
            <div className="hero-actions"><a className="button button-primary" href="/search">Search Properties <Arrow /></a><a className="button button-outline" href="/list-property">List Your Property</a></div>
            <div className="hero-proof"><span><strong>0</strong> Active Listings</span><span><strong>0</strong> Verified Agents</span><span><strong>5,000+</strong> Premium Areas</span><span><strong>0</strong> Active Leads</span></div>
          </div>
          <div className="hero-visual"><div className="hero-badge"><span className="pulse-dot" /> AI Verified Network</div></div>
        </div>
      </section>

      <section className="societies-section section-padding" id="coverage">
        <div className="section-intro"><p className="kicker">Connected property graph</p><h2>From Lahore to <em>Islamabad</em></h2><p>Explore areas, properties, agents, intelligence, and operating workflows through one national Nexus network.</p></div>
        <div className="society-grid">{societies.map((society) => <a className="society-card" href={`/coverage/${society.city.toLowerCase()}`} key={society.name}><img src={society.image} alt={society.name} /><span><strong>{society.name}</strong>{society.city}</span></a>)}</div>
        <a className="text-link" href="/coverage">View All 130+ Cities &amp; Areas <Arrow /></a>
      </section>

      <section className="coverage-band section-padding" id="coverage-map">
        <div className="section-intro centered"><p className="kicker">National Property Graph</p><h2 className="coverage-title"><strong>130+ Cities</strong> <span>•</span> <strong>5,000+ Areas</strong> <span>•</span> One Operating Network</h2><p>Navigate from province to city, area, property, lead, deal, owner, agent, and AI-supported decision.</p></div>
        <div className="coverage-grid"><img src={`${assetBase}/mapnexusnetwork.png`} alt="Pakistan 130 plus cities and 5000 plus areas network map" /><div className="coverage-stats"><div className="coverage-stat"><strong>130+</strong><span>Cities</span></div><div className="coverage-stat"><strong>5,000+</strong><span>Areas</span></div><div className="coverage-stat"><strong>AI</strong><span>Verified</span></div><div className="coverage-stat"><strong>Lead</strong><span>Protected</span></div><div className="province-stat"><strong>35+ Cities</strong><span>Punjab</span></div><div className="province-stat"><strong>15+ Cities</strong><span>Sindh</span></div><div className="province-stat"><strong>14+ Cities</strong><span>KPK</span></div><div className="province-stat"><strong>9+ Cities</strong><span>Balochistan</span></div></div></div>
        <div className="listing-policy"><div><p className="kicker">Seller Listing Policy</p><h3>Start building your portfolio for free.</h3></div><p>First 10 active listings are FREE. After that, PKR 500 per additional listing. Every listing requires at least 1 property image and 1 ownership document before it can be approved or published.</p><div className="policy-points"><span>10 Free Listings</span><span>PKR 500 after 10th</span><span>Image + Doc required</span></div></div>
      </section>

      <section className="properties-section section-padding" id="properties"><div className="section-heading-row"><div><p className="kicker">Browse Listings</p><h2>Find Your Perfect <em>Property</em></h2></div><a className="text-link" href="/search">View All <Arrow /></a></div><div className="empty-listings"><p>No featured properties yet.</p><a className="button button-primary" href="/list-property">List Your Property <Arrow /></a></div></section>

      <PropertyDiscovery />

      <section className="lead-section section-padding" id="platform"><div className="lead-copy"><p className="kicker">Protected movement</p><h2>Lead to deal, <em>auditable.</em></h2><p>Nexus connects lead qualification, routing, ownership, documents, milestones, payments, and dispute signals into one accountable operating lifecycle.</p><ul className="check-list"><li>AI-qualified intent before contact sharing</li><li>Verified professionals and controlled routing</li><li>Time-bound lead ownership with history</li><li>AI Admin visibility for critical actions</li><li>Human review when evidence or confidence is insufficient</li></ul><a className="text-link" href="/lead-protection">Explore the workflow <Arrow /></a></div><div className="protection-card"><div className="protection-top"><span className="pulse-dot" /> Governance active</div><h3>Every important action leaves a record.</h3><div className="protection-flow"><span>Qualified</span><i>+</i><span>Verified</span><i>+</i><span>Tracked</span></div><div className="protection-footer">AI Admin oversight <strong>LIVE</strong></div></div></section>

      <section className="benefits-section section-padding"><div className="section-intro"><p className="kicker">The Smarter Way</p><h2>Why Choose <em>Nexus?</em></h2><p>Traditional portals show listings. Nexus protects your lead, verifies every party, and manages the full transaction.</p></div><div className="benefits-grid">{benefits.map(([title, text], index) => <article className="benefit" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="process-section section-padding" id="process"><div className="section-intro centered"><p className="kicker">The Operating Lifecycle</p><h2>How Nexus <em>works</em></h2></div><div className="process-grid">{[["01", "Discover", "Search properties, cities, areas, opportunities, agents, and market context through the national property graph."], ["02", "Verify", "Identity, documents, property details, ownership relationships, and fraud signals move through governed review."], ["03", "Protect", "Qualified leads, negotiations, documents, milestones, and payments stay connected to accountable participants."], ["04", "Operate", "AI workforce recommendations, human oversight, audit trails, and lifecycle events keep the platform trustworthy."]].map(([number, title, text]) => <article className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="assistant"><div><p className="kicker">AI Workforce</p><h3>Ask the right specialist.</h3><p>Buyer AI, Area Intelligence AI, Verification AI, Deal AI, Investment AI, and AI Admin coordinate within governed permissions.</p></div><div className="assistant-tags"><span>54 Employees</span><span>Scoped Memory</span><span>80% Threshold</span><span>Audit Required</span><span>Escalation</span><span>Human Review</span></div><a className="button button-primary" href="/ai-workforce">Meet the Workforce <Arrow /></a></div></section>

      <AIDirectory />

      <section className="plans-section section-padding" id="plans"><div className="section-intro centered"><p className="kicker">Simple Plans</p><h2>Choose Your <em>Plan</em></h2></div><div className="plans-grid">{[["Starter", "PKR 500", "10 Credits", "1 Coverage Area"], ["Professional", "PKR 1,500", "50 Credits", "Multiple Areas"], ["Business", "PKR 3,000", "Unlimited Credits", "All Areas"]].map(([name, price, credits, areas], index) => <article className={`plan-card ${index === 1 ? "featured-plan" : ""}`} key={name}>{index === 1 && <span className="popular">Most Popular</span>}<h3>{name}</h3><strong>{price}<small>/month</small></strong><p>{credits}</p><p>{areas}</p><p>Lead Protection</p><p>Verified Badge</p><a className="button button-outline" href="/pricing">View Plans</a></article>)}</div></section>

      <section className="faq-section section-padding" id="faq"><div className="section-intro centered"><p className="kicker">Constitutional knowledge base</p><h2>Frequently Asked <em>Questions</em></h2><p>Distinct answers covering the platform, trust, AI workforce, workflows, governance, and commercial model.</p></div><div className="faq-list">{faqs.map((entry) => <details key={entry.id}><summary>{entry.question}<span>+</span></summary><p>{entry.answer}</p></details>)}</div><a className="text-link" href="/faq">View all {nexusFAQ.length} answers <Arrow /></a></section>

      <footer className="footer" id="footer"><div className="footer-cta" id="join"><p className="kicker">Ready to join Pakistan&apos;s largest AI Property Network?</p><h2>Build your next deal with <em>Nexus.</em></h2><p>130+ cities. 5,000+ areas. AI-verified listings. Lead protection. Join thousands of sellers, buyers and agents already on Nexus.</p><div className="hero-actions"><a className="button button-primary" href="/list-property">List My Property Free</a><a className="button button-outline" href="/register?role=agent">Join As Agent</a></div></div><div className="footer-grid"><div><img className="footer-logo" src={`${assetBase}/transparentlogo.png`} alt="Nexus Property Network" /><p>Pakistan&apos;s first smart property lead network. Connecting sellers, buyers and trusted agents across Pakistan.</p></div><div><h4>Quick Links</h4><a href="/search">Properties</a><a href="/coverage">Coverage Areas</a><a href="/lead-protection">Lead Protection</a><a href="#process">How It Works</a></div><div><h4>Platform</h4><a href="/pricing">Pricing</a><a href="/faq">FAQ</a><a href="/contact">Contact</a><a href="/login">Login</a></div><div><h4>Contact Us</h4><a href="tel:03299669565">0329-9669565</a><a href="https://wa.me/923140073794">0314-0073794 (WhatsApp)</a><a href="mailto:nexus.pakistan.properties@gmail.com">nexus.pakistan.properties@gmail.com</a><span>Lahore, Pakistan</span></div></div><div className="footer-bottom"><span>© 2026 Nexus Property Network. All Rights Reserved.</span><span><a href="/contact">Privacy Policy</a><a href="/contact">Terms of Service</a></span></div></footer>
    </main>
  );
}

export default LegacyHomePage;
