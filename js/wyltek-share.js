/**
 * wyltek-share.js — Web Share API wrapper + Supabase share event tracking
 * Falls back to clipboard copy on desktop browsers that don't support navigator.share
 *
 * Tracks:
 *   'share'  — user clicked the share button
 *   'visit'  — user arrived via a share link (has ?via=share or #task-id from referrer)
 */

const _SB_URL = 'https://yhntwgjzrzyhyxpiqcts.supabase.co';
const _SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlobnR3Z2p6cnp5aHl4cGlxY3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1Mjc2ODMsImV4cCI6MjA4ODEwMzY4M30.HhTEKmSQs-qaOhoQr4cJxRfTfpWEjGqB3TwQnRWCm4Y';

async function _logShareEvent(payload) {
  try {
    await fetch(`${_SB_URL}/rest/v1/share_events`, {
      method: 'POST',
      headers: {
        'apikey': _SB_KEY,
        'Authorization': `Bearer ${_SB_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        ...payload,
        user_agent: (navigator.userAgent || '').slice(0, 200),
        wallet_address: localStorage.getItem('wyltek_address') || null,
      })
    });
  } catch { /* silent — never break UX */ }
}

window.wyShare = async function({ title, text, url, page, itemId } = {}) {
  const shareUrl = url || window.location.href;
  const shareTitle = title || document.title;
  const shareText = text || '';
  const sharePage = page || _detectPage();
  const shareItem = itemId || _detectItem(shareUrl);

  // Log the share click
  _logShareEvent({ event_type: 'share', page: sharePage, item_id: shareItem, referrer: document.referrer });

  if (navigator.share) {
    try {
      await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
      return;
    } catch (e) {
      if (e.name === 'AbortError') return; // user cancelled — no fallback
    }
  }

  // Fallback: clipboard
  try {
    await navigator.clipboard.writeText(shareUrl);
    _wyShareToast('🔗 Link copied!');
  } catch {
    prompt('Copy this link:', shareUrl);
  }
};

function _detectPage() {
  const p = location.pathname;
  if (p.includes('research')) return 'research';
  if (p.includes('roadmap')) return 'roadmap';
  if (p.includes('members')) return 'members';
  if (p === '/' || p.includes('index')) return 'home';
  return p.replace(/^\//, '').replace('.html', '') || 'unknown';
}

function _detectItem(url) {
  // Extract #task-id from research URLs, or last path segment for others
  try {
    const u = new URL(url);
    if (u.hash) return u.hash.replace('#', '');
    const seg = u.pathname.split('/').filter(Boolean).pop();
    return seg || null;
  } catch { return null; }
}

// ── Track inbound share visits ────────────────────────────────────────────────
// Fire on page load if: arrived via a share link (referrer is social/messaging)
// or URL has a #hash that looks like a task-id (not a UI section)
(function _trackShareVisit() {
  const hash = location.hash.replace('#', '');
  const ref  = document.referrer;
  const isDeepLink = hash && hash.includes('-') && !['top','about','projects','research','roadmap'].includes(hash);
  const shareReferrers = ['t.me','twitter.com','x.com','whatsapp','discord','telegram','linkedin','facebook','slack'];
  const isFromShare = shareReferrers.some(s => ref.includes(s));

  if (isDeepLink || isFromShare) {
    _logShareEvent({
      event_type: 'visit',
      page: _detectPage(),
      item_id: isDeepLink ? hash : null,
      referrer: ref.slice(0, 500),
    });
  }
})();

function _wyShareToast(msg) {
  let el = document.getElementById('wy-share-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'wy-share-toast';
    el.style.cssText = [
      'position:fixed','bottom:1.5rem','left:50%','transform:translateX(-50%) translateY(2rem)',
      'background:#1a1a2e','color:#e2e8f0','border:1px solid rgba(255,255,255,.15)',
      'border-radius:8px','padding:.5rem 1.1rem','font-size:.85rem','font-weight:600',
      'box-shadow:0 4px 20px rgba(0,0,0,.4)','z-index:99999',
      'transition:transform .2s ease,opacity .2s ease','opacity:0','pointer-events:none'
    ].join(';');
    document.body.appendChild(el);
  }
  el.textContent = msg;
  requestAnimationFrame(() => {
    el.style.transform = 'translateX(-50%) translateY(0)';
    el.style.opacity = '1';
  });
  clearTimeout(el._t);
  el._t = setTimeout(() => {
    el.style.transform = 'translateX(-50%) translateY(2rem)';
    el.style.opacity = '0';
  }, 2200);
}
