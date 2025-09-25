# 只会git push？——git团队协作进阶

### 给有git基础的人看的进阶协作指南

经历了一段时间的学习，你已经会用 `git push`​ 了，很好。但是在团队里，不是像你在个人项目里无脑执行

```python
git add .
git commit -m "更新内容"
git push
```

来更新仓库就可以的，只知道 无脑`push`​ 会让你成为团队里的麻烦。代码仓库的历史记录不是你的私人日记，而是一份工程日志。

这篇文章的目的就教你几个关键操作，让你更好地进行团队协作。

‍

<u>当然在此之前，我们给基础更差的同学讲一下分支相关的知识（掌握可跳过）</u>

假设你现在远程仓库有一个`origin/main`​，你作为协作者加入这个仓库，你把它直接clone到本地：

```bash
git clone https://github.com/xxx/项目.git
```

Git 会帮你做几件事：

1. 把远程仓库完整下载到本地（包括历史）。
2. 自动把这个远程起个默认名字 `origin`​（就是远程仓库的别名）。
3. 把远程仓库的默认分支（一般是 `main`​ 或 `master`​）检出到你本地的同名分支。

所以，刚 clone 下来的时候：

- 远程叫 `origin/main`​（远程 main 分支的快照）。
- 本地也有一个 `main`​ 分支，指向同一个提交。

你在本地看到的 `main`​ 分支其实就是**本地分支**，但它和远程分支有跟踪关系（tracking），方便你 `git pull`​ / `git push`​。

这也是个人开发者（无协作经验）常常做的。

但对于一个大型项目，我们不是直接操作主分支（main），而是新创建一个分支来进行自己任务的开发，开完完毕后合并到主分支，当然，如果开发期间主分支有更新，我们也可以将主分支的更新同步到我们自己的分支。我们自己的这个分支，我们一般叫`feature`​ 分支。

**在本地**从 `main`​ 分支“拉”出一个新分支来做开发：

```bash
cd 项目
# 确保自己在最新 main
git checkout main
git pull origin main

# 从 main 创建一个新分支 feature/login
git checkout -b feature/login
```

解释：

- ​`git checkout -b`​ 就是“基于当前分支创建并切换到一个新分支”。
- 新分支 `feature/login`​ 的内容**一开始和 main 完全一样**（所有文件、目录都一样）。
- 你在这个分支上改动文件、提交，就不会影响本地的 `main`​。

你可以用 `git branch`​ 看当前本地分支列表：

```
* feature/login
  main
```

星号是当前所在分支。（使用 <u>**git checkout 分支名字**</u>  可以切换当前分支）

当你本地开发一段时间后，可以把分支推送到远程：

```bash
git push -u origin feature/login
```

- 这会在远程仓库上新建一个同名的 `feature/login`​ 分支，并把你的提交推过去。
- ​`-u`​ 表示建立跟踪关系，后面你可以直接 `git push`​ / `git pull`​ 不用每次写名字。

远程仓库上就有了：

- ​`main`​（公共主分支）
- ​`feature/login`​（你的功能分支）

---

#### 1. Rebase & Merge：保持 `git log`​ 简洁

假设你在本地有一个功能分支 `feature`​，远程仓库有 `origin/main`​。  
在你开发功能的过程中，团队其他成员可能向 `main`​ 提交了新的代码，你需要把这些更新同步到你的 `feature`​ 分支。

常见做法是直接合并：

```bash
# 在功能分支上
git merge main
```

这种方式会在提交历史中生成一个额外的 *Merge commit*。当多人频繁这样操作时，`git log`​ 会出现大量无实际意义的合并提交，历史会显得杂乱。

如果这个分支只是你本地开发、还没有推送给别人，建议使用 `rebase`​ 来保持提交历史整洁：

```bash
# 在功能分支上
git pull --rebase origin main
```

​`rebase`​ 会把你在 `feature`​ 分支上的提交，按顺序“重放”到最新的 `main`​ 之上，让提交历史看起来像是从当前 `main`​ 拉出来后直接开发的一条直线，便于审查和追溯。

