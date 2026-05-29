import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { LOCALES } from '@/i18n/routing'
import { getAllSlugs, getConfig, getContent, getImageCache } from '@/lib/mv/data'
import { flickrUrl } from '@/lib/mv/images'
import {
  getH1,
  getLead,
  getSiblings,
  getMediumPrompts,
  getPersonaBlocks,
  getWhoUsesTitle,
  getUseCases,
  getGpBadge,
  strHash,
} from '@/lib/mv/slugHelpers'
import { getT } from '@/lib/mv/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GenProcess from '@/components/mv/GenProcess'
import SchemaScripts from '@/components/mv/SchemaScripts'
import SlugPageEffects from '@/components/mv/SlugPageEffects'

const BASE_URL = 'https://www.tunee.ai'
const ALL_LOCALES = ['en', 'es', 'ja', 'ko', 'ru', 'fr', 'de', 'pt', 'it', 'zh-HK', 'zh-CN']

const CHAMPION: [string, string][] = [
  ['Phonk Beats', '/music-generator/phonk'],
  ['Synthwave Music', '/music-generator/synthwave'],
  ['Funk Music', '/music-generator/funk'],
  ['Lo-fi Beats', '/music-generator/lofi'],
  ['Guitar Tracks', '/music-generator/guitar'],
  ['Drum Loops', '/music-generator/drums'],
]

