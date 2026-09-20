// Assumed Sakura constructor
function Sakura(x, y, s, r, fn) {
  this.x = x;
  this.y = y;
  this.s = s; // size
  this.r = r; // rotation
  this.fn = fn; // functions for animation
}

// Global image variable for sakura petal
var img;

Sakura.prototype.draw = function (cxt) {
    // Ensure img is loaded and cxt is valid
    if (!img || !img.complete || img.naturalWidth === 0 || !cxt) {
        return;
    }
    cxt.save();
    cxt.translate(this.x, this.y);
    cxt.rotate(this.r);
    var drawWidth = 40 * this.s;
    var drawHeight = 40 * this.s;
    try {
        cxt.drawImage(img, 0, 0, drawWidth, drawHeight);
    } catch (e) {
        // console.error("Error drawing sakura image: ", e);
    }
    cxt.restore();
}

Sakura.prototype.update = function () {
    this.x = this.fn.x(this.x, this.y);
    this.y = this.fn.y(this.y, this.y);
    this.r = this.fn.r(this.r);
    if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
        this.r = getRandom('fnr');
        if (Math.random() > 0.4) {
            this.x = getRandom('x');
            this.y = 0;
            this.s = getRandom('s');
            this.r = getRandom('r');
        } else {
            this.x = window.innerWidth;
            this.y = getRandom('y');
            this.s = getRandom('s');
            this.r = getRandom('r');
        }
    }
}

var SakuraList = function () {
    this.list = [];
}

SakuraList.prototype.push = function (sakura) {
    this.list.push(sakura);
}

SakuraList.prototype.update = function () {
    for (var i = 0, len = this.list.length; i < len; i++) {
        this.list[i].update();
    }
}

SakuraList.prototype.draw = function (cxt) {
    for (var i = 0, len = this.list.length; i < len; i++) {
        this.list[i].draw(cxt);
    }
}

SakuraList.prototype.get = function (i) {
    return this.list[i];
}

SakuraList.prototype.size = function () {
    return this.list.length;
}

function getRandom(option) {
    var ret, random;
    switch (option) {
        case 'x': ret = Math.random() * window.innerWidth; break;
        case 'y': ret = Math.random() * window.innerHeight; break;
        case 's': ret = Math.random() * 0.4 + 0.2; break; // Adjusted: Size factor from 0.2 to 0.6
        case 'r': ret = Math.random() * 6; break;
        case 'fnx':
            random = -0.5 + Math.random() * 1;
            ret = function (x, y) { return x + 0.5 * random - 1.7; };
            break;
        case 'fny':
            random = 1.5 + Math.random() * 0.7
            ret = function (x, y) { return y + random; };
            break;
        case 'fnr':
            random = Math.random() * 0.03;
            ret = function (r) { return r + random; };
            break;
    }
    return ret;
}

var canvas, cxt;

function startSakuraAnimation() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
    }

    // 尊重系统的"减弱动态效果"设置（无障碍），不改变默认用户的画面
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000 / 60); };

    canvas = document.createElement('canvas');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;'); 
    canvas.setAttribute('id', 'canvas_sakura');
    
    if (document.body) {
        document.body.appendChild(canvas);
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            if (document.body) document.body.appendChild(canvas);
        });
    }
    
    cxt = canvas.getContext('2d');
    var sakuraList = new SakuraList();

    // 移动端减少花瓣数量（宽屏 25 片 / 窄屏 10 片），降低 CPU 与电量消耗
    var petalCount = window.innerWidth <= 960 ? 10 : 25;

    for (var i = 0; i < petalCount; i++) {
        var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny, randomFnR;
        randomX = getRandom('x');
        randomY = getRandom('y');
        randomR = getRandom('r');
        randomS = getRandom('s'); 
        randomFnx = getRandom('fnx');
        randomFny = getRandom('fny');
        randomFnR = getRandom('fnr');
        sakura = new Sakura(randomX, randomY, randomS, randomR, { x: randomFnx, y: randomFny, r: randomFnR });
        sakuraList.push(sakura);
    }
    
    function gameLoop() {
        if (!cxt || !canvas) return;
        cxt.clearRect(0, 0, canvas.width, canvas.height);

        sakuraList.update();
        sakuraList.draw(cxt);
        requestAnimationFrame(gameLoop);
    }
    requestAnimationFrame(gameLoop);

    window.addEventListener('resize', function() {
        if (canvas) {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
        }
    });
}

