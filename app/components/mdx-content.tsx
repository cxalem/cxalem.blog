'use client';

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXComponents, resetHeadingCounter } from './mdx-components';
import { useEffect, useState } from 'react';

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const serializeMdx = async () => {
      try {
        resetHeadingCounter();
        const serialized = await serialize(source);
        setMdxSource(serialized);

        setTimeout(() => {
          setIsVisible(true);
        }, 50);
      } catch (error) {
        console.error('Error serializing MDX:', error);
      } finally {
        setIsLoading(false);
      }
    };

    serializeMdx();
  }, [source]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded-md w-3/4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-4/5"></div>
        </div>
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded-md w-2/3"></div>
        <div className="space-y-3">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!mdxSource) {
    return <div className="text-red-500">Error loading content</div>;
  }

  return (
    <div 
      className={`transition-opacity duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </div>
  );
} 