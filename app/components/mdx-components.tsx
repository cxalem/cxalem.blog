"use client";

import React from "react";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { CodeBlock } from "./code-block";
import { PackageManagerTabs } from "./package-manager-tabs";
import { MigrationChecklist } from "./migration-checklist";
import { KeyDifferencesSummary } from "./key-differences-summary";
import { NotesAndCaveats } from "./notes-and-caveats";
import { NumberedListCards } from "./numbered-list-cards";

export const MDXComponents = {
  h1: ({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >) => (
    <h1
      className="text-4xl font-bold text-neutral-900 dark:text-white mb-6 border-b border-neutral-300 dark:border-neutral-600 pb-4 uppercase tracking-wide"
      style={{ fontFamily: "var(--font-caryotype)" }}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >) => (
    <h2 
      className="text-3xl font-bold text-neutral-900 dark:text-white mb-4 mt-8 uppercase tracking-wide" 
      style={{ fontFamily: "var(--font-caryotype)" }}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >) => (
    <h3 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6" {...props}>
      {children}
    </h3>
  ),
  h4: ({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >) => (
    <h4 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2 mt-4" {...props}>
      {children}
    </h4>
  ),
  p: ({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >) => (
    <p className="text-neutral-700/80 dark:text-neutral-300/80 mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  pre: ({
    children,
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
    return (
      <pre
        className="text-neutral-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm font-mono"
        {...props}
      >
        {children}
      </pre>
    );
  },
  code: ({
    children,
    className,
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
    const isInline = !className;

    if (isInline) {
      return (
        <code
          className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }

    // This is a code block with a language class
    if (className && typeof children === "string") {
      const language = className.replace(/language-/, "");
      
      // Check if it's a bash/shell command with package manager commands
      if ((language === "bash" || language === "shell") && children.trim()) {
        const lines = children.trim().split('\n');
        const packageManagerCommands = lines.filter(line => 
          /^(npm|yarn|pnpm|bun)\s+(install|add|uninstall|remove|rm|i)\s+/.test(line.trim())
        );

        // If we found package manager commands, use the tabs component
        if (packageManagerCommands.length > 0) {
          const installCommands = packageManagerCommands.filter(cmd => 
            /^(npm|yarn|pnpm|bun)\s+(install|add|i)\s+/.test(cmd.trim())
          );
          const uninstallCommands = packageManagerCommands.filter(cmd => 
            /^(npm|yarn|pnpm|bun)\s+(uninstall|remove|rm)\s+/.test(cmd.trim())
          );

          if (installCommands.length > 0) {
            return (
              <PackageManagerTabs
                installCommand={installCommands[0].trim()}
                uninstallCommand={uninstallCommands[0]?.trim()}
              />
            );
          }
        }
      }

      // Use regular CodeBlock for everything else
      return <CodeBlock className={className}>{children}</CodeBlock>;
    }

    // Fallback for other code elements
    return (
      <code className={`font-mono text-sm ${className || ""}`} {...props}>
        {children}
      </code>
    );
  },
  blockquote: ({
    children,
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-orange-500 pl-4 py-2 mb-4 bg-orange-50 dark:bg-orange-900/20 italic text-neutral-700 dark:text-neutral-300"
      {...props}
    >
      {children}
    </blockquote>
  ),
  ul: ({
    children,
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
    <ul
      className="list-disc list-inside mb-4 space-y-2 text-neutral-700 dark:text-neutral-300"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({
    children,
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLOListElement>, HTMLOListElement>) => (
    <ol
      className="list-decimal list-inside mb-4 space-y-2 text-neutral-700 dark:text-neutral-300"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({
    children,
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>) => (
    <li className="mb-1" {...props}>
      {children}
    </li>
  ),
  a: ({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >) => (
    <a className="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 underline transition-colors" {...props}>
      {children}
    </a>
  ),
  strong: ({
    children,
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
    <strong className="font-semibold text-neutral-900/80 dark:text-white/80" {...props}>
      {children}
    </strong>
  ),
  em: ({
    children,
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  table: ({
    children,
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLTableElement>, HTMLTableElement>) => (
    <div className="overflow-x-auto mb-4">
      <table
        className="min-w-full border border-neutral-300 dark:border-neutral-600 divide-y divide-neutral-300 dark:divide-neutral-600"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >) => (
    <thead className="bg-neutral-50 dark:bg-neutral-800" {...props}>
      {children}
    </thead>
  ),
  tbody: ({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >) => (
    <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-300 dark:divide-neutral-600" {...props}>
      {children}
    </tbody>
  ),
  tr: ({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  >) => <tr {...props}>{children}</tr>,
  th: ({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({
    children,
    ...props
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >) => (
    <td
      className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900"
      {...props}
    >
      {children}
    </td>
  ),
  hr: ({
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>) => (
    <hr className="my-8 border-neutral-300 dark:border-neutral-600" {...props} />
  ),
  
  // Custom migration guide components
  MigrationChecklist,
  KeyDifferencesSummary,
  NotesAndCaveats,
  NumberedListCards,
};
