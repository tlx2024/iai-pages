// 功能页数据。状态口径（与 README 一致）：
//   shipped    已交付：已实现并随版本交付
//   validating 工程验证中：已实现、自动化回归通过，尚未经真实现场验收
//   planned    规划中：尚未实现
//   coming     即将发布：已在开发，尚未公开发布
// 版本口径：trial 试用版可体验；trial-limited 试用版有限制（见 note）；server 仅服务器版。

export type Status = 'shipped' | 'validating' | 'planned' | 'coming';
export type Edition = 'trial' | 'trial-limited' | 'server';

export type ShotId =
  | 'hook'
  | 'brand'
  | 'connect'
  | 'ask'
  | 'trace'
  | 'catalog'
  | 'gate'
  | 'night'
  | 'graph'
  | 'audit'
  | 'desktop'
  | 'end';

export type Capability = {
  title: string;
  desc: string;
  status: Status;
  edition?: Edition;
  note?: string;
};

export type Feature = {
  slug: string;
  nav: string;
  eyebrow: string;
  title: string;
  tagline: string;
  summary: string;
  shots: ShotId[];
  capabilities: Capability[];
};

export const STATUS_LABEL: Record<Status, string> = {
  shipped: '已交付',
  validating: '工程验证中',
  planned: '规划中',
  coming: '即将发布',
};

export const STATUS_HINT: Record<Status, string> = {
  shipped: '已实现并随版本交付',
  validating: '已实现，自动化回归通过，尚未经真实现场验收',
  planned: '尚未实现，列在路线图上',
  coming: '已在开发，尚未公开发布',
};

export const EDITION_LABEL: Record<Edition, string> = {
  trial: '试用版可体验',
  'trial-limited': '试用版有限制',
  server: '仅服务器版',
};

