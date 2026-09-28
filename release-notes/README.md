# 对外发行说明

每个公开版本一份 `vX.Y.Z.md`，由人工撰写，随草稿 Release 一起提交；官网「更新日志」页从这里生成。

- 不直接用 commit 信息：commit 里可能有客户名、内部路径或未公开的方案。
- 只写用户能感知到的变化：新增、改进、修复、已知问题、升级注意事项。
- 发布前会经过去敏检查（`site/scripts/check-sensitive.mjs`）。

文件格式：

```markdown
---
version: 0.3.0
date: 2026-10-15
channel: stable   # 预发布写 rc
title: 首个公开试用版   # 可选
---

## 新增
- …
```
