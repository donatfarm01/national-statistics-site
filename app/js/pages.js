// pages.js — one renderer per route. Each page is real content: charts drawn
// from the datasets, tables a visitor can sort, search and download, and
// every figure labelled with source and year.

import { fmtNum, fmtInt, esc } from './format.js';
import { INDICATORS, HEADLINES, PROVINCES, CENSUS_TOTAL, SECTORS_2024, RELEASES, latest } from './data.js';
import { lineChart, barChart, groupedBarChart, donutChart, hbarChart } from './charts.js';
import { kpiCard, sourceNote, dataTable, wireTables } from './components.js';

function pageHead(kicker, title, intro) {
  return `<header class="page-head"><p class="kicker">${esc(kicker)}</p><h2>${esc(title)}</h2><p class="lede">${intro}</p></header>`;
}

function chartCard(title, chartHtml, note) {
  return `<section class="card chart-card"><h3>${esc(title)}</h3>${chartHtml}${sourceNote(note)}</section>`;
}

function switcher(options, current, group) {
  return `<div class="switcher" role="group" aria-label="Pilih indikator">${options
    .map(
      (o) =>
        `<button type="button" data-switch="${group}" data-value="${o.value}" class="${o.value === current ? 'active' : ''}" aria-pressed="${o.value === current}">${esc(o.label)}</button>`,
    )
    .join('')}</div>`;
}

export function renderDashboard() {
  const kpis = HEADLINES.map((h) => kpiCard(h.indicator, h.label, h.decimals, h.suffix, h.changeUnit)).join('');
  const ind = INDICATORS.growth;
  const top5 = [...PROVINCES].slice(0, 5);
  const rows = top5
    .map(
      (p, i) =>
        `<tr><td>${i + 1}</td><td>${esc(p.name)}</td><td class="num">${fmtNum(p.population, 2)}</td><td class="num">${fmtNum((p.population / CENSUS_TOTAL) * 100, 1)}%</td></tr>`,
    )
    .join('');
  const releases = RELEASES.map(
    (r) =>
      `<li><time>${esc(r.date)}</time><strong>${esc(r.title)}</strong><span>${esc(r.detail)}</span><em>Sumber: ${esc(r.source)}</em></li>`,
  ).join('');
  return `${pageHead(
    'Portal Statistik Indonesia',
    'Indonesia dalam angka, 2019–2024',
    'NusaStat merangkum statistik resmi Indonesia — penduduk, ekonomi, ketenagakerjaan, harga, dan kesejahteraan — dari publikasi Badan Pusat Statistik (BPS), dalam satu tempat yang bisa dijelajahi.',
  )}
  <section class="kpi-grid" aria-label="Angka utama">${kpis}</section>
  <section class="card chart-card">
    <div class="card-head"><h3>Perkembangan indikator utama</h3>${switcher(
      [
        { value: 'growth', label: 'Pertumbuhan ekonomi' },
        { value: 'inflation', label: 'Inflasi' },
        { value: 'poverty', label: 'Kemiskinan' },
        { value: 'hdi', label: 'IPM' },
      ],
      'growth',
      'dash',
    )}</div>
    <div id="dash-chart">${lineChart(ind.values, { label: ind.name, unit: ind.unit, color: '#0e6b62' })}</div>
    <p class="source-note" id="dash-note">Sumber: BPS, 2019–2024. ${esc(ind.note)}</p>
  </section>
  <div class="two-col">
    <section class="card">
      <h3>Rilis terbaru</h3>
      <ul class="releases">${releases}</ul>
    </section>
    <section class="card">
      <h3>Provinsi terpadat</h3>
      <p class="card-intro">Lima provinsi dengan penduduk terbanyak menurut Sensus Penduduk 2020.</p>
      <div class="table-scroll"><table class="data-table plain">
        <thead><tr><th scope="col">#</th><th scope="col">Provinsi</th><th scope="col" class="num">Penduduk (jt)</th><th scope="col" class="num">Pangsa</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
      ${sourceNote('BPS, Sensus Penduduk 2020. Lihat tabel lengkap di halaman Wilayah.')}
      <p><a class="btn btn-ghost" href="#/wilayah">Lihat semua provinsi →</a></p>
    </section>
  </div>
  <section class="card">
    <h3>Jelajahi berdasarkan tema</h3>
    <nav class="theme-grid" aria-label="Tema statistik">
      <a href="#/penduduk"><strong>Penduduk</strong><span>Jumlah, sebaran, dan provinsi</span></a>
      <a href="#/ekonomi"><strong>Ekonomi</strong><span>Pertumbuhan, PDB, dan perdagangan</span></a>
      <a href="#/ketenagakerjaan"><strong>Ketenagakerjaan</strong><span>Pengangguran dan angkatan kerja</span></a>
      <a href="#/harga"><strong>Harga &amp; inflasi</strong><span>Perkembangan harga konsumen</span></a>
      <a href="#/kesejahteraan"><strong>Kesejahteraan</strong><span>Kemiskinan, IPM, dan ketimpangan</span></a>
      <a href="#/wilayah"><strong>Wilayah</strong><span>Perbandingan antarprovinsi</span></a>
    </nav>
  </section>`;
}

