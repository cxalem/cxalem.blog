import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Alejandro - Full Stack Developer, Web3 enthusiast, and creator of developer tools.",
  openGraph: {
    title: "About | cxalem.blog",
    description: "Learn more about Alejandro - Full Stack Developer, Web3 enthusiast, and creator of developer tools.",
    url: "https://cxalem.blog/about",
  },
  twitter: {
    title: "About | cxalem.blog",
    description: "Learn more about Alejandro - Full Stack Developer, Web3 enthusiast, and creator of developer tools.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="text-center py-20">
          <div className="mb-8">
            <div className="text-6xl mb-4">🚧</div>
            <h1 
              className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-white uppercase tracking-wide mb-6"
              style={{ fontFamily: "var(--font-caryotype)" }}
            >
              Under Development
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              This page is currently being crafted with care. Check back soon for more information about me, my projects, and my journey as a developer.
            </p>
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
}
