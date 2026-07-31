"use client";
import React, { useState } from "react";
import {
  ArrowRight, BarChart3, Bell, CalendarDays, Check, ChevronRight, CircleDollarSign,
  ClipboardCheck, Clock3, CreditCard, Droplets, FileText, Home, LayoutDashboard,
  Leaf, Menu, MessageSquare, Phone, Plus, Search, ShieldCheck, Sparkles, Users,
  Wrench, X, Zap
} from "lucide-react";

const brands = [
  { name: "Property Pros PSL", short: "Maintenance", color: "#c9252c", img: "/brands/Property-Pros-PSL-Updated-White-Background.png", copy: "Ongoing home and property maintenance through one simple monthly membership.", price: "Monthly membership", icon: Wrench },
  { name: "Piranha Pools", short: "Pools", color: "#00a8d8", img: "/brands/Piranha-Pools-PSL.png", copy: "Weekly pool care, inspections, repairs, and cleanups.", price: "From $165/mo", icon: Droplets },
  { name: "Pesky Pests", short: "Pest", color: "#ef3d42", img: "/brands/Pesky-Pests-PSL.png", copy: "Dependable home pest protection with recurring service.", price: "Request pricing", icon: ShieldCheck },
  { name: "Paradise Properties Landscape", short: "Landscape", color: "#51aa42", img: "/brands/Paradise-Properties-Landscape-PSL-White-Background.png", copy: "Lawn, landscape, and exterior property care.", price: "Request pricing", icon: Leaf },
];

const jobs = [
  { time: "8:00 AM", customer: "M. Robinson", type: "Weekly Pool Service", tech: "Carlos M.", brand: "Pools", status: "In progress", color: "blue" },
  { time: "9:30 AM", customer: "A. Turner", type: "Pest Initial Treatment", tech: "Maya J.", brand: "Pest", status: "Scheduled", color: "red" },
  { time: "11:00 AM", customer: "T. Harris", type: "Lawn Maintenance", tech: "Devon R.", brand: "Landscape", status: "Scheduled", color: "green" },
  { time: "1:00 PM", customer: "L. Foster", type: "Pool Inspection", tech: "Carlos M.", brand: "Pools", status: "Confirmed", color: "blue" },
  { time: "2:30 PM", customer: "K. Jensen", type: "Bundle Walkthrough", tech: "Jody G.", brand: "Property Pros", status: "Estimate", color: "gold" },
];

const leads = [
  { name: "Sarah Miller", service: "Full property bundle", source: "Website", value: "$425/mo", age: "8 min", score: "Hot" },
  { name: "Ronald Clark", service: "Pool full service", source: "Google", value: "$165/mo", age: "42 min", score: "New" },
  { name: "Nicole Adams", service: "Pest control", source: "Referral", value: "—", age: "2 hr", score: "Contacted" },
  { name: "Daniel Reed", service: "Landscape maintenance", source: "Website", value: "—", age: "Yesterday", score: "Estimate" },
];

function Pill({ children, tone = "slate" }) {
  return <span className={`pill ${tone}`}>{children}</span>;
}

function Logo({ compact = false }) {
  return (
    <button className="logo" onClick={() => location.hash = ""} aria-label="Property Pros home">
      <img className={compact ? "brand-logo compact" : "brand-logo"} src="/brands/Property-Pros-PSL-Updated-White-Background.png" alt="Property Pros PSL"/>
    </button>
  );
}

