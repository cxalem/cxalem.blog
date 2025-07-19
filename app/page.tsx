import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { PostCard } from "@/app/components/post-card";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 max-w-4xl mx-auto">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">👋 Hey, I&apos;m Alejandro!</h1>
          <p className="text-neutral-900/80">
            I&apos;m a Full Stack Developer currently working on personal
            projects and developer tooling! I&apos;m currently building Lucas
            Wallet, an embedded wallet that help people in Venezuela send and
            receive transactions using USDC on Solana. 📍 Based in Madrid,
            Spain.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Learn. Create. Share.</h2>
            {posts.length > 0 && (
              <Link
                href="/posts"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                View all posts →
              </Link>
            )}
          </div>
          <div className="mt-4">
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
      </main>
    </div>
  );
}
