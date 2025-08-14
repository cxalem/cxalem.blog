import { useEffect, useState, useRef } from "react";
import { TOCItem } from "./use-table-of-contents";

export function useCollapsibleSections(
  tocItems: TOCItem[], 
  activeId: string,
  organizeItems: (items: TOCItem[]) => Array<TOCItem & { children?: TOCItem[] }>
) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [manuallyExpandedSections, setManuallyExpandedSections] = useState<Set<string>>(new Set());
  const isManualInteraction = useRef(false);


  useEffect(() => {
    if (!activeId || tocItems.length === 0 || isManualInteraction.current) {

      isManualInteraction.current = false;
      return;
    }

    const organized = organizeItems(tocItems);
    const parentSection = organized.find(section => 
      section.id === activeId || 
      section.children?.some(child => child.id === activeId)
    );
    
    if (parentSection && parentSection.children && parentSection.children.length > 0) {

      setExpandedSections(prev => {
        const newExpanded = new Set([...manuallyExpandedSections, parentSection.id]);
        const currentExpanded = Array.from(prev).sort().join(',');
        const newExpandedStr = Array.from(newExpanded).sort().join(',');
        return currentExpanded !== newExpandedStr ? newExpanded : prev;
      });
    } else if (parentSection) {

      setExpandedSections(manuallyExpandedSections);
    }
  }, [activeId, tocItems, organizeItems, manuallyExpandedSections]);

  const toggleSection = (sectionId: string) => {
    isManualInteraction.current = true;
    
    setExpandedSections(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(sectionId)) {
        newExpanded.delete(sectionId);
      } else {
        newExpanded.add(sectionId);
      }
      return newExpanded;
    });


    setManuallyExpandedSections(prev => {
      const newManual = new Set(prev);
      if (newManual.has(sectionId)) {
        newManual.delete(sectionId);
      } else {
        newManual.add(sectionId);
      }
      return newManual;
    });
  };

  const expandSection = (sectionId: string) => {
    isManualInteraction.current = true;
    setExpandedSections(prev => new Set([...prev, sectionId]));
    setManuallyExpandedSections(prev => new Set([...prev, sectionId]));
  };

  const collapseAllSections = () => {
    isManualInteraction.current = true;
    setExpandedSections(new Set());
    setManuallyExpandedSections(new Set());
  };

  const expandOnlySection = (sectionId: string) => {
    isManualInteraction.current = true;
    setExpandedSections(new Set([sectionId]));
    setManuallyExpandedSections(new Set([sectionId]));
  };

  return {
    expandedSections,
    toggleSection,
    expandSection,
    collapseAllSections,
    expandOnlySection
  };
}
