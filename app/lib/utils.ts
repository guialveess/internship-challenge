import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTimeDifference(dateString: string) {
  const givenDate = new Date(dateString);
  const currentDate = new Date();
  let yearsDiff = currentDate.getFullYear() - givenDate.getFullYear();
  let monthsDiff = currentDate.getMonth() - givenDate.getMonth();
  if (monthsDiff < 0) {
    yearsDiff--;
    monthsDiff += 12;
  }
  const result: string[] = [];
  if (yearsDiff > 0) {
    result.push(`${yearsDiff} yr`);
  }
  if (monthsDiff > 0) {
    result.push(`${monthsDiff} m`);
  }
  return result.length > 0 ? result.join(', ') : '0 m';
}
