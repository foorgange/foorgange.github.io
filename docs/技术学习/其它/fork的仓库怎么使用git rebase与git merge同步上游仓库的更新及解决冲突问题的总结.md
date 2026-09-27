# fork的仓库怎么使用git rebase与git merge同步上游仓库的更新及解决冲突问题的总结

## 如果是fork的仓库需要同步上游仓库的更新

**rebase 和 merge 都用于把上游代码合并到自己的分支，但方式不同：**

- **merge（合并）** ：把两个分支直接合并，保留双方原来的提交历史，并生成一个新的合并提交（merge commit）。优点是历史真实完整，缺点是可能产生较多分叉。
- **rebase（变基）** ：把自己的提交暂时取下来，然后重新应用到上游最新代码之后，相当于把自己的修改“移动”到最新版本基础上。优点是提交历史更加线性、整洁，缺点是会改变提交历史，不适合修改已经共享的公共分支。

###### 先把fork后拉到本地的代码添加上游仓库

```yaml
git remote add upstream https://github.com/A/project.git
```

（给 Git 保存一个地址，名字叫 upstream，这个地址指向原作者仓库。）

###### 使用fetch命令查看上游发生的更新

```cpp
git fetch upstream
```

###### 查看上游更新：

```
git log master..upstream/master
```

查看有哪些提交：

```
commit def5678
Author: xxx

修复登录问题

commit aaa111
Author: xxx

增加缓存功能
```

###### 切换到自己的 master：

```
git checkout master
```

###### 使用rebase命令合并上游仓库master分支

```lua
git rebase upstream/master
```

###### rebase 时发生冲突

例如：

```
CONFLICT (content): Merge conflict in src/UserService.java
```

说明：

你的修改：

```
public void login(){

    //你的微信登录代码

}
```

上游修改：

```
public void login(){

    //作者微信登录代码

}
```

Git 不知道应该保留谁。

###### 查看冲突文件：

```
git status
```

输出：

```
Unmerged paths:

both modified:
    src/UserService.java
```

---

查看冲突内容

###### 打开文件：

```
public void login(){

<<<<<<< HEAD

    //作者最新代码

=======

    //你的代码

>>>>>>> your_commit

}
```

解释：

```
<<<<<<< HEAD
```

到：

```
=======
```

之间：

表示当前 rebase 基础代码（上游代码）

---

```
=======
```

到：

```
>>>>>>> your_commit
```

之间：

表示你的提交。

---

###### 手动解决冲突

例如：

上游：

```
public void login(){

    checkToken();

}
```

你的：

```
public void login(){

    sendWechatMessage();

}
```

###### 最终决定合并：

```
public void login(){

    checkToken();

    sendWechatMessage();

}
```

然后删除：

```
<<<<<<<
=======
>>>>>>>
```

这些标记。

---

###### 标记冲突已经解决

例如：

```
git add src/UserService.java
```

或者所有文件：

```
git add .
```

---

###### 继续 rebase

执行：

```
git rebase --continue
```

如果还有冲突：

重复：

```
git status

# 修改冲突文件

git add .

git rebase --continue
```

直到完成。

###### 放弃本次 rebase

如果发现合并太复杂，不想继续：

```
git rebase --abort
```

恢复到 rebase 前状态

###### rebase 完成后推送

```
git push origin master
```

或者强制推送：

```
git push origin master --force-with-lease
```

---

##### 总结

```lua
1. 获取上游更新
git fetch upstream

 2. 切换自己的master
git checkout master

 3. 查看上游有哪些更新
git log master..upstream/master

 4. rebase同步
git rebase upstream/master

 5. 如果冲突

git status

 修改冲突文件

git add .

git rebase --continue

 如果放弃

git rebase --abort

 6. 推送自己的fork

git push origin master --force-with-lease
```

###### 如果是merge

```lua
 1. 获取上游更新
git fetch upstream

 2. 切换自己的master
git checkout master

 3. 查看上游更新
git log master..upstream/master

 4. 合并上游master
git merge upstream/master

 5. 如果冲突

git status

 修改冲突文件

git add .

 完成merge提交

git commit (Git 会生成 merge commit。)

 如果放弃merge

git merge --abort

 6. 推送fork

git push origin master
```

---

‍
