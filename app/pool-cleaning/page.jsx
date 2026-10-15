import Link from "next/link";
export const metadata = {
 title: "Weekly Pool Cleaning in Port St. Lucie, FL",
 description: "Piranha Pools by Property Pros PSL provides weekly pool cleaning, brushing, vacuuming and pool water maintenance in Port St. Lucie, Stuart and Fort Pierce.",
 alternates: { canonical: "/pool-cleaning" }
};
export default function PoolCleaningPage() {
 return <main style={{maxWidth:920,margin:"auto",padding:"48px 24px",fontFamily:"Arial, sans-serif",lineHeight:1.7}}>
 <Link href="/">← Property Pros PSL</Link>
 <h1>Weekly Pool Cleaning in Port St. Lucie</h1>
 <p>Piranha Pools, part of Property Pros PSL, provides dependable recurring pool care across the Treasure Coast.</p>
 <h2>Pool maintenance services</h2>
 <ul><li>Weekly pool cleaning</li><li>Brushing and vacuuming</li><li>Water testing and treatment</li><li>Filter cleaning</li><li>Green pool cleanup estimates</li></ul>
 <h2>Service areas</h2><p>Port St. Lucie, Stuart, Fort Pierce and surrounding communities. Contact us to confirm availability.</p>
 <h2>Get a free pool care estimate</h2><p>Call <a href="tel:+17727826743">772-782-6743</a> or visit our <Link href="/">homepage</Link> to request service.</p>
 <p><Link href="/pressure-washing">Pressure washing</Link> · <Link href="/lawn-care">Lawn care</Link></p>
 </main>;
}