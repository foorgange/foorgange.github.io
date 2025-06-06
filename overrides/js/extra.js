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
    const htmlElement = document.documentElement;
    const scheme = htmlElement.getAttribute('data-md-color-scheme');
    return scheme === 'slate' ? 'dark' : 'light';
}

// Function to load appropriate image based on theme
function loadThemeImage() {
    const theme = getCurrentTheme();
    const imagePath = theme === 'dark' ? "img/ec26d2123cf5215d2bca8eacff76e5e9.png" : "img/flower.png";
    
    img = new Image();
    img.src = imagePath;
    
    img.onload = function () {
        console.log("Petal image loaded for " + theme + " mode: " + imagePath);
        if (!canvas) {
            startSakuraAnimation();
        }
    }
    img.onerror = function() {
        console.error("Petal image could not be loaded. Path: " + img.src);
    }
}

// Observer to watch for theme changes
function observeThemeChanges() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-md-color-scheme') {
                loadThemeImage();
            }
        });
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-md-color-scheme']
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadThemeImage();
    observeThemeChanges();
});
