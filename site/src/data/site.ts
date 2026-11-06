// 站点级常量与导航。对外口径：功能状态与 README「能力概览」一致，不把规划中的写成已有。

export const BRAND = {
  name: 'IAI智能工厂中枢',
  short: 'IAI',
  full: 'IAI智能工厂中枢',
  en: 'Industrial AI Harness',
  tagline: '先立规矩，再让 AI 干活。',
};

/** 对外联系邮箱。留空时各页显示「联系方式即将公布」，填上后自动生成 mailto 链接。 */
export const CONTACT_EMAIL = '';

/** 公开制品仓库（官网与 Release 都在这里） */
export const PUBLIC_REPO = 'tlx2024/iai-pages';

export type NavItem = { label: string; href: string };

/** 一级导航：功能、场景、部署、安全、文档、更新日志 */
export const NAV: NavItem[] = [
  { label: '功能', href: '/features/' },
  { label: '场景', href: '/enterprise/solutions/' },
  { label: '部署', href: '/enterprise/deployment/' },
  { label: '安全', href: '/enterprise/security/' },
  { label: '文档', href: '/docs/' },
  { label: '更新日志', href: '/changelog/' },
];

export const FOOTER_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: '产品与方案',
    items: [
      { label: '功能总览', href: '/features/' },
      { label: '行业场景', href: '/enterprise/solutions/' },
      { label: '部署形态', href: '/enterprise/deployment/' },
      { label: '安全与数据', href: '/enterprise/security/' },
    ],
  },
  {
    title: '获取与交付',
    items: [
      { label: '预约演示', href: '/enterprise/contact/' },
      { label: '私有部署', href: '/enterprise/deployment/' },
      { label: '制品与下载', href: '/download/' },
      { label: '更新日志', href: '/changelog/' },
    ],
  },
  {
    title: '文档与支持',
    items: [
      { label: '文档首页', href: '/docs/' },
      { label: '快速开始', href: '/docs/quickstart/' },
      { label: '私有部署指南', href: '/docs/deployment/' },
      { label: '模型准备', href: '/docs/models/' },
      { label: '常见问题', href: '/docs/faq/' },
    ],
  },
  {
    title: '关于',
    items: [
      { label: '交付与安全条款', href: '/terms/' },
      { label: '联系我们', href: '/enterprise/contact/' },
      { label: '字体与素材许可', href: '/licenses/' },
    ],
  },
];
