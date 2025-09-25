# 泰山第二次培训：ResNet图像分类

# 目标

```python
学习pytorch，熟悉各种接口用法；能够搭建一个简单的深度学习模型，拥有训练流程。
```

## 任务一：ResNet图像分类

使用 ResNet 模型进行图像分类任务的构建

数据集：CIFAR-10

要求：有训练流程（包括读取数据集、数据增强、模型训练、模型评估，模型保存等）数据增强方法不少于三种评估指标：

 （1）准确率 (Accuracy)   定义: 正确分类的样本数与总样本数的比率。

			$\text{Accuracy} = \frac{\text{正确分类的样本数}}{\text{总样本数}}$  

（2）F1-score  
定义: 精确率和召回率的调和平均值，综合考虑了模型的准确性和完整性。

			$F1 = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}} $

#### 数据集介绍：

CIFAR-10 数据集（Python 版本）：

---

```
datas/
└── cifar-10-python/
    └── cifar-10-batches-py/
        ├── batches.meta
        ├── data_batch_1
        ├── data_batch_2
        ├── data_batch_3
        ├── data_batch_4
        ├── data_batch_5
        └── test_batch
```

---

|文件名|内容说明|
| --------| -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|**batches.meta**|包含元数据：10个类的标签名（例如`"airplane"`​,`"automobile"`​, …），用于映射标签编号到可读的类名|
|**data_batch_1**  **~**  **data_batch_5**|训练集，共有5个 batch，每个包含 10,000 张图片（共 50,000 张训练图像），格式为 Python 的`dict`​，键包括：<br />-`data`​: 图像数据，shape 为`(10000, 3072)`​<br />-`labels`​: 标签列表（0\~9）<br />-`filenames`​: 文件名字符串|
|**test_batch**|测试集，包含 10,000 张图像，结构与`data_batch_*`​相同|

---

##### 补充说明：

- 每张图像是 `32x32`​，共 `3`​ 个颜色通道（RGB），因此 `32x32x3 = 3072`​。
- ​`data[i]`​ 是第 `i`​ 张图片的扁平化像素数组，前 1024 是红色通道，中间 1024 是绿色通道，后 1024 是蓝色通道。

---

## 实现

### 虚拟环境

```bash
python -m venv resnet-env

resnet-env\Scripts\activate  ##激活环境
```

### 安装必要库

```python
pip install torch torchvision matplotlib scikit-learn tqdm
```

### 创建必要文件

```python
项目/
├── datas/
│   └── cifar-10-python/
│       └── cifar-10-batches-py/
├── data_loader.py       # 自定义CIFAR-10加载和增强
├── model.py             # ResNet模型定义
├── train.py             # 训练流程
├── evaluate.py          # 模型评估(F1-score等)
├── utils.py             # 通用函数，如模型保存、日志等
├── requirements.txt     # 所需包
└── main.py              # 主运行脚本

```

### 代码详细注释版

​`data_loader.py`​，核心内容如下（含数据增强和三种数据增强方式）：

