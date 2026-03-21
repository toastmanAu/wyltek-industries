/**
 * member-nav.js
 * Shows member-only nav links when the user is logged in.
 * Works with both nav patterns on the site.
 * Watches for auth changes (login/logout) and updates nav dynamically.
 * Include near </body> on every page.
 */
(function () {
  function updateNavForAuth() {
    var isMember = !!localStorage.getItem('wyltek_address');
    var nav = document.getElementById('mainNav') || document.querySelector('.nav-links');
    if (nav) {
      if (isMember) {
        nav.classList.add('member-nav');
      } else {
        nav.classList.remove('member-nav');
      }
    }
    // Also update Join → Membership label
    var join = document.querySelector('a.nav-join');
    if (join) {
      if (isMember) {
        join.textContent = '✦ Membership';
        join.title = 'View your membership';
      } else {
        join.textContent = '✦ Join / Sign In';
        join.title = 'Join or sign in';
      }
    }
  }

  // Initial check on page load
  updateNavForAuth();

  // Watch for storage changes (login/logout in another tab)
  window.addEventListener('storage', function(e) {
    if (e.key === 'wyltek_address') {
      updateNavForAuth();
    }
  });

  // Also watch for custom auth events (fired when members.html logs in)
  window.addEventListener('wyltek-auth-changed', updateNavForAuth);
})();
