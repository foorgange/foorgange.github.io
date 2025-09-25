# yolov8和yolov11入门

# YOLOv8 和 YOLOv11 入门

**YOLO (You Only Look Once)**  系列是实时目标检测领域最著名和广泛使用的模型之一。由 Ultralytics 开发的 YOLOv8 及其后续版本 YOLOv11，在保持极快检测速度的同时，提供了顶尖的准确性。这两种模型不仅限于目标检测，还支持实例分割、图像分类和姿态估计等多种视觉任务。它们凭借强大的性能、易用的API和活跃的社区支持，成为了计算机视觉开发者和研究人员的首选工具。

## YOLOv8

YOLOv8 在其前代的基础上进行了多项改进，形成了一个全面且可扩展的框架。 它不仅仅是一个单一的模型，而是一个支持多种视觉任务训练、验证和部署的平台。

### 核心概念

YOLOv8 的架构设计兼顾了效率和灵活性。其主要特点包括：

- **新的骨干网络 (Backbone)** ：采用了优化的 CSP (Cross-Stage Partial) 思想，有效提取图像特征。
- **无锚点检测 (Anchor-Free)** ：与以往版本不同，YOLOv8 采用无锚点头，直接预测物体的中心点，减少了预测框的数量和计算量，简化了后处理流程，提升了泛化能力。
- **解耦头 (Decoupled Head)** ：将分类和定位任务分开处理，这有助于提升模型的准确性。
- **灵活的模型尺寸**：提供从 Nano (n) 到 Extra Large (x) 的多种尺寸模型 (yolov8n, yolov8s, yolov8m, yolov8l, yolov8x)，以适应不同场景下对速度和精度的需求。

### 安装

```bash
# 建议首先创建一个虚拟环境
python -m venv yolov8_env
yolov8_env\Scripts\activate   #激活虚拟环境

# 使用 pip 安装 ultralytics 包
pip install ultralytics
```

说明：`ultralytics`​ 包包含了 YOLOv8 及其后续版本的所有功能。 安装该包会自动安装 PyTorch 等所有必需的依赖项。

---

### 使用预训练模型进行推理

安装完成后，你可以直接使用命令行或 Python 代码调用在 COCO 数据集上预训练好的模型进行目标检测。

#### 命令行 (CLI) 用法

命令行界面非常直观，无需编写任何代码即可快速测试模型。

```bash
# 对单张图片进行检测，'source' 可以是本地路径或 URL
# 'save=True' 会将带有检测结果的图片保存到 'runs/detect/predict' 目录下
yolo task=detect mode=predict model=yolov8n.pt conf=0.25 source='https://ultralytics.com/images/bus.jpg' save=True
```

说明：

- ​`task=detect`​：指定任务为目标检测。
- ​`mode=predict`​：指定模式为预测/推理。
- ​`model=yolov8n.pt`​：选择使用的模型。`yolov8n.pt`​ 是最小最快的模型。如果本地不存在，程序会自动下载。
- ​`conf=0.25`​：设置置信度阈值，只显示高于 25% 置信度的检测结果。
- ​`source`​：指定输入源。

---

#### Python SDK 用法

对于需要在应用程序中集成的场景，使用 Python SDK 更加灵活。

```python
from ultralytics import YOLO
import cv2

# 加载一个预训练的 YOLOv8 模型
# ultralytics 提供了多种尺寸的模型：yolov8n.pt, yolov8s.pt, yolov8m.pt, yolov8l.pt, yolov8x.pt
model = YOLO('yolov8n.pt')

# 定义图片源 (可以是本地路径或 URL)
image_source = 'https://ultralytics.com/images/bus.jpg'

# 使用模型进行预测
# stream=True 推荐用于处理长视频或大量图片，可以更有效地管理内存
results = model.predict(source=image_source, save=True, conf=0.25)

# 'results' 是一个包含检测结果的列表
# 遍历结果列表
for result in results:
    # plot() 方法会返回一个带有检测框的 NumPy 数组 (BGR 格式)
    annotated_frame = result.plot()

    # 使用 OpenCV 显示结果图片
    cv2.imshow("YOLOv8 Detection", annotated_frame)

    # 等待按键，然后关闭窗口
    cv2.waitKey(0)
    cv2.destroyAllWindows()
```

说明：`model.predict()`​ 返回一个结果对象列表。每个结果对象包含了检测到的边界框、类别、置信度分数等详细信息。`.plot()`​ 方法可以方便地将这些结果可视化。

---

### 训练自定义数据集

YOLOv8 的一大优势是训练自定义数据集非常方便。

#### 1. 准备数据集

首先，你需要一个经过标注的数据集。数据集需要遵循特定的 YOLO 格式：

- **图像文件夹**：包含所有的训练图片 (`train/images`​) 和验证图片 (`val/images`​)。
- **标签文件夹**：包含与每张图片对应的 `.txt`​ 标签文件 (`train/labels`​, `val/labels`​)。每个 `.txt`​ 文件名与对应的图片名相同。
- **标签文件格式**：每行代表一个物体，格式为 `<class_id> <x_center> <y_center> <width> <height>`​。所有坐标值都是相对于图片总宽高归一化的。

#### 2. 创建数据集 YAML 文件

创建一个 `.yaml`​ 文件来定义数据集的配置。

```yaml
# data.yaml
# 训练图片和验证图片的路径
train: ../datasets/coco128/images/train2017/
val: ../datasets/coco128/images/train2017/

# 类别数量
nc: 80

# 类别名称
names: ['person', 'bicycle', 'car', ..., 'toothbrush']
```

