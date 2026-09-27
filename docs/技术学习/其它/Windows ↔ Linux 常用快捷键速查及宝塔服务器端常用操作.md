# Windows ↔ Linux 常用快捷键速查及宝塔服务器端常用操作

## Windows ↔ Linux 常用快捷键速查及服务器端常用操作

## Windows ↔ Linux 常用快捷键速查表

> 面向：SSH、Linux服务器、VS Code终端、宝塔WebShell

---

| 操作 | Windows | Linux终端 |
| --- | --- | --- |
| 复制 | `Ctrl + C` | `Ctrl + Shift + C` |
| 粘贴 | `Ctrl + V` | `Ctrl + Shift + V` |
|  | | |

Linux终端：

```
Ctrl + C 不是复制，而是终止当前运行程序
```

---

| 功能 | Windows CMD/PowerShell | Linux Terminal |
| --- | --- | --- |
| 清屏 | `cls` | `clear` |
| 退出终端 | `exit` | `exit` |
| 中断程序 | Ctrl+C | Ctrl+C |
| 查看历史命令 | ↑ ↓ | ↑ ↓ |
| 搜索历史 | Ctrl+R | Ctrl+R |

---

###### 文件操作

| 功能 | Windows | Linux |
| --- | --- | --- |
| 当前目录 | `cd` | `pwd` |
| 查看文件 | `dir` | `ls` |
| 进入目录 | `cd 文件夹` | `cd 文件夹` |
| 返回上级 | `cd ..` | `cd ..` |
| 回到家目录 | `cd %USERPROFILE%` | `cd ~` |
| 创建文件夹 | `mkdir` | `mkdir` |
| 删除文件 | `del` | `rm` |
| 删除目录 | `rmdir` | `rm -rf` |

---

Windows：

```
记事本
VS Code
```

Linux：

常用：

```bash
vim 文件名
```

---

###### Vim必记快捷键

进入编辑：

```
i
```

退出编辑：

```
Esc
```

保存退出：

```
:wq
```

强制退出：

```
:q!
```

保存：

```
:w
```

---

###### 终端光标移动

| 功能 | 快捷键 |
| --- | --- |
| 行首 | Ctrl + A |
| 行尾 | Ctrl + E |
| 删除光标前 | Backspace |
| 删除光标后 | Ctrl + D |
| 清除当前输入 | Ctrl + U |

---

###### SSH常用

连接：

```bash
ssh 用户@IP
```

例如：

```bash
ssh root@124.221.172.88
```

退出服务器：

```bash
exit
```

上传文件：

Windows：

```powershell
scp 文件 root@IP:/路径
```

Linux：

```bash
scp 文件 user@IP:/路径
```

---

###### VS Code Remote SSH

| 操作 | 快捷键 |
| --- | --- |
| 打开命令面板 | Ctrl + Shift + P |
| 搜索SSH | 输入 Remote-SSH |
| 新建终端 | Ctrl + ` |
| 保存 | Ctrl + S |

---

###### Linux权限

查看：

```bash
ls -l
```

修改权限：

```bash
chmod
```

例如：

```bash
chmod 600 key
```

---

###### 服务器最常用命令

查看运行：

```bash
ps
```

查看端口：

```bash
ss -lntp
```

查看磁盘：

```bash
df -h
```

查看内存：

```bash
free -h
```

实时资源：

```bash
top
```

---

###### Docker常用

查看容器：

```bash
docker ps
```

查看全部：

```bash
docker ps -a
```

进入容器：

```bash
docker exec -it 容器名 bash
```

查看日志：

```bash
docker logs 容器名
```

重启：

```bash
docker restart 容器名
```

停止：

```bash
docker stop 容器名
```

---
