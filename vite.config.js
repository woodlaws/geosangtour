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
    build: {
      rollupOptions: {
        input: {
          home: resolve(process.cwd(), 'index.html'),
          tours: resolve(process.cwd(), 'tours/index.html'),
          toursSeoul: resolve(process.cwd(), 'tours/seoul/index.html'),
          toursRegional: resolve(process.cwd(), 'tours/regional/index.html'),
          toursRegionalCity: resolve(process.cwd(), 'tours/regional/city/index.html'),
          toursKorea: resolve(process.cwd(), 'tours/korea/index.html'),
          toursGlobal: resolve(process.cwd(), 'tours/global/index.html'),
          toursGlobalTokyo: resolve(process.cwd(), 'tours/global/tokyo/index.html'),
          toursGlobalOsaka: resolve(process.cwd(), 'tours/global/osaka/index.html'),
          toursGlobalFukuoka: resolve(process.cwd(), 'tours/global/fukuoka/index.html'),
          toursGlobalShenzhen: resolve(process.cwd(), 'tours/global/shenzhen/index.html'),
          toursGlobalSingapore: resolve(process.cwd(), 'tours/global/singapore/index.html'),
          domestic: resolve(process.cwd(), 'domestic/index.html'),
          global: resolve(process.cwd(), 'global/index.html'),
          method: resolve(process.cwd(), 'method/index.html'),
          program: resolve(process.cwd(), 'program/index.html'),
          journal: resolve(process.cwd(), 'journal/index.html'),
          apply: resolve(process.cwd(), 'apply/index.html'),
          reservation: resolve(process.cwd(), 'reservation/index.html'),
          contact: resolve(process.cwd(), 'contact/index.html'),
          privacy: resolve(process.cwd(), 'privacy/index.html'),
          about: resolve(process.cwd(), 'about/index.html')
        }
      }
    },
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
          const routes = ['/'];
          const sitemap = siteUrl
            ? `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route, index) => `  <url>\n    <loc>${siteUrl}${route}</loc>\n    <changefreq>${index === 0 ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${index === 0 ? '1.0' : route === '/tours/seoul/' ? '0.9' : '0.7'}</priority>\n  </url>`).join('\n')}\n</urlset>\n`
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
