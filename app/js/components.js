// components.js — shared page pieces: KPI cards, source notes, sortable and
// searchable tables, and CSV download. Every figure these render carries its
// source and year next to it.

import { fmtNum, esc } from './format.js';
import { INDICATORS, latest, pointChange } from './data.js';

export function sourceNote(text) {
  return `<p class="source-note">Sumber: ${esc(text)}</p>`;
}

export function kpiCard(indicatorId, label, decimals = 2, suffix = '', changeUnit = 'poin') {
  const ind = INDICATORS[indicatorId];
  const last = latest(indicatorId);
  const change = pointChange(indicatorId);
  const dir = change.startsWith('+') ? 'up' : change.startsWith('−') ? 'down' : 'flat';
  return `<article class="kpi">
    <h3>${esc(label)}</h3>
    <p class="kpi-value">${fmtNum(last.value, decimals)}<span class="kpi-unit">${esc(suffix)}</span></p>
    <p class="kpi-meta"><span class="kpi-change ${dir}">${change} ${esc(changeUnit)}</span> dari ${last.year - 1} · ${esc(ind.source)} ${last.year}</p>
  </article>`;
}

// Build a sortable, searchable table into a container. columns: [{key, label,
// align, format(row)}]. rows: plain objects. Returns the table element's HTML;
// sorting and search are wired by wireTable() after insertion.
export function dataTable(id, columns, rows) {
  const head = columns
    .map(
      (c, i) =>
        `<th scope="col" data-col="${i}"><button type="button" class="sort-btn" data-sort="${i}" aria-label="Urutkan menurut ${esc(c.label)}">${esc(c.label)} <span class="sort-mark" aria-hidden="true">↕</span></button></th>`,
    )
    .join('');
  const body = rows
    .map(
      (row) =>
        `<tr>${columns.map((c) => `<td class="${c.align === 'right' ? 'num' : ''}">${c.format(row)}</td>`).join('')}</tr>`,
    )
    .join('');
  return `<div class="table-tools">
      <label class="search-label">Cari <input type="search" class="table-search" data-table="${id}" placeholder="Ketik untuk menyaring…" aria-label="Cari dalam tabel"></label>
      <button type="button" class="btn btn-ghost csv-btn" data-csv="${id}">Unduh CSV</button>
    </div>
    <div class="table-scroll"><table class="data-table" id="${id}">
      <thead><tr>${head}</tr></thead><tbody>${body}</tbody>
    </table></div>
    <p class="table-count" data-count="${id}">${rows.length} baris</p>`;
}

// Wire sorting, searching and CSV download for every table on the page.
export function wireTables(root) {
  root.querySelectorAll('.sort-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const table = btn.closest('table');
      const col = Number(btn.dataset.sort);
      const tbody = table.querySelector('tbody');
      const rows = [...tbody.querySelectorAll('tr')];
      const asc = btn.dataset.dir !== 'asc';
      table.querySelectorAll('.sort-btn').forEach((b) => {
        b.dataset.dir = '';
        b.querySelector('.sort-mark').textContent = '↕';
      });
      btn.dataset.dir = asc ? 'asc' : 'desc';
      btn.querySelector('.sort-mark').textContent = asc ? '↑' : '↓';
      rows.sort((a, b) => {
        const ta = a.children[col].textContent.trim();
        const tb = b.children[col].textContent.trim();
        const na = Number(ta.replace(/\./g, '').replace(',', '.'));
        const nb = Number(tb.replace(/\./g, '').replace(',', '.'));
        const cmp = Number.isFinite(na) && Number.isFinite(nb) ? na - nb : ta.localeCompare(tb, 'id');
        return asc ? cmp : -cmp;
      });
      rows.forEach((r) => tbody.appendChild(r));
    });
  });
  root.querySelectorAll('.table-search').forEach((input) => {
    input.addEventListener('input', () => {
      const table = document.getElementById(input.dataset.table);
      const q = input.value.trim().toLowerCase();
      let shown = 0;
      table.querySelectorAll('tbody tr').forEach((tr) => {
        const hit = tr.textContent.toLowerCase().includes(q);
        tr.style.display = hit ? '' : 'none';
        if (hit) shown += 1;
      });
      const counter = root.querySelector(`[data-count="${input.dataset.table}"]`);
      if (counter) counter.textContent = `${shown} dari ${table.querySelectorAll('tbody tr').length} baris`;
    });
  });
  root.querySelectorAll('.csv-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const table = document.getElementById(btn.dataset.csv);
      const lines = [];
      table.querySelectorAll('tr').forEach((tr) => {
        const cells = [...tr.querySelectorAll('th, td')].map((c) => {
          const text = c.textContent.replace(/\s+/g, ' ').trim().replace(/"/g, '""');
          return `"${text}"`;
        });
        lines.push(cells.join(';'));
      });
      const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${btn.dataset.csv}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
  });
}
