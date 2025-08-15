import { Metadata } from "next";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cxalem.blog';

export async function generateMetadata(): Promise<Metadata> {
  const title = "About Alejandro Mena - Full Stack Developer & DevRel Engineer";
  const description = "Builder and educator focused on helping developers ship faster with great tooling, clear docs, and production‑grade examples. Currently open to new opportunities.";
  
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&v=${Date.now()}`;
  
  return {
    title: "About",
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/about`,
      siteName: "cxalem.blog",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@cxalem",
      site: "@cxalem",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    other: {
      "twitter:image": ogImageUrl,
      "twitter:image:width": "1200",
      "twitter:image:height": "630",
      "twitter:image:alt": title,
    },
  };
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <header className="mb-10">
          <h1
            className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-white uppercase tracking-wide mb-3"
            style={{ fontFamily: "var(--font-caryotype)" }}
          >
            About
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
            I&apos;m a builder and educator focused on helping developers ship
            faster with great tooling, clear docs, and production‑grade
            examples. I split my time between Solana and EVM ecosystems, and I
            love turning complex ideas into simple, practical guides.
          </p>
        </header>

        <section className="mb-10">
          <div className="bg-neutral-50/90 dark:bg-neutral-800/90 backdrop-blur-sm border border-neutral-200/60 dark:border-neutral-700/60 rounded-xl shadow-sm p-6">
            <h2
              className="font-semibold text-neutral-900 dark:text-white uppercase tracking-wide mb-3"
              style={{ fontFamily: "var(--font-caryotype)" }}
            >
              Current Role
            </h2>
            <p className="text-neutral-700/80 dark:text-neutral-300/80 leading-relaxed">
              Most recently, I worked as a Developer Relations Engineer at
              ConsenSys, building example dApps, SDK integrations, and developer
              education. These days, I&apos;m continuing that mission
              independently, designing real‑world sample apps, writing
              deep‑dives, and creating tools that remove friction for teams
              building in web3.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-50 mt-4 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-sm font-medium border border-green-200/60 dark:border-green-700/60">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Open to new opportunities
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2
            className="font-semibold text-neutral-900 dark:text-white uppercase tracking-wide mb-4"
            style={{ fontFamily: "var(--font-caryotype)" }}
          >
            Experience
          </h2>
          <div className="space-y-5">
            <div className="rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 p-5 bg-white/70 dark:bg-neutral-900/60">
              <div className="flex items-start justify-between gap-4 mb-1">
                <div>
                  <h3 className="text-neutral-900 dark:text-white font-semibold">
                    Developer Relations Engineer · ConsenSys
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Feb 2023 — Jun 2025 · Remote
                  </p>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-1 text-neutral-700/90 dark:text-neutral-300/90 text-[15px]">
                <li>
                  Led UX and reference dApps demonstrating SDK best practices
                  and production patterns.
                </li>
                <li>
                  Shipped{" "}
                  <a
                    className="text-orange-600 dark:text-orange-400 hover:underline"
                    href="https://www.npmjs.com/package/@consensys/create-web3-app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @consensys/create-web3-app
                  </a>{" "}
                  to scaffold ready‑to‑deploy projects in seconds.
                </li>
                <li>
                  Produced docs, guides, and videos adopted by developer
                  communities and partner teams.
                </li>
                <li>
                  Drove code reviews and patterns like factory contracts to
                  improve scalability and DX.
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 p-5 bg-white/70 dark:bg-neutral-900/60">
              <div className="flex items-start justify-between gap-4 mb-1">
                <div>
                  <h3 className="text-neutral-900 dark:text-white font-semibold">
                    Educational Consultant · Chainlink Labs
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    May 2024 — Aug 2024 · Remote
                  </p>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-1 text-neutral-700/90 dark:text-neutral-300/90 text-[15px]">
                <li>
                  Designed blockchain and oracle curricula used for developer
                  certification.
                </li>
                <li>
                  Built exam content to assess smart contracts and Chainlink
                  fundamentals.
                </li>
                <li>
                  Created clear content on oracle network concepts for practical
                  learning.
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 p-5 bg-white/70 dark:bg-neutral-900/60">
              <div className="flex items-start justify-between gap-4 mb-1">
                <div>
                  <h3 className="text-neutral-900 dark:text-white font-semibold">
                    Front‑End Engineer · Globant
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Oct 2022 — Feb 2023 · Lima, Perú
                  </p>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-1 text-neutral-700/90 dark:text-neutral-300/90 text-[15px]">
                <li>
                  Delivered apps with React Native & Expo following robust UI/UX
                  practices.
                </li>
                <li>
                  Specialized in interface systems and design implementation
                  with Styled Components.
                </li>
                <li>
                  Implemented testing foundations with React Testing Library.
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 p-5 bg-white/70 dark:bg-neutral-900/60">
              <div className="flex items-start justify-between gap-4 mb-1">
                <div>
                  <h3 className="text-neutral-900 dark:text-white font-semibold">
                    Software Engineer (Freelance) · Serif
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Jun 2022 — Aug 2022 · Remote
                  </p>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-1 text-neutral-700/90 dark:text-neutral-300/90 text-[15px]">
                <li>
                  Automated data workflows across Airtable and Notion to
                  streamline operations.
                </li>
                <li>
                  Built landing pages and galleries to improve conversion and
                  brand presence.
                </li>
                <li>
                  Integrated 2FA with Mailchimp for stronger user security.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2
            className="font-semibold text-neutral-900 dark:text-white uppercase tracking-wide mb-4"
            style={{ fontFamily: "var(--font-caryotype)" }}
          >
            Content & Resources
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 p-5 bg-white/70 dark:bg-neutral-900/60">
              <h3 className="text-neutral-900 dark:text-white font-semibold mb-2">
                Writing
              </h3>
              <ul className="space-y-2 text-[15px]">
                <li>
                  <Link
                    href="/posts"
                    className="text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    Blog posts on cxalem.blog
                  </Link>
                </li>
                <li>
                  <a
                    href="https://metamask.io/news/how-to-build-gasless-dapps"
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    How to build gasless dApps (guide)
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.metamask.io/sdk/quickstart/javascript-dynamic/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    MetaMask SDK quickstart
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 p-5 bg-white/70 dark:bg-neutral-900/60">
              <h3 className="text-neutral-900 dark:text-white font-semibold mb-2">
                Code & Tools
              </h3>
              <ul className="space-y-2 text-[15px]">
                <li>
                  <a
                    href="https://www.npmjs.com/package/@consensys/create-web3-app"
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    @consensys/create-web3-app (CLI)
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Consensys/eventsea"
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    EventSea sample projects
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/solana-foundation/templates/tree/main/community/gill-jito-airdrop"
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    Gill Jito Airdrop template
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 p-5 bg-white/70 dark:bg-neutral-900/60">
              <h3 className="text-neutral-900 dark:text-white font-semibold mb-2">
                Talks & Video
              </h3>
              <ul className="space-y-2 text-[15px]">
                <li>
                  <a
                    href="https://www.youtube.com/watch?v=OkhV2Dl_7Z8&t=787s"
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    Developer walkthroughs on YouTube
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.hackquest.io/hackathons/MetaMask-Dev-Cook-Off-Feb-March"
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    MetaMask Dev Cook‑Off hackathon
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2
            className="font-semibold text-neutral-900 dark:text-white uppercase tracking-wide mb-4"
            style={{ fontFamily: "var(--font-caryotype)" }}
          >
            Connect
          </h2>
          <div className="flex gap-4">
            <a
              href="https://x.com/_cxalem"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/in/alejandro-jose-mena/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
