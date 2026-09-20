// 蔚蓝档案风格「点击特效 + 光标拖尾」
// 上游项目：https://github.com/CialloKing/ba-click-fx  （MIT License，版权归原作者 CialloKing）
// 集成说明：
//   1. 仅桌面端启用（精确指针 hover:hover 且无触摸点）；移动端不加载任何额外资源，不影响手机性能。
//   2. 库本体自托管于同目录 ba-click-fx.js（621KB），页面 load 后的空闲时段才拉取，
//      不与首屏渲染争抢带宽；加载失败静默降级，站点其余功能不受影响。
//   3. 采用上游文档推荐的「未知背景」合成配置：browser-overlay + screen + dom-backdrop。
(function () {
  'use strict';

  // ======== 可调项 ========
  var THEME_COLOR = null;    // 特效主题色，如 '#ff80b5'；null = 使用游戏默认蓝
  var TRAIL_ALWAYS = true;   // true：移动鼠标即显示拖尾（无需按住左键）
  var SCALE = 1.0;           // 整体尺寸倍率
  var OPACITY = 1.0;         // 整体不透明度
  var IDLE_DELAY = 1200;     // 无 requestIdleCallback 时的延迟毫秒数
  // =======================

  function isDesktopPointer() {
    if (navigator.maxTouchPoints > 0) return false;
    if (!window.matchMedia) return true;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }

  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  // 桌面精确指针 且 未开启"减弱动态效果"时才启用
  if (!isDesktopPointer() || prefersReducedMotion()) return;

  var self = document.currentScript;
  var base = self && self.src ? new URL('.', self.src).href : '/js/';

  function importLibrary() {
    import(/* webpackIgnore: true */ base + 'ba-click-fx.js').then(function (mod) {
      var BAClickFX = mod.BAClickFX || (mod.default && mod.default.BAClickFX) || mod.default;
      if (typeof BAClickFX !== 'function') return;
      var fx = new BAClickFX({
        outputCompositing: 'browser-overlay',
        hostCompositing: 'screen',
        hostCompositingSurface: 'dom-backdrop',
        trailAlways: TRAIL_ALWAYS,
        scale: SCALE,
        opacity: OPACITY
      });
      if (THEME_COLOR) {
        try { fx.setThemeColor(THEME_COLOR); } catch (e) { /* 非法颜色则保持默认 */ }
      }
      window.__baClickFX = fx; // 便于控制台调试 / 后续扩展
    }).catch(function (err) {
      if (window.console && console.warn) {
        console.warn('[cursor-fx] 未启用（资源加载失败）：', err && err.message);
      }
    });
  }

  // 空闲时段加载：不阻塞首屏、不参与首屏关键路径
  function scheduleLoad() {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(importLibrary, { timeout: 3000 });
    } else {
      setTimeout(importLibrary, IDLE_DELAY);
    }
  }

  if (document.readyState === 'complete') {
    scheduleLoad();
  } else {
    window.addEventListener('load', scheduleLoad);
  }
})();