// Function to get current theme mode
function getCurrentTheme() {
    // 检查是否在首页（有homepage类），因为CSS背景切换只在body.homepage上生效
    const bodyElement = document.body;
    const isHomepage = bodyElement && bodyElement.classList.contains('homepage');
    
    console.log('Is homepage:', isHomepage);
    
    // 检查body元素的data-md-color-scheme属性
    const scheme = bodyElement.getAttribute('data-md-color-scheme');
    
    console.log('Theme detection - body scheme:', scheme, 'isHomepage:', isHomepage);
    
    // Material for MkDocs uses 'slate' for dark mode and 'default' for light mode
    // 根据CSS实现：default=日间模式，slate=夜间模式
    if (scheme === 'slate') {
        console.log('Detected: DARK mode (slate)');
        return 'dark';
    } else if (scheme === 'default') {
        console.log('Detected: LIGHT mode (default)');
        return 'light';
    } else {
        console.log('Detected: UNKNOWN scheme:', scheme, '- defaulting to LIGHT mode');
        return 'light';
    }
}

// Function to load appropriate image based on theme
// 修复说明（原实现有三个问题，导致"切换日夜后飘落花瓣不变、要刷新才变"）：
//   1. `if (canvas && ctx)` 里的 ctx 是笔误（全局变量实际叫 cxt），切换主题时 canvas 已存在，
//      读取未声明的 ctx 直接抛 ReferenceError，函数当场中断，后面的换图逻辑从未执行；
//   2. `sakuraList` 是 startSakuraAnimation 内的局部变量，这里赋值只是造了个无用的全局变量；
//   3. 直接改写全局 img.src，新图加载期间 draw() 因 img.complete 为 false 会停画花瓣（闪断）。
// 现改为：先加载新图，加载成功后再原子替换全局 img —— 动画循环每帧读取全局 img，替换即生效。
var petalLoadingPath = null;

function loadThemeImage() {
    const theme = getCurrentTheme();
    // 日间用 flower.png，夜间用 ec26d2123cf5215d2bca8eacff76e5e9.png
    const imagePath = theme === 'dark' ? "img/ec26d2123cf5215d2bca8eacff76e5e9.png" : "img/flower.png";

    // 已经是当前主题的图且加载完成 → 无需处理
    if (img && img.complete && img.naturalWidth > 0 && img.src.indexOf(imagePath) !== -1) {
        return;
    }
    // 同一张图正在加载中 → 不重复发起
    if (petalLoadingPath === imagePath) {
        return;
    }
    petalLoadingPath = imagePath;

    const next = new Image();
    next.onload = function () {
        petalLoadingPath = null;
        img = next; // 原子替换：动画循环下一帧即用新图，不闪断
        if (!canvas) {
            startSakuraAnimation(); // 首次进入：图片就绪后再启动动画
        }
    };
    next.onerror = function () {
        petalLoadingPath = null;
        console.error("Petal image could not be loaded. Path: " + imagePath);
        if (theme === 'dark') {
            // 夜间图加载失败时回退到日间图
            const fallback = new Image();
            fallback.onload = function () {
                img = fallback;
                if (!canvas) startSakuraAnimation();
            };
            fallback.src = "img/flower.png";
        }
    };
    next.src = imagePath;
}

