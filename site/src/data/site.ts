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

export type NavItem = { label: string; href: string; edition?: 'personal' | 'enterprise' };

/** 一级导航：两条路径 + 能力 + 文档。个人版、企业版的二级面板来自 editions.ts */
export const NAV: NavItem[] = [
  { label: '个人版', href: '/personal/', edition: 'personal' },
  { label: '企业版', href: '/enterprise/', edition: 'enterprise' },
  { label: '能力', href: '/features/' },
  { label: '文档', href: '/docs/' },
];

export const FOOTER_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: '个人版',
    items: [
      { label: '个人版总览', href: '/personal/' },
      { label: '工作方式', href: '/personal/how-it-works/' },
      { label: '本体市场', href: '/packs/' },
      { label: '出网清单', href: '/personal/privacy/' },
      { label: '价格与积分', href: '/price/' },
    ],
  },
  {
    title: '企业版',
    items: [
      { label: '企业版总览', href: '/enterprise/' },
      { label: '部署与交付', href: '/enterprise/deployment/' },
      { label: '安全与数据', href: '/enterprise/security/' },
      { label: '行业场景', href: '/enterprise/solutions/' },
      { label: '预约演示', href: '/enterprise/contact/' },
    ],
  },
  {
    title: '能力与资源',
    items: [
      { label: '能力与版本对照', href: '/features/' },
      { label: '下载与内测', href: '/download/' },
      { label: '快速开始', href: '/docs/quickstart/' },
      { label: '常见问题', href: '/docs/faq/' },
      { label: '更新日志', href: '/changelog/' },
    ],
  },
  {
    title: '关于',
    items: [
      { label: '条款与隐私', href: '/terms/' },
      { label: '联系我们', href: '/enterprise/contact/' },
      { label: '字体与素材许可', href: '/licenses/' },
    ],
  },
];
