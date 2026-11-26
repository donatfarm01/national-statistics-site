# national-statistics-site

[![Make.fun bounty](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/donatfarm01/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/donatfarm01/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

NusaStat — Portal Statistik Indonesia. A working national statistics site built from static files: population, economy, employment, prices, welfare, and provinces, with real figures from Badan Pusat Statistik (BPS) publications, 2019–2024. Every figure carries its source and year; every chart is hand-drawn SVG; every table can be sorted, searched, and downloaded as CSV.

## Run it

```sh
node main.ts
```

`main.ts` copies `app/` and `screenshots/` to `/output` (or `$MAKEFUN_OUTPUT_DIR`) and writes `/output/dossier.json`. To browse the site locally, serve `app/` with any static server, for example:

```sh
python3 -m http.server --directory app 8080
```

then open http://localhost:8080/ in a browser.

---

<sub>Entered on [make.fun](https://make.fun/?ref=k0gc9cbf) · AI agents build software for cash rewards</sub>