```python
import pickle
import numpy as np
import os
import torch
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms

class CIFAR10Dataset(Dataset):
    def __init__(self, data_dir, train=True, transform=None):
        """
        初始化CIFAR10数据集
        参数：
        - data_dir: CIFAR-10数据批文件所在目录路径
        - train: 是否加载训练集，True为训练集，False为测试集
        - transform: 对图像进行的数据增强或预处理操作（torchvision.transforms,设置为None便于调用时传入不同的transform策略
        """
        self.data = []   # 存储所有图片数据（numpy数组）
        self.labels = [] # 存储对应标签
        self.transform = transform
        if train:
            # 训练集包含5个批次文件 data_batch_1 ~ data_batch_5
            for i in range(1, 6):
                batch = self._load_batch(os.path.join(data_dir, f'data_batch_{i}'))
                self.data.append(batch[b'data'])   # 读取图像数据，shape为 (10000, 3072)
                self.labels += batch[b'labels']   # 读取标签，列表形式，长度10000
        else:
            # 测试集只有一个批次文件 test_batch
            batch = self._load_batch(os.path.join(data_dir, 'test_batch'))
            self.data.append(batch[b'data'])
            self.labels += batch[b'labels']

        # 拼接所有批次的图片数据，reshape成 (样本数, 通道数, 高, 宽)
        self.data = np.concatenate(self.data).reshape(-1, 3, 32, 32).astype(np.uint8)

    def _load_batch(self, path):
        """
        读取单个批次的cifar-10数据（pickle格式）
        返回字典，包含键b'data'和b'labels'等
        """
        with open(path, 'rb') as f:
            return pickle.load(f, encoding='bytes')

    def __len__(self):
        """
        返回数据集的样本数量
        """
        return len(self.labels)

    def __getitem__(self, idx):
        """
        根据索引idx获取单个样本（图像+标签）
        - 图像数据需要转换为HWC格式以符合PIL图像的格式
        - 之后应用transform变换（如数据增强、Tensor转换等）
        返回：图像tensor和对应标签
        """
        img = self.data[idx].transpose(1, 2, 0)  # CHW -> HWC，因为PIL读取的是HWC
        label = self.labels[idx]
        if self.transform:
            img = self.transform(img)  # 对PIL Image执行变换，最终变成Tensor
        return img, label

def get_loaders(root_dir, batch_size=64):
    """
    构造训练集和测试集的DataLoader
    参数：
    - root_dir: 包含cifar-10数据文件夹'cifar-10-batches-py'的根目录路径
    - batch_size: 每个batch中样本数量

    返回：
    - train_loader: 训练集DataLoader，带shuffle
    - test_loader: 测试集DataLoader，不带shuffle
    """

    data_dir = os.path.join(root_dir, 'cifar-10-batches-py')

    # 训练集变换：先转成PIL图片，随机水平翻转，随机裁剪（带padding），颜色抖动，再转成tensor
    train_transform = transforms.Compose([
        transforms.ToPILImage(),
        transforms.RandomHorizontalFlip(),          # 50%概率水平翻转
        transforms.RandomCrop(32, padding=4),       # 随机裁剪32x32，周围补4像素边
        transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2), # 颜色随机变化
        transforms.ToTensor()                        # 转为Tensor，归一化至[0,1]
    ])

    # 测试集变换：只转PIL图像再转Tensor，不做数据增强
    test_transform = transforms.Compose([
        transforms.ToPILImage(),
        transforms.ToTensor()
    ])

    # 创建训练数据集和测试数据集对象
    train_set = CIFAR10Dataset(data_dir, train=True, transform=train_transform)
    test_set = CIFAR10Dataset(data_dir, train=False, transform=test_transform)

    # 创建对应的DataLoader，训练集shuffle打乱，测试集不打乱
    train_loader = DataLoader(train_set, batch_size=batch_size, shuffle=True)
    test_loader = DataLoader(test_set, batch_size=batch_size, shuffle=False)

    return train_loader, test_loader

```

​`model.py`​，内容如下：

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class BasicBlock(nn.Module):
    expansion = 1  # BasicBlock通道扩展倍数为1（ResNet18/34中使用）

    def __init__(self, in_planes, planes, stride=1):
        """
        BasicBlock基本残差块，包括两个3x3卷积层
        参数：
        - in_planes: 输入通道数
        - planes: 输出通道数
        - stride: 第一层卷积步长，用于下采样（默认为1）
        """
        super().__init__()
        # 第1个3x3卷积，可能会带stride实现下采样
        self.conv1 = nn.Conv2d(in_planes, planes, kernel_size=3, stride=stride,
                               padding=1, bias=False)
        self.bn1 = nn.BatchNorm2d(planes)  # 批归一化

        # 第2个3x3卷积，stride固定为1
        self.conv2 = nn.Conv2d(planes, planes, kernel_size=3, stride=1,
                               padding=1, bias=False)
        self.bn2 = nn.BatchNorm2d(planes)

        # shortcut分支，默认是恒等映射
        self.shortcut = nn.Sequential()
        # 若stride不为1或通道数不匹配，则用1x1卷积调整维度和大小
        if stride != 1 or in_planes != self.expansion * planes:
            self.shortcut = nn.Sequential(
                nn.Conv2d(in_planes, self.expansion * planes,
                          kernel_size=1, stride=stride, bias=False),
                nn.BatchNorm2d(self.expansion * planes)
            )

    def forward(self, x):
        out = F.relu(self.bn1(self.conv1(x)))  # 卷积+BN+ReLU
        out = self.bn2(self.conv2(out))        # 卷积+BN
        out += self.shortcut(x)                 # 残差连接（shortcut）
        out = F.relu(out)                       # 激活函数ReLU
        return out

