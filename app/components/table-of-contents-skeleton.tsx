export function TableOfContentsSkeleton() {
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
            <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3 ml-8"></div>
            <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-4/5"></div>
            <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-3/5 ml-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