function QuoteModal({ onClose }) {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", property_address: "", service: "", preferred_time: "Any time", message: "" });
  const change = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError("");
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) { setError("The quote connection is temporarily unavailable. Please call 772-782-6743."); setBusy(false); return; }
    try {
      const response = await fetch(`${url}/rest/v1/quote_requests`, { method: "POST", headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify({ ...form, source: "Property Pros website" }) });
      if (!response.ok) throw new Error(await response.text());
      setSent(true);
    } catch {
      setError("We couldn’t submit the request. Please call 772-782-6743 and we’ll help you right away.");
    }
    setBusy(false);
  }
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={e => e.stopPropagation()}>
        <button className="icon-button modal-x" onClick={onClose}><X size={19}/></button>
        {!sent ? <>
          <Pill tone="gold">FREE PROPERTY REVIEW</Pill>
          <h2>What can our Pros handle for you?</h2>
          <p>Tell us what you need. We’ll follow up with service options and straightforward pricing.</p>
          <form onSubmit={submit}><div className="form-grid">
            <label>Full name<input name="full_name" value={form.full_name} onChange={change} placeholder="Your name" required /></label>
            <label>Phone<input name="phone" value={form.phone} onChange={change} placeholder="(772) 555-0123" required /></label>
            <label className="wide">Email<input name="email" type="email" value={form.email} onChange={change} placeholder="you@example.com" /></label>
            <label className="wide">Property address<input name="property_address" value={form.property_address} onChange={change} placeholder="Street address, city, ZIP" required /></label>
            <label>Service<select name="service" value={form.service} onChange={change} required><option value="">Choose a service</option><option>Property maintenance membership</option><option>Pool care</option><option>Pest control</option><option>Landscape care</option><option>Multiple services</option></select></label>
            <label>Best time<select name="preferred_time" value={form.preferred_time} onChange={change}><option>Any time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>
            <label className="wide">How can we help?<textarea name="message" value={form.message} onChange={change} placeholder="Tell us about your property..." /></label>
          </div>{error && <p className="form-error">{error}</p>}<button className="primary full" disabled={busy}>{busy ? "Sending…" : "Request my quote"} <ArrowRight size={17}/></button></form>
        </> : <div className="success">
          <span><Check size={34}/></span><h2>You’re on our list.</h2>
          <p>A Property Pros team member will contact you shortly at the number provided.</p>
          <button className="primary" onClick={onClose}>Done</button>
        </div>}
      </div>
    </div>
  );
}

