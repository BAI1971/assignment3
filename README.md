# Assignment 3 · 传统方式「个人博客」（2025106140 白名睿）

《新媒体交互设计》第 3 次作业。**从无到有，用传统方式制作个人主页**：语义化 HTML + 手写 CSS + 原生 JS，不借助任何前端框架。

这次做成的是**内容型个人博客**，不是简历式主页：文章流、分类、标签、归档、关于、暗色模式、RSS 与站点地图。6 篇文章全部来自真实的课程与校园材料。

## 在线访问

- 博客首页：<https://bai1971.github.io/assignment3/>（根域名自动跳转到提交目录）
- 3D 交互版首页（作业 2）：<https://bai1971.github.io/assignment2/>

## 提交目录（严格按老师规范命名）

```
2025106140白名睿/          ← 目录名 = 学号姓名，无空格无加号
├── index.html             首页：文章流 + 侧栏 + 标签筛选
├── index01.html           一级页面：归档（分类 / 标签 / 按月）
├── index02.html           一级页面：关于（自述 / 时间线 / 技能）
├── index0101.html         二级页面：文章详情（推普周）
├── index0102.html         二级页面：文章详情（共产党宣言分享稿）
├── index0103.html         二级页面：文章详情（综合测评手记）
├── index0104.html         二级页面：文章详情（AI 视频）
├── index0105.html         二级页面：文章详情（悬疑演示）
├── index0106.html         二级页面：文章详情（Three.js 首页）
├── images/                logo.png + 6 张文章封面（脚本生成）
├── styles/
│   └── layout.css         全站统一样式表（规范要求文件名）
└── scripts/
    └── main.js            全站交互脚本
```

仓库根另有：`404.html`、`feed.xml`（RSS）、`sitemap.xml`。

## 规范自查

- ✅ 目录命名：`2025106140白名睿`（学号姓名，无空格无加号）
- ✅ 页面命名：`index.html` / 一级 `index01.html`、`index02.html` / 二级 `index0101.html` 起
- ✅ 目录结构：`images/`、`styles/`（含 `layout.css`）、`scripts/`
- ✅ 语义化标签：`<header>` `<nav>` `<main>` `<section>` `<article>` `<aside>` `<figure>` `<figcaption>` `<footer>` 均有使用
- ✅ HTML、CSS、JS 均带结构注释

## 技术说明

- 视觉：纸感浅色 + 墨黑 + 印章红，衬线标题；`data-theme` 变量切换暗色模式并记忆到 localStorage
- 交互：导航高亮、标签/分类筛选、阅读进度条、返回顶部、IntersectionObserver 进场动画
- 内容：6 篇博文（课程笔记 / 作品手记 / 校园现场 / 生活随笔），封面图为本地生成，无外链依赖
- 全站静态，无框架、无构建步骤、无追踪脚本
