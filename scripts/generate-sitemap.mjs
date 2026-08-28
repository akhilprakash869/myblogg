import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_URL = process.env.SITE_URL || 'https://akhilprakash.in';

const rootDir = process.cwd();
const postsDir = path.join(rootDir, 'content/posts');
const publicDir = path.join(rootDir, 'public');

function getTodayIsoDate() {
  return new Date().toISOString().split('T')[0];
}

function formatDate(dateInput) {
  if (!dateInput) return getTodayIsoDate();
  try {
    const d = new Date(dateInput);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split('T')[0];
    }
  } catch (e) {
    // fallback
  }
  return getTodayIsoDate();
}

function generateSitemap() {
  console.log('Generating sitemap.xml...');

  const today = getTodayIsoDate();
  const staticPages = [
    { url: `${BASE_URL}`, lastmod: today, priority: '1.0', changefreq: 'daily' },
    { url: `${BASE_URL}/blog`, lastmod: today, priority: '0.9', changefreq: 'daily' },
    { url: `${BASE_URL}/about`, lastmod: today, priority: '0.8', changefreq: 'monthly' },
    { url: `${BASE_URL}/contact`, lastmod: today, priority: '0.7', changefreq: 'monthly' },
  ];

  let postPages = [];
  const categoriesSet = new Set();

  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir);
    const mdxFiles = files.filter(
      (file) => (file.endsWith('.mdx') || file.endsWith('.md')) && !file.startsWith('_')
    );

    for (const file of mdxFiles) {
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      // Skip drafts
      if (data.draft === true) {
        continue;
      }

      const slug = file.replace(/\.mdx?$/, '');
      const lastmod = formatDate(data.date);

      postPages.push({
        url: `${BASE_URL}/blog/${slug}`,
        lastmod: lastmod,
        priority: '0.8',
        changefreq: 'weekly',
      });

      if (data.category) {
        categoriesSet.add(data.category);
      }
    }
  }

  const categoryPages = Array.from(categoriesSet).map((category) => {
    const categorySlug = category
      .toLowerCase()
      .replace(/ & /g, '-')
      .replace(/ /g, '-');
    return {
      url: `${BASE_URL}/category/${categorySlug}`,
      lastmod: today,
      priority: '0.6',
      changefreq: 'weekly',
    };
  });

  const allPages = [...staticPages, ...categoryPages, ...postPages];

  const xmlUrls = allPages
    .map(
      (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq || 'weekly'}</changefreq>
    <priority>${page.priority || '0.5'}</priority>
  </url>`
    )
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>
`;

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml.trim() + '\n', 'utf8');
  console.log(`Successfully generated ${sitemapPath} with ${allPages.length} active routes.`);

  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
  const robotsPath = path.join(publicDir, 'robots.txt');
  fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
  console.log(`Successfully generated ${robotsPath}`);
}

generateSitemap();
