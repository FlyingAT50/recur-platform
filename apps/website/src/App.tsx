import { ArrowRight, Check, Menu, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { Platform } from "./platform/Platform";
import { supabase } from "./lib/supabase";

const navigation = [
  ["How it works", "/#how-it-works"],
  ["Your deposit", "/#deposit"],
  ["For dealers", "/dealers"],
  ["For manufacturers", "/manufacturers"],
  ["About", "/about"],
] as const;

function Logo() {
  return <Link className="logo" to="/" aria-label="Recur home">recur<span>.</span></Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Logo />
      <button className="menu-button" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? "nav open" : "nav"} aria-label="Primary">
        {navigation.map(([label, href]) => href.startsWith("/#") ? <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a> : <NavLink key={href} to={href} onClick={() => setOpen(false)}>{label}</NavLink>)}
      </nav>
      <Link className="sign-in-link" to="/app">Sign in</Link>
      <a className="button button-small header-cta" href="#register">Find a Recur dealer</a>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div><Logo /><p>A new way to rent, return and renew premium bikes.</p></div>
      <div className="footer-links"><Link to="/app">Sign in</Link><Link to="/about">About</Link><Link to="/dealers">For dealers</Link><Link to="/manufacturers">For manufacturers</Link><a href="mailto:hello@recur.exchange">Contact</a></div>
      <p className="legal">Recur plans are subject to eligibility, availability and agreement terms. End-of-term return or renewal options depend on the applicable agreement and the bike meeting agreed condition and servicing requirements. © 2026 Recur.</p>
    </footer>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <><a className="skip-link" href="#main">Skip to main content</a><Header /><main id="main">{children}</main><Footer /></>;
}

function Home() {
  return <Shell>
    <section className="hero section-grid">
      <div className="hero-copy"><p className="eyebrow">The bike upgrade cycle</p><h1>Rent. Return.<br />Renew.</h1><p className="lead">A smarter way to ride. Choose your bike and plan, start with a deposit, make monthly payments and ride. At the end of the term, return or renew.</p><div className="actions"><a className="button" href="#how-it-works">I’m looking for a bike <ArrowRight size={18}/></a><Link className="text-link" to="/dealers">I’m a bike dealer</Link></div></div>
      <div className="hero-visual"><img src="/assets/hero-bike.webp" alt="3T Exploro gravel bike" /></div>
    </section>

    <section className="audiences section"><p className="eyebrow">Who it’s for</p><h2>One platform. Built for riders, dealers and brands.</h2><div className="card-grid">
      <Audience title="For riders" heading="Get the bike you want. Keep your options open." body="Choose your bike and plan, start with a deposit, then pay monthly and ride. At the end of the term, return or renew." href="#how-it-works" />
      <Audience title="For dealers" heading="Help them choose. Keep them riding." body="Stay connected from first fit and setup to authorised servicing, return and the next-bike conversation." href="/dealers" />
      <Audience title="For manufacturers" heading="Stay part of the journey." body="Support riders through servicing and renewal, with a clearer route into their next bike." href="/manufacturers" />
    </div></section>

    <section id="how-it-works" className="section how"><p className="eyebrow">Here’s how Recur works</p><h2>Rent. Return. Renew.</h2><div className="steps">
      <Step number="01" image="/assets/step-choose.webp" title="Choose your bike" body="Choose the bike you actually want through a participating Recur dealer." />
      <Step number="02" image="/assets/step-plan.webp" title="Choose your plan and deposit" body="Pick a monthly plan, start with a deposit, then ride while keeping your Recur bike serviced." />
      <Step number="03" image="/assets/step-renew.webp" title="Decide what’s next" body="At the end of your term, return your Recur bike or renew for something new, subject to your agreement." />
    </div></section>

    <section id="deposit" className="section deposit section-grid"><div><p className="eyebrow">Your deposit</p><h2>Start with a deposit. Ride on a monthly plan.</h2><p className="lead">Choose your bike and plan with a participating Recur dealer. Start with a deposit, then make monthly payments and ride.</p><div className="promise"><Check/><span>Known specification</span><Check/><span>Authorised servicing</span><Check/><span>A clearer renewal path</span></div></div><Calculator /></section>
    <Register />
  </Shell>;
}

function Audience({ title, heading, body, href }: { title: string; heading: string; body: string; href: string }) {
  const link = <><span>Explore</span><ArrowRight size={18}/></>;
  return <article className="audience-card"><p className="eyebrow">{title}</p><h3>{heading}</h3><p>{body}</p>{href.startsWith("/") ? <Link className="text-link" to={href}>{link}</Link> : <a className="text-link" href={href}>{link}</a>}</article>;
}