export function renderPenduduk() {
  const ind = INDICATORS.population;
  return `${pageHead(
    'Penduduk',
    'Penduduk Indonesia: 281,6 juta jiwa pada 2024',
    'Jumlah penduduk Indonesia bertambah sekitar 2–3 juta jiwa setiap tahun. Sensus Penduduk 2020 mencatat 270,20 juta jiwa; estimasi pertengahan 2024 mencapai 281,6 juta jiwa.',
  )}
  ${chartCard('Jumlah penduduk, 2019–2024 (juta jiwa)', lineChart(ind.values, { label: ind.name, unit: ind.unit, color: '#0e6b62', decimals: 1 }), `BPS, 2019–2024. ${ind.note}`)}
  <section class="card">
    <h3>Apa yang ditunjukkan angka ini</h3>
    <p>Antara Sensus 2020 dan 2024, penduduk bertambah 11,4 juta jiwa — rata-rata 2,85 juta per tahun. Lebih dari separuh penduduk tinggal di Pulau Jawa: Jawa Barat, Jawa Timur, dan Jawa Tengah saja menampung 125,46 juta jiwa, atau 46,4 persen dari total nasional.</p>
    <p>Pertumbuhan penduduk melambat: laju pertumbuhan tahunan turun dari sekitar 1,25 persen per tahun pada 2010–2020 menjadi sekitar 0,9 persen pada 2020–2024, seiring menurunnya angka kelahiran.</p>
    ${sourceNote('BPS, Sensus Penduduk 2020 dan Estimasi Penduduk Pertengahan Tahun 2019–2024.')}
  </section>
  <section class="card">
    <h3>Provinsi terpadat</h3>
    <p class="card-intro">Lima provinsi teratas menampung lebih dari separuh penduduk Indonesia.</p>
    ${hbarChart([...PROVINCES].slice(0, 8).map((p) => ({ name: p.name, value: p.population })), { label: 'Penduduk delapan provinsi terpadat', unit: 'juta jiwa', decimals: 2 })}
    ${sourceNote('BPS, Sensus Penduduk 2020 (juta jiwa).')}
  </section>`;
}

