/**
 * Wyltek PWA — Offline Outbox
 * 
 * Stores actions made while offline in IndexedDB.
 * On reconnect: shows review panel — user can upload or trash each item.
 * 
 * Usage:
 *   import { outbox } from '/js/offline-outbox.js'
 *   await outbox.add({ type: 'comment', label: 'Research comment', data: { ... } })
 * 
 * Include on any page that has user-generated content.
 */

// ─── IndexedDB setup ─────────────────────────────────────────────────────────
const DB_NAME = 'wyltek-outbox'
const DB_VERSION = 1
const STORE = 'pending'

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = e => {
      const db = e.target.result
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true })
        store.createIndex('ts', 'ts')
      }
    }
    req.onsuccess = e => resolve(e.target.result)
    req.onerror = e => reject(e.target.error)
  })
}

async function dbAll() {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const req = tx.objectStore(STORE).getAll()
    req.onsuccess = e => resolve(e.target.result)
    req.onerror = e => reject(e.target.error)
  })
}

async function dbAdd(item) {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    const req = tx.objectStore(STORE).add({ ...item, ts: Date.now() })
    req.onsuccess = e => resolve(e.target.result)
    req.onerror = e => reject(e.target.error)
  })
}

async function dbDelete(id) {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    const req = tx.objectStore(STORE).delete(id)
    req.onsuccess = () => resolve()
    req.onerror = e => reject(e.target.error)
  })
}

// ─── Upload handlers — add your Supabase calls here ──────────────────────────
async function uploadItem(item) {
  // Dispatch to the right handler based on type
  switch (item.type) {
    case 'research_comment':
      return uploadResearchComment(item.data)
    case 'lounge_message':
      return uploadLoungeMessage(item.data)
    case 'reaction':
      return uploadReaction(item.data)
    default:
      throw new Error(`Unknown outbox type: ${item.type}`)
  }
}

