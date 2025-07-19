import Link from 'next/link';
import { PostMetadata } from '../../lib/mdx';

interface PostCardProps {
  post: PostMetadata;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link 
      href={`/posts/${post.slug}`}
      className="block p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200"
    >
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
          {post.title || post.slug}
        </h3>
        
        {post.description && (
          <p className="text-gray-600 line-clamp-2">
            {post.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          {post.date && (
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
} 