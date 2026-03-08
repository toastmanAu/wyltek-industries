/**
 * Wyltek Industries — Service Worker
 * Strategy: cache-first for static assets, network-first for pages + API
 * Version bump here forces cache refresh on all clients
 */

const CACHE_VERSION = 'wyltek-v1'
const STATIC_CACHE = `${CACHE_VERSION}-static`
const PAGE_CACHE = `${CACHE_VERSION}-pages`

// Static assets to pre-cache on install (app shell)
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/research.html',
  '/lounge.html',
  '/members.html',
  '/roadmap.html',
  '/hardware.html',
  '/site.webmanifest',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/wyltek-mark.png',
  '/wyltek-logo.png',
  '/js/member-nav.js',
  '/js/wyltek-auth.js',
  '/js/bug-reporter.js',
]

// ─── Install: pre-cache app shell ────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  )
})

// ─── Activate: clean old caches ──────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k.startsWith('wyltek-') && k !== STATIC_CACHE && k !== PAGE_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  )
})

// ─── Fetch: routing strategy ─────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET, chrome-extension, and Supabase API calls (always network)
  if (request.method !== 'GET') return
  if (url.protocol === 'chrome-extension:') return
  if (url.hostname.includes('supabase.co')) return
  if (url.hostname.includes('joyid.dev') || url.hostname.includes('joy.id')) return

  // Static assets (js, css, images, fonts) — cache first
  if (
    url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf)$/)
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE))
    return
  }

  // HTML pages — network first, fall back to cache
  if (request.headers.get('accept')?.includes('text/html') || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(networkFirstWithCache(request, PAGE_CACHE))
    return
  }

  // Everything else — network only
})

// ─── Strategies ───────────────────────────────────────────────────────────────
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request)
  if (cached) return cached
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    return new Response('Offline — asset not cached', { status: 503 })
  }
}

async function networkFirstWithCache(request, cacheName) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    // Network failed — try cache
    const cached = await caches.match(request)
    if (cached) return cached
    // Fall back to index for navigation (SPA-style offline)
    const indexCached = await caches.match('/index.html')
    if (indexCached) return indexCached
    return new Response(offlinePage(), {
      status: 503,
      headers: { 'Content-Type': 'text/html' }
    })
  }
}

// ─── Offline fallback page ────────────────────────────────────────────────────
function offlinePage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wyltek — Offline</title>
  <style>
    body { background: #07090f; color: #e2e8f0; font-family: system-ui, sans-serif;
           display: flex; align-items: center; justify-content: center;
           height: 100vh; margin: 0; text-align: center; }
    .wrap { max-width: 320px; padding: 2rem; }
    img { width: 64px; border-radius: 14px; margin-bottom: 1.5rem; }
    h1 { font-size: 1.4rem; margin-bottom: 0.5rem; }
    p { color: #94a3b8; font-size: 0.9rem; }
    button { margin-top: 1.5rem; background: #3b82f6; color: white;
             border: none; padding: 0.75rem 2rem; border-radius: 8px;
             font-size: 1rem; cursor: pointer; }
  </style>
</head>
<body>
  <div class="wrap">
    <img src="/wyltek-mark.png" alt="Wyltek">
    <h1>You're offline</h1>
    <p>Check your connection and try again. Cached pages are still available.</p>
    <button onclick="location.reload()">Retry</button>
  </div>
</body>
</html>`
}

// ─── Push notifications (future) ──────────────────────────────────────────────
self.addEventListener('push', event => {
  if (!event.data) return
  const data = event.data.json()
  event.waitUntil(
    self.registration.showNotification(data.title || 'Wyltek', {
      body: data.body || '',
      icon: '/android-chrome-192x192.png',
      badge: '/android-chrome-192x192.png',
      tag: data.tag || 'wyltek',
      data: { url: data.url || '/' },
    })
  )
})

self.addEventListener('notificationclick', event => {
  event.notification.close()
  const url = event.notification.data?.url || '/'
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      const existing = windowClients.find(c => c.url === url && 'focus' in c)
      if (existing) return existing.focus()
      return clients.openWindow(url)
    })
  )
})
