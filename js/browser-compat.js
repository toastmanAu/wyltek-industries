/**
 * browser-compat.js
 * Lightweight browser compatibility indicator widget.
 * Detects the current browser and highlights its support status.
 *
 * Usage:
 *   <div id="compat"></div>
 *   <script src="/js/browser-compat.js"></script>
 *   <script>
 *     new BrowserCompat('#compat', 'node-finder');
 *   </script>
 *
 * Preset IDs: 'node-finder', 'web-serial', 'dob-minter'
 */

'use strict';

const COMPAT_DATA = {
  'node-finder': {
    title: 'Browser Compatibility — CKB Node Finder',
    note: 'Uses <code>fetch()</code> to probe localhost and LAN addresses. Privacy-focused browsers restrict LAN access.',
    browsers: [
      { name: 'Chrome',          icon: '🟡', share: '~66%', status: 'full',    note: 'localhost ✓ · LAN requires one-time Allow prompt' },
      { name: 'Safari',          icon: '🔵', share: '~17%', status: 'partial', note: 'macOS ✓ · iOS may block localhost (ATS policy)' },
      { name: 'Edge',            icon: '🔵', share: '~5%',  status: 'full',    note: 'Same as Chrome (Chromium)' },
      { name: 'Firefox',         icon: '🟠', share: '~3%',  status: 'full',    note: 'localhost ✓ · LAN ✓ (no LNA restrictions)' },
      { name: 'Samsung Internet',icon: '🔵', share: '~2%',  status: 'full',    note: 'Chromium-based, same as Chrome' },
      { name: 'Opera',           icon: '🔴', share: '~2%',  status: 'full',    note: 'Chromium-based, same as Chrome' },
      { name: 'Brave',           icon: '🦁', share: '~1%',  status: 'partial', note: 'localhost ✓ · LAN blocked by Shields (enter IP manually)' },
      { name: 'Arc',             icon: '⬛', share: '~1%',  status: 'full',    note: 'Chromium-based, same as Chrome' },
      { name: 'Vivaldi',         icon: '🔴', share: '<1%',  status: 'full',    note: 'Chromium-based · check Shields settings' },
      { name: 'UC Browser',      icon: '🟠', share: '<1%',  status: 'unknown', note: 'Mixed engine — untested' },
    ],
  },

  'web-serial': {
    title: 'Browser Compatibility — Web Serial (Flasher)',
    note: 'Uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API" target="_blank">Web Serial API</a> (<code>navigator.serial</code>) to flash firmware over USB. Only Chromium-based browsers support this.',
    browsers: [
      { name: 'Chrome',          icon: '🟡', share: '~66%', status: 'full',    note: 'Full support since Chrome 89' },
      { name: 'Safari',          icon: '🔵', share: '~17%', status: 'none',    note: 'Not supported · use Chrome or Edge' },
      { name: 'Edge',            icon: '🔵', share: '~5%',  status: 'full',    note: 'Full support since Edge 89' },
      { name: 'Firefox',         icon: '🟠', share: '~3%',  status: 'none',    note: 'Not supported · use Chrome or Edge' },
      { name: 'Samsung Internet',icon: '🔵', share: '~2%',  status: 'none',    note: 'Not supported on Samsung Internet' },
      { name: 'Opera',           icon: '🔴', share: '~2%',  status: 'full',    note: 'Chromium-based, supported' },
      { name: 'Brave',           icon: '🦁', share: '~1%',  status: 'full',    note: 'Supported — Shields does not block Serial' },
      { name: 'Arc',             icon: '⬛', share: '~1%',  status: 'full',    note: 'Chromium-based, supported' },
      { name: 'Vivaldi',         icon: '🔴', share: '<1%',  status: 'full',    note: 'Chromium-based, supported' },
      { name: 'UC Browser',      icon: '🟠', share: '<1%',  status: 'none',    note: 'Not supported' },
    ],
  },

  'dob-minter': {
    title: 'Browser Compatibility — CKB DOB Minter',
    note: 'Uses <code>fetch()</code> for node discovery and <a href="https://joyid.dev" target="_blank">JoyID</a> passkey signing. JoyID requires WebAuthn, which is broadly supported.',
    browsers: [
      { name: 'Chrome',          icon: '🟡', share: '~66%', status: 'full',    note: 'Full support · localhost auto-discovered' },
      { name: 'Safari',          icon: '🔵', share: '~17%', status: 'full',    note: 'Full support · WebAuthn/passkey native on Apple devices' },
      { name: 'Edge',            icon: '🔵', share: '~5%',  status: 'full',    note: 'Full support' },
      { name: 'Firefox',         icon: '🟠', share: '~3%',  status: 'full',    note: 'Full support · WebAuthn supported since Firefox 60' },
      { name: 'Samsung Internet',icon: '🔵', share: '~2%',  status: 'full',    note: 'Full support on Android' },
      { name: 'Opera',           icon: '🔴', share: '~2%',  status: 'full',    note: 'Full support' },
      { name: 'Brave',           icon: '🦁', share: '~1%',  status: 'partial', note: 'Full support · enter node IP manually (LAN scan blocked)' },
      { name: 'Arc',             icon: '⬛', share: '~1%',  status: 'full',    note: 'Full support' },
      { name: 'Vivaldi',         icon: '🔴', share: '<1%',  status: 'full',    note: 'Full support' },
      { name: 'UC Browser',      icon: '🟠', share: '<1%',  status: 'unknown', note: 'Untested' },
    ],
  },
};