const PAGE_CSS = `
:root {
  --bg: #FBFBFD;
  --surface: #FFF;
  --surface-2: #F5F5F7;
  --t1: #0A0A0B;
  --t2: #4B4B52;
  --t3: #86868B;
  --t4: #B8B8BD;
  --line: rgba(0,0,0,.06);
  --line-h: rgba(0,0,0,.10);
  --ac: #0071E3;
  --ac2: #3390FF;
  --r-sm: 10px;
  --r-md: 16px;
  --r-lg: 22px;
  --r-xl: 28px;
  --r-pill: 980px;
  --ease: cubic-bezier(.25,.1,.25,1);
  --ease-out: cubic-bezier(.16,1,.3,1);
  --el-1: 0 1px 2px rgba(0,0,0,.04), 0 0 0 1px var(--line);
  --el-2: 0 4px 14px -4px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.04);
  --el-3: 0 18px 40px -16px rgba(0,0,0,.14), 0 4px 12px -4px rgba(0,0,0,.05);
}

/* ── LAYOUT ── */
.mvs { padding-top: 72px; } /* clear fixed 72px Header */
.mvs .wrap { max-width: 1100px; margin: 0 auto; padding: 0 clamp(20px,4vw,48px); }

/* ── HERO ── */
.mvs .hero { position: relative; padding: 56px 0 80px; overflow: hidden; }
.mvs .hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
@media (max-width: 820px) { .mvs .hero-inner { grid-template-columns: 1fr; } }

.mvs .eyebrow {
  display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px;
  border-radius: var(--r-pill); background: rgba(255,255,255,.7);
  backdrop-filter: blur(14px); border: 1px solid var(--line);
  font-size: 12px; font-weight: 500; color: var(--t2); letter-spacing: .04em;
  text-transform: uppercase; margin-bottom: 20px; box-shadow: var(--el-1);
}
.mvs .eyebrow-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: linear-gradient(135deg, var(--ac), var(--ac2));
  box-shadow: 0 0 8px color-mix(in srgb, var(--ac) 60%, transparent);
}

.mvs .hero h1 {
  font-size: clamp(32px,4.5vw,58px); font-weight: 700; line-height: 1.06;
  letter-spacing: -.04em; color: var(--t1); margin-bottom: 20px;
}
.mvs .hero h1 .grad {
  background: linear-gradient(120deg, var(--ac), var(--ac2));
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: transparent; padding: 0 .04em;
}
.mvs .hero-lead {
  font-size: clamp(16px,1.3vw,19px); color: var(--t2); line-height: 1.6;
  margin-bottom: 32px; max-width: 500px; letter-spacing: -.01em;
}
.mvs .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }
.mvs .btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: var(--r-pill);
  font-size: 15px; font-weight: 600; line-height: 1; letter-spacing: -.01em;
  background: var(--ac); color: #fff; border: none; cursor: pointer; text-decoration: none;
  transition: transform .15s var(--ease), filter .2s, box-shadow .2s var(--ease);
  box-shadow: 0 4px 16px -4px color-mix(in srgb, var(--ac) 50%, transparent);
}
.mvs .btn-primary:hover {
  transform: translateY(-1px); filter: brightness(1.08);
  box-shadow: 0 10px 28px -8px color-mix(in srgb, var(--ac) 60%, transparent);
}
.mvs .btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 24px; border-radius: var(--r-pill);
  font-size: 15px; font-weight: 600; line-height: 1;
  background: transparent; color: var(--t1); border: 1px solid var(--line);
  cursor: pointer; text-decoration: none; transition: background .15s, border-color .15s;
}
.mvs .btn-ghost:hover { background: var(--surface-2); border-color: var(--line-h); }
.mvs .style-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.mvs .style-tag {
  padding: 5px 12px; border-radius: var(--r-pill); background: var(--surface-2);
  font-size: 12px; font-weight: 500; color: var(--t3);
}

/* ── GEN CARD ── */
.mvs .gen-card {
  background: #fff; border-radius: var(--r-xl); border: 1px solid var(--line);
  box-shadow: var(--el-2); padding: 24px 24px 20px; position: relative; overflow: hidden;
}
.mvs .gen-card::before {
  content: ''; position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background: radial-gradient(600px 300px at 100% 0%, color-mix(in srgb, var(--ac) 6%, transparent), transparent 60%);
}
.mvs .gen-card > * { position: relative; z-index: 1; }
.mvs .gp-badge {
  display: inline-flex; padding: 5px 12px; border-radius: var(--r-pill);
  font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
  margin-bottom: 18px;
}
.mvs .gp-step { display: grid; grid-template-columns: 26px 1fr; gap: 10px; padding: 14px 0; align-items: start; }
.mvs .gp-step-num { font-size: 11px; font-weight: 800; letter-spacing: .04em; padding-top: 2px; }
.mvs .gp-step-title { font-size: 14px; font-weight: 600; color: var(--t1); margin-bottom: 3px; letter-spacing: -.01em; }
.mvs .gp-step-sub { font-size: 11px; color: var(--t3); margin-bottom: 10px; }
.mvs .gp-divider { border: none; border-top: 1px solid var(--line); margin: 0 0 0 36px; }
.mvs .gp-file {
  display: flex; align-items: center; gap: 7px;
  background: var(--surface-2); border-radius: 8px; padding: 8px 12px;
}
.mvs .gp-file svg { opacity: .45; flex-shrink: 0; }
.mvs .gp-filename {
  font-size: 12px; font-weight: 500; color: var(--t1);
  min-height: 1.2em;
}
.mvs .gp-prompt-box {
  font-size: 12px; color: var(--t2); line-height: 1.6;
  background: var(--surface-2); border-radius: 8px; padding: 10px 12px;
  border-left: 3px solid var(--ac); font-style: italic;
}

/* Step 3 — generating phase */
.mvs .gp-gen {
  display: flex; align-items: center; gap: 8px; background: var(--surface-2);
  border-radius: 8px; padding: 9px 12px; margin-top: 8px; max-height: 50px; overflow: hidden;
  animation: gp-gen-out 0.6s ease 2.8s forwards;
}
@keyframes gp-gen-out {
  0%   { opacity: 1; max-height: 50px; padding-top: 9px; padding-bottom: 9px; margin-top: 8px; }
  55%  { opacity: 0; max-height: 50px; padding-top: 9px; padding-bottom: 9px; margin-top: 8px; }
  100% { opacity: 0; max-height: 0; padding-top: 0; padding-bottom: 0; margin-top: 0; }
}
.mvs .gp-gen-dot {
  width: 5px; height: 5px; border-radius: 50%; background: var(--ac); flex-shrink: 0;
  animation: gp-dot-pulse 1s ease-in-out infinite;
}
@keyframes gp-dot-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
.mvs .gp-gen-label { font-size: 11px; color: var(--t3); font-weight: 500; white-space: nowrap; flex-shrink: 0; }
.mvs .gp-prog-track { flex: 1; height: 3px; background: var(--line); border-radius: 2px; overflow: hidden; }
.mvs .gp-prog-fill {
  height: 100%; width: 0; background: var(--ac); border-radius: 2px;
  animation: gp-fill-anim 2.2s cubic-bezier(.2,0,.35,1) 0.4s forwards;
}
@keyframes gp-fill-anim { to { width: 100%; } }

/* Step 3 — ready phase */
.mvs .gp-ready { animation: gp-ready-in 0.5s ease 3.0s both; }
@keyframes gp-ready-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }

/* Player */
.mvs .gp-player {
  display: flex; align-items: center; gap: 10px; margin-top: 8px;
  background: color-mix(in srgb, var(--ac) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--ac) 18%, transparent);
  border-radius: 10px; padding: 10px 14px;
}
.mvs .gp-play-btn {
  width: 30px; height: 30px; border-radius: 50%; background: var(--ac); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 10px color-mix(in srgb, var(--ac) 38%, transparent);
}
.mvs .gp-play-btn svg { margin-left: 1px; }
.mvs .gp-eq { flex: 1; display: flex; align-items: flex-end; gap: 2px; height: 22px; }
.mvs .gp-eq-bar {
  flex: 1; background: var(--ac); opacity: .65; border-radius: 2px;
  animation: gp-eq-bounce 0.5s ease-in-out infinite alternate; transform-origin: bottom;
}
@keyframes gp-eq-bounce { from { transform: scaleY(0.2); } to { transform: scaleY(1); } }
.mvs .gp-time { font-size: 11px; font-weight: 600; color: var(--t2); flex-shrink: 0; }

/* Format badges */
.mvs .gp-formats { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 8px; }
.mvs .gp-fmt {
  font-size: 11px; font-weight: 600; letter-spacing: .03em; padding: 3px 9px;
  border-radius: var(--r-pill); background: var(--surface-2); color: var(--t3);
  border: 1px solid var(--line);
}
.mvs .gp-fmt-hi {
  background: color-mix(in srgb, var(--ac) 10%, transparent);
  color: var(--ac);
  border-color: color-mix(in srgb, var(--ac) 22%, transparent);
}

/* ── SECTIONS ── */
.mvs .section { padding: clamp(64px,8vw,112px) 0; }
.mvs .section + .mvs .section { padding-top: 0; }
.mvs .eyebrow-sm {
  font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase;
  color: var(--ac); margin-bottom: 10px;
}
.mvs .sec-title {
  font-size: clamp(24px,3vw,38px); font-weight: 700; letter-spacing: -.03em;
  color: var(--t1); margin-bottom: 8px; line-height: 1.1;
}
.mvs .sec-sub { font-size: 16px; color: var(--t2); max-width: 520px; line-height: 1.6; margin-bottom: 40px; }

/* ── HOW IT WORKS ── */
.mvs .steps { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
@media (max-width: 640px) { .mvs .steps { grid-template-columns: 1fr; } }
.mvs .step-card {
  background: var(--surface); border-radius: var(--r-lg); padding: 28px 24px;
  box-shadow: var(--el-1); transition: transform .25s var(--ease), box-shadow .25s var(--ease);
}
.mvs .step-card:hover { transform: translateY(-2px); box-shadow: var(--el-2); }
.mvs .step-num { font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--ac); margin-bottom: 10px; }
.mvs .step-title { font-size: 16px; font-weight: 600; margin-bottom: 6px; letter-spacing: -.01em; }
.mvs .step-desc { font-size: 14px; color: var(--t2); line-height: 1.6; }

/* ── MEDIUM PROMPTS ── */
.mvs .mp-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
.mvs .mp-card {
  background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg);
  padding: 24px 28px; transition: border-color .2s, box-shadow .2s var(--ease); position: relative;
}
.mvs .mp-card:hover { border-color: var(--ac); box-shadow: 0 0 0 3px color-mix(in srgb, var(--ac) 10%, transparent); }
.mvs .mp-label { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--ac); margin-bottom: 10px; }
.mvs .mp-text { font-size: 15px; color: var(--t1); line-height: 1.7; margin-bottom: 16px; }
.mvs .mp-copy {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 14px; border-radius: var(--r-pill);
  font-size: 13px; font-weight: 600; line-height: 1; color: var(--ac);
  background: color-mix(in srgb, var(--ac) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--ac) 20%, transparent);
  cursor: pointer; transition: all .15s;
}
.mvs .mp-copy:hover { background: color-mix(in srgb, var(--ac) 15%, transparent); }
.mvs .mp-copy.done { color: #059669; background: rgba(5,150,105,.08); border-color: rgba(5,150,105,.2); }

/* ── QUICK PROMPTS ── */
.mvs .qp-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap: 14px; }
.mvs .qp-card {
  background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-md);
  padding: 16px; display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;
  transition: border-color .2s;
}
.mvs .qp-card:hover { border-color: var(--ac); }
.mvs .qp-text { font-size: 13px; color: var(--t2); line-height: 1.55; flex: 1; }
.mvs .copy-btn {
  flex-shrink: 0; font-size: 11px; font-weight: 600; color: var(--ac);
  background: none; border: 1px solid color-mix(in srgb, var(--ac) 30%, transparent);
  border-radius: 6px; padding: 5px 10px; cursor: pointer; transition: all .15s;
}
.mvs .copy-btn:hover, .mvs .copy-btn.done { background: var(--ac); color: #fff; border-color: var(--ac); }

/* ── PERSONAS ── */
.mvs .personas-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }
@media (max-width: 640px) { .mvs .personas-grid { grid-template-columns: 1fr; } }
.mvs .persona-card {
  background: var(--surface); border-radius: var(--r-lg); padding: 24px;
  box-shadow: var(--el-1); transition: transform .25s var(--ease), box-shadow .25s var(--ease);
}
.mvs .persona-card:hover { transform: translateY(-2px); box-shadow: var(--el-2); }
.mvs .persona-role { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--ac); margin-bottom: 8px; }
.mvs .persona-desc { font-size: 15px; color: var(--t2); line-height: 1.65; }

/* ── USE CASES ── */
.mvs .uc-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
@media (max-width: 760px) { .mvs .uc-grid { grid-template-columns: 1fr; } }
.mvs .uc-card {
  background: var(--surface); border-radius: var(--r-lg); padding: 28px 24px;
  box-shadow: var(--el-1); border: 1px solid var(--line);
  transition: transform .25s var(--ease), box-shadow .25s var(--ease);
  display: flex; flex-direction: column; gap: 10px;
}
.mvs .uc-card:hover { transform: translateY(-2px); box-shadow: var(--el-2); }
.mvs .uc-tag {
  display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: .08em;
  text-transform: uppercase; padding: 4px 10px; border-radius: var(--r-pill);
  background: color-mix(in srgb, var(--ac) 10%, transparent);
  color: color-mix(in srgb, var(--ac) 80%, var(--t1));
  width: fit-content;
}
.mvs .uc-title { font-size: 17px; font-weight: 600; color: var(--t1); letter-spacing: -.02em; line-height: 1.3; }
.mvs .uc-desc { font-size: 14px; color: var(--t2); line-height: 1.65; flex: 1; }

/* ── COMPARISON ── */
.mvs .compare-wrap { overflow-x: auto; border-radius: var(--r-lg); box-shadow: var(--el-1); }
.mvs table { width: 100%; border-collapse: collapse; font-size: 14px; background: var(--surface); }
.mvs thead th {
  background: var(--surface-2); padding: 14px 18px; text-align: left;
  font-size: 12px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase;
  color: var(--t3); border-bottom: 1px solid var(--line);
}
.mvs td { padding: 15px 18px; border-bottom: 1px solid var(--line); vertical-align: top; color: var(--t2); }
.mvs tr:last-child td { border-bottom: none; }
.mvs td:first-child { color: var(--t2); font-weight: 500; width: 26%; }
.mvs td:nth-child(3) { color: var(--t1); font-weight: 500; }
.mvs .chk { color: var(--ac); }

/* ── FAQ ── */
.mvs .faq-list { border: 1px solid var(--line); border-radius: var(--r-lg); overflow: hidden; background: var(--surface); }
.mvs .faq-item { border-bottom: 1px solid var(--line); }
.mvs .faq-item:last-child { border-bottom: none; }
.mvs summary.faq-q {
  font-size: 15px; font-weight: 600; padding: 20px 24px; cursor: pointer;
  list-style: none; display: flex; justify-content: space-between; align-items: center;
  letter-spacing: -.01em; transition: background .15s;
}
.mvs .faq-q:hover { background: var(--surface-2); }
.mvs .faq-q::after { content: '+'; font-size: 18px; font-weight: 300; color: var(--t3); flex-shrink: 0; margin-left: 16px; }
.mvs details[open] .faq-q::after { content: '−'; }
.mvs .faq-a { font-size: 15px; color: var(--t2); padding: 0 24px 20px; max-width: 720px; line-height: 1.7; }

/* ── GALLERY ── */
.mvs .gallery-grid {
  display: grid; grid-template-columns: 1fr 1fr; grid-auto-rows: 220px; gap: 12px;
}
@media (max-width: 640px) {
  .mvs .gallery-grid { grid-template-columns: 1fr; grid-auto-rows: 200px; }
  .mvs .gallery-grid .rv:first-child { grid-row: span 1; }
}
.mvs .gallery-item { position: relative; border-radius: var(--r-lg); overflow: hidden; background: var(--surface-2); }
.mvs .gallery-item img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform .5s var(--ease-out);
}
.mvs .gallery-item:hover img { transform: scale(1.04); }
.mvs .gallery-label {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 24px 16px 14px;
  background: linear-gradient(transparent, rgba(0,0,0,.55));
  font-size: 13px; font-weight: 500; color: rgba(255,255,255,.9); letter-spacing: .01em;
}

/* ── INTERNAL LINKS ── */
.mvs .il-section { padding: 40px 0; border-top: 1px solid var(--line); }
.mvs .il-section h3 { font-size: 13px; font-weight: 600; color: var(--t3); margin-bottom: 14px; letter-spacing: .02em; }
.mvs .il-pills { display: flex; flex-wrap: wrap; gap: 8px; }
.mvs .il-pill {
  font-size: 13px; color: var(--t2); text-decoration: none;
  border: 1px solid var(--line); border-radius: var(--r-pill);
  padding: 7px 16px; background: var(--surface);
  transition: border-color .15s, color .15s;
}
.mvs .il-pill:hover { border-color: var(--ac); color: var(--ac); }

/* ── CTA BANNER ── */
.mvs .cta-banner {
  background: linear-gradient(135deg, var(--ac), var(--ac2));
  border-radius: var(--r-xl); padding: clamp(40px,6vw,72px) clamp(28px,5vw,64px);
  text-align: center; margin: clamp(48px,6vw,80px) 0; position: relative; overflow: hidden;
}
.mvs .cta-banner::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(700px 400px at 80% -20%, rgba(255,255,255,.15), transparent 60%);
  pointer-events: none;
}
.mvs .cta-banner h2 {
  font-size: clamp(24px,3.5vw,42px); font-weight: 700; color: #fff;
  margin-bottom: 12px; letter-spacing: -.035em; line-height: 1.1;
}
.mvs .cta-banner p { color: rgba(255,255,255,.8); font-size: 17px; margin-bottom: 28px; }
.mvs .cta-banner .btn-white {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 15px 32px; border-radius: var(--r-pill);
  font-size: 16px; font-weight: 700; line-height: 1; background: #fff; color: var(--ac);
  text-decoration: none; border: none; cursor: pointer;
  transition: transform .15s var(--ease), box-shadow .2s;
  box-shadow: 0 8px 24px rgba(0,0,0,.15);
}
.mvs .cta-banner .btn-white:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(0,0,0,.2); }

/* ── BREADCRUMB ── */
.mvs .bc { padding: 16px 0 0; font-size: 13px; color: var(--t3); }
.mvs .bc a { color: var(--t3); text-decoration: none; }
.mvs .bc a:hover { color: var(--t1); }
.mvs .bc span { margin: 0 6px; opacity: .5; }

/* ── SCROLL REVEAL ── */
.mvs .rv { opacity: 0; transform: translateY(18px); transition: opacity .7s var(--ease-out), transform .7s var(--ease-out); }
.mvs .rv.in { opacity: 1; transform: none; }
.mvs .rv-1 { transition-delay: .06s; }
.mvs .rv-2 { transition-delay: .13s; }
.mvs .rv-3 { transition-delay: .21s; }
.mvs .rv-4 { transition-delay: .28s; }

/* ── HERO-RIGHT IMAGE (non-genre pages — Workflow/Platform/Occasion/For Who) ── */
.mvs .hero-shot {
  background: #fff; border-radius: var(--r-xl); border: 1px solid var(--line);
  box-shadow: var(--el-2); overflow: hidden; position: relative;
}
.mvs .hero-shot img {
  display: block; width: 100%; height: auto; object-fit: cover;
}

/* ── "How Tunee builds your video" section ── */
.mvs .producer-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
}
@media (max-width: 980px) { .mvs .producer-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .mvs .producer-grid { grid-template-columns: 1fr; } }
.mvs .producer-card {
  background: var(--surface); border-radius: var(--r-lg); border: 1px solid var(--line);
  overflow: hidden; display: flex; flex-direction: column;
  transition: transform .25s var(--ease), box-shadow .25s var(--ease);
}
.mvs .producer-card:hover { transform: translateY(-2px); box-shadow: var(--el-2); }
.mvs .producer-shot {
  aspect-ratio: 4 / 3; background: var(--surface-2); overflow: hidden;
  border-bottom: 1px solid var(--line);
}
.mvs .producer-shot img {
  width: 100%; height: 100%; object-fit: cover; display: block;
}
.mvs .producer-body { padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
.mvs .producer-num {
  font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: var(--ac);
}
.mvs .producer-card-title { font-size: 15px; font-weight: 600; color: var(--t1); letter-spacing: -.01em; line-height: 1.3; }
.mvs .producer-card-desc { font-size: 13px; color: var(--t2); line-height: 1.55; }
`

