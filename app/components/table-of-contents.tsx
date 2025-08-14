"use client";

import { TableOfContentsSkeleton } from "./table-of-contents-skeleton";
import { useTableOfContents } from "./hooks/use-table-of-contents";
import { useActiveSection } from "./hooks/use-active-section";
import { useCollapsibleSections } from "./hooks/use-collapsible-sections";

interface TableOfContentsProps {
  source: string;
}

export function TableOfContents({ source }: TableOfContentsProps) {
  const { tocItems, isVisible, organizeItems } = useTableOfContents(source);
  const { activeId, setActiveSection } = useActiveSection(tocItems);
  const { 
    expandedSections, 
    toggleSection, 
    expandOnlySection, 
    collapseAllSections 
  } = useCollapsibleSections(tocItems, activeId, organizeItems);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      const organized = organizeItems(tocItems);
      const parentSection = organized.find(section => 
        section.id === id || 
        section.children?.some(child => child.id === id)
      );
      
      if (parentSection && parentSection.children && parentSection.children.length > 0) {
        expandOnlySection(parentSection.id);
      } else if (parentSection) {
        collapseAllSections();
      }
      
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (tocItems.length === 0 && isVisible) {
    return null;
  }

  if (tocItems.length === 0 && !isVisible) {
    return <TableOfContentsSkeleton />;
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
          <ul className="space-y-1">
            {organizeItems(tocItems).map((section) => (
              <li key={section.id}>

                <div className="flex items-center">
                  {section.children && section.children.length > 0 && (
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex-shrink-0 cursor-pointer w-4 h-4 mr-1 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                    >
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${
                          expandedSections.has(section.id) ? 'rotate-90' : ''
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleClick(section.id);

                      if (section.children && section.children.length > 0) {
                        toggleSection(section.id);
                      }
                    }}
                    className={`
                      flex-1 text-left text-xs cursor-pointer lg:text-sm transition-all duration-200 hover:text-orange-600 dark:hover:text-orange-400 rounded-md px-2 py-1 truncate
                      ${
                        activeId === section.id
                          ? "text-orange-600 dark:text-orange-400 font-medium bg-orange-50/50 dark:bg-orange-900/20"
                          : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-700/30"
                      }
                    `}
                    style={{
                      paddingLeft: `${(section.level - 1) * 8 + 8}px`,
                    }}
                    title={section.text}
                  >
                    {section.text}
                  </button>
                </div>


                {section.children && section.children.length > 0 && expandedSections.has(section.id) && (
                  <ul className="mt-1 space-y-1">
                    {section.children.map((child) => (
                      <li key={child.id}>
                        <button
                          onClick={() => handleClick(child.id)}
                          className={`
                            block w-full text-left text-xs cursor-pointer lg:text-sm transition-all duration-200 hover:text-orange-600 dark:hover:text-orange-400 rounded-md px-2 py-1 -mx-2 truncate
                            ${
                              activeId === child.id
                                ? "text-orange-600 dark:text-orange-400 font-medium bg-orange-50/50 dark:bg-orange-900/20"
                                : "text-neutral-500 dark:text-neutral-500 hover:bg-neutral-100/50 dark:hover:bg-neutral-700/30"
                            }
                          `}
                          style={{
                            paddingLeft: `${(child.level - 1) * 8 + 16}px`,
                          }}
                          title={child.text}
                        >
                          {child.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
