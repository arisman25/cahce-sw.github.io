//install sw
var CACHE_NAME = 'my-site-cache-v2';
var urlsToCache = [
  '/',
  '/js/main.js',
  '/jquery.lazyload.min.js',
  '/jquery.min.js',
  '/index.html',
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
  '/images/6.jpg',
  '/images/7.jpg',
  '/images/8.jpg',
  '/images/blank.jpg'
  
];

self.addEventListener('install', e => {
  // Perform install steps
  console.log('SW installed');
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});


//Aktivasi
self.addEventListener('activate', e => {
  // Perform install steps
  console.log('SW activate');
  
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
          	console.log('clean old cache');
            return caches.delete(cache);
          } 
        })
      );
    })
  );
});


//panggil cache

self.addEventListener('fetch', e=>{
	console.log('cache berhasil di panggil');
	e.respondWith(fetch(e.request)
		.catch(() => caches
			.match(e.request)));
});