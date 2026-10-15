import "../src/styles.css";

export const metadata = {
  metadataBase: new URL("https://propprospsl.com"),
  title: {
    default: "Property Pros PSL | Pressure Washing, Pool Cleaning & Lawn Care",
    template: "%s | Property Pros PSL"
  },
  description: "Pressure washing, soft washing, weekly pool cleaning and lawn care in Port St. Lucie, Stuart and Fort Pierce, FL. Request a free estimate from Property Pros PSL.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://propprospsl.com",
    siteName: "Property Pros PSL",
    title: "Property Pros PSL | Pressure Washing, Pool Cleaning & Lawn Care",
    description: "Professional pressure washing, pool maintenance and lawn care across the Treasure Coast."
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
