/* ============================================================
   main.js —— 《新媒体交互设计》第 3 次作业 全站交互脚本
   作者：白名睿（2025106140）
   功能：1) 导航高亮当前页  2) 返回顶部按钮  3) 滚动进场动画
   ============================================================ */

/* ---------- 1. 导航高亮：根据文件名匹配当前页 ---------- */
(function markActiveNav() {
  // 取当前页面文件名，如 index01.html；根路径时视为 index.html
  var file = location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.site-nav a');
  links.forEach(function (a) {
    var target = a.getAttribute('href').split('/').pop();
    if (target === file) a.classList.add('active');
  });
})();

/* ---------- 2. 返回顶部按钮 ---------- */
(function backTop() {
  // 动态插入按钮，避免每个页面重复书写 HTML
  var btn = document.createElement('button');
  btn.id = 'backTop';
  btn.textContent = '↑';
  btn.setAttribute('aria-label', '返回顶部');
  document.body.appendChild(btn);

  // 滚动超过一屏时显示按钮
  function toggle() {
    btn.classList.toggle('show', window.scrollY > window.innerHeight * 0.6);
  }
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ---------- 3. 滚动进场动画：给 .reveal 元素在进入视口时加 .in ---------- */
(function revealOnScroll() {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  // 不支持 IntersectionObserver 的老浏览器直接全部显示，保证可读性
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);   // 只触发一次，避免反复闪烁
      }
    });
  }, { threshold: 0.15 });

  items.forEach(function (el) { io.observe(el); });
})();
