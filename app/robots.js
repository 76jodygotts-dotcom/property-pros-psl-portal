export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: "https://propprospsl.com/sitemap.xml",
    host: "https://propprospsl.com"
  };
}
