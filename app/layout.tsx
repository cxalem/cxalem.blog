import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "./components/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cxalem.blog';

export const metadata: Metadata = {
  title: {
    default: "cxalem.blog - Full Stack Developer",
    template: "%s | cxalem.blog",
  },
  description:
    "Hey, I'm Alejandro! Full Stack Developer working on personal projects and developer tooling. Currently building Lucas Wallet, an embedded wallet for Venezuela. Based in Madrid, Spain.",
  keywords: [
    "Full Stack Developer",
    "Solana",
    "React",
    "TypeScript",
    "Web3",
    "Madrid",
    "Spain",
  ],
  authors: [{ name: "Alejandro", url: "https://cxalem.blog" }],
  creator: "Alejandro",
  publisher: "cxalem.blog",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cxalem.blog",
    siteName: "cxalem.blog",
    title: "cxalem.blog - Full Stack Developer",
    description:
      "Hey, I'm Alejandro! Full Stack Developer working on personal projects and developer tooling. Currently building Lucas Wallet, an embedded wallet for Venezuela. Based in Madrid, Spain.",
    images: [
      {
        url: `${baseUrl}/api/og?title=${encodeURIComponent("cxalem.blog - Full Stack Developer")}&description=${encodeURIComponent("Hey, I'm Alejandro! Full Stack Developer working on personal projects and developer tooling.")}&v=${Date.now()}`,
        width: 1200,
        height: 630,
        alt: "cxalem.blog - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "cxalem.blog - Full Stack Developer",
    description:
      "Hey, I'm Alejandro! Full Stack Developer working on personal projects and developer tooling. Currently building Lucas Wallet, an embedded wallet for Venezuela. Based in Madrid, Spain.",
    creator: "@_cxalem",
    site: "@_cxalem",
    images: [
      {
        url: `${baseUrl}/api/og?title=${encodeURIComponent("cxalem.blog - Full Stack Developer")}&description=${encodeURIComponent("Hey, I'm Alejandro! Full Stack Developer working on personal projects and developer tooling.")}&v=${Date.now()}`,
        width: 1200,
        height: 630,
        alt: "cxalem.blog - Full Stack Developer",
      },
    ],
  },
  other: {
    "twitter:card": "summary_large_image",
    "twitter:site": "@_cxalem",
    "twitter:creator": "@_cxalem",
    "twitter:title": "cxalem.blog - Full Stack Developer",
    "twitter:description": "Hey, I'm Alejandro! Full Stack Developer working on personal projects and developer tooling. Currently building Lucas Wallet, an embedded wallet for Venezuela. Based in Madrid, Spain.",
    "twitter:image": `${baseUrl}/api/og?title=${encodeURIComponent("cxalem.blog - Full Stack Developer")}&description=${encodeURIComponent("Hey, I'm Alejandro! Full Stack Developer working on personal projects and developer tooling.")}&v=${Date.now()}`,
    "twitter:image:width": "1200",
    "twitter:image:height": "630",
    "twitter:image:alt": "cxalem.blog - Full Stack Developer",
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
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <Navbar />
        <div className="pt-16 sm:pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
