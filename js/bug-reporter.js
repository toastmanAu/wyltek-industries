/**
 * bug-reporter.js
 * Injects a floating 🪲 bug report button for members only.
 * Include on every page (after wyltek-auth.js).
 * Excluded from: bug-report.html itself, members.html login flow.
 */
(function () {
  // Only show for logged-in members
  const addr = localStorage.getItem('wyltek_address');
  const authed = localStorage.getItem('wyltek_authed') === '1';
  if (!addr || !authed) return;

  // Don't show on the bug report page itself
  if (location.pathname.includes('bug-report.html')) return;

  // ── Inject styles ──────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #bug-btn {
      position: fixed;
      bottom: 22px;
      right: 22px;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: #111318;
      border: 1px solid #1e2430;
      color: #fff;
      font-size: 1.35rem;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 18px rgba(0,0,0,.5);
      z-index: 9999;
      transition: transform .15s, border-color .15s, box-shadow .15s;
      text-decoration: none;
    }
    #bug-btn:hover {
      transform: scale(1.12);
      border-color: #7b5cfa;
      box-shadow: 0 4px 24px rgba(123,92,250,.35);
    }
    #bug-btn title { display: none; }

    @media (max-width: 600px) {
      #bug-btn { bottom: 16px; right: 16px; width: 42px; height: 42px; font-size: 1.2rem; }
    }
  `;
  document.head.appendChild(style);

  // ── Inject button ──────────────────────────────────────────────────────
  const btn = document.createElement('a');
  btn.id = 'bug-btn';
  btn.title = 'Report a bug';
  btn.setAttribute('aria-label', 'Report a bug');

  // Encode current page path for the report form
  const currentPage = encodeURIComponent(location.pathname + location.search);
  btn.href = `/bug-report.html?page=${currentPage}`;

  btn.textContent = '🪲';
  document.body.appendChild(btn);
})();
