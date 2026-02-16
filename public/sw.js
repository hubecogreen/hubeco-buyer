const CACHE_NAME = 'hubeco-cache-v1';
const STATIC_CACHE_NAME = 'hubeco-static-v1';
const IMAGE_CACHE_NAME = 'hubeco-images-v1';

// Cache URLs for static assets
const STATIC_URLS = [
  '/',
  '/offline.html',
  '/images/product-placeholder.webp',
  '/images/Admin-2.webp',    
  '/images/actions/Action.jpg',
  
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_URLS);
      }),
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        // Pre-cache critical images
        return cache.addAll([
          '/images/actions/Action.jpg',
          '/images/home/hero/video-poster.png'
        ]);
      })
    ])
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && 
              cacheName !== STATIC_CACHE_NAME && 
              cacheName !== IMAGE_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle image requests with aggressive caching
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            // Return cached image
            return response;
          }
          
          // Fetch from network and cache
          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Return placeholder if network fails
            return cache.match('/images/product-placeholder.webp');
          });
        });
      })
    );
    return;
  }

  // Handle static assets
  if (request.destination === 'style' || 
      request.destination === 'script' || 
      request.destination === 'font') {
    event.respondWith(
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            return response;
          }
          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Handle API requests (no caching)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(request));
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match('/offline.html');
      })
    );
    return;
  }

  // Default: try network first, fallback to cache
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle background sync tasks
  console.log('Background sync completed');
} 