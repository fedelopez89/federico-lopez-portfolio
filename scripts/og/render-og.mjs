// Renders scripts/og/home.html to public/images/og-image.png (1200x630) with
// a local headless Chrome. Run manually when the profile copy changes:
//   node scripts/og/render-og.mjs [path-to-chrome]
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, 'home.html');
const output = resolve(here, '../../public/images/og-image.png');

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
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    '--virtual-time-budget=2000',
    `--screenshot=${output}`,
    pathToFileURL(source).href,
  ],
  { stdio: 'ignore' }
);

console.log(`Wrote ${output}`);
