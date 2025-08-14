import { useEffect, useState } from "react";
import { TOCItem } from "./use-table-of-contents";

export function useActiveSection(tocItems: TOCItem[]) {
  const [activeId, setActiveId] = useState<string>("");
  const [pendingActiveId, setPendingActiveId] = useState<string>("");


  useEffect(() => {
    if (!pendingActiveId) return;

    const timeoutId = setTimeout(() => {
      if (pendingActiveId === activeId) return;
      
      setActiveId(pendingActiveId);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [pendingActiveId, activeId]);

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
          

          const newActiveId = closestEntry.target.id;
          if (newActiveId && newActiveId !== pendingActiveId) {

            setPendingActiveId(newActiveId);
          }
        }
      },
      {
        rootMargin: "-15% 0% -60% 0%",
        threshold: [0.1, 0.3, 0.7]
      }
    );


    setTimeout(() => {
      const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

      headingElements.forEach((el) => {
        if (el.id) {
          observer.observe(el);
        }
      });
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, [tocItems, pendingActiveId]);

  const setActiveSection = (id: string) => {
    setActiveId(id);
    setPendingActiveId(id);
  };

  return {
    activeId,
    setActiveSection
  };
}
