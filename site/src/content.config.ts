import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  // Starlight 文档：src/content/docs/docs/** → /docs/**
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  // 对外发行说明：仓库根目录 release-notes/vX.Y.Z.md，人工撰写（不从 commit 自动生成）
  releaseNotes: defineCollection({
    loader: glob({ pattern: 'v*.md', base: '../release-notes' }),
    schema: z.object({
      version: z.string(),
      date: z.coerce.date(),
      title: z.string().optional(),
      channel: z.enum(['stable', 'rc']).default('stable'),
    }),
  }),
};
