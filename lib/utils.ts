import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertIconTitleToIcon = (title: string) => {
  return title
    .toLowerCase()
    .replace(/\./g, 'dot')
    .replace(/\+/g, 'plus')
    .replace(/\&/g, 'and')
    .replace(/\+/g, 'plus')

    .replace(/[^a-z0-9]/g, '');
};