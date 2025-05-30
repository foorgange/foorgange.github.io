/**
 * 背景图片轮换功能
 * 自动轮换背景图片，支持手动控制
 */

class BackgroundSlider {
  constructor() {
    this.currentIndex = 0;
    this.totalImages = 32; // 背景图片总数
    this.autoSlideInterval = 8000; // 8秒自动切换
    this.isAutoSliding = true;
    this.intervalId = null;
    this.imageRange = this.getImageRange(); // 根据页面获取图片范围
    
    this.init();
  }
  
  // 根据当前页面路径确定使用的图片范围
  getImageRange() {
    const path = window.location.pathname;
    
    if (path.includes('home') || path === '/' || path.includes('index.html')) {
      // 主页使用前10张图片
      return { start: 0, count: 10 };
    } else if (path.includes('技术学习')) {
      // 技术学习页面使用第11-18张图片
      return { start: 10, count: 8 };
    } else if (path.includes('文学作品')) {
      // 文学作品页面使用第19-26张图片
      return { start: 18, count: 8 };
    } else if (path.includes('日周记总结')) {
      // 日周记总结页面使用第27-32张图片
      return { start: 26, count: 6 };
    } else {
      // 默认使用所有图片
      return { start: 0, count: 32 };
    }
  }
  
  init() {
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }
  
  setup() {
    this.heroSection = document.getElementById('hero');
    if (!this.heroSection) return;
    
    // 创建控制元素
    this.createControls();
    this.createIndicators();
    this.createStatusIndicator();
    
    // 预加载图片
    this.preloadImages();
    
    // 设置初始背景
    this.setBackground(0);
    
    // 开始自动轮换
    this.startAutoSlide();
    
    // 绑定事件
    this.bindEvents();
  }
  
  createControls() {
    // 创建左右控制按钮
    const prevButton = document.createElement('div');
    prevButton.className = 'bg-control bg-control-prev background-controls';
    prevButton.innerHTML = '‹';
    prevButton.addEventListener('click', () => this.previousImage());
    
    const nextButton = document.createElement('div');
    nextButton.className = 'bg-control bg-control-next background-controls';
    nextButton.innerHTML = '›';
    nextButton.addEventListener('click', () => this.nextImage());
    
    this.heroSection.appendChild(prevButton);
    this.heroSection.appendChild(nextButton);
  }
  
  createIndicators() {
    // 创建指示器容器
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'background-indicators';
    
    // 创建指示器点（基于当前页面的图片数量）
    for (let i = 0; i < this.imageRange.count; i++) {
      const indicator = document.createElement('div');
      indicator.className = 'bg-indicator';
      indicator.addEventListener('click', () => this.goToImage(i));
      indicatorsContainer.appendChild(indicator);
    }
    
    this.heroSection.appendChild(indicatorsContainer);
    this.indicators = indicatorsContainer.querySelectorAll('.bg-indicator');
  }
  
  createStatusIndicator() {
    // 创建状态指示器
    const statusDiv = document.createElement('div');
    statusDiv.className = 'background-status';
    statusDiv.textContent = '背景加载中...';
    this.heroSection.appendChild(statusDiv);
    this.statusIndicator = statusDiv;
  }
  
  preloadImages() {
    this.loadedImages = 0;
    this.images = [];
    
    // 显示加载状态
    this.showStatus('正在加载背景图片...');
    
    // 获取所有背景图片文件名
    const imageFiles = [
      'bg1.jpg',
      'cat_cute_ball_127642_2560x1080.jpg',
      'child_river_dreams_127495_3840x2400.jpg',
      'girl_backpack_butterflies_1031438_3840x2400.jpg',
      'girl_bag_ribbons_1046646_3840x2400.jpg',
      'girl_blonde_cloak_1044103_3840x2400.jpg',
      'girl_butterflies_hairpins_1056294_3840x2400.jpg',
      'girl_cape_glow_1093140_3840x2400.jpg',
      'girl_cloak_hood_1309359_2560x1080.jpg',
      'girl_cloak_road_1075362_3840x2400.jpg',
      'girl_ears_cloak_1101178_3840x2400.jpg',
      'girl_eyes_paint_1031727_3840x2400.jpg',
      'girl_eyes_sunflowers_1013575_3840x2400.jpg',
      'girl_field_art_1312141_2560x1080.jpg',
      'girl_flowers_garden_1101077_3840x2400.jpg',
      'girl_flowers_hairpins_1056450_3840x2400.jpg',
      'girl_glance_cap_1002584_3840x2400.jpg',
      'girl_glance_hairpin_999986_2560x1080.jpg',
      'girl_hair_hood_1058417_3840x2400.jpg',
      'girl_hair_shorts_1058776_3840x2160.jpg',
      'girl_hair_sky_986021_3840x2400.jpg',
      'girl_magician_hat_1056233_3840x2400.jpg',
      'girl_nature_clouds_1061011_3840x2400.jpg',
      'girl_neko_moon_1086800_3840x2400.jpg',
      'girl_raincoat_trail_1002748_3840x2160.jpg',
      'girl_silhouette_planet_1067694_3840x2400.jpg',
      'girl_smile_fish_1005833_3840x2400.jpg',
      'girl_smile_flower_1035552_3840x2400.jpg',
      'girl_smile_flowers_1038430_3840x2400.jpg',
      'girl_smile_stars_975800_3840x2400.jpg',
      'piano_silhouette_space_156662_3840x2400.jpg',
      'silhouette_sky_planets_1067493_3840x2400.jpg'
    ];
    
    // 只预加载当前页面范围内的图片
    for (let i = 0; i < this.imageRange.count; i++) {
      const imageIndex = this.imageRange.start + i;
      const img = new Image();
      img.onload = () => this.onImageLoaded();
      img.onerror = () => this.onImageError(imageIndex + 1);
      img.src = `assets/images/backgrounds/${imageFiles[imageIndex]}`;
      this.images.push(img);
    }
  }
  