function Step({ number, image, title, body }: { number: string; image: string; title: string; body: string }) {
  return <article className="step"><div className="step-image"><img src={image} alt="" /></div><p className="step-number">{number}</p><h3>{title}</h3><p>{body}</p></article>;
}

function Calculator() {
  const [price, setPrice] = useState(7500); const [deposit, setDeposit] = useState(1200);
  const future = price * .45; const monthly = Math.max(0, Math.round((price - deposit - future) / 24));
  return <div className="calculator"><p className="eyebrow">An illustrative example</p><h3>Your Recur payment</h3><div className="monthly"><strong>£{monthly}</strong><span>/ month</span></div><label>Bike price <input type="number" value={price} min="1000" max="50000" onChange={e => setPrice(Number(e.target.value))}/></label><label>Deposit <input type="number" value={deposit} min="0" max={price} onChange={e => setDeposit(Number(e.target.value))}/></label><dl><div><dt>Estimated value after 24 months</dt><dd>£{future.toLocaleString("en-GB")}</dd></div><div><dt>Term</dt><dd>24 months</dd></div></dl><p className="fine-print">Illustrative only, not a finance quote or offer. Final lender terms, eligibility, servicing and condition requirements apply.</p></div>;
}

function Register() {
  const [state, setState] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("submitting");
    if (!supabase) { setState("error"); return; }
    const email = String(new FormData(e.currentTarget).get("email") || "").trim();
    const { error } = await supabase.from("enquiries").insert({ kind: "consumer", email, consent_at: new Date().toISOString() });
    setState(error ? "error" : "sent");
  }
  return <section id="register" className="register section"><div><p className="eyebrow">Be first in line</p><h2>Your next bike starts here.</h2><p>Register for Recur launch news and participating dealer updates.</p></div>{state === "sent" ? <div className="success"><Check/> Thanks — you’re on the list.</div> : <form onSubmit={submit}><label><span>Email address</span><input required type="email" name="email" placeholder="you@example.com" /></label><button className="button" disabled={state === "submitting"} type="submit">{state === "submitting" ? "Registering…" : "Register your interest"} <ArrowRight size={18}/></button>{state === "error" && <p className="form-error">We couldn’t save that just now. Please try again.</p>}</form>}</section>;
}

const pageContent = {
  dealers: { eyebrow: "Recur for dealers", title: "More than a sale. A relationship that renews.", body: "Give riders a clear monthly route into the right bike, remain their authorised service partner and be there when it’s time to return or renew.", image: "/assets/dealers-hero.webp", points: ["A Recur option at checkout", "A shared bike and service record", "Return and renewal dates at a glance"] },
  manufacturers: { eyebrow: "Recur for manufacturers", title: "Stay part of every bike’s journey.", body: "Connect the first sale to authorised care, verified history and the rider’s next bike—without losing the value created along the way.", image: "/assets/manufacturers-hero.webp", points: ["Protect specification and provenance", "Support an authorised service network", "Create a premium renewal cycle"] },
  about: { eyebrow: "About Recur", title: "Building a better lifecycle for premium bikes.", body: "Recur brings riders, dealers and manufacturers together around one bike record and one simple promise: rent, return, renew.", image: "/assets/about-hero.webp", points: ["Designed around riders", "Delivered with specialist dealers", "Built for responsible reuse"] },
} as const;

function ContentPage({ kind }: { kind: keyof typeof pageContent }) {
  const page = pageContent[kind];
  return <Shell><section className="page-hero section-grid"><div><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="lead">{page.body}</p><a className="button" href="mailto:hello@recur.exchange">Talk to Recur <ArrowRight size={18}/></a></div><img src={page.image} alt="" /></section><section className="section"><div className="feature-list">{page.points.map((point, i) => <article key={point}><span>0{i+1}</span><h2>{point}</h2><p>Clear, connected and designed to make every stage of the Recur lifecycle easier to manage.</p></article>)}</div></section><Register /></Shell>;
}

function App() {
  return <Routes><Route path="/" element={<Home />} /><Route path="/dealers" element={<ContentPage kind="dealers" />} /><Route path="/manufacturers" element={<ContentPage kind="manufacturers" />} /><Route path="/about" element={<ContentPage kind="about" />} /><Route path="/app/*" element={<Platform />} /><Route path="*" element={<Home />} /></Routes>;
}

export default App;
