'use client';

import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from './mdx-components';

interface MDXWrapperProps {
  children: React.ReactNode;
}

export function MDXWrapper({ children }: MDXWrapperProps) {
  return (
    <MDXProvider components={MDXComponents}>
      <div className="prose prose-lg max-w-none">
        {children}
      </div>
    </MDXProvider>
  );
} 