// generateStaticParams — 11 locales × 100 slugs = 1100 pages
export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return (LOCALES as readonly string[]).flatMap(locale => slugs.map(slug => ({ locale, slug })))
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string; slug: string }> }
): Promise<Metadata> {
  const { locale, slug } = await params
  const cfg = getConfig(slug)
  const content = getContent(slug, locale)
  const canonical = locale === 'en'
    ? `${BASE_URL}/features/music-video-generator/${slug}`
    : `${BASE_URL}/${locale}/features/music-video-generator/${slug}`
  const genrePrefix = cfg.genre_name.toUpperCase().startsWith('AI ') ? '' : 'AI '
  const title = `${genrePrefix}${cfg.genre_name} Music Video Generator | Tunee`

  const languageAlternates: Record<string, string> = {
    'x-default': `${BASE_URL}/features/music-video-generator/${slug}`,
  }
  for (const loc of ALL_LOCALES) {
    languageAlternates[loc] = `${BASE_URL}/${loc}/features/music-video-generator/${slug}`
  }

  return {
    title,
    description: content.meta_description,
    alternates: {
      canonical,
      languages: languageAlternates,
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description: content.meta_description,
      siteName: 'Tunee',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@tuneeai',
      title,
      description: content.meta_description,
    },
  }
}

