// 性能优化（零视觉变化）：
// 1. 首屏以下的正文图片懒加载（loading=lazy），长文页初始加载量大幅下降
// 2. 宽表格包裹横向滚动容器，避免窄屏/超宽表格撑破布局（桌面端视觉不变）
(function () {
  'use strict';

  function lazyImages() {
    var imgs = document.querySelectorAll('.md-content img');
    var limit = window.innerHeight * 1.5;
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      if (im.getAttribute('loading') === 'lazy') continue;
      var rect = im.getBoundingClientRect();
      if (rect.top > limit) {
        im.setAttribute('loading', 'lazy');
        im.setAttribute('decoding', 'async');
      }
    }
  }

  function wrapTables() {
    var tables = document.querySelectorAll('.md-typeset table');
    for (var i = 0; i < tables.length; i++) {
      var t = tables[i];
      if (t.parentNode && t.parentNode.classList && t.parentNode.classList.contains('md-typeset__table-scroll')) continue;
      var w = document.createElement('div');
      w.className = 'md-typeset__table-scroll';
      t.parentNode.insertBefore(w, t);
      w.appendChild(t);
    }
  }

  function init() {
    lazyImages();
    wrapTables();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Material for MkDocs 即时导航：页面切换后重新处理
  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(function () { init(); });
  }
})();
