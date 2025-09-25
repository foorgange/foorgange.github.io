# （自用）PowerShell常用命令自查文档

# PowerShell 常用命令速查

---

## 1. 文件与目录操作

|命令（别名）|说明|示例|
| --------------------------| ---------------| ------------------|
|​`Get-Location`​(`pwd`​)|显示当前路径|​`Get-Location`​|
|​`Get-ChildItem`​(`ls`​,`dir`​)|列出文件/目录|​`ls`​；`ls -Force`​(含隐藏)|
|​`Set-Location`​(`cd`​,`chdir`​)|切换目录|​`cd C:\Windows`​|
|​`New-Item -ItemType Directory`​(`mkdir`​)|创建目录|​`mkdir test`​；`mkdir a\b\c`​|
|​`Remove-Item`​(`rm`​,`del`​)|删除文件/目录|​`rm file.txt`​；`rm -Recurse dir`​|
|​`Copy-Item`​(`cp`​)|复制文件/目录|​`cp file1 file2`​；`cp -Recurse dir1 dir2`​|
|​`Move-Item`​(`mv`​)|移动/重命名|​`mv old.txt new.txt`​；`mv file.txt .\subdir\`​|
|​`New-Item`​(`ni`​,`touch`​)|新建空文件|​`ni file.txt`​|
|​`Tree`​（需安装 tree 工具）|目录树结构|​`tree C:\Windows`​|

---

### 示例效果解释

- ​`Get-Location`​ → 显示当前所在目录（相当于 Linux 的 `pwd`​）
- ​`ls`​ → 列出当前目录下的文件和目录
- ​`ls -Force`​ → 包含隐藏文件
- ​`cd C:\Windows`​ → 切换到 `C:\Windows`​ 目录
- ​`mkdir test`​ → 创建 `test`​ 文件夹
- ​`rm file.txt`​ → 删除文件
- ​`rm -Recurse dir`​ → 递归删除文件夹 `dir`​
- ​`cp file1 file2`​ → 复制文件
- ​`mv old.txt new.txt`​ → 重命名文件
- ​`ni file.txt`​ → 创建空文件 `file.txt`​

---

## 2. 文件内容查看

|命令（别名）|说明|示例|
| ------------------| --------------| ------|
|​`Get-Content`​(`cat`​,`type`​)|查看文件内容|​`cat file.txt`​|
|​`Select-String`​(`grep`​)|文本搜索|​`Select-String "abc" file.txt`​|
|​`more`​（外部命令）|分页显示|​`Get-Content file.txt \| more`​|
|​`Measure-Object`​(`wc`​)|统计行/字数|​`Get-Content file.txt \| Measure-Object -Line`​|
|​`Select-Object -First N`​|显示前N行|​`Get-Content file.txt \| Select-Object -First 20`​|
|​`Select-Object -Last N`​|显示末尾N行|​`Get-Content file.txt \| Select-Object -Last 20`​|
|​`Get-Content -Wait`​|实时刷新|​`Get-Content logfile -Wait`​|

---

### 示例效果解释

- ​`cat file.txt`​ → 输出文件全部内容
- ​`Select-String "abc" file.txt`​ → 查找文件中包含 `abc`​ 的行
- ​`Get-Content file.txt \| more`​ → 分页查看文件
- ​`Get-Content file.txt \| Measure-Object -Line`​ → 统计文件行数
- ​`Get-Content file.txt \| Select-Object -First 20`​ → 前20行
- ​`Get-Content file.txt -Wait`​ → 实时监控日志

---

## 3. 查找与定位

|命令|说明|示例|
| ----------| ----------| ----------|
|​`Get-Command`​|查找命令|​`Get-Command *service*`​|
|​`Get-Help`​|查看帮助|​`Get-Help Get-Process`​|
|​`Get-ChildItem -Recurse -Filter`​|查找文件|​`Get-ChildItem -Recurse -Filter *.log`​|
|​`Where-Object`​|条件过滤|​`ls \| Where-Object {$_.Length -gt 1MB}`​|
|​`Select-String`​|搜索文本|​`Select-String "error" .\*.log`​|
|​`Get-Process`​(`ps`​)|查看进程|​`ps`​；`ps \| Where-Object {$_.CPU -gt 100}`​|

---

### 示例效果解释

- ​`Get-Command *service*`​ → 搜索包含 service 的命令
- ​`Get-ChildItem -Recurse -Filter *.log`​ → 递归查找所有 `.log`​ 文件
- ​`ls \| Where-Object {$_.Length -gt 1MB}`​ → 列出大于 1MB 的文件
- ​`Select-String "error" .\*.log`​ → 在当前目录所有 log 文件中搜索 error
- ​`ps`​ → 列出当前运行的进程

---

## 4. 文件权限与属性

|命令|说明|示例|
| ------------------| ----------------| ------|
|​`Get-Acl`​|查看文件权限|​`Get-Acl file.txt`​|
|​`Set-Acl`​|设置文件权限|​`$acl = Get-Acl file.txt; $rule = New-Object System.Security.AccessControl.FileSystemAccessRule("User","FullControl","Allow"); $acl.SetAccessRule($rule); Set-Acl file.txt $acl`​|
|​`icacls`​（外部命令）|修改权限更简便|​`icacls file.txt /grant User:F`​|

---

### 示例效果解释

- ​`Get-Acl file.txt`​ → 显示文件权限
- ​`icacls file.txt /grant User:F`​ → 给 User 用户授予完全控制权限

---

## 5. 压缩与解压

|命令|说明|示例|
| ------| ----------| ------|
|​`Compress-Archive`​|压缩为`.zip`​|​`Compress-Archive -Path .\dir -DestinationPath .\a.zip`​|
|​`Expand-Archive`​|解压`.zip`​|​`Expand-Archive -Path .\a.zip -DestinationPath .\dir`​|

---

### 示例效果解释

- ​`Compress-Archive`​ → 压缩文件/目录成 zip
- ​`Expand-Archive`​ → 解压 zip

---

## 6. 用户与权限管理（Windows）

|命令|说明|示例|
| ------| --------------| ------|
|​`whoami`​|当前用户名|​`whoami`​|
|​`Get-LocalUser`​|查看本地用户|​`Get-LocalUser`​|
|​`New-LocalUser`​|添加用户|​`New-LocalUser -Name user -Password (Read-Host -AsSecureString)`​|
|​`Remove-LocalUser`​|删除用户|​`Remove-LocalUser user`​|
|​`Add-LocalGroupMember`​|添加用户到组|​`Add-LocalGroupMember -Group Administrators -Member user`​|
|​`Get-Process`​|查看进程|​`Get-Process`​|
|​`Stop-Process`​|杀进程|​`Stop-Process -Name notepad`​|
|​`Start-Process`​|启动程序|​`Start-Process notepad`​|

---

### 示例效果解释

- ​`whoami`​ → 显示当前用户
- ​`Get-LocalUser`​ → 列出本地用户
- ​`New-LocalUser`​ → 新建本地用户
- ​`Add-LocalGroupMember`​ → 将用户加入 Administrators 组
- ​`Get-Process`​ → 列出所有进程
- ​`Stop-Process -Name notepad`​ → 结束记事本进程

---

## 7. 磁盘与系统信息

|命令|说明|示例|
| ---------| -----------------| ------|
|​`Get-PSDrive`​|查看磁盘/驱动器|​`Get-PSDrive`​|
|​`Get-Volume`​|查看卷信息|​`Get-Volume`​|
|​`Get-ItemProperty`​|查看文件属性|​`Get-ItemProperty .\file.txt`​|
|​`Get-Service`​|查看服务|​`Get-Service`​|
|​`Start-Service`​/`Stop-Service`​|启动/停止服务|​`Stop-Service Spooler`​|

---

### 示例效果解释

- ​`Get-PSDrive`​ → 列出当前可用驱动器和磁盘空间
- ​`Get-Volume`​ → 列出卷的详细信息
- ​`Get-Service`​ → 查看系统服务状态
- ​`Stop-Service Spooler`​ → 停止打印机服务

---

## 8. 帮助与学习

|命令|说明|示例|
| ------| --------------| ------|
|​`Get-Help`​|查看命令帮助|​`Get-Help Get-Process -Full`​|
|​`Update-Help`​|更新帮助|​`Update-Help`​|

---

### 示例效果解释

- ​`Get-Help Get-Process -Full`​ → 显示 `Get-Process`​ 的完整帮助
- ​`Update-Help`​ → 下载并更新帮助文件
