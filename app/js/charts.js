// charts.js — hand-rolled SVG charts. No library: every chart is drawn from
// the data by these functions, so the first load stays small and every pixel
// is ours. Each chart labels its axes, marks its values, and carries a
// <title> on every data point for hover reading.

import { fmtAxis, fmtNum, esc } from './format.js';

const NS = 'http://www.w3.org/2000/svg';

function svgOpen(width, height, label) {
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${esc(label)}" xmlns="${NS}">`;
}

function niceTicks(min, max, count = 4) {
  if (min === max) {
    min -= 1;
    max += 1;
  }
  const span = max - min;
  const stepRaw = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(stepRaw)));
  const norm = stepRaw / mag;
  const step = (norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10) * mag;
  const start = Math.ceil(min / step) * step;
  const ticks = [];
  for (let v = start; v <= max + step * 0.001; v += step) ticks.push(v);
  return ticks;
}

// Line chart for a yearly series: [{year, value}].
export function lineChart(series, opts = {}) {
  const width = opts.width || 720;
  const height = opts.height || 300;
  const padL = 52;
  const padR = 16;
  const padT = 18;
  const padB = 34;
  const color = opts.color || '#0e6b62';
  const values = series.map((p) => p.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  const pad = (max - min) * 0.15 || 1;
  min -= pad;
  max += pad;
  const ticks = niceTicks(min, max, 4);
  const x = (i) => padL + ((width - padL - padR) * i) / (series.length - 1);
  const y = (v) => padT + ((max - v) * (height - padT - padB)) / (max - min);
  const label = opts.label || 'Grafik garis';
  let s = svgOpen(width, height, label);
  s += `<rect x="0" y="0" width="${width}" height="${height}" fill="none"/>`;
  for (const t of ticks) {
    const yy = y(t);
    s += `<line x1="${padL}" y1="${yy.toFixed(1)}" x2="${width - padR}" y2="${yy.toFixed(1)}" stroke="#e3ded2" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${(yy + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="#5c665f">${fmtAxis(t)}</text>`;
  }
  const points = series.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  s += `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  series.forEach((p, i) => {
    s += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="4.5" fill="#ffffff" stroke="${color}" stroke-width="2.5"><title>${p.year}: ${fmtNum(p.value, 2)} ${esc(opts.unit || '')}</title></circle>`;
    s += `<text x="${x(i).toFixed(1)}" y="${(y(p.value) - 10).toFixed(1)}" text-anchor="middle" font-size="11.5" font-weight="600" fill="#14201f">${fmtNum(p.value, opts.decimals ?? 2)}</text>`;
    s += `<text x="${x(i).toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="12" fill="#5c665f">${p.year}</text>`;
  });
  s += '</svg>';
  return s;
}

// Vertical bar chart for a yearly series.
export function barChart(series, opts = {}) {
  const width = opts.width || 720;
  const height = opts.height || 300;
  const padL = 52;
  const padR = 16;
  const padT = 24;
  const padB = 34;
  const color = opts.color || '#0e6b62';
  const negColor = opts.negColor || '#b3402e';
  const values = series.map((p) => p.value);
  let min = Math.min(0, ...values);
  let max = Math.max(0, ...values);
  const pad = (max - min) * 0.12 || 1;
  min -= pad;
  max += pad;
  const ticks = niceTicks(min, max, 4);
  const slot = (width - padL - padR) / series.length;
  const barW = Math.min(56, slot * 0.62);
  const x = (i) => padL + slot * i + (slot - barW) / 2;
  const y = (v) => padT + ((max - v) * (height - padT - padB)) / (max - min);
  const zeroY = y(0);
  const label = opts.label || 'Grafik batang';
  let s = svgOpen(width, height, label);
  for (const t of ticks) {
    const yy = y(t);
    s += `<line x1="${padL}" y1="${yy.toFixed(1)}" x2="${width - padR}" y2="${yy.toFixed(1)}" stroke="#e3ded2" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${(yy + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="#5c665f">${fmtAxis(t)}</text>`;
  }
  s += `<line x1="${padL}" y1="${zeroY.toFixed(1)}" x2="${width - padR}" y2="${zeroY.toFixed(1)}" stroke="#9aa39c" stroke-width="1.2"/>`;
  series.forEach((p, i) => {
    const top = Math.min(y(p.value), zeroY);
    const h = Math.abs(zeroY - y(p.value));
    const fill = p.value < 0 ? negColor : color;
    s += `<rect x="${x(i).toFixed(1)}" y="${top.toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(h, 1.5).toFixed(1)}" rx="3" fill="${fill}"><title>${p.year}: ${fmtNum(p.value, 2)} ${esc(opts.unit || '')}</title></rect>`;
    const labelY = p.value < 0 ? zeroY + 16 : top - 7;
    s += `<text x="${(x(i) + barW / 2).toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-size="11.5" font-weight="600" fill="#14201f">${fmtNum(p.value, opts.decimals ?? 2)}</text>`;
    s += `<text x="${(x(i) + barW / 2).toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="12" fill="#5c665f">${p.year}</text>`;
  });
  s += '</svg>';
  return s;
}

