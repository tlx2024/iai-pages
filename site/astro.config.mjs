// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

// 站点挂在 https://tlx2024.github.io/iai-pages/ 子路径下：内部链接一律经 src/lib/url.ts 的 href() 拼接 base。
const SITE = 'https://tlx2024.github.io';
const BASE = '/iai-pages';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'IAI 文档',
      description: '平方和工厂智能中枢（IAI）的试用版指南、私有部署指南与常见问题。',
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
          ],
        },
        {
          label: '指南',
          items: [
            'docs/trial',
            'docs/deployment',
            'docs/models',
          ],
        },
        'docs/faq',
        {
          label: '官网',
          items: [
            { label: '返回首页', link: '/' },
            { label: '功能', link: '/features/assistant/' },
            { label: '下载', link: '/download/' },
            { label: '更新日志', link: '/changelog/' },
          ],
        },
      ],
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
