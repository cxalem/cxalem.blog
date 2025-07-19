'use client';

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXComponents } from './mdx-components';
import { useEffect, useState } from 'react';

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const serializeMdx = async () => {
      try {
        const serialized = await serialize(source);
        setMdxSource(serialized);
      } catch (error) {
        console.error('Error serializing MDX:', error);
      } finally {
        setIsLoading(false);
      }
    };

    serializeMdx();
  }, [source]);

  if (isLoading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (!mdxSource) {
    return <div className="text-red-500">Error loading content</div>;
  }

  return <MDXRemote {...mdxSource} components={MDXComponents} />;
} 