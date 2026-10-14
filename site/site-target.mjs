// Shared by Astro, font generation and publication gates.
/** @param {Record<string, string | undefined>} env */
export function siteTarget(env = process.env) {
  const mode = env.SITE_MODE ?? 'pages';
  if (!['pages', 'www'].includes(mode)) throw new Error('SITE_MODE must be pages or www');
  /** @param {string | undefined} raw @param {string} name */
  const origin = (raw, name) => {
    if (!raw) return '';
    const url = new URL(raw);
    if (url.protocol !== 'https:' || url.username || url.password || url.search ||
        url.hash || url.pathname !== '/') throw new Error(`${name} must be an HTTPS origin`);
    if (/\s/.test(raw) || !url.hostname.includes('.') || url.hostname.includes(':') ||
        url.hostname === 'localhost' || url.hostname.endsWith('.local') ||
        /^\d+(\.\d+){3}$/.test(url.hostname)) throw new Error(`${name} must be a public hostname`);
    if ((url.hostname.endsWith('.example') || url.hostname.endsWith('.invalid') || url.hostname.endsWith('.test')) &&
        env.SITE_PREVIEW !== 'true') throw new Error(`${name} is a placeholder; set SITE_PREVIEW=true only for review`);
    return url.origin;
  };
  const site = mode === 'pages' ? 'https://tlx2024.github.io' : origin(env.WWW_ORIGIN, 'WWW_ORIGIN');
  if (!site) throw new Error('WWW_ORIGIN is required for the www build');
  const account = origin(env.ACCOUNT_ORIGIN, 'ACCOUNT_ORIGIN');
  const download = origin(env.DOWNLOAD_ORIGIN, 'DOWNLOAD_ORIGIN');
  const official = origin(env.OFFICIAL_WWW_ORIGIN, 'OFFICIAL_WWW_ORIGIN');
  let accountPreview = '';
  if (env.SITE_ACCOUNT_PREVIEW_ORIGIN) {
    const url = new URL(env.SITE_ACCOUNT_PREVIEW_ORIGIN);
    if (mode !== 'www' || env.SITE_PREVIEW !== 'true' || url.protocol !== 'http:' ||
        !['127.0.0.1', 'localhost'].includes(url.hostname) || !url.port ||
        Number(url.port) < 1024 || url.username || url.password || url.search || url.hash ||
        url.pathname !== '/' || /\s/.test(env.SITE_ACCOUNT_PREVIEW_ORIGIN))
      throw new Error('Account preview requires an explicit loopback port in a www review build');
    accountPreview = url.origin;
  }
  if (new Set([site, account, download].filter(Boolean)).size !== [site, account, download].filter(Boolean).length)
    throw new Error('www, account and download must use separate origins');
  for (const endpoint of [account, download, official]) {
    if (endpoint && new URL(endpoint).hostname.endsWith('github.io'))
      throw new Error('Official endpoints must not point to GitHub Pages');
  }
  return { mode, site, base: mode === 'pages' ? '/iai-pages' : '',
    outDir: `./dist/${mode}`, account, accountPreview, download, official,
    preview: env.SITE_PREVIEW === 'true' };
}
