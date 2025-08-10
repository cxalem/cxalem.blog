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
    // Extract headings from markdown source, avoiding code blocks
    const lines = source.split('\n');
    const items: TOCItem[] = [];
    let inCodeBlock = false;

    for (const line of lines) {
      // Track code block boundaries
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      
      // Skip lines inside code blocks
      if (inCodeBlock) {
        continue;
      }
      
      // Check for heading pattern
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        
        // Skip empty headings or headings with only special characters
        if (!text || /^[^a-zA-Z0-9]+$/.test(text)) {
          continue;
        }
        
        const baseId = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");

        // Skip if ID would be empty
        if (!baseId) {
          continue;
        }

        items.push({ id: baseId, text, level });
      }
    }

    setTocItems(items);
    
    // Filter TOC items to only include headings that actually exist in the DOM
    setTimeout(() => {
      const filteredItems = items.filter(item => {
        const element = document.getElementById(item.id);
        return element !== null;
      });
      
      if (filteredItems.length !== items.length) {
        console.log('Filtered out non-existent headings:', 
          items.filter(item => !document.getElementById(item.id)).map(item => item.text)
        );
        setTocItems(filteredItems);
      }
      
      setIsVisible(true);
    }, 200); // Increased delay to ensure MDX content is fully rendered
  }, [source]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        console.log('Visible entries:', visibleEntries.map(e => ({ id: e.target.id, top: e.boundingClientRect.top })));
        
        if (visibleEntries.length > 0) {
          const closestEntry = visibleEntries.reduce((closest, entry) => {
            const closestDistance = Math.abs(closest.boundingClientRect.top);
            const entryDistance = Math.abs(entry.boundingClientRect.top);
            return entryDistance < closestDistance ? entry : closest;
          });
          console.log('Setting active ID to:', closestEntry.target.id);
          setActiveId(closestEntry.target.id);
        }
      },
      {
        rootMargin: "-10% 0% -70% 0%",
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    // Add a small delay to ensure headings are rendered
    setTimeout(() => {
      const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      console.log('Observing headings:', Array.from(headingElements).map(el => el.id).filter(Boolean));
      headingElements.forEach((el) => {
        if (el.id) { // Only observe headings with IDs
          observer.observe(el);
        }
      });
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, [tocItems]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Immediately set active state
      setActiveId(id);
      console.log('Clicked item, setting active ID to:', id);
      
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
                  data-active={activeId === item.id ? 'true' : 'false'}
                  data-item-id={item.id}
                  data-current-active={activeId}
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
