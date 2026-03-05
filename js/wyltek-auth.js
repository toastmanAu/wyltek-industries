/**
 * wyltek-auth.js
 * Shared member session check. Include on every page.
 * - Injects member-only nav links if logged in
 * - Call requireMember() on protected pages to show login wall
 */

const MEMBER_NAV_LINKS = [
  { href: 'research.html',      label: 'Research' },
  { href: 'ckbfs-viewer.html',  label: 'CKBFS Viewer' },
  { href: 'ckb-dob-minter/',    label: 'DOB Minter' },
  { href: 'spore-burner.html',  label: '🔥 Burner' },
];

function isMember() {
  return localStorage.getItem('wyltek_authed') === '1' && !!localStorage.getItem('wyltek_address');
}

function injectMemberNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  if (isMember()) {
    // Add member-only links before GitHub link
    const ghLink = nav.querySelector('a[href*="github"]');
    MEMBER_NAV_LINKS.forEach(({ href, label }) => {
      if (nav.querySelector(`a[href="${href}"]`)) return; // already there
      const a = document.createElement('a');
      a.href = href;
      a.textContent = label;
      if (window.location.pathname.endsWith(href)) a.classList.add('active');
      nav.insertBefore(a, ghLink);
    });
    // Add member badge to Members link
    const membersLink = nav.querySelector('a[href="members.html"]');
    if (membersLink && !membersLink.querySelector('.member-pip')) {
      const pip = document.createElement('span');
      pip.className = 'member-pip';
      pip.style.cssText = 'display:inline-block;width:6px;height:6px;border-radius:50%;background:#00e5a0;margin-left:4px;vertical-align:middle';
      membersLink.appendChild(pip);
    }
  }
}

function requireMember() {
  if (isMember()) return true;

  // Replace page content with login wall
  const main = document.querySelector('main');
  if (main) {
    main.innerHTML = `
      <div style="max-width:480px;margin:4rem auto;text-align:center">
        <div style="font-size:2.5rem;margin-bottom:1rem">🔒</div>
        <h2 style="margin-bottom:.75rem">Members Only</h2>
        <p style="color:var(--muted,#64748b);margin-bottom:1.5rem">
          This page is available to Wyltek founding members. Connect with JoyID to access it.
        </p>
        <a href="members.html" style="display:inline-block;background:#7b5cfa;color:#fff;border-radius:8px;padding:.65rem 1.4rem;font-weight:700;text-decoration:none">
          🔐 Join / Sign In
        </a>
      </div>
    `;
  }
  return false;
}

document.addEventListener('DOMContentLoaded', injectMemberNav);
