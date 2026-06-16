const VERSION = 'v2.0.1';
const STATIC_CACHE_NAME = `hubeco-static-${VERSION}`;
const IMAGE_CACHE_NAME = `hubeco-images-${VERSION}`;
const PAGE_CACHE_NAME = `hubeco-pages-${VERSION}`;
const PUBLIC_API_CACHE_NAME = `hubeco-public-api-${VERSION}`;

const OFFLINE_URL = '/offline.html';
const PRODUCT_PLACEHOLDER_URL = '/images/product-placeholder.webp';

const PRECACHE_URLS = [
  '/',
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

// self.addEventListener('install', (event) => {
//   event.waitUntil(precache());
// });

self.addEventListener('install', (event) => {
  self.skipWaiting();
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

  // if (request.method !== 'GET') {
  //   event.respondWith(fetch(request));
  //   return;
  // }
  if (request.method !== 'GET') {
  return;
}

  const url = new URL(request.url);

  // Next.js static assets
if (url.pathname.startsWith('/_next/static/')) {
  event.respondWith(
    staleWhileRevalidate(
      request,
      STATIC_CACHE_NAME,
      200
    )
  );
  return;
}

// Next.js optimized images
if (url.pathname.startsWith('/_next/image/')) {
  event.respondWith(
    cacheFirst(
      request,
      IMAGE_CACHE_NAME,
      PRODUCT_PLACEHOLDER_URL,
      200
    )
  );
  return;
}


  if (isAuthorizedRequest(request)) {
    event.respondWith(fetch(request));
    return;
  }

  if (isApiRequest(request, url)) {
    event.respondWith(handleApiRequest(request, url));
    return;
  }

  if (request.mode === 'navigate') {
event.respondWith(handleNavigationRequest(request));
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

  event.respondWith(fetch(request).catch(() => caches.match(request)));
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

// function isApiRequest(request, url) {
//   if (url.origin === self.location.origin) {
//     return url.pathname.startsWith('/api/') || url.pathname.includes('/api/');
//   }

//   return request.destination === '';
// }

function isApiRequest(request, url) {
  return (
    url.origin === self.location.origin &&
    url.pathname.startsWith('/api/')
  );
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

// async function handleNavigationRequest(request, url) {
//   if (!isPublicPagePath(url.pathname)) {
//     return fetch(request).catch(() => caches.match(OFFLINE_URL));
//   }

//   return networkFirst(request, PAGE_CACHE_NAME, OFFLINE_URL, 30);
// }

async function handleNavigationRequest(request) {
  const cache = await caches.open(PAGE_CACHE_NAME);

  try {
    const response = await fetch(request);

    if (isCacheableResponse(response)) {
      await cache.put(request, response.clone());
      await trimCache(PAGE_CACHE_NAME, 30);
    }

    return response;
  } catch (error) {
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    const home = await caches.match('/');

    if (home) {
      return home;
    }

    return caches.match(OFFLINE_URL);
  }
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
