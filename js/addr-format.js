/**
 * addr-format.js — Shared CKB address formatting utilities
 *
 * shortAddr(address) → "ckb1qzda…sp8phrw"
 * Shows prefix (human-readable network tag) + first 4 data chars + … + last 6 chars.
 * Format mirrors what you see in CKB wallets and explorers.
 *
 * Full address is NEVER rendered in DOM text visible to other users.
 * The profile page is the only place the user can see/copy their own full address.
 */

/**
 * Format a CKB/CKT address for public display.
 * Keeps the bech32 prefix (ckb1 / ckt1) + 4 chars + … + 6 char checksum tail.
 *
 * Examples:
 *   ckb1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsq...sp8phrw
 *   → ckb1qzda…sp8phrw
 *
 * @param {string} addr  Full CKB address
 * @param {number} [head=8]  Chars to show from start (default 8 = "ckb1qzda")
 * @param {number} [tail=6]  Chars to show from end (last 6 = bech32 checksum)
 * @returns {string}
 */
export function shortAddr(addr, head = 8, tail = 6) {
  if (!addr) return 'unknown';
  if (addr.length <= head + tail + 3) return addr; // already short enough
  return addr.slice(0, head) + '…' + addr.slice(-tail);
}

/**
 * Render a copyable address element.
 * Returns an HTML string: shortened address + clipboard icon.
 * Clicking copies the full address to clipboard.
 *
 * Usage in template literals:
 *   element.innerHTML = addrHtml(address);
 *
 * @param {string} addr
 * @param {object} [opts]
 * @param {string} [opts.className]  extra CSS class
 * @returns {string} HTML string
 */
export function addrHtml(addr, { className = '' } = {}) {
  const short = shortAddr(addr);
  const escaped = addr.replace(/'/g, "\\'");
  return `<span class="addr-display ${className}" title="${addr}">
    <span class="addr-short">${short}</span>
    <button class="addr-copy-btn" onclick="copyAddr('${escaped}',this)" title="Copy full address">⧉</button>
  </span>`;
}

/**
 * Copy a full address to clipboard — called by addrHtml() buttons.
 * Shows brief ✓ feedback on the button.
 */
window.copyAddr = async function (addr, btn) {
  try {
    await navigator.clipboard.writeText(addr);
    const orig = btn.textContent;
    btn.textContent = '✓';
    btn.style.color = 'var(--green, #00e5a0)';
    setTimeout(() => { btn.textContent = orig; btn.style.color = ''; }, 1500);
  } catch {
    // Fallback for Safari/iOS
    const ta = document.createElement('textarea');
    ta.value = addr;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
};

// ── Shared CSS (injected once) ────────────────────────────────────────────────
(function injectAddrStyles() {
  if (document.getElementById('addr-format-styles')) return;
  const s = document.createElement('style');
  s.id = 'addr-format-styles';
  s.textContent = `
    .addr-display { display: inline-flex; align-items: center; gap: .3rem; }
    .addr-short   { font-family: monospace; font-size: .82rem; color: var(--text, #e2e8f0); }
    .addr-copy-btn {
      background: none; border: none; color: var(--muted, #64748b);
      font-size: .75rem; cursor: pointer; padding: 0 .15rem;
      transition: color .15s; line-height: 1;
    }
    .addr-copy-btn:hover { color: var(--accent, #00c8ff); }
  `;
  document.head.appendChild(s);
})();
