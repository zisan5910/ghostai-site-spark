
// Enhanced service worker for offline support with image and asset caching

const CACHE_NAME = 'ridoan-portfolio-offline-v2';
const STATIC_CACHE = 'ridoan-static-v2';
const IMAGE_CACHE = 'ridoan-images-v2';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/Resume.pdf',
  '/profile.jpg',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open(IMAGE_CACHE).then((cache) => {
        // Pre-cache any known images
        return cache.addAll([
          '/profile.jpg'
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
          if (cacheName !== STATIC_CACHE && 
              cacheName !== IMAGE_CACHE && 
              cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests
  if (request.method === 'GET') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((networkResponse) => {
          // Don't cache if response is not ok
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();

          // Determine which cache to use
          let cacheName = CACHE_NAME;
          
          if (request.url.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
            cacheName = IMAGE_CACHE;
          } else if (request.url.includes('.css') || 
                     request.url.includes('.js') || 
                     request.url.includes('.pdf') ||
                     request.url.includes('/Resume.pdf')) {
            cacheName = STATIC_CACHE;
          }

          // Cache the response
          caches.open(cacheName).then((cache) => {
            cache.put(request, responseToCache);
          });

          return networkResponse;
        }).catch(() => {
          // Return offline fallback for images
          if (request.url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f3f4f6"/><text x="100" y="100" text-anchor="middle" fill="#6b7280" font-family="Arial" font-size="12">Image Offline</text></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          }
          
          // Return offline page for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
    );
  }
});

// Handle background sync for when connection is restored
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
  }
});

// Handle push notifications (if needed in future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/profile.jpg'
    });
  }
});
