// format.js — number formatting in Indonesian conventions (id-ID).
// One job: turn raw numbers into readable Indonesian text.

export function fmtNum(value, decimals = 2) {
  return Number(value).toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function fmtInt(value) {
  return Number(value).toLocaleString('id-ID', { maximumFractionDigits: 0 });
}

export function fmtPct(value, decimals = 2) {
  return fmtNum(value, decimals) + '%';
}

export function fmtJuta(value, decimals = 1) {
  return fmtNum(value, decimals) + ' jt';
}

// Short axis label: 270.2 -> "270", 5.03 -> "5,03", 0.379 -> "0,38".
export function fmtAxis(value) {
  const abs = Math.abs(value);
  if (abs >= 100) return fmtInt(Math.round(value));
  if (abs >= 10) return fmtNum(value, 1);
  return fmtNum(value, 2);
}

export function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