  onImageLoaded() {
    this.loadedImages++;
    const progress = Math.round((this.loadedImages / this.imageRange.count) * 100);
    this.showStatus(`加载中... ${progress}%`);
    
    if (this.loadedImages === this.imageRange.count) {
      this.hideStatus();
      this.startAutoSlide();
      this.updateIndicators();
    }
  }
  
  onImageError(imageIndex) {
    console.warn(`背景图片 bg${imageIndex}.jpg 加载失败，将使用默认渐变背景`);
    this.loadedImages++;
    this.updateLoadingStatus();
  }
  
  updateLoadingStatus() {
    const progress = Math.round((this.loadedImages / this.totalImages) * 100);
    this.showStatus(`加载进度: ${progress}%`);
  }
  
  showStatus(message, hideAfter = 0) {
    if (this.statusIndicator) {
      this.statusIndicator.textContent = message;
      this.statusIndicator.classList.add('show');
      
      if (hideAfter > 0) {
        setTimeout(() => {
          this.statusIndicator.classList.remove('show');
        }, hideAfter);
      }
    }
  }
  
  setBackground(index) {
    // 移除所有背景类
    for (let i = 1; i <= this.totalImages; i++) {
      this.heroSection.classList.remove(`bg-image-${i}`);
    }
    
    // 添加新的背景类
    this.heroSection.classList.add(`bg-image-${index + 1}`);
    
    // 更新指示器
    this.updateIndicators(index);
    
    this.currentIndex = index;
  }
  
  updateIndicators(activeIndex) {
    if (this.indicators) {
      this.indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === activeIndex);
      });
    }
  }
  
  nextImage() {
    this.pauseAutoSlide();
    const nextIndex = (this.currentIndex + 1) % this.imageRange.count;
    this.setBackground(nextIndex);
    this.resumeAutoSlide();
  }
  
  previousImage() {
    this.pauseAutoSlide();
    const prevIndex = (this.currentIndex - 1 + this.imageRange.count) % this.imageRange.count;
    this.setBackground(prevIndex);
    this.resumeAutoSlide();
  }
  
  goToImage(index) {
    if (index >= 0 && index < this.imageRange.count) {
      this.currentIndex = index;
      this.updateBackground();
      this.updateIndicators();
    }
  }
  
  startAutoSlide() {
    if (this.isAutoSliding) {
      this.intervalId = setInterval(() => {
        const nextIndex = (this.currentIndex + 1) % this.totalImages;
        this.setBackground(nextIndex);
      }, this.autoSlideInterval);
    }
  }
  
  pauseAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  
  resumeAutoSlide() {
    // 延迟恢复自动轮换，给用户一些时间
    setTimeout(() => {
      this.startAutoSlide();
    }, 3000);
  }
  
  bindEvents() {
    // 鼠标悬停时暂停自动轮换
    this.heroSection.addEventListener('mouseenter', () => {
      this.pauseAutoSlide();
    });
    
    this.heroSection.addEventListener('mouseleave', () => {
      this.startAutoSlide();
    });
    
    // 键盘控制
    document.addEventListener('keydown', (e) => {
      if (this.heroSection && this.isInViewport(this.heroSection)) {
        switch(e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            this.previousImage();
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.nextImage();
            break;
        }
      }
    });
    
    // 页面可见性变化时的处理
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAutoSlide();
      } else {
        this.startAutoSlide();
      }
    });
  }
  
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // 公共方法：停止轮换
  stop() {
    this.isAutoSliding = false;
    this.pauseAutoSlide();
  }
  
  // 公共方法：开始轮换
  start() {
    this.isAutoSliding = true;
    this.startAutoSlide();
  }
}

// 创建全局实例
let backgroundSlider;

// 初始化背景轮换器
if (typeof window !== 'undefined') {
  backgroundSlider = new BackgroundSlider();
  
  // 将实例暴露到全局，方便调试和外部控制
  window.backgroundSlider = backgroundSlider;
}

// 导出类（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BackgroundSlider;
}