export function economyCharts(period) {
  const from = period === 'recent' ? 2021 : 2019;
  const pick = (series) => series.filter((p) => p.year >= from);
  const growth = pick(INDICATORS.growth.values);
  const capita = pick(INDICATORS.gdpPerCapita.values);
  const ex = pick(INDICATORS.exports.values);
  const im = pick(INDICATORS.imports.values);
  const range = period === 'recent' ? '2021–2024' : '2019–2024';
  return `${chartCard(`Pertumbuhan ekonomi, ${range} (% yoy)`, barChart(growth, { label: 'Pertumbuhan ekonomi', unit: '%', color: '#0e6b62' }), `BPS, ${range}. PDB atas dasar harga konstan 2010.`)}
  ${chartCard(`PDB per kapita, ${range} (Rp juta)`, lineChart(capita, { label: 'PDB per kapita', unit: 'Rp juta', color: '#c97b1e', decimals: 1 }), `BPS, ${range}. PDB harga berlaku per penduduk.`)}
  ${chartCard(`Ekspor dan impor, ${range} (US$ miliar)`, groupedBarChart(ex, im, { label: 'Ekspor dan impor', unit: 'US$ miliar', nameA: 'Ekspor', nameB: 'Impor' }), `BPS, ${range}. Nilai perdagangan barang migas dan nonmigas.`)}`;
}

export function renderEkonomi() {
  return `${pageHead(
    'Ekonomi',
    'Ekonomi Indonesia tumbuh 5,03 persen pada 2024',
    'Setelah kontraksi 2,07 persen pada 2020, ekonomi Indonesia kembali tumbuh di atas 5 persen selama tiga tahun berturut-turut. PDB per kapita 2024 mencapai Rp78,6 juta.',
  )}
  <section class="card">
    <div class="card-head"><h3>Periode data</h3>${switcher(
      [
        { value: 'all', label: '2019–2024' },
        { value: 'recent', label: '2021–2024' },
      ],
      'all',
      'period',
    )}</div>
    <div id="economy-charts">${economyCharts('all')}</div>
  </section>
  <div class="two-col">
    <section class="card">
      <h3>Struktur PDB 2024</h3>
      ${donutChart(SECTORS_2024, { label: 'Pangsa lapangan usaha terhadap PDB 2024', centerLabel: 'dari PDB' })}
      ${sourceNote('BPS, 2024. Pangsa lapangan usaha terhadap PDB atas dasar harga berlaku; angka dibulatkan.')}
    </section>
    <section class="card">
      <h3>Apa yang ditunjukkan angka ini</h3>
      <p>Industri pengolahan tetap menjadi lapangan usaha terbesar dengan pangsa 18,7 persen dari PDB 2024, diikuti perdagangan (13,0 persen) dan pertanian (11,9 persen). Konsumsi rumah tangga menjadi penopang utama dari sisi pengeluaran.</p>
      <p>Perdagangan luar negeri kembali surplus pada 2024: ekspor US$264,70 miliar melawan impor US$233,66 miliar, surplus US$31,04 miliar. Kunjungan wisatawan mancanegara pulih ke 13,90 juta pada 2024, mendekati level sebelum pandemi.</p>
      <p>Produksi padi 2024 tercatat 52,66 juta ton gabah kering giling, turun dari 53,98 juta ton pada 2023 — antara lain karena El Nino yang menunda musim tanam.</p>
      ${sourceNote('BPS, 2024: PDB, Perdagangan Luar Negeri, Pariwisata, dan Produksi Padi.')}
    </section>
  </div>`;
}

