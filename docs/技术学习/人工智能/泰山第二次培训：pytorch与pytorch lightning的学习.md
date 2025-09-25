# 泰山第二次培训：pytorch与pytorch lightning的学习

# PyTorch

**PyTorch** 是一个由 Facebook 的人工智能研究团队开发的开源机器学习库。它凭借其**动态计算图**、**简洁直观的API**和**强大的GPU加速**功能，成为学术界和工业界进行深度学习研究和应用开发的首选框架之一。对于初学者来说，PyTorch 的语法与 Python 的 NumPy 库非常相似，易于上手。

## 核心概念：张量 (Tensor)

PyTorch 的核心是 `torch.Tensor`​，一个多维数组，类似于 NumPy 的 `ndarray`​，但增加了在 GPU 上进行计算的能力，这对于加速深度学习模型的训练至关重要。

### 基本用法：

```python
import torch
import numpy as np
```

#### 创建张量

```python
# 从 Python 列表创建
a = torch.tensor([1, 2, 3])
b = torch.tensor([[1.0, 2.0], [3.0, 4.0]])

# 创建一个全为0的张量
c = torch.zeros(2, 3) # 2行3列

# 创建一个全为1的张量
d = torch.ones(2, 3)

# 创建一个随机张量
e = torch.rand(2, 3) # 在[0, 1)区间均匀分布

print(a)
print(b)
print(c)
print(d)
print(e)
```

说明：可以使用 `torch.tensor()`​、`torch.zeros()`​、`torch.ones()`​、`torch.rand()`​ 等多种方式创建张量。

---

#### 查看张量形状和属性

```python
print(b.shape)      # torch.Size([2, 2]) → 2行2列
print(b.size())     # torch.Size([2, 2]) → 功能同上
print(b.dtype)      # torch.float32      → 元素数据类型
print(b.device)     # cpu                → 张量所在的设备
```

说明：`.shape`​ 或 `.size()`​ 用于查看张量的维度，`.dtype`​ 查看数据类型，`.device`​ 查看所在的设备（CPU或GPU）。

---

#### NumPy 与 Tensor 的转换

PyTorch 与 NumPy 可以轻松地互相转换，并且共享底层的内存（如果在CPU上），这意味着转换几乎是零成本的。

```python
# NumPy to Tensor
numpy_array = np.array([1, 2, 3])
tensor_from_numpy = torch.from_numpy(numpy_array)

print(numpy_array)
print(tensor_from_numpy)

# Tensor to NumPy
tensor = torch.tensor([4, 5, 6])
numpy_from_tensor = tensor.numpy()

print(tensor)
print(numpy_from_tensor)
```

---

## 自动求导：`torch.autograd`​

PyTorch 的 `autograd`​ 引擎是神经网络训练的核心。它为张量上的所有操作构建一个动态计算图。当对张量设置 `.requires_grad=True`​ 时，PyTorch 会开始追踪其上的所有操作。完成计算后，可以调用 `.backward()`​ 来自动计算所有梯度，这些梯度会累积到相应张量的 `.grad`​ 属性中。

```python
# 创建一个需要梯度的张量
x = torch.ones(2, 2, requires_grad=True)
print(x)

# 对张量进行操作
y = x + 2
z = y * y * 3
out = z.mean()

print(y)
print(z)
print(out)

# 计算梯度
out.backward()

# 打印梯度 d(out)/dx
print(x.grad)
```

说明：`out.backward()`​ 计算了 `out`​ 相对于 `x`​ 的梯度。这是训练神经网络时更新权重的基本步骤。

---

## 构建神经网络：`torch.nn`​

​`torch.nn`​ 是 PyTorch 用于构建神经网络的核心模块。 所有的神经网络模型都应该继承自 `nn.Module`​。这个类提供了一系列强大的功能，使得定义、管理和训练模型变得非常方便。

### 定义一个网络

一个典型的模型定义包括两个主要部分：

1. ​`__init__()`​：在这里定义网络需要的各个层，例如卷积层、线性层等。
2. ​`forward()`​：在这里定义数据通过网络时的前向传播路径，也就是将 `__init__`​ 中定义的层连接起来。