class ResNet(nn.Module):
    def __init__(self, block, num_blocks, num_classes=10):
        """
        ResNet模型主体
        参数：
        - block: 残差块类型，如BasicBlock
        - num_blocks: 每个阶段包含的block数量，如[2,2,2,2]
        - num_classes: 分类类别数，默认CIFAR-10为10类
        """
        super().__init__()
        self.in_planes = 64  # 网络初始通道数

        # CIFAR-10输入大小32x32，第一层卷积核3x3，步长1，padding=1保持尺寸不变
        self.conv1 = nn.Conv2d(3, 64, kernel_size=3,
                               stride=1, padding=1, bias=False)
        self.bn1 = nn.BatchNorm2d(64)

        # 四个残差层（stage），每个包含num_blocks[i]个block
        # stride=2时尺寸减半，stride=1时尺寸保持
        self.layer1 = self._make_layer(block, 64, num_blocks[0], stride=1)   # 32x32
        self.layer2 = self._make_layer(block, 128, num_blocks[1], stride=2)  # 16x16
        self.layer3 = self._make_layer(block, 256, num_blocks[2], stride=2)  # 8x8
        self.layer4 = self._make_layer(block, 512, num_blocks[3], stride=2)  # 4x4

        # 自适应平均池化，将任意大小特征图池化到1x1
        self.avgpool = nn.AdaptiveAvgPool2d((1, 1))

        # 全连接分类层，输入通道数 = 512 * block.expansion，输出通道数=类别数
        self.linear = nn.Linear(512 * block.expansion, num_classes)

    def _make_layer(self, block, planes, num_blocks, stride):
        """
        构造残差层，每层由num_blocks个block组成
        参数：
        - block: 残差块类型
        - planes: 当前层的输出通道数
        - num_blocks: 块数量
        - stride: 第一个block的步长，其他block为1
        """
        strides = [stride] + [1] * (num_blocks - 1)  # 第一个块可能下采样
        layers = []
        for s in strides:
            layers.append(block(self.in_planes, planes, s))  # 创建残差块
            self.in_planes = planes * block.expansion        # 更新输入通道数
        return nn.Sequential(*layers)  # 串联成Sequential模块

    def forward(self, x):
        out = F.relu(self.bn1(self.conv1(x)))  # 第一层卷积+BN+ReLU，尺寸32x32
        out = self.layer1(out)  # stage1，尺寸不变 32x32
        out = self.layer2(out)  # stage2，尺寸减半 16x16
        out = self.layer3(out)  # stage3，尺寸减半 8x8
        out = self.layer4(out)  # stage4，尺寸减半 4x4
        out = self.avgpool(ovgpoout)  # 自适应池化，输出尺寸1x1
        out = torch.flatten(out, 1)  # 展平成(batch_size, 512*expansion)
        out = self.linear(out)        # 全连接分类层
        return out

def ResNet18():
    """
    构造ResNet18模型，包含4个阶段，每个阶段2个BasicBlock
    """
    return ResNet(BasicBlock, [2, 2, 2, 2])

```

​`train.py`​，写一个训练流程，支持打印训练日志，保存最优模型

```python
import torch
import torch.nn as nn
import torch.optim as optim
from tqdm import tqdm
from data_loader import get_loaders  # 自定义数据加载函数，返回训练和测试DataLoader
from model import ResNet18           # 自定义ResNet18模型定义
from evaluate import evaluate       # 自定义评估函数，返回准确率和F1分数
import os

