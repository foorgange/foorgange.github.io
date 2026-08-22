# foorgange.github.io

基于 **MkDocs** 构建的个人博客网站，部署于 GitHub Pages（<https://foorgange.github.io>）。

## 站点内容

站点内容按以下目录组织：

- `docs/技术学习/`：人工智能、前后端、算法等方向的学习笔记
- `docs/文学作品/`：小说、散文闲谈、诗词古文等创作
- `docs/日周记总结/`：学习周报与阶段性总结

## 技术栈

- **静态站点生成**：MkDocs
- **主题**：Material for MkDocs
- **插件**：callouts、glightbox、git-revision-date-localized、minify、statistics 等（见 `requirements.txt`）

## 本地开发

```bash
# 安装依赖
pip install -r requirements.txt

# 本地预览（默认地址：http://127.0.0.1:8000）
mkdocs serve

# 构建静态站点（输出至 site/ 目录）
mkdocs build

# 构建并部署到 GitHub Pages
mkdocs gh-deploy
```

## 目录结构

```text
foorgange.github.io/
├── docs/               # 站点内容（Markdown 源文件）
├── overrides/          # 主题自定义覆盖文件
├── site/               # 构建产物（由 mkdocs build 生成）
├── mkdocs.yml          # MkDocs 站点配置
└── requirements.txt    # Python 依赖
```
