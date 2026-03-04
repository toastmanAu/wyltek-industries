/**
 * profile-banner.js
 * Persistent "complete your profile" nudge banner.
 * - Shows on all member pages if profile is incomplete and user hasn't dismissed it
 * - Tapping takes them to profile.html
 * - Disappears once they set skip_banner=true OR fill in display_name
 * - Checks Supabase max once per session (cached in sessionStorage)
 */
(function () {
  const addr = localStorage.getItem('wyltek_address');
  if (!addr) return; // not a member
  if (localStorage.getItem('wyltek_skip_banner') === '1') return; // dismissed

  // Don't show on profile page itself
  if (location.pathname.includes('profile.html')) return;

  const SESSION_KEY = 'wyltek_profile_checked';
  const cached = sessionStorage.getItem(SESSION_KEY);

  // If we already checked this session and profile is complete — bail
  if (cached === 'complete') return;

  const SB_URL = 'https://yhntwgjzrzyhyxpiqcts.supabase.co';
  const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlobnR3Z2p6cnp5aHl4cGlxY3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1Mjc2ODMsImV4cCI6MjA4ODEwMzY4M30.HhTEKmSQs-qaOhoQr4cJxRfTfpWEjGqB3TwQnRWCm4Y';

  async function check() {
    try {
      const res = await fetch(
        `${SB_URL}/rest/v1/profiles?ckb_address=eq.${encodeURIComponent(addr)}&select=display_name,skip_banner&limit=1`,
        { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } }
      );
      const rows = await res.json();
      const profile = rows[0];

      // Profile complete if they have a display_name OR have set skip_banner
      if (profile && (profile.display_name || profile.skip_banner)) {
        sessionStorage.setItem(SESSION_KEY, 'complete');
        if (profile.skip_banner) localStorage.setItem('wyltek_skip_banner', '1');
        return; // no banner needed
      }

      showBanner();
    } catch (e) {
      // Network error — show banner anyway (safe default)
      showBanner();
    }
  }

  function showBanner() {
    if (document.getElementById('profile-banner')) return; // already shown

    const banner = document.createElement('div');
    banner.id = 'profile-banner';
    banner.setAttribute('role', 'banner');
    banner.innerHTML = `
      <span class="pb-icon">🦞</span>
      <span class="pb-text">Welcome, Founding Member — your profile is empty. <strong>Complete your profile →</strong></span>
      <button class="pb-dismiss" title="Dismiss" onclick="event.stopPropagation();dismissBanner()">✕</button>
    `;
    banner.onclick = () => { location.href = '/profile.html'; };

    // Styles injected inline so no external CSS dependency
    const style = document.createElement('style');
    style.textContent = `
      #profile-banner {
        position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;
        background: linear-gradient(90deg, #0d1a26, #0a1f2e);
        border-top: 1px solid rgba(0,200,255,.25);
        display: flex; align-items: center; gap: .75rem;
        padding: .6rem 1.25rem;
        cursor: pointer;
        animation: pb-slide-up .35s ease;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: .85rem;
        color: #94a3b8;
      }
      #profile-banner:hover { background: #0f2030; }
      .pb-icon { font-size: 1.1rem; flex-shrink: 0; }
      .pb-text { flex: 1; line-height: 1.4; }
      .pb-text strong { color: #00c8ff; }
      .pb-dismiss {
        background: none; border: none; color: #475569;
        font-size: .9rem; cursor: pointer; padding: .2rem .4rem;
        border-radius: 4px; flex-shrink: 0;
        transition: color .15s;
      }
      .pb-dismiss:hover { color: #94a3b8; }
      @keyframes pb-slide-up {
        from { transform: translateY(100%); opacity: 0; }
        to   { transform: translateY(0);    opacity: 1; }
      }
      /* Nudge scroll padding so content isn't hidden behind banner */
      body { padding-bottom: 3rem !important; }
    `;
    document.head.appendChild(style);
    document.body.appendChild(banner);
  }

  window.dismissBanner = function () {
    // Temporary dismiss for this session only (not permanent — use profile page for that)
    sessionStorage.setItem(SESSION_KEY, 'complete');
    const b = document.getElementById('profile-banner');
    if (b) b.remove();
  };

  // Run check after page load to avoid blocking render
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', check);
  } else {
    check();
  }
})();
