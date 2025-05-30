# 🌟 Snowfoootball's Personal Blog

> 探索技术的边界，记录生活的美好

这是一个基于 Material for MkDocs 构建的个人博客网站，采用现代化的设计风格，支持响应式布局和暗黑模式切换。

## ✨ 特色功能

- 🎨 **现代化设计**: 采用 Material Design 风格，支持日夜模式切换
- 🖼️ **动态背景**: 32张精美背景图片自动轮换，不同页面使用不同图片集
- 📱 **响应式布局**: 完美适配桌面端、平板和移动设备
- 🔍 **全文搜索**: 支持中文搜索，快速定位内容
- 📊 **阅读统计**: 显示文章字数和预计阅读时间
- 🎯 **代码高亮**: 支持多种编程语言语法高亮
- 📝 **数学公式**: 支持 LaTeX 数学公式渲染
- 🏷️ **标签系统**: 文章分类和标签管理
- 📅 **Git 集成**: 自动显示文章创建和修改时间

## 📁 项目结构

```
my-snowfoootball/
├── docs/                    # 文档源文件
│   ├── assets/             # 静态资源
│   │   ├── images/         # 图片资源
│   │   ├── stylesheets/    # 自定义样式
│   │   └── javascripts/    # 自定义脚本
│   ├── 技术学习/           # 技术文章
│   ├── 文学作品/           # 文学创作
│   ├── 日周记总结/         # 个人总结
│   └── home.md            # 首页内容
├── overrides/              # 主题自定义
├── site/                   # 构建输出目录
├── mkdocs.yml             # MkDocs 配置文件
└── README.md              # 项目说明
```

## 🚀 快速开始

### 环境要求

- Python 3.7+
- pip

### 安装依赖

```bash
pip install mkdocs-material
pip install mkdocs-callouts
pip install mkdocs-glightbox
pip install mkdocs-git-revision-date-localized-plugin
pip install mkdocs-minify-plugin
pip install mkdocs-statistics-plugin
```

### 本地开发

```bash
# 克隆项目
git clone https://github.com/snowfoootball/my-snowfoootball.git
cd my-snowfoootball

# 启动开发服务器
mkdocs serve

# 访问 http://127.0.0.1:8000
```

### 构建部署

```bash
# 构建静态文件
mkdocs build

# 部署到 GitHub Pages
mkdocs gh-deploy
```

## 📝 内容管理

### 添加新文章

1. 在对应分类目录下创建 Markdown 文件
2. 在文件开头添加元数据（可选）：

```yaml
---
title: 文章标题
date: 2025-01-01
tags:
  - 标签1
  - 标签2
---
```

3. 更新 `mkdocs.yml` 中的导航配置

### 自定义样式

- 修改 `docs/assets/stylesheets/extra.css` 添加自定义样式
- 编辑 `docs/assets/stylesheets/background.css` 调整背景效果
- 更新 `docs/assets/javascripts/background-slider.js` 修改背景轮换逻辑

## 🎨 主题配置

项目使用 Material for MkDocs 主题，主要配置包括：

- **调色板**: 支持日夜模式，主色调为白色/黑色，强调色为靛蓝
- **字体**: 中文使用 Noto Sans SC，代码使用 Source Code Pro
- **图标**: 使用 Material Design Icons 和 FontAwesome
- **功能**: 启用代码复制、搜索建议、导航跟踪等

## 🔧 技术栈

- **静态站点生成器**: MkDocs
- **主题**: Material for MkDocs
- **部署平台**: GitHub Pages
- **CI/CD**: GitHub Actions
- **样式**: CSS3 + CSS Variables
- **脚本**: Vanilla JavaScript
- **图标**: Material Design Icons + FontAwesome

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

- GitHub: [@snowfoootball](https://github.com/snowfoootball)
- Email: your-email@example.com

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！