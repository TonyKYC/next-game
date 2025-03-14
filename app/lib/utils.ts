import { twMerge } from "tailwind-merge";

/**
 * Merges multiple Tailwind CSS classes
 */
export const cn = (...classes: string[]) => {
  return twMerge(classes);
};

/**
 * Calculates the distance between two points
 */
export const calculateDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

/**
 * Calculates the distance from origin (0,0)
 */
export const distanceFromOrigin = (x: number, y: number) => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

/**
 * Checks if a point is within range of the origin (0,0)
 */
export const isInRange = (x: number, y: number, range: number) => {
  return distanceFromOrigin(x, y) <= range;
};
