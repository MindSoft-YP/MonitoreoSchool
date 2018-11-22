;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_monitoreoSchool',
  urlsToCache = [
    './',
    './galeria.php',
    './login.php',
    './registrar-php',
    './project.mobirise', 
    'https://fonts.googleapis.com/css?family=Raleway:400,700',
    'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2',
    'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
    'https://use.fontawesome.com/releases/v5.0.6/webfonts/fa-brands-400.woff2',
    './script.js',
    './assets/web/assets/jquery/jquery.min.js',
    './assets/popper/popper.min.js',
    './assets/tether/tether.min.js',
    './assets/bootstrap/js/bootstrap.min.js',
    './assets/dropdown/js/script.min.js',
    './assets/touchswipe/jquery.touch-swipe.min.js',
    './assets/ytplayer/jquery.mb.ytplayer.min.js',
    './assets/vimeoplayer/jquery.mb.vimeo_player.js',
    './assets/smoothscroll/smooth-scroll.js',
    './assets/theme/js/script.js',
    './assets/images/03.jpg',
    './assets/images/face1.jpg',
    './assets/images/jumbotron2.jpg',
    './assets/images/logo-128x82-1.png',
    './assets/images/logo2.png',
    './assets/images/logo3-230x219-230x219.png',
    './assets/images/logo3-230x219.png',
    './assets/images/logo3.png',
    './assets/images/mbr-1920x1043.png',
    './assets/images/mbr-1920x1440.png',
    './assets/images/mbr-favicon.png'
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})