// Grouped bars: two series over the same years (e.g. ekspor vs impor).
export function groupedBarChart(seriesA, seriesB, opts = {}) {
  const width = opts.width || 720;
  const height = opts.height || 300;
  const padL = 56;
  const padR = 16;
  const padT = 24;
  const padB = 34;
  const colorA = opts.colorA || '#0e6b62';
  const colorB = opts.colorB || '#c97b1e';
  const all = [...seriesA.map((p) => p.value), ...seriesB.map((p) => p.value)];
  let min = 0;
  let max = Math.max(...all);
  const pad = max * 0.12 || 1;
  max += pad;
  const ticks = niceTicks(min, max, 4);
  const slot = (width - padL - padR) / seriesA.length;
  const barW = Math.min(30, slot * 0.3);
  const y = (v) => padT + ((max - v) * (height - padT - padB)) / (max - min);
  const zeroY = y(0);
  const label = opts.label || 'Grafik batang berkelompok';
  let s = svgOpen(width, height, label);
  for (const t of ticks) {
    const yy = y(t);
    s += `<line x1="${padL}" y1="${yy.toFixed(1)}" x2="${width - padR}" y2="${yy.toFixed(1)}" stroke="#e3ded2" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${(yy + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="#5c665f">${fmtAxis(t)}</text>`;
  }
  seriesA.forEach((p, i) => {
    const cx = padL + slot * i + slot / 2;
    const q = seriesB[i];
    const hA = zeroY - y(p.value);
    const hB = zeroY - y(q.value);
    s += `<rect x="${(cx - barW - 3).toFixed(1)}" y="${y(p.value).toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(hA, 1.5).toFixed(1)}" rx="3" fill="${colorA}"><title>${p.year} ${esc(opts.nameA || 'A')}: ${fmtNum(p.value, 2)} ${esc(opts.unit || '')}</title></rect>`;
    s += `<rect x="${(cx + 3).toFixed(1)}" y="${y(q.value).toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(hB, 1.5).toFixed(1)}" rx="3" fill="${colorB}"><title>${q.year} ${esc(opts.nameB || 'B')}: ${fmtNum(q.value, 2)} ${esc(opts.unit || '')}</title></rect>`;
    s += `<text x="${cx.toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="12" fill="#5c665f">${p.year}</text>`;
  });
  s += `<g font-size="12.5" fill="#14201f"><rect x="${padL}" y="2" width="12" height="12" rx="2" fill="${colorA}"/><text x="${padL + 18}" y="12">${esc(opts.nameA || 'A')}</text><rect x="${padL + 130}" y="2" width="12" height="12" rx="2" fill="${colorB}"/><text x="${padL + 148}" y="12">${esc(opts.nameB || 'B')}</text></g>`;
  s += '</svg>';
  return s;
}

// Donut chart for shares that add up to 100.
export function donutChart(parts, opts = {}) {
  const size = opts.size || 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const inner = r * 0.62;
  const colors = opts.colors || ['#0e6b62', '#c97b1e', '#3a7ca5', '#7a9a4d', '#8a7f70'];
  const total = parts.reduce((a, p) => a + p.share, 0);
  const label = opts.label || 'Grafik donat';
  let s = svgOpen(size, size, label);
  let angle = -Math.PI / 2;
  parts.forEach((p, i) => {
    const frac = p.share / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const ix0 = cx + inner * Math.cos(a1);
    const iy0 = cy + inner * Math.sin(a1);
    const ix1 = cx + inner * Math.cos(a0);
    const iy1 = cy + inner * Math.sin(a0);
    const fill = colors[i % colors.length];
    s += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${ix0.toFixed(1)} ${iy0.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${ix1.toFixed(1)} ${iy1.toFixed(1)} Z" fill="${fill}" stroke="#ffffff" stroke-width="2"><title>${esc(p.name)}: ${fmtNum(p.share, 1)}%</title></path>`;
  });
  s += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="700" fill="#14201f">${fmtNum(total, 0)}%</text>`;
  s += `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="#5c665f">${esc(opts.centerLabel || 'dari PDB')}</text>`;
  s += '</svg>';
  let legend = '<ul class="legend">';
  parts.forEach((p, i) => {
    legend += `<li><span class="swatch" style="background:${colors[i % colors.length]}"></span><span class="legend-name">${esc(p.name)}</span><strong>${fmtNum(p.share, 1)}%</strong></li>`;
  });
  legend += '</ul>';
  return `<div class="donut-wrap">${s}${legend}</div>`;
}

// Horizontal bars for ranked lists (e.g. provinces).
export function hbarChart(rows, opts = {}) {
  const width = opts.width || 720;
  const rowH = opts.rowH || 30;
  const height = rowH * rows.length + 12;
  const padL = 150;
  const padR = 70;
  const max = Math.max(...rows.map((r) => r.value));
  const color = opts.color || '#0e6b62';
  const label = opts.label || 'Grafik batang horizontal';
  let s = svgOpen(width, height, label);
  rows.forEach((r, i) => {
    const y = 6 + i * rowH;
    const w = ((width - padL - padR) * r.value) / max;
    s += `<text x="${padL - 10}" y="${y + 15}" text-anchor="end" font-size="12.5" fill="#14201f">${esc(r.name)}</text>`;
    s += `<rect x="${padL}" y="${y + 4}" width="${Math.max(w, 2).toFixed(1)}" height="16" rx="3" fill="${color}"><title>${esc(r.name)}: ${fmtNum(r.value, opts.decimals ?? 2)} ${esc(opts.unit || '')}</title></rect>`;
    s += `<text x="${(padL + w + 8).toFixed(1)}" y="${y + 17}" font-size="12.5" font-weight="600" fill="#14201f">${fmtNum(r.value, opts.decimals ?? 2)}</text>`;
  });
  s += '</svg>';
  return s;
}