// Observer to watch for theme changes
function observeThemeChanges() {
    let lastTheme = getCurrentTheme();
    console.log('Setting up theme observer, initial theme:', lastTheme);
    
    // Function to check theme changes
    function checkThemeChange() {
        const currentTheme = getCurrentTheme();
        if (currentTheme !== lastTheme) {
            console.log('Theme changed from', lastTheme, 'to', currentTheme);
            lastTheme = currentTheme;
            loadThemeImage();
        }
    }
    
    // 直接监听Material for MkDocs的主题切换radio按钮
    function setupPaletteListeners() {
        const paletteInputs = document.querySelectorAll('input[data-md-color-scheme]');
        console.log('Found palette radio inputs:', paletteInputs.length);
        
        paletteInputs.forEach((input, index) => {
            console.log(`Palette input ${index}:`, {
                scheme: input.getAttribute('data-md-color-scheme'),
                primary: input.getAttribute('data-md-color-primary'),
                accent: input.getAttribute('data-md-color-accent')
            });
            
            input.addEventListener('change', function() {
                if (this.checked) {
                    console.log('Theme switched via radio button:', {
                        scheme: this.getAttribute('data-md-color-scheme'),
                        primary: this.getAttribute('data-md-color-primary'),
                        accent: this.getAttribute('data-md-color-accent')
                    });
                    
                    // 立即更新主题，稍微延迟确保DOM更新完成
                    setTimeout(() => {
                        checkThemeChange();
                    }, 100);
                }
            });
        });
        
        return paletteInputs.length > 0;
    }
    
    // 尝试设置palette监听器
    const paletteFound = setupPaletteListeners();
    
    // MutationObserver for all data-md-color-* attribute changes (作为备用)
    const observer = new MutationObserver(function(mutations) {
        console.log('MutationObserver triggered, mutations:', mutations.length);
        let themeRelatedChange = false;
        mutations.forEach(function(mutation) {
            console.log('Mutation type:', mutation.type, 'attribute:', mutation.attributeName);
            if (mutation.type === 'attributes' && mutation.attributeName && mutation.attributeName.startsWith('data-md-color-')) {
                themeRelatedChange = true;
            }
        });
        
        if (themeRelatedChange) {
            console.log('Theme-related attribute changed, checking theme...');
            setTimeout(checkThemeChange, 50);
        }
    });
    
    // Observe the body element for all data-md-color-* changes
    console.log('Starting to observe body element for theme changes');
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-md-color-scheme', 'data-md-color-primary', 'data-md-color-accent']
    });
    
    // 如果没有找到palette按钮，使用定时检查作为备用
    if (!paletteFound) {
        console.log('No palette inputs found, using periodic check as fallback');
        const periodicCheck = setInterval(function() {
            const currentTheme = getCurrentTheme();
            if (currentTheme !== lastTheme) {
                console.log('Periodic check detected theme change from', lastTheme, 'to', currentTheme);
                lastTheme = currentTheme;
                loadThemeImage();
            }
        }, 500);
        
        // Store interval ID for potential cleanup
        window.themeCheckInterval = periodicCheck;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing theme detection...');
    
    // 检查是否在首页，只在首页启动樱花动画
    const isHomepage = document.body && document.body.classList.contains('homepage');
    console.log('Is homepage on DOM load:', isHomepage);
    
    if (!isHomepage) {
        console.log('Not on homepage, skipping sakura animation initialization');
        return;
    }
    
    // Wait a bit for Material theme to be fully initialized
    setTimeout(function() {
        console.log('Starting theme image loading on homepage...');
        loadThemeImage();
        observeThemeChanges();
    }, 100);
    
    // Also check after a longer delay to catch any late theme initialization
    setTimeout(function() {
        console.log('Secondary theme check on homepage...');
        const currentTheme = getCurrentTheme();
        console.log('Secondary check - current theme:', currentTheme);
        loadThemeImage();
    }, 1000);
});

// 也监听homepage类的添加（以防类是在DOM加载后添加的）
if (typeof MutationObserver !== 'undefined') {
    const bodyClassObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const isHomepage = document.body.classList.contains('homepage');
                console.log('Body class changed, is homepage:', isHomepage);
                if (isHomepage && !img) {
                    console.log('Homepage class added, initializing sakura animation');
                    loadThemeImage();
                    observeThemeChanges();
                }
            }
        });
    });
    
    if (document.body) {
        bodyClassObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
}
