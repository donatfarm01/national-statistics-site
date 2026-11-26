// data.js — every figure on this site, with its source and year.
// All figures are published statistics of Badan Pusat Statistik (BPS).
// A series is an array of { year, value } pairs; values are rounded as BPS
// publishes them. Nothing here is invented: where BPS publishes a revision,
// the latest published value is used.

export const YEARS = [2019, 2020, 2021, 2022, 2023, 2024];

export const INDICATORS = {
  growth: {
    id: 'growth',
    name: 'Pertumbuhan ekonomi',
    short: 'Pertumbuhan PDB',
    unit: '% (yoy)',
    source: 'BPS',
    note: 'Laju pertumbuhan PDB atas dasar harga konstan 2010, year-on-year.',
    values: [
      { year: 2019, value: 5.02 },
      { year: 2020, value: -2.07 },
      { year: 2021, value: 3.7 },
      { year: 2022, value: 5.31 },
      { year: 2023, value: 5.05 },
      { year: 2024, value: 5.03 },
    ],
  },
  inflation: {
    id: 'inflation',
    name: 'Inflasi tahunan',
    short: 'Inflasi (Des, yoy)',
    unit: '% (yoy)',
    source: 'BPS',
    note: 'Inflasi Indeks Harga Konsumen bulan Desember terhadap Desember tahun sebelumnya.',
    values: [
      { year: 2019, value: 2.72 },
      { year: 2020, value: 1.68 },
      { year: 2021, value: 1.87 },
      { year: 2022, value: 5.51 },
      { year: 2023, value: 2.61 },
      { year: 2024, value: 1.57 },
    ],
  },
  unemployment: {
    id: 'unemployment',
    name: 'Tingkat pengangguran terbuka',
    short: 'Pengangguran (Agu)',
    unit: '%',
    source: 'BPS',
    note: 'Tingkat Pengangguran Terbuka (TPT) hasil Survei Angkatan Kerja Nasional bulan Agustus.',
    values: [
      { year: 2019, value: 5.28 },
      { year: 2020, value: 7.07 },
      { year: 2021, value: 6.49 },
      { year: 2022, value: 5.86 },
      { year: 2023, value: 5.32 },
      { year: 2024, value: 4.91 },
    ],
  },
  poverty: {
    id: 'poverty',
    name: 'Penduduk miskin',
    short: 'Kemiskinan (Sep)',
    unit: '%',
    source: 'BPS',
    note: 'Persentase penduduk miskin terhadap total penduduk, keadaan September.',
    values: [
      { year: 2019, value: 9.22 },
      { year: 2020, value: 10.19 },
      { year: 2021, value: 9.71 },
      { year: 2022, value: 9.57 },
      { year: 2023, value: 9.36 },
      { year: 2024, value: 8.57 },
    ],
  },
  hdi: {
    id: 'hdi',
    name: 'Indeks Pembangunan Manusia',
    short: 'IPM',
    unit: 'indeks',
    source: 'BPS',
    note: 'IPM mengukur capaian pembangunan manusia: kesehatan, pendidikan, dan standar hidup layak.',
    values: [
      { year: 2019, value: 71.92 },
      { year: 2020, value: 71.94 },
      { year: 2021, value: 72.29 },
      { year: 2022, value: 73.37 },
      { year: 2023, value: 74.39 },
      { year: 2024, value: 75.02 },
    ],
  },
  population: {
    id: 'population',
    name: 'Jumlah penduduk',
    short: 'Penduduk',
    unit: 'juta jiwa',
    source: 'BPS',
    note: 'Estimasi penduduk pertengahan tahun; 2020 adalah hasil Sensus Penduduk 2020.',
    values: [
      { year: 2019, value: 269.6 },
      { year: 2020, value: 270.2 },
      { year: 2021, value: 272.68 },
      { year: 2022, value: 275.77 },
      { year: 2023, value: 278.69 },
      { year: 2024, value: 281.6 },
    ],
  },
  gdpPerCapita: {
    id: 'gdpPerCapita',
    name: 'PDB per kapita',
    short: 'PDB per kapita',
    unit: 'Rp juta',
    source: 'BPS',
    note: 'PDB atas dasar harga berlaku dibagi jumlah penduduk pertengahan tahun.',
    values: [
      { year: 2019, value: 59.3 },
      { year: 2020, value: 57.3 },
      { year: 2021, value: 62.2 },
      { year: 2022, value: 71.0 },
      { year: 2023, value: 75.0 },
      { year: 2024, value: 78.6 },
    ],
  },
  gini: {
    id: 'gini',
    name: 'Rasio gini',
    short: 'Gini (Mar)',
    unit: 'rasio',
    source: 'BPS',
    note: 'Rasio gini mengukur ketimpangan pengeluaran penduduk, keadaan Maret. 0 berarti merata sempurna.',
    values: [
      { year: 2019, value: 0.382 },
      { year: 2020, value: 0.381 },
      { year: 2021, value: 0.384 },
      { year: 2022, value: 0.384 },
      { year: 2023, value: 0.379 },
      { year: 2024, value: 0.379 },
    ],
  },
  lifeExpectancy: {
    id: 'lifeExpectancy',
    name: 'Umur harapan hidup',
    short: 'Umur harapan hidup',
    unit: 'tahun',
    source: 'BPS',
    note: 'Umur harapan hidup saat lahir, hasil proyeksi penduduk dan Survei Sosial Ekonomi Nasional.',
    values: [
      { year: 2019, value: 71.34 },
      { year: 2020, value: 71.47 },
      { year: 2021, value: 71.68 },
      { year: 2022, value: 73.01 },
      { year: 2023, value: 73.93 },
      { year: 2024, value: 74.15 },
    ],
  },
  exports: {
    id: 'exports',
    name: 'Nilai ekspor',
    short: 'Ekspor',
    unit: 'US$ miliar',
    source: 'BPS',
    note: 'Nilai ekspor barang (migas dan nonmigas) menurut dokumen PEB dan statistik bea cukai.',
    values: [
      { year: 2019, value: 167.68 },
      { year: 2020, value: 163.19 },
      { year: 2021, value: 231.61 },
      { year: 2022, value: 291.9 },
      { year: 2023, value: 258.82 },
      { year: 2024, value: 264.7 },
    ],
  },
  imports: {
    id: 'imports',
    name: 'Nilai impor',
    short: 'Impor',
    unit: 'US$ miliar',
    source: 'BPS',
    note: 'Nilai impor barang (migas dan nonmigas) menurut dokumen PIB dan statistik bea cukai.',
    values: [
      { year: 2019, value: 171.28 },
      { year: 2020, value: 141.57 },
      { year: 2021, value: 196.19 },
      { year: 2022, value: 237.51 },
      { year: 2023, value: 221.89 },
      { year: 2024, value: 233.66 },
    ],
  },
  tourists: {
    id: 'tourists',
    name: 'Kunjungan wisatawan mancanegara',
    short: 'Wisman',
    unit: 'juta kunjungan',
    source: 'BPS',
    note: 'Jumlah kunjungan wisatawan mancanegara melalui seluruh pintu masuk.',
    values: [
      { year: 2019, value: 16.11 },
      { year: 2020, value: 4.05 },
      { year: 2021, value: 1.56 },
      { year: 2022, value: 5.89 },
      { year: 2023, value: 11.68 },
      { year: 2024, value: 13.9 },
    ],
  },
  rice: {
    id: 'rice',
    name: 'Produksi padi',
    short: 'Produksi padi',
    unit: 'juta ton GKG',
    source: 'BPS',
    note: 'Produksi padi dalam gabah kering giling (GKG), hasil Survei Pertanian dan Kerangka Sampel Area.',
    values: [
      { year: 2019, value: 54.6 },
      { year: 2020, value: 54.65 },
      { year: 2021, value: 54.42 },
      { year: 2022, value: 54.75 },
      { year: 2023, value: 53.98 },
      { year: 2024, value: 52.66 },
    ],
  },
};

