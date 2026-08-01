import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';

function normalizeSiteUrl(value = '') {
  const trimmed = value.trim().replace(/\/$/, '');
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = normalizeSiteUrl(
    env.SITE_URL ||
      env.VERCEL_PROJECT_PRODUCTION_URL ||
      env.VERCEL_URL
  );

  return {
    plugins: [
      {
        name: 'geosang-tour-seo',
        transformIndexHtml(html) {
          return html.replaceAll('__SITE_URL__', siteUrl);
        },
        async closeBundle() {
          const outputDirectory = resolve(process.cwd(), 'dist');
          await mkdir(outputDirectory, { recursive: true });

          const robots = siteUrl
            ? `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`
            : 'User-agent: *\nAllow: /\n';
          const sitemap = siteUrl
            ? `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`
            : `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n`;

          await Promise.all([
            writeFile(resolve(outputDirectory, 'robots.txt'), robots, 'utf8'),
            writeFile(resolve(outputDirectory, 'sitemap.xml'), sitemap, 'utf8')
          ]);
        }
      }
    ]
  };
});
