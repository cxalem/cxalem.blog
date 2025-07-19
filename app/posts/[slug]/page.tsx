import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs } from "@/lib/mdx";
import Link from "next/link";
import { MDXContent } from "@/app/components/mdx-content";
import { Metadata } from "next";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    };
  }

  const { title, description, tags } = post.metadata;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  // Create OG image URL with post data
  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  if (title) ogImageUrl.searchParams.set('title', title);
  if (description) ogImageUrl.searchParams.set('description', description);
  if (tags && tags.length > 0) ogImageUrl.searchParams.set('tags', tags.join(','));

  return {
    title: title ? `${title} | cxalem.dev` : `${slug} | cxalem.dev`,
    description: description || `Read about ${title || slug} on cxalem.dev`,
    keywords: tags?.join(', '),
    authors: [{ name: 'Alejandro', url: 'https://cxalem.dev' }],
    creator: 'Alejandro',
    publisher: 'cxalem.dev',
    openGraph: {
      title: title || slug,
      description: description || `Read about ${title || slug} on cxalem.dev`,
      url: `${baseUrl}/posts/${slug}`,
      siteName: 'cxalem.dev',
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title || slug,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || slug,
      description: description || `Read about ${title || slug} on cxalem.dev`,
      images: [ogImageUrl.toString()],
      creator: '@cxalem',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to home
          </Link>
        </div>

        {/* Post Header */}
        <header className="mb-8">
          {post.metadata.title && (
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.metadata.title}
            </h1>
          )}

          <div className="flex items-center gap-4 text-gray-600 mb-6">
            {post.metadata.date && (
              <time dateTime={post.metadata.date}>
                {new Date(post.metadata.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}

            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div className="flex gap-2">
                {post.metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {post.metadata.description && (
            <p className="text-lg text-gray-600 leading-relaxed">
              {post.metadata.description}
            </p>
          )}
        </header>

        {/* Post Content */}
        <article className="prose prose-lg max-w-none">
          <MDXContent source={post.content} />
        </article>

        {/* Navigation Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            ← Back to home
          </Link>
        </footer>
      </div>
    </div>
  );
}