export const FEATURES: Feature[] = [
  {
    slug: 'assistant',
    nav: '智能助手与执行账本',
    eyebrow: 'Ask the plant',
    title: '智能助手与执行账本',
    tagline: '问一句，它去查；每一步都记在账上。',
    summary:
      '用现场的说法提问，助手识别意图，检索知识、调用技能，把处理步骤连同引用一起给你。对话背后是一本执行账本：调用了哪个技能、传了什么参数、系统返回了什么，都按时间线留存，事后可以逐步复盘。',
    shots: ['ask', 'trace'],
    capabilities: [
      {
        title: '流式对话与意图路由',
        desc: '流式输出回答；区分闲聊、知识问答和技能调用，按意图走不同的处理链路。',
        status: 'shipped',
        edition: 'trial',
      },
      {
        title: '回答带引用',
        desc: '回答中的依据可以点开，直接看到知识库里的原文段落、版本和审核状态。',
        status: 'shipped',
        edition: 'trial',
      },
      {
        title: '执行账本',
        desc: '账本是事实源：技能调用、参数、返回结果和审批记录按时间线保存；网络中断后可以从断点继续读取。',
        status: 'shipped',
        edition: 'trial',
      },
      {
        title: '按风险分级的工具调用',
        desc: '只读查询直接执行；会改动现场的写操作先生成审批卡，经人确认后才执行。',
        status: 'shipped',
        edition: 'trial',
      },
      {
        title: '多模型网关',
        desc: '统一注册 OpenAI 兼容接口、Anthropic、Ollama、vLLM 四类模型，支持故障转移。',
        status: 'shipped',
        edition: 'trial-limited',
        note: '试用版在「本机 Ollama」「自带云端 Key（需显式同意出网）」「不接模型」三档中选择',
      },
      {
        title: '按数据敏感级别路由模型',
        desc: '根据数据的敏感级别决定可以使用哪些模型，工厂数据不出网。',
        status: 'planned',
      },
    ],
  },
  {
    slug: 'knowledge',
    nav: '企业知识库',
    eyebrow: 'Every answer has a source',
    title: '企业知识库',
    tagline: '知识有版本，回答有出处。',
    summary:
      '设备手册、SOP、异常复盘和班次报告集中管理。每次修订都保存不可变版本；检索结果能回溯到原文段落；Wiki 由确定性模板从生产事实生成，人工核对后发布。',
    shots: ['trace'],
    capabilities: [
      {
        title: '三类空间隔离',
        desc: '个人、团队、公共三类空间分开管理，内容只在授权范围内可见、可检索。',
        status: 'shipped',
        edition: 'trial-limited',
        note: '试用版可在个人空间导入自己的文档；团队与公共空间的发布流转为只读',
      },
      {
        title: '不可变版本',
        desc: '条目每次修订都保留历史版本，可以回看任一时点的内容，避免“改坏了找不到原件”。',
        status: 'shipped',
        edition: 'trial',
      },
      {
        title: '带引用的检索',
        desc: '检索结果附带出处，回答中的每条依据都能回到原文。',
        status: 'shipped',
        edition: 'trial',
      },
      {
        title: '双路召回与融合排序',
        desc: 'BM25 关键词与 pgvector 向量两路召回，经 RRF 融合排序，技术代号和同义表述都不容易漏。',
        status: 'shipped',
        edition: 'server',
      },
      {
        title: '文件解析',
        desc: '接入 MinerU，把 PDF 和图片里的文字、公式与表格转换成可检索的内容。',
        status: 'shipped',
        edition: 'server',
        note: '试用版首版支持 Markdown 与纯文本导入',
      },
      {
        title: '确定性 Wiki',
        desc: '按四种确定性模板（如设备履历、故障复盘）从生产事实生成 Wiki；附带空间维护与巡检待办。',
        status: 'shipped',
        edition: 'trial',
      },
      {
        title: '证据锚点、语义 Wiki 与 GraphRAG',
        desc: '更细粒度的证据定位，以及基于对象关系的检索增强。',
        status: 'planned',
      },
    ],
  },
  {
    slug: 'agents',
    nav: '技能与智能体中心',
    eyebrow: 'Every skill has a risk level',
    title: '技能与智能体中心',
    tagline: '技能受控登记，智能体按岗位搭建。',
    summary:
      '内置 25 个工业技能，覆盖报警、换产、SPC、班次报告、实验室分析和根因分析等场景；每个技能都声明输入输出、是否只读和风险等级。智能体中心把固定流程配置成可复用、可审批、可审计的智能体和多 Agent 工作流。',
    shots: ['catalog', 'night'],
    capabilities: [
      {
        title: '25 个内置工业技能',
        desc: '报警应答、换产指引、SPC 分析、班次报告、实验室分析、根因分析、文档合规审查等。',
        status: 'shipped',
        edition: 'trial-limited',
        note: '试用版的技能数据来自内置模拟平台；文档合规审查等行业技能仅服务器版提供',
      },
      {
        title: '技能契约与领域治理',
        desc: '每个技能声明输入、输出、是否只读和超时；按生产、质量、配方、仓储等领域标签治理，工具网关按角色拦截越权调用。',
        status: 'shipped',
        edition: 'trial',
      },
      {
        title: '技能包版本、评测与受控发布',
        desc: '技能包带版本号；上线前先跑评测集，通过后才能发布。',
        status: 'shipped',
        edition: 'trial-limited',
        note: '试用版中为只读',
      },
      {
        title: '智能体定义与起草',
        desc: '岗位守则与执行指令分开配置；可以用表单向导搭建，也可以用一句话描述需求，由 AI 起草。',
        status: 'validating',
        edition: 'trial-limited',
        note: '试用版可起草、编辑和试运行，不能发布、归档或导入导出配置包',
      },
      {
        title: '预算隔离执行',
        desc: '每个智能体限定单次运行的最大步数、Token 用量和超时，防止失控循环。',
        status: 'validating',
        edition: 'trial',
      },
      {
        title: '多 Agent 编排与受控业务动作',
        desc: '把多个智能体串成工作流，中间可以设置人工审核卡点；业务动作经审批后执行。',
        status: 'validating',
        edition: 'trial',
      },
      {
        title: '事件驱动与定时运行',
        desc: '事务性事件投递：报警或 Webhook 事件可以唤起对应的智能体；定时计划可以在夜间自动运行统计与报告。',
        status: 'shipped',
        edition: 'server',
        note: '试用版可以手动试算自动化规则，不提供定时与无人值守运行',
      },
    ],
  },
  {
    slug: 'ontology',
    nav: '本体与根因分析',
    eyebrow: 'One machine, one identity',
    title: '本体与根因分析',
    tagline: '同一台设备，只认一个身份。',
    summary:
      'MES 里的设备编号、SCADA 里的通道名、现场的俗称，在本体层对齐到同一个对象。知识与对象相互关联；双时间线同时记录“事情何时发生”和“系统何时记下”，根因分析（RCA）据此把多源证据排到同一条时间轴上。',
    shots: ['graph'],
    capabilities: [
      {
        title: '统一身份与多源对齐',
        desc: '资源树与本体对象共用一套身份，多个系统里的编号对齐到同一个对象，检索和追溯不会张冠李戴。',
        status: 'shipped',
        edition: 'trial',
      },
      {
        title: '版本化类型建模',
        desc: '对象类型带版本，修改经受控发布后生效。',
        status: 'shipped',
        edition: 'trial-limited',
        note: '试用版中为只读',
      },
      {
        title: '知识与对象关联',
        desc: '知识条目与对象按三态关联，每条关联都能追溯来源。',
        status: 'shipped',
        edition: 'trial',
      },
      {
        title: '双时间线与 RCA 证据包',
        desc: '记录发生时间与录入时间；RCA 按策略列出假设，同时寻找支持和反驳的证据，形成证据包。',
        status: 'shipped',
        edition: 'trial-limited',
        note: '试用版可浏览对象并运行内置的演示案例',
      },
      {
        title: '业务领域树与法规、文献本体',
        desc: '按配方、法规、文献、组织系统等领域组织对象，服务研发与合规场景。',
        status: 'validating',
        edition: 'server',
      },
    ],
  },
  {
    slug: 'integrations',
    nav: '平台接入与消息通道',
    eyebrow: 'Plugs into the plant',
    title: '平台接入与消息通道',
    tagline: '不替换现有系统，接进来就能用。',
    summary:
      'IAI 通过统一的接入协议连接 MES、SCADA、ERP、WMS、LIMS 和视觉检测等系统，凭据集中托管；Webhook 与动态 MCP 用于扩展。正式接入前，可以先用内置的平台模拟器演练，包括注入断线和延迟。',
    shots: ['connect'],
    capabilities: [
      {
        title: '统一接入协议',
        desc: '基于 HTTP 与 Token 的平台接入协议，配合凭据托管和平台访问门禁。',
        status: 'shipped',
        edition: 'server',
      },
      {
        title: '工业系统连接器',
        desc: '覆盖 MES、SCADA、ERP、WMS、LIMS、视觉检测等常见系统。',
        status: 'shipped',
        edition: 'server',
      },
      {
        title: 'Webhook 与动态 MCP',
        desc: '外部事件经 Webhook 进入；通过 MCP 动态挂接新的工具。',
        status: 'shipped',
        edition: 'server',
      },
      {
        title: '平台模拟器与故障注入',
        desc: '离线模拟全套平台接口，可以主动注入断线或延迟，便于上线前做无风险演练。',
        status: 'shipped',
        edition: 'trial-limited',
        note: '试用版只提供内置模拟平台，可以查看配置、演示故障注入，不能接入真实系统',
      },
      {
        title: '消息通道',
        desc: '支持飞书、钉钉（Stream 模式）和企业微信。',
        status: 'shipped',
        edition: 'server',
      },
      {
        title: '通用通道插件化',
        desc: '以插件方式接入更多消息通道。',
        status: 'planned',
      },
    ],
  },
  {
    slug: 'governance',
    nav: '权限、审批与审计',
    eyebrow: 'A human holds the switch',
    title: '权限、审批与审计',
    tagline: '写操作先过人这一关，每一步都有账。',
    summary:
      'RBAC 与 ABAC 双模授权，权限挂在资源树上；会改动现场的动作必须经人审批；登录、问答、技能调用、审批和知识出网都写进审计日志。',
    shots: ['gate', 'audit'],
    capabilities: [
      {
        title: 'RBAC 与 ABAC 双模授权',
        desc: '角色权限叠加资源范围：按工厂、车间、产线划分作用域，核心对象还可以单独授权。',
        status: 'shipped',
        edition: 'trial-limited',
        note: '试用版中为只读，可以查看权限模型，不能新建账号或授权',
      },
      {
        title: '写操作审批',
        desc: '审批卡列出发起人、动作、参数和风险等级；批准后暂停的任务从原处继续执行。',
        status: 'shipped',
        edition: 'trial',
        note: '试用版预置岗位账号，可以演示“一人发起、另一人审批”',
      },
      {
        title: '审计与留存',
        desc: '登录、调参、问答、检索出网和审批动作都有记录，按策略留存。',
        status: 'shipped',
        edition: 'trial',
      },
      {
        title: '知识出口门禁',
        desc: '控制哪些知识内容可以发送给外部模型。',
        status: 'shipped',
      },
      {
        title: '配方敏感字段脱敏',
        desc: '数据送往模型之前，工具网关自动掩码配方中的敏感字段。',
        status: 'shipped',
        edition: 'server',
      },
      {
        title: '配方核心参数掩码门禁',
        desc: '对配方核心参数设置更严格的掩码与放行规则。',
        status: 'validating',
        edition: 'server',
      },
    ],
  },
  {
    slug: 'desktop',
    nav: '桌面端',
    eyebrow: 'On the desktop, too',
    title: '桌面端',
    tagline: '单机也能体验，连上服务器就是岗位客户端。',
    summary:
      '基于 Tauri 2 的桌面端有两种形态：试用版在本机运行后端和 SQLite 数据库，自带演示数据，装好即可体验；企业客户端只包含界面，连接企业部署的 IAI 服务器，随服务器一起交付。',
    shots: ['desktop'],
    capabilities: [
      {
        title: '单机运行',
        desc: '本机后端加 SQLite 数据库，只监听 127.0.0.1；自带演示数据，数据只存在本机。',
        status: 'shipped',
      },
      {
        title: '三档模型',
        desc: '本机 Ollama、自带云端 Key（需显式同意出网）、不接模型。本机档的最低参考配置是 8 GB 显存。',
        status: 'shipped',
      },
      {
        title: '企业客户端',
        desc: '只含界面，连接企业服务器使用，不单独公开下载。',
        status: 'shipped',
        edition: 'server',
      },
      {
        title: '公开试用版',
        desc: '面向所有人的免费评估包：保留核心体验，有效期 120 天，到期后只读，仍可导出自己的数据。',
        status: 'coming',
      },
      {
        title: '自动更新',
        desc: '试用版从官网获取新版本。',
        status: 'planned',
      },
    ],
  },
];

export const featureHref = (slug: string) => `/features/${slug}/`;

/** 功能对应的图标（名字见 components/Icon.astro） */
export const FEATURE_ICON = {
  assistant: 'message',
  knowledge: 'book',
  agents: 'bot',
  ontology: 'graph',
  integrations: 'plug',
  governance: 'shield',
  desktop: 'monitor',
} as const;

export const statusCounts = (f: Feature) => {
  const out: Partial<Record<Status, number>> = {};
  for (const c of f.capabilities) out[c.status] = (out[c.status] ?? 0) + 1;
  return out;
};
