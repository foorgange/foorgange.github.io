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

    for (var i = 0; i < 25; i++) { 
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
    
    if (!isHomepage) {
        console.log('Not on homepage, defaulting to light mode');
        return 'light';
    }
    
    // 检查body元素的data-md-color-scheme属性（与CSS选择器body.homepage[data-md-color-scheme]一致）
    const scheme = bodyElement.getAttribute('data-md-color-scheme');
    
    console.log('Homepage theme detection - body scheme:', scheme);
    
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
function loadThemeImage() {
    const theme = getCurrentTheme();
    // 正确的图片路径逻辑：日间模式用flower.png，夜间模式用ec26d2123cf5215d2bca8eacff76e5e9.png
    const imagePath = theme === 'dark' ? "img/ec26d2123cf5215d2bca8eacff76e5e9.png" : "img/flower.png";
    
    console.log('Loading image for theme:', theme, 'Path:', imagePath);
    
    // Clear existing animation if running
    if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log('Cleared existing animation');
    }
    
    // Reset sakura list for new theme
    if (typeof sakuraList !== 'undefined') {
        sakuraList.clear();
        console.log('Cleared sakura list');
    }
    
    img = new Image();
    img.src = imagePath;
    
    img.onload = function () {
        console.log("Petal image loaded successfully for " + theme + " mode: " + imagePath);
        // Always restart animation with new image
        if (canvas) {
            // Re-initialize sakura list with new image
            sakuraList = new SakuraList();
            console.log('Restarted animation with new theme image');
        } else {
            startSakuraAnimation();
        }
    }
    img.onerror = function() {
        console.error("Petal image could not be loaded. Path: " + img.src);
        // Fallback to flower.png if the dark mode image fails
        if (theme === 'dark') {
            console.log('Falling back to flower.png');
            img.src = "img/flower.png";
        }
    }
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
    
    // MutationObserver for all data-md-color-* attribute changes
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
            // Use setTimeout to ensure all attributes are updated
            setTimeout(checkThemeChange, 50);
        }
    });
    
    // Observe the body element for all data-md-color-* changes
    console.log('Starting to observe body element for theme changes');
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-md-color-scheme', 'data-md-color-primary', 'data-md-color-accent']
    });
    
    // Also observe html element as backup
    if (document.documentElement) {
        console.log('Also observing html element for theme changes');
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-md-color-scheme', 'data-md-color-primary', 'data-md-color-accent']
        });
    }
    
    // Periodic check as fallback (every 500ms)
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
