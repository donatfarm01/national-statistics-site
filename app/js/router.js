// router.js — hash routing. Routes are plain links (#/ekonomi), so every page
// of the site is reachable by a link and the browser back button works.

import {
  renderDashboard,
  renderPenduduk,
  renderEkonomi,
  renderKetenagakerjaan,
  renderHarga,
  renderKesejahteraan,
  renderWilayah,
  renderTentang,
  wirePage,
} from './pages.js';

export const ROUTES = {
  '/': { title: 'Beranda', render: renderDashboard },
  '/penduduk': { title: 'Penduduk', render: renderPenduduk },
  '/ekonomi': { title: 'Ekonomi', render: renderEkonomi },
  '/ketenagakerjaan': { title: 'Ketenagakerjaan', render: renderKetenagakerjaan },
  '/harga': { title: 'Harga & inflasi', render: renderHarga },
  '/kesejahteraan': { title: 'Kesejahteraan', render: renderKesejahteraan },
  '/wilayah': { title: 'Wilayah', render: renderWilayah },
  '/tentang': { title: 'Tentang', render: renderTentang },
};

export const NAV = [
  { path: '/', label: 'Beranda' },
  { path: '/penduduk', label: 'Penduduk' },
  { path: '/ekonomi', label: 'Ekonomi' },
  { path: '/ketenagakerjaan', label: 'Ketenagakerjaan' },
  { path: '/harga', label: 'Harga' },
  { path: '/kesejahteraan', label: 'Kesejahteraan' },
  { path: '/wilayah', label: 'Wilayah' },
  { path: '/tentang', label: 'Tentang' },
];

export function currentRoute() {
  const hash = window.location.hash || '#/';
  const path = hash.slice(1) || '/';
  return ROUTES[path] ? path : '/';
}

export function renderNav(active) {
  return NAV.map(
    (item) =>
      `<a href="#${item.path}" class="${item.path === active ? 'active' : ''}" ${item.path === active ? 'aria-current="page"' : ''}>${item.label}</a>`,
  ).join('');
}

export function renderRoute(view, nav) {
  const path = currentRoute();
  const route = ROUTES[path];
  view.innerHTML = route.render();
  nav.innerHTML = renderNav(path);
  document.title = `${route.title} — NusaStat · Portal Statistik Indonesia`;
  wirePage(view, path);
  window.scrollTo(0, 0);
}
