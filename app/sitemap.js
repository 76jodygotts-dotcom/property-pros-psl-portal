export default function sitemap() {
  return ["", "/pressure-washing", "/pool-cleaning", "/lawn-care"].map((path) => ({
    url: `https://propprospsl.com${path}`,
    lastModified: new Date(),
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.8 : 1
  }));
}
