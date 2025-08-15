import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cxalem.blog';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/api/og*',  // Allow access to OG image generation API
        ],
        disallow: [
          '/api/*',     // Block other API routes
          '/temp/',
          '/_next/',
          '/.*\\.json$',
          '/.*\\.xml$',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
} 