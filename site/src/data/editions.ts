// 企业版对外口径单点：Header、首页、页脚、各页面都从这里取。
// 可用性只用三档（邀请内测 / 私有化交付 / 规划中）

export type EditionKey = 'enterprise';
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
  pages: (EditionLink & { desc?: string })[];
};

export const EDITIONS: Record<string, Edition> = {
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

/** 当前路径属于哪条路径；全站统一为企业版 */
export function editionOf(_pathname: string, _base = ''): EditionKey {
  return 'enterprise';
}
