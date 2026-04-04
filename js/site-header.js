/**
 * site-header.js
 * Single source of truth for the Wyltek Industries site header + navigation.
 *
 * Usage: Add to any page:
 *   <div id="site-header"></div>
 *   <script src="/js/site-header.js"></script>
 *
 * The script auto-detects the current page and sets the active nav link.
 * Member-only links are hidden by default; member-nav.js toggles them.
 * Mobile hamburger menu is handled inline — no need for nav-toggle.js.
 */
(function () {
  var currentPath = window.location.pathname;

  // Determine active link
  function isActive(href) {
    if (href === '/') return currentPath === '/' || currentPath === '/index.html';
    if (href.endsWith('/')) return currentPath.startsWith(href);
    return currentPath === href;
  }

  // Build nav links
  var links = [
    { href: '/', label: 'Home' },
    { href: '/hardware.html', label: 'Hardware' },
    { href: '/ckb.html', label: 'CKB' },
    { href: '/ckb-light-esp.html', label: 'Light Client' },
    { href: '/blackbox.html', label: 'BlackBox' },
    { href: '/roadmap.html', label: 'Roadmap' },
    { href: '/fiberquest.html', label: 'FiberQuest' },
    { href: '/nervos-launcher.html', label: 'Launcher' },
    { href: '/research.html', label: 'Research', memberOnly: true },
    { href: '/blog.html', label: 'Devlog', memberOnly: true },
    { href: '/resources.html', label: 'Resources', memberOnly: true },
    { href: '/mint/', label: 'Mint', memberOnly: true, external: true },
    { href: '/flasher.html', label: 'Flasher', memberOnly: true },
    { href: '/ckb-sync.html', label: 'Sync', memberOnly: true },
    { href: '/ai-hub/', label: 'AI Hub' },
    { href: '/members.html', label: 'Join / Sign In', className: 'nav-join' },
    { href: 'https://github.com/toastmanAu', label: 'GitHub', external: true },
  ];

  // Build nav HTML using DOM methods
  var header = document.createElement('header');
  header.setAttribute('id', 'siteHeaderEl');

  var inner = document.createElement('div');
  inner.className = 'header-inner';

  // Logo
  var logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'logo';
  var logoImg = document.createElement('img');
  logoImg.src = '/wyltek-mark.png';
  logoImg.alt = 'Wyltek';
  logoImg.style.cssText = 'width:28px;height:28px;border-radius:7px;object-fit:cover;';
  logoImg.onerror = function() { this.style.display = 'none'; };
  logoLink.appendChild(logoImg);
  logoLink.appendChild(document.createTextNode(' Wyltek Industries'));
  inner.appendChild(logoLink);

  // Nav
  var nav = document.createElement('nav');
  nav.id = 'mainNav';

  links.forEach(function (link) {
    var a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.label;
    if (link.external) a.target = '_blank';
    if (link.memberOnly) a.className = 'member-only';
    if (link.className) a.className = (a.className ? a.className + ' ' : '') + link.className;
    if (isActive(link.href)) a.classList.add('active');
    nav.appendChild(a);
  });

  inner.appendChild(nav);

  // Hamburger button
  var toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.id = 'navToggle';
  toggle.setAttribute('aria-label', 'Toggle menu');
  toggle.textContent = '\u2630'; // ☰
  inner.appendChild(toggle);

  header.appendChild(inner);

  // Inject into page
  var target = document.getElementById('site-header');
  if (target) {
    target.appendChild(header);
  }

  // ── Hamburger menu logic (replaces nav-toggle.js) ──────────
  function openNav() {
    nav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    nav.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    nav.classList.contains('open') ? closeNav() : openNav();
  });

  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== toggle) {
      closeNav();
    }
  });

  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeNav();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  // ── Inject header CSS (only once) ──────────────────────────
  if (!document.getElementById('site-header-css')) {
    var style = document.createElement('style');
    style.id = 'site-header-css';
    style.textContent = [
      '#siteHeaderEl {',
      '  border-bottom: 1px solid var(--border, #1e2430);',
      '  padding: 0 2rem;',
      '  position: sticky; top: 0;',
      '  background: rgba(10,12,15,0.93);',
      '  backdrop-filter: blur(12px);',
      '  z-index: 100;',
      '}',
      '#siteHeaderEl .header-inner {',
      '  max-width: 1100px; margin: 0 auto;',
      '  display: flex; align-items: center; justify-content: space-between;',
      '  height: 60px; position: relative;',
      '}',
      '#siteHeaderEl .logo {',
      '  display: flex; align-items: center; gap: 10px;',
      '  font-weight: 700; font-size: 1.1rem; letter-spacing: 0.02em;',
      '  color: var(--text, #e2e8f0); text-decoration: none;',
      '}',
      '#siteHeaderEl nav { display: flex; gap: 1.5rem; }',
      '#siteHeaderEl nav a {',
      '  color: var(--muted, #64748b); font-size: 0.9rem;',
      '  transition: color 0.2s; text-decoration: none;',
      '}',
      '#siteHeaderEl nav a:hover,',
      '#siteHeaderEl nav a.active { color: var(--text, #e2e8f0); }',
      '#siteHeaderEl .member-only { display: none !important; }',
      '#mainNav.member-nav .member-only { display: inline-flex !important; }',
      '#siteHeaderEl .nav-join {',
      '  color: var(--accent, #00c8ff) !important; font-weight: 600;',
      '  border: 1px solid rgba(0,200,255,.3); border-radius: 99px;',
      '  padding: .15rem .65rem;',
      '}',
      '#siteHeaderEl .nav-toggle {',
      '  display: none; background: none; border: none;',
      '  color: var(--text, #e2e8f0); font-size: 1.5rem;',
      '  cursor: pointer; padding: 0.5rem;',
      '}',
      '@media (max-width: 700px) {',
      '  #siteHeaderEl nav {',
      '    display: none; flex-direction: column; gap: 0;',
      '    position: absolute; top: 100%; left: 0; right: 0;',
      '    background: var(--surface, #111318);',
      '    border-bottom: 1px solid var(--border, #1e2430);',
      '    padding: 0.5rem 0; z-index: 999;',
      '  }',
      '  #siteHeaderEl nav.open { display: flex; }',
      '  #siteHeaderEl nav a {',
      '    padding: 0.7rem 1.5rem; font-size: 1rem;',
      '    border-bottom: 1px solid var(--border, #1e2430);',
      '  }',
      '  #siteHeaderEl nav a:last-child { border-bottom: none; }',
      '  #siteHeaderEl .nav-toggle { display: block; }',
      '}',
    ].join('\n');
    document.head.appendChild(style);
  }
})();
