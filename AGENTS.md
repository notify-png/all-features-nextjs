# all-features-nextjs

`https://www.tunee.ai/features/...` 下的功能页与 MV 落地页。
110 个 MV 页（`/features/music-video-generator/<slug>`），每页十一个语言版本。

建页流程不在这个仓，在 `tunee-seo-pipeline/.claude/skills/mv-landing-page/`。
本文件只讲**在这个仓里改东西时的硬约束**。

## 和另一个内容站的区别

同为内容站，但结构完全不同，**别把 `tunee-nextjs` 的做法套过来**：

| | tunee-nextjs | 本仓 |
|---|---|---|
| 页面注册 | 四处，漏了静默失效 | **零处**——`getAllSlugs()` 读目录，建文件即生效 |
| 内容 | 一个 `.ts` | 两个 `.json`（config + content） |
| 多语言 | 模板 + 译名表现场合成 | **每语言一个完整内容文件** |
| 配图 | 不用 | **3 张**，缺了会显示随机图 |

「零注册」只是说**页面**不用注册。语言文件、配图、入口译名三样不备齐，
页面照样能打开，但分别变成英文重复页、随机图、英文入口名——**都不报错**。

## 文件在哪

```
data/configs/mv/<slug>.json              配置（视觉关键词、主色、demo prompt）
data/content/mv/<slug>.json              英文内容
data/content/mv/<locale>/<slug>.json     十个语言，结构与英文完全相同
public/mv-gallery/<slug>/1.jpg 2.jpg 3.jpg
src/lib/mv/slugNames.ts                  分类页上的入口译名
```

语言码：`ja es pt fr de it ko ru zh-CN zh-HK`。

## 硬约束

### 1. 英文字段改了，十个语言文件的同一字段要一起改

缺语言文件时整页显示英文，而页面声明自己是该语言的规范版——**上线即是十个英文重复页**。
主站已因同样的原因被 Google Search Console 报过「重复网页」。

### 2. JSON 文件**没有行尾换行**

仓库现状如此。写文件时别让编辑器或脚本自动补 `\n`，否则每个文件都会多出一行无关 diff。

### 3. 数组长度固定，不要改

110 个现有页完全一致：`prompts` 8 / `personas` 4 / `faqs` 5 / `narrative.sections` 3。
`verify-mv` 会检查。

### 4. `meta_description` ≤ 150 字符

站点代码不截断，但超过 155 在搜索结果里大概率显示不全。
中日韩一个字的显示宽度约是英文两倍，写到 80 字以内。

### 5. 配图文件名必须全小写

本机 macOS 不分大小写，`1.JPG` 能过本地校验，**线上 Linux 构建找不到**。
单张 < 400KB。不要手写图片 URL——没有来源的图片地址是编的。

### 6. 不新增产品事实

分辨率、导出格式、生成时长、移动端支持、授权与价格，只能从现有页原样搬。
这些句子进 `FAQPage` / `SoftwareApplication` 结构化数据，写错就是对外承诺。
不写任何用户量、播放量、评分。Platform 类页不写平台规格的具体数字
（Spotify Canvas 时长、TikTok 画幅等），除非能给出该平台官方文档链接。

## 改完怎么验

```bash
cd ../tunee-seo-pipeline && node src/cli.mjs verify-mv <slug>
```

查字段、数组长度、TODO 残留、描述长度、十个语言文件（字段齐全、正文不能还是英文）、
配图来源与文件名大小写。**除「没余量」那一项提示外必须零报错。**

存量页可能报出不是你引入的问题（例如 41 个页的 zh-CN 缺 narrative），
不处理也行，但要在 PR 里注明「存量问题未处理」。

本地 `tsc` 不检查 JSON 内容（运行时才读），能不能构建以 Vercel Preview 为准。

**新配图在 Preview 上是坏图，这是正常的**：站点把 `public/` 下的图固定指向生产部署。
Preview 上只核对图片地址以 `/mv-gallery/<slug>/1.jpg` 结尾，**合并部署后再打开线上页**确认。

## 不要碰

- **不改 `src/lib/` 或页面代码去「注册」新页。** 不需要，建文件即生效。
- Preview 构建失败时，把报错原文转开发，不要改渲染代码让它通过。

## 开 PR 前

批量改动（涉及多语言、多页面）在开 PR 前先做一次独立复查，
复查时不要把自己的结论喂给复查方，只给事实和要查的维度。

PR 描述里写清楚：改了什么、**没做什么**、怎么验的。
