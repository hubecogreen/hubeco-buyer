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
