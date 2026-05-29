const CACHE_VERSION = 'linkupbookings-v3';
const BASE_PATH = '/linkupbookings/';
const INDEX_URL = `${BASE_PATH}index.html`;
const APP_SHELL = [
  BASE_PATH,
  INDEX_URL,
  `${BASE_PATH}manifest.webmanifest`,
  `${BASE_PATH}icons/icon.svg`,
  `${BASE_PATH}icons/maskable.svg`
];

async function cacheAppShell(cache) {
  await Promise.all(APP_SHELL.map((url) => cache.add(url).catch(() => undefined)));

  try {
    const indexResponse = await fetch(INDEX_URL, { cache: 'no-store' });
    if (!indexResponse.ok) return;

    const html = await indexResponse.clone().text();
    await cache.put(INDEX_URL, indexResponse.clone());
    await cache.put(BASE_PATH, indexResponse);

    const assetUrls = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
      .map((match) => new URL(match[1], self.location.origin).pathname)
      .filter((pathname) => pathname.startsWith(`${BASE_PATH}assets/`));

    await Promise.all([...new Set(assetUrls)].map((pathname) => cache.add(pathname).catch(() => undefined)));
  } catch {
    // Keep the install resilient: the cache-first runtime strategy will fill
    // assets as soon as the app is reachable again.
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cacheAppShell)
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((key) => key === CACHE_VERSION ? undefined : caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE_PATH)) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Only cache real index responses. A non-OK response here (e.g. the
          // GitHub Pages 404.html SPA fallback) must still be returned so its
          // redirect can run, but caching it would poison the app shell.
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => {
              cache.put(INDEX_URL, copy.clone());
              cache.put(BASE_PATH, copy);
            });
          }
          return response;
        })
        .catch(() => caches.match(INDEX_URL).then((cached) => cached || caches.match(BASE_PATH)))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
        }
        return response;
      }).catch(() => cached);

      return cached || network;
    })
  );
});
