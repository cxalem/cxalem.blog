'use client';

import { useState } from 'react';

interface ChecklistItem {
  id: string;
  text: string;
  completed?: boolean;
}

interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

interface MigrationChecklistProps {
  sections: ChecklistSection[];
}

export function MigrationChecklist({ sections }: MigrationChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(itemId)) {
      newCheckedItems.delete(itemId);
    } else {
      newCheckedItems.add(itemId);
    }
    setCheckedItems(newCheckedItems);
  };

  const getTotalItems = () => sections.reduce((acc, section) => acc + section.items.length, 0);
  const getCompletedItems = () => checkedItems.size;
  const getProgressPercentage = () => Math.round((getCompletedItems() / getTotalItems()) * 100);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 my-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">🚀 Migration Checklist</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-700">
            {getCompletedItems()}/{getTotalItems()} completed ({getProgressPercentage()}%)
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              {section.title}
            </h4>
            <div className="space-y-2">
              {section.items.map((item) => (
                <label
                  key={item.id}
                  className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checkedItems.has(item.id)}
                    onChange={() => toggleItem(item.id)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span
                    className={`text-sm ${
                      checkedItems.has(item.id)
                        ? 'line-through text-gray-500'
                        : 'text-gray-700'
                    }`}
                  >
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 