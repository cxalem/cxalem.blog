'use client';

interface ComparisonRow {
  feature: string;
  old: string;
  new: string;
}

interface ComparisonTable {
  title: string;
  oldTitle: string;
  newTitle: string;
  rows: ComparisonRow[];
}

interface KeyDifferencesSummaryProps {
  tables: ComparisonTable[];
}

export function KeyDifferencesSummary({ tables }: KeyDifferencesSummaryProps) {
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        ⚖️ Key Differences Summary
      </h3>
      
      <div className="space-y-8">
        {tables.map((table, tableIndex) => (
          <div key={tableIndex} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800">{table.title}</h4>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                      Feature
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider w-1/3">
                      {table.oldTitle}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-600 uppercase tracking-wider w-1/3">
                      {table.newTitle}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <div className="bg-red-50 border border-red-200 rounded-md p-3">
                          <code className="text-red-800 text-xs">{row.old}</code>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <div className="bg-green-50 border border-green-200 rounded-md p-3">
                          <code className="text-green-800 text-xs">{row.new}</code>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 