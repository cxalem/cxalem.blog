import { useEffect, useState } from "react";

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function useTableOfContents(source: string) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {

    const lines = source.split('\n');
    const items: TOCItem[] = [];
    let inCodeBlock = false;

    for (const line of lines) {

      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      

      if (inCodeBlock) {
        continue;
      }
      

      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        

        if (!text || /^[^a-zA-Z0-9]+$/.test(text)) {
          continue;
        }
        
        const baseId = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");


        if (!baseId) {
          continue;
        }

        items.push({ id: baseId, text, level });
      }
    }

    setTocItems(items);
    

    setTimeout(() => {
      const filteredItems = items.filter(item => {
        const element = document.getElementById(item.id);
        return element !== null;
      });
      
      if (filteredItems.length !== items.length) {

        setTocItems(filteredItems);
      }
      
      setIsVisible(true);
    }, 200);
  }, [source]);


  const organizeItems = (items: TOCItem[]) => {
    const organized: Array<TOCItem & { children?: TOCItem[] }> = [];
    let currentParent: (TOCItem & { children?: TOCItem[] }) | null = null;

    for (const item of items) {
      if (item.level <= 2) {
        currentParent = { ...item, children: [] };
        organized.push(currentParent);
      } else if (currentParent) {
        currentParent.children = currentParent.children || [];
        currentParent.children.push(item);
      } else {
        organized.push({ ...item, children: [] });
      }
    }

    return organized;
  };

  return {
    tocItems,
    isVisible,
    organizeItems
  };
}