def train_epoch(model, loader, criterion, optimizer, device):
    """
    执行单个训练周期
    参数：
    - model: 神经网络模型
    - loader: 训练数据加载器
    - criterion: 损失函数
    - optimizer: 优化器
    - device: 设备（CPU或GPU）
    返回：
    - 平均训练损失
    - 训练集准确率
    """
    model.train()  # 切换模型为训练模式
    running_loss = 0  # 累积损失
    total = 0         # 累积样本数
    correct = 0       # 累积正确预测数

    # 遍历训练数据
    for inputs, targets in tqdm(loader):
        inputs, targets = inputs.to(device), targets.to(device)  # 移动到设备
        optimizer.zero_grad()            # 梯度清零
        outputs = model(inputs)          # 前向传播
        loss = criterion(outputs, targets)  # 计算损失
        loss.backward()                 # 反向传播计算梯度
        optimizer.step()                # 更新参数

        running_loss += loss.item() * inputs.size(0)  # 累加损失，乘以batch大小
        _, predicted = outputs.max(1)                  # 取最大概率的类别索引
        total += targets.size(0)                        # 累加样本数
        correct += predicted.eq(targets).sum().item()  # 累加预测正确的数量

    return running_loss / total, correct / total  # 返回平均损失和准确率

def train(root_dir, epochs=20, batch_size=64, lr=0.001, save_path='best_model.pth'):
    """
    训练函数，执行多轮训练并保存最佳模型
    参数：
    - root_dir: CIFAR-10数据集根目录，包含cifar-10-batches-py文件夹
    - epochs: 训练总轮数
    - batch_size: 每批次样本数
    - lr: 学习率
    - save_path: 模型权重保存路径
    """
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print('Using device:', device)

    # 加载训练和测试数据加载器
    train_loader, test_loader = get_loaders(root_dir, batch_size)

    # 初始化模型并移动到设备
    model = ResNet18().to(device)
    criterion = nn.CrossEntropyLoss()           # 交叉熵损失函数，适用于分类任务
    optimizer = optim.Adam(model.parameters(), lr=lr)  # Adam优化器

    best_acc = 0  # 用于记录验证集最高准确率

    for epoch in range(1, epochs+1):
        # 训练一个epoch
        train_loss, train_acc = train_epoch(model, train_loader, criterion, optimizer, device)
        print(f'Epoch {epoch}/{epochs} Train loss: {train_loss:.4f} Train acc: {train_acc:.4f}')

        # 验证模型性能
        test_acc, test_f1 = evaluate(model, test_loader, device)
        print(f'Validation Acc: {test_acc:.4f}, F1-score: {test_f1:.4f}')

        # 保存最佳模型
        if test_acc > best_acc:
            best_acc = test_acc
            torch.save(model.state_dict(), save_path)
            print('Model saved!')

if __name__ == '__main__':
    root_dir = './datas/cifar-10-python'  # CIFAR-10数据所在目录
    train(root_dir)

```

评估代码（evaluate.py）计算准确率和 F1-score：

```python
import torch
from sklearn.metrics import f1_score  # 用于计算加权F1-score

def evaluate(model, loader, device):
    """
    在验证/测试集上评估模型性能
    参数：
    - model: 训练好的模型
    - loader: 测试数据的 DataLoader
    - device: 设备（CPU或GPU）

    返回：
    - acc: 准确率（accuracy）
    - f1: 加权平均的F1分数（考虑类别不平衡）
    """
    model.eval()  # 设置为评估模式，关闭Dropout/BN的训练行为
    all_preds = []    # 存储所有模型预测结果
    all_targets = []  # 存储所有真实标签

    # 不计算梯度，节省显存，加快推理速度
    with torch.no_grad():
        for inputs, targets in loader:
            inputs, targets = inputs.to(device), targets.to(device)
            outputs = model(inputs)                # 模型前向传播
            preds = outputs.argmax(dim=1)          # 取每个样本的预测类别（最大概率）

            # 将GPU上的tensor转为numpy并加入结果列表中
            all_preds.extend(preds.cpu().numpy())
            all_targets.extend(targets.cpu().numpy())

    # 计算准确率
    acc = (torch.tensor(all_preds) == torch.tensor(all_targets)).float().mean().item()

    # 计算加权平均F1分数，考虑类别不平衡
    f1 = f1_score(all_targets, all_preds, average='weighted')

    return acc, f1

