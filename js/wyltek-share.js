/**
 * wyltek-share.js — Web Share API wrapper
 * Falls back to clipboard copy on desktop browsers that don't support navigator.share
 */
window.wyShare = async function({ title, text, url } = {}) {
  const shareUrl = url || window.location.href;
  const shareTitle = title || document.title;
  const shareText = text || '';

  if (navigator.share) {
    try {
      await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
      return;
    } catch (e) {
      if (e.name === 'AbortError') return; // user cancelled — no fallback needed
    }
  }

  // Fallback: copy URL to clipboard + brief toast
  try {
    await navigator.clipboard.writeText(shareUrl);
    wyShareToast('🔗 Link copied!');
  } catch {
    prompt('Copy this link:', shareUrl);
  }
};

function wyShareToast(msg) {
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
  // Animate in
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