function PublicSite({ openQuote, enterPortal }) {
  const [menu, setMenu] = useState(false);
  return (
    <div className="public-shell">
      <div className="top-strip"><span>Serving Port St. Lucie & the Treasure Coast</span><a href="tel:7727826743"><Phone size={13}/> 772-782-6743</a></div>
      <nav className="public-nav">
        <Logo />
        <div className={`nav-links ${menu ? "open" : ""}`}>
          <a href="#maintenance">Property Maintenance</a><a href="#services">All Services</a><a href="#membership">Monthly Membership</a><a href="#why">Why Us</a>
          <button className="link-button" onClick={enterPortal}>Customer login</button>
          <button className="primary small" onClick={openQuote}>Get a free quote</button>
        </div>
        <button className="mobile-menu icon-button" onClick={() => setMenu(!menu)}><Menu/></button>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-glow one"/><div className="hero-glow two"/>
          <div className="hero-copy">
            <Pill tone="gold"><Sparkles size={13}/> YOUR COMPLETE PROPERTY CARE TEAM</Pill>
            <h1>One call.<br/><em>Every solution.</em></h1>
            <p>Monthly property maintenance, pool care, pest control, and landscaping—coordinated by one trusted local team.</p>
            <div className="hero-actions">
              <button className="primary" onClick={openQuote}>Get my free quote <ArrowRight size={18}/></button>
              <a className="secondary" href="tel:7727826743"><Phone size={17}/> 772-782-6743</a>
            </div>
            <div className="trust-row"><span><Check/> Monthly property checkups</span><span><Check/> Local Treasure Coast team</span><span><Check/> One point of contact</span></div>
          </div>
          <div className="hero-showcase">
            <div className="hero-membership">
              <span className="hero-membership-icon"><Wrench/></span>
              <div><small>THE PROPERTY PROS DIFFERENCE</small><h2>Monthly Property Maintenance</h2><p>Preventive checkups, minor upkeep, priority scheduling, and clear visit reports.</p></div>
              <button onClick={openQuote}>Explore membership <ArrowRight size={16}/></button>
            </div>
            <div className="hero-service-grid">
              {[
                ["Pool Care", "Piranha Pools", Droplets, "blue"],
                ["Pest Control", "Pesky Pests", ShieldCheck, "red"],
                ["Landscaping", "Paradise Properties", Leaf, "green"]
              ].map(([title, division, Icon, tone]) => (
                <a href="#services" className={`hero-service ${tone}`} key={title}>
                  <span><Icon/></span><div><small>{division}</small><b>{title}</b></div><ChevronRight/>
                </a>
              ))}
            </div>
            <div className="hero-promise"><Check/> One local company coordinating every service for your property.</div>
          </div>
        </section>

        <section className="numbers">
          <div><b>4</b><span>Property services</span></div><div><b>1</b><span>Trusted local team</span></div><div><b>Monthly</b><span>Maintenance membership</span></div><div><b>24/7</b><span>Online account access</span></div>
        </section>

        <section className="maintenance-section" id="maintenance">
          <div className="maintenance-copy">
            <Pill tone="red"><Wrench size={13}/> PROPERTY MAINTENANCE</Pill>
            <h2>Your home’s ongoing to-do list,<br/>handled every month.</h2>
            <p>The Property Pros PSL monthly maintenance membership gives homeowners one dependable team for routine upkeep, preventive checks, and the small jobs that are easy to postpone.</p>
            <div className="maintenance-actions">
              <button className="primary red-action" onClick={openQuote}>Ask about membership <ArrowRight size={17}/></button>
              <a href="tel:7727826743"><Phone size={16}/> Call 772-782-6743</a>
            </div>
          </div>
          <div className="maintenance-list">
            {[
              ["Routine property walkthroughs","We spot developing maintenance needs before they become larger repairs."],
              ["Minor home maintenance","A recurring visit for approved small repairs, adjustments, and upkeep."],
              ["Priority scheduling","Members receive one reliable contact and preferred scheduling for service requests."],
              ["Simple monthly reporting","Clear visit notes, recommendations, and a record of work completed."]
            ].map(([title,copy])=><div key={title}><span><Check/></span><div><b>{title}</b><p>{copy}</p></div></div>)}
          </div>
        </section>

        <section className="section" id="services">
          <div className="section-heading"><div><Pill>OUR FAMILY OF BRANDS</Pill><h2>Everything your property needs.</h2></div><p>Start with monthly property maintenance or choose one of our specialized service divisions.</p></div>
          <div className="brand-grid">
            {brands.map(b => <article className="brand-card" key={b.name} style={{"--brand":b.color}}>
              <div className="brand-logo-wrap"><img src={b.img} alt={b.name}/></div>
              <div className="brand-body"><span className="brand-tag"><b.icon size={15}/>{b.short}</span><p>{b.copy}</p><div><b>{b.price}</b><button onClick={openQuote}>Explore <ChevronRight size={16}/></button></div></div>
            </article>)}
          </div>
        </section>

        <section className="dark-section" id="why">
          <div><Pill tone="gold">WHY PROPERTY PROS</Pill><h2>Less time managing vendors.<br/>More time enjoying your home.</h2></div>
          <div className="benefit-grid">
            {[["One simple account","View visits, invoices, messages, and every service in one place.",LayoutDashboard],["Local, accountable teams","One company stands behind the work across every division.",Users],["Service you can see","Photos, technician notes, and updates after every visit.",ClipboardCheck],["Built to bundle","Add services as your needs change without starting over.",Zap]].map(([t,c,I])=><div key={t}><span><I/></span><h3>{t}</h3><p>{c}</p></div>)}
          </div>
        </section>

        <section className="section bundle-section" id="membership">
          <div className="bundle-copy"><Pill tone="red">MONTHLY PROPERTY MAINTENANCE</Pill><h2>One monthly subscription.<br/>A better-maintained home.</h2><p>We begin with a property walkthrough, build a recurring maintenance plan around your home, and provide a custom monthly price based on its size and needs. Add pool, pest, or landscape service for one coordinated property-care plan.</p><ul className="membership-points"><li><Check/> Scheduled recurring maintenance visit</li><li><Check/> Preventive property inspection</li><li><Check/> Priority help for approved service requests</li><li><Check/> One account, one team, one monthly plan</li></ul><button className="primary red-action" onClick={openQuote}>Get my membership quote <ArrowRight size={17}/></button><small className="plan-note">Membership scope and pricing are customized after a property walkthrough. Materials and larger repairs are quoted separately.</small></div>
          <div className="stack-card">
            <div className="membership-card-head"><img src="/brands/Property-Pros-PSL-Updated-White-Background.png" alt="Property Pros PSL"/><span>MONTHLY HOME CARE MEMBERSHIP</span><h3>Built around your property.</h3><p>Your customized plan can coordinate every Property Pros service.</p></div>
            {brands.slice(1).map((b)=><div className="stack-item" key={b.name}><span style={{background:b.color}}><b.icon/></span><div><small>OPTIONAL SERVICE DIVISION</small><b>{b.name}</b></div><Plus/></div>)}
            <div className="stack-total"><span>PROPERTY PROS PSL</span><b>One coordinated monthly plan</b><small>Custom quoted for your home</small></div>
          </div>
        </section>
      </main>
      <footer><Logo/><p>Locally built for Treasure Coast homeowners.</p><a href="tel:7727826743">772-782-6743</a><small>© 2026 Property Pros PSL LLC</small></footer>
    </div>
  );
}