export function renderKetenagakerjaan() {
  const ind = INDICATORS.unemployment;
  const rows = ind.values.map((p) => ({ year: p.year, value: p.value }));
  const table = dataTable(
    'tpt-table',
    [
      { key: 'year', label: 'Tahun', format: (r) => String(r.year) },
      { key: 'value', label: 'TPT Agustus (%)', align: 'right', format: (r) => fmtNum(r.value, 2) },
      {
        key: 'note',
        label: 'Catatan',
        format: (r) =>
          r.year === 2020
            ? 'Puncak pandemi Covid-19'
            : r.year === 2024
              ? 'Terendah sejak 2019'
              : r.year === 2019
                ? 'Sebelum pandemi'
                : '—',
      },
    ],
    rows,
  );
  return `${pageHead(
    'Ketenagakerjaan',
    'Pengangguran turun ke 4,91 persen pada Agustus 2024',
    'Tingkat Pengangguran Terbuka (TPT) Agustus 2024 sebesar 4,91 persen — level terendah sejak 2019 dan pertama kalinya di bawah 5 persen setelah pandemi.',
  )}
  ${chartCard('Tingkat pengangguran terbuka, Agustus 2019–2024 (%)', lineChart(ind.values, { label: ind.name, unit: '%', color: '#0e6b62' }), `BPS, Survei Angkatan Kerja Nasional, Agustus 2019–2024. ${ind.note}`)}
  <div class="two-col">
    <section class="card">
      <h3>Angkatan kerja</h3>
      <p>Pada Agustus 2024, angkatan kerja Indonesia mencapai 152,11 juta orang dengan Tingkat Partisipasi Angkatan Kerja (TPAK) 70,63 persen. Dari 144,64 juta orang yang bekerja, sektor pertanian menyerap tenaga kerja terbanyak, diikuti perdagangan dan industri pengolahan.</p>
      <p>Penurunan TPT 2024 didorong bertambahnya lapangan kerja formal dan pulihnya sektor jasa — terutama perdagangan, akomodasi, dan makanan-minuman — setelah pandemi.</p>
      ${sourceNote('BPS, Survei Angkatan Kerja Nasional Agustus 2024.')}
    </section>
    <section class="card">
      <h3>TPT per tahun</h3>
      ${table}
      ${sourceNote('BPS, Agustus 2019–2024.')}
    </section>
  </div>`;
}

export function renderHarga() {
  const ind = INDICATORS.inflation;
  return `${pageHead(
    'Harga & inflasi',
    'Inflasi 2024: 1,57 persen, terendah dalam enam tahun',
    'Inflasi Desember 2024 (year-on-year) tercatat 1,57 persen — di bawah sasaran Bank Indonesia dan jauh di bawah lonjakan 5,51 persen pada 2022 saat harga BBM bersubsidi disesuaikan.',
  )}
  <section class="card chart-card">
    <div class="card-head"><h3>Inflasi tahunan, Desember 2019–2024 (% yoy)</h3>${switcher(
      [
        { value: 'line', label: 'Garis' },
        { value: 'bar', label: 'Batang' },
      ],
      'line',
      'charttype',
    )}</div>
    <div id="inflation-chart">${lineChart(ind.values, { label: ind.name, unit: '%', color: '#0e6b62' })}</div>
    <p class="source-note">Sumber: BPS, 2019–2024. ${esc(ind.note)}</p>
  </section>
  <section class="card">
    <h3>Mengapa inflasi 2022 melonjak, lalu mereda</h3>
    <p>Inflasi 2022 mencapai 5,51 persen — tertinggi dalam delapan tahun — setelah pemerintah menyesuaikan harga BBM bersubsidi pada September 2022, yang mendorong harga transportasi dan bahan pangan. Pada 2023 inflasi kembali ke 2,61 persen, dan pada 2024 ke 1,57 persen, didukung harga pangan yang relatif stabil dan administered prices yang terkendali.</p>
    <p>Inflasi yang rendah dan stabil menjaga daya beli: dengan pertumbuhan ekonomi 5,03 persen pada 2024, upah riil pekerja cenderung membaik ketika inflasi berada di bawah pertumbuhan upah nominal.</p>
    ${sourceNote('BPS, Indeks Harga Konsumen 2019–2024; Bank Indonesia, sasaran inflasi 2,5±1 persen.')}
  </section>`;
}

