// lib/utils.ts
// Pequeña utilidad para concatenar clases Tailwind
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
