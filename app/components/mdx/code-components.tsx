import { DetailedHTMLProps, HTMLAttributes } from "react";
import { CodeBlock } from "../code-block";
import { PackageManagerTabs } from "../package-manager-tabs";
import { MermaidDiagram } from "../mermaid-diagram";

export const Pre = ({
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
};

export const Code = ({
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

  if (className && typeof children === "string") {
    const language = className.replace(/language-/, "");
    
    // Handle Mermaid diagrams
    if (language === "mermaid") {
      return <MermaidDiagram chart={children.trim()} />;
    }

    // Handle package manager commands
    if ((language === "bash" || language === "shell") && children.trim()) {
      const lines = children.trim().split('\n');
      const packageManagerCommands = lines.filter(line => 
        /^(npm|yarn|pnpm|bun)\s+(install|add|uninstall|remove|rm|i)\s+/.test(line.trim())
      );

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

    return <CodeBlock className={className}>{children}</CodeBlock>;
  }

  return (
    <code className={`font-mono text-sm ${className || ""}`} {...props}>
      {children}
    </code>
  );
};
