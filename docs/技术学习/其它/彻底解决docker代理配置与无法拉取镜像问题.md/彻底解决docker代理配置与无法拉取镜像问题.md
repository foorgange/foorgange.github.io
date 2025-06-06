# 彻底解决docker代理配置与无法拉取镜像问题

## 为什么会有这篇文章?

博主在去年为部署dify研究了docker,最后也是成功部署,但是因为众所周知的原因,~~卡ziji脖子~~ ,所以期间遇到各种网络问题的报错,好在最后解决了.  
但时隔一年,博主最近因为学习原因又一次使用docker,原本解决的问题却又没来由的出现,且和之前有很多不同(有时就是忽然出现奇奇怪怪的报错),所以本文就各种报错,来进行解决.

## 前提

本文在windows系统下使用wsl与dockerdesktop可视化管理工具,daili工具采用clash.  
如果是linux系统和vim,推荐[这篇文章](https://blog.csdn.net/2301_79518550/article/details/145531552?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522c77d6fb3daa272411bad5f9ad2f9f6f7%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=c77d6fb3daa272411bad5f9ad2f9f6f7&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-145531552-null-null.142%5Ev102%5Epc_search_result_base3&utm_term=docker%E6%97%A0%E6%B3%95%E6%8B%89%E5%8F%96&spm=1018.2226.3001.4187).......

## 开始

### 方案一:不使用daili,而是采用稳定且快速的镜像源，并通过配置加速器(推荐)

我不用代理,不就避免daili相关问题报错了吗,这也是我所推荐的

#### 1. 关闭clash和设置里的daili配置

#### 2.打开设置,如图界面

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/74829fb0492a4bd8990fa3b027481714.png#pic_center)

#### 3. 将以下代码替换框框中的代码

```bash
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "registry-mirrors": [
    "https://docker.1ms.run",
    "https://docker.1panel.live/"
  ]
}
```

结束!

### 方案二:开始你的报错旅途吧!

如果你非要使用daili,那么就开始接下来的阅读吧,相信除了解决问题本身,你也能收获很多计网知识.

## 情况:clash配置出错

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/02a1530f253c4df1b301a79c0d6ee8c3.png#pic_center)  
在clash的设置里找到你的当前配置

    这里解释部分配置

```yaml
# 运行模式
mode: rule             # 运行模式：rule 表示按规则分流，也可以为 global（全局daili）或 direct（直连）

# 端口配置
redir-port: 7892       # 透明daili端口，用于转发 TCP 流量，如在 Linux 上配合 iptables 使用
mixed-port: 7897       # 混合端口，支持 HTTP 与 SOCKS5 协议，可以统一作为客户端入口
socks-port: 7898       # SOCKS5 daili端口
port: 7899             # HTTP daili端口

# 网络与访问设置
allow-lan: true        # 是否允许局域网访问，true 表示监听 0.0.0.0，允许局域网设备连接 Clash
log-level: info        # 日志等级，支持 silent、error、warning、info、debug
ipv6: false            # 是否启用 IPv6，建议无 IPv6 网络环境下设置为 false

# 控制接口
external-controller: 127.0.0.1:9097   # 控制面板 API 的监听地址与端口
secret: ''                            # 控制接口访问密码，留空则不设置密码（不安全）

# TUN 模式（用于系统daili理，需内核或驱动支持）
tun:
  stack: gvisor            # TUN 网络栈类型，支持 gvisor（推荐）与 system
  device: Meta             # 虚拟网卡设备名称，默认为 Meta
  auto-route: true         # 自动添加默认路由（通常用于全局daili）
  strict-route: false      # 是否启用严格路由，false 可提升兼容性
  auto-detect-interface: true  # 自动检测系统出口网卡

# 可选：DNS 劫持设置（用于将 DNS 请求导向 Clash 本地处理）
dns-hijack:
  - 'any:53'               # 劫持所有接口上的 53 端口 DNS 请求
```

这里尤其注意mixed-port: 7897  混合端口和

port: 7899    HTTP 代理端口

     如果你选择走daili遇到报错,那么大概率是遇到你配置的混合端口无法连接的报错,"走不了daili",这当然是走daili最常碰到的报错  
 那么解决方案呢?

##### 情况一: 7897端口被占用

```bash
netstat -ano | findstr :7897
```

你可以选择运行该命令查看运行该端口的程序,然后在任务管理器手动终止.

##### 情况二: 其它情况

如果你不是上面这种简单情况,那么你的问题就多了,可以尝试以下解决方案

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/653e1377225d450e827ea57605f226eb.png#pic_center)Docker Desktop → Settings → Resources → Proxies  
你可以在设置里打开此界面,手动配置其走7897daili端口

```bash
http://host.docker.internal:7897
```

然后重新启动docker.

还是不行呢?

我也遇到了配置了还是不行的情况,这时你可以选择把端口换成专用于处理http/https请求的端口port7899,并且第三行的Bypass proxy settings for these hosts & domains”（绕过daili设置的主机和域名）可以进行相关配置，它是用来告诉 Docker Desktop 在访问这些指定的主机或域名时不使用daili，直接连接。  
有些内部地址或者局域网服务不需要走daili，绕过daili能避免连接失败或速度变慢。比如你本地的私有仓库地址、内网 IP 段等。

注意:如果你把 镜像仓库域名（比如 registry-1.docker.com）写进了绕过daili列表，而你访问镜像仓库必须通过daili，结果 Docker 就不会走daili，导致连接失败。

反之，如果内网地址没加入绕过daili，而daili又不通，访问内网服务也会失败。

##### 还是不行呢?

那么问题可能上升到各种配置文件的更改了,我个人也是在这上面花费了两个多小时,但是如果你是小白的话,请转向方案一,我们不细谈.

## 后续可能遇到的其它报错

如果你成功拉取了镜像,但是在你的wsl执行docker命令可以看见它们,但是在powshell里却不行,可能是以下问题

首先确认你在 Docker Desktop 里：

已经勾选了“Enable integration with my default WSL distro”

额外勾选了 “Ubuntu” 这个 WSL 发行版的集成

如果仍然是PowerShell 执行 docker images 看不到镜像，Ubuntu WSL 里执行能看到镜像，很可能说明两个 Docker 客户端连接的是不同的 Docker 守护进程。

### 1. 卸载或停止 WSL 内的独立 Docker

你可以选择完全卸载 WSL 内的 Docker，或者仅仅停止并禁用其服务。

**在 WSL 卸载独立 Docker**  
如果你确定不再需要在 WSL 中单独运行 Docker 服务，可以执行以下命令卸载：

```bash
sudo apt remove docker docker-engine docker.io containerd runc
```

当你执行 sudo service docker stop 后，可能会看到如下提示：  
Stopping 'docker.service', but its triggering units are still active:  
docker.socket  
这说明 docker.service 虽然停止了，但是关联的 docker.socket 仍在运行。docker.socket 是一个 systemd socket unit，它会监听 Docker API 的套接字。当有请求到达该套接字时，systemd 会自动启动 docker.service 来处理请求。因此，即使 docker.service 被手动停止，只要 docker.socket 还在活动，Docker 服务仍有可能被触发重启。

#### 3. 解决步骤：停止并禁用 docker.socket

为了彻底阻止 WSL 内的 Docker 服务自动启动，你需要同时停止并禁用 docker.socket。  
请在 WSL 终端中依次执行以下命令：

```bash
sudo systemctl stop docker.socket
sudo systemctl disable docker.socket
```

之后请重启 WSL 并验证 Docker Desktop 连接........

#### 最后补充一些计算机网络的知识吧!

###### 重要协议简介

IP（Internet Protocol）：负责数据包的寻址和路由。

TCP（Transmission Control Protocol）：面向连接，可靠传输，保证数据顺序和完整性。

UDP（User Datagram Protocol）：无连接，传输快但不保证可靠。

HTTP/HTTPS：网页访问协议，HTTPS 是加密版本。

DNS（Domain Name System）：域名解析，将域名转换成 IP 地址。

DHCP：动态分配 IP 地址

##### IP 地址和子网掩码

IPv4：32位地址，如 192.168.1.1

子网掩码：用于划分网络和主机部分，比如 255.255.255.0

CIDR 表示法：简化写法，如 192.168.1.0/24 表示前24位是网络号

##### 端口和套接字

端口：用来标识应用程序，范围 0-65535，比如 HTTP 默认用 80 端口。

套接字（Socket）：IP 地址 + 端口号，唯一标识一条通信连接。

##### VPN

1. 什么是 VPN？  
    VPN 是“虚拟专用网络”的缩写。它通过在公共网络（比如互联网）上创建一个加密的“隧道”，让用户能够安全、私密地访问远程网络资源，好像直接连接在局域网（专用网络）里一样。
2. VPN 的主要作用  
    保护隐私和安全：加密用户和服务器之间的通信，防止数据被窃听或篡改。

远程访问：员工可以远程安全地访问公司内部资源（如文件服务器、内网应用）。

突破地域限制：访问被限制的内容，比如国外的服务或被封锁的网站。

隐藏真实 IP：用 VPN 服务器的 IP 地址访问网络，保护用户身份。

3. VPN 的工作原理  
    用户设备安装 VPN 客户端，连接到 VPN 服务器。

设备与 VPN 服务器之间建立加密通道（“隧道”）。

用户所有网络流量都经过这个隧道发送，外部无法直接看到真实数据。

VPN 服务器帮用户访问互联网，网站看到的是 VPN 服务器的 IP。

4. 常见 VPN 协议  
    PPTP（点对点隧道协议）：较老，速度快但安全性较低。

L2TP/IPSec：安全性比 PPTP 高，使用 IPsec 协议加密。

OpenVPN：基于 SSL/TLS，开源且安全，配置灵活。

WireGuard：新兴协议，代码简洁，性能和安全都很好。

IKEv2/IPSec：稳定快速，适合移动设备，支持快速切换网络。

5. VPN 的类型  
    远程访问 VPN：个人或员工通过 VPN 远程接入公司网络。

站点到站点 VPN：连接不同地理位置的两个或多个网络，实现互联互通。
