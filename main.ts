// main.ts — hands the NusaStat site in. Node 22 standard library only.
// Copies app/ and screenshots/ from this repository into the output
// directory and writes dossier.json with buildDossier from the kit's
// vendor/makefun-frontend.ts, exactly as the kit requires. The program is
// deterministic: the same repository always produces the same bytes.

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

function copyTree(name: string): void {
  const source = join(repoRoot, name);
  const target = join(outputDir, name);
  if (!existsSync(source)) {
    throw new Error(`main.ts: ${name}/ is missing from the repository`);
  }
  mkdirSync(target, { recursive: true });
  copyDir(source, target);
}

// Recursive, sorted copy: deterministic order, no symlinks followed.
function copyDir(source: string, target: string): void {
  for (const entry of readdirSync(source, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : 1))) {
    const from = join(source, entry.name);
    const to = join(target, entry.name);
    if (entry.isDirectory()) {
      mkdirSync(to, { recursive: true });
      copyDir(from, to);
    } else if (entry.isFile()) {
      cpSync(from, to);
    }
  }
}

mkdirSync(outputDir, { recursive: true });
copyTree('app');
copyTree('screenshots');

const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);

// Sanity read-back: the dossier must be valid JSON with the schema we expect.
const check = JSON.parse(readFileSync(join(outputDir, 'dossier.json'), 'utf8')) as { schema?: string };
if (check.schema !== 'makefun/dossier/v1') {
  throw new Error('main.ts: dossier.json has an unexpected schema');
}
console.log(`main.ts: wrote ${outputDir}/dossier.json (${dossier.length} bytes)`);