// Headline facts shown as KPI cards. Each one names its figure, year and source.
export const HEADLINES = [
  { indicator: 'population', label: 'Penduduk', year: 2024, decimals: 1, suffix: ' jt jiwa', changeUnit: 'jt jiwa' },
  { indicator: 'growth', label: 'Pertumbuhan ekonomi', year: 2024, decimals: 2, suffix: '%' },
  { indicator: 'inflation', label: 'Inflasi (Des 2024, yoy)', year: 2024, decimals: 2, suffix: '%' },
  { indicator: 'unemployment', label: 'Pengangguran (Agu 2024)', year: 2024, decimals: 2, suffix: '%' },
  { indicator: 'poverty', label: 'Penduduk miskin (Sep 2024)', year: 2024, decimals: 2, suffix: '%' },
  { indicator: 'hdi', label: 'IPM', year: 2024, decimals: 2, suffix: '' },
];

export function latest(indicatorId) {
  const series = INDICATORS[indicatorId].values;
  return series[series.length - 1];
}

export function previous(indicatorId) {
  const series = INDICATORS[indicatorId].values;
  return series[series.length - 2];
}

// Change in points between the last two years, with a readable sign.
export function pointChange(indicatorId) {
  const a = latest(indicatorId).value;
  const b = previous(indicatorId).value;
  const d = a - b;
  const sign = d > 0 ? '+' : d < 0 ? '−' : '';
  return sign + Math.abs(d).toLocaleString('id-ID', { maximumFractionDigits: 2 });
}

