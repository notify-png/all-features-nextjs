import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Resolve a Next.js StaticImageData or plain string to an src string */
export function imgSrc(img: { src: string } | string): string {
  if (typeof img === "string") return img;
  return img.src;
}