async function uploadResearchComment(data) {
  // Matches existing research comment Supabase schema
  const SUPABASE_URL = 'https://yhntwgjzrzyhyxpiqcts.supabase.co'
  const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlobnR3Z2p6cnp5aHl4cGlxY3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1Mjc2ODMsImV4cCI6MjA4ODEwMzY4M30.HhTEKmSQs-qaOhoQr4cJxRfTfpWEjGqB3TwQnRWCm4Y'
  const res = await fetch(`${SUPABASE_URL}/rest/v1/research_comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': ANON_KEY,
      'Authorization': `Bearer ${localStorage.getItem('wyltek_jwt') || ANON_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`)
}

async function uploadLoungeMessage(data) {
  const SUPABASE_URL = 'https://yhntwgjzrzyhyxpiqcts.supabase.co'
  const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlobnR3Z2p6cnp5aHl4cGlxY3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1Mjc2ODMsImV4cCI6MjA4ODEwMzY4M30.HhTEKmSQs-qaOhoQr4cJxRfTfpWEjGqB3TwQnRWCm4Y'
  const res = await fetch(`${SUPABASE_URL}/rest/v1/lounge_messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': ANON_KEY,
      'Authorization': `Bearer ${localStorage.getItem('wyltek_jwt') || ANON_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`)
}

async function uploadReaction(data) {
  // Generic reaction — extend as needed
  console.log('Reaction upload stub:', data)
}

// ─── Type labels for UI ───────────────────────────────────────────────────────
const TYPE_LABELS = {
  research_comment: '💬 Research Comment',
  lounge_message: '🛋️ Lounge Message',
  reaction: '❤️ Reaction',
}

function formatTime(ts) {
  const d = new Date(ts)
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

// ─── Review panel UI ─────────────────────────────────────────────────────────
function buildPanel(items) {
  // Remove existing panel if any
  document.getElementById('wyltek-outbox-panel')?.remove()

  const panel = document.createElement('div')
  panel.id = 'wyltek-outbox-panel'
  panel.innerHTML = `
    <style>
      #wyltek-outbox-panel {
        position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;
        background: #0f1117; border-top: 1px solid #2d3748;
        font-family: system-ui, -apple-system, sans-serif;
        max-height: 70vh; overflow-y: auto;
        box-shadow: 0 -8px 32px rgba(0,0,0,0.5);
        border-radius: 16px 16px 0 0;
        animation: slideUp 0.25s ease;
      }
      @keyframes slideUp {
        from { transform: translateY(100%); opacity: 0; }
        to   { transform: translateY(0);    opacity: 1; }
      }
      .ob-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 1rem 1.25rem 0.75rem;
        border-bottom: 1px solid #1e2533;
        position: sticky; top: 0; background: #0f1117; z-index: 1;
      }
      .ob-title { font-size: 1rem; font-weight: 600; color: #e2e8f0; }
      .ob-subtitle { font-size: 0.75rem; color: #64748b; margin-top: 2px; }
      .ob-close {
        background: #1e2533; border: none; color: #94a3b8;
        width: 28px; height: 28px; border-radius: 50%; cursor: pointer;
        font-size: 1rem; display: flex; align-items: center; justify-content: center;
      }
      .ob-actions {
        display: flex; gap: 0.5rem; padding: 0.75rem 1.25rem;
        border-bottom: 1px solid #1e2533;
      }
      .ob-btn {
        flex: 1; padding: 0.5rem; border: none; border-radius: 8px;
        font-size: 0.85rem; font-weight: 500; cursor: pointer; transition: opacity 0.15s;
      }
      .ob-btn:hover { opacity: 0.85; }
      .ob-btn-upload-all { background: #3b82f6; color: white; }
      .ob-btn-trash-all  { background: #1e2533; color: #94a3b8; }
      .ob-list { padding: 0.5rem 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
      .ob-item {
        background: #161b27; border: 1px solid #2d3748; border-radius: 10px;
        padding: 0.875rem; display: flex; flex-direction: column; gap: 0.5rem;
      }
      .ob-item-header { display: flex; justify-content: space-between; align-items: center; }
      .ob-type { font-size: 0.75rem; font-weight: 600; color: #60a5fa; }
      .ob-time { font-size: 0.7rem; color: #4a5568; }
      .ob-content {
        font-size: 0.85rem; color: #cbd5e0; line-height: 1.5;
        background: #0a0d14; border-radius: 6px; padding: 0.5rem 0.75rem;
        max-height: 80px; overflow-y: auto; word-break: break-word;
      }
      .ob-item-actions { display: flex; gap: 0.5rem; margin-top: 0.25rem; }
      .ob-item-btn {
        flex: 1; padding: 0.4rem; border: none; border-radius: 6px;
        font-size: 0.8rem; cursor: pointer; font-weight: 500;
      }
      .ob-item-upload { background: #1d4ed8; color: white; }
      .ob-item-trash  { background: #1e2533; color: #94a3b8; }
      .ob-item.uploading { opacity: 0.5; pointer-events: none; }
      .ob-item.done { display: none; }
      .ob-empty { text-align: center; color: #4a5568; font-size: 0.85rem; padding: 1rem 0; }
    </style>

    <div class="ob-header">
      <div>
        <div class="ob-title">📤 Unsent content</div>
        <div class="ob-subtitle">${items.length} item${items.length !== 1 ? 's' : ''} waiting — you were offline</div>
      </div>
      <button class="ob-close" id="ob-close-btn">✕</button>
    </div>

    <div class="ob-actions">
      <button class="ob-btn ob-btn-upload-all" id="ob-upload-all">Upload all</button>
      <button class="ob-btn ob-btn-trash-all"  id="ob-trash-all">Discard all</button>
    </div>

    <div class="ob-list" id="ob-list">
      ${items.map(item => `
        <div class="ob-item" data-id="${item.id}">
          <div class="ob-item-header">
            <span class="ob-type">${TYPE_LABELS[item.type] || item.type}</span>
            <span class="ob-time">${formatTime(item.ts)}</span>
          </div>
          <div class="ob-content">${escapeHtml(getPreview(item))}</div>
          <div class="ob-item-actions">
            <button class="ob-item-btn ob-item-upload" data-action="upload" data-id="${item.id}">↑ Upload</button>
            <button class="ob-item-btn ob-item-trash"  data-action="trash"  data-id="${item.id}">🗑 Discard</button>
          </div>
        </div>
      `).join('')}
    </div>
  `

  document.body.appendChild(panel)

  // ── Event handlers ──
  panel.querySelector('#ob-close-btn').onclick = () => panel.remove()

  panel.querySelector('#ob-trash-all').onclick = async () => {
    if (!confirm('Discard all unsent content?')) return
    for (const item of items) await dbDelete(item.id)
    panel.remove()
  }

  panel.querySelector('#ob-upload-all').onclick = async () => {
    const btns = panel.querySelectorAll('[data-action="upload"]')
    btns.forEach(b => b.click())
  }

  panel.addEventListener('click', async e => {
    const btn = e.target.closest('[data-action]')
    if (!btn) return
    const id = Number(btn.dataset.id)
    const itemEl = panel.querySelector(`.ob-item[data-id="${id}"]`)
    const item = items.find(i => i.id === id)
    if (!item || !itemEl) return

    if (btn.dataset.action === 'trash') {
      itemEl.style.transition = 'opacity 0.2s'
      itemEl.style.opacity = '0'
      await new Promise(r => setTimeout(r, 200))
      await dbDelete(id)
      itemEl.remove()
      checkEmpty()
    }

    if (btn.dataset.action === 'upload') {
      itemEl.classList.add('uploading')
      try {
        await uploadItem(item)
        await dbDelete(id)
        itemEl.classList.add('done')
        checkEmpty()
      } catch (err) {
        itemEl.classList.remove('uploading')
        itemEl.style.borderColor = '#ef4444'
        const errEl = document.createElement('div')
        errEl.style.cssText = 'font-size:0.75rem;color:#ef4444;margin-top:0.25rem'
        errEl.textContent = `Failed: ${err.message}`
        itemEl.appendChild(errEl)
      }
    }
  })

  function checkEmpty() {
    const remaining = panel.querySelectorAll('.ob-item:not(.done)').length
    if (remaining === 0) {
      panel.querySelector('#ob-list').innerHTML = '<div class="ob-empty">All done ✓</div>'
      setTimeout(() => panel.remove(), 1500)
    }
  }
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}

function getPreview(item) {
  const d = item.data || {}
  return d.content || d.message || d.text || d.body || JSON.stringify(d).slice(0, 120)
}

// ─── Public API ───────────────────────────────────────────────────────────────
export const outbox = {
  // Add an item to the outbox (call this instead of direct Supabase insert when offline)
  async add(item) {
    const id = await dbAdd(item)
    console.log('[Outbox] Queued:', item.type, 'id:', id)
    return id
  },

  // Check for pending items and show review panel if any
  async checkAndPrompt() {
    const items = await dbAll()
    if (items.length === 0) return
    console.log('[Outbox] Found', items.length, 'pending items')
    buildPanel(items)
  },

  // Get count of pending items
  async count() {
    const items = await dbAll()
    return items.length
  }
}

// ─── Auto-trigger on reconnect + app focus ───────────────────────────────────
let wasOffline = !navigator.onLine

window.addEventListener('online', async () => {
  if (wasOffline) {
    wasOffline = false
    // Small delay — let connection stabilise
    await new Promise(r => setTimeout(r, 1500))
    await outbox.checkAndPrompt()
  }
})

window.addEventListener('offline', () => { wasOffline = true })

// Also check on page load (catches case where user was offline, then reopened app)
window.addEventListener('load', async () => {
  if (navigator.onLine) {
    await new Promise(r => setTimeout(r, 500))
    await outbox.checkAndPrompt()
  }
})
