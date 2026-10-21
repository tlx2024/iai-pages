// 个人版与企业版的对外口径单点：Header、首页、页脚、两个中心页都从这里取。
// 两版是两条路径：个人版 = 本体 → 专业 AI 团队 → 项目里派活；企业版 = 覆盖全企业的 AI 生态。
// 可用性只用三档（邀请内测 / 私有化交付 / 规划中），研发四级口径留在 /features/。

export type EditionKey = 'personal' | 'enterprise';
export type Availability = 'invite' | 'delivered' | 'planned';

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  invite: '邀请内测',
  delivered: '私有化交付',
  planned: '规划中',
};

export type EditionLink = { label: string; href: string };

export type Edition = {
  key: EditionKey;
  name: string;
  en: string;
  /** 一句话定位 */
  promise: string;
  lead: string;
  points: string[];
  status: string;
  primary: EditionLink;
  secondary: EditionLink;
  /** 前置条件，一行 */
  requires: string;
  /** Header 二级面板与页脚 */
  pages: (EditionLink & { desc?: string })[];
};

export const EDITIONS: Record<EditionKey, Edition> = {
  personal: {
    key: 'personal',
    name: '个人版',
    en: 'Personal',
    promise: '按你的行业建本体，再组一支专业 AI 团队',
    lead: '一句话描述你的工作，AI 起草本体：有哪些对象、谁负责什么、按什么规矩交付。再按本体里的岗位组一支 AI 团队，在项目里派活、签批、留痕。',
    points: ['AI 起草本体，你逐条采纳', '按岗位与委托契约组建 AI 团队', '资料留在本机，句句有出处'],
    status: '规划与开发中 · 邀请内测',
    primary: { label: '了解个人版', href: '/personal/' },
    secondary: { label: '申请内测', href: '/download/' },
    requires: 'Windows 10/11 · 客户端免费 · 官方 AI 按积分使用',
    pages: [
      { label: '个人版总览', href: '/personal/', desc: '本体 → 团队 → 项目' },
      { label: '工作方式', href: '/personal/how-it-works/', desc: '从资料到带出处的回答' },
      { label: '本体市场', href: '/packs/', desc: '起步包与团队模板' },
      { label: '出网清单', href: '/personal/privacy/', desc: '什么会发出去，什么不会' },
      { label: '价格与积分', href: '/price/', desc: '花钱前先报价' },
    ],
  },
  enterprise: {
    key: 'enterprise',
    name: '企业版',
    en: 'Enterprise',
    promise: '覆盖整个企业的 AI 生态',
    lead: '接入现有系统和消息通道，用统一本体把设备、物料、工艺和人对齐，给每个岗位一个能查、能问、能办的入口。部署在你的内网。',
    points: ['接入 MES / SCADA / ERP 与钉钉、企业微信', '全企业统一本体、知识库与智能体', '权限、审批、审计，私有化部署'],
    status: '私有化交付',
    primary: { label: '了解企业版', href: '/enterprise/' },
    secondary: { label: '预约演示', href: '/enterprise/contact/' },
    requires: 'Linux + Docker · 内网部署 · 本机模型可选',
    pages: [
      { label: '企业版总览', href: '/enterprise/', desc: '生态分层与执行账本' },
      { label: '部署与交付', href: '/enterprise/deployment/', desc: '组成、硬件与交付物' },
      { label: '安全与数据', href: '/enterprise/security/', desc: '数据留厂、权限与审计' },
      { label: '行业场景', href: '/enterprise/solutions/', desc: '制造、医药、研发' },
      { label: '预约演示', href: '/enterprise/contact/', desc: '联系我们' },
    ],
  },
};

/** 当前路径属于哪条路径；首页和公共页返回 null */
export function editionOf(pathname: string, base = ''): EditionKey | null {
  const p = pathname.replace(base, '') || '/';
  if (p.startsWith('/enterprise/')) return 'enterprise';
  if (p.startsWith('/personal/') || p.startsWith('/packs/') || p.startsWith('/price/')) return 'personal';
  return null;
}
