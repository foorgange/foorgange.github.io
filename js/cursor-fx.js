// 蔚蓝档案风格「点击特效 + 光标拖尾」——日/夜双模式版
// 上游项目：https://github.com/CialloKing/ba-click-fx  （MIT License，版权归原作者 CialloKing）
//
// 集成说明：
//   1. 仅桌面端启用（精确指针 hover:hover 且无触摸点）；移动端不加载任何额外资源，不影响手机性能。
//   2. 库本体自托管于同目录 ba-click-fx.js，页面 load 后的空闲时段才拉取，不与首屏争抢带宽；
//      加载失败静默降级，站点其余功能不受影响。
//   3. 颜色与合成方式跟随站点调色板，切换日夜模式时实时生效：
//        · 日间 = 嫩叶绿 + source-over（正常混合）
//          原因：日间首页是绿色系照片、内页是白底，加色(screen)在亮底上没有增亮空间，颜色会被冲淡到几乎看不见；
//          正常混合才能保住绿色本身。
//        · 夜间 = 游戏默认蓝 #4ca7ff + screen（加色发光）
//          原因：夜间首页是深蓝星空底，加色发光正是该效果的原设计，观感最佳。
(function () {
  'use strict';

  // ======== 可调项 ========
  var LIGHT_COLOR = '#6BCB40';            // 日间主题色（嫩叶绿，取自首页日间背景的叶片绿）
  var LIGHT_COMPOSITING = 'source-over';  // 日间宿主合成
  var DARK_COLOR = null;                  // 夜间主题色；null = 游戏默认蓝
  var DARK_COMPOSITING = 'screen';        // 夜间宿主合成
  var COLOR_FIXED = null;                 // 固定主题色；非 null 时日夜都用它
  var COMPOSITING_FIXED = null;           // 固定合成方式；非 null 时日夜都用它
  var TRAIL_ALWAYS = true;                // true：移动鼠标即显示拖尾（无需按住左键）
  var SCALE = 1.0;                        // 整体尺寸倍率
  var OPACITY = 1.0;                      // 整体不透明度
  var IDLE_DELAY = 1200;                  // 无 requestIdleCallback 时的延迟毫秒数
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

  function isDarkScheme() {
    var attr = document.body && document.body.getAttribute('data-md-color-scheme');
    return attr === 'slate';
  }

  var self = document.currentScript;
  var base = self && self.src ? new URL('.', self.src).href : '/js/';

  function importLibrary() {
    import(/* webpackIgnore: true */ base + 'ba-click-fx.js').then(function (mod) {
      var BAClickFX = mod.BAClickFX || (mod.default && mod.default.BAClickFX) || mod.default;
      if (typeof BAClickFX !== 'function') return;
      var DEFAULT_COLOR = mod.DEFAULT_THEME_COLOR || null;

      var fx = new BAClickFX({
        outputCompositing: 'browser-overlay',
        hostCompositing: isDarkScheme() ? DARK_COMPOSITING : LIGHT_COMPOSITING,
        hostCompositingSurface: 'dom-backdrop',
        trailAlways: TRAIL_ALWAYS,
        scale: SCALE,
        opacity: OPACITY
      });

      function applyTheme() {
        var dark = isDarkScheme();
        var color = COLOR_FIXED || (dark ? DARK_COLOR : LIGHT_COLOR) || DEFAULT_COLOR;
        var comp = COMPOSITING_FIXED || (dark ? DARK_COMPOSITING : LIGHT_COMPOSITING);
        if (color) {
          try { fx.setThemeColor(color); } catch (e) { /* 非法值则保持当前色 */ }
        }
        try { fx.updateConfig({ hostCompositing: comp }); } catch (e) { /* 不支持则保持构造时设定 */ }
      }

      applyTheme();
      watchSchemeChange(applyTheme);
      window.__baClickFX = fx; // 便于控制台调试 / 后续扩展
    }).catch(function (err) {
      if (window.console && console.warn) {
        console.warn('[cursor-fx] 未启用（资源加载失败）：', err && err.message);
      }
    });
  }

  // 监听 Material 调色板切换（含手动切换与系统主题变化）
  function watchSchemeChange(onChange) {
    var last = isDarkScheme();
    function check() {
      var now = isDarkScheme();
      if (now !== last) { last = now; onChange(); }
    }
    var inputs = document.querySelectorAll('input[data-md-color-scheme]');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('change', function () { setTimeout(check, 60); });
    }
    try {
      new MutationObserver(check).observe(document.body, {
        attributes: true, attributeFilter: ['data-md-color-scheme']
      });
    } catch (e) { /* 老浏览器忽略 */ }
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var handler = function () { setTimeout(check, 60); };
      if (mq.addEventListener) mq.addEventListener('change', handler);
      else if (mq.addListener) mq.addListener(handler);
    }
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
