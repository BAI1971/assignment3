/* ============================================================
   main.js —— 第 3 次作业「个人博客」全站交互脚本
   功能：1 主题切换  2 导航高亮  3 标签/分类筛选  4 阅读进度
        5 返回顶部  6 滚动进场动画
   ============================================================ */

/* ---------- 1. 明暗主题切换（记忆到 localStorage） ---------- */
(function theme() {
  var KEY = 'bmr-blog-theme';
  var root = document.documentElement;
  // 支持用 ?theme=dark / ?theme=light 直接指定（便于分享与预览）
  var q = location.search.match(/[?&]theme=(dark|light)/);
  var saved = q ? q[1] : (localStorage.getItem(KEY) || 'light');
  // 首屏应用主题时禁用过渡，避免链接颜色停在旧主题上
  root.classList.add('no-trans');
  root.setAttribute('data-theme', saved);
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { root.classList.remove('no-trans'); });
  });
  var btn = document.getElementById('themeToggle');
  function paint() {
    if (!btn) return;
    btn.textContent = saved === 'dark' ? '\u2600' : '\u263E';
    btn.setAttribute('aria-label', saved === 'dark' ? '切换到浅色模式' : '切换到深色模式');
    btn.title = saved === 'dark' ? '切换到浅色模式' : '切换到深色模式';
  }
  paint();
  if (btn) btn.addEventListener('click', function () {
    saved = saved === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', saved);
    localStorage.setItem(KEY, saved);
    paint();
  });
})();

/* ---------- 2. 导航高亮：body[data-nav] 与链接 data-nav 对应 ---------- */
(function nav() {
  var cur = document.body.getAttribute('data-nav');
  document.querySelectorAll('.site-nav a[data-nav]').forEach(function (a) {
    if (a.getAttribute('data-nav') === cur) a.classList.add('active');
  });
})();

/* ---------- 3. 首页标签筛选 / 归档页分类筛选 ---------- */
(function filters() {
  var chips = document.querySelectorAll('[data-filter-tag]');
  var cards = document.querySelectorAll('.post-card[data-tags]');
  var tip = document.getElementById('filterTip');
  if (chips.length && cards.length) {
    function applyTag(tag) {
      var n = 0;
      cards.forEach(function (c) {
        var tags = (c.getAttribute('data-tags') || '').split('|');
        var show = !tag || tags.indexOf(tag) !== -1;
        c.style.display = show ? '' : 'none';
        if (show) n++;
      });
      if (tip) {
        tip.innerHTML = tag
          ? '\u7B5B\u9009\u300C' + tag + '\u300D\u00B7 ' + n + ' \u7BC7 <button id="clearFilter">\u6E05\u9664</button>'
          : '\u5171 ' + n + ' \u7BC7\u6587\u7AE0';
        var cl = document.getElementById('clearFilter');
        if (cl) cl.addEventListener('click', function () { applyTag(''); });
      }
      chips.forEach(function (b) {
        b.classList.toggle('on', b.getAttribute('data-filter-tag') === tag);
      });
    }
    chips.forEach(function (b) {
      b.addEventListener('click', function () {
        applyTag(b.getAttribute('data-filter-tag'));
        var h = document.querySelector('.stream-head');
        if (h) h.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    var m = location.search.match(/[?&]tag=([^&]+)/);
    if (m) applyTag(decodeURIComponent(m[1]));
  }

  var catBtns = document.querySelectorAll('[data-filter-cat]');
  var items = document.querySelectorAll('.archive-item[data-cat]');
  if (catBtns.length && items.length) {
    function applyCat(cat) {
      var n = 0;
      items.forEach(function (it) {
        var show = !cat || it.getAttribute('data-cat') === cat;
        it.style.display = show ? '' : 'none';
        if (show) n++;
      });
      catBtns.forEach(function (b) {
        b.classList.toggle('on', b.getAttribute('data-filter-cat') === cat);
      });
      document.querySelectorAll('.archive-group').forEach(function (g) {
        var visible = g.querySelectorAll('.archive-item[style=""], .archive-item:not([style])');
        g.style.display = visible.length ? '' : 'none';
      });
      return n;
    }
    catBtns.forEach(function (b) {
      b.addEventListener('click', function () { applyCat(b.getAttribute('data-filter-cat')); });
    });
    var c = location.search.match(/[?&]cat=([^&]+)/);
    if (c) applyCat(decodeURIComponent(c[1]));
  }
})();

/* ---------- 4. 详情页阅读进度条 ---------- */
(function progress() {
  var bar = document.getElementById('progress');
  if (!bar) return;
  function upd() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', upd, { passive: true });
  window.addEventListener('resize', upd);
  upd();
})();

/* ---------- 5. 返回顶部按钮（动态插入） ---------- */
(function backTop() {
  var btn = document.createElement('button');
  btn.id = 'backTop'; btn.textContent = '\u2191';
  btn.setAttribute('aria-label', '返回顶部');
  document.body.appendChild(btn);
  function toggle() { btn.classList.toggle('show', window.scrollY > window.innerHeight * 0.6); }
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
  btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();

/* ---------- 6. 滚动进场动画 ---------- */
(function reveal() {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  items.forEach(function (el) { io.observe(el); });
})();
