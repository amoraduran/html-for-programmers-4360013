/* Bosquecito service worker — offline + installable.
   The whole game is one self-contained HTML (no external assets), so caching
   that page is enough to play with no internet. Cache-first with runtime fill,
   so it works whether the file is served as index.html or bosquecito.html. */
const CACHE = 'bosquecito-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.add('./').catch(() => {})));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req).then(hit =>
      hit || fetch(req).then(res => {
        try { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } catch (_) {}
        return res;
      }).catch(() =>
        // offline & not cached → serve the app shell so a hard reload still opens the game
        caches.match('./bosquecito.html').then(s => s || caches.match('./'))
      )
    )
  );
});
