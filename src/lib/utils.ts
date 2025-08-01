import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueUsername(firstName: string, lastName: string): string {
  const cleanFirst = firstName
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .slice(0, 3);
  const cleanLast = lastName
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .slice(0, 3);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${cleanFirst}${cleanLast}${random}`;
}
// Example: "Joh" + "Doe" + 1234 → "johdoe1234"
