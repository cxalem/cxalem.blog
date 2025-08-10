"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  source: string;
}

export function TableOfContents({ source }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Extract headings from markdown source
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const items: TOCItem[] = [];
    let match;
    let headingIndex = 0;

    while ((match = headingRegex.exec(source)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const baseId = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      // Create unique ID by combining base ID with index position
      const id = `${baseId}-${headingIndex}`;
      headingIndex++;

      items.push({ id, text, level });
    }

    setTocItems(items);
    
    // Add a slight delay for the fade-in effect
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, [source]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const closestEntry = visibleEntries.reduce((closest, entry) => {
            const closestDistance = Math.abs(closest.boundingClientRect.top);
            const entryDistance = Math.abs(entry.boundingClientRect.top);
            return entryDistance < closestDistance ? entry : closest;
          });
          setActiveId(closestEntry.target.id);
        }
      },
      {
        rootMargin: "-20% 0% -80% 0%",
        threshold: 0,
      }
    );

    const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, [tocItems]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (tocItems.length === 0 && isVisible) {
    return null;
  }

  // Show loading skeleton while content is being processed
  if (tocItems.length === 0 && !isVisible) {
    return (
      <div className="sticky top-8">
        <div className="bg-neutral-50/90 dark:bg-neutral-800/90 backdrop-blur-sm border border-neutral-200/60 dark:border-neutral-700/60 rounded-xl shadow-sm max-h-[calc(100vh-8rem)] flex flex-col">
          <div className="p-4 lg:p-6 pb-2 lg:pb-3 flex-shrink-0">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-32 animate-pulse"></div>
          </div>
          <div className="flex-1 px-4 lg:px-6 pb-4 lg:pb-6">
            <div className="space-y-2 animate-pulse">
              <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
              <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-4/5 ml-4"></div>
              <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-3/5 ml-8"></div>
              <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"></div>
              <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 ml-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`sticky top-8 transition-opacity duration-700 ease-in-out ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="bg-neutral-50/90 dark:bg-neutral-800/90 backdrop-blur-sm border border-neutral-200/60 dark:border-neutral-700/60 rounded-xl shadow-sm max-h-[calc(100vh-8rem)] flex flex-col">
        <div className="p-4 lg:p-6 pb-2 lg:pb-3 flex-shrink-0">
          <h3
            className="text-xs lg:text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wide"
            style={{ fontFamily: "var(--font-caryotype)" }}
          >
            Table of Contents
          </h3>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 lg:px-6 pb-4 lg:pb-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600">
          <ul className="space-y-1 lg:space-y-2">
            {tocItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className={`
                    block w-full text-left text-xs cursor-pointer lg:text-sm transition-all duration-200 hover:text-orange-600 dark:hover:text-orange-400 rounded-md px-2 py-1 -mx-2 truncate
                    ${
                      activeId === item.id
                        ? "text-orange-600 dark:text-orange-400 font-medium bg-orange-50/50 dark:bg-orange-900/20"
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-700/30"
                    }
                  `}
                  style={{
                    paddingLeft: `${(item.level - 1) * 8 + 8}px`,
                  }}
                  title={item.text}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
