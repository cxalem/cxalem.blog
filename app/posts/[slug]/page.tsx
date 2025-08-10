import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs } from "@/lib/mdx";
import Link from "next/link";
import { MDXContent } from "@/app/components/mdx-content";
import { Metadata } from "next";
import { Tag } from "@/app/components/tag";
import Image from "next/image";
import { TableOfContents } from "@/app/components/table-of-contents";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  const { title, description, tags } = post.metadata;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cxalem.blog";

  // Create OG image URL with post data
  const ogImageUrl = new URL(`${baseUrl}/api/og`);
  if (title) ogImageUrl.searchParams.set("title", title);
  if (description) ogImageUrl.searchParams.set("description", description);
  if (tags && tags.length > 0)
    ogImageUrl.searchParams.set("tags", tags.join(","));

  return {
    title: title ? `${title} | cxalem.blog` : `${slug} | cxalem.blog`,
    description: description || `Read about ${title || slug} on cxalem.blog`,
    keywords: tags?.join(", "),
    authors: [{ name: "Alejandro", url: "https://cxalem.blog" }],
    creator: "Alejandro",
    publisher: "cxalem.blog",
    openGraph: {
      title: title || slug,
      description: description || `Read about ${title || slug} on cxalem.blog`,
      url: `${baseUrl}/posts/${slug}`,
      siteName: "cxalem.blog",
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title || slug,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: title || slug,
      description: description || `Read about ${title || slug} on cxalem.blog`,
      images: [ogImageUrl.toString()],
      creator: "@cxalem",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
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
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/posts"
            className="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-sm font-medium"
          >
            ← Back to posts
          </Link>
        </div>

        <div className="relative mb-12">
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              {post.metadata.date && (
                <time
                  dateTime={post.metadata.date}
                  className="text-sm text-neutral-500 dark:text-neutral-400 flex-shrink-0"
                >
                  {new Date(post.metadata.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}

              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  {post.metadata.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between relative">
              <div>
                {post.metadata.title && (
                  <h1
                    className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white uppercase tracking-wide mb-6"
                    style={{ fontFamily: "var(--font-caryotype)" }}
                  >
                    {post.metadata.title}
                  </h1>
                )}
                {post.metadata.description && (
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
                    {post.metadata.description}
                  </p>
                )}
              </div>
              <div className="opacity-80">
                <Image
                  src="/post-shape.webp"
                  alt=""
                  width={250}
                  height={250}
                  className="object-contain"
                  priority
                />
                <div className="absolute inset-0 rhombus-pattern opacity-30"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8 xl:gap-12">
          <aside className="w-64 xl:w-72 flex-shrink-0 hidden lg:block">
            <TableOfContents source={post.content} />
          </aside>
          
          <article className="prose prose-lg dark:prose-invert max-w-none flex-1 min-w-0">
            <MDXContent source={post.content} />
          </article>
        </div>

                  <footer className="mt-12 pt-8 border-t border-neutral-300 dark:border-neutral-600">
          <Link
            href="/posts"
            className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 transition-colors"
          >
            ← Back to posts
          </Link>
        </footer>
      </div>
    </div>
  );
}
