const CACHE_NAME = 'wordsearch-cache-v4';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './style.css', // si tu as un fichier CSS
  './app.js',    // si tu as un fichier JS
  // Ajoute ici toutes les images et polices
];

// Installation - mise en cache
self.addEventListener('install', event => {
  console.log('Service Worker: Installation');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Mise en cache des fichiers');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Installation terminée');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Erreur installation', error);
      })
  );
});

// Activation - nettoyage anciens caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activation');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Suppression ancien cache', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation terminée');
      return self.clients.claim();
    })
  );
});

// Interception des requêtes
self.addEventListener('fetch', event => {
  // Ignore les requêtes non-GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourne le cache si disponible
        if (response) {
          console.log('Service Worker: Ressource depuis cache', event.request.url);
          return response;
        }

        // Sinon, fetch du réseau et mise en cache
        console.log('Service Worker: Fetch depuis réseau', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Vérifie que la réponse est valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone la réponse pour la mettre en cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.error('Service Worker: Fetch failed', error);
            // Peut retourner une page offline personnalisée ici
            return new Response('Mode hors ligne - Réessayez plus tard', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});
