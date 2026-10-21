// 官网本体市场静态目录（P0 静态页）：构建期读取，不调用运行时 API、不读 Cookie。
// 当前三个包随个人版客户端内置；在线目录、外层包签名与第三方投稿在后续版本接入。

export type PackDomain = 'manufacturing' | 'formulation' | 'organization';

export interface Pack {
  slug: string;
  version: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string[];
  domain: PackDomain;
  domainLabel: string;
  icon: 'factory' | 'flask' | 'layout';
  industryName: string;
  tags: string[];
  publisher: string;
  license: string;
  minApp: string;
  bundleFormat: string;
  counts: {
    types: number;
    examples: number;
    sources: number;
    questions: number;
    agents: number;
    cockpits: number;
  };
  sizeBytes: number;
  permissions: string[];
  grantsNote: string;
  highlights: string[];
  changelog: string;
  updatedAt: string;
}

export const PACKS: Pack[] = [
  {
    slug: 'contact-lens-factory',
    version: '1.0.0',
    title: '隐形眼镜工厂起步包',
    subtitle: '从原料、工序到质检的离散制造示例世界',
    summary: '有产线、工位、设备和质量规范的工厂；适合制造现场快速搭起一套可问答、可追溯的本体。',
    description: [
      '以干湿双线隐形眼镜工厂为样本，覆盖产线、工序/工位、检测、缺陷、Spec、SOP、案例与设备八类对象。',
      '装入后能看到从工位交接、缺陷归因到检测规范的完整示例，并可在数据孪生中映射产线与车间。所有示例对象都带〔示例〕标记，可以随时清理后重新装回。',
    ],
    domain: 'manufacturing',
    domainLabel: '离散制造',
    icon: 'factory',
    industryName: '隐形眼镜制造工厂（干湿双线）',
    tags: ['隐形眼镜', '离散制造', '质检', 'SOP', '设备'],
    publisher: 'IAI 官方',
    license: 'CC-BY-4.0',
    minApp: '0.2.0',
    bundleFormat: 'iai.ontology-design.v2',
    counts: { types: 7, examples: 28, sources: 12, questions: 12, agents: 0, cockpits: 0 },
    sizeBytes: 94669,
    permissions: [],
    grantsNote: '本包含参考场景，安装时会授予本人资源树管理权限（resources:manage）。',
    highlights: [
      '7 个类型覆盖产线、工位、检测、缺陷、设备与 SOP',
      '28 个带〔示例〕标记的对象，装完即可浏览与问答',
      '12 篇测试文章作为出处，回答时可以引用',
      '含参考场景，可映射到数据孪生',
    ],
    changelog: '首个随客户端分发的官方精选版本：干湿双线工厂的产线、工位、检测与缺陷示例。',
    updatedAt: '2026-10-20',
  },
  {
    slug: 'formulation-team',
    version: '1.0.0',
    title: '配方研发组起步包',
    subtitle: '配方、实验批次与表征结果的研发协作世界',
    summary: '小团队做配方研发：原料、配方版本、实验批次、性能表征与结论，适合实验室与材料研发。',
    description: [
      '以配方演化脉络、实验批次与关键理化指标为核心，覆盖研发项目、配方、实验、表征结果、性能指标、物料、工艺路线、研发工站与样品批次。',
      '装入后可以对比配方版本、追溯实验批次与原料去向，并查看由示例数据生成的 Wiki 对象页和驾驶舱。示例对象都带〔示例〕标记，可清理后恢复。',
    ],
    domain: 'formulation',
    domainLabel: '研发实验',
    icon: 'flask',
    industryName: '配方开发小组（配方—实验—表征）',
    tags: ['配方', '实验', '表征', '研发', '批次'],
    publisher: 'IAI 官方',
    license: 'CC-BY-4.0',
    minApp: '0.2.0',
    bundleFormat: 'iai.ontology-design.v2',
    counts: { types: 10, examples: 153, sources: 14, questions: 10, agents: 0, cockpits: 1 },
    sizeBytes: 156105,
    permissions: [],
    grantsNote: '本包未声明额外权限；安装后即可在当前个人工作区浏览与问答。',
    highlights: [
      '配方版本与实验批次可追溯',
      '153 个示例对象覆盖原料、实验与表征结果',
      '14 篇测试文章作为出处',
      '含 1 个示例驾驶舱',
    ],
    changelog: '首个随客户端分发的官方精选版本：配方、实验与表征的研发协作示例。',
    updatedAt: '2026-10-20',
  },
  {
    slug: 'personal-opc',
    version: '1.0.0',
    title: '一人公司起步包',
    subtitle: '一个人加 AI 代理经营的业务本体',
    summary: '创始人、虚拟部门、委托契约、流程与交付成果；适合独立研究者、工作室与超级个体。',
    description: [
      '把一人公司的业务范畴、AI 代理画像、委托契约、流程、任务、交付成果、线索、营销活动与收支等经营要素放进同一套本体。',
      '装入后可以按部门与岗位组织 AI 代理，留下委托与签批记录，并生成对象 Wiki 页与经营驾驶舱。示例对象与示例智能体都带〔示例〕标记，可在「我的包」里清理。',
    ],
    domain: 'organization',
    domainLabel: '组织经营',
    icon: 'layout',
    industryName: '个人 OPC（一人公司智能中枢）',
    tags: ['一人公司', '创业', 'AI 代理', '项目', '交付'],
    publisher: 'IAI 官方',
    license: 'CC-BY-4.0',
    minApp: '0.2.0',
    bundleFormat: 'iai.ontology-design.v2',
    counts: { types: 13, examples: 34, sources: 9, questions: 13, agents: 5, cockpits: 1 },
    sizeBytes: 94723,
    permissions: [],
    grantsNote: '本包包含 5 个示例智能体，安装后会按现有个人版策略启用。',
    highlights: [
      '13 个类型覆盖创始人、虚拟部门、委托契约与交付成果',
      '5 个示例智能体，展示一个人如何组织 AI 代理',
      '34 个示例对象与 9 篇测试文章',
      '含 1 个经营驾驶舱',
    ],
    changelog: '首个随客户端分发的官方精选版本：一人公司的组织、委托与交付示例。',
    updatedAt: '2026-10-20',
  },
];

export const DOMAIN_LABEL: Record<PackDomain, string> = {
  manufacturing: '离散制造',
  formulation: '研发实验',
  organization: '组织经营',
};

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function packHref(slug: string): string {
  return `/packs/${slug}/`;
}
