const CACHE = 'astrolab-v1';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll([
    './','./index.html','./css/app.css','./manifest.webmanifest',
    './js/payload.js','./js/c1.js','./js/c2.js','./js/c3.js','./js/c4.js','./js/c5.js','./js/c6.js','./js/c7.js','./js/c8.js','./js/loader.js'
    
  ])).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.url.startsWith(self.location.origin))
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
