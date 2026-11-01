/* Cargo Tools — service worker
   Guarda o app no celular para funcionar sem internet e busca a versão nova quando há sinal.
   Ao publicar uma atualização, aumente o número em VERSAO. */
const VERSAO = 'cargo-tools-2.0.0';
const ESSENCIAIS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon.svg",
  "./icons/favicon-32.png",
  "./fonts/barlow-400.woff2",
  "./fonts/barlow-500.woff2",
  "./fonts/barlow-600.woff2",
  "./fonts/barlow-condensed-600.woff2",
  "./fonts/barlow-condensed-700.woff2",
  "./fonts/barlow-condensed-800.woff2"
];
const ESPERA_REDE_MS = 4000;   // sinal fraco no pátio: depois disso usa a cópia guardada

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ESSENCIAIS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(chaves => Promise.all(chaves
        .filter(k => k.startsWith('cargo-tools-') && k !== VERSAO)
        .map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function comPrazo(promessa, ms) {
  return new Promise((ok, falha) => {
    const t = setTimeout(() => falha(new Error('sem resposta da rede')), ms);
    promessa.then(r => { clearTimeout(t); ok(r); }, e => { clearTimeout(t); falha(e); });
  });
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  // Página do app: rede primeiro (versão mais nova); sem sinal, usa a cópia guardada
  if (req.mode === 'navigate') {
    e.respondWith(
      comPrazo(fetch(req), ESPERA_REDE_MS)
        .then(r => {
          if (r.ok) { const copia = r.clone(); caches.open(VERSAO).then(c => c.put('./index.html', copia)); }
          return r;
        })
        .catch(() => caches.match('./index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  // Demais arquivos (ícones, fontes, logos): cópia guardada primeiro; se não houver, busca e guarda
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(guardado => guardado || fetch(req).then(r => {
      if (r.ok) { const copia = r.clone(); caches.open(VERSAO).then(c => c.put(req, copia)); }
      return r;
    }))
  );
});
