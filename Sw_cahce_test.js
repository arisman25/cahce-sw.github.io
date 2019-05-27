//install sw
var CACHE_NAME = 'my-site-cache-v2';

self.addEventListener('install', e => {
  // Perform install steps
  console.log('SW installed');
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
	e.respondWith(
    fetch(e.request)
      .then(res => {
        // copy atau clone
        const resClone = res.clone();

      //buka cache
      caches.open(CACHE_NAME).then(cache => {
        //tambah respon ke cache
        cache.put(e.request, resClone);
      });
      return res;
    })
    .catch(err => caches.match(e.request).then(res => res))
    );
});