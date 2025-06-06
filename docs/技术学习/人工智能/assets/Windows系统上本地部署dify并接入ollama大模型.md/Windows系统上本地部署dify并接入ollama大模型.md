# Windows系统上本地部署dify并接入ollama大模型

# ollama和dify是什么?

Dify 是一个基于大语言模型的智能应用平台，致力于帮助用户快速构建和部署各种智能对话机器人和应用。它支持结合检索技术的生成模型（即 RAG，Retrieval-Augmented Generation），通过在生成回答的同时检索外部知识库，提升回答的准确性和覆盖范围。Dify 平台使得用户能够方便地训练、管理并调用自定义大模型，广泛适用于客服系统、知识问答和智能助手等场景。相比传统只依赖生成模型的方式，Dify 利用检索增强，能够让模型更好地利用外部信息，提升实用性和智能水平。Ollama 则是一个强调本地化部署的 AI 大模型平台，支持用户在本地设备上运行各种大型语言模型。它的核心优势在于保障隐私和数据安全，所有模型和数据均在本地处理，无需将敏感信息上传到云端。Ollama 适合那些对数据安全有较高要求的开发者和企业，能够让他们快速集成强大的语言模型能力，同时避免数据泄露的风险。两者的核心差别在于 Dify 偏重于云端集成和知识检索增强，而 Ollama 更注重本地运行和隐私保护。

###### 简而言之,如果你想本地部署大模型并构建知识库,agent工作流等功能,我很推荐这个组合,用户既能享受到大模型带来的强大语言理解和生成能力，又能在本地或私有环境中灵活调度外部知识，实现更智能、更安全、更高效的人工智能服务。

## 前置工作

### WSL2下载

WSL2（Windows Subsystem for Linux version 2）是微软开发的一项技术，包含了一个完整的Linux内核，因此它能够更好地支持Linux应用程序和工具，包括对Docker容器的支持。所以用户可以直接在Windows系统上使用Linux应用程序和工具，省去了构建虚拟机的繁琐过程  
[wsl2 linux内核更新包](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi?)  
   打开PowerShell命令窗口以管理员身份运行

```bash
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

来启用WSL.第一次运行代码需要重启计算机来更改应用设置。

安装完成后，在PowerShell中运行命令

```bash
wsl --set-default-version 2
```

#### Docker下载

                        https://www.docker.com/

这里我们直接采用桌面版,方便进行可视化操作.

### 安装dify

打开PowerShell命令窗口以管理员身份运行  
输入以下代码

```bash
git clone http://github.com/langgenius/dify.git
```

克隆Dify的仓库.

```bash
cd dify/docker
```

进入目录

```bash
docker compose up -d
```

拉取镜像,如果遇到拉取失败,可以参考我主页另一篇文章来配置代理和镜像源.

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/b4384f38fb8e438cac56f80fab69c8d2.png#pic_center)  
拉取完成后进入dockerdesktop,可以看到拉取的服务,点开ngix服务,直接点击80:80,就可以进入dify网站

第一次需要注册账号  
​![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/c9c147c53d0c4fbe91fb35a803d04794.png#pic_center)  
图中是我之前创建的应用,dify的功能十分强大,大家可以自由探索.

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/a5b1d2284bfd4b7686f454ec94b87c34.png#pic_center)

## ollama配置

进入[官网](https://ollama.com/)直接下载

完成安装后，在终端输入命令 ollama，若显示版本号和帮助信息，表示安装成功。

如图进行环境变量配置![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/3b0366eb8285426295bebe09eb9b5792.png#pic_center)  
​![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/d0832d5f9d7447fba2501650c40e9334.png#pic_center)

###### 下载模型步骤

Ollama 支持直接从其官方模型库下载多种开源大模型，例如 GPT-4All、Llama 等。下载步骤如下：

打开终端，输入以下命令查看可用模型列表：

```bash
ollama list
```

你会看到 Ollama 官方支持的模型名称和简要描述。

选择需要的模型，比如下载 GPT-4All 模型：

```bash
ollama pull gpt4all
```

系统会自动从服务器下载模型文件到本地，下载过程视网络情况可能需要几分钟。

下载完成后，使用下面命令验证模型是否安装成功：

```bash
ollama run gpt4all
```

进入交互式界面，你可以输入文本，让模型进行对话测试。

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/c1ae5311cf1b497686423ec853ed8cbb.png#pic_center)  
接下来就可以在dify新建智能体时选择模型时接入ollama了,注意模型名称不能错,然后url使用

```bash
http://host.docker.internal:11434
```

然后所有的基础工作就做完啦!