说明：`train`​ 和 `val`​ 应该指向包含你的训练和验证图片的文件夹路径。`names`​ 列表中的顺序应与标注时使用的 `class_id`​ 相对应。

#### 3. 开始训练

同样，你可以使用命令行或 Python SDK 来启动训练。

- **命令行训练**

```bash
# 使用 yolov8n.pt 的预训练权重开始训练
# data 指向你的 yaml 配置文件
# epochs 是训练轮数
# imgsz 是训练时使用的图片尺寸
# batch 是批大小
yolo task=detect mode=train model=yolov8n.pt data=data.yaml epochs=100 imgsz=640 batch=16
```

- **Python SDK 训练**

```python
from ultralytics import YOLO

# 加载一个模型 (yolov8n.pt 为预训练模型，yolov8n.yaml 为从头开始训练)
model = YOLO('yolov8n.pt')

# 使用 'train' 方法开始训练
# 所有命令行参数在这里都可以作为函数参数传入
results = model.train(data='data.yaml', epochs=100, imgsz=640)

# 训练完成后，最好的模型会保存在 'runs/detect/train/weights/best.pt'
```

说明：训练过程中的日志、权重文件和性能图表都会保存在 `runs/detect/train`​ 目录下，方便后续分析和使用。

## YOLOv11

YOLOv11 是 Ultralytics 在 YOLOv8 基础上推出的最新力作，旨在实现更高的准确性和效率。 它通过架构上的优化，在性能上全面超越了 YOLOv8，尤其是在 CPU 上的推理速度得到了显著提升。

### 核心概念与改进

YOLOv11 的目标是在不牺牲速度的前提下，进一步提升模型的性能。

- **更优的架构**：引入了 C3k2、SPPF（Spatial Pyramid Pooling - Fast）和 C2PSA（带有并行空间注意力的卷积块）等新模块，优化了特征提取和处理流程。
- **更高的效率**：相较于同等规模的 YOLOv8 模型，YOLOv11 拥有更少的参数和更低的计算量 (FLOPs)，但实现了更高的 mAP (mean Average Precision)。 例如，YOLOv11m 在 COCO 数据集上的 mAP 高于 YOLOv8m，但参数量却少了22%。
- **全任务支持**：与 YOLOv8 一样，YOLOv11 也是一个多任务框架，用同一个模型即可完成检测、分割、分类、姿态估计和旋转框检测（OBB）等任务。

对于新项目而言，YOLOv11 是官方推荐的起点，因为它代表了当前最前沿的实时目标检测技术。

### 安装与使用

YOLOv11 的安装和使用流程与 YOLOv8 **完全相同**，都集成在 `ultralytics`​ 这个包中。你只需要在调用模型时，将模型文件名从 `yolov8n.pt`​ 更改为 `yolov11n.pt`​ 即可。

---

### 使用预训练模型进行推理

体验 YOLOv11 的强大性能就像更换模型文件名一样简单。

#### 命令行 (CLI) 用法

```bash
# 使用 YOLOv11n 模型进行推理
yolo task=detect mode=predict model=yolov11n.pt conf=0.25 source='https://ultralytics.com/images/bus.jpg' save=True
```

说明：只需将 `model`​ 参数从 `yolov8n.pt`​ 换成 `yolov11n.pt`​。如果模型文件不存在，系统会自动下载。YOLOv11 也提供从 n 到 x 的多种尺寸。

---

#### Python SDK 用法

```python
from ultralytics import YOLO
import cv2

# 加载一个预训练的 YOLOv11 模型
# 注意模型名称已更改为 yolov11n.pt
model = YOLO('yolov11n.pt')

# 图片源保持不变
image_source = 'https://ultralytics.com/images/bus.jpg'

# 使用模型进行预测，用法与 YOLOv8 完全一致
results = model.predict(source=image_source, save=True, conf=0.25)

# 遍历并显示结果
for result in results:
    annotated_frame = result.plot()
    cv2.imshow("YOLOv11 Detection", annotated_frame)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
```

说明：API 的一致性使得从 YOLOv8 迁移到 YOLOv11 几乎是零成本的，开发者可以无缝升级，享受新模型带来的性能提升。

---

### 训练自定义数据集

YOLOv11 的训练过程也与 YOLOv8 保持一致。

#### 1. 准备数据集和 YAML 文件

数据集的格式和 `data.yaml`​ 文件的写法与 YOLOv8 完全相同。你无需对已有的数据集做任何修改。

#### 2. 开始训练

只需在训练命令或代码中指定 YOLOv11 的模型即可。

- **命令行训练**

```bash
# 从 YOLOv11n 的预训练权重开始训练
yolo task=detect mode=train model=yolov11n.pt data=data.yaml epochs=100 imgsz=640
```

- **Python SDK 训练**

```python
from ultralytics import YOLO

# 加载 YOLOv11 模型
model = YOLO('yolov11n.pt')

# 使用与 YOLOv8 相同的参数进行训练
results = model.train(data='data.yaml', epochs=100, imgsz=640)

# 最好的模型权重会保存在 'runs/detect/train*/weights/best.pt'
```

说明：YOLOv11 的无缝集成体现了 Ultralytics 框架的优秀设计，让用户可以专注于任务本身，而非工具的切换。对于已经在使用 YOLOv8 的项目，升级到 YOLOv11 是一个值得考虑的选项，以获取更高的精度和更快的速度。
