/**
 * member-guard.js
 * Include at the TOP of any members-only page (before other scripts).
 * If the user has no saved JoyID address → redirect to members.html.
 * Sets window.MEMBER_ADDRESS for use by page scripts.
 */
(function () {
  const addr = localStorage.getItem('wyltek_address');
  if (!addr) {
    // Save the page they were trying to reach so we can redirect back after login
    sessionStorage.setItem('wyltek_return', location.pathname + location.search);
    location.replace('/members.html');
  } else {
    window.MEMBER_ADDRESS = addr;
  }
})();
