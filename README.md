# iai-pages

IAI 的静态内容工程与可选文档预览。生产介绍、账号、API 与国内下载使用自有云的独立入口；GitHub Pages 不处理登录、支付或模型请求。

## 构建

Node 22，进入 `site/` 后执行 `npm ci`、`npm test`、`npm run check`。

- `npm run build:pages`：GitHub Pages 子路径 `/iai-pages/`，产物 `dist/pages/`。
- `WWW_ORIGIN=https://www.your-domain.cn npm run build:www`：生产根路径 `/`，产物 `dist/www/`。
- 未完成域名冻结时，可用 `SITE_PREVIEW=true WWW_ORIGIN=https://www.iai.example npm run build:www` 做评审预览；不得把示例域名作为上线配置。
- PowerShell：先设置 `$env:WWW_ORIGIN='https://www.your-domain.cn'`，再执行命令。www 预览需同时设置 `$env:SITE_MODE='www'`。

`ACCOUNT_ORIGIN`、`DOWNLOAD_ORIGIN`、`OFFICIAL_WWW_ORIGIN` 仅接受 HTTPS 源地址。尚未开放时留空；预览站不指向半成品登录服务。当前下载页展示发布状态，不读取旧试用包附件生成下载链接。

所有站内链接使用部署无关的根路径：Astro/MDX 调用 `href()`；Markdown 链接由构建插件补当前 base。字体子集、去敏、链接与文案门禁跟随相同构建目标，覆盖两套产物。

2026-10-10 发布门禁增加产物内容检查，覆盖 HTML、JS、CSS、JSON、XML、TXT、SVG：静态营销站不能包含 account/cloud 业务 API 路径、刷新凭据或客户端秘密契约；生产构建拒绝占位域名与本机预览地址。`npm test` 包含对应反例验证。

## 发布到 www

在仓库根目录执行 `powershell -NoProfile -File deploy/deploy.ps1`：按生产域名做 `SITE_MODE=www` 构建（含全部门禁），上传到 `betterme-prod`，替换 `/var/www/iai-www`（保留一份 `.bak` 回滚），安装 `deploy/www-redirects.conf` 到 `/etc/nginx/snippets/`，`nginx -t` 通过后才 reload。加 `-DryRun` 只构建不上传。首次发布需在 www 的 server 块里加一行 `include snippets/iai-www-redirects.conf;`，脚本检测不到时会提示。

迁移过的旧路径（`/deployment/` 等）同时有两层：静态跳转页（Pages 也能用）和 nginx 301；`check-site.mjs` 校验两边一一对应。`deploy/docker-compose.yml` 与 `deploy/nginx.conf` 是旧的局域网预览容器配置，发布脚本不再使用。

## 交付与状态

`pages.yml` 仅发布内容预览；`www-build.yml` 手动构建自有云静态制品供后续部署，不自动上传服务器。正式域名上线后可保留文档镜像或生成静态跳转页；Pages 静态托管不能配置 HTTP 301。

个人版客户端免费，官方 AI 使用账号与积分，价格以正式发布为准。个人版能力在公开发布前标记规划中；邀请内测不开放自助注册。企业制品通过私有化项目交付。

静态页面无登录 Cookie、刷新 token、浏览器 API 客户端或上游密钥。主题偏好仅在本机存储，字体随构建产物发布。
