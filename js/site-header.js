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

  // Navigation structure — top-level links show on desktop, groups collapse on mobile
  var navItems = [
    { href: '/', label: 'Home' },
    {
      label: 'Projects',
      children: [
        { href: '/fiberquest.html', label: 'FiberQuest' },
        { href: '/games.html', label: 'Games' },
        { href: '/nervos-launcher.html', label: 'Launcher' },
        { href: '/blackbox.html', label: 'BlackBox' },
        { href: '/hardware.html', label: 'Hardware' },
      ],
    },
    {
      label: 'CKB',
      children: [
        { href: '/ckb.html', label: 'CKB Overview' },
        { href: '/ckb-light-esp.html', label: 'Light Client' },
        { href: '/ckb-sync.html', label: 'Sync', memberOnly: true },
        { href: '/flasher.html', label: 'Flasher', memberOnly: true },
        { href: '/mint/', label: 'Mint', memberOnly: true, external: true },
      ],
    },
    { href: '/ai-hub/', label: 'AI Hub' },
    { href: '/roadmap.html', label: 'Roadmap' },
    {
      label: 'Members',
      memberOnly: true,
      children: [
        { href: '/research.html', label: 'Research' },
        { href: '/blog.html', label: 'Devlog' },
        { href: '/resources.html', label: 'Resources' },
      ],
    },
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

  function buildLink(link) {
    var a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.label;
    if (link.external) a.target = '_blank';
    if (link.memberOnly) a.className = 'member-only';
    if (link.className) a.className = (a.className ? a.className + ' ' : '') + link.className;
    if (isActive(link.href)) a.classList.add('active');
    return a;
  }

  navItems.forEach(function (item) {
    if (item.children) {
      // Group with submenu
      var group = document.createElement('div');
      group.className = 'nav-group';
      if (item.memberOnly) group.classList.add('member-only');

      // Check if any child is active
      var hasActiveChild = item.children.some(function (child) {
        return isActive(child.href);
      });

      // Desktop: top-level label that opens dropdown on hover
      var trigger = document.createElement('button');
      trigger.className = 'nav-group-trigger';
      trigger.textContent = item.label;
      if (hasActiveChild) trigger.classList.add('active');

      var arrow = document.createElement('span');
      arrow.className = 'nav-arrow';
      arrow.textContent = '\u25BE'; // ▾
      trigger.appendChild(arrow);

      var submenu = document.createElement('div');
      submenu.className = 'nav-submenu';

      item.children.forEach(function (child) {
        submenu.appendChild(buildLink(child));
      });

      // Toggle on click (mobile)
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = group.classList.contains('sub-open');
        // Close all other open groups
        nav.querySelectorAll('.nav-group.sub-open').forEach(function (g) {
          g.classList.remove('sub-open');
        });
        if (!isOpen) group.classList.add('sub-open');
      });

      group.appendChild(trigger);
      group.appendChild(submenu);
      nav.appendChild(group);
    } else {
      nav.appendChild(buildLink(item));
    }
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
      /* Nav groups — desktop: dropdown on hover */
      '#siteHeaderEl .nav-group {',
      '  position: relative;',
      '}',
      '#siteHeaderEl .nav-group-trigger {',
      '  background: none; border: none; cursor: pointer;',
      '  color: var(--muted, #64748b); font-size: 0.9rem;',
      '  font-family: inherit; transition: color 0.2s;',
      '  display: flex; align-items: center; gap: 0.2rem;',
      '  padding: 0;',
      '}',
      '#siteHeaderEl .nav-group-trigger:hover,',
      '#siteHeaderEl .nav-group-trigger.active {',
      '  color: var(--text, #e2e8f0);',
      '}',
      '#siteHeaderEl .nav-arrow { font-size: 0.7rem; margin-left: 0.15rem; }',
      '#siteHeaderEl .nav-submenu {',
      '  display: none; position: absolute; top: 100%; left: -0.5rem;',
      '  background: var(--surface, #111318);',
      '  border: 1px solid var(--border, #1e2430);',
      '  border-radius: 8px; padding: 0.4rem 0;',
      '  min-width: 160px; z-index: 200;',
      '  box-shadow: 0 8px 24px rgba(0,0,0,0.4);',
      '  margin-top: 0.5rem;',
      '}',
      '#siteHeaderEl .nav-group:hover .nav-submenu { display: block; }',
      '#siteHeaderEl .nav-submenu a {',
      '  display: block; padding: 0.5rem 1rem; white-space: nowrap;',
      '}',
      '#siteHeaderEl .nav-submenu a:hover {',
      '  background: var(--surface2, #181c23);',
      '}',
      /* Mobile */
      '@media (max-width: 700px) {',
      '  #siteHeaderEl nav {',
      '    display: none; flex-direction: column; gap: 0;',
      '    position: absolute; top: 100%; left: 0; right: 0;',
      '    background: var(--surface, #111318);',
      '    border-bottom: 1px solid var(--border, #1e2430);',
      '    padding: 0.5rem 0; z-index: 999;',
      '    max-height: 80vh; overflow-y: auto;',
      '  }',
      '  #siteHeaderEl nav.open { display: flex; }',
      '  #siteHeaderEl nav > a,',
      '  #siteHeaderEl .nav-group-trigger {',
      '    padding: 0.7rem 1.5rem; font-size: 1rem; width: 100%;',
      '    border-bottom: 1px solid var(--border, #1e2430);',
      '    text-align: left;',
      '  }',
      '  #siteHeaderEl .nav-group { border-bottom: none; }',
      '  #siteHeaderEl .nav-group-trigger {',
      '    justify-content: space-between;',
      '  }',
      '  #siteHeaderEl .nav-arrow {',
      '    transition: transform 0.2s;',
      '  }',
      '  #siteHeaderEl .nav-group.sub-open .nav-arrow {',
      '    transform: rotate(180deg);',
      '  }',
      '  #siteHeaderEl .nav-submenu {',
      '    position: static; border: none; border-radius: 0;',
      '    box-shadow: none; margin-top: 0; min-width: 0;',
      '    background: var(--bg, #0a0c0f);',
      '    display: none;',
      '  }',
      '  #siteHeaderEl .nav-group:hover .nav-submenu { display: none; }',
      '  #siteHeaderEl .nav-group.sub-open .nav-submenu { display: block; }',
      '  #siteHeaderEl .nav-submenu a {',
      '    padding: 0.6rem 1.5rem 0.6rem 2.5rem; font-size: 0.95rem;',
      '    border-bottom: 1px solid var(--border, #1e2430);',
      '  }',
      '  #siteHeaderEl .nav-toggle { display: block; }',
      '}',
    ].join('\n');
    document.head.appendChild(style);
  }
})();
