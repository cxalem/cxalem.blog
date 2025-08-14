"use client";

import {
  resetHeadingCounter,
  H1, H2, H3, H4,
  Paragraph, Blockquote, UnorderedList, OrderedList, ListItem, 
  Link, Strong, Emphasis, HorizontalRule,
  Table, TableHead, TableBody, TableRow, TableHeader, TableCell,
  Pre, Code
} from "./mdx";

// Import custom components
import { MigrationChecklist } from "./migration-checklist";
import { KeyDifferencesSummary } from "./key-differences-summary";
import { NotesAndCaveats } from "./notes-and-caveats";
import { NumberedListCards } from "./numbered-list-cards";

// Export the resetHeadingCounter function for use in other components
export { resetHeadingCounter };

// MDX Components mapping
export const MDXComponents = {
  // Headings
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  
  // Text elements
  p: Paragraph,
  blockquote: Blockquote,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  a: Link,
  strong: Strong,
  em: Emphasis,
  hr: HorizontalRule,
  
  // Code elements
  pre: Pre,
  code: Code,
  
  // Table elements
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
  
  // Custom components
  MigrationChecklist,
  KeyDifferencesSummary,
  NotesAndCaveats,
  NumberedListCards,
};
