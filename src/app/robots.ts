import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://manish-matrix-portfolio.vercel.app/sitemap.xml', // Apni live domain URL replace kar sakte ho
  };
}