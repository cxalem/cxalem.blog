import Link from "next/link";
import { PostMetadata } from "../../lib/mdx";
import { Tag } from "./tag";
import FadeInSection from "./fade-in-section";

interface PostCardProps {
  post: PostMetadata;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <FadeInSection threshold={0.1}>
      <Link
        href={`/posts/${post.slug}`}
        className="block p-6 bg-white/50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-4xl hover:shadow-md transition-all duration-200"
      >
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            {post.date && (
              <time
                dateTime={post.date}
                className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0"
              >
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 sm:justify-end">
                {post.tags.slice(0, 3).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 self-center">
                    +{post.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>

          <h3
            className="text-xl font-bold text-gray-900 dark:text-white transition-colors uppercase tracking-wide"
            style={{ fontFamily: "var(--font-caryotype)" }}
          >
            {post.title || post.slug}
          </h3>

          {post.description && (
            <p className="text-gray-600 dark:text-gray-300/70 line-clamp-2 leading-relaxed">
              {post.description}
            </p>
          )}
        </div>
      </Link>
    </FadeInSection>
  );
}
