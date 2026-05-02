const CACHE_NAME='jp-word-lab-v1';
const ASSETS=['./','./index.html','./manifest.json','./icon-jpw-512.png','./icon-jpw-192.png','./icon-jpw-128.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(c=>{if(c)return c;return fetch(e.request).then(r=>{if(r.ok&&e.request.method==='GET'){caches.open(CACHE_NAME).then(ca=>ca.put(e.request,r.clone()));}return r;});}).catch(()=>{if(e.request.destination==='document')return caches.match('./index.html');}));});
