# github ssh方式推送代码

### **1. 检查是否已有 SSH 密钥**

首先，你需要确认本地是否已经生成了 SSH 密钥。如果没有，可以按照以下步骤生成。

#### **生成 SSH 密钥（如果没有）**

1. 打开终端（命令行），然后输入以下命令来生成新的 SSH 密钥对：

    ```bash
    ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
    ```

    这里的 `your_email@example.com`​ 是你 GitHub 注册账户的邮箱。
2. 然后会提示你选择保存密钥的路径，一般直接按回车键，默认路径是 `~/.ssh/id_rsa`​。
3. 如果提示设置密码（passphrase），你可以选择为空，或者设置一个密码。
4. 完成后，你的 SSH 密钥会生成在 `~/.ssh/`​ 目录下：

    * 公钥：`id_rsa.pub`​
    * 私钥：`id_rsa`​

---

### **2. 将 SSH 公钥添加到 GitHub**

1. 打开公钥文件，复制其内容：

    ```bash
    cat ~/.ssh/id_rsa.pub
    ```

    这会显示你的公钥，复制显示的内容。
2. 登录你的 GitHub 账户，进入 **Settings**（设置）。
3. 在左侧导航栏找到 **SSH and GPG keys**，然后点击 **New SSH key**。
4. 在 **Title** 中填写一个名称（例如 `My Laptop SSH Key`​），然后在 **Key** 中粘贴你刚才复制的 SSH 公钥。
5. 点击 **Add SSH key** 完成添加。

---

### **3. 测试 SSH 连接**

为了确保你的 SSH 配置正确，可以测试是否能够成功连接 GitHub。

在终端中输入：

```bash
ssh -T git@github.com
```

如果一切正常，你应该会看到类似如下的消息：

```
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

这表示你的 SSH 密钥已正确配置并能够成功连接到 GitHub。

---

### **4. 更改 Git 仓库远程地址为 SSH**

接下来，需要将 Git 仓库的远程 URL 更改为 SSH 方式，而不是 HTTPS。

1. 查看当前的远程仓库地址：

    ```bash
    git remote -v
    ```

    你应该会看到类似下面的输出（假设当前使用的是 HTTPS）：

    ```
    origin  https://github.com/your-username/your-repo.git (fetch)
    origin  https://github.com/your-username/your-repo.git (push)
    ```
2. 使用以下命令将远程 URL 更改为 SSH：

    ```bash
    git remote set-url origin git@github.com:your-username/your-repo.git
    ```

    你可以再次运行 `git remote -v`​ 来确认修改成功：

    ```
    origin  git@github.com:your-username/your-repo.git (fetch)
    origin  git@github.com:your-username/your-repo.git (push)
    ```

---

### **5. 推送代码到 GitHub**

现在你可以像平常一样将代码推送到 GitHub 了，使用以下命令：

```bash
git push -u origin main
```

如果是第一次推送，你也可以使用：

```bash
git push -u origin main
```

之后，Git 会自动使用 SSH 连接推送代码。

---

### **总结**

1. **生成 SSH 密钥**（如果没有）。
2. **将 SSH 公钥添加到 GitHub**。
3. **测试 SSH 连接**。
4. **更改远程仓库 URL 为 SSH**。
5. **推送代码到 GitHub**。
