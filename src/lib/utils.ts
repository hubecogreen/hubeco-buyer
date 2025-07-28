import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizePath(path: string): string {
  if (!path) return path;

  // Remove any leading/trailing whitespace
  path = path.trim();

  // Handle null or undefined values
  if (!path || path === 'null' || path === 'undefined') {
    return '/images/product-placeholder.webp';
  }

  // Normalize double slashes for 'admin' and 'staff'
  if (path?.includes('//admin')) {
    path = path.replace('//admin', '/admin');
  }
  if (path?.includes('//staff')) {
    path = path.replace('//staff', '/staff');
  }

  // Remove any double slashes (except for http/https)
  path = path.replace(/([^:])\/+/g, '$1/');

  // Ensure the path doesn't start with a slash if it's a relative path
  if (path.startsWith('/') && !path.startsWith('//')) {
    path = path.substring(1);
  }

  // Encode special characters in the filename part only
  const lastSlashIndex = path.lastIndexOf('/');
  if (lastSlashIndex !== -1) {
    const basePath = path.substring(0, lastSlashIndex + 1);
    const filename = path.substring(lastSlashIndex + 1);
    const encodedFilename = encodeURIComponent(filename);
    path = basePath + encodedFilename;
  }

  return path;
}

export function getSafeImageUrl(imagePath: string, assetURL: string): { src: string; unoptimized?: boolean } {
  if (!imagePath || imagePath === 'null' || imagePath === 'undefined') {
    return { src: '/images/product-placeholder.webp' };
  }

  try {
    const normalizedPath = normalizePath(imagePath);
    const fullUrl = `${assetURL}/${normalizedPath}`;
    
    // Check if URL is too long or contains problematic characters
    if (fullUrl.length > 2048 || /[<>"{}|\\^`\[\]]/.test(normalizedPath)) {
      return { src: fullUrl, unoptimized: true };
    }
    
    return { src: fullUrl };
  } catch (error) {
    console.warn('Error processing image URL:', error);
    return { src: '/images/product-placeholder.webp' };
  }
}

export function disableConsoleInProduction() {
  if (typeof window !== 'undefined') {
    const isLocalhost =
      window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

      console.log(isLocalhost, "isLocalhost")

    if (!isLocalhost) {
      console.log = () => {};
      console.debug = () => {};
      console.info = () => {};
      console.warn = () => {};
      console.error = () => {};
    }
  }
}
