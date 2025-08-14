import { DetailedHTMLProps, HTMLAttributes } from "react";

export const Paragraph = ({
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) => (
  <p className="text-neutral-700/80 dark:text-neutral-300/80 mb-4 leading-relaxed" {...props}>
    {children}
  </p>
);

export const Blockquote = ({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>) => (
  <blockquote
    className="border-l-4 border-orange-500 pl-4 py-2 mb-4 bg-orange-50 dark:bg-orange-900/20 italic text-neutral-700 dark:text-neutral-300"
    {...props}
  >
    {children}
  </blockquote>
);

export const UnorderedList = ({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
  <ul
    className="list-disc list-inside mb-4 space-y-2 text-neutral-700 dark:text-neutral-300"
    {...props}
  >
    {children}
  </ul>
);

export const OrderedList = ({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLOListElement>, HTMLOListElement>) => (
  <ol
    className="list-decimal list-inside mb-4 space-y-2 text-neutral-700 dark:text-neutral-300"
    {...props}
  >
    {children}
  </ol>
);

export const ListItem = ({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>) => (
  <li className="mb-1" {...props}>
    {children}
  </li>
);

export const Link = ({
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => (
  <a className="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 underline transition-colors" {...props}>
    {children}
  </a>
);

export const Strong = ({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
  <strong className="font-semibold text-neutral-900/80 dark:text-white/80" {...props}>
    {children}
  </strong>
);

export const Emphasis = ({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
  <em className="italic" {...props}>
    {children}
  </em>
);

export const HorizontalRule = ({
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>) => (
  <hr className="my-8 border-neutral-300 dark:border-neutral-600" {...props} />
);
