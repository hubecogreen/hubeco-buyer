import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

 export function normalizePath(path: string): string {
  if (!path) return path;

  // Normalize double slashes for 'admin' and 'staff'
  if (path?.includes('//admin')) {
    path = path.replace('//admin', '/admin');
  }
  if (path?.includes('//staff')) {
    path = path.replace('//staff', '/staff');
  }

  return path;
}

export function encodeID(hexId: any) {
  return Buffer.from(hexId, 'hex').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeID(encoded: any) {
  // Restore any missing padding for base64
  encoded = encoded.replace(/-/g, '+').replace(/_/g, '/');
  while (encoded.length % 4) encoded += '=';
  return Buffer.from(encoded, 'base64').toString('hex');
}

export function disableConsoleInProduction() {
  if (typeof window !== 'undefined') {
    const isLocalhost =
      window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';


    if (!isLocalhost) {
      console.log = () => {};
      console.debug = () => {};
      console.info = () => {};
      console.warn = () => {};
      console.error = () => {};
    }
  }
}

/**
 * Enhanced image URL generator with caching optimization
 */
export const getOptimizedImageUrl = (imagePath: string, assetURL: string = '', options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg';
} = {}) => {
  const { width, height, quality = 85, format = 'webp' } = options;
  
  if (!imagePath) {
    return '/images/product-placeholder.webp';
  }

  const normalizedPath = normalizePath(`${assetURL}/${imagePath}`);
  
  // Add cache-busting parameters for better caching
  const cacheParams = new URLSearchParams({
    v: '1', // version for cache busting
    q: quality.toString(),
    f: format,
    ...(width && { w: width.toString() }),
    ...(height && { h: height.toString() })
  });

  return `${normalizedPath}?${cacheParams.toString()}`;
};

/**
 * Preload critical images for better LCP
 */
export const preloadCriticalImages = () => {
  if (typeof window === 'undefined') return;

  const criticalImages = [
    '/images/home/latest/homebanner-roads.webp',
    '/images/home/latest/9.webp',
    '/images/home/latest/f.webp',
    '/images/home/latest/8.webp',
    '/images/Admin-2.webp',
    '/images/home/bg1.webp'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.type = 'image/webp';
    document.head.appendChild(link);
  });
};

/**
 * Safe image URL generator with error handling
 */
export const getSafeImageUrl = (imagePath: string, assetURL: string = '') => {
  if (!imagePath) {
    return '/images/product-placeholder.webp';
  }

  try {
    const normalizedPath = normalizePath(`${assetURL}/${imagePath}`);
    
    // Check for problematic patterns
    const hasDoubleEncoding = normalizedPath.includes('%25');
    const hasSpecialChars = /[<>:"|?*]/.test(normalizedPath);
    const isTooLong = normalizedPath.length > 2048;
    const hasSpaces = normalizedPath.includes(' ');
    
    // Force unoptimized for problematic URLs
    if (hasDoubleEncoding || hasSpecialChars || isTooLong || hasSpaces || assetURL.includes('uat.hubeco.market')) {
      return normalizedPath;
    }
    
    return normalizedPath;
  } catch (error) {
    return '/images/product-placeholder.webp';
  }
};

/**
 * Enhanced safe image URL with caching
 */
export const getSafeImageUrlWithCache = (imagePath: string, assetURL: string = '') => {
  const safeUrl = getSafeImageUrl(imagePath, assetURL);
  
  // Add cache parameters for better performance
  if (safeUrl && !safeUrl.includes('product-placeholder.webp')) {
    const url = new URL(safeUrl, window.location.origin);
    url.searchParams.set('cache', 'v1');
    return url.toString();
  }
  
  return safeUrl;
};
