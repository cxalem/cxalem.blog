import Image from "next/image";
import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cxalem.blog';

export async function generateMetadata(): Promise<Metadata> {
  const title = "Alejandro Mena - Full Stack Developer & DevRel Engineer";
  const description = "I'm a Software Engineer who has been working as a Developer Relations Engineer. Based in Spain, from Venezuela. Discover my thoughts and learning processes!";
  
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&v=${Date.now()}`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: baseUrl,
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

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden -mt-16 sm:-mt-20">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative md:mt-24 w-[400px] h-[600px] sm:w-[500px] sm:h-[700px] lg:w-[600px] lg:h-[800px]">
          <Image
            src="/bg-shape.webp"
            alt=""
            fill
            className="object-contain opacity-80"
            priority
          />
          <div className="absolute inset-0 rhombus-pattern opacity-30"></div>
        </div>
      </div>

      <div className="relative z-10 font-sans flex flex-col justify-end h-screen max-w-4xl mx-auto px-8 sm:px-20 pb-8 text-center gap-3">
        <h1 className="text-3xl font-extrabold">Alejandro Mena</h1>
        <p className="opacity-60">
          I&apos;m a Software Engineer who has been working as a Developer
          Relations Engineer. I&apos;m based in Spain, but I&apos;m from
          Venezuela. In this blog you&apos;ll discover my thoughts and learning
          processes!
        </p>
      </div>
    </div>
  );
}
