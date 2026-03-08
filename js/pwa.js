/**
 * Wyltek PWA — service worker registration + install prompt
 */
;(function () {
  // Register service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(reg => {
          console.log('[PWA] Service worker registered, scope:', reg.scope)
          // Check for updates periodically
          setInterval(() => reg.update(), 60 * 60 * 1000)
        })
        .catch(err => console.warn('[PWA] SW registration failed:', err))
    })
  }

  // Install prompt (Android "Add to Home Screen" banner)
  let deferredPrompt = null
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault()
    deferredPrompt = e
    // Show install button if present on page
    const btn = document.getElementById('pwa-install-btn')
    if (btn) {
      btn.style.display = 'inline-flex'
      btn.addEventListener('click', () => {
        deferredPrompt.prompt()
        deferredPrompt.userChoice.then(choice => {
          if (choice.outcome === 'accepted') {
            btn.style.display = 'none'
          }
          deferredPrompt = null
        })
      })
    }
  })

  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App installed')
    deferredPrompt = null
    const btn = document.getElementById('pwa-install-btn')
    if (btn) btn.style.display = 'none'
  })
})()