const nav = [
  ["Overview", LayoutDashboard], ["Schedule", CalendarDays], ["Customers", Users], ["Leads", Sparkles],
  ["Invoices", CreditCard], ["Team", Wrench], ["Messages", MessageSquare], ["Reports", BarChart3]
];

function Metric({ label, value, detail, icon: Icon, tone }) {
  return <div className="metric"><span className={`metric-icon ${tone}`}><Icon/></span><div><small>{label}</small><b>{value}</b><em>{detail}</em></div></div>;
}

function Overview() {
  return <>
    <div className="dashboard-title"><div><span>MONDAY, JULY 28</span><h1>Good afternoon, Jody.</h1><p>Here’s what’s happening across Property Pros today.</p></div><button className="primary"><Plus size={17}/> New job</button></div>
    <div className="metrics">
      <Metric label="MONTHLY RECURRING REVENUE" value="$42,680" detail="↑ 12.4% this month" icon={CircleDollarSign} tone="green"/>
      <Metric label="ACTIVE CUSTOMERS" value="284" detail="+18 this month" icon={Users} tone="blue"/>
      <Metric label="JOBS TODAY" value="23" detail="19 on schedule" icon={CalendarDays} tone="purple"/>
      <Metric label="OPEN LEADS" value="31" detail="$8,240 potential MRR" icon={Sparkles} tone="gold"/>
    </div>
    <div className="dashboard-grid">
      <section className="panel schedule-panel">
        <div className="panel-head"><div><h2>Today’s schedule</h2><p>23 jobs · 6 technicians</p></div><button>View calendar <ArrowRight size={15}/></button></div>
        <div className="job-list">{jobs.map(j=><div className="job-row" key={j.time+j.customer}><b>{j.time}</b><span className={`job-dot ${j.color}`}/><div><strong>{j.type}</strong><small>{j.customer} · {j.tech}</small></div><Pill tone={j.color}>{j.status}</Pill><button className="more">•••</button></div>)}</div>
      </section>
      <section className="panel revenue-panel">
        <div className="panel-head"><div><h2>Recurring revenue</h2><p>Last 6 months</p></div><Pill tone="green">+31.6%</Pill></div>
        <div className="chart">
          {[44,51,48,62,70,82].map((h,i)=><div key={i}><span style={{height:`${h}%`}}/><small>{["Feb","Mar","Apr","May","Jun","Jul"][i]}</small></div>)}
        </div>
        <div className="revenue-split">{brands.map((b,i)=><div key={b.name}><span style={{background:b.color}}/><small>{b.short}</small><b>{["$21,450","$9,780","$11,450"][i]}</b></div>)}</div>
      </section>
      <section className="panel lead-panel">
        <div className="panel-head"><div><h2>New leads</h2><p>Needs attention</p></div><button>View all <ArrowRight size={15}/></button></div>
        <div>{leads.map(l=><div className="lead-row" key={l.name}><span className="avatar">{l.name.split(" ").map(x=>x[0]).join("")}</span><div><b>{l.name}</b><small>{l.service} · {l.age}</small></div><div><Pill tone={l.score==="Hot"?"red":"slate"}>{l.score}</Pill><b>{l.value}</b></div></div>)}</div>
      </section>
      <section className="panel activity-panel">
        <div className="panel-head"><div><h2>Operations pulse</h2><p>Across all divisions</p></div></div>
        {[["Route completion","78%","18 of 23 jobs",78],["Invoices collected","91%","$37,420 of $41,100",91],["Estimate close rate","46%","7-day rolling",46],["Customer retention","96%","Trailing 90 days",96]].map(([a,b,c,d])=><div className="progress-row" key={a}><div><b>{a}</b><strong>{b}</strong></div><span><i style={{width:`${d}%`}}/></span><small>{c}</small></div>)}
      </section>
    </div>
  </>;
}

