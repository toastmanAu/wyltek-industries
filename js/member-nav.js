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
    // Also update Join → Membership label + sign-out link
    var join = document.querySelector('a.nav-join');
    var signout = document.getElementById('nav-signout');
    if (join) {
      if (isMember) {
        join.textContent = '✦ Membership';
        join.title = 'View your membership';
        // Add sign-out link if not already present
        if (!signout) {
          signout = document.createElement('a');
          signout.id = 'nav-signout';
          signout.href = '#';
          signout.textContent = 'Sign Out';
          signout.style.cssText = 'color:var(--muted,#64748b);font-size:0.9rem;padding:.15rem 0;';
          signout.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('wyltek_address');
            localStorage.removeItem('wyltek_authed');
            window.dispatchEvent(new Event('wyltek-auth-changed'));
            location.href = '/index.html';
          });
          join.parentNode.insertBefore(signout, join.nextSibling);
        }
      } else {
        join.textContent = '✦ Join / Sign In';
        join.title = 'Join or sign in';
        // Remove sign-out link if present
        if (signout) signout.remove();
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
