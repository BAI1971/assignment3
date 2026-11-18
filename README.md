# Assignment 3 · 传统方式个人主页（2025106140 白名睿）

《新媒体交互设计》第 3 次作业。**从无到有，用传统方式制作个人主页**：语义化 HTML + 手写 CSS + 原生 JS，不借助任何前端框架。

## 在线访问

- 主页：<https://bai1971.github.io/assignment3/>（根域名自动跳转到提交目录）

## 提交目录（严格按老师规范命名）

```
2025106140白名睿/          ← 目录名 = 学号姓名，无空格无加号
├── index.html             首页
├── index01.html           一级页面：个人简历
├── index02.html           一级页面：作品集
├── index0101.html         二级页面：荣誉详情（index01 的下一级）
├── images/                图片素材
├── styles/
│   └── layout.css         全站统一样式表（规范要求文件名）
└── scripts/
    └── main.js            全站交互脚本
```

## 规范自查

- ✅ 目录命名：`2025106140白名睿`（学号姓名，无空格无加号）
- ✅ 首页命名：`index.html`；一级页面 `index01.html`；二级页面 `index0101.html`
- ✅ 目录结构：`images/`、`styles/`（含 `layout.css`）、`scripts/`
- ✅ 语义化标签：`<header>` `<nav>` `<main>` `<section>` `<article>` `<aside>`（样式区） `<figure>` `<footer>` 均有使用
- ✅ HTML 与 CSS 均带结构注释

## 技术说明

- 视觉方案：纸感浅色 + 墨黑 + 印章红，衬线标题（呼应新闻传播的人文气质）
- 交互：导航当前页高亮、滚动进场动画（IntersectionObserver）、返回顶部按钮
- 页面中的 3D 角色立牌为 AI 生成的概念图（与第 2 次作业同源素材）
