const CACHE_NAME = 'wordsearch-offline-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // Ajoute d'autres fichiers si tu en as
];

// Installation
self.addEventListener('install', (event) => {
  console.log('🔄 Installation du Service Worker');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Mise en cache des fichiers');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ Toutes les ressources en cache');
        return self.skipWaiting();
      })
  );
});

// Activation
self.addEventListener('activate', (event) => {
  console.log('🎯 Service Worker Activé');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('🗑️ Suppression ancien cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non-GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retourne le cache si disponible
        if (response) {
          console.log('📂 Depuis cache:', event.request.url);
          return response;
        }
        
        // Sinon, va au réseau
        console.log('🌐 Depuis réseau:', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Met en cache les nouvelles ressources
            if (response && response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseClone);
                });
            }
            return response;
          })
          .catch((error) => {
            console.log('❌ Erreur fetch:', error);
            // Page de secours si hors ligne
            return new Response(
              '<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>Hors ligne</title><style>body{background:#1a5276;color:white;font-family:Tajawal;text-align:center;padding:50px;}</style></head><body><h1>🔄 Mode hors ligne</h1><p>L\'application fonctionnera à la reconnexion</p><button onclick="location.reload()">Réessayer</button></body></html>',
              { headers: { 'Content-Type': 'text/html' } }
            );
          });
      })
  );
});