export default async function LocaleSlugPage(
  { params }: { params: Promise<{ locale: string; slug: string }> }
) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const cfg = getConfig(slug)
  const content = getContent(slug, locale)
  const imageCache = getImageCache()
  const allSlugs = getAllSlugs()
  const t = getT(locale)

  const MV_PARENT = locale === 'en'
    ? '/features/music-video-generator'
    : `/${locale}/features/music-video-generator`

  const genre = cfg.genre_name
  const accent = cfg.color_accent
  const sec = cfg.color_secondary
  const cat = cfg.category || ''
  const vk = cfg.visual_keywords || []
  const mw = cfg.mood_words || []

  const h1 = getH1(cfg, t)
  const lead = getLead(cfg, content, t)
  const medPrompts = getMediumPrompts(cfg, t)
  const personaBlocks = getPersonaBlocks(cfg, content, t)
  const whoTitle = getWhoUsesTitle(cfg, t)
  const useCases = getUseCases(cfg, t)
  const gpBadge = getGpBadge(cfg, t)
  const siblings = getSiblings(slug, allSlugs)

  // Non-genre pages (Workflow / Platform / Occasion-Viral / For Who) get the
  // Tunee workflow screenshot in hero-right and a new "How it builds" section
  // — these are positioned as the AI music video producer landing page.
  // Genre / Visual Style / MV Type pages keep the GenProcess card with genre coloring.
  const isNonGenre =
    cat.includes('Workflow') ||
    cat.includes('Platform') ||
    cat.includes('Occasion') ||
    cat.includes('Viral') ||
    cat.includes('For Who') ||
    slug.startsWith('music-video-for-')
  const h = strHash(slug)
  const champ = CHAMPION[h % CHAMPION.length]

  const tagWords = [...vk.slice(0, 4), ...mw.slice(0, 2)]

  // Gallery images
  const img1 = flickrUrl(cfg, 600, 420, 1, imageCache)
  const img2 = flickrUrl(cfg, 400, 220, 2, imageCache)
  const img3 = flickrUrl(cfg, 400, 220, 3, imageCache)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <Header />

      <div
        className="mvs"
        style={
          {
            '--ac': accent,
            '--ac2': sec,
            '--hero-grad-1': `color-mix(in srgb, ${accent} 12%, transparent)`,
            '--hero-grad-2': `color-mix(in srgb, ${sec} 8%, transparent)`,
          } as React.CSSProperties
        }
      >
        <div className="wrap">
          {/* Breadcrumb */}
          <nav className="bc">
            <Link href={locale === 'en' ? '/' : `/${locale}`}>{t.breadcrumbHome}</Link>
            <span>›</span>
            <a href={MV_PARENT}>{t.breadcrumbMvGen}</a>
            <span>›</span>
            <span>{t.breadcrumbGenre(genre)}</span>
          </nav>

          {/* ── HERO ── */}
          <section
            className="hero"
            style={{ position: 'relative' }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-20%',
                zIndex: -1,
                background: `radial-gradient(800px 500px at 70% 10%, color-mix(in srgb, ${accent} 12%, transparent), transparent 60%),
                             radial-gradient(600px 400px at 5% 80%, color-mix(in srgb, ${sec} 8%, transparent), transparent 60%)`,
                filter: 'blur(40px)',
              }}
            />
            <div className="hero-inner">
              <div className="hero-left">
                <div className="eyebrow">
                  <span className="eyebrow-dot" />
                  {t.heroEyebrow} · {cat || genre}
                </div>
                <h1>{h1}</h1>
                <p className="hero-lead">{lead}</p>
                <div className="hero-actions">
                  <a href="https://app.tunee.ai" className="btn-primary">
                    {t.startFree} ↗
                  </a>
                  <a href="#prompts" className="btn-ghost">{t.seePromptExamples}</a>
                </div>
                <div className="style-tags">
                  {tagWords.map((tw, i) => (
                    <span key={i} className="style-tag">{tw}</span>
                  ))}
                </div>
              </div>
              <div className="hero-right">
                {isNonGenre ? (
                  <div className="hero-shot">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/workflow/MV_mode.webp"
                      alt="Tunee AI music video producer — pick One-Click MV, Freestyle MV, Motion Control, or Shorts"
                      loading="eager"
                      width={1200}
                      height={720}
                    />
                  </div>
                ) : (
                  <GenProcess cfg={cfg} t={t} badge={gpBadge} />
                )}
              </div>
            </div>
          </section>

          {/* ── HOW TUNEE BUILDS YOUR VIDEO (non-genre pages only) ── */}
          {isNonGenre && (
            <section className="section">
              <div className="eyebrow-sm">{t.producerEyebrow}</div>
              <h2 className="sec-title rv">{t.producerH2}</h2>
              <p className="sec-sub rv rv-1">{t.producerSub}</p>
              <div className="producer-grid">
                <div className="producer-card rv rv-1">
                  <div className="producer-shot">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/workflow/choose_clips.webp"
                      alt={t.producerStep1Title}
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                  </div>
                  <div className="producer-body">
                    <div className="producer-num">01</div>
                    <div className="producer-card-title">{t.producerStep1Title}</div>
                    <div className="producer-card-desc">{t.producerStep1Desc}</div>
                  </div>
                </div>
                <div className="producer-card rv rv-2">
                  <div className="producer-shot">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/workflow/three-themes.webp"
                      alt={t.producerStep2Title}
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                  </div>
                  <div className="producer-body">
                    <div className="producer-num">02</div>
                    <div className="producer-card-title">{t.producerStep2Title}</div>
                    <div className="producer-card-desc">{t.producerStep2Desc}</div>
                  </div>
                </div>
                <div className="producer-card rv rv-3">
                  <div className="producer-shot">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/workflow/visual-assets.gif"
                      alt={t.producerStep3Title}
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                  </div>
                  <div className="producer-body">
                    <div className="producer-num">03</div>
                    <div className="producer-card-title">{t.producerStep3Title}</div>
                    <div className="producer-card-desc">{t.producerStep3Desc}</div>
                  </div>
                </div>
                <div className="producer-card rv rv-4">
                  <div className="producer-shot">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/workflow/storyboard.gif"
                      alt={t.producerStep4Title}
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                  </div>
                  <div className="producer-body">
                    <div className="producer-num">04</div>
                    <div className="producer-card-title">{t.producerStep4Title}</div>
                    <div className="producer-card-desc">{t.producerStep4Desc}</div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── VISUAL EXAMPLES ── */}
          <section className="section">
            <div className="eyebrow-sm">{t.galleryEyebrow}</div>
            <h2 className="sec-title rv">{t.galleryH2(genre)}</h2>
            <p className="sec-sub rv rv-1">
              {t.gallerySub(genre)}
            </p>
            <div className="gallery-grid">
              <div className="gallery-item rv rv-1" style={{ gridRow: 'span 2' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img1}
                  alt={`${vk[0] || genre} aesthetic — AI ${genre} music video`}
                  loading="lazy"
                  width={600}
                  height={420}
                />
                <div className="gallery-label">{vk[0] ? titleCase(vk[0]) : t.galleryLabel1}</div>
              </div>
              <div className="gallery-item rv rv-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img2}
                  alt={`${genre} music video scene — ${vk[1] || vk[0] || genre} visual`}
                  loading="lazy"
                  width={400}
                  height={220}
                />
                <div className="gallery-label">{vk[1] ? titleCase(vk[1]) : t.galleryLabel2}</div>
              </div>
              <div className="gallery-item rv rv-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img3}
                  alt={`${genre} music video mood — ${mw[0] || 'cinematic'} atmosphere`}
                  loading="lazy"
                  width={400}
                  height={220}
                />
                <div className="gallery-label">{mw[0] ? titleCase(mw[0]) : t.galleryLabel3}</div>
              </div>
            </div>
          </section>

          {/* ── HOW IT WORKS ── */}
          <section className="section">
            <div className="eyebrow-sm">{t.howItWorks}</div>
            <h2 className="sec-title rv">{t.howItWorksH2(genre)}</h2>
            <p className="sec-sub rv rv-1">{t.howItWorksSub}</p>
            <div className="steps">
              <div className="step-card rv rv-1">
                <div className="step-num">{t.stepUpload}</div>
                <div className="step-title">{t.step1Title}</div>
                <div className="step-desc">{t.step1Desc}</div>
              </div>
              <div className="step-card rv rv-2">
                <div className="step-num">{t.stepConfigure}</div>
                <div className="step-title">{t.step2Title}</div>
                <div className="step-desc">{t.step2Desc}</div>
              </div>
              <div className="step-card rv rv-3">
                <div className="step-num">{t.stepExport}</div>
                <div className="step-title">{t.step3Title}</div>
                <div className="step-desc">{t.step3Desc}</div>
              </div>
            </div>
          </section>

          {/* ── MEDIUM PROMPTS ── */}
          <section className="section" id="prompts">
            <div className="eyebrow-sm">{t.promptsSection}</div>
            <h2 className="sec-title rv">{t.promptsH2(genre)}</h2>
            <p className="sec-sub rv rv-1">
              {t.promptsSub(genre)}
            </p>
            <div className="mp-grid">
              {medPrompts.map((mp, i) => (
                <div key={i} className={`mp-card rv rv-${i + 1}`}>
                  <div className="mp-label">{mp.label}</div>
                  <p className="mp-text">{mp.text}</p>
                  <button className="mp-copy" data-copy={mp.text}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    {t.copyPrompt}
                  </button>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '24px' }}>
              <div className="eyebrow-sm" style={{ marginBottom: '14px' }}>{t.quickCopyLabel}</div>
              <div className="qp-grid">
                {content.prompts.slice(0, 5).map((p, i) => (
                  <div key={i} className={`qp-card rv rv-${(i % 3) + 1}`}>
                    <p className="qp-text">{p}</p>
                    <button className="copy-btn" data-copy={p}>{t.copy}</button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── USE CASES ── */}
          <section className="section">
            <div className="eyebrow-sm">{t.useCasesEyebrow}</div>
            <h2 className="sec-title rv">{t.useCasesH2(genre)}</h2>
            <p className="sec-sub rv rv-1">
              {t.useCasesSub(genre)}
            </p>
            <div className="uc-grid">
              {useCases.map((uc, i) => (
                <div key={i} className={`uc-card rv rv-${i + 1}`}>
                  <div className="uc-tag">{uc.tag}</div>
                  <div className="uc-title">{uc.title}</div>
                  <div className="uc-desc">{uc.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── WHO USES ── */}
          <section className="section">
            <div className="eyebrow-sm">{t.whoUsesTitle}</div>
            <h2 className="sec-title rv">{whoTitle}</h2>
            <div className="personas-grid">
              {personaBlocks.map((pb, i) => (
                <div key={i} className={`persona-card rv rv-${(i % 2) + 1}`}>
                  <div className="persona-role">{pb.label}</div>
                  <div className="persona-desc">{pb.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── COMPARISON ── */}
          <section className="section">
            <div className="eyebrow-sm">{t.whyAiEyebrow}</div>
            <h2 className="sec-title rv">{t.compareH2(genre)}</h2>
            <div className="compare-wrap rv rv-1">
              <table>
                <thead>
                  <tr>
                    <th>{t.compareFactor}</th>
                    <th>{t.compareTraditional}</th>
                    <th>{t.compareTuneeAI}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>{t.compareRow1Label}</td><td>{t.compareRow1Trad}</td><td className="chk">{t.compareRow1AI}</td></tr>
                  <tr><td>{t.compareRow2Label}</td><td>{t.compareRow2Trad}</td><td className="chk">{t.compareRow2AI}</td></tr>
                  <tr><td>{t.compareRow3Label}</td><td>{t.compareRow3Trad}</td><td className="chk">{t.compareRow3AI}</td></tr>
                  <tr><td>{t.compareRow4Label}</td><td>{t.compareRow4Trad}</td><td className="chk">{t.compareRow4AI}</td></tr>
                  <tr><td>{t.compareRow5Label}</td><td>{t.compareRow5Trad}</td><td className="chk">{t.compareRow5AI}</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="section">
            <div className="eyebrow-sm">{t.faqEyebrow}</div>
            <h2 className="sec-title rv">{t.faqH2(genre)}</h2>
            <div className="faq-list">
              <details className="faq-item rv">
                <summary className="faq-q">{t.faqQ1}</summary>
                <div className="faq-a">{t.faqA1}</div>
              </details>
              <details className="faq-item rv">
                <summary className="faq-q">{t.faqQ2}</summary>
                <div className="faq-a">{t.faqA2}</div>
              </details>
              <details className="faq-item rv">
                <summary className="faq-q">{t.faqQ3(genre)}</summary>
                <div className="faq-a">{t.faqA3}</div>
              </details>
              {content.faqs.map((faq, i) => (
                <details key={i} className="faq-item rv">
                  <summary className="faq-q">{faq.q}</summary>
                  <div className="faq-a">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>

          {/* ── INTERNAL LINKS ── */}
          <div className="il-section">
            <h3>{t.relatedPages}</h3>
            <div className="il-pills">
              <a href={MV_PARENT} className="il-pill">{t.allStylesLink}</a>
              {siblings.map(s => (
                <a key={s} href={`${MV_PARENT}/${s}`} className="il-pill">
                  {toTitleCase(s.replace(/-/g, ' '))}
                </a>
              ))}
              <a href={champ[1]} className="il-pill">{champ[0]}</a>
            </div>
          </div>

          {/* ── CTA BANNER ── */}
          <div className="cta-banner" style={{ background: `linear-gradient(135deg, ${accent}, ${sec})` }}>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(700px 400px at 80% -20%, rgba(255,255,255,.15), transparent 60%)',
                pointerEvents: 'none',
              }}
            />
            <h2>{t.ctaBannerTitle}</h2>
            <p>{t.ctaBannerSub}</p>
            <a href="https://app.tunee.ai" className="btn-white" style={{ color: accent }}>
              {t.tryNow} ↗
            </a>
          </div>
        </div>
      </div>

      <Footer />

      {/* Schema JSON-LD */}
      <SchemaScripts cfg={cfg} content={content} />

      {/* Client-side effects — runs on mount AND on every Next.js client-side navigation.
          Replaces what used to be an inline <script>, which didn't fire on Link navigations
          and left every .rv-animated section invisibly stuck at opacity:0. */}
      <SlugPageEffects copiedLabel={t.copied} />
    </>
  )
}

function titleCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function toTitleCase(s: string): string {
  return s.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1))
}
