const VERSION = 'v2.0.3';
const STATIC_CACHE_NAME = `hubeco-static-${VERSION}`;
const IMAGE_CACHE_NAME = `hubeco-images-${VERSION}`;
const PAGE_CACHE_NAME = `hubeco-pages-${VERSION}`;
const PUBLIC_API_CACHE_NAME = `hubeco-public-api-${VERSION}`;

const OFFLINE_URL = '/offline.html';
const PRODUCT_PLACEHOLDER_URL = '/images/product-placeholder.webp';

const PRECACHE_URLS = [
  OFFLINE_URL,
  '/manifest.webmanifest',
  '/favicon.ico',
  '/images/Rlogo.png',
  '/images/app-logo.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  PRODUCT_PLACEHOLDER_URL,
  '/images/actions/Action.webp',
  '/images/home/hero/video-poster.webp'
];

const PUBLIC_PAGE_PATHS = [
  '/',
  '/about',
  '/contact',
  '/faq',
  '/privacy-policy',
  '/terms-of-use',
  '/shipping-delivery',
  '/returns-refunds-cancellations',
  '/blogs',
  '/brands',
  '/categories',
  '/products'
];

const BLOCKED_API_KEYWORDS = [
  'auth',
  'login',
  'register',
  'password',
  'otp',
  'profile',
  'user',
  'cart',
  'wishlist',
  'checkout',
  'payment',
  'order',
  'quote',
  'ticket',
  'support',
  'subscription'
];

const PUBLIC_API_KEYWORDS = [
  'categories',
  'category',
  'subcategory',
  'products',
  'product',
  'blogs',
  'blog',
  'brands',
  'brand'
];

self.addEventListener('install', (event) => {
  event.waitUntil(precache());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) =>
            cacheName.startsWith('hubeco-') &&
            ![
              STATIC_CACHE_NAME,
              IMAGE_CACHE_NAME,
              PAGE_CACHE_NAME,
              PUBLIC_API_CACHE_NAME
            ].includes(cacheName)
          )
          .map((cacheName) => caches.delete(cacheName))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    event.respondWith(fetch(request));
    return;
  }

  const url = new URL(request.url);

  if (isAuthorizedRequest(request)) {
    event.respondWith(fetch(request));
    return;
  }

  if (isApiRequest(request, url)) {
    event.respondWith(handleApiRequest(request, url));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request, url));
    return;
  }

  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request, IMAGE_CACHE_NAME, PRODUCT_PLACEHOLDER_URL, 150));
    return;
  }

  if (['style', 'script', 'font', 'manifest'].includes(request.destination)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE_NAME, 80));
    return;
  }

  event.respondWith(
    fetch(request).catch(async () => {
      const cached = await caches.match(request);
      // Never resolve `undefined` here - Next.js's router (and any other
      // same-origin fetch, e.g. RSC payload requests) needs a real Response
      // (even a synthetic network error) or it falls back to a hard reload.
      return cached || Response.error();
    })
  );
});

async function precache() {
  const cache = await caches.open(STATIC_CACHE_NAME);

  await Promise.all(
    PRECACHE_URLS.map(async (url) => {
      try {
        await cache.add(url);
      } catch (error) {
        console.warn('[Hubeco SW] Failed to precache', url, error);
      }
    })
  );
}

function isAuthorizedRequest(request) {
  return request.headers.has('authorization');
}

function isApiRequest(request, url) {
  if (url.origin === self.location.origin) {
    return url.pathname.startsWith('/api/') || url.pathname.includes('/api/');
  }

  return request.destination === '';
}

function isBlockedApiPath(pathname) {
  const lowerPath = pathname.toLowerCase();
  return BLOCKED_API_KEYWORDS.some((keyword) => lowerPath.includes(keyword));
}

function isPublicApiPath(pathname) {
  const lowerPath = pathname.toLowerCase();
  return PUBLIC_API_KEYWORDS.some((keyword) => lowerPath.includes(keyword));
}

function isPublicPagePath(pathname) {
  const normalizedPath = pathname.replace(/\/$/, '') || '/';
  return PUBLIC_PAGE_PATHS.some((path) => normalizedPath === path || normalizedPath.startsWith(`${path}/`));
}

function isCacheableResponse(response) {
  return response && response.ok && (response.type === 'basic' || response.type === 'cors');
}

async function handleApiRequest(request, url) {
  if (isBlockedApiPath(url.pathname) || !isPublicApiPath(url.pathname)) {
    return fetch(request);
  }

  return networkFirst(request, PUBLIC_API_CACHE_NAME, null, 40);
}

async function handleNavigationRequest(request, url) {
  if (!isPublicPagePath(url.pathname)) {
    // ✅ caches.match (global) not cache.match (specific cache)
    return fetch(request).catch(() => caches.match(OFFLINE_URL));
  }

  return networkFirst(request, PAGE_CACHE_NAME, OFFLINE_URL, 30);
}

async function networkFirst(request, cacheName, fallbackUrl, maxEntries) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);

    if (isCacheableResponse(response)) {
      await cache.put(request, response.clone());
      await trimCache(cacheName, maxEntries);
    }

    return response;
  } catch (error) {
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    if (fallbackUrl) {
      return caches.match(fallbackUrl);
    }

    throw error;
  }
}

async function cacheFirst(request, cacheName, fallbackUrl, maxEntries) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(request);

    if (isCacheableResponse(response)) {
      await cache.put(request, response.clone());
      await trimCache(cacheName, maxEntries);
    }

    return response;
  } catch (error) {
    if (fallbackUrl) {
      return caches.match(fallbackUrl);
    }

    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request)
    .then(async (response) => {
      if (isCacheableResponse(response)) {
        await cache.put(request, response.clone());
        await trimCache(cacheName, maxEntries);
      }

      return response;
    })
    .catch(() => cachedResponse);

  return cachedResponse || fetchPromise;
}

async function trimCache(cacheName, maxEntries) {
  if (!maxEntries) return;

  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length <= maxEntries) return;

  await Promise.all(keys.slice(0, keys.length - maxEntries).map((request) => cache.delete(request)));
}