```python
import torch.nn as nn
import torch.nn.functional as F

class SimpleNet(nn.Module):
    def __init__(self):
        super(SimpleNet, self).__init__()
        # 定义第一层：一个接受1x28x28图像的卷积层
        self.conv1 = nn.Conv2d(1, 32, 3, 1)
        # 定义第二层：一个接受32通道的卷积层
        self.conv2 = nn.Conv2d(32, 64, 3, 1)
        # 定义全连接层
        self.fc1 = nn.Linear(9216, 128) # 9216是根据输入尺寸计算得出的特征数量
        self.fc2 = nn.Linear(128, 10) # 最终输出10个类别

    def forward(self, x):
        # 通过卷积层和激活函数
        x = self.conv1(x)
        x = F.relu(x)
        x = self.conv2(x)
        x = F.relu(x)
        # 通过最大池化层
        x = F.max_pool2d(x, 2)
        # 展平张量以送入全连接层
        x = torch.flatten(x, 1)
        # 通过全连接层
        x = self.fc1(x)
        x = F.relu(x)
        x = self.fc2(x)
        # 使用log_softmax作为输出层的激活函数
        output = F.log_softmax(x, dim=1)
        return output

# 创建模型实例
model = SimpleNet()
print(model)
```

---

## 模型训练流程

一个完整的模型训练流程通常包括：数据准备、定义模型、定义损失函数和优化器、训练循环、评估循环，以及模型的保存和加载。

####  数据准备：`Dataset`​ 和 `DataLoader`​

PyTorch 使用 `torch.utils.data.Dataset`​ 和 `torch.utils.data.DataLoader`​ 来高效地加载和处理数据。

- ​**​`Dataset`​**​ 是一个抽象类，用于表示数据集。你需要自定义一个类继承它，并实现 `__len__`​（返回数据集大小）和 `__getitem__`​（根据索引返回一个样本）两个方法。
- ​**​`DataLoader`​**​ 则接收一个 `Dataset`​ 对象，并将其包装成一个可迭代对象，方便地提供批量（batch）数据、打乱数据（shuffle）和并行加载等功能。

#### 数据增强：`torchvision.transforms`​

​`torchvision`​ 包提供了常用的数据集、模型架构和图像转换方法。 `transforms`​ 模块包含了一系列用于数据预处理和增强的类。

```python
from torchvision import datasets, transforms

# 定义数据转换流程，通常包括转换为Tensor和归一化
transform = transforms.Compose([
    transforms.ToTensor(), # 将PIL图像或NumPy ndarray转换为Tensor
    transforms.Normalize((0.1307,), (0.3081,)) # 使用MNIST数据集的均值和标准差进行归一化
])

# 下载并加载训练集和测试集
dataset_train = datasets.MNIST('../data', train=True, download=True, transform=transform)
dataset_test = datasets.MNIST('../data', train=False, transform=transform)

# 创建 DataLoader
train_loader = torch.utils.data.DataLoader(dataset_train, batch_size=64, shuffle=True)
test_loader = torch.utils.data.DataLoader(dataset_test, batch_size=1000, shuffle=False)‍```

说明：`transforms.Compose` 可以将多个转换操作链接在一起。这里我们先将图像转为张量，然后进行归一化。

### 2. 定义损失函数和优化器

*   **损失函数 (Loss Function)**：衡量模型输出与真实标签之间的差距。 对于分类问题，常用的损失函数是交叉熵损失 `nn.CrossEntropyLoss`。
*   **优化器 (Optimizer)**：根据损失函数计算出的梯度来更新模型的参数（权重）。 `torch.optim` 模块提供了多种优化算法，如 `SGD`, `Adam` 等。

# 将模型移动到GPU（如果可用）
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# 定义优化器
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# 定义损失函数
criterion = nn.CrossEntropyLoss()
```

说明：`model.parameters()`​ 会告诉优化器需要更新哪些参数。

#### 训练与评估循环

训练循环会遍历所有数据若干次（每个周期称为一个 epoch），在每个批次上执行前向传播、计算损失、反向传播和参数更新。评估循环则用于检验模型在未见过的数据上的性能。

```python
def train(model, device, train_loader, optimizer, epoch):
    model.train() # 将模型设置为训练模式
    for batch_idx, (data, target) in enumerate(train_loader):
        data, target = data.to(device), target.to(device) # 将数据移动到指定设备
        optimizer.zero_grad()    # 清空过往梯度
        output = model(data)     # 前向传播
        loss = criterion(output, target) # 计算损失
        loss.backward()          # 反向传播，计算梯度
        optimizer.step()         # 更新权重

        if batch_idx % 100 == 0:
            print(f'Train Epoch: {epoch} [{batch_idx * len(data)}/{len(train_loader.dataset)}] Loss: {loss.item():.6f}')

