 
import { precacheAndRoute } from 'workbox-precaching';
// var self = this;
precacheAndRoute(window.self.__WB_MANIFEST);

window.self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});