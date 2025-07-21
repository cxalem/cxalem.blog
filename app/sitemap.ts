import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cxalem.blog';
  
  // Get all posts
  const posts = getAllPosts();
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];
  
  // Dynamic blog post pages
  const postPages = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.metadata.slug}`,
    lastModified: post.metadata.date ? new Date(post.metadata.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  return [...staticPages, ...postPages];
} 