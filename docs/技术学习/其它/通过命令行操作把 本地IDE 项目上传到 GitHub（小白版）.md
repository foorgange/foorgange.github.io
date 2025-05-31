# 通过命令行操作把 本地IDE 项目上传到 GitHub（小白版）

你是不是在用 本地IDE 做项目，但不知道怎么把自己的代码上传到 GitHub？今天我们用最简单的命令行方式（不用 SSH、不用复杂配置）教你一步一步把本地项目上传到 GitHub，以后更新了也可以轻松提交。

(如果要使用ssh连接，参考这篇文章：https://blog.csdn.net/snowfoootball/article/details/146884292?spm=1001.2014.3001.5501)

---

## 前提准备

1. **你已经有一个 GitHub 账号**
2. **你已经在 GitHub 上新建了一个空仓库（repo）**
3. **你已经在电脑上装好了 Git**

---

## 第一步：打开 IDE终端

在IDeE打开你的项目，然后打开终端窗口。

---

## 第二步：初始化 Git 仓库

在项目目录下输入以下命令（只用一次）：

```bash
git init
```

这会让你的项目变成一个 Git 仓库，能被 Git 追踪。

---

## 第三步：把所有文件加入 Git

```bash
git add .
```

​`.`​ 表示添加所有文件。

---

## 第四步：提交一次（告诉 Git，我们现在这个版本是干净的）

```bash
git commit -m "第一次提交"
```

你可以把 `"第一次提交"`​ 改成任何你喜欢的描述。

---

## 第五步：连接远程仓库

在 GitHub 上打开你创建的那个仓库，点击绿色按钮「Code」，复制 HTTPS 地址，看起来像这样：

```
https://github.com/你的用户名/仓库名.git
```

然后在终端输入（把下面的地址替换成你自己的）：

```bash
git remote add origin https://github.com/你的用户名/仓库名.git
```

---

## 第六步：上传到 GitHub！

第一次上传要加上 `-u`​，以后就不用了：

```bash
git push -u origin master
```

> 如果提示你输入账号密码，按照 GitHub 的提示，输入用户名和「token」（GitHub 不再支持直接密码登录，点击[这里生成 token](https://github.com/settings/tokens)）

---

## 以后更新项目怎么办？

以后你项目有新修改，只需要记住这三个命令！

```bash
git add .
git commit -m "更新了xxx"
git push
```

就可以把更新同步到 GitHub 上啦！

---

## 常见问题（小白 FAQ）

### Q: 提示 `main`​ 而不是 `master`​ 怎么办？

有些 Git 默认分支是 `main`​，那就把命令改成这样：

```bash
git push -u origin main
```

之后就直接 `git push`​ 就行了。

### Q: 忘了有没有 add/commit 怎么办？

没关系，多执行一次也没事，不会有副作用。

---

##  总结：只要记住这6步！

1. ​`git init`​
2. ​`git add .`​
3. ​`git commit -m "说明"`​
4. ​`git remote add origin 仓库地址`​
5. ​`git push -u origin master`​
6. 以后更新：`git add .`​ → `git commit`​ → `git push`​

---

有了这个流程，你就可以用最简单的方式把代码上传到 GitHub，再也不用每次都压缩发给别人啦！

‍

## 后续提交

‍

```cpp
git add .
git commit -m " "
git push
```
