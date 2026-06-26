const CACHE_NAME = 'ylm-presensi-v5';
const urlsToCache = [
  '/',                // Membaca halaman utama otomatis di Vercel
  '/index.html',
  '/manifest.json',
  '/logo_192_YLM.png',
  '/logo_512_YLM.png',
  '/logo_180_YLM.png'
];

// Install Service Worker dan simpan aset ke cache browser
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Membuka cache dan menyimpan aset...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ambil data dari cache jika sedang offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Gunakan aset dari cache jika ada
        }
        return fetch(event.request); // Jika tidak ada, ambil dari internet
      })
  );
});
