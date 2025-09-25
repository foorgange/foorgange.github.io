# （自用）cmd常用命令自查文档

# Windows CMD 常用命令自查

---

## 1. 文件与目录操作

|命令|说明|示例|
| ----------| --------------------| ----------------------|
|​`cd`​|显示或切换目录|​`cd`​；`cd C:\Windows`​|
|​`dir`​|列出目录内容|​`dir`​；`dir /a`​(含隐藏文件)|
|​`md`​或`mkdir`​|创建目录|​`md test`​；`md a\b\c`​(递归)|
|​`rd`​或`rmdir`​|删除目录（空目录）|​`rd test`​|
|​`del`​|删除文件|​`del file.txt`​；`del /s /q *.log`​|
|​`copy`​|复制文件|​`copy file1.txt file2.txt`​|
|​`xcopy`​|复制文件/目录|​`xcopy /E dir1 dir2`​|
|​`move`​|移动/重命名|​`move old.txt new.txt`​|
|​`type`​|显示文件内容|​`type file.txt`​|

---

## 2. 文件内容查看与编辑

|命令|说明|示例|
| ------| ---------------------------| ------|
|​`type`​|显示文本文件内容|​`type file.txt`​|
|​`more`​|分页显示文本|​`more file.txt`​|
|​`find`​|搜索文本|​`find "abc" file.txt`​|
|​`findstr`​|高级文本搜索（类似 grep）|​`findstr /S /I "abc" *.txt`​|

---

## 3. 系统信息与进程

|命令|说明|示例|
| ------| --------------------| ------|
|​`ver`​|显示 Windows 版本|​`ver`​|
|​`systeminfo`​|查看详细系统信息|​`systeminfo`​|
|​`tasklist`​|列出正在运行的进程|​`tasklist`​|
|​`taskkill`​|结束进程|​`taskkill /IM notepad.exe /F`​|
|​`hostname`​|显示计算机名|​`hostname`​|
|​`echo %USERNAME%`​|显示当前用户名|​`echo %USERNAME%`​|

---

## 4. 网络与连接

|命令|说明|示例|
| ------| ------------------| ------|
|​`ipconfig`​|查看网络配置|​`ipconfig /all`​|
|​`ping`​|测试网络连通性|​`ping www.baidu.com`​|
|​`tracert`​|跟踪路由|​`tracert www.baidu.com`​|
|​`netstat`​|查看网络连接端口|​`netstat -ano`​|
|​`nslookup`​|查询DNS|​`nslookup www.baidu.com`​|

---

## 5. 用户与权限

|命令|说明|示例|
| ------| --------------------| ----------|
|​`net user`​|查看/管理用户|​`net user`​；`net user 新用户 密码 /add`​|
|​`net localgroup`​|查看本地组|​`net localgroup`​|
|​`runas`​|以其他用户执行程序|​`runas /user:Administrator cmd`​|

---

## 6. 磁盘与文件系统

|命令|说明|示例|
| ------| ----------------| ------|
|​`chkdsk`​|检查磁盘|​`chkdsk C:`​|
|​`diskpart`​|磁盘分区管理|​`diskpart`​|
|​`format`​|格式化磁盘|​`format E:`​|
|​`label`​|查看或修改卷标|​`label E:`​|

---

## 7. 压缩与包管理（无内置 gzip/zip）

CMD 没有像 Linux 那样自带 `tar`​、`gzip`​、`zip`​，  
Windows 10/11 自带 `tar`​、`curl`​、`ssh`​ 等工具（可用 `tar -xvf`​），或者用 PowerShell/第三方工具（7-Zip、WinRAR）代替。

---

## 8. 其他常用命令

|命令|说明|示例|
| ------| -------------------| ----------|
|​`cls`​|清屏|​`cls`​|
|​`echo`​|输出文本|​`echo hello`​|
|​`set`​|查看/设置环境变量|​`set PATH`​；`set name=value`​|
|​`pause`​|暂停脚本执行|​`pause`​|
|​`exit`​|退出 cmd|​`exit`​|
|​`help`​|查看帮助|​`help`​；`help dir`​|

---

# 示例效果解释：

## 1. 文件与目录操作

- ​`cd`​ → 显示或切换当前目录：`cd C:\Windows`​
- ​`dir /a`​ → 列出当前目录所有文件（包括隐藏）
- ​`md test`​ → 新建 `test`​ 文件夹
- ​`rd test`​ → 删除空目录 `test`​
- ​`del file.txt`​ → 删除文件 `file.txt`​
- ​`xcopy /E dir1 dir2`​ → 复制整个 `dir1`​（含子目录）到 `dir2`​

## 2. 文件内容查看与编辑

- ​`type file.txt`​ → 显示文本文件全部内容
- ​`find "abc" file.txt`​ → 查找 `abc`​ 字符串

## 3. 系统信息与进程

- ​`tasklist`​ → 查看当前进程
- ​`taskkill /IM notepad.exe /F`​ → 强制关闭记事本进程

## 4. 网络与连接

- ​`ipconfig /all`​ → 查看网卡 IP、MAC 等详细信息
- ​`ping www.baidu.com`​ → 测试能否访问百度
- ​`netstat -ano`​ → 查看端口占用和 PID

## 5. 用户与权限

- ​`net user`​ → 显示本机所有用户
- ​`net user test 123456 /add`​ → 新建用户 test，密码 123456

## 6. 磁盘与文件系统

- ​`chkdsk C:`​ → 检查C盘文件系统错误
- ​`diskpart`​ → 进入磁盘分区管理交互界面

## 8. 其他常用命令

- ​`cls`​ → 清屏
- ​`echo hello`​ → 在屏幕输出 hello
- ​`set PATH`​ → 查看 PATH 环境变量

---

**提示：**

- CMD 命令通常参数用 `/`​，不是 Linux 的 `-`​。
- CMD 没有 PowerShell 的管道对象，只有文本流，复杂场景可用 PowerShell。
- Win10+ 已内置 PowerShell，更推荐日常管理用 PowerShell。
