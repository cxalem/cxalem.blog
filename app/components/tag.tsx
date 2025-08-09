interface TagProps {
  children: React.ReactNode;
}

export function Tag({ children }: TagProps) {
  return (
    <span 
      className="px-3 uppercase py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-xs font-medium tracking-widest"
      style={{ fontFamily: 'var(--font-fkraster)' }}
    >
      {children}
    </span>
  );
}
