# iai-pages

平方和工厂智能中枢（IAI）官网与公开制品仓库。

- 官网：<https://tlx2024.github.io/iai-pages/>
- 公开制品：本仓库的 [Releases](https://github.com/tlx2024/iai-pages/releases)，包括桌面试用版、服务器部署套件、`SHA256SUMS` 和 `release.json`

产品源码在私有仓库，不在这里。本仓库只放不含产品代码的内容：官网源码、对外发行说明和公开制品。

## 目录

```text
site/                    Astro + Starlight + Tailwind CSS 4 官网工程
  src/pages/             营销页：首页、功能、场景、部署、安全、下载、更新日志、联系
  src/content/docs/docs/ 文档（Starlight）：快速开始、试用版指南、私有部署指南、模型准备、FAQ
  src/data/              站点常量、功能清单（带状态）、宣传片分镜
  src/lib/releases.ts    构建时读取 Releases 里的 release.json，生成下载页
  scripts/               构建后脚本：字体子集、去敏与链接检查
  fonts/                 Noto Sans SC 源字体（OFL），构建时按用字裁剪
  public/media/          60 秒宣传片与封面
release-notes/           对外发行说明 vX.Y.Z.md（人工撰写）
.github/workflows/       pages.yml：构建并发布到 GitHub Pages
```

## 本地开发

需要 Node 22。

```bash
cd site
npm ci
npm run dev        # http://localhost:4321/iai-pages/
npm run build      # astro build → 字体子集 → 去敏与链接检查
npm run preview    # 预览构建结果
```

用示例数据预览下载页（不访问 GitHub）：

```bash
RELEASES_FILE=scripts/fixtures/sample-releases.json npm run build
```

PowerShell 下先执行 `$env:RELEASES_FILE='scripts/fixtures/sample-releases.json'`，再运行 `npm run build`。

本地构建时如果访问不到 GitHub API，下载页按“尚无版本”渲染，只打印告警；CI 里（`CI=true`）读取失败会直接让构建失败。

## 发布流程

1. 私有仓库打 `v*` tag，发布流水线构建制品，并在本仓库创建**草稿** Release：试用版、部署套件、`SHA256SUMS`、`release.json`。
2. 在 `release-notes/` 提交对外发行说明 `vX.Y.Z.md`（格式见该目录的 README）。
3. 人工检查草稿：安装包能装、部署套件里只有清单内的文件、说明里没有内部信息。
4. 点击**发布**。`release: published` 会触发 `pages.yml`，官网重建，下载页和更新日志随之更新。

`release.json` 的结构见产品仓库的发布流水线方案 §5。`visibility: "restricted"` 的条目在官网上只显示版本、校验和与获取方式，不显示下载地址。

## 内容原则

- **状态如实**：功能按“已交付 / 工程验证中 / 规划中 / 即将发布”标注，口径与产品 README 的能力清单一致（`site/src/data/features.ts`）。试用版没有的能力标注“仅服务器版”。
- **去敏**：不出现内网地址、默认账号口令、客户名称、本机路径或私有仓库名。`scripts/check-sensitive.mjs` 在每次构建后扫描 `dist/` 和 `release-notes/`，命中就让构建失败。
- **站内链接**：站点挂在 `/iai-pages/` 子路径下。`.astro` 里用 `href()` 拼接，Markdown 里直接写 `/iai-pages/...`，构建后检查会拦截漏掉 base 的链接。
- **不追踪**：不使用 Cookie，不接入访问统计，不从第三方加载字体或脚本。

## 常改的地方

| 要改什么 | 位置 |
|---|---|
| 联系邮箱（留空时显示“即将公布”） | `site/src/data/site.ts` 的 `CONTACT_EMAIL` |
| 功能清单与状态 | `site/src/data/features.ts` |
| 宣传片与分镜章节 | `site/public/media/`、`site/src/data/shots.ts` |
| 导航与页脚 | `site/src/data/site.ts` |

## 许可

- 字体：Noto Sans SC、Inter Tight，均为 SIL OFL 1.1，许可全文随站点发布在 `/fonts/`。
- 宣传片：由产品真实界面组件配合演示数据渲染，配乐与音效为程序原创生成。
- 官网内容与公开制品的使用条款以各自附带的许可文本为准。
