'use client';

interface NumberedItem {
  id: number;
  title: string;
  description: string;
}

interface NumberedListCardsProps {
  title?: string;
  items: NumberedItem[];
  accentColor?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const accentColors = {
  blue: {
    number: 'bg-blue-600 text-white',
    border: 'border-blue-200',
    title: 'text-blue-900'
  },
  green: {
    number: 'bg-green-600 text-white',
    border: 'border-green-200',
    title: 'text-green-900'
  },
  purple: {
    number: 'bg-purple-600 text-white',
    border: 'border-purple-200',
    title: 'text-purple-900'
  },
  orange: {
    number: 'bg-orange-600 text-white',
    border: 'border-orange-200',
    title: 'text-orange-900'
  },
  red: {
    number: 'bg-red-600 text-white',
    border: 'border-red-200',
    title: 'text-red-900'
  }
};

export function NumberedListCards({ 
  title, 
  items, 
  accentColor = 'blue' 
}: NumberedListCardsProps) {
  const colors = accentColors[accentColor];

  return (
    <div className="my-8">
      {title && (
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {title}
        </h3>
      )}
      
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`bg-white border ${colors.border} rounded-xl p-6 transition-all hover:border-gray-300`}
          >
            <div className="flex items-start gap-4">
              {/* Number Circle */}
              <div className={`flex-shrink-0 w-8 h-8 ${colors.number} rounded-full flex items-center justify-center text-sm font-bold`}>
                {item.id}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h4 className={`text-lg font-semibold mb-2 ${colors.title}`}>
                  {item.title}
                </h4>
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 