export function renderKesejahteraan() {
  const pov = INDICATORS.poverty;
  const hdi = INDICATORS.hdi;
  const gini = INDICATORS.gini;
  return `${pageHead(
    'Kesejahteraan',
    'Kemiskinan 8,57 persen; IPM 75,02 pada 2024',
    'Kesejahteraan membaik di dua sisi sekaligus: penduduk miskin turun ke level terendah sepanjang sejarah pencatatan, dan Indeks Pembangunan Manusia menembus 75 — status pembangunan manusia "tinggi".',
  )}
  <section class="kpi-grid" aria-label="Angka kesejahteraan">
    ${kpiCard('poverty', 'Penduduk miskin (Sep 2024)', 2, '%')}
    ${kpiCard('hdi', 'IPM', 2, '')}
    ${kpiCard('lifeExpectancy', 'Umur harapan hidup', 2, ' thn', 'tahun')}
  </section>
  ${chartCard('Penduduk miskin, September 2019–2024 (%)', lineChart(pov.values, { label: pov.name, unit: '%', color: '#0e6b62' }), `BPS, 2019–2024. ${pov.note}`)}
  <div class="two-col">
    ${chartCard('Indeks Pembangunan Manusia, 2019–2024', lineChart(hdi.values, { label: hdi.name, unit: 'indeks', color: '#c97b1e' }), `BPS, 2019–2024. ${hdi.note}`)}
    ${chartCard('Rasio gini, Maret 2019–2024', lineChart(gini.values, { label: gini.name, unit: 'rasio', color: '#3a7ca5', decimals: 3 }), `BPS, 2019–2024. ${gini.note}`)}
  </div>
  <section class="card">
    <h3>Membaca ketiga angka bersamaan</h3>
    <p>Kemiskinan turun 0,46 poin antara Maret dan September 2024 menjadi 8,57 persen, atau 24,06 juta orang. IPM naik 0,63 poin ke 75,02, didorong umur harapan hidup 74,15 tahun dan rata-rata lama sekolah 9,20 tahun. Namun rasio gini stagnan di 0,379 — ketimpangan pengeluaran belum mengecil, sehingga perbaikan rata-rata belum tentu dirasakan merata.</p>
    ${sourceNote('BPS, 2024: Kemiskinan, IPM, dan Distribusi Pendapatan. Rata-rata lama sekolah 9,20 tahun (BPS, 2024).')}
  </section>`;
}

export function renderWilayah() {
  const rows = PROVINCES.map((p, i) => ({
    rank: i + 1,
    name: p.name,
    population: p.population,
    share: (p.population / CENSUS_TOTAL) * 100,
  }));
  const table = dataTable(
    'prov-table',
    [
      { key: 'rank', label: '#', align: 'right', format: (r) => String(r.rank) },
      { key: 'name', label: 'Provinsi', format: (r) => esc(r.name) },
      { key: 'population', label: 'Penduduk (juta jiwa)', align: 'right', format: (r) => fmtNum(r.population, 2) },
      { key: 'share', label: 'Pangsa nasional (%)', align: 'right', format: (r) => fmtNum(r.share, 1) },
    ],
    rows,
  );
  return `${pageHead(
    'Wilayah',
    'Penduduk menurut provinsi, Sensus 2020',
    'Jawa masih menjadi pusat penduduk Indonesia: tiga provinsi di Jawa menampung 46,4 persen penduduk nasional. Tabel di bawah dapat diurutkan, dicari, dan diunduh sebagai CSV.',
  )}
  ${chartCard('Delapan provinsi terpadat (juta jiwa)', hbarChart([...PROVINCES].slice(0, 8).map((p) => ({ name: p.name, value: p.population })), { label: 'Penduduk delapan provinsi terpadat', unit: 'juta jiwa', decimals: 2 }), 'BPS, Sensus Penduduk 2020.')}
  <section class="card">
    <h3>Semua provinsi dalam tabel</h3>
    ${table}
    ${sourceNote('BPS, Sensus Penduduk 2020. Total nasional 270,20 juta jiwa; tabel menampilkan 19 provinsi terbesar.')}
  </section>`;
}

