// 60 秒宣传片的分镜（与宣传片工程 plan.json 的 shots 一致）。画面由产品真实组件 + 演示数据渲染。
import type { ImageMetadata } from 'astro';
import type { ShotId } from './features';

import hook from '../assets/shots/hook.jpg';
import brand from '../assets/shots/brand.jpg';
import connect from '../assets/shots/connect.jpg';
import ask from '../assets/shots/ask.jpg';
import trace from '../assets/shots/trace.jpg';
import catalog from '../assets/shots/catalog.jpg';
import gate from '../assets/shots/gate.jpg';
import night from '../assets/shots/night.jpg';
import graph from '../assets/shots/graph.jpg';
import audit from '../assets/shots/audit.jpg';
import desktop from '../assets/shots/desktop.jpg';
import end from '../assets/shots/end.jpg';

export type Shot = { id: ShotId; start: number; headline: string; image: ImageMetadata };

export const PROMO_VIDEO = {
  src: '/media/iai-promo-60s.mp4',
  poster: '/media/iai-promo-poster.jpg',
  duration: 60,
  title: 'IAI 工厂智能中枢 · 60 秒介绍',
};

export const SHOTS: Shot[] = [
  { id: 'hook', start: 0, headline: '查系统、翻报表、找老师傅', image: hook },
  { id: 'brand', start: 4, headline: 'IAI 工厂智能中枢', image: brand },
  { id: 'connect', start: 8, headline: '工厂现有系统，接进来就能用', image: connect },
  { id: 'ask', start: 13, headline: '问一句，它去查', image: ask },
  { id: 'trace', start: 22.5, headline: '每句回答，都能翻到原文', image: trace },
  { id: 'catalog', start: 27.5, headline: '25 个工业技能，都标了风险', image: catalog },
  { id: 'gate', start: 32, headline: '写操作，先过人这一关', image: gate },
  { id: 'night', start: 38.5, headline: '夜里报警，智能体先去查', image: night },
  { id: 'graph', start: 45.5, headline: '同一台设备，只认一个身份', image: graph },
  { id: 'audit', start: 50, headline: '每一步，都有账', image: audit },
  { id: 'desktop', start: 54, headline: '桌面端，单机也能演示', image: desktop },
  { id: 'end', start: 57.5, headline: 'IAI 工厂智能中枢', image: end },
];

export const shotById = (id: ShotId) => SHOTS.find((s) => s.id === id)!;

export const fmtTime = (sec: number) => {
  const s = Math.floor(sec);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};