const STATUS = {
  full:    { label: '✓ Full',    color: '#00e5a0', bg: 'rgba(0,229,160,.08)', border: 'rgba(0,229,160,.25)' },
  partial: { label: '⚠ Partial', color: '#ff8c42', bg: 'rgba(255,140,66,.08)', border: 'rgba(255,140,66,.25)' },
  none:    { label: '✗ None',    color: '#ff4560', bg: 'rgba(255,69,96,.08)',  border: 'rgba(255,69,96,.25)'  },
  unknown: { label: '? Unknown', color: '#64748b', bg: 'rgba(100,116,139,.08)', border: 'rgba(100,116,139,.25)' },
};

function detectBrowser() {
  const ua = navigator.userAgent.toLowerCase();
  const brands = (navigator.userAgentData?.brands || []).map(b => b.brand.toLowerCase());
  if (navigator.brave) return 'Brave';
  if (ua.includes('edg/')) return 'Edge';
  if (ua.includes('opr/') || ua.includes('opera')) return 'Opera';
  if (ua.includes('samsungbrowser')) return 'Samsung Internet';
  if (ua.includes('vivaldi')) return 'Vivaldi';
  if (ua.includes('ucbrowser')) return 'UC Browser';
  if (brands.some(b => b.includes('arc')) || ua.includes('arc/')) return 'Arc';
  if (ua.includes('firefox/')) return 'Firefox';
  if (ua.includes('safari/') && !ua.includes('chrome')) return 'Safari';
  if (ua.includes('chrome/')) return 'Chrome';
  return null;
}

class BrowserCompat {
  constructor(selector, preset) {
    this.el   = typeof selector === 'string' ? document.querySelector(selector) : selector;
    this.data = COMPAT_DATA[preset];
    this.current = detectBrowser();
    if (this.el && this.data) this._render();
  }

  _render() {
    const { title, note, browsers } = this.data;
    const currentStatus = browsers.find(b => b.name === this.current);

    let rows = browsers.map(b => {
      const s   = STATUS[b.status];
      const isCurrent = b.name === this.current;
      return `<tr style="background:${isCurrent ? 'rgba(0,200,255,.05)' : 'transparent'}">
        <td style="padding:7px 12px;font-size:.88rem;white-space:nowrap">
          ${b.icon} <strong>${b.name}</strong>${isCurrent ? ' <span style="font-size:.72rem;background:rgba(0,200,255,.15);color:#00c8ff;padding:1px 6px;border-radius:4px;margin-left:4px">you</span>' : ''}
        </td>
        <td style="padding:7px 12px;font-size:.75rem;color:#64748b">${b.share}</td>
        <td style="padding:7px 12px">
          <span style="font-size:.78rem;font-weight:700;color:${s.color};background:${s.bg};border:1px solid ${s.border};padding:2px 8px;border-radius:5px;white-space:nowrap">${s.label}</span>
        </td>
        <td style="padding:7px 12px;font-size:.82rem;color:#94a3b8">${b.note}</td>
      </tr>`;
    }).join('');

    this.el.innerHTML = `
      <div style="margin-top:1.5rem;font-family:system-ui,sans-serif;">
        <details>
          <summary style="cursor:pointer;font-size:.82rem;font-weight:600;color:#64748b;
            list-style:none;display:flex;align-items:center;gap:.5rem;user-select:none;padding:.4rem 0;">
            <span style="font-size:.7rem">▶</span>
            Browser compatibility
            ${currentStatus ? `<span style="font-size:.75rem;color:${STATUS[currentStatus.status].color}">
              — ${this.current || 'unknown'}: ${STATUS[currentStatus.status].label}</span>` : ''}
          </summary>
          <div style="margin-top:.8rem;background:#111318;border:1px solid #1e2430;border-radius:10px;overflow:hidden;">
            <div style="padding:.8rem 1rem;font-size:.8rem;color:#64748b;border-bottom:1px solid #1e2430;line-height:1.5">
              ${note}
            </div>
            <div style="overflow-x:auto;">
              <table style="width:100%;border-collapse:collapse;">
                <thead>
                  <tr style="border-bottom:1px solid #1e2430">
                    <th style="padding:7px 12px;font-size:.72rem;text-align:left;color:#64748b;text-transform:uppercase;letter-spacing:.06em">Browser</th>
                    <th style="padding:7px 12px;font-size:.72rem;text-align:left;color:#64748b;text-transform:uppercase;letter-spacing:.06em">Share</th>
                    <th style="padding:7px 12px;font-size:.72rem;text-align:left;color:#64748b;text-transform:uppercase;letter-spacing:.06em">Support</th>
                    <th style="padding:7px 12px;font-size:.72rem;text-align:left;color:#64748b;text-transform:uppercase;letter-spacing:.06em">Notes</th>
                  </tr>
                </thead>
                <tbody>${rows}</tbody>
              </table>
            </div>
          </div>
        </details>
      </div>`;

    // Fix summary arrow toggle
    this.el.querySelector('details')?.addEventListener('toggle', e => {
      const arrow = e.target.querySelector('summary span');
      if (arrow) arrow.textContent = e.target.open ? '▼' : '▶';
    });
  }
}

if (typeof module !== 'undefined') module.exports = { BrowserCompat, COMPAT_DATA };
else window.BrowserCompat = BrowserCompat;