def test(model, device, test_loader):
    model.eval() # 将模型设置为评估模式
    test_loss = 0
    correct = 0
    with torch.no_grad(): # 在评估时，不需要计算梯度
        for data, target in test_loader:
            data, target = data.to(device), target.to(device)
            output = model(data)
            test_loss += criterion(output, target).item()  # 累加批次损失
            pred = output.argmax(dim=1, keepdim=True) # 获取最大概率的索引
            correct += pred.eq(target.view_as(pred)).sum().item()

    test_loss /= len(test_loader.dataset)
    print(f'\nTest set: Average loss: {test_loss:.4f}, Accuracy: {correct}/{len(test_loader.dataset)} ({100. * correct / len(test_loader.dataset):.0f}%)\n')

# 运行训练和评估
for epoch in range(1, 3): # 训练2个周期
    train(model, device, train_loader, optimizer, epoch)
    test(model, device, test_loader)
```

说明：`model.train()`​ 和 `model.eval()`​ 非常重要，它们会切换模型中某些层（如 Dropout、BatchNorm）的工作模式。`with torch.no_grad()`​ 可以节省内存并加速评估过程。

#### 模型保存和加载

在 PyTorch 中，通常只保存模型的可学习参数（权重和偏置），而不是整个模型结构。这些参数存储在一个称为 `state_dict`​ 的 Python 字典中。

```python
# 保存模型
torch.save(model.state_dict(), "mnist_cnn.pt")
print("模型已保存到 mnist_cnn.pt")

# 加载模型
# 首先需要创建同一模型结构的实例
new_model = SimpleNet()
# 然后加载保存的参数
new_model.load_state_dict(torch.load("mnist_cnn.pt"))
new_model.to(device) # 别忘了将模型移动到设备

# 使用加载的模型进行评估
print("使用加载的模型进行评估:")
test(new_model, device, test_loader)
```

说明：这种只保存和加载 `state_dict`​ 的方式更灵活、更推荐，因为它只包含模型的参数，不依赖于具体的类结构代码。

---

# PyTorch Lightning

**PyTorch Lightning** 是一个基于 PyTorch 的高级开源库，它旨在为深度学习研究人员和工程师提供一个**标准化的代码结构**。它通过抽象和自动化大部分样板代码（Boilerplate），让你能够专注于核心的模型架构和科研逻辑，而无需反复编写训练、评估、测试循环以及硬件管理等代码。

你可以将 PyTorch Lightning 视为 PyTorch 的一层“糖衣”，它并不改变 PyTorch 的核心功能，而是以更规范、更简洁的方式组织代码。

## 核心理念：从代码中分离出科学

PyTorch Lightning 的核心思想是将**研究代码（模型本身）** 与**工程代码（训练循环、硬件交互等）** 分离开。这是通过引入几个核心组件实现的，最重要的是 `LightningModule`​ 和 `Trainer`​。

## 核心组件：`LightningModule`​

​`LightningModule`​ 是 `torch.nn.Module`​ 的一个扩展。它通过将模型定义、训练逻辑、验证逻辑、测试逻辑以及优化器配置等相关代码组织在一个类中，极大地增强了代码的可读性和可复用性。

### 基本用法：

你将自己定义的 `nn.Module`​ 替换为 `pl.LightningModule`​，然后将训练和验证的步骤放在指定的方法中。

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
import pytorch_lightning as pl
from torch.optim import Adam
from torchvision import datasets, transforms
from torch.utils.data import DataLoader, random_split

class LitMNIST(pl.LightningModule):
    def __init__(self, learning_rate=1e-3):
        super().__init__()
        # 保存超参数，方便后续访问和记录
        self.save_hyperparameters()

        # 定义神经网络层 (研究代码)
        self.layer_1 = nn.Linear(28 * 28, 128)
        self.layer_2 = nn.Linear(128, 256)
        self.layer_3 = nn.Linear(256, 10)

    # 定义前向传播
    def forward(self, x):
        batch_size, channels, height, width = x.size()
        x = x.view(batch_size, -1) # 展平图像
        x = self.layer_1(x)
        x = F.relu(x)
        x = self.layer_2(x)
        x = F.relu(x)
        x = self.layer_3(x)
        return x

    # 定义训练循环的单步操作
    def training_step(self, batch, batch_idx):
        x, y = batch
        logits = self(x) # self(x) 会自动调用 forward(x)
        loss = F.cross_entropy(logits, y)
        # 记录损失，用于tensorboard等可视化工具
        self.log('train_loss', loss)
        return loss

    # 定义验证循环的单步操作
    def validation_step(self, batch, batch_idx):
        x, y = batch
        logits = self(x)
        loss = F.cross_entropy(logits, y)
        self.log('val_loss', loss)

    # 定义测试循环的单步操作
    def test_step(self, batch, batch_idx):
        x, y = batch
        logits = self(x)
        loss = F.cross_entropy(logits, y)
        preds = torch.argmax(logits, dim=1)
        acc = torch.sum(preds == y).item() / (len(y) * 1.0)
        self.log('test_loss', loss)
        self.log('test_acc', acc)

    # 定义优化器
    def configure_optimizers(self):
        optimizer = Adam(self.parameters(), lr=self.hparams.learning_rate)
        return optimizer

```

