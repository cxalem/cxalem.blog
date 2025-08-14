import { DetailedHTMLProps, HTMLAttributes } from "react";
import { generateHeadingId } from "./utils";

export const H1 = ({
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  const text = typeof children === 'string' ? children : '';
  const id = generateHeadingId(text);
  
  return (
    <h1
      id={id}
      className="text-4xl font-bold text-neutral-900 dark:text-white mb-6 border-b border-neutral-300 dark:border-neutral-600 pb-4 uppercase tracking-wide"
      style={{ fontFamily: "var(--font-caryotype)" }}
      {...props}
    >
      {children}
    </h1>
  );
};

export const H2 = ({
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  const text = typeof children === 'string' ? children : '';
  const id = generateHeadingId(text);
  
  return (
    <h2 
      id={id}
      className="text-3xl font-bold text-neutral-900 dark:text-white mb-4 mt-8 uppercase tracking-wide" 
      style={{ fontFamily: "var(--font-caryotype)" }}
      {...props}
    >
      {children}
    </h2>
  );
};

export const H3 = ({
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  const text = typeof children === 'string' ? children : '';
  const id = generateHeadingId(text);
  
  return (
    <h3 
      id={id}
      className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 mt-6" 
      {...props}
    >
      {children}
    </h3>
  );
};

export const H4 = ({
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  const text = typeof children === 'string' ? children : '';
  const id = generateHeadingId(text);
  
  return (
    <h4 
      id={id}
      className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2 mt-4" 
      {...props}
    >
      {children}
    </h4>
  );
};