function GenericPage({ active }) {
  const content = {
    Schedule:["Dispatch board","Drag jobs between technicians and routes.",jobs.map(j=>[j.time,j.customer,j.type,j.tech,j.status])],
    Customers:["Customer accounts","284 active customers across three divisions.",[["M. Robinson","Pool Full Service","$165/mo","Active"],["A. Turner","Pest Protection","Custom","Active"],["T. Harris","Landscape Care","Custom","Active"],["K. Jensen","Multi-service lead","$425/mo","Proposal"]]],
    Leads:["Sales pipeline","Track every inquiry from first call to recurring customer.",leads.map(l=>[l.name,l.service,l.source,l.value,l.score])],
    Invoices:["Billing & collections","Recurring charges, open balances, and payment history.",[["INV-2048","Robinson Residence","Jul 25","$165.00","Paid"],["INV-2047","Turner Residence","Jul 25","$129.00","Paid"],["INV-2046","Foster Residence","Jul 24","$150.00","Due"],["INV-2045","Harris Residence","Jul 22","$220.00","Past due"]]],
    Team:["Team & field operations","Routes, productivity, time tracking, and quality scores.",[["Carlos M.","Pool Technician","8 jobs today","98%"],["Maya J.","Pest Technician","6 jobs today","96%"],["Devon R.","Landscape Lead","7 jobs today","94%"],["Jody G.","Owner / Manager","2 estimates","—"]]],
    Messages:["Unified inbox","Customer conversations from every service division.",[["Sarah Miller","Interested in full property bundle","8 min","Unread"],["Ronald Clark","Can we start pool service Friday?","42 min","Unread"],["Nicole Adams","Thank you for the update","2 hr","Read"],["Daniel Reed","Photo attached: side yard","Yesterday","Read"]]],
    Reports:["Business reporting","Revenue, retention, technician performance, and growth.",[["Recurring revenue","$42,680","+12.4%","On track"],["Gross margin","48.2%","+2.1 pts","On track"],["Customer acquisition cost","$118","-$14","Improving"],["Annualized revenue","$512,160","+31.6%","On track"]]],
  }[active];
  return <><div className="dashboard-title"><div><span>PROPERTY PROS OPERATIONS</span><h1>{content[0]}</h1><p>{content[1]}</p></div><button className="primary"><Plus size={17}/> Add new</button></div>
    <section className="panel table-panel"><div className="table-tools"><div className="search"><Search size={17}/><input placeholder={`Search ${active.toLowerCase()}...`}/></div><button className="secondary">Filter</button></div>
      <div className="data-table">{content[2].map((row,i)=><div className="data-row" key={i}>{row.map((c,j)=><span key={j} className={j===0?"strong":""}>{c}</span>)}<button className="more">•••</button></div>)}</div>
    </section></>;
}

function Admin({ exitPortal }) {
  const [active, setActive] = useState("Overview");
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={`admin-shell ${collapsed?"collapsed":""}`}>
      <aside>
        <div className="aside-logo"><Logo compact={collapsed}/><button className="collapse-button" onClick={()=>setCollapsed(!collapsed)}><ChevronRight/></button></div>
        <div className="division-picker"><span className="round-icon gold"><Home/></span>{!collapsed&&<div><small>WORKSPACE</small><b>All divisions</b></div>}</div>
        <nav>{nav.map(([n,I])=><button key={n} className={active===n?"active":""} onClick={()=>setActive(n)}><I/>{!collapsed&&<span>{n}</span>}{n==="Leads"&&!collapsed&&<em>31</em>}</button>)}</nav>
        <div className="aside-bottom">{!collapsed&&<div className="support"><Phone/><div><small>PROPERTY PROS LINE</small><b>772-782-6743</b></div></div>}<button className="profile" onClick={exitPortal}><span>JG</span>{!collapsed&&<div><b>Jody Gottschalk</b><small>Owner · Sign out</small></div>}</button></div>
      </aside>
      <div className="admin-main">
        <header><div className="search"><Search/><input placeholder="Search customers, jobs, invoices..."/><kbd>⌘ K</kbd></div><div><button className="icon-button notification"><Bell/><i/></button><button className="primary small"><Plus/> Quick add</button></div></header>
        <main>{active==="Overview"?<Overview/>:<GenericPage active={active}/>}</main>
      </div>
    </div>
  );
}

function App() {
  const [quote, setQuote] = useState(false);
  const enterPortal=()=>{window.location.href="https://operations.propprospsl.com";};
  return <><PublicSite openQuote={()=>setQuote(true)} enterPortal={enterPortal}/>
    {quote&&<QuoteModal onClose={()=>setQuote(false)}/>}</>;
}

export default App;
