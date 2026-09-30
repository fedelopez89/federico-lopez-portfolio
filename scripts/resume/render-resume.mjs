// Renders scripts/resume/resume.html to public/pdf/Resume_LOPEZ_Federico.pdf
// (one A4 page) with a local headless Chrome. Run manually when the resume
// copy changes:
//   node scripts/resume/render-resume.mjs [path-to-chrome]
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, 'resume.html');
const output = resolve(here, '../../public/pdf/Resume_LOPEZ_Federico.pdf');

const candidates = [
  process.argv[2],
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const chrome = candidates.find((path) => existsSync(path));
if (!chrome) {
  console.error(
    'Chrome not found. Pass its path as the first argument or set CHROME_PATH.'
  );
  process.exit(1);
}

execFileSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--virtual-time-budget=2000',
    `--print-to-pdf=${output}`,
    pathToFileURL(source).href,
  ],
  { stdio: 'ignore' }
);

console.log(`Wrote ${output}`);
