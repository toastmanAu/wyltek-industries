/**
 * nav-toggle.js
 * Handles mobile hamburger menu open/close + body scroll lock.
 * Include near </body> on every page.
 */
(function () {
  var btn = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav') || document.getElementById('navLinks');
  if (!btn || !nav) return;

  function openNav() {
    nav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    nav.classList.remove('open');
    document.body.style.overflow = '';
  }
  function toggleNav() {
    nav.classList.contains('open') ? closeNav() : openNav();
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleNav();
  });

  // Close on outside click / tap
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== btn) {
      closeNav();
    }
  });

  // Close on nav link tap (mobile)
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeNav();
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });
})();
