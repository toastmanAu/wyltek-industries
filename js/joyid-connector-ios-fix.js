/**
 * joyid-connector-ios-fix.js
 * Patched JoyID connector for iOS standalone mode fix.
 * Always uses redirect flow when running in "Add to Home Screen" mode.
 * 
 * Usage: Replace import in members.html with this file.
 */

const JOYID_APP_URL = 'https://app.joy.id';
const JOYID_REDIRECT_KEY = 'joyid-redirect';
const JOYID_PENDING_KEY  = 'joyid_pending';
const COMMON_ESM = 'https://esm.sh/@joyid/common@0.2.1';

let _common = null;
async function loadCommon() {
  if (_common) return _common;
  _common = await import(COMMON_ESM);
  return _common;
}

/**
 * Detect if running in iOS "Add to Home Screen" standalone mode.
 * This mode has popup restrictions and sessionStorage limitations.
 */
function isStandaloneIOS() {
  // iOS Safari in standalone mode
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isStandalone = window.navigator.standalone === true;
  return isIOS && isStandalone;
}

/**
 * Detect if running in any standalone/pseudo-app mode
 * (Android add-to-home-screen, iOS standalone, etc.)
 */
function isStandaloneMode() {
  // iOS standalone
  if (window.navigator.standalone === true) return true;
  
  // Android/Chrome standalone detection
  if (window.matchMedia('(display-mode: standalone)').matches) return true;
  if (window.matchMedia('(display-mode: fullscreen)').matches) return true;
  if (window.matchMedia('(display-mode: minimal-ui)').matches) return true;
  
  return false;
}

function supportsPasskeyRelay() {
  // If in standalone mode, always use redirect flow
  if (isStandaloneMode()) {
    console.log('[joyid] Standalone mode detected, forcing redirect flow');
    return false;
  }
  
  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);
  if (isMobile) return true;
  if (/Firefox/.test(ua)) return false;
  if (/Edg\//.test(ua)) return false;
  if (typeof navigator.brave !== 'undefined') return false;
  if (!!(window.chrome) && /Chrome/.test(ua)) return true;
  return false;
}

// Firefox doesn't support CTAP2 hybrid (cross-device QR) well — redirect flow
// hits a dead end. Better to tell them than leave them stuck.
export function isFirefoxDesktop() {
  const ua = navigator.userAgent;
  return /Firefox/.test(ua) && !/Mobi|Android/i.test(ua);
}

/**
 * Check if this page load is a JoyID redirect callback.
 */
export function isJoyIDCallback() {
  return new URL(window.location.href).searchParams.has(JOYID_REDIRECT_KEY);
}

/**
 * Parse the JoyID redirect result from the current URL.
 * Call this on the redirectURL page when isJoyIDCallback() returns true.
 * Returns { address, pubkey, keyType, alg, ... } or throws on error.
 */
export async function joyidHandleCallback() {
  const common = await loadCommon();
  // authCallback parses ?_data_= from current URL
  const result = common.authCallback();
  return result;
}

/**
 * Connect to JoyID wallet.
 * Returns AuthResponseData: { address, pubkey, keyType, alg, ... }
 *
 * @param {object} opts
 * @param {string} opts.redirectURL - URL to return to after redirect auth
 * @param {string} [opts.network]   - 'mainnet' | 'testnet'
 * @param {string} [opts.joyidAppURL] - Override JoyID app URL
 */
export async function joyidConnect(opts = {}) {
  const {
    redirectURL = window.location.href,
    network     = 'mainnet',
    joyidAppURL = JOYID_APP_URL,
  } = opts;

  const common = await loadCommon();

  // Init config
  if (common.initConfig) {
    common.initConfig({ joyidAppURL, network });
  }

  const request = { redirectURL, network, joyidAppURL };

  // For standalone mode, add a note about the flow
  if (isStandaloneMode()) {
    console.log('[joyid] Running in standalone mode, using redirect flow');
  }

  if (supportsPasskeyRelay()) {
    // Popup flow — relay works in this browser
    const result = await Promise.race([
      common.authWithPopup(request),
      new Promise((_, rej) =>
        setTimeout(() => rej(new Error('JoyID connect timed out — try again or use a different browser')), 60000)
      ),
    ]);
    return result;
  } else {
    // Redirect flow — navigates away, returns via redirectURL
    // Store pending state so the return page knows to complete sign-in
    // Use localStorage instead of sessionStorage for better compatibility
    localStorage.setItem(JOYID_PENDING_KEY, JSON.stringify({ 
      returnTo: window.location.href,
      timestamp: Date.now()
    }));
    
    console.log('[joyid] Starting redirect flow to:', joyidAppURL);
    common.authWithRedirect(request);
    // Never resolves — page navigates away
    return new Promise(() => {});
  }
}

/**
 * Get pending redirect state (set before navigating away).
 * Checks both sessionStorage and localStorage for compatibility.
 */
export function getJoyIDPending() {
  // Try sessionStorage first (original)
  let raw = sessionStorage.getItem(JOYID_PENDING_KEY);
  if (!raw) {
    // Fall back to localStorage (for standalone mode)
    raw = localStorage.getItem(JOYID_PENDING_KEY);
  }
  if (!raw) return null;
  try { 
    const parsed = JSON.parse(raw);
    // Clean up old entries (> 5 minutes)
    if (parsed.timestamp && Date.now() - parsed.timestamp > 5 * 60 * 1000) {
      clearJoyIDPending();
      return null;
    }
    return parsed;
  } catch { 
    return null; 
  }
}

/**
 * Clear pending redirect state from both storage locations.
 */
export function clearJoyIDPending() {
  sessionStorage.removeItem(JOYID_PENDING_KEY);
  localStorage.removeItem(JOYID_PENDING_KEY);
}