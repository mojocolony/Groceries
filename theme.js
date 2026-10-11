/* Groceries v1.5.3 — purely local colour theme; no household or cloud data changes. */
(() => {
  'use strict';
  const STORAGE_KEY = 'groceriesTheme';
  const OPTIONS = new Set(['original', 'nord-light', 'nord-dark', 'system']);
  const colours = {
    original: '#f7f5f0',
    'nord-light': '#f5f4ef',
    'nord-dark': '#2e3440'
  };
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)') || null;

  function readPreference() {
    try {
      const value = window.localStorage.getItem(STORAGE_KEY);
      return OPTIONS.has(value) ? value : 'original';
    } catch (_) {
      return 'original';
    }
  }
  let preference = readPreference();

  function effectiveTheme() {
    return preference === 'system'
      ? (prefersDark?.matches ? 'nord-dark' : 'nord-light')
      : preference;
  }
  function applyTheme() {
    const active = effectiveTheme();
    document.documentElement.setAttribute('data-theme', active);
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    themeMeta?.setAttribute('content', colours[active]);
    document.querySelectorAll('[data-theme-choice]').forEach(button => {
      const selected = button.dataset.themeChoice === preference;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-checked', String(selected));
    });
    const trigger = document.getElementById('themeBtn');
    if (trigger) trigger.title = `Colour theme: ${preference === 'system' ? 'System' : preference === 'original' ? 'Original' : active === 'nord-light' ? 'Nord Light' : 'Nord Dark'}`;
  }
  function selectTheme(value) {
    if (!OPTIONS.has(value)) return;
    preference = value;
    try { window.localStorage.setItem(STORAGE_KEY, value); } catch (_) { /* Private-mode storage may be disabled. */ }
    applyTheme();
  }

  // Apply before CSS paints; update the control once it exists.
  applyTheme();
  if (prefersDark) {
    const onSystemChange = () => { if (preference === 'system') applyTheme(); };
    if (typeof prefersDark.addEventListener === 'function') {
      prefersDark.addEventListener('change', onSystemChange);
    } else if (typeof prefersDark.addListener === 'function') {
      prefersDark.addListener(onSystemChange);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('themeBtn');
    const menu = document.getElementById('themeMenu');
    if (!trigger || !menu) return;
    const close = () => {
      menu.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    };
    trigger.addEventListener('click', event => {
      event.stopPropagation();
      // The existing Aa control stops propagation too, so close its menu explicitly.
      document.getElementById('fontSizeMenu')?.classList.remove('open');
      document.getElementById('fontSizeBtn')?.setAttribute('aria-expanded', 'false');
      const opened = menu.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(opened));
    });
    menu.querySelectorAll('[data-theme-choice]').forEach(button => {
      button.addEventListener('click', () => { selectTheme(button.dataset.themeChoice); close(); trigger.focus(); });
    });
    document.getElementById('fontSizeBtn')?.addEventListener('click', close);
    document.addEventListener('click', event => {
      if (!menu.contains(event.target) && !trigger.contains(event.target)) close();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.classList.contains('open')) { close(); trigger.focus(); }
    });
    applyTheme();
  });
})();
