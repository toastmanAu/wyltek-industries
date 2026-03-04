/**
 * member-nav.js
 * Shows member-only nav links when the user is logged in.
 * Works with both nav patterns on the site.
 * Include near </body> on every page.
 */
(function () {
  if (localStorage.getItem('wyltek_address')) {
    var nav = document.getElementById('mainNav') || document.querySelector('.nav-links');
    if (nav) nav.classList.add('member-nav');
    // Also update Join → Membership label
    var join = document.querySelector('a.nav-join');
    if (join) { join.textContent = '✦ Membership'; join.title = 'View your membership'; }
  }
})();
