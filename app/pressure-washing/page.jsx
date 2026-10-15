import Link from "next/link";

export const metadata = {
  title: "Pressure Washing & Soft Washing in Port St. Lucie, FL",
  description: "Property Pros PSL provides pressure washing and soft washing for driveways, sidewalks, patios, pool decks, pavers, roofs and home exteriors throughout the Treasure Coast.",
  alternates: { canonical: "/pressure-washing" }
};

export default function ServicePage() {
  return <main style={{maxWidth:920,margin:"0 auto",padding:"48px 24px",fontFamily:"Arial, sans-serif",lineHeight:1.65,color:"#182333"}}>
    <nav><Link href="/">← Property Pros PSL home</Link></nav>
    <h1>Professional Pressure Washing in Port St. Lucie, FL</h1>
    <p>Property Pros PSL provides pressure washing and soft washing for driveways, sidewalks, patios, pool decks, pavers, roofs and home exteriors throughout the Treasure Coast.</p>
    <h2>Our services</h2>
    <ul><li>Driveway and sidewalk pressure washing</li><li>Patio, pool deck and paver cleaning</li><li>House exterior soft washing</li><li>Roof soft washing where appropriate</li><li>Commercial exterior cleaning</li></ul>
    <h2>Serving the Treasure Coast</h2>
    <p>We serve Port St. Lucie, Stuart, Fort Pierce and surrounding communities. Contact our team to confirm availability at your property.</p>
    <h2>Request a free estimate</h2>
    <p>Call <a href="tel:+17727826743">772-782-6743</a> or visit our <Link href="/">homepage</Link> to request a quote. One Call Does It All!</p>
    <p><Link href="/pressure-washing">Pressure washing</Link> · <Link href="/pool-cleaning">Pool cleaning</Link> · <Link href="/lawn-care">Lawn care</Link></p>
  </main>;
}
