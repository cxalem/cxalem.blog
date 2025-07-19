import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "cxalem.blog - Full Stack Developer",
    template: "%s | cxalem.dev",
  },
  description: "Hey, I'm Alejandro! Full Stack Developer working on personal projects and developer tooling. Currently building Lucas Wallet, an embedded wallet for Venezuela. Based in Madrid, Spain.",
  keywords: ["Full Stack Developer", "Solana", "React", "TypeScript", "Web3", "Madrid", "Spain"],
  authors: [{ name: "Alejandro", url: "https://cxalem.dev" }],
  creator: "Alejandro",
  publisher: "cxalem.dev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cxalem.dev",
    siteName: "cxalem.dev",
    title: "cxalem.dev - Full Stack Developer",
    description: "Hey, I'm Alejandro! Full Stack Developer working on personal projects and developer tooling. Currently building Lucas Wallet, an embedded wallet for Venezuela. Based in Madrid, Spain.",
  },
  twitter: {
    card: "summary_large_image",
    title: "cxalem.dev - Full Stack Developer",
    description: "Hey, I'm Alejandro! Full Stack Developer working on personal projects and developer tooling. Currently building Lucas Wallet, an embedded wallet for Venezuela. Based in Madrid, Spain.",
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
        {children}
      </body>
    </html>
  );
}
