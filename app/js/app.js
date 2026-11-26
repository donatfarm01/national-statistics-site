// app.js — boot. Renders the navigation and the current route, re-renders
// on hash change, and keeps the year in the footer current.

import { renderRoute } from './router.js';

function boot() {
  const view = document.getElementById('view');
  const nav = document.getElementById('main-nav');
  if (!view || !nav) return;
  const render = () => renderRoute(view, nav);
  window.addEventListener('hashchange', render);
  render();
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
