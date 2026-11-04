// Max Simulator offline cache
const CACHE='max-sim-grey1';
const CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png',
'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/CopyShader.js',
'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/LuminosityHighPassShader.js',
'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/SSAOShader.js',
'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/FXAAShader.js',
'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/GammaCorrectionShader.js',
'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/math/SimplexNoise.js',
'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/EffectComposer.js',
'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/RenderPass.js',
'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/ShaderPass.js',
'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/UnrealBloomPass.js',
'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/SSAOPass.js',
'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/geometries/RoundedBoxGeometry.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(CORE.map(u=>c.add(new Request(u,{mode:u.startsWith('http')?'no-cors':'same-origin'})).catch(()=>{})))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put('index.html',cp));return res;}).catch(()=>caches.match('index.html')));return;}
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));}return res;})));});
