// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import { siteTarget } from './site-target.mjs';
import remarkSiteLinks from './scripts/remark-site-links.mjs';

const target = siteTarget(process.env);
const SITE = target.site;
const BASE = target.base;

export default defineConfig({
  site: SITE,
  base: BASE || '/',
  outDir: target.outDir,
  cacheDir: './.cache/astro',
  markdown: { processor: satteri({ mdastPlugins: [remarkSiteLinks({ base: BASE })] }) },
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'IAI智能工厂中枢',
      description: 'IAI智能工厂中枢的个人版指南、私有部署指南与常见问题。',
      logo: { src: './src/assets/logo.png', alt: 'IAI' },
      favicon: '/favicon.png',
      defaultLocale: 'root',
      locales: { root: { label: '简体中文', lang: 'zh-CN' } },
      customCss: ['./src/styles/docs.css'],
      head: [{ tag: 'link', attrs: { rel: 'stylesheet', href: `${BASE}/fonts/fonts.css` } }],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/tlx2024/iai-pages' }],
      disable404Route: true,
      lastUpdated: false,
      sidebar: [
        {
          label: '开始',
          items: [
            { label: '文档首页', slug: 'docs' },
            'docs/quickstart',
            'docs/models',
          ],
        },
        {
          label: '个人版',
          items: ['docs/trial'],
        },
        {
          label: '企业版',
          items: ['docs/deployment'],
        },
        'docs/faq',
        {
          label: '官网',
          items: [
            { label: '返回首页', link: '/' },
            { label: '个人版', link: '/personal/' },
            { label: '企业版', link: '/enterprise/' },
            { label: '能力', link: '/features/' },
            { label: '下载', link: '/download/' },
            { label: '更新日志', link: '/changelog/' },
          ],
        },
      ],
    }),
  ],
  vite: { cacheDir: './.vite', resolve: { preserveSymlinks: true }, plugins: [tailwindcss()] },
});
