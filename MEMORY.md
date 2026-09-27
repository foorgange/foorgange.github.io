# 项目长期记忆（MEMORY）

> 精简版：只记关键事实与踩过的坑。规则见 `.trae/rules/project_rules.md`。

## 基本事实

| 项 | 值 |
| --- | --- |
| 项目 | 李年（LiNian/snowfoootball/foorgange）个人网站，MkDocs + Material，纯静态 |
| 项目路径 | `D:\zhuo mian\web-my-snowfoobll\my-snowfoootball` |
| 我的工作目录 | `D:\zhuo mian\web-my-snowfoobll\`（构建产物/截图/脚本/备份都放这里，**不要往项目里或别处乱建文件**） |
| 仓库 / 线上 | `git@github.com:foorgange/foorgange.github.io.git` / https://foorgange.github.io/ |
| 部署链 | push `main` → CI（`mkdocs gh-deploy`）+ **Gitee 镜像**（任何 push 都会同步过去，注意隐私） |
| 本地环境 | Python 3.12（anaconda）、Edge；needs `pip install -r requirements.txt` 才能本地构建 |

## 铁律

1. `mkdocs.yml` 是核心配置，增删页面/资源必须同步改 yml 与 nav
2. **首要原则：足够美观**；禁止彩色 emoji / 彩色 svg，只用黑/白/灰
3. **bilibili 社交链接是有意为之的假链接**（`space.bilibi.com/127112`），禁止"修正"
4. 移动端适配不要留白硬凑（作者否决过"页脚加 78px 留白"的做法）

## 踩过的坑（重要）

- 本地构建必须 `python -X utf8 -m mkdocs build`，否则 anaconda 的 GBK locale 会让中文路径写入失败
- Windows 建不了尾部空格文件名：`念奴娇 · 白日梦 .md`、`浣溪沙-兴逸壮思觅蜃楼 .md` 需「临时改名→构建→还原」（`build_after.py` 已实现）
- Edge 无头截图必须给**绝对路径**；且系统缩放 125% + Chromium 最小窗口宽度（约 492px）导致拿不到窄视口
  → 真机宽度用 **iframe 视口法**（iframe 内 CSS 视口 = iframe 宽度，脚本 `tour_mobile.py`）
- pwsh 工具可能失效（解析到 WindowsApps 别名 stub 无权访问）；应急：`dev_stage_add` 挂一个跑 `node:child_process` 的 staging 工具（args 是 JSON 字符串需自行 parse，命令里别嵌双引号）

## 已实现（要点）

- **性能**：花瓣图 4.9MB/9.8MB→30KB/25KB、黑胶盘 863KB→12KB、背景图 -35%；音频 `preload="none"`（原每页预载 6.79MB）；MathJax 按需加载（原全站 + 已废弃 polyfill.io）；`perf.js` 图片懒加载 + 宽表格滚动容器
- **移动端**：Hero 字号自适应；首页 `100dvh` 可滚动；代码行号隐藏；**播放器在右下角**（页脚文字/图标都在左侧）；滚动时淡出、停止 0.7s 淡回；索引页标题居中（`body.section-index`）、引言块收紧
- **播放器**：进度存 `localStorage.audio_position`，换页续播（原先每页从 0 开始）
- **光标动效**：ba-click-fx v1.3.3 自托管（MIT），仅桌面精确指针启用、空闲加载；**跟随日夜换色**——日间 `#6BCB40`+`source-over`（亮底必须用正常混合，加色会被冲淡到看不见），夜间默认蓝 `#4ca7ff`+`screen`；调参在 `overrides/js/cursor-fx.js` 顶部
- **首页标题字体**：霞鹜文楷 LXGW WenKai（SIL OFL）自托管子集 `overrides/fonts/lxgw-wenkai-hero.woff2`（8.7KB，
  仅含标题字形，fontTools 子集化，脚本见工作目录 `make_subset.py` / `build_font.py`）；
  家族名用独占的 `LXGW WenKai Hero`；字重 400 + 淡白光晕（细笔画在花叶照片上才清晰）
  - ⚠️ 坑：`extra_css` 里原有的两个 gcore.jsdelivr.net 霞鹜文楷样式表**同名覆盖**自托管字体（且从未被使用、
    国内不可达），导致标题静默回退系统字体；已删除。**遇到"字体明明配了却没生效"先查同名字体冲突**
  - 字体源站（jsdelivr / GitHub）在本机常不可达时，用 `registry.npmmirror.com` 拉 webfont 包（tgz）
- **主题联动**：背景图（CSS）、花瓣图（`extra.js` 的 `loadThemeImage`）、光标色/合成方式，三者均可无刷新切换

## 待办

- `overrides/audio` 30 个未被引用的音频（约 278MB）+ `docs` 104 张未被引用的图片（约 76MB）仍随站点发布，删掉可省约 350MB（git 历史可恢复）——等作者决定
- `mkdocs.yml` 里 git-revision-date 的 exclude 列表写的是别的项目路径，索引页因此仍显示"最后更新"日期
