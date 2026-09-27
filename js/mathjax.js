// MathJax 按需加载器（性能优化）
// 原实现：全站无条件加载 MathJax + polyfill.io（约 1MB+ CDN 脚本；97 个页面中仅 6 个含公式）
// 现实现：仅当页面包含 .arithmatex 元素时才加载 MathJax；公式渲染结果与原实现完全一致
(function () {
  'use strict';

  var MATHJAX_SRC = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';

  function pageHasMath() {
    return !!document.querySelector('.arithmatex');
  }

  function typeset() {
    if (!window.MathJax || !window.MathJax.typesetPromise) return;
    try {
      if (window.MathJax.startup && window.MathJax.startup.output && window.MathJax.startup.output.clearCache) {
        window.MathJax.startup.output.clearCache();
      }
      window.MathJax.typesetClear();
      window.MathJax.texReset();
      window.MathJax.typesetPromise();
    } catch (e) { /* 即时导航竞态时的安全兜底 */ }
  }

  function loadMathJax() {
    if (window.__mathjaxLoaded) { typeset(); return; }
    if (window.__mathjaxLoading) return;
    window.__mathjaxLoading = true;

    // 配置必须在脚本加载前设置（与原 mathjax.js 行为一致）
    window.MathJax = {
      tex: {
        inlineMath: [['\\(', '\\)']],
        displayMath: [['\\[', '\\]']],
        processEscapes: true,
        processEnvironments: true
      },
      options: {
        ignoreHtmlClass: '.*|',
        processHtmlClass: 'arithmatex'
      }
    };

    var s = document.createElement('script');
    s.src = MATHJAX_SRC;
    s.async = true;
    s.onload = function () {
      window.__mathjaxLoaded = true;
      window.__mathjaxLoading = false;
      typeset();
    };
    s.onerror = function () { window.__mathjaxLoading = false; };
    document.head.appendChild(s);
  }

  function check() {
    if (pageHasMath()) loadMathJax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', check);
  } else {
    check();
  }

  // Material for MkDocs 即时导航：页面切换后重新检测
  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(function () { check(); });
  }
})();
