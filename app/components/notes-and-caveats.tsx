'use client';

interface Note {
  id: number;
  title: string;
  content: string;
  type?: 'info' | 'warning' | 'tip' | 'important';
}

interface NotesAndCaveatsProps {
  notes: Note[];
}

const noteStyles = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: '💡',
    titleColor: 'text-blue-900',
    textColor: 'text-blue-800'
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    icon: '⚠️',
    titleColor: 'text-yellow-900',
    textColor: 'text-yellow-800'
  },
  tip: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: '💡',
    titleColor: 'text-green-900',
    textColor: 'text-green-800'
  },
  important: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: '❗',
    titleColor: 'text-red-900',
    textColor: 'text-red-800'
  }
};

export function NotesAndCaveats({ notes }: NotesAndCaveatsProps) {
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        📝 Notes and Caveats
      </h3>
      
      <div className="space-y-4">
        {notes.map((note) => {
          const style = noteStyles[note.type || 'info'];
          
          return (
            <div
              key={note.id}
              className={`${style.bg} ${style.border} border rounded-lg p-5 transition-all hover:shadow-md`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{style.icon}</span>
                <div className="flex-1">
                  <h4 className={`text-lg font-semibold mb-2 ${style.titleColor}`}>
                    {note.id}. {note.title}
                  </h4>
                  <div 
                    className={`text-sm leading-relaxed ${style.textColor}`}
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            💡 <strong>Pro tip:</strong> Keep this checklist handy during your migration to ensure you don&apos;t miss any important steps!
          </p>
        </div>
    </div>
  );
} 