import "../src/styles.css";

export const metadata = {
  title: "Property Pros PSL",
  description: "One call, every solution for Treasure Coast property care."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
