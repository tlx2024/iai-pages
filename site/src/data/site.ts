// 站点级常量与导航。对外口径：功能状态与 README「能力概览」一致，不把规划中的写成已有。

export const BRAND = {
  name: '平方和工厂智能中枢',
  short: 'IAI',
  full: '平方和工厂智能中枢（IAI）',
  en: 'Industrial AI Harness',
  tagline: '把查系统、翻报表、找老师傅，变成一次对话。',
};

/** 对外联系邮箱。留空时各页显示「联系方式即将公布」，填上后自动生成 mailto 链接。 */
export const CONTACT_EMAIL = '';

/** 公开制品仓库（官网与 Release 都在这里） */
export const PUBLIC_REPO = 'tlx2024/iai-pages';

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: '功能', href: '/features/' },
  { label: '场景', href: '/solutions/' },
  { label: '部署', href: '/deployment/' },
  { label: '安全', href: '/security/' },
  { label: '文档', href: '/docs/' },
  { label: '更新日志', href: '/changelog/' },
];

export const FOOTER_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: '产品',
    items: [
      { label: '功能总览', href: '/features/' },
      { label: '行业场景', href: '/solutions/' },
      { label: '部署形态', href: '/deployment/' },
      { label: '安全与数据', href: '/security/' },
    ],
  },
  {
    title: '获取',
    items: [
      { label: '下载试用版', href: '/download/' },
      { label: '私有部署', href: '/docs/deployment/' },
      { label: '更新日志', href: '/changelog/' },
    ],
  },
  {
    title: '文档',
    items: [
      { label: '快速开始', href: '/docs/quickstart/' },
      { label: '试用版指南', href: '/docs/trial/' },
      { label: '常见问题', href: '/docs/faq/' },
    ],
  },
  {
    title: '关于',
    items: [
      { label: '联系我们', href: '/contact/' },
      { label: '字体与素材许可', href: '/licenses/' },
    ],
  },
];