// Penduduk per provinsi, Sensus Penduduk 2020 (BPS). 19 provinsi terbesar;
// pangsa dihitung terhadap total nasional 270,20 juta jiwa.
export const PROVINCES = [
  { name: 'Jawa Barat', population: 48.27 },
  { name: 'Jawa Timur', population: 40.67 },
  { name: 'Jawa Tengah', population: 36.52 },
  { name: 'Sumatera Utara', population: 14.8 },
  { name: 'Banten', population: 11.9 },
  { name: 'DKI Jakarta', population: 10.56 },
  { name: 'Sulawesi Selatan', population: 9.07 },
  { name: 'Lampung', population: 9.01 },
  { name: 'Sumatera Selatan', population: 8.47 },
  { name: 'Riau', population: 6.39 },
  { name: 'Sumatera Barat', population: 5.53 },
  { name: 'Kalimantan Barat', population: 5.41 },
  { name: 'Nusa Tenggara Timur', population: 5.33 },
  { name: 'Nusa Tenggara Barat', population: 5.32 },
  { name: 'Bali', population: 4.32 },
  { name: 'Papua', population: 4.3 },
  { name: 'Kalimantan Timur', population: 3.77 },
  { name: 'DI Yogyakarta', population: 3.67 },
  { name: 'Sulawesi Tengah', population: 2.99 },
];

export const CENSUS_TOTAL = 270.2;

// Struktur PDB menurut lapangan usaha, 2024 (BPS). Empat lapangan usaha
// terbesar; sisanya diringkas sebagai "Lapangan usaha lainnya".
export const SECTORS_2024 = [
  { name: 'Industri pengolahan', share: 18.7 },
  { name: 'Perdagangan', share: 13.0 },
  { name: 'Pertanian, kehutanan, dan perikanan', share: 11.9 },
  { name: 'Konstruksi', share: 10.0 },
  { name: 'Lapangan usaha lainnya', share: 46.4 },
];

// Rilis statistik terbaru yang dirujuk situs ini.
export const RELEASES = [
  {
    date: '5 Februari 2025',
    title: 'Pertumbuhan ekonomi 2024 mencapai 5,03 persen',
    detail: 'PDB Indonesia tumbuh 5,03% (yoy) pada 2024; triwulan IV-2024 tumbuh 5,02% (yoy).',
    source: 'BPS',
  },
  {
    date: '2 Januari 2025',
    title: 'Inflasi Desember 2024 sebesar 1,57 persen (yoy)',
    detail: 'Inflasi tahun kalender 2024 tercatat 1,57%, terendah dalam beberapa tahun terakhir.',
    source: 'BPS',
  },
  {
    date: '15 Januari 2025',
    title: 'Penduduk miskin September 2024 turun menjadi 8,57 persen',
    detail: 'Jumlah penduduk miskin 24,06 juta orang, turun 0,46 poin dari Maret 2024.',
    source: 'BPS',
  },
  {
    date: '15 November 2024',
    title: 'IPM 2024 naik menjadi 75,02',
    detail: 'Indeks Pembangunan Manusia 2024 naik 0,63 poin dari 74,39 pada 2023; status "tinggi".',
    source: 'BPS',
  },
  {
    date: '5 November 2024',
    title: 'Pengangguran Agustus 2024 turun menjadi 4,91 persen',
    detail: 'Tingkat Pengangguran Terbuka Agustus 2024 turun 0,41 poin dari Agustus 2023.',
    source: 'BPS',
  },
];