**注意：**   
不要对已经推送到远程、并且其他人也在基于它开发的公共分支执行 `rebase`​。  
​`rebase`​ 会重写提交历史，强制推送可能会干扰他人的工作。  
在这种情况下，更安全的做法是使用 `merge`​。

##### 总结区别

|命令|提交历史|提交哈希|merge commit|适用场景|
| ------| -----------| ----------| --------------| --------------------------------------|
|​`git pull --rebase origin main`​|线性整洁|变|无|自己本地分支还没推送，想要历史干净|
|​`git merge main`​|分叉+合并|不变|有|公共分支、避免改写历史、多人协作安全|

---

#### 2. 交互式 Rebase：提交前先整理一下

你的本地提交记录可能一团糟：“修复拼写错误”、“代码格式化”、“草稿1”、“我也不知道改了啥”。在把你的代码合并到主线之前，没人关心这些。把这些垃圾提交到主分支是对所有人的不尊重。

为了让提交历史更清晰、易读，可以在合并前把这些小提交合并成一个完整、描述清楚的提交。这就是 **交互式 rebase** (`git rebase -i`​) 的用途。

---

#### 如何操作

假设你最近有 3 个提交需要整理，可以这样做：

```bash
git rebase -i HEAD~3
```

这会打开一个编辑器，显示最近 3 个提交：

```
pick a2b4e98 功能A的初始实现
pick 9f3b1d2 修复一个小bug
pick 5c8e3a1 添加文档和注释
```

​`pick`​ 表示“保留这个提交”。  
如果你想把后面的几个小提交合并到第一个里，可以把它们改成 `squash`​（简写 `s`​）：

```
pick a2b4e98 功能A的初始实现
s 9f3b1d2 修复一个小bug
s 5c8e3a1 添加文档和注释
```

保存退出后，Git 会让你重新写一个提交信息，把这三次的修改合并成一个。这样，你的功能分支就只有一个干净、完整的提交。这才是你应该呈现给团队看的。

#### 3. Cherry-pick：拉某一个提交

有时候，你只需要另一个分支上的某一个提交，而不是整个分支的修改。比如，一个在 `feature-B`​ 分支上发现并修复的 bug，也需要在你的 `feature-A`​ 分支上修复。

这时别想着去 `merge`​ 整个 `feature-B`​ 分支。用 `cherry-pick`​ 就够了。

首先，找到那个修复 bug 的**提交**哈希值（commit hash）：

```bash
# 在 feature-B 分支
git log
```

假设哈希值是 `8a3b4c5d`​。然后，切回你的分支，把它“摘”过来：

```bash
# 切换到你的分支
git checkout feature-A

# 摘取那个提交
git cherry-pick 8a3b4c5d
```

Git 会把那个提交的修改应用到你当前的分支上，生成一个新的提交。 这很精确，不会引入任何不相关的代码。

#### 4. 提交信息精确

一个好的提交信息比代码注释更重要。它说明了“为什么”要这么改，而代码本身只说明了“怎么”改。

遵循这个简单的规则：

- **标题行：**  使用祈使句，清晰地概括改动，比如 "Add user authentication endpoint"。 不要写 "I added..." 或 "Fixed a bug"。
- **空一行。**
- **正文（可选）：**  详细解释为什么需要这次改动，解决了什么问题。如果修复了一个 issue，在这里引用它。

好的例子：

```
Refactor database query for performance

The previous implementation used a nested loop, causing N+1 query
problems when fetching user posts. This commit replaces it with a
single JOIN statement, reducing database load and speeding up the
API response time by an average of 80%.

Fixes #123
```

糟糕的例子：

```
update code
```

如果你写的是这种提交，别指望别人能严肃对待你的代码。

---

总而言之，Git 是一个强大的工具，但它的强大之处在于规范和纪律。在团队里，你的首要任务是保证清晰的沟通和整洁的协作历史。停止制造混乱，从现在开始，像个专业人士一样使用 Git喵。
