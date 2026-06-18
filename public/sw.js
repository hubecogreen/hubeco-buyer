const VERSION = 'v2.0.5';
const STATIC_CACHE_NAME = `hubeco-static-${VERSION}`;
const IMAGE_CACHE_NAME = `hubeco-images-${VERSION}`;
const PAGE_CACHE_NAME = `hubeco-pages-${VERSION}`;
const PUBLIC_API_CACHE_NAME = `hubeco-public-api-${VERSION}`;

const OFFLINE_URL = '/offline.html';
const PRODUCT_PLACEHOLDER_URL = '/images/product-placeholder.webp';

// Fetch timeout (ms) before falling through to cache on slow connections.
const NETWORK_TIMEOUT_MS = 5000;

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

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

self.addEventListener('install', (event) => {
  // ⚠️  skipWaiting() here is a one-release emergency measure to push the
  // reload-loop hotfix to existing production sessions immediately.
  // Revert to `event.waitUntil(precache())` once the fix is confirmed stable
  // so the normal "prompt before update" UX (PwaUpdatePrompt) is restored.
  event.waitUntil(Promise.all([precache(), self.skipWaiting()]));
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Delete stale versioned caches from previous releases.
      caches.keys().then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter(
              (name) =>
                name.startsWith('hubeco-') &&
                ![
                  STATIC_CACHE_NAME,
                  IMAGE_CACHE_NAME,
                  PAGE_CACHE_NAME,
                  PUBLIC_API_CACHE_NAME,
                ].includes(name)
            )
            .map((name) => caches.delete(name))
        )
      ),
      // Immediately take control of all open tabs so users get the updated
      // SW without needing to reload manually.
      self.clients.claim(),
    ])
  );
});

// ---------------------------------------------------------------------------
// Fetch routing
// ---------------------------------------------------------------------------

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Never intercept non-GET requests (POST/PUT/DELETE for cart, checkout, etc.)
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Never intercept cross-origin requests (analytics, GTM, CDN, socket.io).
  // Only cache same-origin resources we explicitly control.
  if (url.origin !== self.location.origin) return;

  // Never intercept authenticated requests — always hit the network.
  if (isAuthorizedRequest(request)) return;

  if (isApiRequest(url)) {
    event.respondWith(handleApiRequest(request, url));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request, url));
    return;
  }

  if (request.destination === 'image') {
    event.respondWith(
      cacheFirst(request, IMAGE_CACHE_NAME, PRODUCT_PLACEHOLDER_URL, 150)
    );
    return;
  }

  if (['style', 'script', 'font', 'manifest'].includes(request.destination)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE_NAME, 80));
    return;
  }

  // Remaining same-origin GETs (e.g. RSC payload fetches from Next.js router):
  // try network, fall back to cache, then return a clean network-error
  // response rather than undefined — undefined passed to respondWith() causes
  // an internal SW crash which Next.js's router treats as cause to force a
  // full hard-navigation reload.
  event.respondWith(
    fetchWithTimeout(request).catch(async () => {
      const cached = await caches.match(request);
      return cached || Response.error();
    })
  );
});

// ---------------------------------------------------------------------------
// Route handlers
// ---------------------------------------------------------------------------

async function handleApiRequest(request, url) {
  if (isBlockedApiPath(url.pathname) || !isPublicApiPath(url.pathname)) {
    return fetch(request);
  }

  return networkFirst(request, PUBLIC_API_CACHE_NAME, null, 40);
}

async function handleNavigationRequest(request, url) {
  if (!isPublicPagePath(url.pathname)) {
    return fetchWithTimeout(request).catch(() => offlineFallback());
  }

  return networkFirst(request, PAGE_CACHE_NAME, OFFLINE_URL, 30);
}

// ---------------------------------------------------------------------------
// Caching strategies
// ---------------------------------------------------------------------------

async function networkFirst(request, cacheName, fallbackUrl, maxEntries) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetchWithTimeout(request);

    if (isCacheableResponse(response)) {
      await cache.put(request, response.clone());
      await trimCache(cacheName, maxEntries);
    }

    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    if (fallbackUrl) return offlineFallback();
    throw new Error('offline, no cache');
  }
}

async function cacheFirst(request, cacheName, fallbackUrl, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);

    if (isCacheableResponse(response)) {
      await cache.put(request, response.clone());
      await trimCache(cacheName, maxEntries);
    }

    return response;
  } catch {
    if (fallbackUrl) return offlineFallback();
    throw new Error('offline, no cache');
  }
}

async function staleWhileRevalidate(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const revalidate = fetch(request)
    .then(async (response) => {
      if (isCacheableResponse(response)) {
        await cache.put(request, response.clone());
        await trimCache(cacheName, maxEntries);
      }
      return response;
    })
    .catch(() => cached || Response.error());

  return cached || revalidate;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function fetchWithTimeout(request, ms = NETWORK_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);

  return fetch(request, { signal: controller.signal }).finally(() =>
    clearTimeout(timer)
  );
}

async function offlineFallback() {
  const cached = await caches.match(OFFLINE_URL);
  // If offline.html itself failed to precache, return a bare-bones response
  // rather than undefined — undefined crashes respondWith() internally.
  return cached || new Response(
    '<html><body><h2>No internet connection</h2></body></html>',
    { headers: { 'Content-Type': 'text/html' } }
  );
}

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

// Only intercept same-origin API paths — cross-origin requests are now
// filtered out entirely at the fetch handler level before this is called.
function isApiRequest(url) {
  return url.pathname.startsWith('/api/') || url.pathname.includes('/api/');
}

function isBlockedApiPath(pathname) {
  const lower = pathname.toLowerCase();
  return BLOCKED_API_KEYWORDS.some((kw) => lower.includes(kw));
}

function isPublicApiPath(pathname) {
  const lower = pathname.toLowerCase();
  return PUBLIC_API_KEYWORDS.some((kw) => lower.includes(kw));
}

function isPublicPagePath(pathname) {
  const normalized = pathname.replace(/\/$/, '') || '/';
  return PUBLIC_PAGE_PATHS.some(
    (p) => normalized === p || normalized.startsWith(`${p}/`)
  );
}

function isCacheableResponse(response) {
  return (
    response &&
    response.ok &&
    (response.type === 'basic' || response.type === 'cors')
  );
}

async function trimCache(cacheName, maxEntries) {
  if (!maxEntries) return;

  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length <= maxEntries) return;

  await Promise.all(
    keys.slice(0, keys.length - maxEntries).map((req) => cache.delete(req))
  );
}
