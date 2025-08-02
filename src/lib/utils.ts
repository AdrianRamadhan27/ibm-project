import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateStr: string) =>
new Date(dateStr).toLocaleDateString("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const plainText = (markdown: string): string => {
  return markdown.replace(/[#>*_`\-\[\]\(\)!]/g, '').slice(0, 200)
}