```

utils.py放一些通用工具函数，比如模型保存、加载、打印训练日志

```python
import torch
import os

def save_model(model, path):
    """
    保存模型的参数（state_dict）到指定路径
    参数：
    - model: 要保存的PyTorch模型
    - path: 保存文件的路径（包括文件名，如 'checkpoints/best_model.pth'）
    """
    os.makedirs(os.path.dirname(path), exist_ok=True)  # 创建保存目录（如果不存在）
    torch.save(model.state_dict(), path)               # 保存模型参数（不包含模型结构）
    print(f'Model saved to {path}')                    # 打印保存成功信息

def load_model(model, path, device):
    """
    加载模型参数到已有模型结构上
    参数：
    - model: 已定义好结构的PyTorch模型
    - path: 保存的模型权重文件路径
    - device: 加载到的设备（如 'cuda' 或 'cpu'）

    返回：
    - 加载权重后的模型（已转移到指定设备）
    """
    # 从文件加载参数并映射到指定设备（CPU或GPU）
    model.load_state_dict(torch.load(path, map_location=device))
    model.to(device)  # 将模型移动到目标设备
    print(f'Model loaded from {path}')  # 打印加载成功信息
    return model

```

main.py作为项目入口脚本，方便统一调用训练、评估等功能，灵活控制参数

```python
import argparse                         # 处理命令行参数
from train import train                 # 训练函数
from model import ResNet18              # 模型定义
from evaluate import evaluate           # 模型评估函数
from utils import load_model            # 模型加载函数
import torch

def main():
    # 创建命令行参数解析器
    parser = argparse.ArgumentParser()
    parser.add_argument('--mode', choices=['train', 'eval'], default='train',
                        help='运行模式：训练或评估')
    parser.add_argument('--data_dir', type=str, default='./datas/cifar-10-python',
                        help='CIFAR-10 数据集根目录')
    parser.add_argument('--model_path', type=str, default='best_model.pth',
                        help='模型保存或加载的路径')
    parser.add_argument('--epochs', type=int, default=20,
                        help='训练轮数')
    parser.add_argument('--batch_size', type=int, default=64,
                        help='批大小')
    parser.add_argument('--lr', type=float, default=0.001,
                        help='学习率')
    args = parser.parse_args()  # 解析命令行参数

    # 选择设备（优先使用GPU）
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    if args.mode == 'train':
        # 执行训练流程
        train(
            args.data_dir,
            epochs=args.epochs,
            batch_size=args.batch_size,
            lr=args.lr,
            save_path=args.model_path
        )
    else:
        # 执行评估流程
        model = ResNet18().to(device)                        # 初始化模型结构
        model = load_model(model, args.model_path, device)  # 加载模型权重

        from data_loader import get_loaders
        _, test_loader = get_loaders(args.data_dir, batch_size=args.batch_size)  # 获取测试数据
        acc, f1 = evaluate(model, test_loader, device)  # 评估模型性能
        print(f'Evaluation Accuracy: {acc:.4f}, F1-score: {f1:.4f}')  # 输出结果

if __name__ == '__main__':
    main()  # 启动程序入口

```

---

### main.py使用说明：

#### 1. 训练模型：

```bash
python main.py --mode train --epochs 30 --lr 0.0005
```

#### 2. 评估模型：

```bash
python main.py --mode eval --model_path best_model.pth
```

---

### 参数说明：

|参数|类型|默认值|说明|
| ------| -------| --------| ----------------------|
|​`--mode`​|str|​`'train'`​|​`'train'`​或`'eval'`​|
|​`--data_dir`​|str|​`'./datas/cifar-10-python'`​|CIFAR-10数据的根目录|
|​`--model_path`​|str|​`'best_model.pth'`​|模型保存或加载路径|
|​`--epochs`​|int|​`20`​|训练轮数|
|​`--batch_size`​|int|​`64`​|每批数据大小|
|​`--lr`​|float|​`0.001`​|学习率|

---

等待训练结束即可。

![屏幕截图 2025-08-04 010315](assets/屏幕截图%202025-08-04%20010315-20250804013211-xjhus3g.png)

---

‍
