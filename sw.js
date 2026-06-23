const CACHE_NAME = 'ylm-presensi-v4';
const urlsToCache = [
  '/',                // Membaca halaman utama otomatis di Vercel
  '/index.html',
  '/manifest.json',
  '/Logo 192YLM.png',
  '/Logo 512YLM.png',
  '/Logo 180YLM.png'
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