说明：在 `LightningModule`​ 中，你不再需要手动编写 `for`​ 循环、`.backward()`​、`optimizer.step()`​ 等。你只需要在对应的钩子（hooks）函数中定义具体的操作，`Trainer`​ 会自动调用它们。

---

## 数据处理：`LightningDataModule`​ 

为了进一步解耦数据和模型，Lightning 引入了 `LightningDataModule`​。它将所有与数据相关的代码（下载、预处理、切分、创建 `DataLoader`​）都封装在一个独立的、可复用的类中。

### 基本用法：

```python
from pytorch_lightning import LightningDataModule

class MNISTDataModule(LightningDataModule):
    def __init__(self, data_dir: str = "./", batch_size: int = 64):
        super().__init__()
        self.data_dir = data_dir
        self.batch_size = batch_size
        self.transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.1307,), (0.3081,))])

    # 1. 下载和准备数据 (只在一个GPU/进程上执行)
    def prepare_data(self):
        datasets.MNIST(self.data_dir, train=True, download=True)
        datasets.MNIST(self.data_dir, train=False, download=True)

    # 2. 为每个GPU/进程设置数据 (在这里进行数据集的分配和转换)
    def setup(self, stage: str):
        if stage == "fit":
            mnist_full = datasets.MNIST(self.data_dir, train=True, transform=self.transform)
            self.mnist_train, self.mnist_val = random_split(mnist_full, [55000, 5000])

        if stage == "test":
            self.mnist_test = datasets.MNIST(self.data_dir, train=False, transform=self.transform)

    # 创建训练集的 DataLoader
    def train_dataloader(self):
        return DataLoader(self.mnist_train, batch_size=self.batch_size, shuffle=True)

    # 创建验证集的 DataLoader
    def val_dataloader(self):
        return DataLoader(self.mnist_val, batch_size=self.batch_size)

    # 创建测试集的 DataLoader
    def test_dataloader(self):
        return DataLoader(self.mnist_test, batch_size=self.batch_size)
```

说明：`LightningDataModule`​ 使得数据准备的逻辑非常清晰，并且可以轻松地在不同项目间共享。

---

## 训练器：`Trainer`​

​`Trainer`​ 是 PyTorch Lightning 的核心引擎，它负责自动化整个训练过程。你只需要将 `LightningModule`​ 和 `LightningDataModule`​ 的实例传入 `Trainer`​，它就会处理好所有的事情。

### 基本用法：

```python
# 1. 初始化数据模块
dm = MNISTDataModule()

# 2. 初始化模型
model = LitMNIST()

# 3. 初始化 Trainer
# Trainer 提供了大量的参数来控制训练过程
# accelerator='gpu' 表示使用GPU, devices=1 表示使用1个GPU
# max_epochs 控制最大训练轮数
trainer = pl.Trainer(accelerator='auto', devices=1, max_epochs=3)

# 4. 开始训练 (自动调用 training_step 和 validation_step)
trainer.fit(model, datamodule=dm)

# 5. 运行测试 (自动调用 test_step)
trainer.test(model, datamodule=dm)
```

说明：你不再需要编写 `for epoch in range(...)`​ 循环，也不需要手动管理设备（`.to(device)`​）。`Trainer`​ 会自动完成这些工作，并提供诸如混合精度训练、多GPU训练、梯度累积、日志记录、模型断点续传等高级功能，通常只需要修改一两个参数即可开启。

---

## 模型保存与加载

PyTorch Lightning 的 `Trainer`​ 提供了强大的模型断点续传（Checkpointing）功能，它会在训练过程中自动保存模型。

```python
# Trainer 会自动在当前目录下创建一个 lightning_logs 文件夹来保存日志和模型
# 它会根据验证损失自动保存效果最好的模型

# 假设训练中断了，可以从断点恢复训练
# trainer.fit(model, datamodule=dm, ckpt_path="path/to/best_model.ckpt")

# 加载训练好的模型权重进行预测或评估
trained_model = LitMNIST.load_from_checkpoint("path/to/best_model.ckpt")

# 你可以像使用普通 PyTorch 模型一样使用它
trained_model.eval()
test_data = torch.rand(1, 1, 28, 28)
predictions = trained_model(test_data)
```

说明：`.load_from_checkpoint`​ 是一个类方法，它可以自动创建模型实例并加载指定断点文件的权重，非常方便。

---

‍
