// IRON LOG — Service Worker mínimo
// Su único propósito es habilitar showNotification() del sistema
// para el aviso de fin de descanso, incluso con la app en segundo plano.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Si el usuario toca la notificación, intenta enfocar/abrir la app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
      if (clientsArr.length > 0) {
        return clientsArr[0].focus();
      }
      return self.clients.openWindow('./');
    })
  );
});
