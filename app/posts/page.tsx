import { getAllPosts } from "@/lib/mdx";
import { PostCard } from "@/app/components/post-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Posts",
  description: "Thoughts on development, tools, and technology. Read about Solana, Web3, React, TypeScript, and more.",
  openGraph: {
    title: "Blog Posts | cxalem.blog",
    description: "Thoughts on development, tools, and technology. Read about Solana, Web3, React, TypeScript, and more.",
    url: "https://cxalem.blog/posts",
  },
  twitter: {
    title: "Blog Posts | cxalem.blog",
    description: "Thoughts on development, tools, and technology. Read about Solana, Web3, React, TypeScript, and more.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Posts</h1>
          <p className="text-gray-600 text-lg">
            Thoughts on development, tools, and technology.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <PostCard key={post.metadata.slug} post={post.metadata} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
