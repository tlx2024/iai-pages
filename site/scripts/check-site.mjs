// Check actual build artifacts: stale product claims, endpoints and local links.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { walk } from './lib.mjs';
import { siteTarget } from '../site-target.mjs';
import { artifactProblems } from './artifact-policy.mjs';

const target = siteTarget(process.env);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.resolve(root, target.outDir);
const htmlFiles = walk(dist).filter((file) => file.endsWith('.html'));
if (!htmlFiles.length) throw new Error('No built HTML found');
const problems = [];
for (const file of walk(dist).filter(file => /\.(html|js|mjs|css|json|xml|txt|svg)$/i.test(file))) {
  const text = fs.readFileSync(path.join(dist, file), 'utf8');
  for (const problem of artifactProblems(text, target)) problems.push(`${file}: ${problem}`);
}
for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(dist, file), 'utf8');
  if (!target.accountPreview && /https?:\/\/(?:127\.0\.0\.1|localhost):/.test(html))
    problems.push(`${file}: local preview origin leaked into a distributable build`);
  const text = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ');
  if (/120\s*天|离线试用|桌面试用|下载试用|IAI-Trial_|原文永不上传|最终解释权/.test(text))
    problems.push(`${file}: stale or unsupported product claim`);
  if (/releases\/download\/[^"\s]+(?:Trial|trial)[^"\s]*/.test(html))
    problems.push(`${file}: obsolete trial artifact link`);
  if (target.mode === 'www' && /(?:href|src|poster)="\/iai-pages\//.test(html))
    problems.push(`${file}: Pages base leaked into www`);
  for (const match of html.matchAll(/\s(?:href|src|poster)="(\/[^"\s]*)"/g)) {
    const url = match[1];
    if (url.startsWith('//')) { problems.push(`${file}: protocol-relative URL`); continue; }
    const pathname = decodeURIComponent(url.split(/[?#]/)[0]);
    if (target.base && pathname !== target.base && !pathname.startsWith(`${target.base}/`)) {
      problems.push(`${file}: missing base: ${url}`); continue;
    }
    const rel = pathname.slice(target.base.length).replace(/^\//, '');
    if (!fs.existsSync(path.join(dist, rel)) && !fs.existsSync(path.join(dist, rel, 'index.html')))
      problems.push(`${file}: missing local target: ${url}`);
  }
}
// Moved routes: every nginx 301 needs a static redirect stub (Pages cannot send 301) pointing at a
// built target, and every stub needs a 301 rule.
const redirectConf = path.resolve(root, '../deploy/www-redirects.conf');
const rules = new Map();
for (const m of fs.readFileSync(redirectConf, 'utf8').matchAll(/^location ~ \^(\/[\w-]+\/)\?\$ \{ return 301 (\/[\w/-]+\/); \}$/gm))
  rules.set(m[1], m[2]);
if (!rules.size) problems.push('deploy/www-redirects.conf: no redirect rules parsed');
for (const [from, to] of rules) {
  const stub = path.join(dist, from, 'index.html');
  if (!fs.existsSync(stub)) { problems.push(`redirect ${from}: static stub missing`); continue; }
  const refresh = fs.readFileSync(stub, 'utf8').match(/http-equiv="refresh" content="0; url=([^"]+)"/);
  if (!refresh || refresh[1] !== `${target.base}${to}`) problems.push(`redirect ${from}: stub points to ${refresh?.[1]}, nginx to ${to}`);
  if (!fs.existsSync(path.join(dist, to, 'index.html'))) problems.push(`redirect ${from}: target ${to} not built`);
}
for (const file of htmlFiles) {
  if (!/http-equiv="refresh"/.test(fs.readFileSync(path.join(dist, file), 'utf8'))) continue;
  const from = `/${path.dirname(file).replace(/\\/g, '/')}/`;
  if (!rules.has(from)) problems.push(`${file}: redirect stub has no 301 rule in deploy/www-redirects.conf`);
}
if (problems.length) throw new Error([...new Set(problems)].join('\n'));
console.log(`[site] ${target.mode}: ${htmlFiles.length} pages; product claims and links passed`);
