let headingCounter = 0;

export function resetHeadingCounter(): void {
  headingCounter = 0;
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
