// 下载页数据：构建时读取公开仓库各版本 Release 附带的 release.json（结构见发布流水线方案 §5）。
//
// 数据来源（按优先级）：
//   1. 环境变量 RELEASES_FILE：本地 JSON 文件（release.json 数组），用于本地预览下载页；
//   2. GitHub Releases API（公开仓库，匿名即可；CI 里带上 GITHUB_TOKEN 放宽限流）。
// CI（CI=true）下取数失败直接让构建失败，避免发布后官网误显示“即将发布”；本地取数失败只告警。
import fs from 'node:fs';
import { PUBLIC_REPO } from '../data/site';

export type AssetKind = 'desktop-trial' | 'server-kit' | 'server-images' | (string & {});

export type ReleaseAsset = {
  id: string;
  kind: AssetKind;
  file: string;
  size?: number;
  sha256?: string;
  visibility: 'public' | 'restricted';
  expires_days?: number;
  requirements?: string;
  /** 只有 public 条目才有下载地址 */
  url?: string;
  /** restricted 条目的获取方式 */
  obtain?: string;
};

export type Release = {
  version: string;
  tag: string;
  date: string;
  channel: 'stable' | 'rc' | (string & {});
  notes?: string;
  htmlUrl?: string;
  assets: ReleaseAsset[];
};

type GhAsset = { name: string; size: number; browser_download_url: string };
type GhRelease = {
  tag_name: string;
  name: string | null;
  draft: boolean;
  prerelease: boolean;
  published_at: string | null;
  html_url: string;
  assets: GhAsset[];
};

const DOWNLOAD_PREFIX = `https://github.com/${PUBLIC_REPO}/releases/download/`;

function normalizeAsset(a: ReleaseAsset): ReleaseAsset {
  const asset = { ...a, visibility: a.visibility === 'public' ? 'public' : 'restricted' } as ReleaseAsset;
  // 受控制品一律不带地址；公开制品只接受本仓库 Release 的下载地址
  if (asset.visibility === 'restricted' || (asset.url && !asset.url.startsWith(DOWNLOAD_PREFIX))) {
    delete asset.url;
  }
  return asset;
}

function normalize(r: Partial<Release> & { version: string }, gh?: GhRelease): Release {
  const tag = r.tag ?? gh?.tag_name ?? `v${r.version}`;
  return {
    version: r.version.replace(/^v/, ''),
    tag,
    date: (r.date ?? gh?.published_at ?? '').slice(0, 10),
    channel: r.channel ?? (gh?.prerelease ? 'rc' : 'stable'),
    notes: r.notes,
    htmlUrl: r.htmlUrl ?? gh?.html_url,
    assets: (r.assets ?? []).map(normalizeAsset),
  };
}

/** Release 没有附 release.json 时，按附件列表兜底生成（只列公开附件，没有校验和） */
function fromGhOnly(gh: GhRelease): Release {
  return normalize(
    {
      version: gh.tag_name,
      assets: gh.assets
        .filter((a) => !/^(release\.json|SHA256SUMS.*)$/i.test(a.name))
        .map((a) => ({
          id: a.name,
          kind: /setup\.exe$|\.msi$/i.test(a.name) ? 'desktop-trial' : /deploy-kit/i.test(a.name) ? 'server-kit' : 'other',
          file: a.name,
          size: a.size,
          visibility: 'public' as const,
          url: a.browser_download_url,
        })),
    },
    gh,
  );
}

async function fetchJson<T>(url: string): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json', 'User-Agent': 'iai-pages-build' };
  if (process.env.GITHUB_TOKEN && url.startsWith('https://api.github.com/')) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} ← ${url}`);
  return (await res.json()) as T;
}

async function fromGitHub(): Promise<Release[]> {
  const list = await fetchJson<GhRelease[]>(`https://api.github.com/repos/${PUBLIC_REPO}/releases?per_page=50`);
  const out: Release[] = [];
  for (const gh of list.filter((r) => !r.draft)) {
    const manifest = gh.assets.find((a) => a.name === 'release.json');
    if (!manifest) {
      out.push(fromGhOnly(gh));
      continue;
    }
    const data = await fetchJson<Partial<Release> & { version: string }>(manifest.browser_download_url);
    out.push(normalize(data, gh));
  }
  return out;
}

function fromFile(path: string): Release[] {
  const data = JSON.parse(fs.readFileSync(path, 'utf8')) as (Partial<Release> & { version: string })[];
  return data.map((r) => normalize(r));
}

const byDateDesc = (a: Release, b: Release) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

let cache: Promise<Release[]> | undefined;

export function getReleases(): Promise<Release[]> {
  cache ??= (async () => {
    if (process.env.RELEASES_FILE) return fromFile(process.env.RELEASES_FILE).sort(byDateDesc);
    try {
      return (await fromGitHub()).sort(byDateDesc);
    } catch (err) {
      if (process.env.CI === 'true') throw new Error(`读取 Release 失败：${(err as Error).message}`);
      console.warn(`[releases] 读取失败，下载页按“尚无版本”渲染：${(err as Error).message}`);
      return [];
    }
  })();
  return cache;
}

/** 最新的正式版；没有正式版时退回最新的预发布版 */
export async function getLatest(): Promise<Release | undefined> {
  const all = await getReleases();
  return all.find((r) => r.channel === 'stable') ?? all[0];
}

export const fmtSize = (bytes?: number) => {
  if (!bytes) return '—';
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
};