export function renderTentang() {
  return `${pageHead(
    'Tentang',
    'Tentang NusaStat',
    'NusaStat adalah portal statistik Indonesia yang disusun dari publikasi resmi Badan Pusat Statistik (BPS). Situs ini dibuat untuk lomba make.fun dan bukan situs resmi BPS.',
  )}
  <section class="card">
    <h3>Sumber data</h3>
    <p>Seluruh angka pada situs ini berasal dari publikasi Badan Pusat Statistik (BPS): Sensus Penduduk 2020, Estimasi Penduduk, PDB, Indeks Harga Konsumen, Survei Angkatan Kerja Nasional (Sakernas), Kemiskinan, Indeks Pembangunan Manusia, Perdagangan Luar Negeri, Pariwisata, dan Produksi Padi. Setiap grafik dan tabel mencantumkan sumber beserta tahun rujukannya.</p>
    <p>Angka yang ditampilkan adalah angka yang telah dipublikasikan BPS. Bila BPS merevisi suatu angka, situs ini mengikuti angka revisi terakhir yang dipublikasikan.</p>
  </section>
  <section class="card">
    <h3>Metodologi singkat</h3>
    <ul class="notes">
      <li><strong>Pertumbuhan ekonomi</strong> — laju PDB atas dasar harga konstan 2010, year-on-year.</li>
      <li><strong>Inflasi</strong> — perubahan Indeks Harga Konsumen bulan Desember terhadap Desember tahun sebelumnya.</li>
      <li><strong>Pengangguran</strong> — Tingkat Pengangguran Terbuka dari Sakernas bulan Agustus.</li>
      <li><strong>Kemiskinan</strong> — persentase penduduk miskin, keadaan September (garis kemiskinan BPS).</li>
      <li><strong>IPM</strong> — indeks komposit kesehatan (umur harapan hidup), pendidikan (harapan dan rata-rata lama sekolah), dan standar hidup (pengeluaran riil per kapita).</li>
      <li><strong>Penduduk provinsi</strong> — hasil Sensus Penduduk 2020; pangsa dihitung terhadap total nasional 270,20 juta jiwa.</li>
    </ul>
  </section>
  <section class="card">
    <h3>Catatan</h3>
    <p>Situs ini berjalan sepenuhnya dari berkas statis dan tidak mengambil data dari jaringan. Angka dibulatkan sebagaimana dipublikasikan BPS; selisih pembulatan dapat terjadi pada total. Untuk data terbaru, rujuk publikasi resmi BPS di bps.go.id.</p>
    ${sourceNote('Disusun November 2026. Data terakhir: 2024.')}
  </section>`;
}

// Wire the interactive controls of the page that was just rendered.
export function wirePage(root, route) {
  wireTables(root);
  root.querySelectorAll('[data-switch="dash"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const ind = INDICATORS[btn.dataset.value];
      root.querySelectorAll('[data-switch="dash"]').forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      const chart = root.querySelector('#dash-chart');
      if (chart) chart.innerHTML = lineChart(ind.values, { label: ind.name, unit: ind.unit, color: '#0e6b62' });
      const note = root.querySelector('#dash-note');
      if (note) note.textContent = `Sumber: BPS, 2019–2024. ${ind.note}`;
    });
  });
  root.querySelectorAll('[data-switch="period"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      root.querySelectorAll('[data-switch="period"]').forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      const wrap = root.querySelector('#economy-charts');
      if (wrap) wrap.innerHTML = economyCharts(btn.dataset.value);
    });
  });
  root.querySelectorAll('[data-switch="charttype"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      root.querySelectorAll('[data-switch="charttype"]').forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      const ind = INDICATORS.inflation;
      const chart = root.querySelector('#inflation-chart');
      if (chart) {
        chart.innerHTML =
          btn.dataset.value === 'bar'
            ? barChart(ind.values, { label: ind.name, unit: '%', color: '#0e6b62' })
            : lineChart(ind.values, { label: ind.name, unit: '%', color: '#0e6b62' });
      }
    });
  });
}
