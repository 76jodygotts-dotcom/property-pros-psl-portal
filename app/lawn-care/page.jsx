import Link from "next/link";
export const metadata = {
 title: "Lawn Care & Mowing in Port St. Lucie, FL",
 description: "Paradise Properties Landscape by Property Pros PSL provides lawn mowing, edging, hedge trimming and yard cleanups in Port St. Lucie, Stuart and Fort Pierce.",
 alternates: { canonical: "/lawn-care" }
};
export default function LawnCarePage() {
 return <main style={{maxWidth:920,margin:"auto",padding:"48px 24px",fontFamily:"Arial, sans-serif",lineHeight:1.7}}>
 <Link href="/">← Property Pros PSL</Link>
 <h1>Lawn Care and Mowing in Port St. Lucie</h1>
 <p>Paradise Properties Landscape, part of Property Pros PSL, provides recurring lawn maintenance and landscaping services across the Treasure Coast.</p>
 <h2>Lawn and landscape services</h2>
 <ul><li>Recurring lawn mowing</li><li>Edging and string trimming</li><li>Hedge and shrub trimming</li><li>Yard and landscape cleanups</li><li>Landscape installation estimates</li></ul>
 <h2>Service areas</h2><p>Port St. Lucie, Stuart, Fort Pierce and nearby communities. Contact us to confirm availability.</p>
 <h2>Request a free lawn care estimate</h2><p>Call <a href="tel:+17727826743">772-782-6743</a> or visit our <Link href="/">homepage</Link> to request service.</p>
 <p><Link href="/pressure-washing">Pressure washing</Link> · <Link href="/pool-cleaning">Pool cleaning</Link></p>
 </main>;
}