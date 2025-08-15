export function resetHeadingCounter(): void {
  // No-op function maintained for compatibility
}

export function generateHeadingId(text: string): string {
  const baseId = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return baseId;
}
