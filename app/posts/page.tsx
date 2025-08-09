import { getAllPosts } from "@/lib/mdx";
import { PostCard } from "@/app/components/post-card";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog Posts",
  description:
    "Thoughts on development, tools, and technology. Read about Solana, Web3, React, TypeScript, and more.",
  openGraph: {
    title: "Blog Posts | cxalem.blog",
    description:
      "Thoughts on development, tools, and technology. Read about Solana, Web3, React, TypeScript, and more.",
    url: "https://cxalem.blog/posts",
  },
  twitter: {
    title: "Blog Posts | cxalem.blog",
    description:
      "Thoughts on development, tools, and technology. Read about Solana, Web3, React, TypeScript, and more.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-8 ">
        <div className="mb-8 flex justify-center">
          <div className="relative h-[300px] w-[300px] sm:w-[400px]">
            <Image
              src="/posts-shape.webp"
              alt=""
              fill
              className="object-contain opacity-80"
              priority
            />
            <div className="absolute inset-0 rhombus-pattern opacity-30"></div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 mb-8">
            {posts.map((post) => (
              <PostCard key={post.metadata.slug} post={post.metadata} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
